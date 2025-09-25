import {fluentMenu, fluentMenuItem, fluentProgressRing, fluentSelect, fluentOption, fluentTextField, fluentDialog, fluentButton, fluentCard, provideFluentDesignSystem, fluentDesignSystemProvider } from "@fluentui/web-components";
import { encodeFunctionCall } from "web3-eth-abi";

const TransferAbi = {
  "constant": true,
  "inputs": [
    {
      "name": "_to",
      "type": "address"
    },
    {
      "name": "_value",
      "type": "uint256"
    }
  ],
  "name": "transfer",
  "outputs": [
    {
      "name": "success",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}

let tokens
let tokenSelected

const nativeLogo = "https://tokens.app.pulsex.com/images/tokens/0xA1077a294dDE1B09bB078844df40758a5D0f9a27.png" 

document.addEventListener('DOMContentLoaded', async () => {

    provideFluentDesignSystem().register(fluentMenu(), fluentMenuItem(), fluentProgressRing(), fluentSelect(), fluentOption(), fluentTextField(), fluentDialog(), fluentButton(), fluentCard(), fluentDesignSystemProvider())

    const title = document.getElementById("title")
    const availableBalance = document.getElementsByClassName("available-balance")[0]
    const usdConvert = document.getElementsByClassName("usd-conversion")[0]
    const logo =  document.getElementsByClassName("logo")[0]
    const progress = document.getElementById('progress')
    const tokensBt = document.getElementById('tokensBt')
    const tokensMenu = document.getElementById('tokensMenu')
    const to = document.getElementById('to')
    const amount = document.getElementById('amount')
    const max = document.getElementById('max')

    const selected = (await chrome.storage.local.get('selected')).selected
    let sender = selected.wallet;
    let chainId = selected.chainId;

    const chains = (await chrome.storage.local.get('chains')).chains
    const chain = chains[chainId]

    const bal = await chrome.runtime.sendMessage({
        type: "REQUEST_INTERNAL",
        params: { method: 'eth_getBalance', params: [sender, 'latest'] }
    })
    
    tokenSelected = {
        native_token: true,
        name : chain.symbol,
        logo : chainId=="0x1" ? "../icons/eth.png" : "../icons/pls.png",
        usd_price: 0,
        balance: bal.result,
        decimals: 18,
        symbol: chain.symbol,
    }
    title.textContent = "Send " + tokenSelected.name
    logo.src = tokenSelected.logo

    const maximumFractionDigits = Math.max(0, (tokenSelected.usd_price.toString().split('.')[0].length) - 2)
    availableBalance.textContent = `Available ${(tokenSelected.balance / 10 ** tokenSelected.decimals).toLocaleString(navigator.language,{maximumFractionDigits})} ${tokenSelected.symbol}`


    const update = async ()=>{

        const wallets = await chrome.storage.local.get('wallets')
        const walletInfo = wallets.wallets[sender]
        document.getElementById('sender').textContent = walletInfo.label
        document.getElementById('sender').style.borderColor = walletInfo.color1

        if(token == "native")   {
            logo.src = chainId == "0x1" ? "../icons/eth.png" : "../icons/pls.png"
            
            const balance = await chrome.runtime.sendMessage({
                type: "REQUEST_INTERNAL",
                params: { method: 'eth_getBalance', params: [sender, 'latest'] }
            })

            availableBalance.textContent = balance.result
        }


        progress.hidden=false
        tokensBt.hidden=true
        tokensMenu.innerHTML="";
        tokens = await getTokens(sender,chainId)
        for (var token of tokens) {
            
            const v = parseFloat(token.usd_value)
            if (v > 0.1) {

                const maximumFractionDigits = Math.max(0, (token.usd_price.toString().split('.')[0].length) - 2)

                const item = `
                        <fluent-menu-item id="${token.token_address}">
                        <div class="menu-content">
                            <span class="line1"> <img src="${token.native_token && chainId=="0x171"? nativeLogo : token.logo}"> ${token.name}  </span>
                            <span class="line2" > ${(token.balance / 10 ** token.decimals).toLocaleString(navigator.language,{maximumFractionDigits})}</span>
                        </div>
                        </fluent-menu-item>`

                tokensMenu.innerHTML+=item
            }
        }
        progress.hidden=true
        tokensBt.hidden=false
    }

    chrome.storage.local.onChanged.addListener(async changes => {
        if(changes.selected) {
            sender = changes.selected.newValue.wallet;

            if(chainId != changes.selected.newValue.chainId){
                window.location.reload()
            }
            else {
                await update()
            }
        }
    })

    await update()

    amount.addEventListener('keyup',()=>{
        usdConvert.textContent = (tokenSelected.usd_price * amount.value).toLocaleString(navigator.language ,{maximumFractionDigits:0}) + " USD"
    })

    max.addEventListener('click',()=>{
        amount.value = tokenSelected.balance / 10 ** tokenSelected.decimals
    })

    tokensMenu.addEventListener('change', (e)=>{
        console.log(e.target.id)      
        tokenSelected = tokens.find(p=>p.token_address==e.target.id)
        title.textContent = "Send " + tokenSelected.name
        logo.src = tokenSelected.logo

        const maximumFractionDigits = Math.max(0, (tokenSelected.usd_price.toString().split('.')[0].length) - 2)
        availableBalance.textContent = `Available ${(tokenSelected.balance / 10 ** tokenSelected.decimals).toLocaleString(navigator.language,{maximumFractionDigits})} ${tokenSelected.symbol}`

        tokensMenu.toggleAttribute("hidden")
    })

    tokensBt.addEventListener('click', ()=> {
        tokensMenu.toggleAttribute("hidden")
    })

    document.getElementById('cancel').addEventListener("click", async () => {
        window.close()
    })


    document.getElementById('send').addEventListener("click", async () => {

        if(to.value.length<42 || amount.value.length==0) {
            return
        }

        if(tokenSelected.native_token) {
            const ret = await chrome.runtime.sendMessage({
                type: "CONFIRM_TX_INTERNAL",
                params: {
                    host: "Send",
                    tx: {
                        from: sender,
                        to: to.value.trim(),
                        value: ethToWei(amount.value.toString().trim())
                    }
                }
            })    
        }
        else {
            console.log(amount.value)
            const amountStr = amount.value.toString().trim()
            const removeDecimals = amountStr.indexOf('.')<0 ? 0 : Math.min(tokenSelected.decimals , amountStr.length - amountStr.indexOf('.') + 1)
            const slice = amountStr.indexOf('.')+removeDecimals+1
            const amountStr2 = (slice==0?amountStr:amountStr.slice(0, slice )).replace('.','')

            const amountConverted = BigInt(amountStr2) * 10n**BigInt(tokenSelected.decimals-removeDecimals)
            console.log("amountConverted",amountConverted)

            const data = encodeFunctionCall(TransferAbi,[to.value, amountConverted.toString()])

            const ret = await chrome.runtime.sendMessage({
                type: "CONFIRM_TX_INTERNAL",
                params: {
                    host: "Send",
                    tx: {
                        from: sender,
                        to: tokenSelected.token_address,
                        value: "0x0",
                        data
                    }
                }
            })   
        }
    })
})     


function ethToWei(eth) {
    // Handle the ETH value as a string to avoid floating-point precision issues
    const ethStr = eth.toString();
    const [integerPart, decimalPart = ''] = ethStr.split('.');
    
    // Convert to Wei by multiplying by 10^18
    const weiPerEth = BigInt('1000000000000000000'); // 10^18
    const integerWei = BigInt(integerPart) * weiPerEth;
    
    console.log(integerWei)

    // Handle decimal part if it exists
    let totalWei = integerWei;
    if (decimalPart) {
        // Pad or trim decimal part to 18 digits
        const paddedDecimal = decimalPart.padEnd(18, '0').slice(0, 18);
        totalWei += BigInt(paddedDecimal);
    }
    
    console.log(totalWei)

    return "0x"+totalWei.toString(16);
}



async function getTokens(wallet, chain, date) {

    const options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'X-API-Key': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImE1MTNhYWFlLTE1NjYtNDkzMS05NDg3LTk3ODdkYTBkODBiYyIsIm9yZ0lkIjoiNDQ4NDAzIiwidXNlcklkIjoiNDYxMzU0IiwidHlwZUlkIjoiYTMxZGJkZjYtZjM2MS00OTZmLWI4ZWEtZGNhNWQ3MjY2NGRkIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NDc4NTczMDcsImV4cCI6NDkwMzYxNzMwN30.xCrcAj6yG34xZm-GRwjVppiksIQwyq0D8dmM_J-Cry0"
        }
    };

    try {
        const urlTokens = `https://deep-index.moralis.io/api/v2.2/wallets/${wallet}/tokens?chain=${chain}&exclude_spam=true`;
        const response = await fetch(urlTokens, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.result
    }
    catch{

    }
}
