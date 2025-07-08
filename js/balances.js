import { fluentProgressRing, fluentTextField, fluentButton, provideFluentDesignSystem, fluentDesignSystemProvider } from "@fluentui/web-components";


provideFluentDesignSystem().register(fluentProgressRing(), fluentTextField(), fluentButton(), fluentDesignSystemProvider())

let selected
let chains
let sumElt
let list
let nativeLogo
let explorer
let errorOutput

document.addEventListener('DOMContentLoaded', () => {
    errorOutput = document.getElementById("errorOutput")
    sumElt = document.getElementById("sum")
    list = document.getElementById("tokens")
    document.getElementById("queryBtn").addEventListener('click', () => {
        getTokens(selected.wallet, chains[selected.chainId].id, document.getElementById("date").value)
    })

    const now = new Date()
    document.getElementById("date").value = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

    init()
})

chrome.storage.local.onChanged.addListener(async changes => {
    if (changes.selected) {
        sumElt.textContent=""
        list.innerHTML = ""
        init()
    }
})


async function init() {
    selected = (await chrome.storage.local.get('selected')).selected
    chains = (await chrome.storage.local.get('chains')).chains
    explorer = chains[selected.chainId].explorer.replace("tx","address")

    nativeLogo = "https://tokens.app.pulsex.com/images/tokens/0xA1077a294dDE1B09bB078844df40758a5D0f9a27.png" 

    document.getElementById("title").textContent = "Balance on " + chains[selected.chainId].name
    document.getElementById("wallet").textContent = "For " + selected.wallet
}

async function getTokens(wallet, chain, date) {

    errorOutput.textContent=""
    sumElt.textContent=""
    list.innerHTML = "<fluent-progress-ring></fluent-progress-ring>"

    const options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'X-API-Key': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImE1MTNhYWFlLTE1NjYtNDkzMS05NDg3LTk3ODdkYTBkODBiYyIsIm9yZ0lkIjoiNDQ4NDAzIiwidXNlcklkIjoiNDYxMzU0IiwidHlwZUlkIjoiYTMxZGJkZjYtZjM2MS00OTZmLWI4ZWEtZGNhNWQ3MjY2NGRkIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NDc4NTczMDcsImV4cCI6NDkwMzYxNzMwN30.xCrcAj6yG34xZm-GRwjVppiksIQwyq0D8dmM_J-Cry0"
        }
    };

    try {
        const urlDate = `https://deep-index.moralis.io/api/v2.2/dateToBlock?chain=${chain}&date=${date}`
        const blockResponse = await fetch(urlDate, options)

        if (!blockResponse.ok) {
            throw new Error(`HTTP error! Status: ${blockResponse.status}`);
        }
        const block = await blockResponse.json();

        const urlTokens = `https://deep-index.moralis.io/api/v2.2/wallets/${wallet}/tokens?chain=${chain}&to_block=${block.block}&exclude_spam=true`;
        const response = await fetch(urlTokens, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        //console.log(JSON.stringify(data, null, 2)); // Pretty-print the response

        list.innerHTML = ""
        let sum = 0;

        for (var token of data.result) {
            const v = parseFloat(token.usd_value)
            if (v > 1) {
                sum+=v;
                const listItem = document.createElement('fluent-list-item');
                list.appendChild(listItem)

                const maximumFractionDigits = Math.max(0, (token.usd_price.toString().split('.')[0].length) - 2)
                console.log(token.usd_price, maximumFractionDigits,(token.balance / 10 ** token.decimals))

                listItem.innerHTML = `
                    <div class="line">
                        <img src="${token.native_token && selected.chainId=="0x171"? nativeLogo : token.logo}">
                        <div class="line0">
                        <div class="line1"> <a href="${explorer}${token.token_address}">${token.name}</a> <div>${parseInt(token.usd_value).toLocaleString(navigator.language)} USD</div> </div>
                        <div class="line2"> ${(token.balance / 10 ** token.decimals).toLocaleString(navigator.language,{maximumFractionDigits})} ${token.symbol}</div>
                        </div>
                    </div>`
            }
        }
        
        sumElt.innerHTML = `Total: ${sum.toLocaleString(navigator.language,{maximumFractionDigits:0})} USD`

    } catch (error) {
        list.innerHTML = ""
        errorOutput.textContent = "Error fetching tokens: "+error.message
    }
}

