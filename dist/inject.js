/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./provider.js":
/*!*********************!*\
  !*** ./provider.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class MyWalletProvider {
    constructor() {
        this.isMyWallet = true; // Identifier for your wallet
        this.callbacks = new Map(); // Store request callbacks
        this.id = 0; // JSON-RPC request ID
    }
        
   request = (data) => {
        this.id += 1;/*
        return new Promise((resolve, reject) => {
            // Send request to background script
            chrome.runtime.sendMessage({
                type: 'WALLET_REQUEST',
                payload: { id: this.id, method, params }
            }, (response) => {
                if (response.error) {
                    reject(new Error(response.error));
                } else {
                    resolve(response.result);
                }
            });
        });*/
    }

    // Enable method for backwards compatibility
    enable = () => {
        return this.request({ method: 'eth_requestAccounts' });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyWalletProvider);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************!*\
  !*** ./inject.js ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _provider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./provider.js */ "./provider.js");


// EIP-6963 provider metadata
const providerDetail = {
  info: {
    uuid: "cc09d9cc-5060-477e-97c8-f33ba29814c4", // Unique identifier
    name: 'My Wallet',
    rdns: 'com.my.wallet', // Reverse DNS identifier
    icon: 'data:image/png;base64,iVBORw0KGgo...' // Base64-encoded icon
  },
  provider: new _provider_js__WEBPACK_IMPORTED_MODULE_0__["default"]()
};

// Announce provider on page load
function announceProvider() {
  //console.log(providerDetail)

  window.dispatchEvent(new CustomEvent('eip6963:announceProvider', {
    detail: providerDetail
  }));
}

// Listen for requestProvider events
window.addEventListener('eip6963:requestProvider', () => {
  console.log("requestProvider")
  announceProvider();
});

// Initial announcement
//announceProvider();

console.log("inject")

chrome.runtime.sendMessage({test:"ok"})

const div = document.createElement("div")
div.innerText = providerDetail 
div.innerText += providerDetail.info
div.innerText += providerDetail.provider

document.body.appendChild(div)
})();

/******/ })()
;