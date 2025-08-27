console.log("connect.js")

document.addEventListener('DOMContentLoaded',async () => {

    const div = document.getElementById("wallet")
    const item = await chrome.storage.local.get('selected')
    const wallets = (await chrome.storage.local.get('wallets')).wallets
    const wallet =  wallets[item.selected.wallet] //item.selected.wallet.slice(0,6) + "..." + item.selected.wallet.slice(-4)
    div.style.borderColor = wallet.color1
    div.textContent = wallet.label
                        

    document.getElementsByClassName('confirm')[0].addEventListener('click', ()=>
            chrome.runtime.sendMessage({type:"CONNECT_CONFIRM"})
            .then(()=>window.close()))
    

    document.getElementsByClassName('cancel')[0].addEventListener('click', ()=>
            chrome.runtime.sendMessage({type:"CONNECT_CANCEL"})
            .then(()=>window.close()))

    window.addEventListener('abort', () => 
            chrome.runtime.sendMessage({type:"CONNECT_CLOSE"})
            .then(()=>window.close()))

     window.addEventListener('blur', () => 
            chrome.runtime.sendMessage({type:"CONNECT_CLOSE"})
            .then(()=>window.close()))

    window.addEventListener('beforeunload', (event) => 
        chrome.runtime.sendMessage({type:"CONNECT_CLOSE"}))
    
})


chrome.runtime.sendMessage({type:"CONNECT_READY"}).then(e=>{
    document.getElementsByClassName('url')[0].textContent = e.host
    document.getElementsByClassName('logo')[0].src = e.icon
})

