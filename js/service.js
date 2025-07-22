import { EventEmitter } from 'events'
import { decodeParameters, decodeParameter, encodeFunctionCall } from 'web3-eth-abi';
import { WebSocketClient } from './client'
import { storeTx } from './tx';

const T = "victory"
let listeningTabs = new Map()

class InternalEvents extends EventEmitter {

}

const web3rpc = {
  "0x1": "wss://rpc-ethereum.g4mm4.io",
  "0x171": "wss://rpc-pulsechain.g4mm4.io"
}

const explorers ={
   "0x1": "http://etherscan.io/tx/",
   "0x171": "https://apphex.win/@/#/tx/"
}

let chains

async function init() {
  const item = await chrome.storage.local.get('chains')

  if(item.chains) {
    chains = item.chains
  }
  else {
    chains = {
      "0x1" : {
        id: "eth",
        symbol: "ETH",
        name: "Ethereum",
        rpc: "wss://rpc-ethereum.g4mm4.io",
        explorer: "http://etherscan.io/tx/"
      },
      "0x171" : {
        id: "pulse",
        symbol: "PLS",
        name: "PulseChain",
        rpc: "wss://rpc-pulsechain.g4mm4.io",
        explorer: "https://apphex.win/@/#/tx/"
      },
    }
    await chrome.storage.local.set({chains})
  }
}


let notifications = new Map()

// Listen for notification click
chrome.notifications.onClicked.addListener((notificationId) => {
  // Open the desired URL
  chrome.tabs.create({ url: notifications.get(notificationId) });
});


const interalEvents = new InternalEvents()
let selectedWallet
let selectedChainId 

async function updateSelected() {
  const item = await chrome.storage.local.get('selected')

  if(item.selected) {
    selectedWallet = item.selected.wallet
    selectedChainId = item.selected.chainId
  }
  else {
    selectedChainId = "0x171"
    await chrome.storage.local.set({'selected':{chainId: selectedChainId}})
  }

  chrome.tabs.getCurrent((tab) => {
    if(!tab?.url || tab.url.length==0) {
      chrome.action.setIcon({path: chrome.runtime.getURL("icons")+`/victory2.png`})
    }
    else if(tab.url.startsWith(chrome.runtime.getURL(""))) {
      chrome.action.setIcon({path: chrome.runtime.getURL("icons")+`/victory2on.png`})
    }
    else {
      isConnectedHost(selectedWallet, new URL(tab.url).host, "true").then(connected => 
        chrome.action.setIcon({path: chrome.runtime.getURL("icons")+`/victory2${connected?"on":""}.png`}))
    }
  })
}


let ws; 

init().then(()=>updateSelected())
      .then(()=>
        {
          ws = new WebSocketClient(web3rpc[selectedChainId])
          ws.connect()
          trySubscribe()
        })


interalEvents.on("SELECT_CHAIN", async e => {
  await updateSelected()
  ws?.disconnect()
  ws = new WebSocketClient(web3rpc[selectedChainId]);
  ws.connect();
  trySubscribe(true)

  for (const listeningTab of listeningTabs) {
    const p = await chrome.tabs.get(listeningTab[0])
    const host = new URL(p.url).host
    if (host == listeningTab[1]) {   //host changed ?
      console.log("notify chainChanged", host)
      chrome.tabs.sendMessage(listeningTab[0], { target: T, event: "chainChanged", params: selectedChainId })
    }
  }

  e.reply({})
})

interalEvents.on("SELECT_WALLET", async e => {

  await updateSelected()
  for (const listeningTab of listeningTabs) {
    const p = await chrome.tabs.get(listeningTab[0])
    const host = new URL(p.url).host
    let connected = false

    if (host == listeningTab[1]) {   //host changed ?
      connected = await isConnectedHost(selectedWallet, new URL(p.url).host, "true")

      if (connected) {
        chrome.tabs.sendMessage(p.id, { target: T, event: "accountsChanged", params: [selectedWallet] })
        chrome.tabs.sendMessage(p.id, { target: T, event: "connected", params: { chainId: selectedChainId } })
      }
      else {
        //disconnect 
        chrome.tabs.sendMessage(p.id, { target: T, event: "disconnect", params: {} })
      }
    }      
    
    chrome.action.setIcon({path: chrome.runtime.getURL("icons")+`/victory2${connected?"on":""}.png`})
  }

  e.reply({})
})

interalEvents.on("IMPORT_UPDATE", async e => {
  const items = await chrome.storage.local.get('wallets')

  if (items.wallets && (items.wallets[selectedWallet] == undefined)) {
    //selected wallet invalid
    const keys = Object.keys(items.wallets)
    console.log("keys", keys)
    await chrome.storage.local.set({ selected: { wallet: keys[0], chainId: selectedChainId } })
    await updateSelected()
  }

  e.reply({})
})

let internalId = 1
let lastBlockTimestamp = 0;

interalEvents.on("REQUEST_INTERNAL", e => {
  requestWS({
      type: "INTERNAL",
      payload: e.params
    }).then(r => e.reply(r))
})

.on("CONFIRM_TX_INTERNAL", e => {
  confirmTx(e.params,e.reply)
})
.on("REQUEST_TOKEN_INFO", async e => {
  const infos = await getTokenInfo(e.params)
  e.reply(infos)
})

.on("RESERVES_PRICE", async e => {
  e.reply(Number(await getReservePrice(e.params.lp, e.params.factor)))
})

.on("WALLET_REQUEST", async e => {
  await walletRequest({payload: e.payload},e.sender,e.reply)
})

.on("POPUP_READY", e => {
  //console.log('POPUP_READY', e)
  trySubscribe() 
  e.reply({})
})

.on("POPUP_VISIBILITY", e=> {
  console.log('POPUP_VISIBILITY', e.params.visible)
  if(e.params.visible) trySubscribe() 
  e.reply({})
})


function trySubscribe(force) {

  console.log("deltaT", Date.now()-lastBlockTimestamp)

  if(ws && (force || Date.now()-lastBlockTimestamp > 60*1000 )) {

    lastBlockTimestamp = Date.now()

    ws.subscribe(["newHeads"], async (subId, header) => {

      lastBlockTimestamp = parseInt(header.timestamp)*1000 

      try { 
        await chrome.runtime.sendMessage({type:"NEW_BLOCK"})
      }
      catch{ 
      }
           
      
      // pending txs ?

      const items = await chrome.storage.local.get()
      
      let addresses = Object.keys(items).filter(item=>item.startsWith("0x"))
      
      for(const addr of addresses) {

        const pendings = Object.entries(items[addr]) 
        .filter(tx=>tx[1].chainId==selectedChainId && tx[1].timestamp==0)
        
        //console.log("pendings",pendings)

        for(const pending of pendings) {
          const hash = pending[0]
          const response = await requestWS({
                payload: {
                  method: "eth_getTransactionByHash",
                  params: [hash]
                }
              })

          //console.log("eth_getTransactionByHash", response)

          if(response.result.blockNumber) {

            const receipt = await requestWS({
              payload: {
                method: "eth_getTransactionReceipt",
                params: [hash]
              }
            }) 

            const result = receipt.result.status!="0x1" ? "Failed" : "Successful"

            chrome.notifications.create({
                type:"basic" ,
                title:"Victory Wallet " + response.result.from.slice(0,6),
                message:`Transaction ${parseInt(response.result.nonce)} ${result}`, 
                iconUrl: chrome.runtime.getURL("icons") + "/victory2.png"
              },
              id => notifications.set(id, explorers[selectedChainId]+hash))

            await storeTx(addr, response.result, receipt.result , header.timestamp, pending[1].dapp)

            try {
              chrome.runtime.sendMessage({type:"TX_UPDATE", params: { hash: hash }})
            }
            catch{

            }
          }
            
        }
      }
     

        /*
        const ret = await requestWS({ payload: {
                            method: "eth_unsubscribe",
                            params: [subId]
                          }
                        });

        if(ret.error) {
            ws = new WebSocketClient(web3rpc[selectedChainId]);
        }

        isBlockSub = false
        */
      
    })

  }
}


chrome.runtime.onConnect.addListener(e=>console.log("runtime","connect",e))
chrome.runtime.onSuspend.addListener(e=>console.log("runtime","suspend",e))
chrome.runtime.onSuspendCanceled.addListener(e=>console.log("runtime","onSuspendCanceled",e))
chrome.runtime.onStartup.addListener(e=>console.log("runtime","onStartup",e))

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //console.log("internal_service", request.type)
  interalEvents.emit(request.type, { reply: sendResponse, params: request.params , payload: request.payload, sender })
  return true // async response
});



chrome.runtime.onMessageExternal.addListener(async (message, sender, sendResponse) => {
  if (message.type != "WALLET_REQUEST") {
     return sendResponse({ error: "Bad request" })
  }
  else {
    await walletRequest(message,sender,sendResponse)
  }
})


async function walletRequest(message,sender,sendResponse) {

  const host = new URL(sender.url).host
  const icon = sender.tab.favIconUrl

  listeningTabs.set(sender.tab.id, host)

  console.log(host, ":requests:", message.payload.method);

  switch (message.payload.method) {

    case "wallet_switchEthereumChain":
      const requestChainId = (message.payload.params.chainId || message.payload.params[0].chainId)
      console.log("requestChainId", requestChainId)
      if (web3rpc[requestChainId]) {
        await chrome.storage.local.set({ selected: { wallet: selectedWallet, chainId: requestChainId } })

        sendResponse({ error: null, result: null })
        interalEvents.emit("SELECT_CHAIN")
        chrome.runtime.sendMessage({ type: "IMPORT_UPDATE" })
      }
      else {
        sendResponse({
          error: {
            code: 4902
          }
        })
      }
      break

    case "wallet_revokePermissions": 
      if(Array.isArray(message.payload.params) && message.payload.params.length==1 && message.payload.params[0].eth_accounts) {
        await setConnectedHost(selectedWallet, host, "false")
      }

      sendResponse({result: null})
      break;


    case "wallet_requestPermissions":
      sendResponse({ error: null, result: [{ parentCapability: "eth_accounts" }] });
      break

    case "wallet_getPermissions":
      if (await isConnectedHost(selectedWallet, host, "true"))
        sendResponse({ error: null, result: [{ parentCapability: "eth_accounts" }] });
      else
        sendResponse({ error: null, result: [] });
      break

    case "eth_accounts":
      console.log("eth_accounts", host, await isConnectedHost(selectedWallet, host, "true"))

      if (await isConnectedHost(selectedWallet, host, "true")) {
        sendResponse({ error: null, result: [selectedWallet] });
      }
      else {
        sendResponse({ error: null, result: [] });
      }
      break


    case "eth_requestAccounts":
      if (await isConnectedHost(selectedWallet, host, "true")) {
        sendResponse({ error: null, result: [selectedWallet] });
      }
      else {
        //popup allow host
        const win = await chrome.windows.getCurrent();

        const popup = await chrome.windows.create(
          {
            url: 'html/connect.html',
            type: 'popup',
            width: 400,
            height: 500,
            left: parseInt(win.width - 300)
          })

        interalEvents.once('CONNECT_READY', e => e.reply({ host, icon }));
        interalEvents.once('CONNECT_CONFIRM', async e => {
          if (e.sender.tab.windowId == popup.id) {
            await setConnectedHost(selectedWallet, host, "true")
            chrome.action.setIcon({path: chrome.runtime.getURL("icons")+`/victory2on.png`})
            sendResponse({ error: null, result: [selectedWallet] })
            e.reply({})
          }
        });

        interalEvents.once('CONNECT_CANCEL', async e => {
          if (e.sender.tab.windowId == popup.id) {
            await setConnectedHost(selectedWallet, host, "false")
            sendResponse({  error:
              {
                code: 4001,
                message: "User rejected the request."
              }
            })
            e.reply({})
          }
        });
      }

      break

    case "eth_sendTransaction":
      if (await isConnectedHost(selectedWallet, host, "true")) {
        await confirmTx({ host, icon, tx: message.payload.params[0] } , sendResponse)
      }
      else {
        sendResponse({ error: {
                code: 4100,
                message: "Unauthorized request."
              }
            })
      }
      break


    case "personal_sign":
      if (await isConnectedHost(selectedWallet, host, "true")) {
        await personalSign({ host, icon, 
          data: message.payload.params[0],
          account: message.payload.params[1]
          } 
          , sendResponse)
      }
      else {
        sendResponse({  error:   {
                code: 4100,
                message: "Unauthorized request."
              }
            })
      }
      break;

    case "eth_signTypedData_v4":
      if (await isConnectedHost(selectedWallet, host, "true")) {
        await personalSign({ host, icon, 
          data: message.payload.params[1],
          account: message.payload.params[0],
          method: message.payload.method
          } 
          , sendResponse)
      }
      else {
        sendResponse({  error:   {
                code: 4100,
                message: "Unauthorized request."
              }
            })
      }
      break;
    
    default:


      //console.log(">>> unknow method >>>", message.payload)
      //if (await isConnectedHost(selectedWallet, host, "true")) {
      sendResponse(await requestWS(message))
    //}


    /*
      "wallet_getCapabilities"
      "wallet_addEthereumChain"
      "wallet_watchAsset"
    */

  }
}

async function personalSign(data, sendResponse) {
  const win = await chrome.windows.getCurrent();
  const popup = await chrome.windows.create(
    {
      url: 'html/signMsg.html',
      type: 'popup',
      width: 400,
      height: 600,
      left: parseInt(win.width - 300)
    })

  interalEvents
    .once('SIGN_READY', e => e.reply(data))
    .once('SIGN_DONE', async e => {
      if (e.sender.tab.windowId == popup.id) {
          sendResponse({result: e.params})
      }
      e.reply({})
    })
    .once('SIGN_CANCEL', async e => {
      if (e.sender.tab.windowId == popup.id) {
        sendResponse({
          error:
          {
            code: 4001,
            message: "User rejected the request."
          }
        })
        e.reply({})
      }
    });
}


async function confirmTx(data, sendResponse) {
  const win = await chrome.windows.getCurrent();

  const popup = await chrome.windows.create(
    {
      url: 'html/confirmTx.html',
      type: 'popup',
      width: 400,
      height: 600,
      left: parseInt(win.width - 300)
    })

  interalEvents
    .once('TX_READY', e => e.reply(data))
    .once('TX_SEND', async e => {

      if (e.sender.tab.windowId == popup.id) {

        const hash = await requestWS({
          payload: {
            method: "eth_sendRawTransaction",
            params: [e.params.rlp]
          }
        })

        console.log("hash", hash)

        if(hash.error) {
          e.reply({ 
            broadcasted: false ,
            error: hash.error.message
          })
        }
        else {
          sendResponse(hash)

          //add to transaction history
          const history = await chrome.storage.local.get(selectedWallet)
          if(!history[selectedWallet]) history[selectedWallet]={}
          history[selectedWallet][hash.result] = {
            dapp: data.host,
            fn: e.params.fn,
            nonce: parseInt(e.params.nonce),
            chainId: selectedChainId,
            timestamp: 0,
            infos: []
          }
          await chrome.storage.local.set(history)
          chrome.runtime.sendMessage({type:"TX_NEW", params: { hash: hash.result }})

          e.reply({ broadcasted: true })
        }
      }
    })
    .once('TX_CANCEL', async e => {
      if (e.sender.tab.windowId == popup.id) {
        sendResponse({
          error:
          {
            code: 4001,
            message: "User rejected the request."
          }
        })
        e.reply({})
      }
    });
}

//######### REQUEST ##############################
/*
async function sendRequest(message) {

  //console.log(message, JSON.stringify(message.payload))

  const rpc = web3rpc[selectedChainId]

  try {
    const response = await fetch(rpc, {
      method: 'POST',
      //mode: "cors",
      //cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(message.payload),
    });

    //console.log(response)
    if (response.ok) {
      const data = await response.json();
      console.log(message.payload.method, "data", data)
      return data
    }
    else {
      console.log("HTTP ERR", response.status)
      const data = await response.text();
      
      await passChallenge(data)
      //try again
      //return await sendRequest(message)
    }
  }
  catch(err) {
    console.log("FETCH ERR", err.message)
  }

  return { error: { code: -32603, message: "Internal Error" } }
}
*/

async function requestWS(message) {
    const ret = await ws.request(message.payload)
    //console.log(message.payload.method, ret)
    return ret
}



//######### TABS ##############################
chrome.tabs.onActivated.addListener( async activeInfo => {
  const tab = await chrome.tabs.get(activeInfo.tabId)
  let connected = false
    if(tab?.url?.length==0) {
    }
    else if(tab?.url?.startsWith(chrome.runtime.getURL(""))) {
      connected = true
    }
    else {
      connected = await isConnectedHost(selectedWallet, new URL(tab.url).host, "true")
    }

    chrome.action.setIcon({path: chrome.runtime.getURL("icons")+`/victory2${connected?"on":""}.png`})
  }
);

chrome.tabs.onUpdated.addListener( async (tabId, info) => {

  if(info.status==chrome.tabs.TabStatus.LOADING) {
    listeningTabs.delete(tabId)
    let connected = false

    if(info.url?.length==0) {
      
    }
    else if(info.url?.startsWith(chrome.runtime.getURL(""))) {
      connected = true
    }
    else {
      connected = await isConnectedHost(selectedWallet, new URL(info.url).host, "true")
    }
    
    chrome.action.setIcon({path: chrome.runtime.getURL("icons")+`/victory2${connected?"on":""}.png`})
    
  }
});

chrome.tabs.onRemoved.addListener( tabId => {
  listeningTabs.delete(tabId)
});


//######### STORAGE ##############################

async function isConnectedHost(wallet, host, value) {
  let item = { connect: {} }
  try {
    item = await chrome.storage.local.get("connect")
  }
  catch {
    console.log("storage connect not found")
  }

  return item?.connect?.[wallet]?.[host] == value;
}


async function setConnectedHost(wallet, _host_, value) {
  let item = { connect: {} }
  try {
    item = await chrome.storage.local.get("connect")
  }
  catch {
    console.log("storage connect not found")
  }

  if (item.connect == undefined)
    item = { connect: {} }

  if (item.connect[wallet] == undefined) {
    item.connect[wallet] = {}
  }

  item.connect[wallet][_host_] = value

  await chrome.storage.local.set({ "connect": item.connect })
}


// #####  ######

async function getTokenInfo(tokenAddr) {

  if (tokenAddr == "0x0000000000000000000000000000000000000000") {
    return {
      name: "Pulse",
      symbol: "PLS",
      decimals: 18
    }
  }


  let calls = [
    {
      id: internalId++,
      method: "eth_call",
      params: [{
        to: tokenAddr,
        data: encodeFunctionCall(erc20Abi[0], [])
      }, "latest"]
    }
    ,
    {
      id: internalId++,
      method: "eth_call",
      params: [{
        to: tokenAddr,
        data: encodeFunctionCall(erc20Abi[1], [])
      }, "latest"]
    }
    ,
    {
      id: internalId++,
      method: "eth_call",
      params: [{
        to: tokenAddr,
        data: encodeFunctionCall(erc20Abi[2], [])
      }, "latest"]
    }
  ]
  //name
  const response = await requestWS({
    payload: calls
  })

    console.log("token",response)


  const name = decodeParameter('string', response[0].result)
  const symbol = decodeParameter('string', response[1].result)
  const decimals = parseInt(decodeParameter('uint8', response[2].result))

  return { name, symbol, decimals }
}

// ABI for ERC20 functions
const erc20Abi = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
];

const reservesAbi = {
  name: 'getReserves',
  type: 'function',
  params: [],
  inputs: [],
  outputs: []
}

async function getReservePrice(lp, factor) {
  const calls = [{
    id: internalId++,
    method: "eth_call",
    params: [{
      to: lp,
      data: encodeFunctionCall(reservesAbi, []),
    }, "latest"]
  }]

  const response = await requestWS({ payload: calls })

  console.log("getReserves",response)
  const reserves = decodeParameters(['uint112', 'uint112', 'uint32'], response[0].result)
  return (reserves[1] * 10n ** BigInt(factor)) / reserves[0]
}