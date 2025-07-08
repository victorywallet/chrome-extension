import {fluentMenu, fluentMenuItem, fluentButton, fluentSelect, fluentOption, fluentCard, provideFluentDesignSystem, fluentDesignSystemProvider } from "@fluentui/web-components";
import QRCode from 'qrcode'
import { decodeParameter, decodeParameters, encodeFunctionCall } from "web3-eth-abi";

const INC = "0x2fa878Ab3F87CC1C9737Fc071108F904c0B0C95d"
const PLSX ="0x95B303987A60C71504D99Aa1b13B4DA07b0790ab";
const HEXADDR = "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39";
const HEXfromETH = "0x57fde0a71132198BBeC939B98976993d8D89D225";
const HEXfromPLS = "0x46F6e9BbcCe8638b20EBBC83D33a2B5bfA9B7894";

let wallets

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}


//initializeIcons("../fonts/"); // Loads icons from the default CDN

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log(request)
  const walletSelect = document.getElementById('wallet');
  const chainSelect = document.getElementById('chain');
  const history = document.getElementById("history");

  switch(request.type) {
    case "IMPORT_UPDATE" : 
    case "CHAIN_UPDATE" :
      window.location.reload()
      break
  
    case "NEW_BLOCK": 
      refresh(walletSelect.value, chainSelect.value)
      break

    case "TX_NEW": {
      const items =  await chrome.storage.local.get(walletSelect.value)
      history.prepend(  createTxItem(request.params.hash, items[walletSelect.value][request.params.hash]) )
      break
    }

    case "TX_UPDATE": {
      const items =  await chrome.storage.local.get(walletSelect.value)
      const node = Array.from( history.childNodes.entries() ).filter(p=>p[1].id==request.params.hash)
      history.replaceChild(createTxItem(request.params.hash, items[walletSelect.value][request.params.hash]), node[0][1]) 
      break
    }
  }
});

document.addEventListener('visibilitychange', async () => {
  const opt = await chrome.sidePanel.getOptions({})
  chrome.runtime.sendMessage({ type: "POPUP_VISIBILITY", params: {
    sidePanel: opt.enabled, 
    visible:document.visibilityState === 'visible'} 
  }).then(e => {

  })

});

document.addEventListener('DOMContentLoaded', async () => {

  provideFluentDesignSystem().register(fluentMenu(), fluentMenuItem(), fluentButton(), fluentSelect(), fluentOption(), fluentCard(), fluentDesignSystemProvider())

  chrome.runtime.sendMessage({ type: "POPUP_READY" }).then( e => {

  })

  window.addEventListener('blur', ()=>chrome.runtime.sendMessage({ type: "POPUP_CLOSE" }))


  const side = document.getElementById('side');
  const walletSelect = document.getElementById('wallet');
  const chainSelect = document.getElementById('chain');
  const sendBt = document.getElementById('send');
  const recvBt = document.getElementById('recv');
  const swapBt = document.getElementById('swap');
  const bridgeBt = document.getElementById('bridge');
  const buyBt = document.getElementById('buy');

  const rcvDialog = document.getElementById('rcvDialog')
  const copyResult = document.getElementById('copyResult')

  const topCard = document.getElementsByClassName("topCard")[0]

  const menu1 = document.getElementById('menu1')
  const menu2 = document.getElementById('menu2')

  side.addEventListener('click', async () => {

    const tab = await getCurrentTab()
    chrome.sidePanel.open({ windowId: tab.windowId, tabId: tab.id });
    window.close()

  });

  const item = await chrome.storage.local.get('selected')

  wallets = await getStoredWallets()
  walletSelect.innerHTML =  `<fluent-option value="import" style="color:#111; background-color:#eee"; font-weight:bolder;>Add Wallets</fluent-option>`


  if(wallets) {
    const keys = Object.keys(wallets)

    walletSelect.innerHTML += keys
      .filter(p => wallets[p].checked)
      .map(key => `<fluent-option value="${key}" style="border-color:${wallets[key].color1}">${wallets[key].label}</fluent-option>`).reduce((a, b) => a + b, "")
  }

  await delay(1)

  walletSelect.value = item.selected.wallet
  chainSelect.value = item.selected.chainId




    if(item.selected.wallet) {
      //walletSelect.style.borderColor = wallets[walletSelect.value].color1
      walletSelect.style.borderImage = `linear-gradient(aqua,${wallets[walletSelect.value].color1}) 1`
      topCard.style.background =  `linear-gradient(180deg, ${wallets[walletSelect.value].color1} -10%, #0ff7 100%)`
    }

    
  walletSelect.addEventListener("change", async (e) => {
      if(walletSelect.value.startsWith("0x")) {
//        walletSelect.style.borderColor = wallets[walletSelect.value].color1
          walletSelect.style.borderImage = `radial-gradient(circle,aqua,${wallets[walletSelect.value].color1}) 1`
        walletSelect.style.borderImage = `linear-gradient(aqua,${wallets[walletSelect.value].color1}) 1`

        topCard.style.background =  `linear-gradient(180deg, ${wallets[walletSelect.value].color1} -25%, #0ff7 100%)`
        
        await chrome.storage.local.set({ selected: { wallet: walletSelect.value, chainId: chainSelect.value } })
        await chrome.runtime.sendMessage({ type: "SELECT_WALLET" })
        updateContent(walletSelect.value, chainSelect.value)
      }
      else {
      chrome.tabs.create({
          url: chrome.runtime.getURL("html/import.html")
        });
      }
    })

  chainSelect.addEventListener("change", async (e) => {
      await chrome.storage.local.set({ selected: { wallet: walletSelect.value, chainId: chainSelect.value } })
      await chrome.runtime.sendMessage({ type: "SELECT_CHAIN" })
      updateContent(walletSelect.value, chainSelect.value)
    })

  sendBt.addEventListener("click",async ()=>{   
    chrome.tabs.create({
      url: chrome.runtime.getURL("html/send.html")
    });
  })

  recvBt.addEventListener("click", ()=>{    
     document.getElementById('addr').textContent = walletSelect.value
     QRCode.toCanvas(document.getElementById("qr"), walletSelect.value, {
            width: 200,
            margin: 2
        })
     rcvDialog.hidden=false;
     copyResult.textContent=""
  })

  swapBt.addEventListener("click",async ()=>{   
    chrome.tabs.create({
      url: "https://pulsex.mypinata.cloud/ipfs/bafybeiajyhfbf6evh4mdabassmbtsy73ci2gmcgh4ffmjkrgsea35vqxba"
    });
  })

  bridgeBt.addEventListener("click",async ()=>{   
    chrome.tabs.create({
      url: "https://bridge.mypinata.cloud/ipfs/bafybeif242ld54nzjg2aqxvfse23wpbkqbyqasj3usgslccuajnykonzo4"
    });
  })

  buyBt.addEventListener('click',()=>{
    menu2.toggleAttribute("hidden")
    menu2.focus()
  })


  document.getElementById('rcvClose').addEventListener("click", ()=> rcvDialog.hidden = true)
  document.getElementById('copy').addEventListener("click", ()=> navigator.clipboard.writeText(walletSelect.value)
  .then(()=>{
    copyResult.textContent = "Fulfilled"
  }
  , raison =>{
    console.log(raison)
    copyResult.textContent = raison
  }))

  document.getElementById('openMenu').addEventListener('click' ,()=>{
    menu1.toggleAttribute("hidden")
    menu1.focus()
  })

  /*
  menu1.addEventListener('focusout' ,(e)=>{
    console.log(e)
    menu1.toggleAttribute("hidden")
  })

  menu2.addEventListener('focusout' ,()=>{
    menu2.toggleAttribute("hidden")
  })*/

  menu1.addEventListener('change',e=>{
    console.log(e.target.id)
    
    if(e.target.id=="balances") {
      chrome.tabs.create({
        url: chrome.runtime.getURL("html/balances.html")
      });
    }

    menu1.toggleAttribute("hidden")
  })

  menu2.addEventListener('change',e=>{
    console.log(e.target.id)
    let url 
    if(e.target.id=="0xcoast") url = "https://app.0xcoast.com/invites/V4ctswI0xf4TmDD3eqbd"
    if(e.target.id=="rampnow") url = "https://app.rampnow.io/order/quote?orderType=buy&dstCurrency=PLS&dstChain=pulse-chain"
    chrome.tabs.create({url});
  })

  updateContent(walletSelect.value, chainSelect.value);
})

function createSvgUrl(color1, color2) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="grad${color1}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
          <path d="M4 6.25A2.25 2.25 0 0 1 6.25 4h8.5A2.25 2.25 0 0 1 17 6.25V14h3.5v3.25a3.25 3.25 0 0 1-3.25 3.25h-11A2.25 2.25 0 0 1 4 18.25v-12ZM17 19h.25A1.75 1.75 0 0 0 19 17.25V15.5h-2V19ZM7.75 8a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5Zm0 3.5a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5Zm0 3.5a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z" fill="url(#grad${color1})" />
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}


const BalanceOfAbi = {
  "constant": true,
  "inputs": [
    {
      "name": "_owner",
      "type": "address"
    }
  ],
  "name": "balanceOf",
  "outputs": [
    {
      "name": "balance",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}

async function refresh(wallet) {
  const balance = await chrome.runtime.sendMessage({
    type: "REQUEST_INTERNAL",
    params: { method: 'eth_getBalance', params: [wallet, 'latest'] }
  })
    
  const chainSelect = document.getElementById('chain');
  const UNIT = chainSelect.value == "0x1" ? "ETH" : "PLS"
  //const bal = document.getElementsByClassName('balance')[0];
  //bal.textContent = (Number(bal2)/1000000).toLocaleString({ maximumFractionDigits: Math.max(0, 12 - String(bal2).length) }) + " " + UNIT
    
  /*
  const price = await chrome.runtime.sendMessage({
      type: "RESERVES_PRICE",
      params: {
          lp: chainSelect.value == "0x1" ? "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852" : "0xE56043671df55dE5CDf8459710433C10324DE0aE",
          factor: chainSelect.value == "0x1" ? 14 : 8
      }
  })


  const amount = (bal2*BigInt(price))/BigInt(chainSelect.value == "0x1" ? 1e8 : 1e14)
  document.getElementsByClassName('amount')[0].textContent = amount.toLocaleString() + " USD"
*/

  const tokens = document.getElementById("tokens");


  if(chainSelect.value == "0x1") {

    const native = await tokenBalanceAmount("ETH", BigInt(balance.result), "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852", 14n, 2n , 18n)

    //tokens.innerHTML = native
    tokens.childNodes[0].textContent

    const hexBal =  decodeParameter('uint256', await chrome.runtime.sendMessage({
        type: "REQUEST_INTERNAL",
        params: { method: 'eth_call', params: [{to: HEXADDR, data: encodeFunctionCall(BalanceOfAbi,[wallet])}, 'latest'] }
    }))

    tokens.innerHTML += await tokenBalanceAmount("eHEX", hexBal.result, "0xF6DCdce0ac3001B2f67F750bc64ea5beB37B5824", 8n , 6n, 8n)
  }
  else if(chainSelect.value == "0x171") {

    const native = await tokenBalanceAmount("PLS", BigInt(balance.result), "0xE56043671df55dE5CDf8459710433C10324DE0aE", 8n, 8n , 18n)

    tokens.innerHTML = native

    const data1 =  await chrome.runtime.sendMessage({
        type: "REQUEST_INTERNAL",
        params: [
          {id:1, method: 'eth_call', params: [{to: PLSX, data: encodeFunctionCall(BalanceOfAbi,[wallet])}, 'latest'] },
          {id:2, method: 'eth_call', params: [{to: INC, data: encodeFunctionCall(BalanceOfAbi,[wallet])}, 'latest'] },
          {id:3, method: 'eth_call', params: [{to: HEXADDR, data: encodeFunctionCall(BalanceOfAbi,[wallet])}, 'latest'] },
          {id:4, method: 'eth_call', params: [{to: HEXfromETH, data: encodeFunctionCall(BalanceOfAbi,[wallet])}, 'latest'] },
        ]
    })

    const data2 = data1.map(p=>decodeParameter('uint256',p.result))

    const reserves =  await chrome.runtime.sendMessage({
        type: "REQUEST_INTERNAL",
        params: [
          {id:1, method: 'eth_call', params: [{to: "0x1b45b9148791d3a104184cd5dfe5ce57193a3ee9", data: encodeFunctionCall(reservesAbi,[])}, 'latest'] },
          {id:2, method: 'eth_call', params: [{to: "0xf808bb6265e9ca27002c0a04562bf50d4fe37eaa", data: encodeFunctionCall(reservesAbi,[])}, 'latest'] },
          {id:3, method: 'eth_call', params: [{to: "0xf1f4ee610b2babb05c635f726ef8b0c568c8dc65", data: encodeFunctionCall(reservesAbi,[])}, 'latest'] },
          {id:4, method: 'eth_call', params: [{to: "0xf1f4ee610b2babb05c635f726ef8b0c568c8dc65", data: encodeFunctionCall(reservesAbi,[])}, 'latest'] },
        ]
    })

    const reserves2 = reserves.map((p,i)=>console.log(i,p.result))//decodeParameters(['uint112', 'uint112', 'uint32'],p))

    let tokensHtml = await tokenBalanceAmount("PLSX", data2[0], "0x1b45b9148791d3a104184cd5dfe5ce57193a3ee9", 1n , 10n, 18n)
    tokensHtml += await tokenBalanceAmount("INC", data2[1], "0xf808bb6265e9ca27002c0a04562bf50d4fe37eaa", 1n , 10n, 18n)
    tokensHtml += await tokenBalanceAmount("pHEX", data2[2], "0xf1f4ee610b2babb05c635f726ef8b0c568c8dc65", 1n , 10n, 8n)
    tokensHtml += await tokenBalanceAmount("eHEX", data2[3], "0xf1f4ee610b2babb05c635f726ef8b0c568c8dc65", 1n , 10n, 8n)
    
    console.log(tokensHtml)
    tokens.innerHTML += tokensHtml
  }


}
 
async function tokenBalanceAmount(ticker, bal, lp, factor, lpConvert ,decimals,) {
  const price = await getReservePrice(lp, factor)
  console.log(ticker,price)
  let precision=0n;

  while(price/10n**(lpConvert+precision)>0n)
    console.log(ticker,"precision",precision++)

  console.log(ticker, Number(bal/10n**(decimals-precision))/10**Number(precision))
  
  return `<h3 class="token">
              <div>${(Number(bal/10n**(decimals-precision))/10**Number(precision)).toLocaleString(navigator.language)} ${ticker} </div>

              <div class="amount">${((bal*price)/10n**(decimals+lpConvert)).toLocaleString(navigator.language)} USD</div>
          </h3>`
}


const reservesAbi = {
  name: 'getReserves',
  type: 'function',
  params: [],
  inputs: [],
  outputs: []
}

async function getReservePrice(lp, factor) {

  const response = await chrome.runtime.sendMessage({
                          type: "REQUEST_INTERNAL", params : {method: "eth_call",
                                              params: [{
                                                to: lp,
                                                data: encodeFunctionCall(reservesAbi, []),
                                              }, "latest"]
                                            }
                    })

  const reserves = decodeParameters(['uint112', 'uint112', 'uint32'], response.result)
    console.log("getReserves",reserves)

  return (reserves[1] * 10n ** BigInt(factor)) / reserves[0]
}

function updateContent(wallet,chainId) {
  
  //getbalaance
  refresh(wallet)

  // history

  const history = document.getElementById("history");
  history.innerHTML = ""
  
  chrome.storage.local.get(wallet).then(items => {

    let sorted = Object.keys(items[wallet])
    .filter(p=>items[wallet][p].chainId==chainId)
    .sort((a,b)=>items[wallet][b].nonce-items[wallet][a].nonce)

    for (const key of sorted) {
        const item = items[wallet][key]
        //console.log(item)
        history.appendChild(  createTxItem(key,item) )
    }
  })
}

function createTxItem(key,item) {
  const walletSelect = document.getElementById('wallet');
  const listItem = document.createElement('fluent-list-item');

    let icon = "../icons/timer.svg"
    let time = `Pending nonce ${item.nonce} ...`

    if(item.timestamp>0) {
      icon = createSvgUrl(wallets[walletSelect.value].color1, item.failed ? "red" : "aqua")
      time = new Date(item.timestamp*1000).toLocaleString(navigator.language)
    }

    listItem.id = key
    listItem.innerHTML = `
        <div class="tx-info">
          <img src="${icon}">
          <div class="tx-details">
            <span style="color:${item.failed ? "red" : "aqua"}"> ${item.dapp} </span>  <span >${item.fn}</span>
            <div style="font-size: 0.9em; color: #a0a0a0; flex: 0 0 100%">${time}</div>
          </div>
        </div>`
         
      
    listItem.addEventListener("click", e => {
        console.log(e,e.target.dataset)
        chrome.tabs.create({
        url: "https://apphex.win/@/#/tx/"+key
      })
    })

    return listItem
}

/*
chrome.runtime.sendMessage({ type: "TX_READY" }).then(e => {
  document.getElementsByClassName('url')[0].textContent = e.host
  document.getElementsByClassName('logo')[0].src = e.icon

})
*/


async function getStoredWallets() {
  try {
    const items = await chrome.storage.local.get('wallets')
    return items.wallets;
  } catch (error) {
    console.error('Error retrieving addresses:', error.message);
    return {};
  }
}
