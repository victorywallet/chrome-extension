import {fluentMenu, fluentMenuItem, fluentButton, fluentSelect, fluentOption, fluentCard, provideFluentDesignSystem, fluentDesignSystemProvider } from "@fluentui/web-components";
import QRCode from 'qrcode'
import { decodeParameter, decodeParameters, encodeFunctionCall } from "web3-eth-abi";

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const WPLS = "0xa1077a294dde1b09bb078844df40758a5d0f9a27"
const INC = "0x2fa878Ab3F87CC1C9737Fc071108F904c0B0C95d"
const PLSX ="0x95B303987A60C71504D99Aa1b13B4DA07b0790ab";
const HEXADDR = "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39";
const HEXfromETH = "0x57fde0a71132198BBeC939B98976993d8D89D225";
const HEXfromPLS = "0x46F6e9BbcCe8638b20EBBC83D33a2B5bfA9B7894";
const eDAI = "0xefD766cCb38EaF1dfd701853BFCe31359239F305"
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F"

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


  wallets = await getStoredWallets()

  //console.log("wallets",wallets)

  walletSelect.innerHTML =  `<fluent-option value="import" style="color:#111; background-color:#eee"; font-weight:bolder;>Add Wallets</fluent-option>`


  if(wallets) {
    const keys = Object.keys(wallets)

    walletSelect.innerHTML += keys
      .filter(p => wallets[p].checked)
      .map(key => `<fluent-option value="${key}" style="border-color:${wallets[key].color1}">${wallets[key].label}</fluent-option>`).reduce((a, b) => a + b, "")
  }
  else {
    document.getElementById("welcome").hidden=false
  }

  await delay(1)
 
  const item = await chrome.storage.local.get('selected')
  if(item.selected) {
    walletSelect.value = item.selected.wallet
    chainSelect.value = item.selected.chainId
  }


  if(item.selected?.wallet) {
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

        //document.getElementById("tokens").querySelectorAll("div").forEach(p=>p.textContent="")

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
      document.getElementById("tokens").querySelectorAll("div").forEach(p=>p.textContent="")
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
      url: "https://bridge.mypinata.cloud/ipfs/bafybeibc2lymrjr4xq66ypudaehy5sqzndkdojcty47qoq5mwbu7hd6xnq"
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

  document.getElementById("import").addEventListener('click', ()=>chrome.tabs.create({
          url: chrome.runtime.getURL("html/import.html")
        })
  )

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
    
  const chainSelect = document.getElementById('chain');
  const tokens = document.getElementById("tokens").querySelectorAll("div")


  if(chainSelect.value == "0x1") {

    const UNI_ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"

    const data1 =  await chrome.runtime.sendMessage({
        type: "REQUEST_INTERNAL",
        params: [
          {id:0, method: 'eth_getBalance', params: [wallet, 'latest'] },
          {id:3, method: 'eth_call', params: [{to: HEXADDR, data: encodeFunctionCall(BalanceOfAbi,[wallet])}, 'latest'] },
          {id:4, method: 'eth_call', params: [{to: UNI_ROUTER, data: encodeFunctionCall(getAmountsOutAbi,["1000000000000000000",[WETH,DAI]])}, 'latest'] },
          {id:7, method: 'eth_call', params: [{to: UNI_ROUTER, data: encodeFunctionCall(getAmountsOutAbi,["100000000",[HEXADDR,WETH,DAI]])}, 'latest'] },
        ]
    })

    //console.log(data1)
    const data2 = data1.slice(0,2).map((p,i)=>i==0?BigInt(p.result):decodeParameter('uint256',p.result))

    const prices2 = data1.slice(2,4).map(p=>decodeParameter('uint256[]',p.result))
    //console.log(prices2)

    const tokenList = {"ETH":18n, "HEX": 8n}
    let index = 0
    let index2 = 0
    for(const token of Object.entries(tokenList)) {
      //console.log(token[0], prices2[index2] , data2[index2], token[1] )
      tokens[index++].textContent = tokenBalanceAmount2(token[0], prices2[index2] , data2[index2], token[1] )
      tokens[index++].textContent = tokenValue2(prices2[index2] , data2[index2], token[1])
      index2++
    }

  }
  else if(chainSelect.value == "0x171") {

    const PLSX_ROUTER = "0x165C3410fC91EF562C50559f7d2289fEbed552d9"

    const data1 =  await chrome.runtime.sendMessage({
        type: "REQUEST_INTERNAL",
        params: [
          {id:0, method: 'eth_getBalance', params: [wallet, 'latest'] },
          {id:1, method: 'eth_call', params: [{to: PLSX, data: encodeFunctionCall(BalanceOfAbi,[wallet])}, 'latest'] },
          {id:2, method: 'eth_call', params: [{to: INC, data: encodeFunctionCall(BalanceOfAbi,[wallet])}, 'latest'] },
          {id:3, method: 'eth_call', params: [{to: HEXADDR, data: encodeFunctionCall(BalanceOfAbi,[wallet])}, 'latest'] },
          {id:4, method: 'eth_call', params: [{to: PLSX_ROUTER, data: encodeFunctionCall(getAmountsOutAbi,["1000000000000000000",[WPLS,eDAI]])}, 'latest'] },
          {id:5, method: 'eth_call', params: [{to: PLSX_ROUTER, data: encodeFunctionCall(getAmountsOutAbi,["1000000000000000000",[PLSX,WPLS,eDAI]])}, 'latest'] },
          {id:6, method: 'eth_call', params: [{to: PLSX_ROUTER, data: encodeFunctionCall(getAmountsOutAbi,["1000000000000000000",[INC,WPLS,eDAI]])}, 'latest'] },
          {id:7, method: 'eth_call', params: [{to: PLSX_ROUTER, data: encodeFunctionCall(getAmountsOutAbi,["100000000",[HEXADDR,WPLS,eDAI]])}, 'latest'] },
        ]
    })

    //console.log(data1)
    const data2 = data1.slice(0,4).map((p,i)=>i==0?BigInt(p.result):decodeParameter('uint256',p.result))

    const prices2 = data1.slice(4,8).map(p=>decodeParameter('uint256[]',p.result))
    //console.log(prices2)

    const tokenList = {"PLS":18n, "PLSX":18n, "INC": 18n, "HEX": 8n}
    let index = 0
    let index2 = 0
    for(const token of Object.entries(tokenList)) {
      //console.log(token[0], prices2[index2] , data2[index2], token[1] )
      tokens[index++].textContent = tokenBalanceAmount2(token[0], prices2[index2] , data2[index2], token[1] )
      tokens[index++].textContent = tokenValue2(prices2[index2] , data2[index2], token[1])
      index2++
    }
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

function tokenBalanceAmount2(ticker, price, bal ,decimals) {
  let precision=0n;

  while(price.at(-1)/10n**(precision+18n)>0n)
    precision++
  
  return `${(Number(bal/10n**(decimals-precision))/10**Number(precision)).toLocaleString(navigator.language, {maximumFractionDigits:18})} ${ticker}`
}

function tokenValue2( price, bal ,decimals) {

  console.log( price, bal, decimals)
  return `${((bal*price.at(-1))/10n**(18n+decimals)).toLocaleString(navigator.language)} USD`
}

function countZerosBigInt(num) {
    return BigInt(String(num).split('').filter(char => char === '0').length);
}

const reservesAbi = {
  name: 'getReserves',
  type: 'function',
  params: [],
  inputs: [],
  outputs: []
}

const getAmountsOutAbi = {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            }
        ],
        "name": "getAmountsOut",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
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
