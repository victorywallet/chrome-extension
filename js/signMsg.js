import { decodeParameters, decodeParameter } from 'web3-eth-abi';
import { fluentTextField, fluentTab, fluentTabs, fluentTabPanel,fluentDialog, fluentButton, fluentCard, provideFluentDesignSystem, fluentDesignSystemProvider } from "@fluentui/web-components";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import Eth from "@ledgerhq/hw-app-eth";
import { ledgerService } from "@ledgerhq/hw-app-eth";
import TrezorConnect from "@trezor/connect-webextension";
import { createTx } from '@ethereumjs/tx'
import { createCustomCommon, Mainnet } from '@ethereumjs/common'
import { ecrecover, hashPersonalMessage, toBytes, bytesToHex} from '@ethereumjs/util'

let chainId = 0;
let params = null;
let done = false;

document.addEventListener('DOMContentLoaded', async () => {

    provideFluentDesignSystem().withDesignTokenRoot().register(fluentTextField(), fluentTab(), fluentTabs(), fluentTabPanel(),fluentDialog(), fluentButton(), fluentCard(), fluentDesignSystemProvider())

    const signBt = document.getElementById('sign')
    
    signBt.addEventListener("click", async () => {
        
        const selected = await chrome.storage.local.get('selected')
        const wallets = await chrome.storage.local.get('wallets')
        console.log(selected, wallets)
        const wallet = wallets.wallets[selected.selected.wallet]
        console.log(wallet)

        let signature

        switch(wallet.device){
            case "ledger" :
                signature = await signWithLedger(wallet.path)
                break

            case "trezor" :
                signature = await signWithTrezor(wallet.path)
                break
        }

        if(signature) {
            chrome.runtime.sendMessage({ type: "SIGN_DONE", params: signature})
            .then(() => window.close())
        }
    })

    document.getElementById('cancel').addEventListener("click", async () =>
        chrome.runtime.sendMessage({ type: "SIGN_CANCEL" })
            .then(() => window.close()))

    window.addEventListener('beforeunload', (event) => done ? {} :
        chrome.runtime.sendMessage({ type: "SIGN_CANCEL" }))

    chrome.runtime.sendMessage({ type: "SIGN_READY" }).then(async e => {
                 
console.log(e)

        document.getElementById('url').textContent = e.host
        document.getElementById('logo').src = e.icon
        document.getElementById('owner').textContent = e.account.slice(0,6)+"..."+e.account.slice(-4)
        document.getElementsByClassName("simul-container")[0].innerHTML = 
            e.method=="eth_signTypedData_v4" ? 
                Object.entries(JSON.parse(e.data).message).map(p=>`${p[0]} : ${JSON.stringify(p[1])}`).join("<br>") :
                Buffer.from(e.data.replace('0x', ''), 'hex').toString('utf8');

        const item = await chrome.storage.local.get('selected')
        const wallets = await chrome.storage.local.get("wallets")

        document.getElementById('wallet').textContent = wallets.wallets[item.selected.wallet].label
        document.getElementById('wallet').style.borderColor = wallets.wallets[item.selected.wallet].color1
        signBt.disabled = false
        params = e
        chainId = item.selected.chainId
    })
})


async function signWithLedger(path) {
    const errorOutput = document.getElementById('errorOutput');
    errorOutput.textContent = "";

    try {
        // Request USB connection to Ledger
        const transport = await TransportWebUSB.create();

        // Initialize Ethereum app on Ledger
        const appeth = new Eth(transport);


        

        let result
        if(params.method=="eth_signTypedData_v4") {
            const json = JSON.parse(params.data)
            result = await appeth.signEIP712Message(path, json)
        }
        else {
            let hex = params.data;
            if(params.data.startsWith("0x")) {
                hex = params.data.slice(2)
            }
            else {
                hex = Buffer.from(params.data).toString("hex")
            }
            
            result = await appeth.signPersonalMessage(path, hex)
        }

//        const recover = ecrecover(Buffer.from(msg) ,v, result.r, result.s, 369)
//        console.log('receover',recover)

//        let v =  (result.v-27)+(35 + chainId * 2)%256
//        console.log("v",v)

        return "0x" + result.r + result.s + result.v.toString(16);
    }
    catch (error) {
        console.log(error)
        errorOutput.textContent = `Error: ${error.message}`;
    }
}


async function signWithTrezor(path) {
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


        

        let result

        if(params.method=="eth_signTypedData_v4") {
            result = await TrezorConnect.ethereumSignTypedData({ path, data: JSON.parse(params.data), metamask_v4_compat: true });
        }
        else {
            let data = params.data;
            if(params.data.startsWith("0x")) {
                data = Buffer.from(params.data.replace('0x', ''), 'hex').toString('utf8')            
            }
            result = await TrezorConnect.ethereumSignMessage({ path, message: data });
            console.log("ethereumSignMessage",result);
        }

        if(result.success==false) {
            errorOutput.textContent = result.payload.error
            return null;
        }

        if(params.account != result.payload.address) {
            errorOutput.textContent = "Wrong address " + result.payload.address
            return null;
        }
        
        return result.payload.signature
    }
    catch (error) {
        console.log(error)
        errorOutput.textContent = `Error: ${error.message}`;
    }
}