import { decodeParameters, decodeParameter } from 'web3-eth-abi';
import { fluentTextField, fluentTab, fluentTabs, fluentTabPanel,fluentDialog, fluentButton, fluentCard, provideFluentDesignSystem, fluentDesignSystemProvider } from "@fluentui/web-components";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import Eth from "@ledgerhq/hw-app-eth";
import { ledgerService } from "@ledgerhq/hw-app-eth";
import TrezorConnect from "@trezor/connect-webextension";
import { createTx } from '@ethereumjs/tx'
import { createCustomCommon, Mainnet } from '@ethereumjs/common'
import { bytesToHex } from '@ethereumjs/util'

let tx = null;
let timer = null;
let priorities = {}
let fnCode = null;
let fnName = "";
let done = false;
let nextBaseFee = 0;
let nativePrice = 0;

document.addEventListener('DOMContentLoaded', async () => {

    provideFluentDesignSystem().withDesignTokenRoot().register(fluentTextField(), fluentTab(), fluentTabs(), fluentTabPanel(),fluentDialog(), fluentButton(), fluentCard(), fluentDesignSystemProvider())

    const signBt = document.getElementById('sign')
    
    signBt.addEventListener("click", async () => {
        
        priorities[fnCode] = {
            id : document.getElementById("priority").activeid ,
            value : document.getElementById("custom").value 
        }

        await chrome.storage.local.set({"priorities":priorities})
        
        const selected = await chrome.storage.local.get('selected')
        const wallets = await chrome.storage.local.get('wallets')
        const wallet = wallets.wallets[selected.selected.wallet]

        tx.chainId = selected.selected.chainId

        let txSigned = null

        signBt.disabled = true
        switch(wallet.device){
            case "ledger" :
                txSigned = await signWithLedger(wallet.path, selected.selected.wallet)
                break

            case "trezor" :
                txSigned = await signWithTrezor(wallet.path, selected.selected.wallet)
                break
        }
        


        signBt.disabled = false

        if (txSigned) {
            clearInterval(timer)
            document.getElementById('statusDialog').hidden = false
            document.getElementById('status').innerHTML = "Transaction Signed"
            chrome.runtime.sendMessage({ type: "TX_SEND", params: {
                rlp: txSigned,
                fn: fnName,
                nonce: tx.nonce
            }   
            }).then((e) => {
                if(e.broadcasted) {
                    done = true
                    document.getElementById('status').innerHTML += "<br>" + "Transaction Broadcasted"
                    setTimeout(()=>window.close(),1000)
                }
                else {
                    document.getElementById('statusDialog').hidden = true
                    const errorOutput = document.getElementById('errorOutput');
                    errorOutput.textContent = e.error;
                }
            })
        }
    })

    document.getElementById("priority").addEventListener( 'change', async ()=> updateFee())

    document.getElementById('cancel').addEventListener("click", async () =>
        chrome.runtime.sendMessage({ type: "TX_CANCEL" })
            .then(() => window.close()))

    window.addEventListener('beforeunload', (event) => done ? {} :
        chrome.runtime.sendMessage({ type: "TX_CANCEL" }))

    chrome.runtime.sendMessage({ type: "TX_READY" }).then(async e => {

        console.log("RECV READY", e.tx.gasLimit, e.tx.gas)  
        
        document.getElementById('url').textContent = e.host
        document.getElementById('logo').src = e.icon
        document.getElementById('toLbl').textContent = (e.tx.data && e.tx.data.length>3) ? "Interact with" : "To"
          
        tx = e.tx
        delete tx.gasPrice

        if (!tx.type) tx.type = 2
        if (!tx.gasLimit) tx.gasLimit = tx.gas
        if (!tx.gasLimit) {
            const response = await chrome.runtime.sendMessage({
                type: "REQUEST_INTERNAL",
                params: { method: 'eth_estimateGas', params: [tx] } })

            const elt = document.getElementById("result")
            if(response.error) {
                result.style.color = "tomato"
                result.textContent = "Fail"
                const simulContainer = document.getElementsByClassName("simul-container")[0]
                simulContainer.innerHTML += `<div style="color:tomato">
                    ${response.error.message}
                </div>`

                return
            }
            else {
                elt.textContent = ""
                tx.gasLimit = response.result
                tx.gas = response.result
            }
        }
         
  
        fnCode = tx.data ? tx.data.slice(2, 10) : "0x"
        fnName = "transfer"
        if (tx.data?.length > 2) {
            const rep = await fetch("https://otter-pulsechain.g4mm4.io/signatures/" + fnCode)
            fnName = rep.ok ? (await rep.text()).split("(")[0] : "contract call"
        }

   
        const item = await chrome.storage.local.get('selected')

        let linkTo = item.selected.chainId == "0x1" ? "https://eth.blockscout.com/api/v2/addresses/" : "https://apphex.win/blockscout/#/address/"
        linkTo += tx.to
        document.getElementById('to').innerHTML = `<a href="${linkTo}" target="_blank">${tx.to.slice(0, 6) + "..." + tx.to.slice(-4)}</a>`


        if(tx.data && tx.data.length>3) {
            fetch((item.selected.chainId == "0x1" ? "https://eth.blockscout.com/api/v2/addresses/" : "https://api.scan.pulsechain.com/api/v2/addresses/") +tx.to)
            .then(rep => rep.ok ? rep.json() : {})
            .then(json => json.name?.length>0 ? document.getElementById('to').innerHTML = `<a href="${linkTo}" target="_blank">${json.name}</a>`  : {})
        }

       
       


        const items = await chrome.storage.local.get("priorities")
        console.log(items)
        priorities = items.priorities ?? {}

        if(priorities[fnCode]) {
            document.getElementById("priority").activeid = priorities[fnCode].id
            document.getElementById("custom").value = priorities[fnCode].value
        }

        // up date 
        work()
        timer = setInterval(() => work(), 2000)

    })
})


let currentBlock = 0

async function work() {

    const item = await chrome.storage.local.get('selected')
    const wallets = await chrome.storage.local.get("wallets")
    const UNIT = item.selected.chainId == "0x1" ? "ETH" : "PLS"

    document.getElementById('wallet').textContent = wallets.wallets[item.selected.wallet].label
    document.getElementById('wallet').style.borderColor = wallets.wallets[item.selected.wallet].color1
    document.getElementById('net').textContent = item.selected.chainId == "0x1" ? "Ethereum" : "Pulsechain"

    const block = await chrome.runtime.sendMessage({
        type: "REQUEST_INTERNAL",
        params: { method: 'eth_blockNumber', params: [] }
    })

    console.log(block)
    if (block.result == currentBlock) {
        return
    }

    currentBlock = block.result

    const header = await chrome.runtime.sendMessage({
        type: "REQUEST_INTERNAL",
        params: { method: 'eth_getBlockByNumber', params: [currentBlock, false] }
    })

    
    //    console.log(header)
    /*    let min = 1e18
        let max = 0
        for (var i = 0; i < header.transactions.length; i++) {
            if (header.transactions[i].maxPriorityFeePerGas) {
                const p = parseInt(header.transactions[i].maxPriorityFeePerGas) / 1e9
                console.log(p)
                min = Math.min(min, p)
                max = Math.max(max, p)
            }
        }
        console.log(min, max)
    */

    //NONCE = TransactionCount
    const count = await chrome.runtime.sendMessage({
        type: "REQUEST_INTERNAL",
        params: { method: 'eth_getTransactionCount', params: [item.selected.wallet, "latest"] }
    })

    const nonce = parseInt(count.result) 
    tx.nonce = "0x" + nonce.toString(16)
    document.getElementById("nonce").textContent = nonce

    const simulContainer = document.getElementsByClassName("simul-container")[0]
    simulContainer.innerHTML = `<div>${fnName}</div>`

    if(fnCode=="095ea7b3") {
        const data = decodeParameters(["address","uint256"],tx.data.slice(10))
        console.log("approve data", data)
        let linkTo = item.selected.chainId == "0x1" ? "https://eth.blockscout.com/api/v2/addresses/" : "https://apphex.win/blockscout/#/address/"
        simulContainer.innerHTML += `<a href="${linkTo}${data[0]}">${data[0]}</a>`
    }

    if(item.selected.chainId == "0x1") {

        nativePrice = await chrome.runtime.sendMessage({
            type: "RESERVES_PRICE",
            params: {
                lp: "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852",
                factor: 20
            }
        })

    }
    else {

        nativePrice = await chrome.runtime.sendMessage({
            type: "RESERVES_PRICE",
            params: {
                lp: "0xE56043671df55dE5CDf8459710433C10324DE0aE",
                factor: 8
            }
        })
    }

    nextBaseFee = 0
    const baseFee = BigInt(header.result.baseFeePerGas)
    const gasUsed = BigInt(header.result.gasUsed)
    const parentGasTarget = BigInt(header.result.gasLimit) / 2n
    if (header.result.gasUsed > parentGasTarget) {
        // If the parent block used more gas than its target, the baseFee should increase.
        // max(1, parentBaseFee * gasUsedDelta / parentGasTarget / baseFeeChangeDenominator)
        const delta = gasUsed - parentGasTarget
        const num = ((baseFee * delta) / parentGasTarget) / 8n
        nextBaseFee = baseFee + num
    } else {
        // Otherwise if the parent block used less gas than its target, the baseFee should decrease.
        // max(0, parentBaseFee * gasUsedDelta / parentGasTarget / baseFeeChangeDenominator)
        const delta = parentGasTarget - gasUsed
        const num = ((baseFee * delta) / parentGasTarget) / 8n
        nextBaseFee = baseFee - num
    }

    console.log("baseFee",baseFee, nextBaseFee)

    tx.maxFeePerGas = "0x" + parseInt(Number(nextBaseFee) * 1.15).toString(16)

    await updateFee()

    chrome.runtime.sendMessage({
        type: "REQUEST_INTERNAL",
        params: {
            method: 'debug_traceCall', params: [tx, 'latest', {
                tracer: 'callTracer',
                tracerConfig: { withLog: true },
            }]
        }
    },
        async trace => {
            console.log("trace", trace, tx)
            const result = document.getElementById("result")

            if (trace.error) {
                result.style.color = "tomato"
                result.textContent = "Fail"
                simulContainer.innerHTML += `<div style="color:tomato">
                    ${trace.error.message}
                </div>`

                document.getElementById('sign').disabled = true
            }
            else if (trace.result.error) {
                result.style.color = "tomato"
                result.textContent = "Fail"
                simulContainer.innerHTML += `<div style="color:tomato">
                    ${trace.result.error}
                    <p>${trace.result.revertReason}</p>
                </div>`

                document.getElementById('sign').disabled = true
            }
            else {
                result.style.color = "lawngreen"
                result.textContent = "Pass"

                
                if (tx.value && tx.value != "0x0") {
                    simulContainer.innerHTML += `<div style="color:tomato">
                        - ${(tx.value / 1e18).toLocaleString("en-US")} ${UNIT}
                    </div>`
                }
                
                let transfers = []
                const findTransfers = (a, n) => {
                    a.logs ? a.logs.filter(p => p.topics[0] == "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef").forEach(log => {
                        const from = decodeParameter("address", log.topics[1])
                        const to = decodeParameter("address", log.topics[2])
                        const amount = decodeParameter("uint256", log.data)
                        const token = log.address

                        console.log(from,to,amount,token)


                        if (from.toLowerCase() == item.selected.wallet.toLowerCase()) {
                            transfers.push({
                                type: "gave",
                                amount,
                                token
                            })
                        }
                        else if (to.toLowerCase() == item.selected.wallet.toLowerCase()) {
                            transfers.push({
                                type: "got",
                                amount,
                                token
                            })
                        }
                    }) : {}

                    //withdraw
                    a.logs ? a.logs.filter(p => p.topics[0] == "0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65").forEach(log => {
                        const amount = decodeParameter("uint256", log.data)
                        transfers.push({
                            type: "got",
                            amount,
                            token: "0x0000000000000000000000000000000000000000"
                        })
                    }) : {}


                    a.calls ? a.calls.forEach(c => findTransfers(c, ++n)) : {}
                }


                findTransfers(trace.result, 0)


                for (const item of transfers) {

                    const token = await chrome.runtime.sendMessage({
                        type: "REQUEST_TOKEN_INFO",
                        params: item.token
                    })

                    simulContainer.innerHTML +=
                        `<div style="color:${item.type == "gave" ? "tomato" : "lawngreen"}">
                        ${item.type == "gave" ? "-" : "+"} ${(Number(item.amount) / Math.pow(10, token.decimals)).toLocaleString()} ${token.symbol}
                    </div>`
                }

                document.getElementById('sign').disabled = false
            }
        })
}

async function updateFee() {

console.log(nativePrice, nativePrice/1e8)

    const item = await chrome.storage.local.get('selected')
    const UNIT = item.selected.chainId == "0x1" ? "ETH" : "PLS"

    let prio = 0
    const prioId = document.getElementById("priority").activeid

    switch(prioId) {
        case "prioLow":     prio = Number(nextBaseFee) * 0.0001 ; break; //0.01% 
        case "prioNormal":  prio = Number(nextBaseFee) * 0.01 ; break; //1% 
        case "prioHigh":    prio = Number(nextBaseFee) * 0.1 ; break; //10% 
        case "prioCustom" : prio = document.getElementById("custom").value * 1e9
    }

    tx.maxPriorityFeePerGas = "0x" + parseInt(prio).toString(16)

    const feePls = BigInt(tx.gasLimit) * (BigInt(tx.maxFeePerGas) + BigInt(tx.maxPriorityFeePerGas))
    document.getElementById('fee').textContent = (Number(feePls)/1e18).toFixed(item.selected.chainId=="0x1"?6:0) + " " + UNIT
    document.getElementById('feeUsd').textContent = (Number(feePls)/1e18 * nativePrice/1e8 ).toFixed(3) + " USD"
}

async function signWithLedger(path, addr) {
    const errorOutput = document.getElementById('errorOutput');
    errorOutput.textContent = "";

    try {
        // Request USB connection to Ledger
        const transport = await TransportWebUSB.create();

        // Initialize Ethereum app on Ledger
        const appeth = new Eth(transport);

        const common = createCustomCommon({ chainId: tx.chainId }, Mainnet);
        const txData = createTx(tx, { common });
        const rlp = txData.getMessageToSign()
        //Format: { chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data, accessList, v, r, s }
        console.log(txData, ">RLP", rlp)
        const resolution = await ledgerService.resolveTransaction(rlp, null, { erc20: true, nft: false, externalPlugins: false });
        const result = await appeth.signTransaction(path, rlp, resolution)
        const txData2 = txData.addSignature("0x" + result.v, "0x" + result.r, "0x" + result.s)
        const sender = txData2.getSenderAddress().toString()
        if (sender != addr.toLowerCase()) {
            errorOutput.textContent = `Error: wrong sender address ${sender}`;
            return null
        }

        return bytesToHex(txData2.serialize())
    }
    catch (error) {
        console.log(error)
        errorOutput.textContent = `Error: ${error.message}`;
    }
}


async function signWithTrezor(path, addr) {
    const errorOutput = document.getElementById('errorOutput');
    errorOutput.textContent = "";

    try {
        TrezorConnect.init({
                manifest: {
                  email: 'hexwhale@protonmail.com',
                  appUrl: 'https://apphex.win'
                },
                transports: ['BridgeTransport', 'WebUsbTransport'],
                connectSrc: 'https://connect.trezor.io/9/'
              })

        const common = createCustomCommon({ chainId: tx.chainId }, Mainnet);
        const txData = createTx(tx, { common });
        const txJson = txData.toJSON()
        txJson.chainId = parseInt(tx.chainId)

        const result = await TrezorConnect.ethereumSignTransaction({ path, transaction: txJson});
        console.log("signTransaction",result);
        
        if(result.success==false) {
            errorOutput.textContent = result.payload.error
            return null;
        }
        
        return result.payload.serializedTx
    }
    catch (error) {
        console.log(error)
        errorOutput.textContent = `Error: ${error.message}`;
    }
}