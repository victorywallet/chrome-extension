import { EventEmitter } from 'events'
import { decodeParameters, decodeParameter, encodeFunctionCall } from 'web3-eth-abi';
import { WebSocketClient } from './client'
import { storeTx } from './tx';

const T = "victory"
let listeningTabs = new Map()

class InternalEvents extends EventEmitter {

}


let chains

async function init() {
  const item = await chrome.storage.local.get('chains')

  if(item.chains && item.chains["0x171"].rpc.indexOf("wss")<0) {
    chains = item.chains
    console.log(chains)
  }
  else {
    chains = {
      "0x1" : {
        id: "eth",
        symbol: "ETH",
        name: "Ethereum",
        rpc: "https://rpc-ethereum.g4mm4.io",
        explorer: "http://etherscan.io/tx/"
      },
      "0x171" : {
        id: "pulse",
        symbol: "PLS",
        name: "PulseChain",
        rpc: "https://rpc-pulsechain.g4mm4.io",
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
          /*ws = new WebSocketClient(chains[selectedChainId].rpc)
          ws.connect()*/
          trySubscribe()
        })


interalEvents.on("SELECT_CHAIN", async e => {
  await updateSelected()
  /*ws?.disconnect()
  ws = new WebSocketClient(chains[selectedChainId].rpc);
  ws.connect();*/
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
  /*requestWS({
      type: "INTERNAL",
      payload: e.params
    }).then(r => e.reply(r))*/
      makeHttpsRequest(e.params).then(r => e.reply(r))

})


interalEvents.on("REQUEST_TRACE", e => {
  makeHttpsRequest(e.params).then(r => e.reply(r))
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

let timeoutPool = null

function trySubscribe(force) {

  console.log("deltaT", Date.now()-lastBlockTimestamp)

  //if((force || Date.now()-lastBlockTimestamp > 6*1000 ))
     {

    lastBlockTimestamp = Date.now()
    let currentBlock = 0;

    if(timeoutPool) clearInterval(timeoutPool)

      timeoutPool = setInterval(async ()=>{

      const block = await makeHttpsRequest({
        method: "eth_blockNumber",
        params:[]
      })

      if (block.result == currentBlock) {
        return
      }

      currentBlock = block.result

      const header = await makeHttpsRequest({ method: 'eth_getBlockByNumber', params: [currentBlock, false] })

      lastBlockTimestamp = parseInt(header.result.timestamp)*1000 

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
        .filter(tx=>tx[1].chainId==selectedChainId && (tx[1].timestamp==0 || tx[1].timestamp==undefined))
        
        console.log("pendings",pendings)

        for(const pending of pendings) {
          const hash = pending[0]
          const response = await makeHttpsRequest( {
                  method: "eth_getTransactionByHash",
                  params: [hash]
              })

          console.log("eth_getTransactionByHash", response)

          if(response.result?.blockNumber) {

            const receipt = await makeHttpsRequest({
                method: "eth_getTransactionReceipt",
                params: [hash]
            })             

            const result = receipt.result.status!="0x1" ? "Failed" : "Successful"

            chrome.notifications.create({
                type:"basic" ,
                title:"Victory Wallet " + response.result.from.slice(0,6),
                message:`Transaction ${parseInt(response.result.nonce)} ${result}`, 
                iconUrl: chrome.runtime.getURL("icons") + "/victory2.png"
              },
              id => notifications.set(id, chains[selectedChainId].explorer + hash))

            await storeTx(addr, response.result, receipt.result , header.result.timestamp, pending[1].dapp)

            try {
              chrome.runtime.sendMessage({type:"TX_UPDATE", params: { hash: hash }})
            }
            catch{

            }
          }
            
        }
      }

    }, 2000)

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
      if (chains[requestChainId]) {
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
          console.log("CONNECT_CANCEL")
          if (e.sender.tab.windowId == popup.id) {
            await setConnectedHost(selectedWallet, host, "false")
            sendResponse({  error:  {code: 4001, message: "User rejected the request."}})
            e.reply({})
          }
        });

        interalEvents.once('CONNECT_CLOSE', async e => {
          console.log("CONNECT_CLOSE")
          if (e.sender.tab.windowId == popup.id) {
            sendResponse({  error:    {code: 4001, message: "User rejected the request."}})
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
      //sendResponse(await requestWS(message))
      sendResponse(await makeHttpsRequest(message.payload))
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

        const hash = await makeHttpsRequest({
            method: "eth_sendRawTransaction",
            params: [e.params.rlp]
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

async function makeHttpsRequest(payload) {

  if(!Array.isArray(payload)) {
    payload.jsonrpc = '2.0'
    if(!payload.id) payload.id = internalId++
  }
  
  try {
    const response = await fetch(
      chains[selectedChainId].rpc,
      {
       method: "POST",
       headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.5'
      },
      credentials: 'include', // Include cookies if needed,
      body: JSON.stringify(payload)
    });

    const text = await response.text();

//    console.log("---",payload,text)

    return JSON.parse(text);
  } catch (error) {
    console.log(selectedChainId, chains[selectedChainId], error)
    throw new Error(`Request failed: ${error}`);
  }
}

async function requestWS(message) {
    const ret = await ws.request(message.payload)
    //console.log(message.payload, ret)
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

  console.log("isConnectedHost",wallet, host,  item?.connect?.[wallet]?.[host])


  return item?.connect?.[wallet]?.[host] == value;
}


async function setConnectedHost(wallet, _host_, value) {

console.log("setConnectedHost",wallet, _host_, value)

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
  const response = await makeHttpsRequest(calls)

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

  const response = await makeHttpsRequest(calls[0])

  console.log("getReserves",response)
  const reserves = decodeParameters(['uint112', 'uint112', 'uint32'], response.result)
  return (reserves[1] * 10n ** BigInt(factor)) / reserves[0]
}