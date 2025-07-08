const ExtensionId = "hblpikjfepdagonlokjihdchgijejfde";


const container = document.head || document.documentElement;
const injectScript = document.createElement('script');
injectScript.setAttribute('src', chrome.runtime.getURL('dist/provider.js'));
container.insertBefore(injectScript, container.children[0]);
container.removeChild(injectScript);

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
    if (sender.id == ExtensionId) {
        window.postMessage(msg)
    }
})


