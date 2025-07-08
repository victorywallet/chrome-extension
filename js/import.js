import { fluentSwitch, fluentTextField, fluentButton, fluentSelect, fluentOption, fluentCard, provideFluentDesignSystem, fluentDesignSystemProvider } from "@fluentui/web-components";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import Eth from "@ledgerhq/hw-app-eth";
import TrezorConnect from "@trezor/connect-webextension";
import { decodeParameters, decodeParameter } from 'web3-eth-abi';

const storage = chrome.storage.local

const palette = ["purple", "coral", "deeppink", "lawngreen", "gold"]

document.addEventListener('DOMContentLoaded', async () => {
  provideFluentDesignSystem().register(fluentSwitch(), fluentSelect(), fluentOption(), fluentTextField(), fluentButton(), fluentDesignSystemProvider())

  const connectLedgerButton = document.getElementById('connectLedgerBtn');
  const connectTrezorButton = document.getElementById('connectTrezorBtn');
  const pathSelect = document.getElementById("path");
  const pathCustom = document.getElementById("custom");
  const addressOutput = document.getElementById('addressOutput');
  const errorOutput = document.getElementById('errorOutput');


   //needed for PLS
  const selected = (await storage.get('selected')).selected
  selected.chainId = "0x171"
  await storage.set({selected})
  await chrome.runtime.sendMessage({ type: "SELECT_CHAIN" })
  await chrome.runtime.sendMessage({ type: "IMPORT_UPDATE" })

  pathSelect.addEventListener('change',() => pathCustom.hidden = (pathSelect.value!="custom"))



  connectLedgerButton.addEventListener('click', async () => {

    // Clear
    errorOutput.textContent = '';
    //addressOutput.innerHTML = '';

    try {
      // Request USB connection to Ledger
      const transport = await TransportWebUSB.create();

      // Initialize Ethereum app on Ledger
      const eth = new Eth(transport);


      loadLedger(eth, pathSelect.value, 0)

    }
    catch (error) {
      errorOutput.textContent = `Error: ${error.message}`;
    }

  });


  connectTrezorButton.addEventListener('click', async () => {
    // Clear
    errorOutput.textContent = '';

    try {
      TrezorConnect.init({
        manifest: {
          email: 'hexwhale@protonmail.com',
          appUrl: 'https://apphex.win'
        },
        transports: ['BridgeTransport', 'WebUsbTransport'],
        connectSrc: 'https://connect.trezor.io/9/'
      })
    }
    catch {

    }

    loadTrezor(pathSelect.value, 0)
  });

});


let my_wallets;

async function loadLedger(eth, bip44, offset) {

  my_wallets = await getStoredWallets()

  const walletDiv = document.getElementsByClassName("wallet")
  for (var i = 0; i < walletDiv.length; i++) {
    walletDiv[i].style.display = "none"
    const clone = walletDiv[i].cloneNode(true);
    walletDiv[i].parentNode.replaceChild(clone, walletDiv[i]);
  }

  const buttons = document.getElementsByClassName("bt3")
  if (buttons.length > 0)
    buttons[0].parentNode.removeChild(buttons[0])

  try {
    for (var i = 0; i < 5; i++) {
      let path ;
      
      switch(bip44) {
        case "accounts":      path = `44'/60'/${offset + i}'/0/0`; break;
        case "addresses":     path = `44'/60'/0'/0/${offset + i}`; break;
        case "custom":        path = document.getElementById("custom").value;
      }
      const { address } = await eth.getAddress(path);

      await displayWallet(i, walletDiv[i], address, "ledger", path)

      if(bip44=="custom")   break;
    }

    const next = document.createElement("button")
    next.className = "bt3"
    next.innerText = "Next addresses"
    next.addEventListener("click", async () => await loadLedger(eth, bip44, offset + 5))

    if(bip44!="custom") 
      addressOutput.appendChild(next)

  }
  catch (error) {
    errorOutput.textContent = `Error: ${error.message}`;
  }
}

async function loadTrezor(bip44, offset) {

  my_wallets = await getStoredWallets()

  const walletDiv = document.getElementsByClassName("wallet")
  console.log(walletDiv)
  for (var i = 0; i < walletDiv.length; i++) {
    walletDiv[i].style.display = "none"
    const clone = walletDiv[i].cloneNode(true);
    walletDiv[i].parentNode.replaceChild(clone, walletDiv[i]);
  }

  const buttons = document.getElementsByClassName("bt3")
  if (buttons.length > 0)
    buttons[0].parentNode.removeChild(buttons[0])


  try {

    let bundle = []
    
    for(var i=0;i<5;i++) {
      let acc=0,addr=0;
      if(bip44=="accouts") acc=i;
      if(bip44=="addresses") addr=i;
      bundle.push( { path: `m/44'/60'/${acc}'/0/${addr}`, showOnTrezor: false } )
    }

    if(bip44=="custom") {
      const path = document.getElementById("custom").value;
      bundle.push( { path , showOnTrezor: false } )
    }

    console.log(bundle)

    const result = await TrezorConnect.ethereumGetAddress({bundle});

    console.log(result)

    if(result.success) {
      for (var i = 0; i < result.payload.length; i++) {
        const address = result.payload[i].address
        const serializedPath = result.payload[i].serializedPath

        await displayWallet(i, walletDiv[i], address, "trezor", serializedPath)
      }

      const next = document.createElement("button")
      next.className = "bt3"
      next.innerText = "Next addresses"
      next.addEventListener("click", async () => await loadTrezor(bip44, offset + 5))

      if(bip44!="custom") 
        addressOutput.appendChild(next)
    }
  }
  catch (error) {
    errorOutput.textContent = `Error: ${error.message}`;
  }
}

 let timer = null

async function displayWallet(i, bt, address, device, path) {

  const bal = await chrome.runtime.sendMessage({
    type: "REQUEST_INTERNAL",
    params: { method: 'eth_getBalance', params: [address, 'latest'] }
  })

  bt.style.display = "block";
  bt.style.borderColor = palette[i]

  const check = bt.childNodes[1]
  const h3addr = bt.childNodes[3]
  const h3bal1 = bt.childNodes[5]
  const label = bt.childNodes[7]
  const color1 = bt.childNodes[9]

  check.checked = my_wallets[address] && my_wallets[address].checked
  h3addr.textContent = `${address.slice(0, 6)}...${address.slice(-4)}`
  h3bal1.textContent = `${(bal.result / 1e18).toLocaleString(navigator.language,{maximumFractionDigits:0})} PLS`;
  label.value = (my_wallets[address] && my_wallets[address].label) || `${device[0].toUpperCase()}${device.slice(1)} ${address.slice(0, 6)}`
  color1.value = (my_wallets[address] && my_wallets[address].color1) || palette[i]
  color1.addEventListener("keyup", () => {
    bt.style.borderColor = color1.value
  })

  const bindValues = () => {
    my_wallets[address] = {
      checked: check.checked,
      device,
      path,
      label: label.value,
      color1: color1.value
    }

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => saveStoredWallets(my_wallets), 2000)
  }

  check.addEventListener("click", () => bindValues())
  label.addEventListener("keyup", () => bindValues())
  color1.addEventListener("keyup", () => bindValues())

  /*
        bt.addEventListener("click", () => {
          bt.checked = !bt.checked
          bt.innerText = !bt.checked ? txt : txt.padEnd(70, "\u00A0") + "[YES]";
  
          my_wallets[address] =  { 
            checked: bt.checked, 
            device: "ledger", 
            path,
            label: "Ledger_" + address.slice(0, 6) 
          }
  
          console.log(my_wallets)
          saveStoredWallets(my_wallets)
  
          if(bt.checked) {
            //getOnLineTxs(address)
          }
        })*/
  //addressOutput.appendChild(bt)
}


async function getStoredWallets() {
  try {
    const items = await storage.get('wallets')
    console.log(items)
    if (items.wallets == undefined) {
      items.wallets = {}
    }
    return items.wallets;
  } catch (error) {
    console.error('Error retrieving addresses:', error.message);
    return {};
  }
}


function saveStoredWallets(wallets) {
  console.log("saving wallets")
  storage.set({ 'wallets': wallets }).then((p) => {
    chrome.runtime.sendMessage({ type: "IMPORT_UPDATE" })
  })
}





