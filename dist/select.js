/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./js/select.js ***!
  \**********************/

document.addEventListener('DOMContentLoaded', (e)=>{

    console.log("start", window.opener)

    window.opener.postMessage({target:"victory-select", type: "loaded"}, "*")


})

let selectedItem = null

window.addEventListener('message' , e => {
  
    
    for(var p of e.data.providers) {
        const uuid = p.uuid;

        const icon = document.createElement("img")
        icon.src = p.icon
        const name = document.createElement("span")
        name.innerHTML = p.name +"<br>"+ (p.account??"(No account)")

        const div = document.createElement("div")
        div.className="item"
        div.append(icon)
        div.append(name)

        document.getElementById("list").append(div)


        div.addEventListener('click', ()=>{            
            selectedItem = uuid
            window.close()
        })
    }
    
})

window.addEventListener('beforeunload' , ()=>{
    window.opener.postMessage({target:"victory-select", type:"selected", params: selectedItem},"*")
})

window.addEventListener('blur' , ()=>{
    window.opener.postMessage({target:"victory-select", type:"selected", params: null},"*")
    window.close()
})

/******/ })()
;