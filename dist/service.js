/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/client.js":
/*!**********************!*\
  !*** ./js/client.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WebSocketClient: () => (/* binding */ WebSocketClient)
/* harmony export */ });
class WebSocketClient {
    constructor(url) {
        this.wssUrl = url;
        this.pendingRequests = new Map(); // Track request callbacks
        this.subscriptions  = new Map(); // Track Subscription 
        this.isConnected = false;
        this.internalId = 1
    }


    connect() {
        console.log("ws.connect")

        this.ws = new WebSocket(this.wssUrl);

        // Handle connection open
        this.ws.onopen = () => {
            this.isConnected = true;
            console.log('WebSocket connected');
        };

        // Handle incoming messages
        this.ws.onmessage = (event) => {
            try {
                const response = JSON.parse(event.data);
                //console.log(response)

                if(response.method=="eth_subscription"){
                    
                    const subId = response.params.subscription

                    if(this.subscriptions.has(subId)) {
                        this.subscriptions.get(subId).callback(subId, response.params.result)
                    }
                    else {
                        console.log("subscription NOT FOUND")
                    }
                }
                else {
                    const requestId = Array.isArray(response) ? response[0].id : response.id; // Assume server includes requestId

                    if (this.pendingRequests.has(requestId)) {
                        const { resolve } = this.pendingRequests.get(requestId);
        
                        if(Array.isArray(response)) {

                        }
                        else {
                            response.id = requestId.split("-")[0] // to original id
                        }
                        resolve(response);
                        this.pendingRequests.delete(requestId);
                    }
                    else {
                        console.log("requestId NOT FOUND")
                    }
                }

            } catch (error) {
                console.error('Failed to parse response:', error);
            }
        };

        // Handle errors
        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.pendingRequests.forEach(({ reject }) => reject(new Error('WebSocket error')));
            this.pendingRequests.clear();
        };

        // Handle connection close
        this.ws.onclose = () => {
            this.isConnected = false;
            console.log('WebSocket disconnected');
            this.pendingRequests.forEach(({ reject }) => reject(new Error('WebSocket disconnected')));
            this.pendingRequests.clear();
        };
    }


    disconnect() {
        this.subscriptions.forEach((v,k)=> 
            this.request({
                method: "eth_unsubscribe",
                params: [k]              
            }))
    }

    // Function to send request
    request(message) {

        return new Promise(async (resolve, reject) => {

            if(Array.isArray(message) && message.length>0) {
                message[0].id = (message[0].id ?? this.internalId) + "-" + (this.internalId++)
                this.pendingRequests.set(message[0].id, { resolve, reject });
            }
            else {
                message.id = (message.id ?? this.internalId) + "-" + (this.internalId++)
                this.pendingRequests.set(message.id, { resolve, reject });
            }

            if (!this.isConnected) {
                this.connect();
            }
            
            // wait connection
            while(this.ws.readyState != WebSocket.OPEN) {
                console.log("wait cnx",this.ws.readyState)
                await new Promise(r => setTimeout(r, 50));
            }

            // Send request to api/test endpoint
            this.ws.send(JSON.stringify(message));            
        });
    }

    subscribe(params, callback) {
        return new Promise(async (resolve, reject) => {
            this.request({
                method: "eth_subscribe",
                params              
            })
            .then(p => {
                this.subscriptions.set(p.result,{callback})
                resolve(p)
            })
            .catch(e=>console.log(e))
        })
    }

    // Optional: Method to close the connection manually
    close() {
        this.ws.close();
    }
}



/***/ }),

/***/ "./js/tx.js":
/*!******************!*\
  !*** ./js/tx.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   storeTx: () => (/* binding */ storeTx)
/* harmony export */ });
/* harmony import */ var web3_eth_abi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-eth-abi */ "./node_modules/web3-eth-abi/lib/esm/index.js");


const fnMem = new Map()
const storage = chrome.storage.local

async function getFnName(fn) {

  if(fn=="0x") return "Transfer"

  if (fnMem.has(fn)) return fnMem.get(fn)

  const rep = await fetch("https://otter-pulsechain.g4mm4.io/signatures/" + fn.slice(2))
  if (rep.ok) {
    const body = await rep.text()
    fnMem.set(fn, body.split("(")[0])
  }
  else {
    fnMem.set(fn, "contract call")
  }
  return fnMem.get(fn);
}

async function storeTx(_wallet_, tx, rctp, timestamp, host) {

    const data = await storage.get(_wallet_)

    console.log(data)

    if(!data[_wallet_]) {
        data[_wallet_] = {}
    }

    const fn = tx.input.slice(0, 10);

    data[_wallet_][tx.hash] = {
      chainId: tx.chainId,
      dapp: host,
      fn: await getFnName(fn),
      timestamp: parseInt(timestamp),
      nonce: parseInt(tx.nonce),
      failed: rctp.status!="0x1",
      infos:[]
    }

    if (tx.value && tx.value != "0x0") {
        data[_wallet_][tx.hash].infos.push({
            type: "gave",
            amount: parseInt(tx.value),
            token: "0x0000000000000000000000000000000000000000"
        })
    }

    if(rctp.logs) {
        for(const log of rctp.logs) {

            //transfer
            if(log.topics[0]=="0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef") {
                const from = (0,web3_eth_abi__WEBPACK_IMPORTED_MODULE_0__.decodeParameter)("address", log.topics[1])
                const to = (0,web3_eth_abi__WEBPACK_IMPORTED_MODULE_0__.decodeParameter)("address", log.topics[2])
                const amount = (0,web3_eth_abi__WEBPACK_IMPORTED_MODULE_0__.decodeParameter)("uint256", log.data)
                const token = log.address

                //console.log(from,to,amount,token)

                if(from==_wallet_ || to==_wallet_) {

                data[_wallet_][tx.hash].infos.push(
                    {
                    type: from==_wallet_ ? 'gave' : 'got', 
                    token,
                    amount
                    })
                }
            }

            //withdraw
            if(log.topics[0] == "0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65") {
                const amount = (0,web3_eth_abi__WEBPACK_IMPORTED_MODULE_0__.decodeParameter)("uint256", log.data)
                data[_wallet_][tx.hash].infos.push({
                    type: "got",
                    amount,
                    token: "0x0000000000000000000000000000000000000000"
                })
            }
            
        }
    }

    await storage.set(data)

}




/***/ }),

/***/ "./node_modules/abitype/dist/chunk-NHABU752.mjs":
/*!******************************************************!*\
  !*** ./node_modules/abitype/dist/chunk-NHABU752.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __publicField: () => (/* binding */ __publicField)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};




/***/ }),

/***/ "./node_modules/abitype/dist/chunk-WP7KDV47.mjs":
/*!******************************************************!*\
  !*** ./node_modules/abitype/dist/chunk-WP7KDV47.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bytesRegex: () => (/* binding */ bytesRegex),
/* harmony export */   execTyped: () => (/* binding */ execTyped),
/* harmony export */   integerRegex: () => (/* binding */ integerRegex),
/* harmony export */   isTupleRegex: () => (/* binding */ isTupleRegex)
/* harmony export */ });
// src/regex.ts
function execTyped(regex, string) {
  const match = regex.exec(string);
  return match?.groups;
}
var bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
var integerRegex = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
var isTupleRegex = /^\(.+?\).*?$/;




/***/ }),

/***/ "./node_modules/abitype/dist/index.mjs":
/*!*********************************************!*\
  !*** ./node_modules/abitype/dist/index.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseError: () => (/* binding */ BaseError),
/* harmony export */   narrow: () => (/* binding */ narrow),
/* harmony export */   parseAbi: () => (/* binding */ parseAbi),
/* harmony export */   parseAbiItem: () => (/* binding */ parseAbiItem),
/* harmony export */   parseAbiParameter: () => (/* binding */ parseAbiParameter2),
/* harmony export */   parseAbiParameters: () => (/* binding */ parseAbiParameters)
/* harmony export */ });
/* harmony import */ var _chunk_WP7KDV47_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-WP7KDV47.mjs */ "./node_modules/abitype/dist/chunk-WP7KDV47.mjs");
/* harmony import */ var _chunk_NHABU752_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-NHABU752.mjs */ "./node_modules/abitype/dist/chunk-NHABU752.mjs");



// package.json
var name = "abitype";
var version = "0.7.1";

// src/errors.ts
var BaseError = class extends Error {
  constructor(shortMessage, args = {}) {
    const details = args.cause instanceof BaseError ? args.cause.details : args.cause?.message ? args.cause.message : args.details;
    const docsPath = args.cause instanceof BaseError ? args.cause.docsPath || args.docsPath : args.docsPath;
    const message = [
      shortMessage || "An error occurred.",
      "",
      ...args.metaMessages ? [...args.metaMessages, ""] : [],
      ...docsPath ? [`Docs: https://abitype.dev${docsPath}`] : [],
      ...details ? [`Details: ${details}`] : [],
      `Version: ${name}@${version}`
    ].join("\n");
    super(message);
    (0,_chunk_NHABU752_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "details");
    (0,_chunk_NHABU752_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "docsPath");
    (0,_chunk_NHABU752_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "metaMessages");
    (0,_chunk_NHABU752_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "shortMessage");
    (0,_chunk_NHABU752_mjs__WEBPACK_IMPORTED_MODULE_0__.__publicField)(this, "name", "AbiTypeError");
    if (args.cause)
      this.cause = args.cause;
    this.details = details;
    this.docsPath = docsPath;
    this.metaMessages = args.metaMessages;
    this.shortMessage = shortMessage;
  }
};

// src/narrow.ts
function narrow(value) {
  return value;
}

// src/human-readable/runtime/signatures.ts
var errorSignatureRegex = /^error (?<name>[a-zA-Z0-9_]+)\((?<parameters>.*?)\)$/;
function isErrorSignature(signature) {
  return errorSignatureRegex.test(signature);
}
function execErrorSignature(signature) {
  return (0,_chunk_WP7KDV47_mjs__WEBPACK_IMPORTED_MODULE_1__.execTyped)(
    errorSignatureRegex,
    signature
  );
}
var eventSignatureRegex = /^event (?<name>[a-zA-Z0-9_]+)\((?<parameters>.*?)\)$/;
function isEventSignature(signature) {
  return eventSignatureRegex.test(signature);
}
function execEventSignature(signature) {
  return (0,_chunk_WP7KDV47_mjs__WEBPACK_IMPORTED_MODULE_1__.execTyped)(
    eventSignatureRegex,
    signature
  );
}
var functionSignatureRegex = /^function (?<name>[a-zA-Z0-9_]+)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns \((?<returns>.*?)\))?$/;
function isFunctionSignature(signature) {
  return functionSignatureRegex.test(signature);
}
function execFunctionSignature(signature) {
  return (0,_chunk_WP7KDV47_mjs__WEBPACK_IMPORTED_MODULE_1__.execTyped)(functionSignatureRegex, signature);
}
var structSignatureRegex = /^struct (?<name>[a-zA-Z0-9_]+) \{(?<properties>.*?)\}$/;
function isStructSignature(signature) {
  return structSignatureRegex.test(signature);
}
function execStructSignature(signature) {
  return (0,_chunk_WP7KDV47_mjs__WEBPACK_IMPORTED_MODULE_1__.execTyped)(
    structSignatureRegex,
    signature
  );
}
var constructorSignatureRegex = /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
function isConstructorSignature(signature) {
  return constructorSignatureRegex.test(signature);
}
function execConstructorSignature(signature) {
  return (0,_chunk_WP7KDV47_mjs__WEBPACK_IMPORTED_MODULE_1__.execTyped)(constructorSignatureRegex, signature);
}
var fallbackSignatureRegex = /^fallback\(\)$/;
function isFallbackSignature(signature) {
  return fallbackSignatureRegex.test(signature);
}
var receiveSignatureRegex = /^receive\(\) external payable$/;
function isReceiveSignature(signature) {
  return receiveSignatureRegex.test(signature);
}
var modifiers = /* @__PURE__ */ new Set([
  "memory",
  "indexed",
  "storage",
  "calldata"
]);
var eventModifiers = /* @__PURE__ */ new Set(["indexed"]);
var functionModifiers = /* @__PURE__ */ new Set([
  "calldata",
  "memory",
  "storage"
]);

// src/human-readable/runtime/cache.ts
function getParameterCacheKey(param, type) {
  if (type)
    return `${type}:${param}`;
  return param;
}
var parameterCache = /* @__PURE__ */ new Map([
  // Unnamed
  ["address", { type: "address" }],
  ["bool", { type: "bool" }],
  ["bytes", { type: "bytes" }],
  ["bytes32", { type: "bytes32" }],
  ["int", { type: "int256" }],
  ["int256", { type: "int256" }],
  ["string", { type: "string" }],
  ["uint", { type: "uint256" }],
  ["uint8", { type: "uint8" }],
  ["uint16", { type: "uint16" }],
  ["uint24", { type: "uint24" }],
  ["uint32", { type: "uint32" }],
  ["uint64", { type: "uint64" }],
  ["uint96", { type: "uint96" }],
  ["uint112", { type: "uint112" }],
  ["uint160", { type: "uint160" }],
  ["uint192", { type: "uint192" }],
  ["uint256", { type: "uint256" }],
  // Named
  ["address owner", { type: "address", name: "owner" }],
  ["address to", { type: "address", name: "to" }],
  ["bool approved", { type: "bool", name: "approved" }],
  ["bytes _data", { type: "bytes", name: "_data" }],
  ["bytes data", { type: "bytes", name: "data" }],
  ["bytes signature", { type: "bytes", name: "signature" }],
  ["bytes32 hash", { type: "bytes32", name: "hash" }],
  ["bytes32 r", { type: "bytes32", name: "r" }],
  ["bytes32 root", { type: "bytes32", name: "root" }],
  ["bytes32 s", { type: "bytes32", name: "s" }],
  ["string name", { type: "string", name: "name" }],
  ["string symbol", { type: "string", name: "symbol" }],
  ["string tokenURI", { type: "string", name: "tokenURI" }],
  ["uint tokenId", { type: "uint256", name: "tokenId" }],
  ["uint8 v", { type: "uint8", name: "v" }],
  ["uint256 balance", { type: "uint256", name: "balance" }],
  ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
  ["uint256 value", { type: "uint256", name: "value" }],
  // Indexed
  [
    "event:address indexed from",
    { type: "address", name: "from", indexed: true }
  ],
  ["event:address indexed to", { type: "address", name: "to", indexed: true }],
  [
    "event:uint indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: true }
  ],
  [
    "event:uint256 indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: true }
  ]
]);

// src/human-readable/runtime/utils.ts
function parseSignature(signature, structs = {}) {
  if (isFunctionSignature(signature)) {
    const match = execFunctionSignature(signature);
    if (!match)
      throw new BaseError("Invalid function signature.", {
        details: signature
      });
    const inputParams = splitParameters(match.parameters);
    const inputs = [];
    const inputLength = inputParams.length;
    for (let i = 0; i < inputLength; i++) {
      inputs.push(
        parseAbiParameter(inputParams[i], {
          modifiers: functionModifiers,
          structs,
          type: "function"
        })
      );
    }
    const outputs = [];
    if (match.returns) {
      const outputParams = splitParameters(match.returns);
      const outputLength = outputParams.length;
      for (let i = 0; i < outputLength; i++) {
        outputs.push(
          parseAbiParameter(outputParams[i], {
            modifiers: functionModifiers,
            structs,
            type: "function"
          })
        );
      }
    }
    return {
      name: match.name,
      type: "function",
      stateMutability: match.stateMutability ?? "nonpayable",
      inputs,
      outputs
    };
  }
  if (isEventSignature(signature)) {
    const match = execEventSignature(signature);
    if (!match)
      throw new BaseError("Invalid event signature.", {
        details: signature
      });
    const params = splitParameters(match.parameters);
    const abiParameters = [];
    const length = params.length;
    for (let i = 0; i < length; i++) {
      abiParameters.push(
        parseAbiParameter(params[i], {
          modifiers: eventModifiers,
          structs,
          type: "event"
        })
      );
    }
    return { name: match.name, type: "event", inputs: abiParameters };
  }
  if (isErrorSignature(signature)) {
    const match = execErrorSignature(signature);
    if (!match)
      throw new BaseError("Invalid error signature.", {
        details: signature
      });
    const params = splitParameters(match.parameters);
    const abiParameters = [];
    const length = params.length;
    for (let i = 0; i < length; i++) {
      abiParameters.push(
        parseAbiParameter(params[i], { structs, type: "error" })
      );
    }
    return { name: match.name, type: "error", inputs: abiParameters };
  }
  if (isConstructorSignature(signature)) {
    const match = execConstructorSignature(signature);
    if (!match)
      throw new BaseError("Invalid constructor signature.", {
        details: signature
      });
    const params = splitParameters(match.parameters);
    const abiParameters = [];
    const length = params.length;
    for (let i = 0; i < length; i++) {
      abiParameters.push(
        parseAbiParameter(params[i], { structs, type: "constructor" })
      );
    }
    return {
      type: "constructor",
      stateMutability: match.stateMutability ?? "nonpayable",
      inputs: abiParameters
    };
  }
  if (isFallbackSignature(signature))
    return { type: "fallback" };
  if (isReceiveSignature(signature))
    return {
      type: "receive",
      stateMutability: "payable"
    };
  throw new BaseError("Unknown signature.", {
    details: signature
  });
}
var abiParameterWithoutTupleRegex = /^(?<type>[a-zA-Z0-9_]+?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z0-9_]+))?$/;
var abiParameterWithTupleRegex = /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z0-9_]+))?$/;
var dynamicIntegerRegex = /^u?int$/;
function parseAbiParameter(param, options) {
  const parameterCacheKey = getParameterCacheKey(param, options?.type);
  if (parameterCache.has(parameterCacheKey))
    return parameterCache.get(parameterCacheKey);
  const isTuple = _chunk_WP7KDV47_mjs__WEBPACK_IMPORTED_MODULE_1__.isTupleRegex.test(param);
  const match = (0,_chunk_WP7KDV47_mjs__WEBPACK_IMPORTED_MODULE_1__.execTyped)(
    isTuple ? abiParameterWithTupleRegex : abiParameterWithoutTupleRegex,
    param
  );
  if (!match)
    throw new BaseError("Invalid ABI parameter.", {
      details: param
    });
  if (match.name && isSolidityKeyword(match.name))
    throw new BaseError("Invalid ABI parameter.", {
      details: param,
      metaMessages: [
        `"${match.name}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`
      ]
    });
  const name2 = match.name ? { name: match.name } : {};
  const indexed = match.modifier === "indexed" ? { indexed: true } : {};
  const structs = options?.structs ?? {};
  let type;
  let components = {};
  if (isTuple) {
    type = "tuple";
    const params = splitParameters(match.type);
    const components_ = [];
    const length = params.length;
    for (let i = 0; i < length; i++) {
      components_.push(parseAbiParameter(params[i], { structs }));
    }
    components = { components: components_ };
  } else if (match.type in structs) {
    type = "tuple";
    components = { components: structs[match.type] };
  } else if (dynamicIntegerRegex.test(match.type)) {
    type = `${match.type}256`;
  } else {
    type = match.type;
    if (!(options?.type === "struct") && !isSolidityType(type))
      throw new BaseError("Unknown type.", {
        metaMessages: [`Type "${type}" is not a valid ABI type.`]
      });
  }
  if (match.modifier) {
    if (!options?.modifiers?.has?.(match.modifier))
      throw new BaseError("Invalid ABI parameter.", {
        details: param,
        metaMessages: [
          `Modifier "${match.modifier}" not allowed${options?.type ? ` in "${options.type}" type` : ""}.`
        ]
      });
    if (functionModifiers.has(match.modifier) && !isValidDataLocation(type, !!match.array))
      throw new BaseError("Invalid ABI parameter.", {
        details: param,
        metaMessages: [
          `Modifier "${match.modifier}" not allowed${options?.type ? ` in "${options.type}" type` : ""}.`,
          `Data location can only be specified for array, struct, or mapping types, but "${match.modifier}" was given.`
        ]
      });
  }
  const abiParameter = {
    type: `${type}${match.array ?? ""}`,
    ...name2,
    ...indexed,
    ...components
  };
  parameterCache.set(parameterCacheKey, abiParameter);
  return abiParameter;
}
function splitParameters(params, result = [], current = "", depth = 0) {
  if (params === "") {
    if (current === "")
      return result;
    if (depth !== 0)
      throw new BaseError("Unbalanced parentheses.", {
        metaMessages: [
          `"${current.trim()}" has too many ${depth > 0 ? "opening" : "closing"} parentheses.`
        ],
        details: `Depth "${depth}"`
      });
    return [...result, current.trim()];
  }
  const length = params.length;
  for (let i = 0; i < length; i++) {
    const char = params[i];
    const tail = params.slice(i + 1);
    switch (char) {
      case ",":
        return depth === 0 ? splitParameters(tail, [...result, current.trim()]) : splitParameters(tail, result, `${current}${char}`, depth);
      case "(":
        return splitParameters(tail, result, `${current}${char}`, depth + 1);
      case ")":
        return splitParameters(tail, result, `${current}${char}`, depth - 1);
      default:
        return splitParameters(tail, result, `${current}${char}`, depth);
    }
  }
  return [];
}
function isSolidityType(type) {
  return type === "address" || type === "bool" || type === "function" || type === "string" || _chunk_WP7KDV47_mjs__WEBPACK_IMPORTED_MODULE_1__.bytesRegex.test(type) || _chunk_WP7KDV47_mjs__WEBPACK_IMPORTED_MODULE_1__.integerRegex.test(type);
}
var protectedKeywordsRegex = /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
function isSolidityKeyword(name2) {
  return name2 === "address" || name2 === "bool" || name2 === "function" || name2 === "string" || name2 === "tuple" || _chunk_WP7KDV47_mjs__WEBPACK_IMPORTED_MODULE_1__.bytesRegex.test(name2) || _chunk_WP7KDV47_mjs__WEBPACK_IMPORTED_MODULE_1__.integerRegex.test(name2) || protectedKeywordsRegex.test(name2);
}
function isValidDataLocation(type, isArray) {
  return isArray || type === "bytes" || type === "string" || type === "tuple";
}

// src/human-readable/runtime/structs.ts
function parseStructs(signatures) {
  const shallowStructs = {};
  const signaturesLength = signatures.length;
  for (let i = 0; i < signaturesLength; i++) {
    const signature = signatures[i];
    if (!isStructSignature(signature))
      continue;
    const match = execStructSignature(signature);
    if (!match)
      throw new BaseError("Invalid struct signature.", {
        details: signature
      });
    const properties = match.properties.split(";");
    const components = [];
    const propertiesLength = properties.length;
    for (let k = 0; k < propertiesLength; k++) {
      const property = properties[k];
      const trimmed = property.trim();
      if (!trimmed)
        continue;
      const abiParameter = parseAbiParameter(trimmed, {
        type: "struct"
      });
      components.push(abiParameter);
    }
    if (!components.length)
      throw new BaseError("Invalid struct signature.", {
        details: signature,
        metaMessages: ["No properties exist."]
      });
    shallowStructs[match.name] = components;
  }
  const resolvedStructs = {};
  const entries = Object.entries(shallowStructs);
  const entriesLength = entries.length;
  for (let i = 0; i < entriesLength; i++) {
    const [name2, parameters] = entries[i];
    resolvedStructs[name2] = resolveStructs(parameters, shallowStructs);
  }
  return resolvedStructs;
}
var typeWithoutTupleRegex = /^(?<type>[a-zA-Z0-9_]+?)(?<array>(?:\[\d*?\])+?)?$/;
function resolveStructs(abiParameters, structs, ancestors = /* @__PURE__ */ new Set()) {
  const components = [];
  const length = abiParameters.length;
  for (let i = 0; i < length; i++) {
    const abiParameter = abiParameters[i];
    const isTuple = _chunk_WP7KDV47_mjs__WEBPACK_IMPORTED_MODULE_1__.isTupleRegex.test(abiParameter.type);
    if (isTuple)
      components.push(abiParameter);
    else {
      const match = (0,_chunk_WP7KDV47_mjs__WEBPACK_IMPORTED_MODULE_1__.execTyped)(
        typeWithoutTupleRegex,
        abiParameter.type
      );
      if (!match?.type)
        throw new BaseError("Invalid ABI parameter.", {
          details: JSON.stringify(abiParameter, null, 2),
          metaMessages: ["ABI parameter type is invalid."]
        });
      const { array, type } = match;
      if (type in structs) {
        if (ancestors.has(type))
          throw new BaseError("Circular reference detected.", {
            metaMessages: [`Struct "${type}" is a circular reference.`]
          });
        components.push({
          ...abiParameter,
          type: `tuple${array ?? ""}`,
          components: resolveStructs(
            structs[type] ?? [],
            structs,
            /* @__PURE__ */ new Set([...ancestors, type])
          )
        });
      } else {
        if (isSolidityType(type))
          components.push(abiParameter);
        else
          throw new BaseError("Unknown type.", {
            metaMessages: [
              `Type "${type}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`
            ]
          });
      }
    }
  }
  return components;
}

// src/human-readable/parseAbi.ts
function parseAbi(signatures) {
  const structs = parseStructs(signatures);
  const abi = [];
  const length = signatures.length;
  for (let i = 0; i < length; i++) {
    const signature = signatures[i];
    if (isStructSignature(signature))
      continue;
    abi.push(parseSignature(signature, structs));
  }
  return abi;
}

// src/human-readable/parseAbiItem.ts
function parseAbiItem(signature) {
  let abiItem;
  if (typeof signature === "string")
    abiItem = parseSignature(signature);
  else {
    const structs = parseStructs(signature);
    const length = signature.length;
    for (let i = 0; i < length; i++) {
      const signature_ = signature[i];
      if (isStructSignature(signature_))
        continue;
      abiItem = parseSignature(signature_, structs);
      break;
    }
  }
  if (!abiItem)
    throw new BaseError("Failed to parse ABI item.", {
      details: `parseAbiItem(${JSON.stringify(signature, null, 2)})`,
      docsPath: "/api/human.html#parseabiitem-1"
    });
  return abiItem;
}

// src/human-readable/parseAbiParameter.ts
function parseAbiParameter2(param) {
  let abiParameter;
  if (typeof param === "string")
    abiParameter = parseAbiParameter(param, {
      modifiers
    });
  else {
    const structs = parseStructs(param);
    const length = param.length;
    for (let i = 0; i < length; i++) {
      const signature = param[i];
      if (isStructSignature(signature))
        continue;
      abiParameter = parseAbiParameter(signature, { modifiers, structs });
      break;
    }
  }
  if (!abiParameter)
    throw new BaseError("Failed to parse ABI parameter.", {
      details: `parseAbiParameter(${JSON.stringify(param, null, 2)})`,
      docsPath: "/api/human.html#parseabiparameter-1"
    });
  return abiParameter;
}

// src/human-readable/parseAbiParameters.ts
function parseAbiParameters(params) {
  const abiParameters = [];
  if (typeof params === "string") {
    const parameters = splitParameters(params);
    const length = parameters.length;
    for (let i = 0; i < length; i++) {
      abiParameters.push(parseAbiParameter(parameters[i], { modifiers }));
    }
  } else {
    const structs = parseStructs(params);
    const length = params.length;
    for (let i = 0; i < length; i++) {
      const signature = params[i];
      if (isStructSignature(signature))
        continue;
      const parameters = splitParameters(signature);
      const length2 = parameters.length;
      for (let k = 0; k < length2; k++) {
        abiParameters.push(
          parseAbiParameter(parameters[k], { modifiers, structs })
        );
      }
    }
  }
  if (abiParameters.length === 0)
    throw new BaseError("Failed to parse ABI parameters.", {
      details: `parseAbiParameters(${JSON.stringify(params, null, 2)})`,
      docsPath: "/api/human.html#parseabiparameters-1"
    });
  return abiParameters;
}



/***/ }),

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/***/ ((module) => {



var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "./node_modules/eventemitter3/index.mjs":
/*!**********************************************!*\
  !*** ./node_modules/eventemitter3/index.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventEmitter: () => (/* reexport default export from named module */ _index_js__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/eventemitter3/index.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_index_js__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/error_codes.js":
/*!*********************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/error_codes.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ERR_ABI_ENCODING: () => (/* binding */ ERR_ABI_ENCODING),
/* harmony export */   ERR_CONN: () => (/* binding */ ERR_CONN),
/* harmony export */   ERR_CONN_CLOSE: () => (/* binding */ ERR_CONN_CLOSE),
/* harmony export */   ERR_CONN_INVALID: () => (/* binding */ ERR_CONN_INVALID),
/* harmony export */   ERR_CONN_MAX_ATTEMPTS: () => (/* binding */ ERR_CONN_MAX_ATTEMPTS),
/* harmony export */   ERR_CONN_NOT_OPEN: () => (/* binding */ ERR_CONN_NOT_OPEN),
/* harmony export */   ERR_CONN_PENDING_REQUESTS: () => (/* binding */ ERR_CONN_PENDING_REQUESTS),
/* harmony export */   ERR_CONN_TIMEOUT: () => (/* binding */ ERR_CONN_TIMEOUT),
/* harmony export */   ERR_CONTRACT: () => (/* binding */ ERR_CONTRACT),
/* harmony export */   ERR_CONTRACT_ABI_MISSING: () => (/* binding */ ERR_CONTRACT_ABI_MISSING),
/* harmony export */   ERR_CONTRACT_EVENT_NOT_EXISTS: () => (/* binding */ ERR_CONTRACT_EVENT_NOT_EXISTS),
/* harmony export */   ERR_CONTRACT_EXECUTION_REVERTED: () => (/* binding */ ERR_CONTRACT_EXECUTION_REVERTED),
/* harmony export */   ERR_CONTRACT_INSTANTIATION: () => (/* binding */ ERR_CONTRACT_INSTANTIATION),
/* harmony export */   ERR_CONTRACT_MISSING_ADDRESS: () => (/* binding */ ERR_CONTRACT_MISSING_ADDRESS),
/* harmony export */   ERR_CONTRACT_MISSING_DEPLOY_DATA: () => (/* binding */ ERR_CONTRACT_MISSING_DEPLOY_DATA),
/* harmony export */   ERR_CONTRACT_MISSING_FROM_ADDRESS: () => (/* binding */ ERR_CONTRACT_MISSING_FROM_ADDRESS),
/* harmony export */   ERR_CONTRACT_REQUIRED_CALLBACK: () => (/* binding */ ERR_CONTRACT_REQUIRED_CALLBACK),
/* harmony export */   ERR_CONTRACT_RESERVED_EVENT: () => (/* binding */ ERR_CONTRACT_RESERVED_EVENT),
/* harmony export */   ERR_CONTRACT_RESOLVER_MISSING: () => (/* binding */ ERR_CONTRACT_RESOLVER_MISSING),
/* harmony export */   ERR_CONTRACT_TX_DATA_AND_INPUT: () => (/* binding */ ERR_CONTRACT_TX_DATA_AND_INPUT),
/* harmony export */   ERR_CORE_CHAIN_MISMATCH: () => (/* binding */ ERR_CORE_CHAIN_MISMATCH),
/* harmony export */   ERR_CORE_HARDFORK_MISMATCH: () => (/* binding */ ERR_CORE_HARDFORK_MISMATCH),
/* harmony export */   ERR_ENS_CHECK_INTERFACE_SUPPORT: () => (/* binding */ ERR_ENS_CHECK_INTERFACE_SUPPORT),
/* harmony export */   ERR_ENS_NETWORK_NOT_SYNCED: () => (/* binding */ ERR_ENS_NETWORK_NOT_SYNCED),
/* harmony export */   ERR_ENS_UNSUPPORTED_NETWORK: () => (/* binding */ ERR_ENS_UNSUPPORTED_NETWORK),
/* harmony export */   ERR_EXISTING_PLUGIN_NAMESPACE: () => (/* binding */ ERR_EXISTING_PLUGIN_NAMESPACE),
/* harmony export */   ERR_FORMATTERS: () => (/* binding */ ERR_FORMATTERS),
/* harmony export */   ERR_INVALID_ADDRESS: () => (/* binding */ ERR_INVALID_ADDRESS),
/* harmony export */   ERR_INVALID_BLOCK: () => (/* binding */ ERR_INVALID_BLOCK),
/* harmony export */   ERR_INVALID_BOOLEAN: () => (/* binding */ ERR_INVALID_BOOLEAN),
/* harmony export */   ERR_INVALID_BYTES: () => (/* binding */ ERR_INVALID_BYTES),
/* harmony export */   ERR_INVALID_CLIENT: () => (/* binding */ ERR_INVALID_CLIENT),
/* harmony export */   ERR_INVALID_HEX: () => (/* binding */ ERR_INVALID_HEX),
/* harmony export */   ERR_INVALID_INTEGER: () => (/* binding */ ERR_INVALID_INTEGER),
/* harmony export */   ERR_INVALID_KEYSTORE: () => (/* binding */ ERR_INVALID_KEYSTORE),
/* harmony export */   ERR_INVALID_LARGE_VALUE: () => (/* binding */ ERR_INVALID_LARGE_VALUE),
/* harmony export */   ERR_INVALID_METHOD_PARAMS: () => (/* binding */ ERR_INVALID_METHOD_PARAMS),
/* harmony export */   ERR_INVALID_NIBBLE_WIDTH: () => (/* binding */ ERR_INVALID_NIBBLE_WIDTH),
/* harmony export */   ERR_INVALID_NUMBER: () => (/* binding */ ERR_INVALID_NUMBER),
/* harmony export */   ERR_INVALID_PASSWORD: () => (/* binding */ ERR_INVALID_PASSWORD),
/* harmony export */   ERR_INVALID_PRIVATE_KEY: () => (/* binding */ ERR_INVALID_PRIVATE_KEY),
/* harmony export */   ERR_INVALID_PROVIDER: () => (/* binding */ ERR_INVALID_PROVIDER),
/* harmony export */   ERR_INVALID_RESPONSE: () => (/* binding */ ERR_INVALID_RESPONSE),
/* harmony export */   ERR_INVALID_SIGNATURE: () => (/* binding */ ERR_INVALID_SIGNATURE),
/* harmony export */   ERR_INVALID_SIZE: () => (/* binding */ ERR_INVALID_SIZE),
/* harmony export */   ERR_INVALID_STRING: () => (/* binding */ ERR_INVALID_STRING),
/* harmony export */   ERR_INVALID_TYPE: () => (/* binding */ ERR_INVALID_TYPE),
/* harmony export */   ERR_INVALID_TYPE_ABI: () => (/* binding */ ERR_INVALID_TYPE_ABI),
/* harmony export */   ERR_INVALID_UNIT: () => (/* binding */ ERR_INVALID_UNIT),
/* harmony export */   ERR_INVALID_UNSIGNED_INTEGER: () => (/* binding */ ERR_INVALID_UNSIGNED_INTEGER),
/* harmony export */   ERR_IV_LENGTH: () => (/* binding */ ERR_IV_LENGTH),
/* harmony export */   ERR_KEY_DERIVATION_FAIL: () => (/* binding */ ERR_KEY_DERIVATION_FAIL),
/* harmony export */   ERR_KEY_VERSION_UNSUPPORTED: () => (/* binding */ ERR_KEY_VERSION_UNSUPPORTED),
/* harmony export */   ERR_METHOD_NOT_IMPLEMENTED: () => (/* binding */ ERR_METHOD_NOT_IMPLEMENTED),
/* harmony export */   ERR_MULTIPLE_ERRORS: () => (/* binding */ ERR_MULTIPLE_ERRORS),
/* harmony export */   ERR_OPERATION_ABORT: () => (/* binding */ ERR_OPERATION_ABORT),
/* harmony export */   ERR_OPERATION_TIMEOUT: () => (/* binding */ ERR_OPERATION_TIMEOUT),
/* harmony export */   ERR_PARAM: () => (/* binding */ ERR_PARAM),
/* harmony export */   ERR_PBKDF2_ITERATIONS: () => (/* binding */ ERR_PBKDF2_ITERATIONS),
/* harmony export */   ERR_PRIVATE_KEY_LENGTH: () => (/* binding */ ERR_PRIVATE_KEY_LENGTH),
/* harmony export */   ERR_PROVIDER: () => (/* binding */ ERR_PROVIDER),
/* harmony export */   ERR_RAW_TX_UNDEFINED: () => (/* binding */ ERR_RAW_TX_UNDEFINED),
/* harmony export */   ERR_REQ_ALREADY_SENT: () => (/* binding */ ERR_REQ_ALREADY_SENT),
/* harmony export */   ERR_RESPONSE: () => (/* binding */ ERR_RESPONSE),
/* harmony export */   ERR_RPC_INTERNAL_ERROR: () => (/* binding */ ERR_RPC_INTERNAL_ERROR),
/* harmony export */   ERR_RPC_INVALID_INPUT: () => (/* binding */ ERR_RPC_INVALID_INPUT),
/* harmony export */   ERR_RPC_INVALID_JSON: () => (/* binding */ ERR_RPC_INVALID_JSON),
/* harmony export */   ERR_RPC_INVALID_METHOD: () => (/* binding */ ERR_RPC_INVALID_METHOD),
/* harmony export */   ERR_RPC_INVALID_PARAMS: () => (/* binding */ ERR_RPC_INVALID_PARAMS),
/* harmony export */   ERR_RPC_INVALID_REQUEST: () => (/* binding */ ERR_RPC_INVALID_REQUEST),
/* harmony export */   ERR_RPC_LIMIT_EXCEEDED: () => (/* binding */ ERR_RPC_LIMIT_EXCEEDED),
/* harmony export */   ERR_RPC_MISSING_RESOURCE: () => (/* binding */ ERR_RPC_MISSING_RESOURCE),
/* harmony export */   ERR_RPC_NOT_SUPPORTED: () => (/* binding */ ERR_RPC_NOT_SUPPORTED),
/* harmony export */   ERR_RPC_TRANSACTION_REJECTED: () => (/* binding */ ERR_RPC_TRANSACTION_REJECTED),
/* harmony export */   ERR_RPC_UNAVAILABLE_RESOURCE: () => (/* binding */ ERR_RPC_UNAVAILABLE_RESOURCE),
/* harmony export */   ERR_RPC_UNSUPPORTED_METHOD: () => (/* binding */ ERR_RPC_UNSUPPORTED_METHOD),
/* harmony export */   ERR_SCHEMA_FORMAT: () => (/* binding */ ERR_SCHEMA_FORMAT),
/* harmony export */   ERR_SIGNATURE_FAILED: () => (/* binding */ ERR_SIGNATURE_FAILED),
/* harmony export */   ERR_SUBSCRIPTION: () => (/* binding */ ERR_SUBSCRIPTION),
/* harmony export */   ERR_TX: () => (/* binding */ ERR_TX),
/* harmony export */   ERR_TX_BLOCK_TIMEOUT: () => (/* binding */ ERR_TX_BLOCK_TIMEOUT),
/* harmony export */   ERR_TX_CHAIN_ID_MISMATCH: () => (/* binding */ ERR_TX_CHAIN_ID_MISMATCH),
/* harmony export */   ERR_TX_CHAIN_MISMATCH: () => (/* binding */ ERR_TX_CHAIN_MISMATCH),
/* harmony export */   ERR_TX_CONTRACT_NOT_STORED: () => (/* binding */ ERR_TX_CONTRACT_NOT_STORED),
/* harmony export */   ERR_TX_DATA_AND_INPUT: () => (/* binding */ ERR_TX_DATA_AND_INPUT),
/* harmony export */   ERR_TX_GAS_MISMATCH: () => (/* binding */ ERR_TX_GAS_MISMATCH),
/* harmony export */   ERR_TX_GAS_MISMATCH_INNER_ERROR: () => (/* binding */ ERR_TX_GAS_MISMATCH_INNER_ERROR),
/* harmony export */   ERR_TX_HARDFORK_MISMATCH: () => (/* binding */ ERR_TX_HARDFORK_MISMATCH),
/* harmony export */   ERR_TX_INVALID_CALL: () => (/* binding */ ERR_TX_INVALID_CALL),
/* harmony export */   ERR_TX_INVALID_CHAIN_INFO: () => (/* binding */ ERR_TX_INVALID_CHAIN_INFO),
/* harmony export */   ERR_TX_INVALID_FEE_MARKET_GAS: () => (/* binding */ ERR_TX_INVALID_FEE_MARKET_GAS),
/* harmony export */   ERR_TX_INVALID_FEE_MARKET_GAS_PRICE: () => (/* binding */ ERR_TX_INVALID_FEE_MARKET_GAS_PRICE),
/* harmony export */   ERR_TX_INVALID_LEGACY_FEE_MARKET: () => (/* binding */ ERR_TX_INVALID_LEGACY_FEE_MARKET),
/* harmony export */   ERR_TX_INVALID_LEGACY_GAS: () => (/* binding */ ERR_TX_INVALID_LEGACY_GAS),
/* harmony export */   ERR_TX_INVALID_NONCE_OR_CHAIN_ID: () => (/* binding */ ERR_TX_INVALID_NONCE_OR_CHAIN_ID),
/* harmony export */   ERR_TX_INVALID_OBJECT: () => (/* binding */ ERR_TX_INVALID_OBJECT),
/* harmony export */   ERR_TX_INVALID_PROPERTIES_FOR_TYPE: () => (/* binding */ ERR_TX_INVALID_PROPERTIES_FOR_TYPE),
/* harmony export */   ERR_TX_INVALID_RECEIVER: () => (/* binding */ ERR_TX_INVALID_RECEIVER),
/* harmony export */   ERR_TX_INVALID_SENDER: () => (/* binding */ ERR_TX_INVALID_SENDER),
/* harmony export */   ERR_TX_LOCAL_WALLET_NOT_AVAILABLE: () => (/* binding */ ERR_TX_LOCAL_WALLET_NOT_AVAILABLE),
/* harmony export */   ERR_TX_MISSING_CHAIN_INFO: () => (/* binding */ ERR_TX_MISSING_CHAIN_INFO),
/* harmony export */   ERR_TX_MISSING_CUSTOM_CHAIN: () => (/* binding */ ERR_TX_MISSING_CUSTOM_CHAIN),
/* harmony export */   ERR_TX_MISSING_CUSTOM_CHAIN_ID: () => (/* binding */ ERR_TX_MISSING_CUSTOM_CHAIN_ID),
/* harmony export */   ERR_TX_MISSING_GAS: () => (/* binding */ ERR_TX_MISSING_GAS),
/* harmony export */   ERR_TX_MISSING_GAS_INNER_ERROR: () => (/* binding */ ERR_TX_MISSING_GAS_INNER_ERROR),
/* harmony export */   ERR_TX_NOT_FOUND: () => (/* binding */ ERR_TX_NOT_FOUND),
/* harmony export */   ERR_TX_NO_CONTRACT_ADDRESS: () => (/* binding */ ERR_TX_NO_CONTRACT_ADDRESS),
/* harmony export */   ERR_TX_OUT_OF_GAS: () => (/* binding */ ERR_TX_OUT_OF_GAS),
/* harmony export */   ERR_TX_POLLING_TIMEOUT: () => (/* binding */ ERR_TX_POLLING_TIMEOUT),
/* harmony export */   ERR_TX_RECEIPT_MISSING_BLOCK_NUMBER: () => (/* binding */ ERR_TX_RECEIPT_MISSING_BLOCK_NUMBER),
/* harmony export */   ERR_TX_RECEIPT_MISSING_OR_BLOCKHASH_NULL: () => (/* binding */ ERR_TX_RECEIPT_MISSING_OR_BLOCKHASH_NULL),
/* harmony export */   ERR_TX_REVERT_INSTRUCTION: () => (/* binding */ ERR_TX_REVERT_INSTRUCTION),
/* harmony export */   ERR_TX_REVERT_TRANSACTION: () => (/* binding */ ERR_TX_REVERT_TRANSACTION),
/* harmony export */   ERR_TX_REVERT_TRANSACTION_CUSTOM_ERROR: () => (/* binding */ ERR_TX_REVERT_TRANSACTION_CUSTOM_ERROR),
/* harmony export */   ERR_TX_REVERT_WITHOUT_REASON: () => (/* binding */ ERR_TX_REVERT_WITHOUT_REASON),
/* harmony export */   ERR_TX_SEND_TIMEOUT: () => (/* binding */ ERR_TX_SEND_TIMEOUT),
/* harmony export */   ERR_TX_SIGNING: () => (/* binding */ ERR_TX_SIGNING),
/* harmony export */   ERR_TX_UNABLE_TO_POPULATE_NONCE: () => (/* binding */ ERR_TX_UNABLE_TO_POPULATE_NONCE),
/* harmony export */   ERR_TX_UNSUPPORTED_EIP_1559: () => (/* binding */ ERR_TX_UNSUPPORTED_EIP_1559),
/* harmony export */   ERR_TX_UNSUPPORTED_TYPE: () => (/* binding */ ERR_TX_UNSUPPORTED_TYPE),
/* harmony export */   ERR_UNSUPPORTED_KDF: () => (/* binding */ ERR_UNSUPPORTED_KDF),
/* harmony export */   ERR_VALIDATION: () => (/* binding */ ERR_VALIDATION),
/* harmony export */   ERR_WS_PROVIDER: () => (/* binding */ ERR_WS_PROVIDER),
/* harmony export */   GENESIS_BLOCK_NUMBER: () => (/* binding */ GENESIS_BLOCK_NUMBER),
/* harmony export */   JSONRPC_ERR_CHAIN_DISCONNECTED: () => (/* binding */ JSONRPC_ERR_CHAIN_DISCONNECTED),
/* harmony export */   JSONRPC_ERR_DISCONNECTED: () => (/* binding */ JSONRPC_ERR_DISCONNECTED),
/* harmony export */   JSONRPC_ERR_REJECTED_REQUEST: () => (/* binding */ JSONRPC_ERR_REJECTED_REQUEST),
/* harmony export */   JSONRPC_ERR_UNAUTHORIZED: () => (/* binding */ JSONRPC_ERR_UNAUTHORIZED),
/* harmony export */   JSONRPC_ERR_UNSUPPORTED_METHOD: () => (/* binding */ JSONRPC_ERR_UNSUPPORTED_METHOD)
/* harmony export */ });
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
// Response error
const ERR_RESPONSE = 100;
const ERR_INVALID_RESPONSE = 101;
// Generic errors
const ERR_PARAM = 200;
const ERR_FORMATTERS = 201;
const ERR_METHOD_NOT_IMPLEMENTED = 202;
const ERR_OPERATION_TIMEOUT = 203;
const ERR_OPERATION_ABORT = 204;
const ERR_ABI_ENCODING = 205;
const ERR_EXISTING_PLUGIN_NAMESPACE = 206;
const ERR_INVALID_METHOD_PARAMS = 207;
const ERR_MULTIPLE_ERRORS = 208;
// Contract error codes
const ERR_CONTRACT = 300;
const ERR_CONTRACT_RESOLVER_MISSING = 301;
const ERR_CONTRACT_ABI_MISSING = 302;
const ERR_CONTRACT_REQUIRED_CALLBACK = 303;
const ERR_CONTRACT_EVENT_NOT_EXISTS = 304;
const ERR_CONTRACT_RESERVED_EVENT = 305;
const ERR_CONTRACT_MISSING_DEPLOY_DATA = 306;
const ERR_CONTRACT_MISSING_ADDRESS = 307;
const ERR_CONTRACT_MISSING_FROM_ADDRESS = 308;
const ERR_CONTRACT_INSTANTIATION = 309;
const ERR_CONTRACT_EXECUTION_REVERTED = 310;
const ERR_CONTRACT_TX_DATA_AND_INPUT = 311;
// Transaction error codes
const ERR_TX = 400;
const ERR_TX_REVERT_INSTRUCTION = 401;
const ERR_TX_REVERT_TRANSACTION = 402;
const ERR_TX_NO_CONTRACT_ADDRESS = 403;
const ERR_TX_CONTRACT_NOT_STORED = 404;
const ERR_TX_REVERT_WITHOUT_REASON = 405;
const ERR_TX_OUT_OF_GAS = 406;
const ERR_RAW_TX_UNDEFINED = 407;
const ERR_TX_INVALID_SENDER = 408;
const ERR_TX_INVALID_CALL = 409;
const ERR_TX_MISSING_CUSTOM_CHAIN = 410;
const ERR_TX_MISSING_CUSTOM_CHAIN_ID = 411;
const ERR_TX_CHAIN_ID_MISMATCH = 412;
const ERR_TX_INVALID_CHAIN_INFO = 413;
const ERR_TX_MISSING_CHAIN_INFO = 414;
const ERR_TX_MISSING_GAS = 415;
const ERR_TX_INVALID_LEGACY_GAS = 416;
const ERR_TX_INVALID_FEE_MARKET_GAS = 417;
const ERR_TX_INVALID_FEE_MARKET_GAS_PRICE = 418;
const ERR_TX_INVALID_LEGACY_FEE_MARKET = 419;
const ERR_TX_INVALID_OBJECT = 420;
const ERR_TX_INVALID_NONCE_OR_CHAIN_ID = 421;
const ERR_TX_UNABLE_TO_POPULATE_NONCE = 422;
const ERR_TX_UNSUPPORTED_EIP_1559 = 423;
const ERR_TX_UNSUPPORTED_TYPE = 424;
const ERR_TX_DATA_AND_INPUT = 425;
const ERR_TX_POLLING_TIMEOUT = 426;
const ERR_TX_RECEIPT_MISSING_OR_BLOCKHASH_NULL = 427;
const ERR_TX_RECEIPT_MISSING_BLOCK_NUMBER = 428;
const ERR_TX_LOCAL_WALLET_NOT_AVAILABLE = 429;
const ERR_TX_NOT_FOUND = 430;
const ERR_TX_SEND_TIMEOUT = 431;
const ERR_TX_BLOCK_TIMEOUT = 432;
const ERR_TX_SIGNING = 433;
const ERR_TX_GAS_MISMATCH = 434;
const ERR_TX_CHAIN_MISMATCH = 435;
const ERR_TX_HARDFORK_MISMATCH = 436;
const ERR_TX_INVALID_RECEIVER = 437;
const ERR_TX_REVERT_TRANSACTION_CUSTOM_ERROR = 438;
const ERR_TX_INVALID_PROPERTIES_FOR_TYPE = 439;
const ERR_TX_MISSING_GAS_INNER_ERROR = 440;
const ERR_TX_GAS_MISMATCH_INNER_ERROR = 441;
// Connection error codes
const ERR_CONN = 500;
const ERR_CONN_INVALID = 501;
const ERR_CONN_TIMEOUT = 502;
const ERR_CONN_NOT_OPEN = 503;
const ERR_CONN_CLOSE = 504;
const ERR_CONN_MAX_ATTEMPTS = 505;
const ERR_CONN_PENDING_REQUESTS = 506;
const ERR_REQ_ALREADY_SENT = 507;
// Provider error codes
const ERR_PROVIDER = 600;
const ERR_INVALID_PROVIDER = 601;
const ERR_INVALID_CLIENT = 602;
const ERR_SUBSCRIPTION = 603;
const ERR_WS_PROVIDER = 604;
// Account error codes
const ERR_PRIVATE_KEY_LENGTH = 701;
const ERR_INVALID_PRIVATE_KEY = 702;
const ERR_UNSUPPORTED_KDF = 703;
const ERR_KEY_DERIVATION_FAIL = 704;
const ERR_KEY_VERSION_UNSUPPORTED = 705;
const ERR_INVALID_PASSWORD = 706;
const ERR_IV_LENGTH = 707;
const ERR_INVALID_KEYSTORE = 708;
const ERR_PBKDF2_ITERATIONS = 709;
// Signature error codes
const ERR_SIGNATURE_FAILED = 801;
const ERR_INVALID_SIGNATURE = 802;
const GENESIS_BLOCK_NUMBER = '0x0';
// RPC error codes (EIP-1193)
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md#provider-errors
const JSONRPC_ERR_REJECTED_REQUEST = 4001;
const JSONRPC_ERR_UNAUTHORIZED = 4100;
const JSONRPC_ERR_UNSUPPORTED_METHOD = 4200;
const JSONRPC_ERR_DISCONNECTED = 4900;
const JSONRPC_ERR_CHAIN_DISCONNECTED = 4901;
// ENS error codes
const ERR_ENS_CHECK_INTERFACE_SUPPORT = 901;
const ERR_ENS_UNSUPPORTED_NETWORK = 902;
const ERR_ENS_NETWORK_NOT_SYNCED = 903;
// Utils error codes
const ERR_INVALID_STRING = 1001;
const ERR_INVALID_BYTES = 1002;
const ERR_INVALID_NUMBER = 1003;
const ERR_INVALID_UNIT = 1004;
const ERR_INVALID_ADDRESS = 1005;
const ERR_INVALID_HEX = 1006;
const ERR_INVALID_TYPE = 1007;
const ERR_INVALID_BOOLEAN = 1008;
const ERR_INVALID_UNSIGNED_INTEGER = 1009;
const ERR_INVALID_SIZE = 1010;
const ERR_INVALID_LARGE_VALUE = 1011;
const ERR_INVALID_BLOCK = 1012;
const ERR_INVALID_TYPE_ABI = 1013;
const ERR_INVALID_NIBBLE_WIDTH = 1014;
const ERR_INVALID_INTEGER = 1015;
// Validation error codes
const ERR_VALIDATION = 1100;
// Core error codes
const ERR_CORE_HARDFORK_MISMATCH = 1101;
const ERR_CORE_CHAIN_MISMATCH = 1102;
// Schema error codes
const ERR_SCHEMA_FORMAT = 1200;
// RPC error codes (EIP-1474)
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1474.md
const ERR_RPC_INVALID_JSON = -32700;
const ERR_RPC_INVALID_REQUEST = -32600;
const ERR_RPC_INVALID_METHOD = -32601;
const ERR_RPC_INVALID_PARAMS = -32602;
const ERR_RPC_INTERNAL_ERROR = -32603;
const ERR_RPC_INVALID_INPUT = -32000;
const ERR_RPC_MISSING_RESOURCE = -32001;
const ERR_RPC_UNAVAILABLE_RESOURCE = -32002;
const ERR_RPC_TRANSACTION_REJECTED = -32003;
const ERR_RPC_UNSUPPORTED_METHOD = -32004;
const ERR_RPC_LIMIT_EXCEEDED = -32005;
const ERR_RPC_NOT_SUPPORTED = -32006;
//# sourceMappingURL=error_codes.js.map

/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/errors/account_errors.js":
/*!*******************************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/errors/account_errors.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IVLengthError: () => (/* binding */ IVLengthError),
/* harmony export */   InvalidKdfError: () => (/* binding */ InvalidKdfError),
/* harmony export */   InvalidPasswordError: () => (/* binding */ InvalidPasswordError),
/* harmony export */   InvalidPrivateKeyError: () => (/* binding */ InvalidPrivateKeyError),
/* harmony export */   InvalidSignatureError: () => (/* binding */ InvalidSignatureError),
/* harmony export */   KeyDerivationError: () => (/* binding */ KeyDerivationError),
/* harmony export */   KeyStoreVersionError: () => (/* binding */ KeyStoreVersionError),
/* harmony export */   PBKDF2IterationsError: () => (/* binding */ PBKDF2IterationsError),
/* harmony export */   PrivateKeyLengthError: () => (/* binding */ PrivateKeyLengthError)
/* harmony export */ });
/* harmony import */ var _error_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error_codes.js */ "./node_modules/web3-errors/lib/esm/error_codes.js");
/* harmony import */ var _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web3_error_base.js */ "./node_modules/web3-errors/lib/esm/web3_error_base.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/* eslint-disable max-classes-per-file */


class PrivateKeyLengthError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super(`Private key must be 32 bytes.`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_PRIVATE_KEY_LENGTH;
    }
}
class InvalidPrivateKeyError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super(`Invalid Private Key, Not a valid string or uint8Array`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_PRIVATE_KEY;
    }
}
class InvalidSignatureError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(errorDetails) {
        super(`"${errorDetails}"`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_SIGNATURE;
    }
}
class InvalidKdfError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super(`Invalid key derivation function`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_UNSUPPORTED_KDF;
    }
}
class KeyDerivationError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super(`Key derivation failed - possibly wrong password`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_KEY_DERIVATION_FAIL;
    }
}
class KeyStoreVersionError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super('Unsupported key store version');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_KEY_VERSION_UNSUPPORTED;
    }
}
class InvalidPasswordError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super('Password cannot be empty');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_PASSWORD;
    }
}
class IVLengthError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super('Initialization vector must be 16 bytes');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_IV_LENGTH;
    }
}
class PBKDF2IterationsError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super('c > 1000, pbkdf2 is less secure with less iterations');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_PBKDF2_ITERATIONS;
    }
}
//# sourceMappingURL=account_errors.js.map

/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/errors/connection_errors.js":
/*!**********************************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/errors/connection_errors.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConnectionCloseError: () => (/* binding */ ConnectionCloseError),
/* harmony export */   ConnectionError: () => (/* binding */ ConnectionError),
/* harmony export */   ConnectionNotOpenError: () => (/* binding */ ConnectionNotOpenError),
/* harmony export */   ConnectionTimeoutError: () => (/* binding */ ConnectionTimeoutError),
/* harmony export */   InvalidConnectionError: () => (/* binding */ InvalidConnectionError),
/* harmony export */   MaxAttemptsReachedOnReconnectingError: () => (/* binding */ MaxAttemptsReachedOnReconnectingError),
/* harmony export */   PendingRequestsOnReconnectingError: () => (/* binding */ PendingRequestsOnReconnectingError),
/* harmony export */   RequestAlreadySentError: () => (/* binding */ RequestAlreadySentError)
/* harmony export */ });
/* harmony import */ var _error_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error_codes.js */ "./node_modules/web3-errors/lib/esm/error_codes.js");
/* harmony import */ var _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web3_error_base.js */ "./node_modules/web3-errors/lib/esm/web3_error_base.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/


class ConnectionError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(message, event) {
        super(message);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONN;
        if (event) {
            this.errorCode = event.code;
            this.errorReason = event.reason;
        }
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { errorCode: this.errorCode, errorReason: this.errorReason });
    }
}
class InvalidConnectionError extends ConnectionError {
    constructor(host, event) {
        super(`CONNECTION ERROR: Couldn't connect to node ${host}.`, event);
        this.host = host;
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONN_INVALID;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { host: this.host });
    }
}
class ConnectionTimeoutError extends ConnectionError {
    constructor(duration) {
        super(`CONNECTION TIMEOUT: timeout of ${duration}ms achieved`);
        this.duration = duration;
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONN_TIMEOUT;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { duration: this.duration });
    }
}
class ConnectionNotOpenError extends ConnectionError {
    constructor(event) {
        super('Connection not open', event);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONN_NOT_OPEN;
    }
}
class ConnectionCloseError extends ConnectionError {
    constructor(event) {
        var _a, _b;
        super(`CONNECTION ERROR: The connection got closed with the close code ${(_a = event === null || event === void 0 ? void 0 : event.code) !== null && _a !== void 0 ? _a : ''} and the following reason string ${(_b = event === null || event === void 0 ? void 0 : event.reason) !== null && _b !== void 0 ? _b : ''}`, event);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONN_CLOSE;
    }
}
class MaxAttemptsReachedOnReconnectingError extends ConnectionError {
    constructor(numberOfAttempts) {
        super(`Maximum number of reconnect attempts reached! (${numberOfAttempts})`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONN_MAX_ATTEMPTS;
    }
}
class PendingRequestsOnReconnectingError extends ConnectionError {
    constructor() {
        super('CONNECTION ERROR: Provider started to reconnect before the response got received!');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONN_PENDING_REQUESTS;
    }
}
class RequestAlreadySentError extends ConnectionError {
    constructor(id) {
        super(`Request already sent with following id: ${id}`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_REQ_ALREADY_SENT;
    }
}
//# sourceMappingURL=connection_errors.js.map

/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/errors/contract_errors.js":
/*!********************************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/errors/contract_errors.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContractEventDoesNotExistError: () => (/* binding */ ContractEventDoesNotExistError),
/* harmony export */   ContractExecutionError: () => (/* binding */ ContractExecutionError),
/* harmony export */   ContractInstantiationError: () => (/* binding */ ContractInstantiationError),
/* harmony export */   ContractMissingABIError: () => (/* binding */ ContractMissingABIError),
/* harmony export */   ContractMissingDeployDataError: () => (/* binding */ ContractMissingDeployDataError),
/* harmony export */   ContractNoAddressDefinedError: () => (/* binding */ ContractNoAddressDefinedError),
/* harmony export */   ContractNoFromAddressDefinedError: () => (/* binding */ ContractNoFromAddressDefinedError),
/* harmony export */   ContractOnceRequiresCallbackError: () => (/* binding */ ContractOnceRequiresCallbackError),
/* harmony export */   ContractReservedEventError: () => (/* binding */ ContractReservedEventError),
/* harmony export */   ContractTransactionDataAndInputError: () => (/* binding */ ContractTransactionDataAndInputError),
/* harmony export */   Eip838ExecutionError: () => (/* binding */ Eip838ExecutionError),
/* harmony export */   ResolverMethodMissingError: () => (/* binding */ ResolverMethodMissingError),
/* harmony export */   Web3ContractError: () => (/* binding */ Web3ContractError)
/* harmony export */ });
/* harmony import */ var _error_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error_codes.js */ "./node_modules/web3-errors/lib/esm/error_codes.js");
/* harmony import */ var _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web3_error_base.js */ "./node_modules/web3-errors/lib/esm/web3_error_base.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/


class Web3ContractError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(message, receipt) {
        super(message);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT;
        this.receipt = receipt;
    }
}
class ResolverMethodMissingError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(address, name) {
        super(`The resolver at ${address} does not implement requested method: "${name}".`);
        this.address = address;
        this.name = name;
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_RESOLVER_MISSING;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { address: this.address, name: this.name });
    }
}
class ContractMissingABIError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super('You must provide the json interface of the contract when instantiating a contract object.');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_ABI_MISSING;
    }
}
class ContractOnceRequiresCallbackError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super('Once requires a callback as the second parameter.');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_REQUIRED_CALLBACK;
    }
}
class ContractEventDoesNotExistError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(eventName) {
        super(`Event "${eventName}" doesn't exist in this contract.`);
        this.eventName = eventName;
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_EVENT_NOT_EXISTS;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { eventName: this.eventName });
    }
}
class ContractReservedEventError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(type) {
        super(`Event "${type}" doesn't exist in this contract.`);
        this.type = type;
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_RESERVED_EVENT;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { type: this.type });
    }
}
class ContractMissingDeployDataError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super(`No "data" specified in neither the given options, nor the default options.`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_MISSING_DEPLOY_DATA;
    }
}
class ContractNoAddressDefinedError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super("This contract object doesn't have address set yet, please set an address first.");
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_MISSING_ADDRESS;
    }
}
class ContractNoFromAddressDefinedError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super('No "from" address specified in neither the given options, nor the default options.');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_MISSING_FROM_ADDRESS;
    }
}
class ContractInstantiationError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super(...arguments);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_INSTANTIATION;
    }
}
/**
 * This class is expected to be set as an `cause` inside ContractExecutionError
 * The properties would be typically decoded from the `data` if it was encoded according to EIP-838
 */
class Eip838ExecutionError extends Web3ContractError {
    constructor(error) {
        super(error.message || 'Error');
        this.name = ('name' in error && error.name) || this.constructor.name;
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        this.stack = ('stack' in error && error.stack) || undefined;
        this.code = error.code;
        // get embedded error details got from some providers like MetaMask
        // and set this.data from the inner error data for easier read.
        // note: the data is a hex string inside either:
        //	 error.data, error.data.data or error.data.originalError.data (https://github.com/web3/web3.js/issues/4454#issuecomment-1485953455)
        if (typeof error.data === 'object') {
            let originalError;
            if (error.data && 'originalError' in error.data) {
                originalError = error.data.originalError;
            }
            else {
                // Ganache has no `originalError` sub-object unlike others
                originalError = error.data;
            }
            this.data = originalError.data;
            this.cause = new Eip838ExecutionError(originalError);
        }
        else {
            this.data = error.data;
        }
    }
    setDecodedProperties(errorName, errorSignature, errorArgs) {
        this.errorName = errorName;
        this.errorSignature = errorSignature;
        this.errorArgs = errorArgs;
    }
    toJSON() {
        let json = Object.assign(Object.assign({}, super.toJSON()), { data: this.data });
        if (this.errorName) {
            json = Object.assign(Object.assign({}, json), { errorName: this.errorName, errorSignature: this.errorSignature, errorArgs: this.errorArgs });
        }
        return json;
    }
}
/**
 * Used when an error is raised while executing a function inside a smart contract.
 * The data is expected to be encoded according to EIP-848.
 */
class ContractExecutionError extends Web3ContractError {
    constructor(rpcError) {
        super('Error happened while trying to execute a function inside a smart contract');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_EXECUTION_REVERTED;
        this.cause = new Eip838ExecutionError(rpcError);
    }
}
class ContractTransactionDataAndInputError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        var _a, _b;
        super(`data: ${(_a = value.data) !== null && _a !== void 0 ? _a : 'undefined'}, input: ${(_b = value.input) !== null && _b !== void 0 ? _b : 'undefined'}`, 'You can\'t have "data" and "input" as properties of a contract at the same time, please use either "data" or "input" instead.');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_TX_DATA_AND_INPUT;
    }
}
//# sourceMappingURL=contract_errors.js.map

/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/errors/core_errors.js":
/*!****************************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/errors/core_errors.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfigChainMismatchError: () => (/* binding */ ConfigChainMismatchError),
/* harmony export */   ConfigHardforkMismatchError: () => (/* binding */ ConfigHardforkMismatchError)
/* harmony export */ });
/* harmony import */ var _web3_error_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../web3_error_base.js */ "./node_modules/web3-errors/lib/esm/web3_error_base.js");
/* harmony import */ var _error_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../error_codes.js */ "./node_modules/web3-errors/lib/esm/error_codes.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/* eslint-disable max-classes-per-file */


class ConfigHardforkMismatchError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_0__.BaseWeb3Error {
    constructor(defaultHardfork, commonHardFork) {
        super(`Web3Config hardfork doesnt match in defaultHardfork ${defaultHardfork} and common.hardfork ${commonHardFork}`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_CORE_HARDFORK_MISMATCH;
    }
}
class ConfigChainMismatchError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_0__.BaseWeb3Error {
    constructor(defaultHardfork, commonHardFork) {
        super(`Web3Config chain doesnt match in defaultHardfork ${defaultHardfork} and common.hardfork ${commonHardFork}`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_CORE_HARDFORK_MISMATCH;
    }
}
//# sourceMappingURL=core_errors.js.map

/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/errors/ens_errors.js":
/*!***************************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/errors/ens_errors.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ENSCheckInterfaceSupportError: () => (/* binding */ ENSCheckInterfaceSupportError),
/* harmony export */   ENSNetworkNotSyncedError: () => (/* binding */ ENSNetworkNotSyncedError),
/* harmony export */   ENSUnsupportedNetworkError: () => (/* binding */ ENSUnsupportedNetworkError)
/* harmony export */ });
/* harmony import */ var _error_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error_codes.js */ "./node_modules/web3-errors/lib/esm/error_codes.js");
/* harmony import */ var _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web3_error_base.js */ "./node_modules/web3-errors/lib/esm/web3_error_base.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/* eslint-disable max-classes-per-file */


class ENSCheckInterfaceSupportError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(errorDetails) {
        super(`ENS resolver check interface support error. "${errorDetails}"`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_ENS_CHECK_INTERFACE_SUPPORT;
    }
}
class ENSUnsupportedNetworkError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(networkType) {
        super(`ENS is not supported on network ${networkType}`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_ENS_UNSUPPORTED_NETWORK;
    }
}
class ENSNetworkNotSyncedError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super(`Network not synced`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_ENS_NETWORK_NOT_SYNCED;
    }
}
//# sourceMappingURL=ens_errors.js.map

/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/errors/generic_errors.js":
/*!*******************************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/errors/generic_errors.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbiError: () => (/* binding */ AbiError),
/* harmony export */   ExistingPluginNamespaceError: () => (/* binding */ ExistingPluginNamespaceError),
/* harmony export */   FormatterError: () => (/* binding */ FormatterError),
/* harmony export */   InvalidMethodParamsError: () => (/* binding */ InvalidMethodParamsError),
/* harmony export */   InvalidNumberOfParamsError: () => (/* binding */ InvalidNumberOfParamsError),
/* harmony export */   MethodNotImplementedError: () => (/* binding */ MethodNotImplementedError),
/* harmony export */   OperationAbortError: () => (/* binding */ OperationAbortError),
/* harmony export */   OperationTimeoutError: () => (/* binding */ OperationTimeoutError)
/* harmony export */ });
/* harmony import */ var _error_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error_codes.js */ "./node_modules/web3-errors/lib/esm/error_codes.js");
/* harmony import */ var _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web3_error_base.js */ "./node_modules/web3-errors/lib/esm/web3_error_base.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/* eslint-disable max-classes-per-file */


class InvalidNumberOfParamsError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(got, expected, method) {
        super(`Invalid number of parameters for "${method}". Got "${got}" expected "${expected}"!`);
        this.got = got;
        this.expected = expected;
        this.method = method;
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_PARAM;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { got: this.got, expected: this.expected, method: this.method });
    }
}
class InvalidMethodParamsError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(hint) {
        super(`Invalid parameters passed. "${typeof hint !== 'undefined' ? hint : ''}"`);
        this.hint = hint;
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_METHOD_PARAMS;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { hint: this.hint });
    }
}
class FormatterError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super(...arguments);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_FORMATTERS;
    }
}
class MethodNotImplementedError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super("The method you're trying to call is not implemented.");
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_METHOD_NOT_IMPLEMENTED;
    }
}
class OperationTimeoutError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super(...arguments);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_OPERATION_TIMEOUT;
    }
}
class OperationAbortError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super(...arguments);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_OPERATION_ABORT;
    }
}
class AbiError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(message, props) {
        super(message);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_ABI_ENCODING;
        this.props = props !== null && props !== void 0 ? props : {};
    }
}
class ExistingPluginNamespaceError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(pluginNamespace) {
        super(`A plugin with the namespace: ${pluginNamespace} has already been registered.`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_EXISTING_PLUGIN_NAMESPACE;
    }
}
//# sourceMappingURL=generic_errors.js.map

/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/errors/provider_errors.js":
/*!********************************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/errors/provider_errors.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InvalidClientError: () => (/* binding */ InvalidClientError),
/* harmony export */   InvalidProviderError: () => (/* binding */ InvalidProviderError),
/* harmony export */   ProviderError: () => (/* binding */ ProviderError),
/* harmony export */   SubscriptionError: () => (/* binding */ SubscriptionError),
/* harmony export */   Web3WSProviderError: () => (/* binding */ Web3WSProviderError)
/* harmony export */ });
/* harmony import */ var _error_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error_codes.js */ "./node_modules/web3-errors/lib/esm/error_codes.js");
/* harmony import */ var _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web3_error_base.js */ "./node_modules/web3-errors/lib/esm/web3_error_base.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/* eslint-disable max-classes-per-file */


class ProviderError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super(...arguments);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_PROVIDER;
    }
}
class InvalidProviderError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(clientUrl) {
        super(`Provider with url "${clientUrl}" is not set or invalid`);
        this.clientUrl = clientUrl;
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_PROVIDER;
    }
}
class InvalidClientError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(clientUrl) {
        super(`Client URL "${clientUrl}" is invalid.`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_CLIENT;
    }
}
class SubscriptionError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super(...arguments);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_SUBSCRIPTION;
    }
}
class Web3WSProviderError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super(...arguments);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_WS_PROVIDER; // this had duplicate code with generic provider
    }
}
//# sourceMappingURL=provider_errors.js.map

/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/errors/response_errors.js":
/*!********************************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/errors/response_errors.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InvalidResponseError: () => (/* binding */ InvalidResponseError),
/* harmony export */   ResponseError: () => (/* binding */ ResponseError)
/* harmony export */ });
/* harmony import */ var _web3_error_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../web3_error_base.js */ "./node_modules/web3-errors/lib/esm/web3_error_base.js");
/* harmony import */ var _error_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../error_codes.js */ "./node_modules/web3-errors/lib/esm/error_codes.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/


// To avoid circular package dependency, copied to code here. If you update this please update same function in `json_rpc.ts`
const isResponseWithError = (response) => !Array.isArray(response) &&
    response.jsonrpc === '2.0' &&
    !!response &&
    // eslint-disable-next-line no-null/no-null
    (response.result === undefined || response.result === null) &&
    // JSON RPC consider "null" as valid response
    'error' in response &&
    (typeof response.id === 'number' || typeof response.id === 'string');
const buildErrorMessage = (response) => isResponseWithError(response) ? response.error.message : '';
class ResponseError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_0__.BaseWeb3Error {
    constructor(response, message, request, statusCode) {
        var _a;
        super(message !== null && message !== void 0 ? message : `Returned error: ${Array.isArray(response)
            ? response.map(r => buildErrorMessage(r)).join(',')
            : buildErrorMessage(response)}`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RESPONSE;
        if (!message) {
            this.data = Array.isArray(response)
                ? response.map(r => { var _a; return (_a = r.error) === null || _a === void 0 ? void 0 : _a.data; })
                : (_a = response === null || response === void 0 ? void 0 : response.error) === null || _a === void 0 ? void 0 : _a.data;
        }
        this.statusCode = statusCode;
        this.request = request;
        let errorOrErrors;
        if (`error` in response) {
            errorOrErrors = response.error;
        }
        else if (response instanceof Array) {
            errorOrErrors = response.filter(r => r.error).map(r => r.error);
        }
        if (Array.isArray(errorOrErrors) && errorOrErrors.length > 0) {
            this.cause = new _web3_error_base_js__WEBPACK_IMPORTED_MODULE_0__.MultipleErrors(errorOrErrors);
        }
        else {
            this.cause = errorOrErrors;
        }
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { data: this.data, request: this.request, statusCode: this.statusCode });
    }
}
class InvalidResponseError extends ResponseError {
    constructor(result, request) {
        super(result, undefined, request);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_INVALID_RESPONSE;
        let errorOrErrors;
        if (`error` in result) {
            errorOrErrors = result.error;
        }
        else if (result instanceof Array) {
            errorOrErrors = result.map(r => r.error);
        }
        if (Array.isArray(errorOrErrors)) {
            this.cause = new _web3_error_base_js__WEBPACK_IMPORTED_MODULE_0__.MultipleErrors(errorOrErrors);
        }
        else {
            this.cause = errorOrErrors;
        }
    }
}
//# sourceMappingURL=response_errors.js.map

/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/errors/rpc_error_messages.js":
/*!***********************************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/errors/rpc_error_messages.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RpcErrorMessages: () => (/* binding */ RpcErrorMessages),
/* harmony export */   genericRpcErrorMessageTemplate: () => (/* binding */ genericRpcErrorMessageTemplate)
/* harmony export */ });
/* harmony import */ var _error_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error_codes.js */ "./node_modules/web3-errors/lib/esm/error_codes.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * A template string for a generic Rpc Error. The `*code*` will be replaced with the code number.
 * Note: consider in next version that a spelling mistake could be corrected for `occured` and the value could be:
 * 	`An Rpc error has occurred with a code of *code*`
 */
const genericRpcErrorMessageTemplate = 'An Rpc error has occured with a code of *code*';
/* eslint-disable @typescript-eslint/naming-convention */
const RpcErrorMessages = {
    //  EIP-1474 & JSON RPC 2.0
    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1474.md
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_INVALID_JSON]: {
        message: 'Parse error',
        description: 'Invalid JSON',
    },
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_INVALID_REQUEST]: {
        message: 'Invalid request',
        description: 'JSON is not a valid request object	',
    },
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_INVALID_METHOD]: {
        message: 'Method not found',
        description: 'Method does not exist	',
    },
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_INVALID_PARAMS]: {
        message: 'Invalid params',
        description: 'Invalid method parameters',
    },
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_INTERNAL_ERROR]: {
        message: 'Internal error',
        description: 'Internal JSON-RPC error',
    },
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_INVALID_INPUT]: {
        message: 'Invalid input',
        description: 'Missing or invalid parameters',
    },
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_MISSING_RESOURCE]: {
        message: 'Resource not found',
        description: 'Requested resource not found',
    },
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_UNAVAILABLE_RESOURCE]: {
        message: 'Resource unavailable',
        description: 'Requested resource not available',
    },
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_TRANSACTION_REJECTED]: {
        message: 'Transaction rejected',
        description: 'Transaction creation failed',
    },
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_UNSUPPORTED_METHOD]: {
        message: 'Method not supported',
        description: 'Method is not implemented',
    },
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_LIMIT_EXCEEDED]: {
        message: 'Limit exceeded',
        description: 'Request exceeds defined limit',
    },
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_NOT_SUPPORTED]: {
        message: 'JSON-RPC version not supported',
        description: 'Version of JSON-RPC protocol is not supported',
    },
    // EIP-1193
    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md#provider-errors
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.JSONRPC_ERR_REJECTED_REQUEST]: {
        name: 'User Rejected Request',
        message: 'The user rejected the request.',
    },
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.JSONRPC_ERR_UNAUTHORIZED]: {
        name: 'Unauthorized',
        message: 'The requested method and/or account has not been authorized by the user.',
    },
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.JSONRPC_ERR_UNSUPPORTED_METHOD]: {
        name: 'Unsupported Method',
        message: 'The Provider does not support the requested method.',
    },
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.JSONRPC_ERR_DISCONNECTED]: {
        name: 'Disconnected',
        message: 'The Provider is disconnected from all chains.',
    },
    [_error_codes_js__WEBPACK_IMPORTED_MODULE_0__.JSONRPC_ERR_CHAIN_DISCONNECTED]: {
        name: 'Chain Disconnected',
        message: 'The Provider is not connected to the requested chain.',
    },
    // EIP-1193 - CloseEvent
    // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/code
    '0-999': {
        name: '',
        message: 'Not used.',
    },
    1000: {
        name: 'Normal Closure',
        message: 'The connection successfully completed the purpose for which it was created.',
    },
    1001: {
        name: 'Going Away',
        message: 'The endpoint is going away, either because of a server failure or because the browser is navigating away from the page that opened the connection.',
    },
    1002: {
        name: 'Protocol error',
        message: 'The endpoint is terminating the connection due to a protocol error.',
    },
    1003: {
        name: 'Unsupported Data',
        message: 'The connection is being terminated because the endpoint received data of a type it cannot accept. (For example, a text-only endpoint received binary data.)',
    },
    1004: {
        name: 'Reserved',
        message: 'Reserved. A meaning might be defined in the future.',
    },
    1005: {
        name: 'No Status Rcvd',
        message: 'Reserved. Indicates that no status code was provided even though one was expected.',
    },
    1006: {
        name: 'Abnormal Closure',
        message: 'Reserved. Indicates that a connection was closed abnormally (that is, with no close frame being sent) when a status code is expected.',
    },
    1007: {
        name: 'Invalid frame payload data',
        message: 'The endpoint is terminating the connection because a message was received that contained inconsistent data (e.g., non-UTF-8 data within a text message).',
    },
    1008: {
        name: 'Policy Violation',
        message: 'The endpoint is terminating the connection because it received a message that violates its policy. This is a generic status code, used when codes 1003 and 1009 are not suitable.',
    },
    1009: {
        name: 'Message Too Big',
        message: 'The endpoint is terminating the connection because a data frame was received that is too large.',
    },
    1010: {
        name: 'Mandatory Ext.',
        message: "The client is terminating the connection because it expected the server to negotiate one or more extension, but the server didn't.",
    },
    1011: {
        name: 'Internal Error',
        message: 'The server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.',
    },
    1012: {
        name: 'Service Restart',
        message: 'The server is terminating the connection because it is restarting.',
    },
    1013: {
        name: 'Try Again Later',
        message: 'The server is terminating the connection due to a temporary condition, e.g. it is overloaded and is casting off some of its clients.',
    },
    1014: {
        name: 'Bad Gateway',
        message: 'The server was acting as a gateway or proxy and received an invalid response from the upstream server. This is similar to 502 HTTP Status Code.',
    },
    1015: {
        name: 'TLS handshake',
        message: "Reserved. Indicates that the connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).",
    },
    '1016-2999': {
        name: '',
        message: 'For definition by future revisions of the WebSocket Protocol specification, and for definition by extension specifications.',
    },
    '3000-3999': {
        name: '',
        message: 'For use by libraries, frameworks, and applications. These status codes are registered directly with IANA. The interpretation of these codes is undefined by the WebSocket protocol.',
    },
    '4000-4999': {
        name: '',
        message: "For private use, and thus can't be registered. Such codes can be used by prior agreements between WebSocket applications. The interpretation of these codes is undefined by the WebSocket protocol.",
    },
};
//# sourceMappingURL=rpc_error_messages.js.map

/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/errors/rpc_errors.js":
/*!***************************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/errors/rpc_errors.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EIP1193ProviderRpcError: () => (/* binding */ EIP1193ProviderRpcError),
/* harmony export */   InternalError: () => (/* binding */ InternalError),
/* harmony export */   InvalidInputError: () => (/* binding */ InvalidInputError),
/* harmony export */   InvalidParamsError: () => (/* binding */ InvalidParamsError),
/* harmony export */   InvalidRequestError: () => (/* binding */ InvalidRequestError),
/* harmony export */   LimitExceededError: () => (/* binding */ LimitExceededError),
/* harmony export */   MethodNotFoundError: () => (/* binding */ MethodNotFoundError),
/* harmony export */   MethodNotSupported: () => (/* binding */ MethodNotSupported),
/* harmony export */   ParseError: () => (/* binding */ ParseError),
/* harmony export */   ResourceUnavailableError: () => (/* binding */ ResourceUnavailableError),
/* harmony export */   ResourcesNotFoundError: () => (/* binding */ ResourcesNotFoundError),
/* harmony export */   RpcError: () => (/* binding */ RpcError),
/* harmony export */   TransactionRejectedError: () => (/* binding */ TransactionRejectedError),
/* harmony export */   VersionNotSupportedError: () => (/* binding */ VersionNotSupportedError),
/* harmony export */   rpcErrorsMap: () => (/* binding */ rpcErrorsMap)
/* harmony export */ });
/* harmony import */ var _web3_error_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../web3_error_base.js */ "./node_modules/web3-errors/lib/esm/web3_error_base.js");
/* harmony import */ var _error_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../error_codes.js */ "./node_modules/web3-errors/lib/esm/error_codes.js");
/* harmony import */ var _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rpc_error_messages.js */ "./node_modules/web3-errors/lib/esm/errors/rpc_error_messages.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/



class RpcError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_0__.BaseWeb3Error {
    constructor(rpcError, message) {
        super(message !== null && message !== void 0 ? message : _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.genericRpcErrorMessageTemplate.replace('*code*', rpcError.error.code.toString()));
        this.code = rpcError.error.code;
        this.id = rpcError.id;
        this.jsonrpc = rpcError.jsonrpc;
        this.jsonRpcError = rpcError.error;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { error: this.jsonRpcError, id: this.id, jsonRpc: this.jsonrpc });
    }
}
class EIP1193ProviderRpcError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_0__.BaseWeb3Error {
    constructor(code, data) {
        var _a, _b, _c, _d;
        if (!code) {
            // this case should ideally not happen
            super();
        }
        else if ((_a = _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.RpcErrorMessages[code]) === null || _a === void 0 ? void 0 : _a.message) {
            super(_rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.RpcErrorMessages[code].message);
        }
        else {
            // Retrieve the status code object for the given code from the table, by searching through the appropriate range
            const statusCodeRange = Object.keys(_rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.RpcErrorMessages).find(statusCode => typeof statusCode === 'string' &&
                code >= parseInt(statusCode.split('-')[0], 10) &&
                code <= parseInt(statusCode.split('-')[1], 10));
            super((_c = (_b = _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.RpcErrorMessages[statusCodeRange !== null && statusCodeRange !== void 0 ? statusCodeRange : '']) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.genericRpcErrorMessageTemplate.replace('*code*', (_d = code === null || code === void 0 ? void 0 : code.toString()) !== null && _d !== void 0 ? _d : '""'));
        }
        this.code = code;
        this.data = data;
    }
}
class ParseError extends RpcError {
    constructor(rpcError) {
        super(rpcError, _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.RpcErrorMessages[_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INVALID_JSON].message);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INVALID_JSON;
    }
}
class InvalidRequestError extends RpcError {
    constructor(rpcError) {
        super(rpcError, _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.RpcErrorMessages[_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INVALID_REQUEST].message);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INVALID_REQUEST;
    }
}
class MethodNotFoundError extends RpcError {
    constructor(rpcError) {
        super(rpcError, _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.RpcErrorMessages[_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INVALID_METHOD].message);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INVALID_METHOD;
    }
}
class InvalidParamsError extends RpcError {
    constructor(rpcError) {
        super(rpcError, _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.RpcErrorMessages[_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INVALID_PARAMS].message);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INVALID_PARAMS;
    }
}
class InternalError extends RpcError {
    constructor(rpcError) {
        super(rpcError, _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.RpcErrorMessages[_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INTERNAL_ERROR].message);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INTERNAL_ERROR;
    }
}
class InvalidInputError extends RpcError {
    constructor(rpcError) {
        super(rpcError, _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.RpcErrorMessages[_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INVALID_INPUT].message);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INVALID_INPUT;
    }
}
class MethodNotSupported extends RpcError {
    constructor(rpcError) {
        super(rpcError, _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.RpcErrorMessages[_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_UNSUPPORTED_METHOD].message);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_UNSUPPORTED_METHOD;
    }
}
class ResourceUnavailableError extends RpcError {
    constructor(rpcError) {
        super(rpcError, _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.RpcErrorMessages[_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_UNAVAILABLE_RESOURCE].message);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_UNAVAILABLE_RESOURCE;
    }
}
class ResourcesNotFoundError extends RpcError {
    constructor(rpcError) {
        super(rpcError, _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.RpcErrorMessages[_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_MISSING_RESOURCE].message);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_MISSING_RESOURCE;
    }
}
class VersionNotSupportedError extends RpcError {
    constructor(rpcError) {
        super(rpcError, _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.RpcErrorMessages[_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_NOT_SUPPORTED].message);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_NOT_SUPPORTED;
    }
}
class TransactionRejectedError extends RpcError {
    constructor(rpcError) {
        super(rpcError, _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.RpcErrorMessages[_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_TRANSACTION_REJECTED].message);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_TRANSACTION_REJECTED;
    }
}
class LimitExceededError extends RpcError {
    constructor(rpcError) {
        super(rpcError, _rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_2__.RpcErrorMessages[_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_LIMIT_EXCEEDED].message);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_LIMIT_EXCEEDED;
    }
}
const rpcErrorsMap = new Map();
rpcErrorsMap.set(_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INVALID_JSON, { error: ParseError });
rpcErrorsMap.set(_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INVALID_REQUEST, {
    error: InvalidRequestError,
});
rpcErrorsMap.set(_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INVALID_METHOD, {
    error: MethodNotFoundError,
});
rpcErrorsMap.set(_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INVALID_PARAMS, { error: InvalidParamsError });
rpcErrorsMap.set(_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INTERNAL_ERROR, { error: InternalError });
rpcErrorsMap.set(_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_INVALID_INPUT, { error: InvalidInputError });
rpcErrorsMap.set(_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_UNSUPPORTED_METHOD, {
    error: MethodNotSupported,
});
rpcErrorsMap.set(_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_UNAVAILABLE_RESOURCE, {
    error: ResourceUnavailableError,
});
rpcErrorsMap.set(_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_TRANSACTION_REJECTED, {
    error: TransactionRejectedError,
});
rpcErrorsMap.set(_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_MISSING_RESOURCE, {
    error: ResourcesNotFoundError,
});
rpcErrorsMap.set(_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_NOT_SUPPORTED, {
    error: VersionNotSupportedError,
});
rpcErrorsMap.set(_error_codes_js__WEBPACK_IMPORTED_MODULE_1__.ERR_RPC_LIMIT_EXCEEDED, { error: LimitExceededError });
//# sourceMappingURL=rpc_errors.js.map

/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/errors/schema_errors.js":
/*!******************************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/errors/schema_errors.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SchemaFormatError: () => (/* binding */ SchemaFormatError)
/* harmony export */ });
/* harmony import */ var _error_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error_codes.js */ "./node_modules/web3-errors/lib/esm/error_codes.js");
/* harmony import */ var _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web3_error_base.js */ "./node_modules/web3-errors/lib/esm/web3_error_base.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/


class SchemaFormatError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(type) {
        super(`Format for the type ${type} is unsupported`);
        this.type = type;
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_SCHEMA_FORMAT;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { type: this.type });
    }
}
//# sourceMappingURL=schema_errors.js.map

/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/errors/signature_errors.js":
/*!*********************************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/errors/signature_errors.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignatureError: () => (/* binding */ SignatureError)
/* harmony export */ });
/* harmony import */ var _error_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error_codes.js */ "./node_modules/web3-errors/lib/esm/error_codes.js");
/* harmony import */ var _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web3_error_base.js */ "./node_modules/web3-errors/lib/esm/web3_error_base.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/


class SignatureError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor() {
        super(...arguments);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_SIGNATURE_FAILED;
    }
}
//# sourceMappingURL=signature_errors.js.map

/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/errors/transaction_errors.js":
/*!***********************************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/errors/transaction_errors.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChainIdMismatchError: () => (/* binding */ ChainIdMismatchError),
/* harmony export */   ChainMismatchError: () => (/* binding */ ChainMismatchError),
/* harmony export */   CommonOrChainAndHardforkError: () => (/* binding */ CommonOrChainAndHardforkError),
/* harmony export */   ContractCodeNotStoredError: () => (/* binding */ ContractCodeNotStoredError),
/* harmony export */   Eip1559GasPriceError: () => (/* binding */ Eip1559GasPriceError),
/* harmony export */   Eip1559NotSupportedError: () => (/* binding */ Eip1559NotSupportedError),
/* harmony export */   HardforkMismatchError: () => (/* binding */ HardforkMismatchError),
/* harmony export */   InvalidGasOrGasPrice: () => (/* binding */ InvalidGasOrGasPrice),
/* harmony export */   InvalidMaxPriorityFeePerGasOrMaxFeePerGas: () => (/* binding */ InvalidMaxPriorityFeePerGasOrMaxFeePerGas),
/* harmony export */   InvalidNonceOrChainIdError: () => (/* binding */ InvalidNonceOrChainIdError),
/* harmony export */   InvalidPropertiesForTransactionTypeError: () => (/* binding */ InvalidPropertiesForTransactionTypeError),
/* harmony export */   InvalidTransactionCall: () => (/* binding */ InvalidTransactionCall),
/* harmony export */   InvalidTransactionObjectError: () => (/* binding */ InvalidTransactionObjectError),
/* harmony export */   InvalidTransactionWithReceiver: () => (/* binding */ InvalidTransactionWithReceiver),
/* harmony export */   InvalidTransactionWithSender: () => (/* binding */ InvalidTransactionWithSender),
/* harmony export */   LocalWalletNotAvailableError: () => (/* binding */ LocalWalletNotAvailableError),
/* harmony export */   MissingChainOrHardforkError: () => (/* binding */ MissingChainOrHardforkError),
/* harmony export */   MissingCustomChainError: () => (/* binding */ MissingCustomChainError),
/* harmony export */   MissingCustomChainIdError: () => (/* binding */ MissingCustomChainIdError),
/* harmony export */   MissingGasError: () => (/* binding */ MissingGasError),
/* harmony export */   MissingGasInnerError: () => (/* binding */ MissingGasInnerError),
/* harmony export */   NoContractAddressFoundError: () => (/* binding */ NoContractAddressFoundError),
/* harmony export */   RevertInstructionError: () => (/* binding */ RevertInstructionError),
/* harmony export */   TransactionBlockTimeoutError: () => (/* binding */ TransactionBlockTimeoutError),
/* harmony export */   TransactionDataAndInputError: () => (/* binding */ TransactionDataAndInputError),
/* harmony export */   TransactionError: () => (/* binding */ TransactionError),
/* harmony export */   TransactionGasMismatchError: () => (/* binding */ TransactionGasMismatchError),
/* harmony export */   TransactionGasMismatchInnerError: () => (/* binding */ TransactionGasMismatchInnerError),
/* harmony export */   TransactionMissingReceiptOrBlockHashError: () => (/* binding */ TransactionMissingReceiptOrBlockHashError),
/* harmony export */   TransactionNotFound: () => (/* binding */ TransactionNotFound),
/* harmony export */   TransactionOutOfGasError: () => (/* binding */ TransactionOutOfGasError),
/* harmony export */   TransactionPollingTimeoutError: () => (/* binding */ TransactionPollingTimeoutError),
/* harmony export */   TransactionReceiptMissingBlockNumberError: () => (/* binding */ TransactionReceiptMissingBlockNumberError),
/* harmony export */   TransactionRevertInstructionError: () => (/* binding */ TransactionRevertInstructionError),
/* harmony export */   TransactionRevertWithCustomError: () => (/* binding */ TransactionRevertWithCustomError),
/* harmony export */   TransactionRevertedWithoutReasonError: () => (/* binding */ TransactionRevertedWithoutReasonError),
/* harmony export */   TransactionSendTimeoutError: () => (/* binding */ TransactionSendTimeoutError),
/* harmony export */   TransactionSigningError: () => (/* binding */ TransactionSigningError),
/* harmony export */   UnableToPopulateNonceError: () => (/* binding */ UnableToPopulateNonceError),
/* harmony export */   UndefinedRawTransactionError: () => (/* binding */ UndefinedRawTransactionError),
/* harmony export */   UnsupportedFeeMarketError: () => (/* binding */ UnsupportedFeeMarketError),
/* harmony export */   UnsupportedTransactionTypeError: () => (/* binding */ UnsupportedTransactionTypeError)
/* harmony export */ });
/* harmony import */ var _error_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error_codes.js */ "./node_modules/web3-errors/lib/esm/error_codes.js");
/* harmony import */ var _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web3_error_base.js */ "./node_modules/web3-errors/lib/esm/web3_error_base.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/


class TransactionError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(message, receipt) {
        super(message);
        this.receipt = receipt;
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { receipt: this.receipt });
    }
}
class RevertInstructionError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(reason, signature) {
        super(`Your request got reverted with the following reason string: ${reason}`);
        this.reason = reason;
        this.signature = signature;
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_REVERT_INSTRUCTION;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { reason: this.reason, signature: this.signature });
    }
}
class TransactionRevertInstructionError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(reason, signature, receipt, data) {
        super(`Transaction has been reverted by the EVM${receipt === undefined ? '' : `:\n ${_web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error.convertToString(receipt)}`}`);
        this.reason = reason;
        this.signature = signature;
        this.receipt = receipt;
        this.data = data;
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_REVERT_TRANSACTION;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { reason: this.reason, signature: this.signature, receipt: this.receipt, data: this.data });
    }
}
/**
 * This error is used when a transaction to a smart contract fails and
 * a custom user error (https://blog.soliditylang.org/2021/04/21/custom-errors/)
 * is able to be parsed from the revert reason
 */
class TransactionRevertWithCustomError extends TransactionRevertInstructionError {
    constructor(reason, customErrorName, customErrorDecodedSignature, customErrorArguments, signature, receipt, data) {
        super(reason);
        this.reason = reason;
        this.customErrorName = customErrorName;
        this.customErrorDecodedSignature = customErrorDecodedSignature;
        this.customErrorArguments = customErrorArguments;
        this.signature = signature;
        this.receipt = receipt;
        this.data = data;
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_REVERT_TRANSACTION_CUSTOM_ERROR;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { reason: this.reason, customErrorName: this.customErrorName, customErrorDecodedSignature: this.customErrorDecodedSignature, customErrorArguments: this.customErrorArguments, signature: this.signature, receipt: this.receipt, data: this.data });
    }
}
class NoContractAddressFoundError extends TransactionError {
    constructor(receipt) {
        super("The transaction receipt didn't contain a contract address.", receipt);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_NO_CONTRACT_ADDRESS;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { receipt: this.receipt });
    }
}
class ContractCodeNotStoredError extends TransactionError {
    constructor(receipt) {
        super("The contract code couldn't be stored, please check your gas limit.", receipt);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_CONTRACT_NOT_STORED;
    }
}
class TransactionRevertedWithoutReasonError extends TransactionError {
    constructor(receipt) {
        super(`Transaction has been reverted by the EVM${receipt === undefined ? '' : `:\n ${_web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error.convertToString(receipt)}`}`, receipt);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_REVERT_WITHOUT_REASON;
    }
}
class TransactionOutOfGasError extends TransactionError {
    constructor(receipt) {
        super(`Transaction ran out of gas. Please provide more gas:\n ${JSON.stringify(receipt, undefined, 2)}`, receipt);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_OUT_OF_GAS;
    }
}
class UndefinedRawTransactionError extends TransactionError {
    constructor() {
        super(`Raw transaction undefined`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RAW_TX_UNDEFINED;
    }
}
class TransactionNotFound extends TransactionError {
    constructor() {
        super('Transaction not found');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_NOT_FOUND;
    }
}
class InvalidTransactionWithSender extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'invalid transaction with invalid sender');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_SENDER;
    }
}
class InvalidTransactionWithReceiver extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'invalid transaction with invalid receiver');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_RECEIVER;
    }
}
class InvalidTransactionCall extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'invalid transaction call');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_CALL;
    }
}
class MissingCustomChainError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor() {
        super('MissingCustomChainError', 'If tx.common is provided it must have tx.common.customChain');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_MISSING_CUSTOM_CHAIN;
    }
}
class MissingCustomChainIdError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor() {
        super('MissingCustomChainIdError', 'If tx.common is provided it must have tx.common.customChain and tx.common.customChain.chainId');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_MISSING_CUSTOM_CHAIN_ID;
    }
}
class ChainIdMismatchError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(JSON.stringify(value), 
        // https://github.com/ChainSafe/web3.js/blob/8783f4d64e424456bdc53b34ef1142d0a7cee4d7/packages/web3-eth-accounts/src/index.js#L176
        'Chain Id doesnt match in tx.chainId tx.common.customChain.chainId');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_CHAIN_ID_MISMATCH;
    }
}
class ChainMismatchError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(JSON.stringify(value), 'Chain doesnt match in tx.chain tx.common.basechain');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_CHAIN_MISMATCH;
    }
}
class HardforkMismatchError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(JSON.stringify(value), 'hardfork doesnt match in tx.hardfork tx.common.hardfork');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_HARDFORK_MISMATCH;
    }
}
class CommonOrChainAndHardforkError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor() {
        super('CommonOrChainAndHardforkError', 'Please provide the common object or the chain and hardfork property but not all together.');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_CHAIN_INFO;
    }
}
class MissingChainOrHardforkError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        var _a, _b;
        super('MissingChainOrHardforkError', `When specifying chain and hardfork, both values must be defined. Received "chain": ${(_a = value.chain) !== null && _a !== void 0 ? _a : 'undefined'}, "hardfork": ${(_b = value.hardfork) !== null && _b !== void 0 ? _b : 'undefined'}`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_MISSING_CHAIN_INFO;
    }
}
class MissingGasInnerError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super('Missing properties in transaction, either define "gas" and "gasPrice" for type 0 transactions or "gas", "maxPriorityFeePerGas" and "maxFeePerGas" for type 2 transactions');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_MISSING_GAS_INNER_ERROR;
    }
}
class MissingGasError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        var _a, _b, _c, _d;
        super(`gas: ${(_a = value.gas) !== null && _a !== void 0 ? _a : 'undefined'}, gasPrice: ${(_b = value.gasPrice) !== null && _b !== void 0 ? _b : 'undefined'}, maxPriorityFeePerGas: ${(_c = value.maxPriorityFeePerGas) !== null && _c !== void 0 ? _c : 'undefined'}, maxFeePerGas: ${(_d = value.maxFeePerGas) !== null && _d !== void 0 ? _d : 'undefined'}`, '"gas" is missing');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_MISSING_GAS;
        this.cause = new MissingGasInnerError();
    }
}
class TransactionGasMismatchInnerError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor() {
        super('Missing properties in transaction, either define "gas" and "gasPrice" for type 0 transactions or "gas", "maxPriorityFeePerGas" and "maxFeePerGas" for type 2 transactions, not both');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_GAS_MISMATCH_INNER_ERROR;
    }
}
class TransactionGasMismatchError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        var _a, _b, _c, _d;
        super(`gas: ${(_a = value.gas) !== null && _a !== void 0 ? _a : 'undefined'}, gasPrice: ${(_b = value.gasPrice) !== null && _b !== void 0 ? _b : 'undefined'}, maxPriorityFeePerGas: ${(_c = value.maxPriorityFeePerGas) !== null && _c !== void 0 ? _c : 'undefined'}, maxFeePerGas: ${(_d = value.maxFeePerGas) !== null && _d !== void 0 ? _d : 'undefined'}`, 'transaction must specify legacy or fee market gas properties, not both');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_GAS_MISMATCH;
        this.cause = new TransactionGasMismatchInnerError();
    }
}
class InvalidGasOrGasPrice extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        var _a, _b;
        super(`gas: ${(_a = value.gas) !== null && _a !== void 0 ? _a : 'undefined'}, gasPrice: ${(_b = value.gasPrice) !== null && _b !== void 0 ? _b : 'undefined'}`, 'Gas or gasPrice is lower than 0');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_LEGACY_GAS;
    }
}
class InvalidMaxPriorityFeePerGasOrMaxFeePerGas extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        var _a, _b;
        super(`maxPriorityFeePerGas: ${(_a = value.maxPriorityFeePerGas) !== null && _a !== void 0 ? _a : 'undefined'}, maxFeePerGas: ${(_b = value.maxFeePerGas) !== null && _b !== void 0 ? _b : 'undefined'}`, 'maxPriorityFeePerGas or maxFeePerGas is lower than 0');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_FEE_MARKET_GAS;
    }
}
class Eip1559GasPriceError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, "eip-1559 transactions don't support gasPrice");
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_FEE_MARKET_GAS_PRICE;
    }
}
class UnsupportedFeeMarketError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        var _a, _b;
        super(`maxPriorityFeePerGas: ${(_a = value.maxPriorityFeePerGas) !== null && _a !== void 0 ? _a : 'undefined'}, maxFeePerGas: ${(_b = value.maxFeePerGas) !== null && _b !== void 0 ? _b : 'undefined'}`, "pre-eip-1559 transaction don't support maxFeePerGas/maxPriorityFeePerGas");
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_LEGACY_FEE_MARKET;
    }
}
class InvalidTransactionObjectError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'invalid transaction object');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_OBJECT;
    }
}
class InvalidNonceOrChainIdError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        var _a, _b;
        super(`nonce: ${(_a = value.nonce) !== null && _a !== void 0 ? _a : 'undefined'}, chainId: ${(_b = value.chainId) !== null && _b !== void 0 ? _b : 'undefined'}`, 'Nonce or chainId is lower than 0');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_NONCE_OR_CHAIN_ID;
    }
}
class UnableToPopulateNonceError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor() {
        super('UnableToPopulateNonceError', 'unable to populate nonce, no from address available');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_UNABLE_TO_POPULATE_NONCE;
    }
}
class Eip1559NotSupportedError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor() {
        super('Eip1559NotSupportedError', "Network doesn't support eip-1559");
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_UNSUPPORTED_EIP_1559;
    }
}
class UnsupportedTransactionTypeError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'unsupported transaction type');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_UNSUPPORTED_TYPE;
    }
}
class TransactionDataAndInputError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        var _a, _b;
        super(`data: ${(_a = value.data) !== null && _a !== void 0 ? _a : 'undefined'}, input: ${(_b = value.input) !== null && _b !== void 0 ? _b : 'undefined'}`, 'You can\'t have "data" and "input" as properties of transactions at the same time, please use either "data" or "input" instead.');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_DATA_AND_INPUT;
    }
}
class TransactionSendTimeoutError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(value) {
        super(`The connected Ethereum Node did not respond within ${value.numberOfSeconds} seconds, please make sure your transaction was properly sent and you are connected to a healthy Node. Be aware that transaction might still be pending or mined!\n\tTransaction Hash: ${value.transactionHash ? value.transactionHash.toString() : 'not available'}`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_SEND_TIMEOUT;
    }
}
function transactionTimeoutHint(transactionHash) {
    return `Please make sure your transaction was properly sent and there are no previous pending transaction for the same account. However, be aware that it might still be mined!\n\tTransaction Hash: ${transactionHash ? transactionHash.toString() : 'not available'}`;
}
class TransactionPollingTimeoutError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(value) {
        super(`Transaction was not mined within ${value.numberOfSeconds} seconds. ${transactionTimeoutHint(value.transactionHash)}`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_POLLING_TIMEOUT;
    }
}
class TransactionBlockTimeoutError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(value) {
        super(`Transaction started at ${value.starterBlockNumber} but was not mined within ${value.numberOfBlocks} blocks. ${transactionTimeoutHint(value.transactionHash)}`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_BLOCK_TIMEOUT;
    }
}
class TransactionMissingReceiptOrBlockHashError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        var _a, _b;
        super(`receipt: ${JSON.stringify(value.receipt)}, blockHash: ${(_a = value.blockHash) === null || _a === void 0 ? void 0 : _a.toString()}, transactionHash: ${(_b = value.transactionHash) === null || _b === void 0 ? void 0 : _b.toString()}`, `Receipt missing or blockHash null`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_RECEIPT_MISSING_OR_BLOCKHASH_NULL;
    }
}
class TransactionReceiptMissingBlockNumberError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(`receipt: ${JSON.stringify(value.receipt)}`, `Receipt missing block number`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_RECEIPT_MISSING_BLOCK_NUMBER;
    }
}
class TransactionSigningError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(errorDetails) {
        super(`Invalid signature. "${errorDetails}"`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_SIGNING;
    }
}
class LocalWalletNotAvailableError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor() {
        super('LocalWalletNotAvailableError', `Attempted to index account in local wallet, but no wallet is available`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_LOCAL_WALLET_NOT_AVAILABLE;
    }
}
class InvalidPropertiesForTransactionTypeError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error {
    constructor(validationError, txType) {
        const invalidPropertyNames = [];
        validationError.forEach(error => invalidPropertyNames.push(error.keyword));
        super(`The following properties are invalid for the transaction type ${txType}: ${invalidPropertyNames.join(', ')}`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_PROPERTIES_FOR_TYPE;
    }
}
//# sourceMappingURL=transaction_errors.js.map

/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/errors/utils_errors.js":
/*!*****************************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/errors/utils_errors.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HexProcessingError: () => (/* binding */ HexProcessingError),
/* harmony export */   InvalidAddressError: () => (/* binding */ InvalidAddressError),
/* harmony export */   InvalidBlockError: () => (/* binding */ InvalidBlockError),
/* harmony export */   InvalidBooleanError: () => (/* binding */ InvalidBooleanError),
/* harmony export */   InvalidBytesError: () => (/* binding */ InvalidBytesError),
/* harmony export */   InvalidIntegerError: () => (/* binding */ InvalidIntegerError),
/* harmony export */   InvalidLargeValueError: () => (/* binding */ InvalidLargeValueError),
/* harmony export */   InvalidNumberError: () => (/* binding */ InvalidNumberError),
/* harmony export */   InvalidSizeError: () => (/* binding */ InvalidSizeError),
/* harmony export */   InvalidStringError: () => (/* binding */ InvalidStringError),
/* harmony export */   InvalidTypeAbiInputError: () => (/* binding */ InvalidTypeAbiInputError),
/* harmony export */   InvalidTypeError: () => (/* binding */ InvalidTypeError),
/* harmony export */   InvalidUnitError: () => (/* binding */ InvalidUnitError),
/* harmony export */   InvalidUnsignedIntegerError: () => (/* binding */ InvalidUnsignedIntegerError),
/* harmony export */   NibbleWidthError: () => (/* binding */ NibbleWidthError)
/* harmony export */ });
/* harmony import */ var _error_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error_codes.js */ "./node_modules/web3-errors/lib/esm/error_codes.js");
/* harmony import */ var _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web3_error_base.js */ "./node_modules/web3-errors/lib/esm/web3_error_base.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/* eslint-disable max-classes-per-file */


class InvalidBytesError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'can not parse as byte data');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_BYTES;
    }
}
class InvalidNumberError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'can not parse as number data');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_NUMBER;
    }
}
class InvalidAddressError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'invalid ethereum address');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_ADDRESS;
    }
}
class InvalidStringError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'not a valid string');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_STRING;
    }
}
class InvalidUnitError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'invalid unit');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_UNIT;
    }
}
class InvalidIntegerError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'not a valid unit. Must be a positive integer');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_INTEGER;
    }
}
class HexProcessingError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'can not be converted to hex');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_HEX;
    }
}
class NibbleWidthError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'value greater than the nibble width');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_NIBBLE_WIDTH;
    }
}
class InvalidTypeError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'invalid type, type not supported');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_TYPE;
    }
}
class InvalidBooleanError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'not a valid boolean.');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_BOOLEAN;
    }
}
class InvalidUnsignedIntegerError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'not a valid unsigned integer.');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_UNSIGNED_INTEGER;
    }
}
class InvalidSizeError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'invalid size given.');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_SIZE;
    }
}
class InvalidLargeValueError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'value is larger than size.');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_LARGE_VALUE;
    }
}
class InvalidBlockError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'invalid string given');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_BLOCK;
    }
}
class InvalidTypeAbiInputError extends _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError {
    constructor(value) {
        super(value, 'components found but type is not tuple');
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_TYPE_ABI;
    }
}
//# sourceMappingURL=utils_errors.js.map

/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/index.js":
/*!***************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbiError: () => (/* reexport safe */ _errors_generic_errors_js__WEBPACK_IMPORTED_MODULE_6__.AbiError),
/* harmony export */   BaseWeb3Error: () => (/* reexport safe */ _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.BaseWeb3Error),
/* harmony export */   ChainIdMismatchError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.ChainIdMismatchError),
/* harmony export */   ChainMismatchError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.ChainMismatchError),
/* harmony export */   CommonOrChainAndHardforkError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.CommonOrChainAndHardforkError),
/* harmony export */   ConfigChainMismatchError: () => (/* reexport safe */ _errors_core_errors_js__WEBPACK_IMPORTED_MODULE_12__.ConfigChainMismatchError),
/* harmony export */   ConfigHardforkMismatchError: () => (/* reexport safe */ _errors_core_errors_js__WEBPACK_IMPORTED_MODULE_12__.ConfigHardforkMismatchError),
/* harmony export */   ConnectionCloseError: () => (/* reexport safe */ _errors_connection_errors_js__WEBPACK_IMPORTED_MODULE_3__.ConnectionCloseError),
/* harmony export */   ConnectionError: () => (/* reexport safe */ _errors_connection_errors_js__WEBPACK_IMPORTED_MODULE_3__.ConnectionError),
/* harmony export */   ConnectionNotOpenError: () => (/* reexport safe */ _errors_connection_errors_js__WEBPACK_IMPORTED_MODULE_3__.ConnectionNotOpenError),
/* harmony export */   ConnectionTimeoutError: () => (/* reexport safe */ _errors_connection_errors_js__WEBPACK_IMPORTED_MODULE_3__.ConnectionTimeoutError),
/* harmony export */   ContractCodeNotStoredError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.ContractCodeNotStoredError),
/* harmony export */   ContractEventDoesNotExistError: () => (/* reexport safe */ _errors_contract_errors_js__WEBPACK_IMPORTED_MODULE_4__.ContractEventDoesNotExistError),
/* harmony export */   ContractExecutionError: () => (/* reexport safe */ _errors_contract_errors_js__WEBPACK_IMPORTED_MODULE_4__.ContractExecutionError),
/* harmony export */   ContractInstantiationError: () => (/* reexport safe */ _errors_contract_errors_js__WEBPACK_IMPORTED_MODULE_4__.ContractInstantiationError),
/* harmony export */   ContractMissingABIError: () => (/* reexport safe */ _errors_contract_errors_js__WEBPACK_IMPORTED_MODULE_4__.ContractMissingABIError),
/* harmony export */   ContractMissingDeployDataError: () => (/* reexport safe */ _errors_contract_errors_js__WEBPACK_IMPORTED_MODULE_4__.ContractMissingDeployDataError),
/* harmony export */   ContractNoAddressDefinedError: () => (/* reexport safe */ _errors_contract_errors_js__WEBPACK_IMPORTED_MODULE_4__.ContractNoAddressDefinedError),
/* harmony export */   ContractNoFromAddressDefinedError: () => (/* reexport safe */ _errors_contract_errors_js__WEBPACK_IMPORTED_MODULE_4__.ContractNoFromAddressDefinedError),
/* harmony export */   ContractOnceRequiresCallbackError: () => (/* reexport safe */ _errors_contract_errors_js__WEBPACK_IMPORTED_MODULE_4__.ContractOnceRequiresCallbackError),
/* harmony export */   ContractReservedEventError: () => (/* reexport safe */ _errors_contract_errors_js__WEBPACK_IMPORTED_MODULE_4__.ContractReservedEventError),
/* harmony export */   ContractTransactionDataAndInputError: () => (/* reexport safe */ _errors_contract_errors_js__WEBPACK_IMPORTED_MODULE_4__.ContractTransactionDataAndInputError),
/* harmony export */   EIP1193ProviderRpcError: () => (/* reexport safe */ _errors_rpc_errors_js__WEBPACK_IMPORTED_MODULE_13__.EIP1193ProviderRpcError),
/* harmony export */   ENSCheckInterfaceSupportError: () => (/* reexport safe */ _errors_ens_errors_js__WEBPACK_IMPORTED_MODULE_5__.ENSCheckInterfaceSupportError),
/* harmony export */   ENSNetworkNotSyncedError: () => (/* reexport safe */ _errors_ens_errors_js__WEBPACK_IMPORTED_MODULE_5__.ENSNetworkNotSyncedError),
/* harmony export */   ENSUnsupportedNetworkError: () => (/* reexport safe */ _errors_ens_errors_js__WEBPACK_IMPORTED_MODULE_5__.ENSUnsupportedNetworkError),
/* harmony export */   ERR_ABI_ENCODING: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_ABI_ENCODING),
/* harmony export */   ERR_CONN: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONN),
/* harmony export */   ERR_CONN_CLOSE: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONN_CLOSE),
/* harmony export */   ERR_CONN_INVALID: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONN_INVALID),
/* harmony export */   ERR_CONN_MAX_ATTEMPTS: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONN_MAX_ATTEMPTS),
/* harmony export */   ERR_CONN_NOT_OPEN: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONN_NOT_OPEN),
/* harmony export */   ERR_CONN_PENDING_REQUESTS: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONN_PENDING_REQUESTS),
/* harmony export */   ERR_CONN_TIMEOUT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONN_TIMEOUT),
/* harmony export */   ERR_CONTRACT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT),
/* harmony export */   ERR_CONTRACT_ABI_MISSING: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_ABI_MISSING),
/* harmony export */   ERR_CONTRACT_EVENT_NOT_EXISTS: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_EVENT_NOT_EXISTS),
/* harmony export */   ERR_CONTRACT_EXECUTION_REVERTED: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_EXECUTION_REVERTED),
/* harmony export */   ERR_CONTRACT_INSTANTIATION: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_INSTANTIATION),
/* harmony export */   ERR_CONTRACT_MISSING_ADDRESS: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_MISSING_ADDRESS),
/* harmony export */   ERR_CONTRACT_MISSING_DEPLOY_DATA: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_MISSING_DEPLOY_DATA),
/* harmony export */   ERR_CONTRACT_MISSING_FROM_ADDRESS: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_MISSING_FROM_ADDRESS),
/* harmony export */   ERR_CONTRACT_REQUIRED_CALLBACK: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_REQUIRED_CALLBACK),
/* harmony export */   ERR_CONTRACT_RESERVED_EVENT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_RESERVED_EVENT),
/* harmony export */   ERR_CONTRACT_RESOLVER_MISSING: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_RESOLVER_MISSING),
/* harmony export */   ERR_CONTRACT_TX_DATA_AND_INPUT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CONTRACT_TX_DATA_AND_INPUT),
/* harmony export */   ERR_CORE_CHAIN_MISMATCH: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CORE_CHAIN_MISMATCH),
/* harmony export */   ERR_CORE_HARDFORK_MISMATCH: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_CORE_HARDFORK_MISMATCH),
/* harmony export */   ERR_ENS_CHECK_INTERFACE_SUPPORT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_ENS_CHECK_INTERFACE_SUPPORT),
/* harmony export */   ERR_ENS_NETWORK_NOT_SYNCED: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_ENS_NETWORK_NOT_SYNCED),
/* harmony export */   ERR_ENS_UNSUPPORTED_NETWORK: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_ENS_UNSUPPORTED_NETWORK),
/* harmony export */   ERR_EXISTING_PLUGIN_NAMESPACE: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_EXISTING_PLUGIN_NAMESPACE),
/* harmony export */   ERR_FORMATTERS: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_FORMATTERS),
/* harmony export */   ERR_INVALID_ADDRESS: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_ADDRESS),
/* harmony export */   ERR_INVALID_BLOCK: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_BLOCK),
/* harmony export */   ERR_INVALID_BOOLEAN: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_BOOLEAN),
/* harmony export */   ERR_INVALID_BYTES: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_BYTES),
/* harmony export */   ERR_INVALID_CLIENT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_CLIENT),
/* harmony export */   ERR_INVALID_HEX: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_HEX),
/* harmony export */   ERR_INVALID_INTEGER: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_INTEGER),
/* harmony export */   ERR_INVALID_KEYSTORE: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_KEYSTORE),
/* harmony export */   ERR_INVALID_LARGE_VALUE: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_LARGE_VALUE),
/* harmony export */   ERR_INVALID_METHOD_PARAMS: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_METHOD_PARAMS),
/* harmony export */   ERR_INVALID_NIBBLE_WIDTH: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_NIBBLE_WIDTH),
/* harmony export */   ERR_INVALID_NUMBER: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_NUMBER),
/* harmony export */   ERR_INVALID_PASSWORD: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_PASSWORD),
/* harmony export */   ERR_INVALID_PRIVATE_KEY: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_PRIVATE_KEY),
/* harmony export */   ERR_INVALID_PROVIDER: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_PROVIDER),
/* harmony export */   ERR_INVALID_RESPONSE: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_RESPONSE),
/* harmony export */   ERR_INVALID_SIGNATURE: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_SIGNATURE),
/* harmony export */   ERR_INVALID_SIZE: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_SIZE),
/* harmony export */   ERR_INVALID_STRING: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_STRING),
/* harmony export */   ERR_INVALID_TYPE: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_TYPE),
/* harmony export */   ERR_INVALID_TYPE_ABI: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_TYPE_ABI),
/* harmony export */   ERR_INVALID_UNIT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_UNIT),
/* harmony export */   ERR_INVALID_UNSIGNED_INTEGER: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_INVALID_UNSIGNED_INTEGER),
/* harmony export */   ERR_IV_LENGTH: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_IV_LENGTH),
/* harmony export */   ERR_KEY_DERIVATION_FAIL: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_KEY_DERIVATION_FAIL),
/* harmony export */   ERR_KEY_VERSION_UNSUPPORTED: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_KEY_VERSION_UNSUPPORTED),
/* harmony export */   ERR_METHOD_NOT_IMPLEMENTED: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_METHOD_NOT_IMPLEMENTED),
/* harmony export */   ERR_MULTIPLE_ERRORS: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_MULTIPLE_ERRORS),
/* harmony export */   ERR_OPERATION_ABORT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_OPERATION_ABORT),
/* harmony export */   ERR_OPERATION_TIMEOUT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_OPERATION_TIMEOUT),
/* harmony export */   ERR_PARAM: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_PARAM),
/* harmony export */   ERR_PBKDF2_ITERATIONS: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_PBKDF2_ITERATIONS),
/* harmony export */   ERR_PRIVATE_KEY_LENGTH: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_PRIVATE_KEY_LENGTH),
/* harmony export */   ERR_PROVIDER: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_PROVIDER),
/* harmony export */   ERR_RAW_TX_UNDEFINED: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RAW_TX_UNDEFINED),
/* harmony export */   ERR_REQ_ALREADY_SENT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_REQ_ALREADY_SENT),
/* harmony export */   ERR_RESPONSE: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RESPONSE),
/* harmony export */   ERR_RPC_INTERNAL_ERROR: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_INTERNAL_ERROR),
/* harmony export */   ERR_RPC_INVALID_INPUT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_INVALID_INPUT),
/* harmony export */   ERR_RPC_INVALID_JSON: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_INVALID_JSON),
/* harmony export */   ERR_RPC_INVALID_METHOD: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_INVALID_METHOD),
/* harmony export */   ERR_RPC_INVALID_PARAMS: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_INVALID_PARAMS),
/* harmony export */   ERR_RPC_INVALID_REQUEST: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_INVALID_REQUEST),
/* harmony export */   ERR_RPC_LIMIT_EXCEEDED: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_LIMIT_EXCEEDED),
/* harmony export */   ERR_RPC_MISSING_RESOURCE: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_MISSING_RESOURCE),
/* harmony export */   ERR_RPC_NOT_SUPPORTED: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_NOT_SUPPORTED),
/* harmony export */   ERR_RPC_TRANSACTION_REJECTED: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_TRANSACTION_REJECTED),
/* harmony export */   ERR_RPC_UNAVAILABLE_RESOURCE: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_UNAVAILABLE_RESOURCE),
/* harmony export */   ERR_RPC_UNSUPPORTED_METHOD: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_RPC_UNSUPPORTED_METHOD),
/* harmony export */   ERR_SCHEMA_FORMAT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_SCHEMA_FORMAT),
/* harmony export */   ERR_SIGNATURE_FAILED: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_SIGNATURE_FAILED),
/* harmony export */   ERR_SUBSCRIPTION: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_SUBSCRIPTION),
/* harmony export */   ERR_TX: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX),
/* harmony export */   ERR_TX_BLOCK_TIMEOUT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_BLOCK_TIMEOUT),
/* harmony export */   ERR_TX_CHAIN_ID_MISMATCH: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_CHAIN_ID_MISMATCH),
/* harmony export */   ERR_TX_CHAIN_MISMATCH: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_CHAIN_MISMATCH),
/* harmony export */   ERR_TX_CONTRACT_NOT_STORED: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_CONTRACT_NOT_STORED),
/* harmony export */   ERR_TX_DATA_AND_INPUT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_DATA_AND_INPUT),
/* harmony export */   ERR_TX_GAS_MISMATCH: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_GAS_MISMATCH),
/* harmony export */   ERR_TX_GAS_MISMATCH_INNER_ERROR: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_GAS_MISMATCH_INNER_ERROR),
/* harmony export */   ERR_TX_HARDFORK_MISMATCH: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_HARDFORK_MISMATCH),
/* harmony export */   ERR_TX_INVALID_CALL: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_CALL),
/* harmony export */   ERR_TX_INVALID_CHAIN_INFO: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_CHAIN_INFO),
/* harmony export */   ERR_TX_INVALID_FEE_MARKET_GAS: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_FEE_MARKET_GAS),
/* harmony export */   ERR_TX_INVALID_FEE_MARKET_GAS_PRICE: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_FEE_MARKET_GAS_PRICE),
/* harmony export */   ERR_TX_INVALID_LEGACY_FEE_MARKET: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_LEGACY_FEE_MARKET),
/* harmony export */   ERR_TX_INVALID_LEGACY_GAS: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_LEGACY_GAS),
/* harmony export */   ERR_TX_INVALID_NONCE_OR_CHAIN_ID: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_NONCE_OR_CHAIN_ID),
/* harmony export */   ERR_TX_INVALID_OBJECT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_OBJECT),
/* harmony export */   ERR_TX_INVALID_PROPERTIES_FOR_TYPE: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_PROPERTIES_FOR_TYPE),
/* harmony export */   ERR_TX_INVALID_RECEIVER: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_RECEIVER),
/* harmony export */   ERR_TX_INVALID_SENDER: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_INVALID_SENDER),
/* harmony export */   ERR_TX_LOCAL_WALLET_NOT_AVAILABLE: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_LOCAL_WALLET_NOT_AVAILABLE),
/* harmony export */   ERR_TX_MISSING_CHAIN_INFO: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_MISSING_CHAIN_INFO),
/* harmony export */   ERR_TX_MISSING_CUSTOM_CHAIN: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_MISSING_CUSTOM_CHAIN),
/* harmony export */   ERR_TX_MISSING_CUSTOM_CHAIN_ID: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_MISSING_CUSTOM_CHAIN_ID),
/* harmony export */   ERR_TX_MISSING_GAS: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_MISSING_GAS),
/* harmony export */   ERR_TX_MISSING_GAS_INNER_ERROR: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_MISSING_GAS_INNER_ERROR),
/* harmony export */   ERR_TX_NOT_FOUND: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_NOT_FOUND),
/* harmony export */   ERR_TX_NO_CONTRACT_ADDRESS: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_NO_CONTRACT_ADDRESS),
/* harmony export */   ERR_TX_OUT_OF_GAS: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_OUT_OF_GAS),
/* harmony export */   ERR_TX_POLLING_TIMEOUT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_POLLING_TIMEOUT),
/* harmony export */   ERR_TX_RECEIPT_MISSING_BLOCK_NUMBER: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_RECEIPT_MISSING_BLOCK_NUMBER),
/* harmony export */   ERR_TX_RECEIPT_MISSING_OR_BLOCKHASH_NULL: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_RECEIPT_MISSING_OR_BLOCKHASH_NULL),
/* harmony export */   ERR_TX_REVERT_INSTRUCTION: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_REVERT_INSTRUCTION),
/* harmony export */   ERR_TX_REVERT_TRANSACTION: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_REVERT_TRANSACTION),
/* harmony export */   ERR_TX_REVERT_TRANSACTION_CUSTOM_ERROR: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_REVERT_TRANSACTION_CUSTOM_ERROR),
/* harmony export */   ERR_TX_REVERT_WITHOUT_REASON: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_REVERT_WITHOUT_REASON),
/* harmony export */   ERR_TX_SEND_TIMEOUT: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_SEND_TIMEOUT),
/* harmony export */   ERR_TX_SIGNING: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_SIGNING),
/* harmony export */   ERR_TX_UNABLE_TO_POPULATE_NONCE: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_UNABLE_TO_POPULATE_NONCE),
/* harmony export */   ERR_TX_UNSUPPORTED_EIP_1559: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_UNSUPPORTED_EIP_1559),
/* harmony export */   ERR_TX_UNSUPPORTED_TYPE: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_TX_UNSUPPORTED_TYPE),
/* harmony export */   ERR_UNSUPPORTED_KDF: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_UNSUPPORTED_KDF),
/* harmony export */   ERR_VALIDATION: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_VALIDATION),
/* harmony export */   ERR_WS_PROVIDER: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_WS_PROVIDER),
/* harmony export */   Eip1559GasPriceError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.Eip1559GasPriceError),
/* harmony export */   Eip1559NotSupportedError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.Eip1559NotSupportedError),
/* harmony export */   Eip838ExecutionError: () => (/* reexport safe */ _errors_contract_errors_js__WEBPACK_IMPORTED_MODULE_4__.Eip838ExecutionError),
/* harmony export */   ExistingPluginNamespaceError: () => (/* reexport safe */ _errors_generic_errors_js__WEBPACK_IMPORTED_MODULE_6__.ExistingPluginNamespaceError),
/* harmony export */   FormatterError: () => (/* reexport safe */ _errors_generic_errors_js__WEBPACK_IMPORTED_MODULE_6__.FormatterError),
/* harmony export */   GENESIS_BLOCK_NUMBER: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.GENESIS_BLOCK_NUMBER),
/* harmony export */   HardforkMismatchError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.HardforkMismatchError),
/* harmony export */   HexProcessingError: () => (/* reexport safe */ _errors_utils_errors_js__WEBPACK_IMPORTED_MODULE_10__.HexProcessingError),
/* harmony export */   IVLengthError: () => (/* reexport safe */ _errors_account_errors_js__WEBPACK_IMPORTED_MODULE_2__.IVLengthError),
/* harmony export */   InternalError: () => (/* reexport safe */ _errors_rpc_errors_js__WEBPACK_IMPORTED_MODULE_13__.InternalError),
/* harmony export */   InvalidAddressError: () => (/* reexport safe */ _errors_utils_errors_js__WEBPACK_IMPORTED_MODULE_10__.InvalidAddressError),
/* harmony export */   InvalidBlockError: () => (/* reexport safe */ _errors_utils_errors_js__WEBPACK_IMPORTED_MODULE_10__.InvalidBlockError),
/* harmony export */   InvalidBooleanError: () => (/* reexport safe */ _errors_utils_errors_js__WEBPACK_IMPORTED_MODULE_10__.InvalidBooleanError),
/* harmony export */   InvalidBytesError: () => (/* reexport safe */ _errors_utils_errors_js__WEBPACK_IMPORTED_MODULE_10__.InvalidBytesError),
/* harmony export */   InvalidClientError: () => (/* reexport safe */ _errors_provider_errors_js__WEBPACK_IMPORTED_MODULE_7__.InvalidClientError),
/* harmony export */   InvalidConnectionError: () => (/* reexport safe */ _errors_connection_errors_js__WEBPACK_IMPORTED_MODULE_3__.InvalidConnectionError),
/* harmony export */   InvalidGasOrGasPrice: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.InvalidGasOrGasPrice),
/* harmony export */   InvalidInputError: () => (/* reexport safe */ _errors_rpc_errors_js__WEBPACK_IMPORTED_MODULE_13__.InvalidInputError),
/* harmony export */   InvalidIntegerError: () => (/* reexport safe */ _errors_utils_errors_js__WEBPACK_IMPORTED_MODULE_10__.InvalidIntegerError),
/* harmony export */   InvalidKdfError: () => (/* reexport safe */ _errors_account_errors_js__WEBPACK_IMPORTED_MODULE_2__.InvalidKdfError),
/* harmony export */   InvalidLargeValueError: () => (/* reexport safe */ _errors_utils_errors_js__WEBPACK_IMPORTED_MODULE_10__.InvalidLargeValueError),
/* harmony export */   InvalidMaxPriorityFeePerGasOrMaxFeePerGas: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.InvalidMaxPriorityFeePerGasOrMaxFeePerGas),
/* harmony export */   InvalidMethodParamsError: () => (/* reexport safe */ _errors_generic_errors_js__WEBPACK_IMPORTED_MODULE_6__.InvalidMethodParamsError),
/* harmony export */   InvalidNonceOrChainIdError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.InvalidNonceOrChainIdError),
/* harmony export */   InvalidNumberError: () => (/* reexport safe */ _errors_utils_errors_js__WEBPACK_IMPORTED_MODULE_10__.InvalidNumberError),
/* harmony export */   InvalidNumberOfParamsError: () => (/* reexport safe */ _errors_generic_errors_js__WEBPACK_IMPORTED_MODULE_6__.InvalidNumberOfParamsError),
/* harmony export */   InvalidParamsError: () => (/* reexport safe */ _errors_rpc_errors_js__WEBPACK_IMPORTED_MODULE_13__.InvalidParamsError),
/* harmony export */   InvalidPasswordError: () => (/* reexport safe */ _errors_account_errors_js__WEBPACK_IMPORTED_MODULE_2__.InvalidPasswordError),
/* harmony export */   InvalidPrivateKeyError: () => (/* reexport safe */ _errors_account_errors_js__WEBPACK_IMPORTED_MODULE_2__.InvalidPrivateKeyError),
/* harmony export */   InvalidPropertiesForTransactionTypeError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.InvalidPropertiesForTransactionTypeError),
/* harmony export */   InvalidProviderError: () => (/* reexport safe */ _errors_provider_errors_js__WEBPACK_IMPORTED_MODULE_7__.InvalidProviderError),
/* harmony export */   InvalidRequestError: () => (/* reexport safe */ _errors_rpc_errors_js__WEBPACK_IMPORTED_MODULE_13__.InvalidRequestError),
/* harmony export */   InvalidResponseError: () => (/* reexport safe */ _errors_response_errors_js__WEBPACK_IMPORTED_MODULE_11__.InvalidResponseError),
/* harmony export */   InvalidSignatureError: () => (/* reexport safe */ _errors_account_errors_js__WEBPACK_IMPORTED_MODULE_2__.InvalidSignatureError),
/* harmony export */   InvalidSizeError: () => (/* reexport safe */ _errors_utils_errors_js__WEBPACK_IMPORTED_MODULE_10__.InvalidSizeError),
/* harmony export */   InvalidStringError: () => (/* reexport safe */ _errors_utils_errors_js__WEBPACK_IMPORTED_MODULE_10__.InvalidStringError),
/* harmony export */   InvalidTransactionCall: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.InvalidTransactionCall),
/* harmony export */   InvalidTransactionObjectError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.InvalidTransactionObjectError),
/* harmony export */   InvalidTransactionWithReceiver: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.InvalidTransactionWithReceiver),
/* harmony export */   InvalidTransactionWithSender: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.InvalidTransactionWithSender),
/* harmony export */   InvalidTypeAbiInputError: () => (/* reexport safe */ _errors_utils_errors_js__WEBPACK_IMPORTED_MODULE_10__.InvalidTypeAbiInputError),
/* harmony export */   InvalidTypeError: () => (/* reexport safe */ _errors_utils_errors_js__WEBPACK_IMPORTED_MODULE_10__.InvalidTypeError),
/* harmony export */   InvalidUnitError: () => (/* reexport safe */ _errors_utils_errors_js__WEBPACK_IMPORTED_MODULE_10__.InvalidUnitError),
/* harmony export */   InvalidUnsignedIntegerError: () => (/* reexport safe */ _errors_utils_errors_js__WEBPACK_IMPORTED_MODULE_10__.InvalidUnsignedIntegerError),
/* harmony export */   InvalidValueError: () => (/* reexport safe */ _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError),
/* harmony export */   JSONRPC_ERR_CHAIN_DISCONNECTED: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.JSONRPC_ERR_CHAIN_DISCONNECTED),
/* harmony export */   JSONRPC_ERR_DISCONNECTED: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.JSONRPC_ERR_DISCONNECTED),
/* harmony export */   JSONRPC_ERR_REJECTED_REQUEST: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.JSONRPC_ERR_REJECTED_REQUEST),
/* harmony export */   JSONRPC_ERR_UNAUTHORIZED: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.JSONRPC_ERR_UNAUTHORIZED),
/* harmony export */   JSONRPC_ERR_UNSUPPORTED_METHOD: () => (/* reexport safe */ _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.JSONRPC_ERR_UNSUPPORTED_METHOD),
/* harmony export */   KeyDerivationError: () => (/* reexport safe */ _errors_account_errors_js__WEBPACK_IMPORTED_MODULE_2__.KeyDerivationError),
/* harmony export */   KeyStoreVersionError: () => (/* reexport safe */ _errors_account_errors_js__WEBPACK_IMPORTED_MODULE_2__.KeyStoreVersionError),
/* harmony export */   LimitExceededError: () => (/* reexport safe */ _errors_rpc_errors_js__WEBPACK_IMPORTED_MODULE_13__.LimitExceededError),
/* harmony export */   LocalWalletNotAvailableError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.LocalWalletNotAvailableError),
/* harmony export */   MaxAttemptsReachedOnReconnectingError: () => (/* reexport safe */ _errors_connection_errors_js__WEBPACK_IMPORTED_MODULE_3__.MaxAttemptsReachedOnReconnectingError),
/* harmony export */   MethodNotFoundError: () => (/* reexport safe */ _errors_rpc_errors_js__WEBPACK_IMPORTED_MODULE_13__.MethodNotFoundError),
/* harmony export */   MethodNotImplementedError: () => (/* reexport safe */ _errors_generic_errors_js__WEBPACK_IMPORTED_MODULE_6__.MethodNotImplementedError),
/* harmony export */   MethodNotSupported: () => (/* reexport safe */ _errors_rpc_errors_js__WEBPACK_IMPORTED_MODULE_13__.MethodNotSupported),
/* harmony export */   MissingChainOrHardforkError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.MissingChainOrHardforkError),
/* harmony export */   MissingCustomChainError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.MissingCustomChainError),
/* harmony export */   MissingCustomChainIdError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.MissingCustomChainIdError),
/* harmony export */   MissingGasError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.MissingGasError),
/* harmony export */   MissingGasInnerError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.MissingGasInnerError),
/* harmony export */   MultipleErrors: () => (/* reexport safe */ _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__.MultipleErrors),
/* harmony export */   NibbleWidthError: () => (/* reexport safe */ _errors_utils_errors_js__WEBPACK_IMPORTED_MODULE_10__.NibbleWidthError),
/* harmony export */   NoContractAddressFoundError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.NoContractAddressFoundError),
/* harmony export */   OperationAbortError: () => (/* reexport safe */ _errors_generic_errors_js__WEBPACK_IMPORTED_MODULE_6__.OperationAbortError),
/* harmony export */   OperationTimeoutError: () => (/* reexport safe */ _errors_generic_errors_js__WEBPACK_IMPORTED_MODULE_6__.OperationTimeoutError),
/* harmony export */   PBKDF2IterationsError: () => (/* reexport safe */ _errors_account_errors_js__WEBPACK_IMPORTED_MODULE_2__.PBKDF2IterationsError),
/* harmony export */   ParseError: () => (/* reexport safe */ _errors_rpc_errors_js__WEBPACK_IMPORTED_MODULE_13__.ParseError),
/* harmony export */   PendingRequestsOnReconnectingError: () => (/* reexport safe */ _errors_connection_errors_js__WEBPACK_IMPORTED_MODULE_3__.PendingRequestsOnReconnectingError),
/* harmony export */   PrivateKeyLengthError: () => (/* reexport safe */ _errors_account_errors_js__WEBPACK_IMPORTED_MODULE_2__.PrivateKeyLengthError),
/* harmony export */   ProviderError: () => (/* reexport safe */ _errors_provider_errors_js__WEBPACK_IMPORTED_MODULE_7__.ProviderError),
/* harmony export */   RequestAlreadySentError: () => (/* reexport safe */ _errors_connection_errors_js__WEBPACK_IMPORTED_MODULE_3__.RequestAlreadySentError),
/* harmony export */   ResolverMethodMissingError: () => (/* reexport safe */ _errors_contract_errors_js__WEBPACK_IMPORTED_MODULE_4__.ResolverMethodMissingError),
/* harmony export */   ResourceUnavailableError: () => (/* reexport safe */ _errors_rpc_errors_js__WEBPACK_IMPORTED_MODULE_13__.ResourceUnavailableError),
/* harmony export */   ResourcesNotFoundError: () => (/* reexport safe */ _errors_rpc_errors_js__WEBPACK_IMPORTED_MODULE_13__.ResourcesNotFoundError),
/* harmony export */   ResponseError: () => (/* reexport safe */ _errors_response_errors_js__WEBPACK_IMPORTED_MODULE_11__.ResponseError),
/* harmony export */   RevertInstructionError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.RevertInstructionError),
/* harmony export */   RpcError: () => (/* reexport safe */ _errors_rpc_errors_js__WEBPACK_IMPORTED_MODULE_13__.RpcError),
/* harmony export */   RpcErrorMessages: () => (/* reexport safe */ _errors_rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_14__.RpcErrorMessages),
/* harmony export */   SchemaFormatError: () => (/* reexport safe */ _errors_schema_errors_js__WEBPACK_IMPORTED_MODULE_15__.SchemaFormatError),
/* harmony export */   SignatureError: () => (/* reexport safe */ _errors_signature_errors_js__WEBPACK_IMPORTED_MODULE_8__.SignatureError),
/* harmony export */   SubscriptionError: () => (/* reexport safe */ _errors_provider_errors_js__WEBPACK_IMPORTED_MODULE_7__.SubscriptionError),
/* harmony export */   TransactionBlockTimeoutError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.TransactionBlockTimeoutError),
/* harmony export */   TransactionDataAndInputError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.TransactionDataAndInputError),
/* harmony export */   TransactionError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.TransactionError),
/* harmony export */   TransactionGasMismatchError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.TransactionGasMismatchError),
/* harmony export */   TransactionGasMismatchInnerError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.TransactionGasMismatchInnerError),
/* harmony export */   TransactionMissingReceiptOrBlockHashError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.TransactionMissingReceiptOrBlockHashError),
/* harmony export */   TransactionNotFound: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.TransactionNotFound),
/* harmony export */   TransactionOutOfGasError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.TransactionOutOfGasError),
/* harmony export */   TransactionPollingTimeoutError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.TransactionPollingTimeoutError),
/* harmony export */   TransactionReceiptMissingBlockNumberError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.TransactionReceiptMissingBlockNumberError),
/* harmony export */   TransactionRejectedError: () => (/* reexport safe */ _errors_rpc_errors_js__WEBPACK_IMPORTED_MODULE_13__.TransactionRejectedError),
/* harmony export */   TransactionRevertInstructionError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.TransactionRevertInstructionError),
/* harmony export */   TransactionRevertWithCustomError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.TransactionRevertWithCustomError),
/* harmony export */   TransactionRevertedWithoutReasonError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.TransactionRevertedWithoutReasonError),
/* harmony export */   TransactionSendTimeoutError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.TransactionSendTimeoutError),
/* harmony export */   TransactionSigningError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.TransactionSigningError),
/* harmony export */   UnableToPopulateNonceError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.UnableToPopulateNonceError),
/* harmony export */   UndefinedRawTransactionError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.UndefinedRawTransactionError),
/* harmony export */   UnsupportedFeeMarketError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.UnsupportedFeeMarketError),
/* harmony export */   UnsupportedTransactionTypeError: () => (/* reexport safe */ _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__.UnsupportedTransactionTypeError),
/* harmony export */   VersionNotSupportedError: () => (/* reexport safe */ _errors_rpc_errors_js__WEBPACK_IMPORTED_MODULE_13__.VersionNotSupportedError),
/* harmony export */   Web3ContractError: () => (/* reexport safe */ _errors_contract_errors_js__WEBPACK_IMPORTED_MODULE_4__.Web3ContractError),
/* harmony export */   Web3WSProviderError: () => (/* reexport safe */ _errors_provider_errors_js__WEBPACK_IMPORTED_MODULE_7__.Web3WSProviderError),
/* harmony export */   genericRpcErrorMessageTemplate: () => (/* reexport safe */ _errors_rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_14__.genericRpcErrorMessageTemplate),
/* harmony export */   rpcErrorsMap: () => (/* reexport safe */ _errors_rpc_errors_js__WEBPACK_IMPORTED_MODULE_13__.rpcErrorsMap)
/* harmony export */ });
/* harmony import */ var _error_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error_codes.js */ "./node_modules/web3-errors/lib/esm/error_codes.js");
/* harmony import */ var _web3_error_base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./web3_error_base.js */ "./node_modules/web3-errors/lib/esm/web3_error_base.js");
/* harmony import */ var _errors_account_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors/account_errors.js */ "./node_modules/web3-errors/lib/esm/errors/account_errors.js");
/* harmony import */ var _errors_connection_errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errors/connection_errors.js */ "./node_modules/web3-errors/lib/esm/errors/connection_errors.js");
/* harmony import */ var _errors_contract_errors_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./errors/contract_errors.js */ "./node_modules/web3-errors/lib/esm/errors/contract_errors.js");
/* harmony import */ var _errors_ens_errors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./errors/ens_errors.js */ "./node_modules/web3-errors/lib/esm/errors/ens_errors.js");
/* harmony import */ var _errors_generic_errors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./errors/generic_errors.js */ "./node_modules/web3-errors/lib/esm/errors/generic_errors.js");
/* harmony import */ var _errors_provider_errors_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./errors/provider_errors.js */ "./node_modules/web3-errors/lib/esm/errors/provider_errors.js");
/* harmony import */ var _errors_signature_errors_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./errors/signature_errors.js */ "./node_modules/web3-errors/lib/esm/errors/signature_errors.js");
/* harmony import */ var _errors_transaction_errors_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./errors/transaction_errors.js */ "./node_modules/web3-errors/lib/esm/errors/transaction_errors.js");
/* harmony import */ var _errors_utils_errors_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./errors/utils_errors.js */ "./node_modules/web3-errors/lib/esm/errors/utils_errors.js");
/* harmony import */ var _errors_response_errors_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./errors/response_errors.js */ "./node_modules/web3-errors/lib/esm/errors/response_errors.js");
/* harmony import */ var _errors_core_errors_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./errors/core_errors.js */ "./node_modules/web3-errors/lib/esm/errors/core_errors.js");
/* harmony import */ var _errors_rpc_errors_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./errors/rpc_errors.js */ "./node_modules/web3-errors/lib/esm/errors/rpc_errors.js");
/* harmony import */ var _errors_rpc_error_messages_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./errors/rpc_error_messages.js */ "./node_modules/web3-errors/lib/esm/errors/rpc_error_messages.js");
/* harmony import */ var _errors_schema_errors_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./errors/schema_errors.js */ "./node_modules/web3-errors/lib/esm/errors/schema_errors.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
















//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/web3-errors/lib/esm/web3_error_base.js":
/*!*************************************************************!*\
  !*** ./node_modules/web3-errors/lib/esm/web3_error_base.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseWeb3Error: () => (/* binding */ BaseWeb3Error),
/* harmony export */   InvalidValueError: () => (/* binding */ InvalidValueError),
/* harmony export */   MultipleErrors: () => (/* binding */ MultipleErrors)
/* harmony export */ });
/* harmony import */ var _error_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error_codes.js */ "./node_modules/web3-errors/lib/esm/error_codes.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * Base class for Web3 errors.
 */
class BaseWeb3Error extends Error {
    /**
     * @deprecated Use the `cause` property instead.
     */
    get innerError() {
        // eslint-disable-next-line no-use-before-define
        if (this.cause instanceof MultipleErrors) {
            return this.cause.errors;
        }
        return this.cause;
    }
    /**
     * @deprecated Use the `cause` property instead.
     */
    set innerError(cause) {
        if (Array.isArray(cause)) {
            // eslint-disable-next-line no-use-before-define
            this.cause = new MultipleErrors(cause);
        }
        else {
            this.cause = cause;
        }
    }
    constructor(msg, cause) {
        super(msg);
        if (Array.isArray(cause)) {
            // eslint-disable-next-line no-use-before-define
            this.cause = new MultipleErrors(cause);
        }
        else {
            this.cause = cause;
        }
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(new.target.constructor);
        }
        else {
            this.stack = new Error().stack;
        }
    }
    static convertToString(value, unquotValue = false) {
        // Using "null" value intentionally for validation
        // eslint-disable-next-line no-null/no-null
        if (value === null || value === undefined)
            return 'undefined';
        const result = JSON.stringify(value, (_, v) => (typeof v === 'bigint' ? v.toString() : v));
        return unquotValue && ['bigint', 'string'].includes(typeof value)
            ? result.replace(/['\\"]+/g, '')
            : result;
    }
    toJSON() {
        return {
            name: this.name,
            code: this.code,
            message: this.message,
            cause: this.cause,
            // deprecated
            innerError: this.cause,
        };
    }
}
class MultipleErrors extends BaseWeb3Error {
    constructor(errors) {
        super(`Multiple errors occurred: [${errors.map(e => e.message).join('], [')}]`);
        this.code = _error_codes_js__WEBPACK_IMPORTED_MODULE_0__.ERR_MULTIPLE_ERRORS;
        this.errors = errors;
    }
}
class InvalidValueError extends BaseWeb3Error {
    constructor(value, msg) {
        super(`Invalid value given "${BaseWeb3Error.convertToString(value, true)}". Error: ${msg}.`);
        this.name = this.constructor.name;
    }
}
//# sourceMappingURL=web3_error_base.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/api/errors_api.js":
/*!*************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/api/errors_api.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   encodeErrorSignature: () => (/* binding */ encodeErrorSignature)
/* harmony export */ });
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-utils */ "./node_modules/web3-utils/lib/esm/index.js");
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/web3-eth-abi/lib/esm/utils.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 *
 *  @module ABI
 */



/**
 * Encodes the error name to its ABI signature, which are the sha3 hash of the error name including input types.
 */
const encodeErrorSignature = (functionName) => {
    if (typeof functionName !== 'string' && !(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isAbiErrorFragment)(functionName)) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_1__.AbiError('Invalid parameter value in encodeErrorSignature');
    }
    let name;
    if (functionName && (typeof functionName === 'function' || typeof functionName === 'object')) {
        name = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.jsonInterfaceMethodToString)(functionName);
    }
    else {
        name = functionName;
    }
    return (0,web3_utils__WEBPACK_IMPORTED_MODULE_0__.sha3Raw)(name);
};
//# sourceMappingURL=errors_api.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/api/events_api.js":
/*!*************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/api/events_api.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   encodeEventSignature: () => (/* binding */ encodeEventSignature)
/* harmony export */ });
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-utils */ "./node_modules/web3-utils/lib/esm/index.js");
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/web3-eth-abi/lib/esm/utils.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 *
 *  @module ABI
 */



/**
 * Encodes the event name to its ABI signature, which are the sha3 hash of the event name including input types.
 * @param functionName - The event name to encode, or the {@link AbiEventFragment} object of the event. If string, it has to be in the form of `eventName(param1Type,param2Type,...)`. eg: myEvent(uint256,bytes32).
 * @returns - The ABI signature of the event.
 *
 * @example
 * ```ts
 * const event = web3.eth.abi.encodeEventSignature({
 *   name: "myEvent",
 *   type: "event",
 *   inputs: [
 *     {
 *       type: "uint256",
 *       name: "myNumber",
 *     },
 *     {
 *       type: "bytes32",
 *       name: "myBytes",
 *     },
 *   ],
 * });
 * console.log(event);
 * > 0xf2eeb729e636a8cb783be044acf6b7b1e2c5863735b60d6daae84c366ee87d97
 *
 *  const event = web3.eth.abi.encodeEventSignature({
 *   inputs: [
 *     {
 *       indexed: true,
 *       name: "from",
 *       type: "address",
 *     },
 *     {
 *       indexed: true,
 *       name: "to",
 *       type: "address",
 *     },
 *     {
 *       indexed: false,
 *       name: "value",
 *       type: "uint256",
 *     },
 *   ],
 *   name: "Transfer",
 *   type: "event",
 * });
 * console.log(event);
 * > 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
 * ```
 */
const encodeEventSignature = (functionName) => {
    if (typeof functionName !== 'string' && !(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isAbiEventFragment)(functionName)) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_1__.AbiError('Invalid parameter value in encodeEventSignature');
    }
    let name;
    if (functionName && (typeof functionName === 'function' || typeof functionName === 'object')) {
        name = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.jsonInterfaceMethodToString)(functionName);
    }
    else {
        name = functionName;
    }
    return (0,web3_utils__WEBPACK_IMPORTED_MODULE_0__.sha3Raw)(name);
};
//# sourceMappingURL=events_api.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/api/functions_api.js":
/*!****************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/api/functions_api.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeFunctionCall: () => (/* binding */ decodeFunctionCall),
/* harmony export */   decodeFunctionReturn: () => (/* binding */ decodeFunctionReturn),
/* harmony export */   encodeFunctionCall: () => (/* binding */ encodeFunctionCall),
/* harmony export */   encodeFunctionSignature: () => (/* binding */ encodeFunctionSignature)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-utils */ "./node_modules/web3-utils/lib/esm/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/web3-eth-abi/lib/esm/utils.js");
/* harmony import */ var _parameters_api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parameters_api.js */ "./node_modules/web3-eth-abi/lib/esm/api/parameters_api.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 *
 *  @module ABI
 */




/**
 * Encodes the function name to its ABI representation, which are the first 4 bytes of the sha3 of the function name including  types.
 * The JSON interface spec documentation https://docs.soliditylang.org/en/latest/abi-spec.html#json
 * @param functionName - The function name to encode or the `JSON interface` object of the function.
 * If the passed parameter is a string, it has to be in the form of `functionName(param1Type,param2Type,...)`. eg: myFunction(uint256,uint32[],bytes10,bytes)
 * @returns - The ABI signature of the function.
 * @example
 * ```ts
 * const signature = web3.eth.abi.encodeFunctionSignature({
 *   name: "myMethod",
 *   type: "function",
 *   inputs: [
 *     {
 *       type: "uint256",
 *       name: "myNumber",
 *     },
 *     {
 *       type: "string",
 *       name: "myString",
 *     },
 *   ],
 * });
 * console.log(signature);
 * > 0x24ee0097
 *
 * const signature = web3.eth.abi.encodeFunctionSignature('myMethod(uint256,string)')
 * console.log(signature);
 * > 0x24ee0097
 *
 * const signature = web3.eth.abi.encodeFunctionSignature('safeTransferFrom(address,address,uint256,bytes)');
 * console.log(signature);
 * > 0xb88d4fde
 * ```
 */
const encodeFunctionSignature = (functionName) => {
    if (typeof functionName !== 'string' && !(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isAbiFunctionFragment)(functionName)) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('Invalid parameter value in encodeFunctionSignature');
    }
    let name;
    if (functionName && (typeof functionName === 'function' || typeof functionName === 'object')) {
        name = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.jsonInterfaceMethodToString)(functionName);
    }
    else {
        name = functionName;
    }
    return (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.sha3Raw)(name).slice(0, 10);
};
/**
 * Encodes a function call using its `JSON interface` object and given parameters.
 * The JSON interface spec documentation https://docs.soliditylang.org/en/latest/abi-spec.html#json
 * @param jsonInterface - The `JSON interface` object of the function.
 * @param params - The parameters to encode
 * @returns - The ABI encoded function call, which, means the function signature and the parameters passed.
 * @example
 * ```ts
 * const sig = web3.eth.abi.encodeFunctionCall(
 *   {
 *     name: "myMethod",
 *     type: "function",
 *     inputs: [
 *       {
 *         type: "uint256",
 *         name: "myNumber",
 *       },
 *       {
 *         type: "string",
 *         name: "myString",
 *       },
 *     ],
 *   },
 *   ["2345675643", "Hello!%"]
 * );
 * console.log(sig);
 * > 0x24ee0097000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000
 *
 *
 *
 * const sig = web3.eth.abi.encodeFunctionCall(
 *   {
 *     inputs: [
 *       {
 *         name: "account",
 *         type: "address",
 *       },
 *     ],
 *     name: "balanceOf",
 *     outputs: [
 *       {
 *         name: "",
 *         type: "uint256",
 *       },
 *     ],
 *     stateMutability: "view",
 *     type: "function",
 *   },
 *   ["0x1234567890123456789012345678901234567890"]
 * );
 *
 * console.log(sig);
 * > 0x70a082310000000000000000000000001234567890123456789012345678901234567890
 * ```
 */
const encodeFunctionCall = (jsonInterface, params) => {
    var _a;
    if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isAbiFunctionFragment)(jsonInterface)) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('Invalid parameter value in encodeFunctionCall');
    }
    return `${encodeFunctionSignature(jsonInterface)}${(0,_parameters_api_js__WEBPACK_IMPORTED_MODULE_3__.encodeParameters)((_a = jsonInterface.inputs) !== null && _a !== void 0 ? _a : [], params !== null && params !== void 0 ? params : []).replace('0x', '')}`;
};
/**
 * Decodes a function call data using its `JSON interface` object.
 * The JSON interface spec documentation https://docs.soliditylang.org/en/latest/abi-spec.html#json
 * @param functionsAbi - The `JSON interface` object of the function.
 * @param data - The data to decode
 * @param methodSignatureProvided - (Optional) if `false` do not remove the first 4 bytes that would rather contain the function signature.
 * @returns - The data decoded according to the passed ABI.
 * @example
 * ```ts
 * const data =
 * 	'0xa413686200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000548656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010416e6f74686572204772656574696e6700000000000000000000000000000000';
 * const params = decodeFunctionCall(
 * 	{
 * 		inputs: [
 * 			{ internalType: 'string', name: '_greeting', type: 'string' },
 * 			{ internalType: 'string', name: '_second_greeting', type: 'string' },
 * 		],
 * 		name: 'setGreeting',
 * 		outputs: [
 * 			{ internalType: 'bool', name: '', type: 'bool' },
 * 			{ internalType: 'string', name: '', type: 'string' },
 * 		],
 * 		stateMutability: 'nonpayable',
 * 		type: 'function',
 * 	},
 * 	data,
 * );

 * console.log(params);
 * > {
 * > 	'0': 'Hello',
 * > 	'1': 'Another Greeting',
 * > 	__length__: 2,
 * > 	__method__: 'setGreeting(string,string)',
 * > 	_greeting: 'Hello',
 * > 	_second_greeting: 'Another Greeting',
 * > }
 * ```
 */
const decodeFunctionCall = (functionsAbi, data, methodSignatureProvided = true) => {
    const value = methodSignatureProvided && data && data.length >= 10 && data.startsWith('0x')
        ? data.slice(10)
        : data;
    if (!functionsAbi.inputs) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.Web3ContractError('No inputs found in the ABI');
    }
    const result = (0,_parameters_api_js__WEBPACK_IMPORTED_MODULE_3__.decodeParameters)([...functionsAbi.inputs], value);
    return Object.assign(Object.assign({}, result), { __method__: (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.jsonInterfaceMethodToString)(functionsAbi) });
};
/**
 * Decodes a function call data using its `JSON interface` object.
 * The JSON interface spec documentation https://docs.soliditylang.org/en/latest/abi-spec.html#json
 * @returns - The ABI encoded function call, which, means the function signature and the parameters passed.
 * @param functionsAbi - The `JSON interface` object of the function.
 * @param returnValues - The data (the function-returned-values) to decoded
 * @returns - The function-returned-values decoded according to the passed ABI. If there are multiple values, it returns them as an object as the example below. But if it is a single value, it returns it only for simplicity.
 * @example
 * ```ts
 * // decode a multi-value data of a method
 * const data =
 * 	'0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000548656c6c6f000000000000000000000000000000000000000000000000000000';
 * const decodedResult = decodeFunctionReturn(
 * 	{
 * 		inputs: [
 * 			{ internalType: 'string', name: '_greeting', type: 'string' }
 * 		],
 * 		name: 'setGreeting',
 * 		outputs: [
 * 			{ internalType: 'string', name: '', type: 'string' },
 * 			{ internalType: 'bool', name: '', type: 'bool' },
 * 		],
 * 		stateMutability: 'nonpayable',
 * 		type: 'function',
 * 	},
 * 	data,
 * );

 * console.log(decodedResult);
 * > { '0': 'Hello', '1': true, __length__: 2 }
 *
 *
 * // decode a single-value data of a method
 * const data =
 * 	'0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000548656c6c6f000000000000000000000000000000000000000000000000000000';
 * const decodedResult = decodeFunctionReturn(
 * 	{
 * 		inputs: [
 * 			{ internalType: 'string', name: '_greeting', type: 'string' }
 * 		],
 * 		name: 'setGreeting',
 * 		outputs: [{ internalType: 'string', name: '', type: 'string' }],
 * 		stateMutability: 'nonpayable',
 * 		type: 'function',
 * 	},
 * 	data,
 * );

 * console.log(decodedResult);
 * > 'Hello'
 * ```
 */
const decodeFunctionReturn = (functionsAbi, returnValues) => {
    // If it is a constructor there is nothing to decode!
    if (functionsAbi.type === 'constructor') {
        return returnValues;
    }
    if (!returnValues) {
        // Using "null" value intentionally to match legacy behavior
        // eslint-disable-next-line no-null/no-null
        return null;
    }
    const value = returnValues.length >= 2 ? returnValues.slice(2) : returnValues;
    if (!functionsAbi.outputs) {
        // eslint-disable-next-line no-null/no-null
        return null;
    }
    const result = (0,_parameters_api_js__WEBPACK_IMPORTED_MODULE_3__.decodeParameters)([...functionsAbi.outputs], value);
    if (result.__length__ === 1) {
        return result[0];
    }
    return result;
};
//# sourceMappingURL=functions_api.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/api/logs_api.js":
/*!***********************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/api/logs_api.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeLog: () => (/* binding */ decodeLog)
/* harmony export */ });
/* harmony import */ var _parameters_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parameters_api.js */ "./node_modules/web3-eth-abi/lib/esm/api/parameters_api.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

const STATIC_TYPES = ['bool', 'string', 'int', 'uint', 'address', 'fixed', 'ufixed'];
const _decodeParameter = (inputType, clonedTopic) => inputType === 'string' ? clonedTopic : (0,_parameters_api_js__WEBPACK_IMPORTED_MODULE_0__.decodeParameter)(inputType, clonedTopic);
/**
 * Decodes ABI-encoded log data and indexed topic data.
 * @param inputs - A {@link AbiParameter} input array. See the [Solidity documentation](https://docs.soliditylang.org/en/develop/types.html) for a list of types.
 * @param data - The ABI byte code in the `data` field of a log.
 * @param topics - An array with the index parameter topics of the log, without the topic[0] if its a non-anonymous event, otherwise with topic[0]
 * @returns - The result object containing the decoded parameters.
 *
 * @example
 * ```ts
 * let res = web3.eth.abi.decodeLog(
 *    [
 *      {
 *        type: "string",
 *        name: "myString",
 *      },
 *      {
 *        type: "uint256",
 *        name: "myNumber",
 *        indexed: true,
 *      },
 *      {
 *        type: "uint8",
 *        name: "mySmallNumber",
 *        indexed: true,
 *      },
 *    ],
 *    "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000748656c6c6f252100000000000000000000000000000000000000000000000000",
 *    [
 *      "0x000000000000000000000000000000000000000000000000000000000000f310",
 *      "0x0000000000000000000000000000000000000000000000000000000000000010",
 *    ]
 *  );
 * > {
 *  '0': 'Hello%!',
 *  '1': 62224n,
 *  '2': 16n,
 *  __length__: 3,
 *  myString: 'Hello%!',
 *  myNumber: 62224n,
 *  mySmallNumber: 16n
 * }
 * ```
 */
const decodeLog = (inputs, data, topics) => {
    const clonedTopics = Array.isArray(topics) ? topics : [topics];
    const indexedInputs = {};
    const nonIndexedInputs = {};
    for (const [i, input] of inputs.entries()) {
        if (input.indexed) {
            indexedInputs[i] = input;
        }
        else {
            nonIndexedInputs[i] = input;
        }
    }
    const decodedNonIndexedInputs = data
        ? (0,_parameters_api_js__WEBPACK_IMPORTED_MODULE_0__.decodeParametersWith)(Object.values(nonIndexedInputs), data, true)
        : { __length__: 0 };
    // If topics are more than indexed inputs, that means first topic is the event signature
    const offset = clonedTopics.length - Object.keys(indexedInputs).length;
    const decodedIndexedInputs = Object.values(indexedInputs).map((input, index) => STATIC_TYPES.some(s => input.type.startsWith(s))
        ? _decodeParameter(input.type, clonedTopics[index + offset])
        : clonedTopics[index + offset]);
    const returnValues = { __length__: 0 };
    let indexedCounter = 0;
    let nonIndexedCounter = 0;
    for (const [i, res] of inputs.entries()) {
        returnValues[i] = res.type === 'string' ? '' : undefined;
        if (indexedInputs[i]) {
            returnValues[i] = decodedIndexedInputs[indexedCounter];
            indexedCounter += 1;
        }
        if (nonIndexedInputs[i]) {
            returnValues[i] = decodedNonIndexedInputs[String(nonIndexedCounter)];
            nonIndexedCounter += 1;
        }
        if (res.name) {
            returnValues[res.name] = returnValues[i];
        }
        returnValues.__length__ += 1;
    }
    return returnValues;
};
//# sourceMappingURL=logs_api.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/api/parameters_api.js":
/*!*****************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/api/parameters_api.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeParameter: () => (/* binding */ decodeParameter),
/* harmony export */   decodeParameters: () => (/* binding */ decodeParameters),
/* harmony export */   decodeParametersWith: () => (/* binding */ decodeParametersWith),
/* harmony export */   encodeParameter: () => (/* binding */ encodeParameter),
/* harmony export */   encodeParameters: () => (/* reexport safe */ _coders_encode_js__WEBPACK_IMPORTED_MODULE_2__.encodeParameters),
/* harmony export */   inferTypesAndEncodeParameters: () => (/* reexport safe */ _coders_encode_js__WEBPACK_IMPORTED_MODULE_2__.inferTypesAndEncodeParameters)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var _coders_decode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../coders/decode.js */ "./node_modules/web3-eth-abi/lib/esm/coders/decode.js");
/* harmony import */ var _coders_encode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../coders/encode.js */ "./node_modules/web3-eth-abi/lib/esm/coders/encode.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 *
 *  @module ABI
 */




/**
 * Encodes a parameter based on its type to its ABI representation.
 * @param abi -  The type of the parameter. See the [Solidity documentation](https://docs.soliditylang.org/en/develop/types.html) for a list of types.
 * @param param - The actual parameter to encode.
 * @returns -  The ABI encoded parameter
 * @example
 * ```ts
 *  const res = web3.eth.abi.encodeParameter("uint256", "2345675643");
 *  console.log(res);
 *  0x000000000000000000000000000000000000000000000000000000008bd02b7b
 *
 *  const res = web3.eth.abi.encodeParameter("uint", "2345675643");
 *
 *  console.log(res);
 *  >0x000000000000000000000000000000000000000000000000000000008bd02b7b
 *
 *    const res = web3.eth.abi.encodeParameter("bytes32", "0xdf3234");
 *
 *  console.log(res);
 *  >0xdf32340000000000000000000000000000000000000000000000000000000000
 *
 *   const res = web3.eth.abi.encodeParameter("bytes", "0xdf3234");
 *
 *  console.log(res);
 *  > 0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003df32340000000000000000000000000000000000000000000000000000000000
 *
 *   const res = web3.eth.abi.encodeParameter("bytes32[]", ["0xdf3234", "0xfdfd"]);
 *
 *  console.log(res);
 *  > 0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002df32340000000000000000000000000000000000000000000000000000000000fdfd000000000000000000000000000000000000000000000000000000000000
 *
 *  const res = web3.eth.abi.encodeParameter(
 *    {
 *      ParentStruct: {
 *        propertyOne: "uint256",
 *        propertyTwo: "uint256",
 *        childStruct: {
 *          propertyOne: "uint256",
 *          propertyTwo: "uint256",
 *        },
 *      },
 *    },
 *    {
 *      propertyOne: 42,
 *      propertyTwo: 56,
 *      childStruct: {
 *        propertyOne: 45,
 *        propertyTwo: 78,
 *      },
 *    }
 *  );
 *
 *  console.log(res);
 *  > 0x000000000000000000000000000000000000000000000000000000000000002a0000000000000000000000000000000000000000000000000000000000000038000000000000000000000000000000000000000000000000000000000000002d000000000000000000000000000000000000000000000000000000000000004e
 * ```
 */
const encodeParameter = (abi, param) => (0,_coders_encode_js__WEBPACK_IMPORTED_MODULE_2__.encodeParameters)([abi], [param]);
/**
 * Should be used to decode list of params
 */
const decodeParametersWith = (abis, bytes, loose) => {
    try {
        if (abis.length > 0 && (!bytes || bytes === '0x' || bytes === '0X')) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError("Returned values aren't valid, did it run Out of Gas? " +
                'You might also see this error if you are not using the ' +
                'correct ABI for the contract you are retrieving data from, ' +
                'requesting data from a block number that does not exist, ' +
                'or querying a node which is not fully synced.');
        }
        return (0,_coders_decode_js__WEBPACK_IMPORTED_MODULE_1__.decodeParameters)(abis, `0x${bytes.replace(/0x/i, '')}`, loose);
    }
    catch (err) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError(`Parameter decoding error: ${err.message}`, {
            internalErr: err,
        });
    }
};
/**
 * Should be used to decode list of params
 */
/**
 * Decodes ABI encoded parameters to its JavaScript types.
 * @param abi -  An array of {@link AbiInput}. See the [Solidity documentation](https://docs.soliditylang.org/en/develop/types.html) for a list of types.
 * @param bytes - The ABI byte code to decode
 * @returns - The result object containing the decoded parameters.
 * @example
 * ```ts
 * let res = web3.eth.abi.decodeParameters(
 *    ["string", "uint256"],
 *    "0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000"
 *  );
 *  console.log(res);
 *  > { '0': 'Hello!%!', '1': 234n, __length__: 2 }
 *
 * let res = web3.eth.abi.decodeParameters(
 *    [
 *      {
 *        type: "string",
 *        name: "myString",
 *      },
 *      {
 *        type: "uint256",
 *        name: "myNumber",
 *      },
 *    ],
 *    "0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000"
 *  );
 * console.log(res);
 *  > {
 *  '0': 'Hello!%!',
 *  '1': 234n,
 *  __length__: 2,
 *  myString: 'Hello!%!',
 *  myNumber: 234n
 * }
 *
 * const res = web3.eth.abi.decodeParameters(
 *    [
 *      "uint8[]",
 *      {
 *        ParentStruct: {
 *          propertyOne: "uint256",
 *          propertyTwo: "uint256",
 *          childStruct: {
 *            propertyOne: "uint256",
 *            propertyTwo: "uint256",
 *          },
 *        },
 *      },
 *    ],
 *    "0x00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000002a0000000000000000000000000000000000000000000000000000000000000038000000000000000000000000000000000000000000000000000000000000002d000000000000000000000000000000000000000000000000000000000000004e0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002a0000000000000000000000000000000000000000000000000000000000000018"
 *  );
 *  console.log(res);
 *  >
 *  '0': [ 42n, 24n ],
 *  '1': {
 *    '0': 42n,
 *    '1': 56n,
 *    '2': {
 *      '0': 45n,
 *      '1': 78n,
 *      __length__: 2,
 *      propertyOne: 45n,
 *      propertyTwo: 78n
 *    },
 *    __length__: 3,
 *    propertyOne: 42n,
 *    propertyTwo: 56n,
 *    childStruct: {
 *      '0': 45n,
 *      '1': 78n,
 *      __length__: 2,
 *      propertyOne: 45n,
 *      propertyTwo: 78n
 *    }
 *  },
 *  __length__: 2,
 *  ParentStruct: {
 *    '0': 42n,
 *    '1': 56n,
 *    '2': {
 *      '0': 45n,
 *      '1': 78n,
 *      __length__: 2,
 *      propertyOne: 45n,
 *      propertyTwo: 78n
 *    },
 *    __length__: 3,
 *    propertyOne: 42n,
 *    propertyTwo: 56n,
 *    childStruct: {
 *      '0': 45n,
 *      '1': 78n,
 *      __length__: 2,
 *      propertyOne: 45n,
 *      propertyTwo: 78n
 *    }
 *  }
 *}
 * ```
 */
const decodeParameters = (abi, bytes) => decodeParametersWith(abi, bytes, false);
/**
 * Should be used to decode bytes to plain param
 */
/**
 * Decodes an ABI encoded parameter to its JavaScript type.
 * @param abi -  The type of the parameter. See the [Solidity documentation](https://docs.soliditylang.org/en/develop/types.html) for a list of types.
 * @param bytes - The ABI byte code to decode
 * @returns - The decoded parameter
 * @example
 * ```ts
 *   const res = web3.eth.abi.decodeParameter(
 *    "uint256",
 *    "0x0000000000000000000000000000000000000000000000000000000000000010"
 *  );
 *  console.log(res);
 * > 16n
 *
 *  const res = web3.eth.abi.decodeParameter(
 *    "string",
 *    "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000"
 *  );
 *
 *  console.log(res);
 *  > Hello!%!
 *
 *  const res = web3.eth.abi.decodeParameter(
 *    {
 *      ParentStruct: {
 *        propertyOne: "uint256",
 *        propertyTwo: "uint256",
 *        childStruct: {
 *          propertyOne: "uint256",
 *          propertyTwo: "uint256",
 *        },
 *      },
 *    },
 *    "0x000000000000000000000000000000000000000000000000000000000000002a0000000000000000000000000000000000000000000000000000000000000038000000000000000000000000000000000000000000000000000000000000002d000000000000000000000000000000000000000000000000000000000000004e"
 *  );
 *
 *  console.log(res);
 *   {
 *  '0': 42n,
 *  '1': 56n,
 *  '2': {
 *    '0': 45n,
 *    '1': 78n,
 *    __length__: 2,
 *    propertyOne: 45n,
 *    propertyTwo: 78n
 *  },
 *  __length__: 3,
 *  propertyOne: 42n,
 *  propertyTwo: 56n,
 *  childStruct: {
 *    '0': 45n,
 *    '1': 78n,
 *    __length__: 2,
 *    propertyOne: 45n,
 *    propertyTwo: 78n
 *  }
 *}
 * ```
 */
const decodeParameter = (abi, bytes) => decodeParameters([abi], bytes)['0'];
//# sourceMappingURL=parameters_api.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/coders/base/address.js":
/*!******************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/coders/base/address.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeAddress: () => (/* binding */ decodeAddress),
/* harmony export */   encodeAddress: () => (/* binding */ encodeAddress)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-utils */ "./node_modules/web3-utils/lib/esm/index.js");
/* harmony import */ var web3_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! web3-validator */ "./node_modules/web3-validator/lib/esm/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils.js */ "./node_modules/web3-eth-abi/lib/esm/coders/utils.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/




const ADDRESS_BYTES_COUNT = 20;
const ADDRESS_OFFSET = _utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE - ADDRESS_BYTES_COUNT;
function encodeAddress(param, input) {
    if (typeof input !== 'string') {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('address type expects string as input type', {
            value: input,
            name: param.name,
            type: param.type,
        });
    }
    let address = input.toLowerCase();
    if (!address.startsWith('0x')) {
        address = `0x${address}`;
    }
    if (!(0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isAddress)(address)) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('provided input is not valid address', {
            value: input,
            name: param.name,
            type: param.type,
        });
    }
    // for better performance, we could convert hex to destination bytes directly (encoded var)
    const addressBytes = web3_validator__WEBPACK_IMPORTED_MODULE_2__.utils.hexToUint8Array(address);
    // expand address to WORD_SIZE
    const encoded = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.alloc)(_utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE);
    encoded.set(addressBytes, ADDRESS_OFFSET);
    return {
        dynamic: false,
        encoded,
    };
}
function decodeAddress(_param, bytes) {
    const addressBytes = bytes.subarray(ADDRESS_OFFSET, _utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE);
    if (addressBytes.length !== ADDRESS_BYTES_COUNT) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('Invalid decoding input, not enough bytes to decode address', { bytes });
    }
    const result = web3_validator__WEBPACK_IMPORTED_MODULE_2__.utils.uint8ArrayToHexString(addressBytes);
    // should we check is decoded value is valid address?
    // if(!isAddress(result)) {
    //     throw new AbiError("encoded data is not valid address", {
    //         address: result,
    //     });
    // }
    return {
        result: (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.toChecksumAddress)(result),
        encoded: bytes.subarray(_utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE),
        consumed: _utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE,
    };
}
//# sourceMappingURL=address.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/coders/base/array.js":
/*!****************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/coders/base/array.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeArray: () => (/* binding */ decodeArray),
/* harmony export */   encodeArray: () => (/* binding */ encodeArray)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-utils */ "./node_modules/web3-utils/lib/esm/index.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils.js */ "./node_modules/web3-eth-abi/lib/esm/coders/utils.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./number.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/number.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/utils.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/


// eslint-disable-next-line import/no-cycle




function encodeArray(param, values) {
    if (!Array.isArray(values)) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('Expected value to be array', { abi: param, values });
    }
    const { size, param: arrayItemParam } = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.extractArrayType)(param);
    const encodedParams = values.map(v => (0,_index_js__WEBPACK_IMPORTED_MODULE_2__.encodeParamFromAbiParameter)(arrayItemParam, v));
    const dynamic = size === -1;
    const dynamicItems = encodedParams.length > 0 && encodedParams[0].dynamic;
    if (!dynamic && values.length !== size) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError("Given arguments count doesn't match array length", {
            arrayLength: size,
            argumentsLength: values.length,
        });
    }
    if (dynamic || dynamicItems) {
        const encodingResult = (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.encodeDynamicParams)(encodedParams);
        if (dynamic) {
            const encodedLength = (0,_index_js__WEBPACK_IMPORTED_MODULE_2__.encodeNumber)({ type: 'uint256', name: '' }, encodedParams.length).encoded;
            return {
                dynamic: true,
                encoded: encodedParams.length > 0
                    ? (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.uint8ArrayConcat)(encodedLength, encodingResult)
                    : encodedLength,
            };
        }
        return {
            dynamic: true,
            encoded: encodingResult,
        };
    }
    return {
        dynamic: false,
        encoded: (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.uint8ArrayConcat)(...encodedParams.map(p => p.encoded)),
    };
}
function decodeArray(param, bytes) {
    // eslint-disable-next-line prefer-const
    let { size, param: arrayItemParam } = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.extractArrayType)(param);
    const dynamic = size === -1;
    let consumed = 0;
    const result = [];
    let remaining = bytes;
    // dynamic array, we need to decode length
    if (dynamic) {
        const lengthResult = (0,_number_js__WEBPACK_IMPORTED_MODULE_4__.decodeNumber)({ type: 'uint32', name: '' }, bytes);
        size = Number(lengthResult.result);
        consumed = lengthResult.consumed;
        remaining = lengthResult.encoded;
    }
    const hasDynamicChild = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isDynamic)(arrayItemParam);
    if (hasDynamicChild) {
        // known length but dynamic child, each child is actually head element with encoded offset
        for (let i = 0; i < size; i += 1) {
            const offsetResult = (0,_number_js__WEBPACK_IMPORTED_MODULE_4__.decodeNumber)({ type: 'uint32', name: '' }, remaining.subarray(i * _utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE));
            consumed += offsetResult.consumed;
            const decodedChildResult = (0,_index_js__WEBPACK_IMPORTED_MODULE_2__.decodeParamFromAbiParameter)(arrayItemParam, remaining.subarray(Number(offsetResult.result)));
            consumed += decodedChildResult.consumed;
            result.push(decodedChildResult.result);
        }
        return {
            result,
            encoded: remaining.subarray(consumed),
            consumed,
        };
    }
    for (let i = 0; i < size; i += 1) {
        // decode static params
        const decodedChildResult = (0,_index_js__WEBPACK_IMPORTED_MODULE_2__.decodeParamFromAbiParameter)(arrayItemParam, bytes.subarray(consumed));
        consumed += decodedChildResult.consumed;
        result.push(decodedChildResult.result);
    }
    return {
        result,
        encoded: bytes.subarray(consumed),
        consumed,
    };
}
//# sourceMappingURL=array.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/coders/base/bool.js":
/*!***************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/coders/base/bool.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeBool: () => (/* binding */ decodeBool),
/* harmony export */   encodeBoolean: () => (/* binding */ encodeBoolean)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-utils */ "./node_modules/web3-utils/lib/esm/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/web3-eth-abi/lib/esm/coders/utils.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./number.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/number.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/




function encodeBoolean(param, input) {
    let value;
    try {
        value = (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.toBool)(input);
    }
    catch (e) {
        if (e instanceof web3_errors__WEBPACK_IMPORTED_MODULE_0__.InvalidBooleanError) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('provided input is not valid boolean value', {
                type: param.type,
                value: input,
                name: param.name,
            });
        }
    }
    return (0,_number_js__WEBPACK_IMPORTED_MODULE_3__.encodeNumber)({ type: 'uint8', name: '' }, Number(value));
}
function decodeBool(_param, bytes) {
    const numberResult = (0,_number_js__WEBPACK_IMPORTED_MODULE_3__.decodeNumber)({ type: 'uint8', name: '' }, bytes);
    if (numberResult.result > 1 || numberResult.result < 0) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('Invalid boolean value encoded', {
            boolBytes: bytes.subarray(0, _utils_js__WEBPACK_IMPORTED_MODULE_2__.WORD_SIZE),
            numberResult,
        });
    }
    return {
        result: numberResult.result === BigInt(1),
        encoded: numberResult.encoded,
        consumed: _utils_js__WEBPACK_IMPORTED_MODULE_2__.WORD_SIZE,
    };
}
//# sourceMappingURL=bool.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/coders/base/bytes.js":
/*!****************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/coders/base/bytes.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeBytes: () => (/* binding */ decodeBytes),
/* harmony export */   encodeBytes: () => (/* binding */ encodeBytes)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-utils */ "./node_modules/web3-utils/lib/esm/index.js");
/* harmony import */ var web3_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! web3-validator */ "./node_modules/web3-validator/lib/esm/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils.js */ "./node_modules/web3-eth-abi/lib/esm/coders/utils.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./number.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/number.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/





const MAX_STATIC_BYTES_COUNT = 32;
function encodeBytes(param, input) {
    // hack for odd length hex strings
    if (typeof input === 'string' && input.length % 2 !== 0) {
        // eslint-disable-next-line no-param-reassign
        input += '0';
    }
    if (!(0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isBytes)(input)) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('provided input is not valid bytes value', {
            type: param.type,
            value: input,
            name: param.name,
        });
    }
    const bytes = (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.bytesToUint8Array)(input);
    const [, size] = param.type.split('bytes');
    // fixed size
    if (size) {
        if (Number(size) > MAX_STATIC_BYTES_COUNT || Number(size) < 1) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('invalid bytes type. Static byte type can have between 1 and 32 bytes', {
                type: param.type,
            });
        }
        if (Number(size) < bytes.length) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('provided input size is different than type size', {
                type: param.type,
                value: input,
                name: param.name,
            });
        }
        const encoded = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.alloc)(_utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE);
        encoded.set(bytes);
        return {
            dynamic: false,
            encoded,
        };
    }
    const partsLength = Math.ceil(bytes.length / _utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE);
    // one word for length of data + WORD for each part of actual data
    const encoded = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.alloc)(_utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE + partsLength * _utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE);
    encoded.set((0,_number_js__WEBPACK_IMPORTED_MODULE_4__.encodeNumber)({ type: 'uint32', name: '' }, bytes.length).encoded);
    encoded.set(bytes, _utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE);
    return {
        dynamic: true,
        encoded,
    };
}
function decodeBytes(param, bytes) {
    const [, sizeString] = param.type.split('bytes');
    let size = Number(sizeString);
    let remainingBytes = bytes;
    let partsCount = 1;
    let consumed = 0;
    if (!size) {
        // dynamic bytes
        const result = (0,_number_js__WEBPACK_IMPORTED_MODULE_4__.decodeNumber)({ type: 'uint32', name: '' }, remainingBytes);
        size = Number(result.result);
        consumed += result.consumed;
        remainingBytes = result.encoded;
        partsCount = Math.ceil(size / _utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE);
    }
    if (size > bytes.length) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('there is not enough data to decode', {
            type: param.type,
            encoded: bytes,
            size,
        });
    }
    return {
        result: (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.bytesToHex)(remainingBytes.subarray(0, size)),
        encoded: remainingBytes.subarray(partsCount * _utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE),
        consumed: consumed + partsCount * _utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE,
    };
}
//# sourceMappingURL=bytes.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/coders/base/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/coders/base/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeAddress: () => (/* reexport safe */ _address_js__WEBPACK_IMPORTED_MODULE_1__.decodeAddress),
/* harmony export */   decodeArray: () => (/* reexport safe */ _array_js__WEBPACK_IMPORTED_MODULE_7__.decodeArray),
/* harmony export */   decodeBool: () => (/* reexport safe */ _bool_js__WEBPACK_IMPORTED_MODULE_2__.decodeBool),
/* harmony export */   decodeBytes: () => (/* reexport safe */ _bytes_js__WEBPACK_IMPORTED_MODULE_3__.decodeBytes),
/* harmony export */   decodeNumber: () => (/* reexport safe */ _number_js__WEBPACK_IMPORTED_MODULE_4__.decodeNumber),
/* harmony export */   decodeParamFromAbiParameter: () => (/* binding */ decodeParamFromAbiParameter),
/* harmony export */   decodeString: () => (/* reexport safe */ _string_js__WEBPACK_IMPORTED_MODULE_5__.decodeString),
/* harmony export */   decodeTuple: () => (/* reexport safe */ _tuple_js__WEBPACK_IMPORTED_MODULE_6__.decodeTuple),
/* harmony export */   encodeAddress: () => (/* reexport safe */ _address_js__WEBPACK_IMPORTED_MODULE_1__.encodeAddress),
/* harmony export */   encodeArray: () => (/* reexport safe */ _array_js__WEBPACK_IMPORTED_MODULE_7__.encodeArray),
/* harmony export */   encodeBoolean: () => (/* reexport safe */ _bool_js__WEBPACK_IMPORTED_MODULE_2__.encodeBoolean),
/* harmony export */   encodeBytes: () => (/* reexport safe */ _bytes_js__WEBPACK_IMPORTED_MODULE_3__.encodeBytes),
/* harmony export */   encodeNumber: () => (/* reexport safe */ _number_js__WEBPACK_IMPORTED_MODULE_4__.encodeNumber),
/* harmony export */   encodeParamFromAbiParameter: () => (/* binding */ encodeParamFromAbiParameter),
/* harmony export */   encodeString: () => (/* reexport safe */ _string_js__WEBPACK_IMPORTED_MODULE_5__.encodeString),
/* harmony export */   encodeTuple: () => (/* reexport safe */ _tuple_js__WEBPACK_IMPORTED_MODULE_6__.encodeTuple)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var _address_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./address.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/address.js");
/* harmony import */ var _bool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bool.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/bool.js");
/* harmony import */ var _bytes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bytes.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/bytes.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./number.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/number.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./string.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/string.js");
/* harmony import */ var _tuple_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tuple.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/tuple.js");
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./array.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/array.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/






// eslint-disable-next-line import/no-cycle

// eslint-disable-next-line import/no-cycle






// eslint-disable-next-line import/no-cycle

// eslint-disable-next-line import/no-cycle

function encodeParamFromAbiParameter(param, value) {
    if (param.type === 'string') {
        return (0,_string_js__WEBPACK_IMPORTED_MODULE_5__.encodeString)(param, value);
    }
    if (param.type === 'bool') {
        return (0,_bool_js__WEBPACK_IMPORTED_MODULE_2__.encodeBoolean)(param, value);
    }
    if (param.type === 'address') {
        return (0,_address_js__WEBPACK_IMPORTED_MODULE_1__.encodeAddress)(param, value);
    }
    if (param.type === 'tuple') {
        return (0,_tuple_js__WEBPACK_IMPORTED_MODULE_6__.encodeTuple)(param, value);
    }
    if (param.type.endsWith(']')) {
        return (0,_array_js__WEBPACK_IMPORTED_MODULE_7__.encodeArray)(param, value);
    }
    if (param.type.startsWith('bytes')) {
        return (0,_bytes_js__WEBPACK_IMPORTED_MODULE_3__.encodeBytes)(param, value);
    }
    if (param.type.startsWith('uint') || param.type.startsWith('int')) {
        return (0,_number_js__WEBPACK_IMPORTED_MODULE_4__.encodeNumber)(param, value);
    }
    throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('Unsupported', {
        param,
        value,
    });
}
function decodeParamFromAbiParameter(param, bytes) {
    if (param.type === 'string') {
        return (0,_string_js__WEBPACK_IMPORTED_MODULE_5__.decodeString)(param, bytes);
    }
    if (param.type === 'bool') {
        return (0,_bool_js__WEBPACK_IMPORTED_MODULE_2__.decodeBool)(param, bytes);
    }
    if (param.type === 'address') {
        return (0,_address_js__WEBPACK_IMPORTED_MODULE_1__.decodeAddress)(param, bytes);
    }
    if (param.type === 'tuple') {
        return (0,_tuple_js__WEBPACK_IMPORTED_MODULE_6__.decodeTuple)(param, bytes);
    }
    if (param.type.endsWith(']')) {
        return (0,_array_js__WEBPACK_IMPORTED_MODULE_7__.decodeArray)(param, bytes);
    }
    if (param.type.startsWith('bytes')) {
        return (0,_bytes_js__WEBPACK_IMPORTED_MODULE_3__.decodeBytes)(param, bytes);
    }
    if (param.type.startsWith('uint') || param.type.startsWith('int')) {
        return (0,_number_js__WEBPACK_IMPORTED_MODULE_4__.decodeNumber)(param, bytes);
    }
    throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('Unsupported', {
        param,
        bytes,
    });
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/coders/base/number.js":
/*!*****************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/coders/base/number.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeNumber: () => (/* binding */ decodeNumber),
/* harmony export */   encodeNumber: () => (/* binding */ encodeNumber)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-utils */ "./node_modules/web3-utils/lib/esm/index.js");
/* harmony import */ var web3_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! web3-validator */ "./node_modules/web3-validator/lib/esm/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils.js */ "./node_modules/web3-eth-abi/lib/esm/coders/utils.js");
/* harmony import */ var _numbersLimits_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./numbersLimits.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/numbersLimits.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/





// eslint-disable-next-line no-bitwise
const mask = BigInt(1) << BigInt(256);
function bigIntToUint8Array(value, byteLength = _utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE) {
    let hexValue;
    if (value < 0) {
        hexValue = (mask + value).toString(16);
    }
    else {
        hexValue = value.toString(16);
    }
    hexValue = (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.padLeft)(hexValue, byteLength * 2);
    return web3_validator__WEBPACK_IMPORTED_MODULE_2__.utils.hexToUint8Array(hexValue);
}
function uint8ArrayToBigInt(value, max) {
    const hexValue = web3_validator__WEBPACK_IMPORTED_MODULE_2__.utils.uint8ArrayToHexString(value);
    const result = BigInt(hexValue);
    if (result <= max)
        return result;
    return result - mask;
}
function encodeNumber(param, input) {
    let value;
    try {
        value = (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.toBigInt)(input);
    }
    catch (e) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('provided input is not number value', {
            type: param.type,
            value: input,
            name: param.name,
        });
    }
    const limit = _numbersLimits_js__WEBPACK_IMPORTED_MODULE_4__.numberLimits.get(param.type);
    if (!limit) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('provided abi contains invalid number datatype', { type: param.type });
    }
    if (value < limit.min) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('provided input is less then minimum for given type', {
            type: param.type,
            value: input,
            name: param.name,
            minimum: limit.min.toString(),
        });
    }
    if (value > limit.max) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('provided input is greater then maximum for given type', {
            type: param.type,
            value: input,
            name: param.name,
            maximum: limit.max.toString(),
        });
    }
    return {
        dynamic: false,
        encoded: bigIntToUint8Array(value),
    };
}
function decodeNumber(param, bytes) {
    if (bytes.length < _utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('Not enough bytes left to decode', { param, bytesLeft: bytes.length });
    }
    const boolBytes = bytes.subarray(0, _utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE);
    const limit = _numbersLimits_js__WEBPACK_IMPORTED_MODULE_4__.numberLimits.get(param.type);
    if (!limit) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('provided abi contains invalid number datatype', { type: param.type });
    }
    const numberResult = uint8ArrayToBigInt(boolBytes, limit.max);
    if (numberResult < limit.min) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('decoded value is less then minimum for given type', {
            type: param.type,
            value: numberResult,
            name: param.name,
            minimum: limit.min.toString(),
        });
    }
    if (numberResult > limit.max) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('decoded value is greater then maximum for given type', {
            type: param.type,
            value: numberResult,
            name: param.name,
            maximum: limit.max.toString(),
        });
    }
    return {
        result: numberResult,
        encoded: bytes.subarray(_utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE),
        consumed: _utils_js__WEBPACK_IMPORTED_MODULE_3__.WORD_SIZE,
    };
}
//# sourceMappingURL=number.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/coders/base/numbersLimits.js":
/*!************************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/coders/base/numbersLimits.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   numberLimits: () => (/* binding */ numberLimits)
/* harmony export */ });
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
 * this variable contains the precalculated limits for all the numbers for uint and int types
 */
const numberLimits = new Map();
let base = BigInt(256); // 2 ^ 8 = 256
for (let i = 8; i <= 256; i += 8) {
    numberLimits.set(`uint${i}`, {
        min: BigInt(0),
        max: base - BigInt(1),
    });
    numberLimits.set(`int${i}`, {
        min: -base / BigInt(2),
        max: base / BigInt(2) - BigInt(1),
    });
    base *= BigInt(256);
}
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
numberLimits.set(`int`, numberLimits.get('int256'));
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
numberLimits.set(`uint`, numberLimits.get('uint256'));
//# sourceMappingURL=numbersLimits.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/coders/base/string.js":
/*!*****************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/coders/base/string.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeString: () => (/* binding */ decodeString),
/* harmony export */   encodeString: () => (/* binding */ encodeString)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-utils */ "./node_modules/web3-utils/lib/esm/index.js");
/* harmony import */ var _bytes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bytes.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/bytes.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/



function encodeString(_param, input) {
    if (typeof input !== 'string') {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('invalid input, should be string', { input });
    }
    const bytes = (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.utf8ToBytes)(input);
    return (0,_bytes_js__WEBPACK_IMPORTED_MODULE_2__.encodeBytes)({ type: 'bytes', name: '' }, bytes);
}
function decodeString(_param, bytes) {
    const r = (0,_bytes_js__WEBPACK_IMPORTED_MODULE_2__.decodeBytes)({ type: 'bytes', name: '' }, bytes);
    return {
        result: (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.hexToUtf8)(r.result),
        encoded: r.encoded,
        consumed: r.consumed,
    };
}
//# sourceMappingURL=string.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/coders/base/tuple.js":
/*!****************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/coders/base/tuple.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeTuple: () => (/* binding */ decodeTuple),
/* harmony export */   encodeTuple: () => (/* binding */ encodeTuple)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-utils */ "./node_modules/web3-utils/lib/esm/index.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils.js */ "./node_modules/web3-eth-abi/lib/esm/coders/utils.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./number.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/number.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/


// eslint-disable-next-line import/no-cycle




function encodeTuple(param, input) {
    var _a, _b, _c;
    let dynamic = false;
    if (!Array.isArray(input) && typeof input !== 'object') {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('param must be either Array or Object', {
            param,
            input,
        });
    }
    const narrowedInput = input;
    const encoded = [];
    for (let i = 0; i < ((_b = (_a = param.components) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0); i += 1) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const paramComponent = param.components[i];
        let result;
        if (Array.isArray(narrowedInput)) {
            if (i >= narrowedInput.length) {
                throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('input param length missmatch', {
                    param,
                    input,
                });
            }
            result = (0,_index_js__WEBPACK_IMPORTED_MODULE_2__.encodeParamFromAbiParameter)(paramComponent, narrowedInput[i]);
        }
        else {
            const paramInput = narrowedInput[(_c = paramComponent.name) !== null && _c !== void 0 ? _c : ''];
            // eslint-disable-next-line no-null/no-null
            if (paramInput === undefined || paramInput === null) {
                throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('missing input defined in abi', {
                    param,
                    input,
                    paramName: paramComponent.name,
                });
            }
            result = (0,_index_js__WEBPACK_IMPORTED_MODULE_2__.encodeParamFromAbiParameter)(paramComponent, paramInput);
        }
        if (result.dynamic) {
            dynamic = true;
        }
        encoded.push(result);
    }
    if (dynamic) {
        return {
            dynamic: true,
            encoded: (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.encodeDynamicParams)(encoded),
        };
    }
    return {
        dynamic: false,
        encoded: (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.uint8ArrayConcat)(...encoded.map(e => e.encoded)),
    };
}
function decodeTuple(param, bytes) {
    const result = {
        __length__: 0,
    };
    // tracks how much static params consumed bytes
    let consumed = 0;
    if (!param.components) {
        return {
            result,
            encoded: bytes,
            consumed,
        };
    }
    // track how much dynamic params consumed bytes
    let dynamicConsumed = 0;
    for (const [index, childParam] of param.components.entries()) {
        let decodedResult;
        if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.isDynamic)(childParam)) {
            // if dynamic, we will have offset encoded
            const offsetResult = (0,_number_js__WEBPACK_IMPORTED_MODULE_5__.decodeNumber)({ type: 'uint32', name: '' }, bytes.subarray(consumed));
            // offset counts from start of original byte sequence
            decodedResult = (0,_index_js__WEBPACK_IMPORTED_MODULE_2__.decodeParamFromAbiParameter)(childParam, bytes.subarray(Number(offsetResult.result)));
            consumed += offsetResult.consumed;
            dynamicConsumed += decodedResult.consumed;
        }
        else {
            // static param, just decode
            decodedResult = (0,_index_js__WEBPACK_IMPORTED_MODULE_2__.decodeParamFromAbiParameter)(childParam, bytes.subarray(consumed));
            consumed += decodedResult.consumed;
        }
        result.__length__ += 1;
        result[index] = decodedResult.result;
        if (childParam.name && childParam.name !== '') {
            result[childParam.name] = decodedResult.result;
        }
    }
    return {
        encoded: bytes.subarray(consumed + dynamicConsumed),
        result,
        consumed: consumed + dynamicConsumed,
    };
}
//# sourceMappingURL=tuple.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/coders/base/utils.js":
/*!****************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/coders/base/utils.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   encodeDynamicParams: () => (/* binding */ encodeDynamicParams)
/* harmony export */ });
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-utils */ "./node_modules/web3-utils/lib/esm/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/web3-eth-abi/lib/esm/coders/utils.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./number.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/number.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/



function encodeDynamicParams(encodedParams) {
    let staticSize = 0;
    let dynamicSize = 0;
    const staticParams = [];
    const dynamicParams = [];
    // figure out static size
    for (const encodedParam of encodedParams) {
        if (encodedParam.dynamic) {
            staticSize += _utils_js__WEBPACK_IMPORTED_MODULE_1__.WORD_SIZE;
        }
        else {
            staticSize += encodedParam.encoded.length;
        }
    }
    for (const encodedParam of encodedParams) {
        if (encodedParam.dynamic) {
            staticParams.push((0,_number_js__WEBPACK_IMPORTED_MODULE_2__.encodeNumber)({ type: 'uint256', name: '' }, staticSize + dynamicSize));
            dynamicParams.push(encodedParam);
            dynamicSize += encodedParam.encoded.length;
        }
        else {
            staticParams.push(encodedParam);
        }
    }
    return (0,web3_utils__WEBPACK_IMPORTED_MODULE_0__.uint8ArrayConcat)(...staticParams.map(p => p.encoded), ...dynamicParams.map(p => p.encoded));
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/coders/decode.js":
/*!************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/coders/decode.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeParameters: () => (/* binding */ decodeParameters)
/* harmony export */ });
/* harmony import */ var web3_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-validator */ "./node_modules/web3-validator/lib/esm/index.js");
/* harmony import */ var _base_tuple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base/tuple.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/tuple.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web3-eth-abi/lib/esm/coders/utils.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/



function decodeParameters(abis, bytes, _loose) {
    const abiParams = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.toAbiParams)(abis);
    const bytesArray = web3_validator__WEBPACK_IMPORTED_MODULE_0__.utils.hexToUint8Array(bytes);
    return (0,_base_tuple_js__WEBPACK_IMPORTED_MODULE_1__.decodeTuple)({ type: 'tuple', name: '', components: abiParams }, bytesArray).result;
}
//# sourceMappingURL=decode.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/coders/encode.js":
/*!************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/coders/encode.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   encodeParameters: () => (/* binding */ encodeParameters),
/* harmony export */   inferTypesAndEncodeParameters: () => (/* binding */ inferTypesAndEncodeParameters)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-utils */ "./node_modules/web3-utils/lib/esm/index.js");
/* harmony import */ var web3_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! web3-validator */ "./node_modules/web3-validator/lib/esm/index.js");
/* harmony import */ var _base_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base/index.js */ "./node_modules/web3-eth-abi/lib/esm/coders/base/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web3-eth-abi/lib/esm/coders/utils.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/





/**
 * @param params - The params to infer the ABI from
 * @returns The inferred ABI
 * @example
 * ```
 * inferParamsAbi([1, -1, 'hello', '0x1234', ])
 * ```
 * > [{ type: 'int256' }, { type: 'uint256' }, { type: 'string' }, { type: 'bytes' }]
 * ```
 */
function inferParamsAbi(params) {
    const abi = [];
    params.forEach(param => {
        if (Array.isArray(param)) {
            const inferredParams = inferParamsAbi(param);
            abi.push({
                type: 'tuple',
                components: inferredParams,
                name: '',
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            });
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            abi.push({ type: (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.toHex)(param, true) });
        }
    });
    return abi;
}
/**
 * Encodes a parameter based on its type to its ABI representation.
 * @param abi - An array of {@link AbiInput}. See [Solidity's documentation](https://solidity.readthedocs.io/en/v0.5.3/abi-spec.html#json) for more details.
 * @param params - The actual parameters to encode.
 * @returns - The ABI encoded parameters
 * @example
 * ```ts
 * const res = web3.eth.abi.encodeParameters(
 *    ["uint256", "string"],
 *    ["2345675643", "Hello!%"]
 *  );
 *
 *  console.log(res);
 *  > 0x000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000
 * ```
 */
function encodeParameters(abi, params) {
    if ((abi === null || abi === void 0 ? void 0 : abi.length) !== params.length) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('Invalid number of values received for given ABI', {
            expected: abi === null || abi === void 0 ? void 0 : abi.length,
            received: params.length,
        });
    }
    const abiParams = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.toAbiParams)(abi);
    return web3_validator__WEBPACK_IMPORTED_MODULE_2__.utils.uint8ArrayToHexString((0,_base_index_js__WEBPACK_IMPORTED_MODULE_3__.encodeTuple)({ type: 'tuple', name: '', components: abiParams }, params).encoded);
}
/**
 * Infer a smart contract method parameter type and then encode this parameter.
 * @param params - The parameters to encode.
 * @returns - The ABI encoded parameters
 *
 * @remarks
 * This method is useful when you don't know the type of the parameters you want to encode. It will infer the type of the parameters and then encode them.
 * However, it is not recommended to use this method when you know the type of the parameters you want to encode. In this case, use the {@link encodeParameters} method instead.
 * The type inference is not perfect and can lead to unexpected results. Especially when you want to encode an array, uint that is not uint256 or bytes....
 * @example
 * ```ts
 * const res = web3.eth.abi.encodeParameters(
 *    ["2345675643", "Hello!%"]
 *  );
 *
 *  console.log(res);
 *  > 0x000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000
 * ```
 */
function inferTypesAndEncodeParameters(params) {
    try {
        const abiParams = inferParamsAbi(params);
        return web3_validator__WEBPACK_IMPORTED_MODULE_2__.utils.uint8ArrayToHexString((0,_base_index_js__WEBPACK_IMPORTED_MODULE_3__.encodeTuple)({ type: 'tuple', name: '', components: abiParams }, params).encoded);
    }
    catch (e) {
        // throws If the inferred params type caused an error
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('Could not infer types from given params', {
            params,
        });
    }
}
//# sourceMappingURL=encode.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/coders/utils.js":
/*!***********************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/coders/utils.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WORD_SIZE: () => (/* binding */ WORD_SIZE),
/* harmony export */   alloc: () => (/* binding */ alloc),
/* harmony export */   allocUnsafe: () => (/* binding */ allocUnsafe),
/* harmony export */   convertExternalAbiParameter: () => (/* binding */ convertExternalAbiParameter),
/* harmony export */   extractArrayType: () => (/* binding */ extractArrayType),
/* harmony export */   isAbiParameter: () => (/* binding */ isAbiParameter),
/* harmony export */   isDynamic: () => (/* binding */ isDynamic),
/* harmony export */   toAbiParams: () => (/* binding */ toAbiParams)
/* harmony export */ });
/* harmony import */ var abitype__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! abitype */ "./node_modules/abitype/dist/index.mjs");
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-utils */ "./node_modules/web3-utils/lib/esm/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/web3-eth-abi/lib/esm/utils.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/




const WORD_SIZE = 32;
function alloc(size = 0) {
    var _a;
    if (((_a = globalThis.Buffer) === null || _a === void 0 ? void 0 : _a.alloc) !== undefined) {
        const buf = globalThis.Buffer.alloc(size);
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    return new Uint8Array(size);
}
/**
 * Where possible returns a Uint8Array of the requested size that references
 * uninitialized memory. Only use if you are certain you will immediately
 * overwrite every value in the returned `Uint8Array`.
 */
function allocUnsafe(size = 0) {
    var _a;
    if (((_a = globalThis.Buffer) === null || _a === void 0 ? void 0 : _a.allocUnsafe) !== undefined) {
        const buf = globalThis.Buffer.allocUnsafe(size);
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    return new Uint8Array(size);
}
function convertExternalAbiParameter(abiParam) {
    var _a, _b;
    return Object.assign(Object.assign({}, abiParam), { name: (_a = abiParam.name) !== null && _a !== void 0 ? _a : '', components: (_b = abiParam.components) === null || _b === void 0 ? void 0 : _b.map(c => convertExternalAbiParameter(c)) });
}
function isAbiParameter(param) {
    return (!(0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.isNullish)(param) &&
        typeof param === 'object' &&
        !(0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.isNullish)(param.type) &&
        typeof param.type === 'string');
}
function toAbiParams(abi) {
    return abi.map(input => {
        var _a;
        if (isAbiParameter(input)) {
            return input;
        }
        if (typeof input === 'string') {
            return convertExternalAbiParameter((0,abitype__WEBPACK_IMPORTED_MODULE_3__.parseAbiParameter)(input.replace(/tuple/, '')));
        }
        if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isSimplifiedStructFormat)(input)) {
            const structName = Object.keys(input)[0];
            const structInfo = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.mapStructNameAndType)(structName);
            structInfo.name = (_a = structInfo.name) !== null && _a !== void 0 ? _a : '';
            return Object.assign(Object.assign({}, structInfo), { components: (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.mapStructToCoderFormat)(input[structName]) });
        }
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('Invalid abi');
    });
}
function extractArrayType(param) {
    const arrayParenthesisStart = param.type.lastIndexOf('[');
    const arrayParamType = param.type.substring(0, arrayParenthesisStart);
    const sizeString = param.type.substring(arrayParenthesisStart);
    let size = -1;
    if (sizeString !== '[]') {
        size = Number(sizeString.slice(1, -1));
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(size)) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError('Invalid fixed array size', { size: sizeString });
        }
    }
    return {
        param: { type: arrayParamType, name: '', components: param.components },
        size,
    };
}
/**
 * Param is dynamic if it's dynamic base type or if some of his children (components, array items)
 * is of dynamic type
 * @param param
 */
function isDynamic(param) {
    var _a, _b;
    if (param.type === 'string' || param.type === 'bytes' || param.type.endsWith('[]'))
        return true;
    if (param.type === 'tuple') {
        return (_b = (_a = param.components) === null || _a === void 0 ? void 0 : _a.some(isDynamic)) !== null && _b !== void 0 ? _b : false;
    }
    if (param.type.endsWith(']')) {
        return isDynamic(extractArrayType(param).param);
    }
    return false;
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/decode_contract_error_data.js":
/*!*************************************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/decode_contract_error_data.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeContractErrorData: () => (/* binding */ decodeContractErrorData)
/* harmony export */ });
/* harmony import */ var _api_errors_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api/errors_api.js */ "./node_modules/web3-eth-abi/lib/esm/api/errors_api.js");
/* harmony import */ var _api_parameters_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api/parameters_api.js */ "./node_modules/web3-eth-abi/lib/esm/api/parameters_api.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web3-eth-abi/lib/esm/utils.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/



const decodeContractErrorData = (errorsAbi, error) => {
    if (error === null || error === void 0 ? void 0 : error.data) {
        let errorName;
        let errorSignature;
        let errorArgs;
        try {
            const errorSha = error.data.slice(0, 10);
            const errorAbi = errorsAbi.find(abi => (0,_api_errors_api_js__WEBPACK_IMPORTED_MODULE_0__.encodeErrorSignature)(abi).startsWith(errorSha));
            if (errorAbi === null || errorAbi === void 0 ? void 0 : errorAbi.inputs) {
                errorName = errorAbi.name;
                errorSignature = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.jsonInterfaceMethodToString)(errorAbi);
                // decode abi.inputs according to EIP-838
                errorArgs = (0,_api_parameters_api_js__WEBPACK_IMPORTED_MODULE_1__.decodeParameters)([...errorAbi.inputs], error.data.substring(10));
            }
            else if (error.data.startsWith('0x08c379a0')) {
                // If ABI was not provided, check for the 2 famous errors: 'Error(string)' or 'Panic(uint256)'
                errorName = 'Error';
                errorSignature = 'Error(string)';
                // decode abi.inputs according to EIP-838
                errorArgs = (0,_api_parameters_api_js__WEBPACK_IMPORTED_MODULE_1__.decodeParameters)([
                    {
                        name: 'message',
                        type: 'string',
                    },
                ], error.data.substring(10));
            }
            else if (error.data.startsWith('0x4e487b71')) {
                errorName = 'Panic';
                errorSignature = 'Panic(uint256)';
                // decode abi.inputs according to EIP-838
                errorArgs = (0,_api_parameters_api_js__WEBPACK_IMPORTED_MODULE_1__.decodeParameters)([
                    {
                        name: 'code',
                        type: 'uint256',
                    },
                ], error.data.substring(10));
            }
            else {
                console.error('No matching error abi found for error data', error.data);
            }
        }
        catch (err) {
            console.error(err);
        }
        if (errorName) {
            error.setDecodedProperties(errorName, errorSignature, errorArgs);
        }
    }
};
//# sourceMappingURL=decode_contract_error_data.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/eip_712.js":
/*!******************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/eip_712.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMessage: () => (/* binding */ getMessage)
/* harmony export */ });
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-utils */ "./node_modules/web3-utils/lib/esm/index.js");
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var _coders_encode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coders/encode.js */ "./node_modules/web3-eth-abi/lib/esm/coders/encode.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/



const TYPE_REGEX = /^\w+/;
const ARRAY_REGEX = /^(.*)\[([0-9]*?)]$/;
/**
 * Get the dependencies of a struct type. If a struct has the same dependency multiple times, it's only included once
 * in the resulting array.
 */
const getDependencies = (typedData, type, dependencies = []) => {
    const match = type.match(TYPE_REGEX);
    const actualType = match[0];
    if (dependencies.includes(actualType)) {
        return dependencies;
    }
    if (!typedData.types[actualType]) {
        return dependencies;
    }
    return [
        actualType,
        ...typedData.types[actualType].reduce((previous, _type) => [
            ...previous,
            ...getDependencies(typedData, _type.type, previous).filter(dependency => !previous.includes(dependency)),
        ], []),
    ];
};
/**
 * Encode a type to a string. All dependant types are alphabetically sorted.
 *
 * @param {TypedData} typedData
 * @param {string} type
 * @param {Options} [options]
 * @return {string}
 */
const encodeType = (typedData, type) => {
    const [primary, ...dependencies] = getDependencies(typedData, type);
    // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
    const types = [primary, ...dependencies.sort()];
    return types
        .map(dependency => 
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `${dependency}(${typedData.types[dependency].map(_type => `${_type.type} ${_type.name}`)})`)
        .join('');
};
/**
 * Get a type string as hash.
 */
const getTypeHash = (typedData, type) => (0,web3_utils__WEBPACK_IMPORTED_MODULE_0__.keccak256)(encodeType(typedData, type));
/**
 * Get encoded data as a hash. The data should be a key -> value object with all the required values. All dependant
 * types are automatically encoded.
 */
const getStructHash = (typedData, type, data) => (0,web3_utils__WEBPACK_IMPORTED_MODULE_0__.keccak256)(encodeData(typedData, type, data));
/**
 * Get the EIP-191 encoded message to sign, from the typedData object. If `hash` is enabled, the message will be hashed
 * with Keccak256.
 */
const getMessage = (typedData, hash) => {
    const EIP_191_PREFIX = '1901';
    const message = `0x${EIP_191_PREFIX}${getStructHash(typedData, 'EIP712Domain', typedData.domain).substring(2)}${getStructHash(typedData, typedData.primaryType, typedData.message).substring(2)}`;
    if (hash) {
        return (0,web3_utils__WEBPACK_IMPORTED_MODULE_0__.keccak256)(message);
    }
    return message;
};
/**
 * Encodes a single value to an ABI serialisable string, number or Buffer. Returns the data as tuple, which consists of
 * an array of ABI compatible types, and an array of corresponding values.
 */
const encodeValue = (typedData, type, data) => {
    const match = type.match(ARRAY_REGEX);
    // Checks for array types
    if (match) {
        const arrayType = match[1];
        const length = Number(match[2]) || undefined;
        if (!Array.isArray(data)) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_1__.AbiError('Cannot encode data: value is not of array type', {
                data,
            });
        }
        if (length && data.length !== length) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_1__.AbiError(`Cannot encode data: expected length of ${length}, but got ${data.length}`, {
                data,
            });
        }
        const encodedData = data.map(item => encodeValue(typedData, arrayType, item));
        const types = encodedData.map(item => item[0]);
        const values = encodedData.map(item => item[1]);
        return ['bytes32', (0,web3_utils__WEBPACK_IMPORTED_MODULE_0__.keccak256)((0,_coders_encode_js__WEBPACK_IMPORTED_MODULE_2__.encodeParameters)(types, values))];
    }
    if (typedData.types[type]) {
        return ['bytes32', getStructHash(typedData, type, data)];
    }
    // Strings and arbitrary byte arrays are hashed to bytes32
    if (type === 'string') {
        return ['bytes32', (0,web3_utils__WEBPACK_IMPORTED_MODULE_0__.keccak256)(data)];
    }
    if (type === 'bytes') {
        return ['bytes32', (0,web3_utils__WEBPACK_IMPORTED_MODULE_0__.keccak256)(data)];
    }
    return [type, data];
};
/**
 * Encode the data to an ABI encoded Buffer. The data should be a key -> value object with all the required values. All
 * dependant types are automatically encoded.
 */
const encodeData = (typedData, type, data) => {
    const [types, values] = typedData.types[type].reduce(([_types, _values], field) => {
        if ((0,web3_utils__WEBPACK_IMPORTED_MODULE_0__.isNullish)(data[field.name]) || (0,web3_utils__WEBPACK_IMPORTED_MODULE_0__.isNullish)(field.type)) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_1__.AbiError(`Cannot encode data: missing data for '${field.name}'`, {
                data,
                field,
            });
        }
        const value = data[field.name];
        const [_type, encodedValue] = encodeValue(typedData, field.type, value);
        return [
            [..._types, _type],
            [..._values, encodedValue],
        ];
    }, [['bytes32'], [getTypeHash(typedData, type)]]);
    return (0,_coders_encode_js__WEBPACK_IMPORTED_MODULE_2__.encodeParameters)(types, values);
};
//# sourceMappingURL=eip_712.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/index.js":
/*!****************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeContractErrorData: () => (/* reexport safe */ _decode_contract_error_data_js__WEBPACK_IMPORTED_MODULE_6__.decodeContractErrorData),
/* harmony export */   decodeFunctionCall: () => (/* reexport safe */ _api_functions_api_js__WEBPACK_IMPORTED_MODULE_2__.decodeFunctionCall),
/* harmony export */   decodeFunctionReturn: () => (/* reexport safe */ _api_functions_api_js__WEBPACK_IMPORTED_MODULE_2__.decodeFunctionReturn),
/* harmony export */   decodeLog: () => (/* reexport safe */ _api_logs_api_js__WEBPACK_IMPORTED_MODULE_3__.decodeLog),
/* harmony export */   decodeParameter: () => (/* reexport safe */ _api_parameters_api_js__WEBPACK_IMPORTED_MODULE_4__.decodeParameter),
/* harmony export */   decodeParameters: () => (/* reexport safe */ _api_parameters_api_js__WEBPACK_IMPORTED_MODULE_4__.decodeParameters),
/* harmony export */   decodeParametersWith: () => (/* reexport safe */ _api_parameters_api_js__WEBPACK_IMPORTED_MODULE_4__.decodeParametersWith),
/* harmony export */   encodeErrorSignature: () => (/* reexport safe */ _api_errors_api_js__WEBPACK_IMPORTED_MODULE_0__.encodeErrorSignature),
/* harmony export */   encodeEventSignature: () => (/* reexport safe */ _api_events_api_js__WEBPACK_IMPORTED_MODULE_1__.encodeEventSignature),
/* harmony export */   encodeFunctionCall: () => (/* reexport safe */ _api_functions_api_js__WEBPACK_IMPORTED_MODULE_2__.encodeFunctionCall),
/* harmony export */   encodeFunctionSignature: () => (/* reexport safe */ _api_functions_api_js__WEBPACK_IMPORTED_MODULE_2__.encodeFunctionSignature),
/* harmony export */   encodeParameter: () => (/* reexport safe */ _api_parameters_api_js__WEBPACK_IMPORTED_MODULE_4__.encodeParameter),
/* harmony export */   encodeParameters: () => (/* reexport safe */ _api_parameters_api_js__WEBPACK_IMPORTED_MODULE_4__.encodeParameters),
/* harmony export */   flattenTypes: () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_5__.flattenTypes),
/* harmony export */   formatOddHexstrings: () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_5__.formatOddHexstrings),
/* harmony export */   formatParam: () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_5__.formatParam),
/* harmony export */   getEncodedEip712Data: () => (/* reexport safe */ _eip_712_js__WEBPACK_IMPORTED_MODULE_7__.getMessage),
/* harmony export */   inferTypesAndEncodeParameters: () => (/* reexport safe */ _api_parameters_api_js__WEBPACK_IMPORTED_MODULE_4__.inferTypesAndEncodeParameters),
/* harmony export */   isAbiConstructorFragment: () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_5__.isAbiConstructorFragment),
/* harmony export */   isAbiErrorFragment: () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_5__.isAbiErrorFragment),
/* harmony export */   isAbiEventFragment: () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_5__.isAbiEventFragment),
/* harmony export */   isAbiFragment: () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_5__.isAbiFragment),
/* harmony export */   isAbiFunctionFragment: () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_5__.isAbiFunctionFragment),
/* harmony export */   isOddHexstring: () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_5__.isOddHexstring),
/* harmony export */   isSimplifiedStructFormat: () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_5__.isSimplifiedStructFormat),
/* harmony export */   jsonInterfaceMethodToString: () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_5__.jsonInterfaceMethodToString),
/* harmony export */   mapStructNameAndType: () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_5__.mapStructNameAndType),
/* harmony export */   mapStructToCoderFormat: () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_5__.mapStructToCoderFormat),
/* harmony export */   mapTypes: () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_5__.mapTypes)
/* harmony export */ });
/* harmony import */ var _api_errors_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api/errors_api.js */ "./node_modules/web3-eth-abi/lib/esm/api/errors_api.js");
/* harmony import */ var _api_events_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api/events_api.js */ "./node_modules/web3-eth-abi/lib/esm/api/events_api.js");
/* harmony import */ var _api_functions_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api/functions_api.js */ "./node_modules/web3-eth-abi/lib/esm/api/functions_api.js");
/* harmony import */ var _api_logs_api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api/logs_api.js */ "./node_modules/web3-eth-abi/lib/esm/api/logs_api.js");
/* harmony import */ var _api_parameters_api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api/parameters_api.js */ "./node_modules/web3-eth-abi/lib/esm/api/parameters_api.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web3-eth-abi/lib/esm/utils.js");
/* harmony import */ var _decode_contract_error_data_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./decode_contract_error_data.js */ "./node_modules/web3-eth-abi/lib/esm/decode_contract_error_data.js");
/* harmony import */ var _eip_712_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./eip_712.js */ "./node_modules/web3-eth-abi/lib/esm/eip_712.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/








//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/web3-eth-abi/lib/esm/utils.js":
/*!****************************************************!*\
  !*** ./node_modules/web3-eth-abi/lib/esm/utils.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   flattenTypes: () => (/* binding */ flattenTypes),
/* harmony export */   formatOddHexstrings: () => (/* binding */ formatOddHexstrings),
/* harmony export */   formatParam: () => (/* binding */ formatParam),
/* harmony export */   isAbiConstructorFragment: () => (/* binding */ isAbiConstructorFragment),
/* harmony export */   isAbiErrorFragment: () => (/* binding */ isAbiErrorFragment),
/* harmony export */   isAbiEventFragment: () => (/* binding */ isAbiEventFragment),
/* harmony export */   isAbiFragment: () => (/* binding */ isAbiFragment),
/* harmony export */   isAbiFunctionFragment: () => (/* binding */ isAbiFunctionFragment),
/* harmony export */   isOddHexstring: () => (/* binding */ isOddHexstring),
/* harmony export */   isSimplifiedStructFormat: () => (/* binding */ isSimplifiedStructFormat),
/* harmony export */   jsonInterfaceMethodToString: () => (/* binding */ jsonInterfaceMethodToString),
/* harmony export */   mapStructNameAndType: () => (/* binding */ mapStructNameAndType),
/* harmony export */   mapStructToCoderFormat: () => (/* binding */ mapStructToCoderFormat),
/* harmony export */   mapTypes: () => (/* binding */ mapTypes)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-utils */ "./node_modules/web3-utils/lib/esm/index.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/


const isAbiFragment = (item) => !(0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.isNullish)(item) &&
    typeof item === 'object' &&
    !(0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.isNullish)(item.type) &&
    ['function', 'event', 'constructor', 'error'].includes(item.type);
const isAbiErrorFragment = (item) => !(0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.isNullish)(item) &&
    typeof item === 'object' &&
    !(0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.isNullish)(item.type) &&
    item.type === 'error';
const isAbiEventFragment = (item) => !(0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.isNullish)(item) &&
    typeof item === 'object' &&
    !(0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.isNullish)(item.type) &&
    item.type === 'event';
const isAbiFunctionFragment = (item) => !(0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.isNullish)(item) &&
    typeof item === 'object' &&
    !(0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.isNullish)(item.type) &&
    item.type === 'function';
const isAbiConstructorFragment = (item) => !(0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.isNullish)(item) &&
    typeof item === 'object' &&
    !(0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.isNullish)(item.type) &&
    item.type === 'constructor';
/**
 * Check if type is simplified struct format
 */
const isSimplifiedStructFormat = (type) => typeof type === 'object' &&
    typeof type.components === 'undefined' &&
    typeof type.name === 'undefined';
/**
 * Maps the correct tuple type and name when the simplified format in encode/decodeParameter is used
 */
const mapStructNameAndType = (structName) => structName.includes('[]')
    ? { type: 'tuple[]', name: structName.slice(0, -2) }
    : { type: 'tuple', name: structName };
/**
 * Maps the simplified format in to the expected format of the ABICoder
 */
const mapStructToCoderFormat = (struct) => {
    const components = [];
    for (const key of Object.keys(struct)) {
        const item = struct[key];
        if (typeof item === 'object') {
            components.push(Object.assign(Object.assign({}, mapStructNameAndType(key)), { components: mapStructToCoderFormat(item) }));
        }
        else {
            components.push({
                name: key,
                type: struct[key],
            });
        }
    }
    return components;
};
/**
 * Map types if simplified format is used
 */
const mapTypes = (types) => {
    const mappedTypes = [];
    for (const type of types) {
        let modifiedType = type;
        // Clone object
        if (typeof type === 'object') {
            modifiedType = Object.assign({}, type);
        }
        // Remap `function` type params to bytes24 since Ethers does not
        // recognize former type. Solidity docs say `Function` is a bytes24
        // encoding the contract address followed by the function selector hash.
        if (typeof type === 'object' && type.type === 'function') {
            modifiedType = Object.assign(Object.assign({}, type), { type: 'bytes24' });
        }
        if (isSimplifiedStructFormat(modifiedType)) {
            const structName = Object.keys(modifiedType)[0];
            mappedTypes.push(Object.assign(Object.assign({}, mapStructNameAndType(structName)), { components: mapStructToCoderFormat(modifiedType[structName]) }));
        }
        else {
            mappedTypes.push(modifiedType);
        }
    }
    return mappedTypes;
};
/**
 * returns true if input is a hexstring and is odd-lengthed
 */
const isOddHexstring = (param) => typeof param === 'string' && /^(-)?0x[0-9a-f]*$/i.test(param) && param.length % 2 === 1;
/**
 * format odd-length bytes to even-length
 */
const formatOddHexstrings = (param) => isOddHexstring(param) ? `0x0${param.substring(2)}` : param;
const paramTypeBytes = /^bytes([0-9]*)$/;
const paramTypeBytesArray = /^bytes([0-9]*)\[\]$/;
const paramTypeNumber = /^(u?int)([0-9]*)$/;
const paramTypeNumberArray = /^(u?int)([0-9]*)\[\]$/;
/**
 * Handle some formatting of params for backwards compatibility with Ethers V4
 */
const formatParam = (type, _param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // clone if _param is an object
    const param = typeof _param === 'object' && !Array.isArray(_param) ? Object.assign({}, _param) : _param;
    // Format BN to string
    if (param instanceof BigInt || typeof param === 'bigint') {
        return param.toString(10);
    }
    if (paramTypeBytesArray.exec(type) || paramTypeNumberArray.exec(type)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        const paramClone = [...param];
        return paramClone.map(p => formatParam(type.replace('[]', ''), p));
    }
    // Format correct width for u?int[0-9]*
    let match = paramTypeNumber.exec(type);
    if (match) {
        const size = parseInt(match[2] ? match[2] : '256', 10);
        if (size / 8 < param.length) {
            // pad to correct bit width
            return (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.leftPad)(param, size);
        }
    }
    // Format correct length for bytes[0-9]+
    match = paramTypeBytes.exec(type);
    if (match) {
        const hexParam = (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.isUint8Array)(param) ? (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.toHex)(param) : param;
        // format to correct length
        const size = parseInt(match[1], 10);
        if (size) {
            let maxSize = size * 2;
            if (param.startsWith('0x')) {
                maxSize += 2;
            }
            // pad to correct length
            const paddedParam = hexParam.length < maxSize
                ? (0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.rightPad)(param, size * 2)
                : hexParam;
            return formatOddHexstrings(paddedParam);
        }
        return formatOddHexstrings(hexParam);
    }
    return param;
};
/**
 *  used to flatten json abi inputs/outputs into an array of type-representing-strings
 */
const flattenTypes = (includeTuple, puts) => {
    const types = [];
    puts.forEach(param => {
        if (typeof param.components === 'object') {
            if (!param.type.startsWith('tuple')) {
                throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.AbiError(`Invalid value given "${param.type}". Error: components found but type is not tuple.`);
            }
            const arrayBracket = param.type.indexOf('[');
            const suffix = arrayBracket >= 0 ? param.type.substring(arrayBracket) : '';
            const result = flattenTypes(includeTuple, param.components);
            if (Array.isArray(result) && includeTuple) {
                types.push(`tuple(${result.join(',')})${suffix}`);
            }
            else if (!includeTuple) {
                types.push(`(${result.join(',')})${suffix}`);
            }
            else {
                types.push(`(${result.join()})`);
            }
        }
        else {
            types.push(param.type);
        }
    });
    return types;
};
/**
 * Should be used to create full function/event name from json abi
 * returns a string
 */
const jsonInterfaceMethodToString = (json) => {
    var _a, _b, _c, _d;
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (isAbiErrorFragment(json) || isAbiEventFragment(json) || isAbiFunctionFragment(json)) {
        if ((_a = json.name) === null || _a === void 0 ? void 0 : _a.includes('(')) {
            return json.name;
        }
        return `${(_b = json.name) !== null && _b !== void 0 ? _b : ''}(${flattenTypes(false, (_c = json.inputs) !== null && _c !== void 0 ? _c : []).join(',')})`;
    }
    // Constructor fragment
    return `(${flattenTypes(false, (_d = json.inputs) !== null && _d !== void 0 ? _d : []).join(',')})`;
};
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/apis/eth_execution_api.js":
/*!*******************************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/apis/eth_execution_api.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=eth_execution_api.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/apis/eth_personal_api.js":
/*!******************************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/apis/eth_personal_api.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=eth_personal_api.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/apis/web3_eth_execution_api.js":
/*!************************************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/apis/web3_eth_execution_api.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=web3_eth_execution_api.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/apis/web3_net_api.js":
/*!**************************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/apis/web3_net_api.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=web3_net_api.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/data_format_types.js":
/*!**************************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/data_format_types.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_RETURN_FORMAT: () => (/* binding */ DEFAULT_RETURN_FORMAT),
/* harmony export */   ETH_DATA_FORMAT: () => (/* binding */ ETH_DATA_FORMAT),
/* harmony export */   FMT_BYTES: () => (/* binding */ FMT_BYTES),
/* harmony export */   FMT_NUMBER: () => (/* binding */ FMT_NUMBER)
/* harmony export */ });
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
var FMT_NUMBER;
(function (FMT_NUMBER) {
    FMT_NUMBER["NUMBER"] = "NUMBER_NUMBER";
    FMT_NUMBER["HEX"] = "NUMBER_HEX";
    FMT_NUMBER["STR"] = "NUMBER_STR";
    FMT_NUMBER["BIGINT"] = "NUMBER_BIGINT";
})(FMT_NUMBER || (FMT_NUMBER = {}));
var FMT_BYTES;
(function (FMT_BYTES) {
    FMT_BYTES["HEX"] = "BYTES_HEX";
    FMT_BYTES["UINT8ARRAY"] = "BYTES_UINT8ARRAY";
})(FMT_BYTES || (FMT_BYTES = {}));
const DEFAULT_RETURN_FORMAT = {
    number: FMT_NUMBER.BIGINT,
    bytes: FMT_BYTES.HEX,
};
const ETH_DATA_FORMAT = { number: FMT_NUMBER.HEX, bytes: FMT_BYTES.HEX };
//# sourceMappingURL=data_format_types.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/error_types.js":
/*!********************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/error_types.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

//# sourceMappingURL=error_types.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/eth_abi_types.js":
/*!**********************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/eth_abi_types.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

//# sourceMappingURL=eth_abi_types.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/eth_contract_types.js":
/*!***************************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/eth_contract_types.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

//# sourceMappingURL=eth_contract_types.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/eth_types.js":
/*!******************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/eth_types.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlockTags: () => (/* binding */ BlockTags),
/* harmony export */   HardforksOrdered: () => (/* binding */ HardforksOrdered)
/* harmony export */ });
var BlockTags;
(function (BlockTags) {
    BlockTags["EARLIEST"] = "earliest";
    BlockTags["LATEST"] = "latest";
    BlockTags["PENDING"] = "pending";
    BlockTags["SAFE"] = "safe";
    BlockTags["FINALIZED"] = "finalized";
    BlockTags["COMMITTED"] = "committed";
})(BlockTags || (BlockTags = {}));
// This list of hardforks is expected to be in order
// keep this in mind when making changes to it
var HardforksOrdered;
(function (HardforksOrdered) {
    HardforksOrdered["chainstart"] = "chainstart";
    HardforksOrdered["frontier"] = "frontier";
    HardforksOrdered["homestead"] = "homestead";
    HardforksOrdered["dao"] = "dao";
    HardforksOrdered["tangerineWhistle"] = "tangerineWhistle";
    HardforksOrdered["spuriousDragon"] = "spuriousDragon";
    HardforksOrdered["byzantium"] = "byzantium";
    HardforksOrdered["constantinople"] = "constantinople";
    HardforksOrdered["petersburg"] = "petersburg";
    HardforksOrdered["istanbul"] = "istanbul";
    HardforksOrdered["muirGlacier"] = "muirGlacier";
    HardforksOrdered["berlin"] = "berlin";
    HardforksOrdered["london"] = "london";
    HardforksOrdered["altair"] = "altair";
    HardforksOrdered["arrowGlacier"] = "arrowGlacier";
    HardforksOrdered["grayGlacier"] = "grayGlacier";
    HardforksOrdered["bellatrix"] = "bellatrix";
    HardforksOrdered["merge"] = "merge";
    HardforksOrdered["capella"] = "capella";
    HardforksOrdered["shanghai"] = "shanghai";
})(HardforksOrdered || (HardforksOrdered = {}));
//# sourceMappingURL=eth_types.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/index.js":
/*!**************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlockTags: () => (/* reexport safe */ _eth_types_js__WEBPACK_IMPORTED_MODULE_6__.BlockTags),
/* harmony export */   DEFAULT_RETURN_FORMAT: () => (/* reexport safe */ _data_format_types_js__WEBPACK_IMPORTED_MODULE_5__.DEFAULT_RETURN_FORMAT),
/* harmony export */   ETH_DATA_FORMAT: () => (/* reexport safe */ _data_format_types_js__WEBPACK_IMPORTED_MODULE_5__.ETH_DATA_FORMAT),
/* harmony export */   FMT_BYTES: () => (/* reexport safe */ _data_format_types_js__WEBPACK_IMPORTED_MODULE_5__.FMT_BYTES),
/* harmony export */   FMT_NUMBER: () => (/* reexport safe */ _data_format_types_js__WEBPACK_IMPORTED_MODULE_5__.FMT_NUMBER),
/* harmony export */   HardforksOrdered: () => (/* reexport safe */ _eth_types_js__WEBPACK_IMPORTED_MODULE_6__.HardforksOrdered),
/* harmony export */   TypedArray: () => (/* reexport safe */ _primitives_types_js__WEBPACK_IMPORTED_MODULE_10__.TypedArray),
/* harmony export */   Web3BaseProvider: () => (/* reexport safe */ _web3_base_provider_js__WEBPACK_IMPORTED_MODULE_13__.Web3BaseProvider),
/* harmony export */   Web3BaseWallet: () => (/* reexport safe */ _web3_base_wallet_js__WEBPACK_IMPORTED_MODULE_14__.Web3BaseWallet)
/* harmony export */ });
/* harmony import */ var _error_types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error_types.js */ "./node_modules/web3-types/lib/esm/error_types.js");
/* harmony import */ var _apis_eth_execution_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apis/eth_execution_api.js */ "./node_modules/web3-types/lib/esm/apis/eth_execution_api.js");
/* harmony import */ var _apis_web3_eth_execution_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apis/web3_eth_execution_api.js */ "./node_modules/web3-types/lib/esm/apis/web3_eth_execution_api.js");
/* harmony import */ var _apis_web3_net_api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./apis/web3_net_api.js */ "./node_modules/web3-types/lib/esm/apis/web3_net_api.js");
/* harmony import */ var _apis_eth_personal_api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./apis/eth_personal_api.js */ "./node_modules/web3-types/lib/esm/apis/eth_personal_api.js");
/* harmony import */ var _data_format_types_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data_format_types.js */ "./node_modules/web3-types/lib/esm/data_format_types.js");
/* harmony import */ var _eth_types_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./eth_types.js */ "./node_modules/web3-types/lib/esm/eth_types.js");
/* harmony import */ var _eth_abi_types_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./eth_abi_types.js */ "./node_modules/web3-types/lib/esm/eth_abi_types.js");
/* harmony import */ var _eth_contract_types_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./eth_contract_types.js */ "./node_modules/web3-types/lib/esm/eth_contract_types.js");
/* harmony import */ var _json_rpc_types_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./json_rpc_types.js */ "./node_modules/web3-types/lib/esm/json_rpc_types.js");
/* harmony import */ var _primitives_types_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./primitives_types.js */ "./node_modules/web3-types/lib/esm/primitives_types.js");
/* harmony import */ var _utility_types_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utility_types.js */ "./node_modules/web3-types/lib/esm/utility_types.js");
/* harmony import */ var _web3_api_types_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./web3_api_types.js */ "./node_modules/web3-types/lib/esm/web3_api_types.js");
/* harmony import */ var _web3_base_provider_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./web3_base_provider.js */ "./node_modules/web3-types/lib/esm/web3_base_provider.js");
/* harmony import */ var _web3_base_wallet_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./web3_base_wallet.js */ "./node_modules/web3-types/lib/esm/web3_base_wallet.js");
/* harmony import */ var _web3_deferred_promise_type_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./web3_deferred_promise_type.js */ "./node_modules/web3-types/lib/esm/web3_deferred_promise_type.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
















//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/json_rpc_types.js":
/*!***********************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/json_rpc_types.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=json_rpc_types.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/primitives_types.js":
/*!*************************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/primitives_types.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TypedArray: () => (/* binding */ TypedArray)
/* harmony export */ });
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const TypedArray = Object.getPrototypeOf(Uint8Array);
//# sourceMappingURL=primitives_types.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/utility_types.js":
/*!**********************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/utility_types.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

//# sourceMappingURL=utility_types.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/web3_api_types.js":
/*!***********************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/web3_api_types.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

//# sourceMappingURL=web3_api_types.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/web3_base_provider.js":
/*!***************************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/web3_base_provider.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Web3BaseProvider: () => (/* binding */ Web3BaseProvider)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const symbol = Symbol.for('web3/base-provider');
// Provider interface compatible with EIP-1193
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md
class Web3BaseProvider {
    static isWeb3Provider(provider) {
        return (provider instanceof Web3BaseProvider ||
            Boolean(provider && provider[symbol]));
    }
    // To match an object "instanceof" does not work if
    // matcher class and object is using different package versions
    // to overcome this bottleneck used this approach.
    // The symbol value for one string will always remain same regardless of package versions
    // eslint-disable-next-line class-methods-use-this
    get [symbol]() {
        return true;
    }
    /**
     * @deprecated Please use `.request` instead.
     * @param payload - Request Payload
     * @param callback - Callback
     */
    send(payload, 
    // eslint-disable-next-line @typescript-eslint/ban-types
    callback) {
        this.request(payload)
            .then(response => {
            // eslint-disable-next-line no-null/no-null
            callback(null, response);
        })
            .catch((err) => {
            callback(err);
        });
    }
    /**
     * @deprecated Please use `.request` instead.
     * @param payload - Request Payload
     */
    sendAsync(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(payload);
        });
    }
    /**
     * Modify the return type of the request method to be fully compatible with EIP-1193
     *
     * [deprecated] In the future major releases (\>= v5) all providers are supposed to be fully compatible with EIP-1193.
     * So this method will not be needed and would not be available in the future.
     *
     * @returns A new instance of the provider with the request method fully compatible with EIP-1193
     *
     * @example
     * ```ts
     * const provider = new Web3HttpProvider('http://localhost:8545');
     * const fullyCompatibleProvider = provider.asEIP1193Provider();
     * const result = await fullyCompatibleProvider.request({ method: 'eth_getBalance' });
     * console.log(result); // '0x0234c8a3397aab58' or something like that
     * ```
     */
    asEIP1193Provider() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newObj = Object.create(this);
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const originalRequest = newObj.request;
        newObj.request = function request(args) {
            return __awaiter(this, void 0, void 0, function* () {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                const response = (yield originalRequest(args));
                return response.result;
            });
        };
        // @ts-expect-error the property should not be available in the new object because of using Object.create(this).
        //	But it is available if we do not delete it.
        newObj.asEIP1193Provider = undefined; // to prevent the user for calling this method again
        return newObj;
    }
}
//# sourceMappingURL=web3_base_provider.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/web3_base_wallet.js":
/*!*************************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/web3_base_wallet.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Web3BaseWallet: () => (/* binding */ Web3BaseWallet)
/* harmony export */ });
class Web3BaseWallet extends Array {
    constructor(accountProvider) {
        super();
        this._accountProvider = accountProvider;
    }
}
//# sourceMappingURL=web3_base_wallet.js.map

/***/ }),

/***/ "./node_modules/web3-types/lib/esm/web3_deferred_promise_type.js":
/*!***********************************************************************!*\
  !*** ./node_modules/web3-types/lib/esm/web3_deferred_promise_type.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

//# sourceMappingURL=web3_deferred_promise_type.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/chunk_response_parser.js":
/*!******************************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/chunk_response_parser.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChunkResponseParser: () => (/* binding */ ChunkResponseParser)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");

class ChunkResponseParser {
    constructor(eventEmitter, autoReconnect) {
        this.eventEmitter = eventEmitter;
        this.autoReconnect = autoReconnect;
        this.chunkTimeout = 1000 * 15;
    }
    clearQueues() {
        if (typeof this._clearQueues === 'function') {
            this._clearQueues();
        }
    }
    onError(clearQueues) {
        this._clearQueues = clearQueues;
    }
    parseResponse(data) {
        const returnValues = [];
        // DE-CHUNKER
        const dechunkedData = data
            .replace(/\}[\n\r]?\{/g, '}|--|{') // }{
            .replace(/\}\][\n\r]?\[\{/g, '}]|--|[{') // }][{
            .replace(/\}[\n\r]?\[\{/g, '}|--|[{') // }[{
            .replace(/\}\][\n\r]?\{/g, '}]|--|{') // }]{
            .split('|--|');
        dechunkedData.forEach(_chunkData => {
            // prepend the last chunk
            let chunkData = _chunkData;
            if (this.lastChunk) {
                chunkData = this.lastChunk + chunkData;
            }
            let result;
            try {
                result = JSON.parse(chunkData);
            }
            catch (e) {
                this.lastChunk = chunkData;
                // start timeout to cancel all requests
                if (this.lastChunkTimeout) {
                    clearTimeout(this.lastChunkTimeout);
                }
                this.lastChunkTimeout = setTimeout(() => {
                    if (this.autoReconnect)
                        return;
                    this.clearQueues();
                    this.eventEmitter.emit('error', new web3_errors__WEBPACK_IMPORTED_MODULE_0__.InvalidResponseError({
                        id: 1,
                        jsonrpc: '2.0',
                        error: { code: 2, message: 'Chunk timeout' },
                    }));
                }, this.chunkTimeout);
                return;
            }
            // cancel timeout and set chunk to null
            clearTimeout(this.lastChunkTimeout);
            this.lastChunk = undefined;
            if (result)
                returnValues.push(result);
        });
        return returnValues;
    }
}
//# sourceMappingURL=chunk_response_parser.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/converters.js":
/*!*******************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/converters.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   asciiToHex: () => (/* binding */ asciiToHex),
/* harmony export */   bytesToHex: () => (/* binding */ bytesToHex),
/* harmony export */   bytesToUint8Array: () => (/* binding */ bytesToUint8Array),
/* harmony export */   ethUnitMap: () => (/* binding */ ethUnitMap),
/* harmony export */   fromAscii: () => (/* binding */ fromAscii),
/* harmony export */   fromDecimal: () => (/* binding */ fromDecimal),
/* harmony export */   fromUtf8: () => (/* binding */ fromUtf8),
/* harmony export */   fromWei: () => (/* binding */ fromWei),
/* harmony export */   hexToAscii: () => (/* binding */ hexToAscii),
/* harmony export */   hexToBytes: () => (/* binding */ hexToBytes),
/* harmony export */   hexToNumber: () => (/* binding */ hexToNumber),
/* harmony export */   hexToNumberString: () => (/* binding */ hexToNumberString),
/* harmony export */   hexToString: () => (/* binding */ hexToString),
/* harmony export */   hexToUtf8: () => (/* binding */ hexToUtf8),
/* harmony export */   numberToHex: () => (/* binding */ numberToHex),
/* harmony export */   stringToHex: () => (/* binding */ stringToHex),
/* harmony export */   toAscii: () => (/* binding */ toAscii),
/* harmony export */   toBigInt: () => (/* binding */ toBigInt),
/* harmony export */   toBool: () => (/* binding */ toBool),
/* harmony export */   toChecksumAddress: () => (/* binding */ toChecksumAddress),
/* harmony export */   toDecimal: () => (/* binding */ toDecimal),
/* harmony export */   toHex: () => (/* binding */ toHex),
/* harmony export */   toNumber: () => (/* binding */ toNumber),
/* harmony export */   toUtf8: () => (/* binding */ toUtf8),
/* harmony export */   toWei: () => (/* binding */ toWei),
/* harmony export */   utf8ToBytes: () => (/* binding */ utf8ToBytes),
/* harmony export */   utf8ToHex: () => (/* binding */ utf8ToHex)
/* harmony export */ });
/* harmony import */ var ethereum_cryptography_keccak_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethereum-cryptography/keccak.js */ "./node_modules/web3-utils/node_modules/ethereum-cryptography/esm/keccak.js");
/* harmony import */ var ethereum_cryptography_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethereum-cryptography/utils.js */ "./node_modules/web3-utils/node_modules/ethereum-cryptography/esm/utils.js");
/* harmony import */ var web3_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! web3-validator */ "./node_modules/web3-validator/lib/esm/index.js");
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var _uint8array_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./uint8array.js */ "./node_modules/web3-utils/lib/esm/uint8array.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @module Utils
 */





// Ref: https://ethdocs.org/en/latest/ether.html
// Note: this could be simplified using ** operator, but babel does not handle it well (https://github.com/babel/babel/issues/13109)
/** @internal */
const ethUnitMap = {
    noether: BigInt(0),
    wei: BigInt(1),
    kwei: BigInt(1000),
    Kwei: BigInt(1000),
    babbage: BigInt(1000),
    femtoether: BigInt(1000),
    mwei: BigInt(1000000),
    Mwei: BigInt(1000000),
    lovelace: BigInt(1000000),
    picoether: BigInt(1000000),
    gwei: BigInt(1000000000),
    Gwei: BigInt(1000000000),
    shannon: BigInt(1000000000),
    nanoether: BigInt(1000000000),
    nano: BigInt(1000000000),
    szabo: BigInt(1000000000000),
    microether: BigInt(1000000000000),
    micro: BigInt(1000000000000),
    finney: BigInt(1000000000000000),
    milliether: BigInt(1000000000000000),
    milli: BigInt(1000000000000000),
    ether: BigInt('1000000000000000000'),
    kether: BigInt('1000000000000000000000'),
    grand: BigInt('1000000000000000000000'),
    mether: BigInt('1000000000000000000000000'),
    gether: BigInt('1000000000000000000000000000'),
    tether: BigInt('1000000000000000000000000000000'),
};
const PrecisionLossWarning = 'Warning: Using type `number` with values that are large or contain many decimals may cause loss of precision, it is recommended to use type `string` or `BigInt` when using conversion methods';
/**
 * Convert a value from bytes to Uint8Array
 * @param data - Data to be converted
 * @returns - The Uint8Array representation of the input data
 *
 * @example
 * ```ts
 * console.log(web3.utils.bytesToUint8Array("0xab")));
 * > Uint8Array(1) [ 171 ]
 * ```
 */
const bytesToUint8Array = (data) => {
    web3_validator__WEBPACK_IMPORTED_MODULE_2__.validator.validate(['bytes'], [data]);
    if ((0,_uint8array_js__WEBPACK_IMPORTED_MODULE_4__.isUint8Array)(data)) {
        return data;
    }
    if (Array.isArray(data)) {
        return new Uint8Array(data);
    }
    if (typeof data === 'string') {
        return web3_validator__WEBPACK_IMPORTED_MODULE_2__.utils.hexToUint8Array(data);
    }
    throw new web3_errors__WEBPACK_IMPORTED_MODULE_3__.InvalidBytesError(data);
};
/**
 * @internal
 */
const { uint8ArrayToHexString } = web3_validator__WEBPACK_IMPORTED_MODULE_2__.utils;
/**
 * Convert a byte array to a hex string
 * @param bytes - Byte array to be converted
 * @returns - The hex string representation of the input byte array
 *
 * @example
 * ```ts
 * console.log(web3.utils.bytesToHex(new Uint8Array([72, 12])));
 * > "0x480c"
 *
 */
const bytesToHex = (bytes) => uint8ArrayToHexString(bytesToUint8Array(bytes));
/**
 * Convert a hex string to a byte array
 * @param hex - Hex string to be converted
 * @returns - The byte array representation of the input hex string
 *
 * @example
 * ```ts
 * console.log(web3.utils.hexToBytes('0x74657374'));
 * > Uint8Array(4) [ 116, 101, 115, 116 ]
 * ```
 */
const hexToBytes = (bytes) => {
    if (typeof bytes === 'string' && bytes.slice(0, 2).toLowerCase() !== '0x') {
        return bytesToUint8Array(`0x${bytes}`);
    }
    return bytesToUint8Array(bytes);
};
/**
 * Converts value to it's number representation
 * @param value - Hex string to be converted
 * @returns - The number representation of the input value
 *
 * @example
 * ```ts
 * conoslle.log(web3.utils.hexToNumber('0xa'));
 * > 10
 * ```
 */
const hexToNumber = (value) => {
    web3_validator__WEBPACK_IMPORTED_MODULE_2__.validator.validate(['hex'], [value]);
    // To avoid duplicate code and circular dependency we will
    // use `hexToNumber` implementation from `web3-validator`
    return web3_validator__WEBPACK_IMPORTED_MODULE_2__.utils.hexToNumber(value);
};
/**
 * Converts value to it's number representation @alias `hexToNumber`
 */
const toDecimal = hexToNumber;
/**
 * Converts value to it's hex representation
 * @param value - Value to be converted
 * @param hexstrict - Add padding to converted value if odd, to make it hexstrict
 * @returns - The hex representation of the input value
 *
 * @example
 * ```ts
 * console.log(web3.utils.numberToHex(10));
 * > "0xa"
 * ```
 */
const numberToHex = (value, hexstrict) => {
    if (typeof value !== 'bigint')
        web3_validator__WEBPACK_IMPORTED_MODULE_2__.validator.validate(['int'], [value]);
    // To avoid duplicate code and circular dependency we will
    // use `numberToHex` implementation from `web3-validator`
    let updatedValue = web3_validator__WEBPACK_IMPORTED_MODULE_2__.utils.numberToHex(value);
    if (hexstrict) {
        if (!updatedValue.startsWith('-') && updatedValue.length % 2 === 1) {
            // To avoid duplicate a circular dependency we will not be using the padLeft method
            updatedValue = '0x0'.concat(updatedValue.slice(2));
        }
        else if (updatedValue.length % 2 === 0 && updatedValue.startsWith('-'))
            updatedValue = '-0x0'.concat(updatedValue.slice(3));
    }
    return updatedValue;
};
/**
 * Converts value to it's hex representation @alias `numberToHex`
 *
 */
const fromDecimal = numberToHex;
/**
 * Converts value to it's decimal representation in string
 * @param value - Hex string to be converted
 * @returns - The decimal representation of the input value
 *
 * @example
 * ```ts
 * console.log(web3.utils.hexToNumberString('0xa'));
 * > "10"
 * ```
 */
const hexToNumberString = (data) => hexToNumber(data).toString();
/**
 * Should be called to get hex representation (prefixed by 0x) of utf8 string
 * @param str - Utf8 string to be converted
 * @returns - The hex representation of the input string
 *
 * @example
 * ```ts
 * console.log(utf8ToHex('web3.js'));
 * > "0x776562332e6a73"
 * ```
 *
 */
const utf8ToHex = (str) => {
    web3_validator__WEBPACK_IMPORTED_MODULE_2__.validator.validate(['string'], [str]);
    // To be compatible with 1.x trim null character
    // eslint-disable-next-line no-control-regex
    let strWithoutNullCharacter = str.replace(/^(?:\u0000)/, '');
    // eslint-disable-next-line no-control-regex
    strWithoutNullCharacter = strWithoutNullCharacter.replace(/(?:\u0000)$/, '');
    return bytesToHex(new TextEncoder().encode(strWithoutNullCharacter));
};
/**
 * @alias utf8ToHex
 */
const fromUtf8 = utf8ToHex;
/**
 * @alias utf8ToHex
 */
const stringToHex = utf8ToHex;
/**
 * Should be called to get utf8 from it's hex representation
 * @param str - Hex string to be converted
 * @returns - Utf8 string
 *
 * @example
 * ```ts
 * console.log(web3.utils.hexToUtf8('0x48656c6c6f20576f726c64'));
 * > Hello World
 * ```
 */
const hexToUtf8 = (str) => (0,ethereum_cryptography_utils_js__WEBPACK_IMPORTED_MODULE_1__.bytesToUtf8)(hexToBytes(str));
/**
 * @alias hexToUtf8
 */
const toUtf8 = (input) => {
    if (typeof input === 'string') {
        return hexToUtf8(input);
    }
    web3_validator__WEBPACK_IMPORTED_MODULE_2__.validator.validate(['bytes'], [input]);
    return (0,ethereum_cryptography_utils_js__WEBPACK_IMPORTED_MODULE_1__.bytesToUtf8)(input);
};
const utf8ToBytes = ethereum_cryptography_utils_js__WEBPACK_IMPORTED_MODULE_1__.utf8ToBytes;
/**
 * @alias hexToUtf8
 */
const hexToString = hexToUtf8;
/**
 * Should be called to get hex representation (prefixed by 0x) of ascii string
 * @param str - String to be converted to hex
 * @returns - Hex string
 *
 * @example
 * ```ts
 * console.log(web3.utils.asciiToHex('Hello World'));
 * > 0x48656c6c6f20576f726c64
 * ```
 */
const asciiToHex = (str) => {
    web3_validator__WEBPACK_IMPORTED_MODULE_2__.validator.validate(['string'], [str]);
    let hexString = '';
    for (let i = 0; i < str.length; i += 1) {
        const hexCharCode = str.charCodeAt(i).toString(16);
        // might need a leading 0
        hexString += hexCharCode.length % 2 !== 0 ? `0${hexCharCode}` : hexCharCode;
    }
    return `0x${hexString}`;
};
/**
 * @alias asciiToHex
 */
const fromAscii = asciiToHex;
/**
 * Should be called to get ascii from it's hex representation
 * @param str - Hex string to be converted to ascii
 * @returns - Ascii string
 *
 * @example
 * ```ts
 * console.log(web3.utils.hexToAscii('0x48656c6c6f20576f726c64'));
 * > Hello World
 * ```
 */
const hexToAscii = (str) => {
    const decoder = new TextDecoder('ascii');
    return decoder.decode(hexToBytes(str));
};
/**
 * @alias hexToAscii
 */
const toAscii = hexToAscii;
/**
 * Auto converts any given value into it's hex representation.
 * @param value - Value to be converted to hex
 * @param returnType - If true, it will return the type of the value
 *
 * @example
 * ```ts
 * console.log(web3.utils.toHex(10));
 * > 0xa
 *
 * console.log(web3.utils.toHex('0x123', true));
 * > bytes
 *```
 */
const toHex = (value, returnType) => {
    if (typeof value === 'string' && (0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isAddress)(value)) {
        return returnType ? 'address' : `0x${value.toLowerCase().replace(/^0x/i, '')}`;
    }
    if (typeof value === 'boolean') {
        // eslint-disable-next-line no-nested-ternary
        return returnType ? 'bool' : value ? '0x01' : '0x00';
    }
    if (typeof value === 'number') {
        // eslint-disable-next-line no-nested-ternary
        return returnType ? (value < 0 ? 'int256' : 'uint256') : numberToHex(value);
    }
    if (typeof value === 'bigint') {
        return returnType ? 'bigint' : numberToHex(value);
    }
    if ((0,_uint8array_js__WEBPACK_IMPORTED_MODULE_4__.isUint8Array)(value)) {
        return returnType ? 'bytes' : bytesToHex(value);
    }
    if (typeof value === 'object' && !!value) {
        return returnType ? 'string' : utf8ToHex(JSON.stringify(value));
    }
    if (typeof value === 'string') {
        if (value.startsWith('-0x') || value.startsWith('-0X')) {
            return returnType ? 'int256' : numberToHex(value);
        }
        if ((0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isHexStrict)(value)) {
            return returnType ? 'bytes' : value;
        }
        if ((0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isHex)(value) && !(0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isInt)(value) && !(0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isUInt)(value)) {
            return returnType ? 'bytes' : `0x${value}`;
        }
        if ((0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isHex)(value) && !(0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isInt)(value) && (0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isUInt)(value)) {
            // This condition seems problematic because meeting
            // both conditions `!isInt(value) && isUInt(value)` should be impossible.
            // But a value pass for those conditions: "101611154195520776335741463917853444671577865378275924493376429267637792638729"
            // Note that according to the docs: it is supposed to be treated as a string (https://docs.web3js.org/guides/web3_upgrade_guide/x/web3_utils_migration_guide#conversion-to-hex)
            // In short, the strange is that isInt(value) is false but isUInt(value) is true for the value above.
            // TODO: isUInt(value) should be investigated.
            // However, if `toHex('101611154195520776335741463917853444671577865378275924493376429267637792638729', true)` is called, it will return `true`.
            // But, if `toHex('101611154195520776335741463917853444671577865378275924493376429267637792638729')` is called, it will throw inside `numberToHex`.
            return returnType ? 'uint' : numberToHex(value);
        }
        if (!Number.isFinite(value)) {
            return returnType ? 'string' : utf8ToHex(value);
        }
    }
    throw new web3_errors__WEBPACK_IMPORTED_MODULE_3__.HexProcessingError(value);
};
/**
 * Converts any given value into it's number representation, if possible, else into it's bigint representation.
 * @param value - The value to convert
 * @returns - Returns the value in number or bigint representation
 *
 * @example
 * ```ts
 * console.log(web3.utils.toNumber(1));
 * > 1
 * console.log(web3.utils.toNumber(Number.MAX_SAFE_INTEGER));
 * > 9007199254740991
 *
 * console.log(web3.utils.toNumber(BigInt(Number.MAX_SAFE_INTEGER)));
 * > 9007199254740991
 *
 * console.log(web3.utils.toNumber(BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1)));
 * > 9007199254740992n
 *
 * ```
 */
const toNumber = (value) => {
    if (typeof value === 'number') {
        if (value > 1e20) {
            console.warn(PrecisionLossWarning);
            // JavaScript converts numbers >= 10^21 to scientific notation when coerced to strings,
            // leading to potential parsing errors and incorrect representations.
            // For instance, String(10000000000000000000000) yields '1e+22'.
            // Using BigInt prevents this
            return BigInt(value);
        }
        return value;
    }
    if (typeof value === 'bigint') {
        return value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER
            ? Number(value)
            : value;
    }
    if (typeof value === 'string' && (0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isHexStrict)(value)) {
        return hexToNumber(value);
    }
    try {
        return toNumber(BigInt(value));
    }
    catch (_a) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_3__.InvalidNumberError(value);
    }
};
/**
 * Auto converts any given value into it's bigint representation
 *
 * @param value - The value to convert
 * @returns - Returns the value in bigint representation

 * @example
 * ```ts
 * console.log(web3.utils.toBigInt(1));
 * > 1n
 * ```
 */
const toBigInt = (value) => {
    if (typeof value === 'number') {
        return BigInt(value);
    }
    if (typeof value === 'bigint') {
        return value;
    }
    // isHex passes for dec, too
    if (typeof value === 'string' && (0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isHex)(value)) {
        if (value.startsWith('-')) {
            return -BigInt(value.substring(1));
        }
        return BigInt(value);
    }
    throw new web3_errors__WEBPACK_IMPORTED_MODULE_3__.InvalidNumberError(value);
};
/**
 * Takes a number of wei and converts it to any other ether unit.
 * @param number - The value in wei
 * @param unit - The unit to convert to
 * @returns - Returns the converted value in the given unit
 *
 * @example
 * ```ts
 * console.log(web3.utils.fromWei("1", "ether"));
 * > 0.000000000000000001
 *
 * console.log(web3.utils.fromWei("1", "shannon"));
 * > 0.000000001
 * ```
 */
const fromWei = (number, unit) => {
    let denomination;
    if (typeof unit === 'string') {
        denomination = ethUnitMap[unit];
        if (!denomination) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_3__.InvalidUnitError(unit);
        }
    }
    else {
        if (unit < 0 || !Number.isInteger(unit)) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_3__.InvalidIntegerError(unit);
        }
        denomination = (0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.bigintPower)(BigInt(10), BigInt(unit));
    }
    // value in wei would always be integer
    // 13456789, 1234
    const value = String(toNumber(number));
    // count number of zeros in denomination
    // 1000000 -> 6
    const numberOfZerosInDenomination = denomination.toString().length - 1;
    if (numberOfZerosInDenomination <= 0) {
        return value.toString();
    }
    // pad the value with required zeros
    // 13456789 -> 13456789, 1234 -> 001234
    const zeroPaddedValue = value.padStart(numberOfZerosInDenomination, '0');
    // get the integer part of value by counting number of zeros from start
    // 13456789 -> '13'
    // 001234 -> ''
    const integer = zeroPaddedValue.slice(0, -numberOfZerosInDenomination);
    // get the fraction part of value by counting number of zeros backward
    // 13456789 -> '456789'
    // 001234 -> '001234'
    const fraction = zeroPaddedValue.slice(-numberOfZerosInDenomination).replace(/\.?0+$/, '');
    if (integer === '') {
        return fraction ? `0.${fraction}` : '0';
    }
    if (fraction === '') {
        return integer;
    }
    const updatedValue = `${integer}.${fraction}`;
    return updatedValue.slice(0, integer.length + numberOfZerosInDenomination + 1);
};
/**
 * Takes a number of a unit and converts it to wei.
 *
 * @param number - The number to convert.
 * @param unit - {@link EtherUnits} The unit of the number passed.
 * @returns The number converted to wei.
 *
 * @example
 * ```ts
 * console.log(web3.utils.toWei("0.001", "ether"));
 * > 1000000000000000 //(wei)
 * ```
 */
// todo in 1.x unit defaults to 'ether'
const toWei = (number, unit) => {
    web3_validator__WEBPACK_IMPORTED_MODULE_2__.validator.validate(['number'], [number]);
    let denomination;
    if (typeof unit === 'string') {
        denomination = ethUnitMap[unit];
        if (!denomination) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_3__.InvalidUnitError(unit);
        }
    }
    else {
        if (unit < 0 || !Number.isInteger(unit)) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_3__.InvalidIntegerError(unit);
        }
        denomination = (0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.bigintPower)(BigInt(10), BigInt(unit));
    }
    let parsedNumber = number;
    if (typeof parsedNumber === 'number') {
        if (parsedNumber < 1e-15) {
            console.warn(PrecisionLossWarning);
        }
        if (parsedNumber > 1e20) {
            console.warn(PrecisionLossWarning);
            parsedNumber = BigInt(parsedNumber);
        }
        else {
            // in case there is a decimal point, we need to convert it to string
            parsedNumber = parsedNumber.toLocaleString('fullwide', {
                useGrouping: false,
                maximumFractionDigits: 20,
            });
        }
    }
    // if value is decimal e.g. 24.56 extract `integer` and `fraction` part
    // to avoid `fraction` to be null use `concat` with empty string
    const [integer, fraction] = String(typeof parsedNumber === 'string' && !(0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isHexStrict)(parsedNumber)
        ? parsedNumber
        : toNumber(parsedNumber))
        .split('.')
        .concat('');
    // join the value removing `.` from
    // 24.56 -> 2456
    const value = BigInt(`${integer}${fraction}`);
    // multiply value with denomination
    // 2456 * 1000000 -> 2456000000
    const updatedValue = value * denomination;
    // check if whole number was passed in
    const decimals = fraction.length;
    if (decimals === 0) {
        return updatedValue.toString();
    }
    // trim the value to remove extra zeros
    return updatedValue.toString().slice(0, -decimals);
};
/**
 * Will convert an upper or lowercase Ethereum address to a checksum address.
 * @param address - An address string
 * @returns	The checksum address
 * @example
 * ```ts
 * web3.utils.toChecksumAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d');
 * > "0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d"
 * ```
 */
const toChecksumAddress = (address) => {
    if (!(0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isAddress)(address, false)) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_3__.InvalidAddressError(address);
    }
    const lowerCaseAddress = address.toLowerCase().replace(/^0x/i, '');
    // calling `Uint8Array.from` because `noble-hashes` checks with `instanceof Uint8Array` that fails in some edge cases:
    // 	https://github.com/paulmillr/noble-hashes/issues/25#issuecomment-1750106284
    const hash = web3_validator__WEBPACK_IMPORTED_MODULE_2__.utils.uint8ArrayToHexString((0,ethereum_cryptography_keccak_js__WEBPACK_IMPORTED_MODULE_0__.keccak256)(web3_validator__WEBPACK_IMPORTED_MODULE_2__.utils.ensureIfUint8Array(utf8ToBytes(lowerCaseAddress))));
    if ((0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isNullish)(hash) ||
        hash === '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470')
        return ''; // // EIP-1052 if hash is equal to c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470, keccak was given empty data
    let checksumAddress = '0x';
    const addressHash = hash.replace(/^0x/i, '');
    for (let i = 0; i < lowerCaseAddress.length; i += 1) {
        // If ith character is 8 to f then make it uppercase
        if (parseInt(addressHash[i], 16) > 7) {
            checksumAddress += lowerCaseAddress[i].toUpperCase();
        }
        else {
            checksumAddress += lowerCaseAddress[i];
        }
    }
    return checksumAddress;
};
const toBool = (value) => {
    if (typeof value === 'boolean') {
        return value;
    }
    if (typeof value === 'number' && (value === 0 || value === 1)) {
        return Boolean(value);
    }
    if (typeof value === 'bigint' && (value === BigInt(0) || value === BigInt(1))) {
        return Boolean(value);
    }
    if (typeof value === 'string' &&
        !(0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isHexStrict)(value) &&
        (value === '1' || value === '0' || value === 'false' || value === 'true')) {
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
        return Boolean(Number(value));
    }
    if (typeof value === 'string' && (0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isHexStrict)(value) && (value === '0x1' || value === '0x0')) {
        return Boolean(toNumber(value));
    }
    throw new web3_errors__WEBPACK_IMPORTED_MODULE_3__.InvalidBooleanError(value);
};
//# sourceMappingURL=converters.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/event_emitter.js":
/*!**********************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/event_emitter.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventEmitter: () => (/* binding */ EventEmitter)
/* harmony export */ });
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.mjs");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/* eslint-disable max-classes-per-file */

/**
 * This class copy the behavior of Node.js EventEmitter class.
 * It is used to provide the same interface for the browser environment.
 */
class EventEmitter extends eventemitter3__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        // must be defined for backwards compatibility
        this.maxListeners = Number.MAX_SAFE_INTEGER;
    }
    setMaxListeners(maxListeners) {
        this.maxListeners = maxListeners;
        return this;
    }
    getMaxListeners() {
        return this.maxListeners;
    }
}
//# sourceMappingURL=event_emitter.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/formatter.js":
/*!******************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/formatter.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convert: () => (/* binding */ convert),
/* harmony export */   convertScalarValue: () => (/* binding */ convertScalarValue),
/* harmony export */   format: () => (/* binding */ format),
/* harmony export */   isDataFormat: () => (/* binding */ isDataFormat)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var web3_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-types */ "./node_modules/web3-types/lib/esm/index.js");
/* harmony import */ var web3_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! web3-validator */ "./node_modules/web3-validator/lib/esm/index.js");
/* harmony import */ var _converters_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./converters.js */ "./node_modules/web3-utils/lib/esm/converters.js");
/* harmony import */ var _objects_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./objects.js */ "./node_modules/web3-utils/lib/esm/objects.js");
/* harmony import */ var _string_manipulation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./string_manipulation.js */ "./node_modules/web3-utils/lib/esm/string_manipulation.js");
/* harmony import */ var _uint8array_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./uint8array.js */ "./node_modules/web3-utils/lib/esm/uint8array.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/







const { parseBaseType } = web3_validator__WEBPACK_IMPORTED_MODULE_2__.utils;
const isDataFormat = (dataFormat) => typeof dataFormat === 'object' &&
    !(0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isNullish)(dataFormat) &&
    'number' in dataFormat &&
    'bytes' in dataFormat;
/**
 * Finds the schema that corresponds to a specific data path within a larger JSON schema.
 * It works by iterating over the dataPath array and traversing the JSON schema one step at a time until it reaches the end of the path.
 *
 * @param schema - represents a JSON schema, which is an object that describes the structure of JSON data
 * @param dataPath - represents an array of strings that specifies the path to the data within the JSON schema
 * @param oneOfPath - represents an optional array of two-element tuples that specifies the "oneOf" option to choose, if the schema has oneOf and the data path can match multiple subschemas
 * @returns the JSON schema that matches the data path
 *
 */
const findSchemaByDataPath = (schema, dataPath, oneOfPath = []) => {
    let result = Object.assign({}, schema);
    let previousDataPath;
    for (const dataPart of dataPath) {
        if (result.oneOf && previousDataPath) {
            const currentDataPath = previousDataPath;
            const path = oneOfPath.find(([key]) => key === currentDataPath);
            if (path && path[0] === previousDataPath) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                result = result.oneOf[path[1]];
            }
        }
        if (!result.properties && !result.items) {
            return undefined;
        }
        if (result.properties) {
            result = result.properties[dataPart];
        }
        else if (result.items && result.items.properties) {
            const node = result.items.properties;
            result = node[dataPart];
        }
        else if (result.items && (0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isObject)(result.items)) {
            result = result.items;
        }
        else if (result.items && Array.isArray(result.items)) {
            result = result.items[parseInt(dataPart, 10)];
        }
        if (result && dataPart)
            previousDataPath = dataPart;
    }
    return result;
};
/**
 * Converts a value depending on the format
 * @param value - value to convert
 * @param ethType - The type of the value to be parsed
 * @param format - The format to be converted to
 * @returns - The value converted to the specified format
 */
const convertScalarValue = (value, ethType, format) => {
    try {
        const { baseType, baseTypeSize } = parseBaseType(ethType);
        if (baseType === 'int' || baseType === 'uint') {
            switch (format.number) {
                case web3_types__WEBPACK_IMPORTED_MODULE_1__.FMT_NUMBER.NUMBER:
                    return Number((0,_converters_js__WEBPACK_IMPORTED_MODULE_3__.toBigInt)(value));
                case web3_types__WEBPACK_IMPORTED_MODULE_1__.FMT_NUMBER.HEX:
                    return (0,_converters_js__WEBPACK_IMPORTED_MODULE_3__.numberToHex)((0,_converters_js__WEBPACK_IMPORTED_MODULE_3__.toBigInt)(value));
                case web3_types__WEBPACK_IMPORTED_MODULE_1__.FMT_NUMBER.STR:
                    return (0,_converters_js__WEBPACK_IMPORTED_MODULE_3__.toBigInt)(value).toString();
                case web3_types__WEBPACK_IMPORTED_MODULE_1__.FMT_NUMBER.BIGINT:
                    return (0,_converters_js__WEBPACK_IMPORTED_MODULE_3__.toBigInt)(value);
                default:
                    throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.FormatterError(`Invalid format: ${String(format.number)}`);
            }
        }
        if (baseType === 'bytes') {
            let paddedValue;
            if (baseTypeSize) {
                if (typeof value === 'string')
                    paddedValue = (0,_string_manipulation_js__WEBPACK_IMPORTED_MODULE_5__.padLeft)(value, baseTypeSize * 2);
                else if ((0,_uint8array_js__WEBPACK_IMPORTED_MODULE_6__.isUint8Array)(value)) {
                    paddedValue = (0,_uint8array_js__WEBPACK_IMPORTED_MODULE_6__.uint8ArrayConcat)(new Uint8Array(baseTypeSize - value.length), value);
                }
            }
            else {
                paddedValue = value;
            }
            switch (format.bytes) {
                case web3_types__WEBPACK_IMPORTED_MODULE_1__.FMT_BYTES.HEX:
                    return (0,_converters_js__WEBPACK_IMPORTED_MODULE_3__.bytesToHex)((0,_converters_js__WEBPACK_IMPORTED_MODULE_3__.bytesToUint8Array)(paddedValue));
                case web3_types__WEBPACK_IMPORTED_MODULE_1__.FMT_BYTES.UINT8ARRAY:
                    return (0,_converters_js__WEBPACK_IMPORTED_MODULE_3__.bytesToUint8Array)(paddedValue);
                default:
                    throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.FormatterError(`Invalid format: ${String(format.bytes)}`);
            }
        }
        if (baseType === 'string') {
            return String(value);
        }
    }
    catch (error) {
        // If someone didn't use `eth` keyword we can return original value
        // as the scope of this code is formatting not validation
        return value;
    }
    return value;
};
const convertArray = ({ value, schemaProp, schema, object, key, dataPath, format, oneOfPath = [], }) => {
    var _a, _b;
    // If value is an array
    if (Array.isArray(value)) {
        let _schemaProp = schemaProp;
        // TODO This is a naive approach to solving the issue of
        // a schema using oneOf. This chunk of code was intended to handle
        // BlockSchema.transactions
        // TODO BlockSchema.transactions are not being formatted
        if ((schemaProp === null || schemaProp === void 0 ? void 0 : schemaProp.oneOf) !== undefined) {
            // The following code is basically saying:
            // if the schema specifies oneOf, then we are to loop
            // over each possible schema and check if they type of the schema
            // matches the type of value[0], and if so we use the oneOfSchemaProp
            // as the schema for formatting
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            schemaProp.oneOf.forEach((oneOfSchemaProp, index) => {
                var _a, _b;
                if (!Array.isArray(schemaProp === null || schemaProp === void 0 ? void 0 : schemaProp.items) &&
                    ((typeof value[0] === 'object' &&
                        ((_a = oneOfSchemaProp === null || oneOfSchemaProp === void 0 ? void 0 : oneOfSchemaProp.items) === null || _a === void 0 ? void 0 : _a.type) === 'object') ||
                        (typeof value[0] === 'string' &&
                            ((_b = oneOfSchemaProp === null || oneOfSchemaProp === void 0 ? void 0 : oneOfSchemaProp.items) === null || _b === void 0 ? void 0 : _b.type) !== 'object'))) {
                    _schemaProp = oneOfSchemaProp;
                    oneOfPath.push([key, index]);
                }
            });
        }
        if ((0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isNullish)(_schemaProp === null || _schemaProp === void 0 ? void 0 : _schemaProp.items)) {
            // Can not find schema for array item, delete that item
            // eslint-disable-next-line no-param-reassign
            delete object[key];
            dataPath.pop();
            return true;
        }
        // If schema for array items is a single type
        if ((0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isObject)(_schemaProp.items) && !(0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isNullish)(_schemaProp.items.format)) {
            for (let i = 0; i < value.length; i += 1) {
                // eslint-disable-next-line no-param-reassign
                object[key][i] = convertScalarValue(value[i], 
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                (_a = _schemaProp === null || _schemaProp === void 0 ? void 0 : _schemaProp.items) === null || _a === void 0 ? void 0 : _a.format, format);
            }
            dataPath.pop();
            return true;
        }
        // If schema for array items is an object
        if (!Array.isArray(_schemaProp === null || _schemaProp === void 0 ? void 0 : _schemaProp.items) && ((_b = _schemaProp === null || _schemaProp === void 0 ? void 0 : _schemaProp.items) === null || _b === void 0 ? void 0 : _b.type) === 'object') {
            for (const arrObject of value) {
                // eslint-disable-next-line no-use-before-define
                convert(arrObject, schema, dataPath, format, oneOfPath);
            }
            dataPath.pop();
            return true;
        }
        // If schema for array is a tuple
        if (Array.isArray(_schemaProp === null || _schemaProp === void 0 ? void 0 : _schemaProp.items)) {
            for (let i = 0; i < value.length; i += 1) {
                // eslint-disable-next-line no-param-reassign
                object[key][i] = convertScalarValue(value[i], _schemaProp.items[i].format, format);
            }
            dataPath.pop();
            return true;
        }
    }
    return false;
};
/**
 * Converts the data to the specified format
 * @param data - data to convert
 * @param schema - The JSON schema that describes the structure of the data
 * @param dataPath - A string array that specifies the path to the data within the JSON schema
 * @param format  - The format to be converted to
 * @param oneOfPath - An optional array of two-element tuples that specifies the "oneOf" option to choose, if the schema has oneOf and the data path can match multiple subschemas
 * @returns - The data converted to the specified format
 */
const convert = (data, schema, dataPath, format, oneOfPath = []) => {
    var _a;
    // If it's a scalar value
    if (!(0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isObject)(data) && !Array.isArray(data)) {
        return convertScalarValue(data, schema === null || schema === void 0 ? void 0 : schema.format, format);
    }
    const object = data;
    // case when schema is array and `items` is object
    if (Array.isArray(object) &&
        (schema === null || schema === void 0 ? void 0 : schema.type) === 'array' &&
        ((_a = schema === null || schema === void 0 ? void 0 : schema.items) === null || _a === void 0 ? void 0 : _a.type) === 'object') {
        convertArray({
            value: object,
            schemaProp: schema,
            schema,
            object,
            key: '',
            dataPath,
            format,
            oneOfPath,
        });
    }
    else {
        for (const [key, value] of Object.entries(object)) {
            dataPath.push(key);
            let schemaProp = findSchemaByDataPath(schema, dataPath, oneOfPath);
            // If value is a scaler value
            if ((0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isNullish)(schemaProp)) {
                delete object[key];
                dataPath.pop();
                continue;
            }
            // If value is an object, recurse into it
            if ((0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isObject)(value)) {
                convert(value, schema, dataPath, format, oneOfPath);
                dataPath.pop();
                continue;
            }
            // If value is an array
            if (convertArray({
                value,
                schemaProp,
                schema,
                object,
                key,
                dataPath,
                format,
                oneOfPath,
            })) {
                continue;
            }
            // The following code is basically saying:
            // if the schema specifies oneOf, then we are to loop
            // over each possible schema and check if they type of the schema specifies format
            // and if so we use the oneOfSchemaProp as the schema for formatting
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            if ((schemaProp === null || schemaProp === void 0 ? void 0 : schemaProp.format) === undefined && (schemaProp === null || schemaProp === void 0 ? void 0 : schemaProp.oneOf) !== undefined) {
                for (const [_index, oneOfSchemaProp] of schemaProp.oneOf.entries()) {
                    if ((oneOfSchemaProp === null || oneOfSchemaProp === void 0 ? void 0 : oneOfSchemaProp.format) !== undefined) {
                        schemaProp = oneOfSchemaProp;
                        break;
                    }
                }
            }
            object[key] = convertScalarValue(value, schemaProp.format, format);
            dataPath.pop();
        }
    }
    return object;
};
/**
 * Given data that can be interpreted according to the provided schema, returns equivalent data that has been formatted
 * according to the provided return format.
 *
 * @param schema - how to interpret the data
 * @param data - data to be formatted
 * @param returnFormat - how to format the data
 * @returns - formatted data
 *
 * @example
 *
 * ```js
 * import { FMT_NUMBER, utils } from "web3";
 *
 * console.log(
 *   utils.format({ format: "uint" }, "221", { number: FMT_NUMBER.HEX }),
 * );
 * // 0xdd
 * ```
 *
 */
const format = (schema, data, returnFormat = web3_types__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_RETURN_FORMAT) => {
    let dataToParse;
    if ((0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isObject)(data)) {
        dataToParse = (0,_objects_js__WEBPACK_IMPORTED_MODULE_4__.mergeDeep)({}, data);
    }
    else if (Array.isArray(data)) {
        dataToParse = [...data];
    }
    else {
        dataToParse = data;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jsonSchema = (0,web3_validator__WEBPACK_IMPORTED_MODULE_2__.isObject)(schema) ? schema : web3_validator__WEBPACK_IMPORTED_MODULE_2__.utils.ethAbiToJsonSchema(schema);
    if (!jsonSchema.properties && !jsonSchema.items && !jsonSchema.format) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.FormatterError('Invalid json schema for formatting');
    }
    return convert(dataToParse, jsonSchema, [], returnFormat);
};
//# sourceMappingURL=formatter.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/hash.js":
/*!*************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/hash.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   encodePacked: () => (/* binding */ encodePacked),
/* harmony export */   getStorageSlotNumForLongString: () => (/* binding */ getStorageSlotNumForLongString),
/* harmony export */   keccak256: () => (/* binding */ keccak256Wrapper),
/* harmony export */   keccak256Wrapper: () => (/* binding */ keccak256Wrapper),
/* harmony export */   processSolidityEncodePackedArgs: () => (/* binding */ processSolidityEncodePackedArgs),
/* harmony export */   sha3: () => (/* binding */ sha3),
/* harmony export */   sha3Raw: () => (/* binding */ sha3Raw),
/* harmony export */   soliditySha3: () => (/* binding */ soliditySha3),
/* harmony export */   soliditySha3Raw: () => (/* binding */ soliditySha3Raw)
/* harmony export */ });
/* harmony import */ var ethereum_cryptography_keccak_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethereum-cryptography/keccak.js */ "./node_modules/web3-utils/node_modules/ethereum-cryptography/esm/keccak.js");
/* harmony import */ var ethereum_cryptography_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethereum-cryptography/utils.js */ "./node_modules/web3-utils/node_modules/ethereum-cryptography/esm/utils.js");
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var web3_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! web3-validator */ "./node_modules/web3-validator/lib/esm/index.js");
/* harmony import */ var _converters_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./converters.js */ "./node_modules/web3-utils/lib/esm/converters.js");
/* harmony import */ var _string_manipulation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./string_manipulation.js */ "./node_modules/web3-utils/lib/esm/string_manipulation.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * This package provides utility functions for Ethereum dapps and other web3.js packages.
 *
 * For using Utils functions, first install Web3 package using `npm i web3` or `yarn add web3`.
 * After that, Web3 Utils functions will be available as mentioned below.
 * ```ts
 * import { Web3 } from 'web3';
 * const web3 = new Web3();
 *
 * const value = web3.utils.fromWei("1", "ether")
 *
 * ```
 *
 * For using individual package install `web3-utils` package using `npm i web3-utils` or `yarn add web3-utils` and only import required functions.
 * This is more efficient approach for building lightweight applications.
 * ```ts
 * import { fromWei, soliditySha3Raw } from 'web3-utils';
 *
 * console.log(fromWei("1", "ether"));
 * console.log(soliditySha3Raw({ type: "string", value: "helloworld" }))
 *
 * ```
 * @module Utils
 */






const SHA3_EMPTY_BYTES = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
/**
 * A wrapper for ethereum-cryptography/keccak256 to allow hashing a `string` and a `bigint` in addition to `UInt8Array`
 * @param data - the input to hash
 * @returns - the Keccak-256 hash of the input
 *
 * @example
 * ```ts
 * console.log(web3.utils.keccak256Wrapper('web3.js'));
 * > 0x63667efb1961039c9bb0d6ea7a5abdd223a3aca7daa5044ad894226e1f83919a
 *
 * console.log(web3.utils.keccak256Wrapper(1));
 * > 0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6
 *
 * console.log(web3.utils.keccak256Wrapper(0xaf12fd));
 * > 0x358640fd4719fa923525d74ab5ae80a594301aba5543e3492b052bf4598b794c
 * ```
 */
const keccak256Wrapper = (data) => {
    let processedData;
    if (typeof data === 'bigint' || typeof data === 'number') {
        processedData = (0,ethereum_cryptography_utils_js__WEBPACK_IMPORTED_MODULE_1__.utf8ToBytes)(data.toString());
    }
    else if (Array.isArray(data)) {
        processedData = new Uint8Array(data);
    }
    else if (typeof data === 'string' && !(0,web3_validator__WEBPACK_IMPORTED_MODULE_3__.isHexStrict)(data)) {
        processedData = (0,ethereum_cryptography_utils_js__WEBPACK_IMPORTED_MODULE_1__.utf8ToBytes)(data);
    }
    else {
        processedData = (0,_converters_js__WEBPACK_IMPORTED_MODULE_4__.bytesToUint8Array)(data);
    }
    return (0,_converters_js__WEBPACK_IMPORTED_MODULE_4__.bytesToHex)((0,ethereum_cryptography_keccak_js__WEBPACK_IMPORTED_MODULE_0__.keccak256)(web3_validator__WEBPACK_IMPORTED_MODULE_3__.utils.ensureIfUint8Array(processedData)));
};

/**
 * computes the Keccak-256 hash of the input and returns a hexstring
 * @param data - the input to hash
 * @returns - the Keccak-256 hash of the input
 *
 * @example
 * ```ts
 * console.log(web3.utils.sha3('web3.js'));
 * > 0x63667efb1961039c9bb0d6ea7a5abdd223a3aca7daa5044ad894226e1f83919a
 *
 * console.log(web3.utils.sha3(''));
 * > undefined
 * ```
 */
const sha3 = (data) => {
    let updatedData;
    if (typeof data === 'string') {
        if (data.startsWith('0x') && (0,web3_validator__WEBPACK_IMPORTED_MODULE_3__.isHexStrict)(data)) {
            updatedData = (0,_converters_js__WEBPACK_IMPORTED_MODULE_4__.hexToBytes)(data);
        }
        else {
            updatedData = (0,ethereum_cryptography_utils_js__WEBPACK_IMPORTED_MODULE_1__.utf8ToBytes)(data);
        }
    }
    else {
        updatedData = data;
    }
    const hash = keccak256Wrapper(updatedData);
    // EIP-1052 if hash is equal to c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470, keccak was given empty data
    return hash === SHA3_EMPTY_BYTES ? undefined : hash;
};
/**
 * Will calculate the sha3 of the input but does return the hash value instead of null if for example a empty string is passed.
 * @param data - the input to hash
 * @returns - the Keccak-256 hash of the input
 *
 * @example
 * ```ts
 * conosle.log(web3.utils.sha3Raw('web3.js'));
 * > 0x63667efb1961039c9bb0d6ea7a5abdd223a3aca7daa5044ad894226e1f83919a
 *
 * console.log(web3.utils.sha3Raw(''));
 * > 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470
 * ```
 */
const sha3Raw = (data) => {
    const hash = sha3(data);
    if ((0,web3_validator__WEBPACK_IMPORTED_MODULE_3__.isNullish)(hash)) {
        return SHA3_EMPTY_BYTES;
    }
    return hash;
};
/**
 * returns type and value
 * @param arg - the input to return the type and value
 * @returns - the type and value of the input
 */
const getType = (arg) => {
    if (Array.isArray(arg)) {
        throw new Error('Autodetection of array types is not supported.');
    }
    let type;
    let value;
    // if type is given
    if (typeof arg === 'object' &&
        ('t' in arg || 'type' in arg) &&
        ('v' in arg || 'value' in arg)) {
        type = 't' in arg ? arg.t : arg.type;
        value = 'v' in arg ? arg.v : arg.value;
        type = type.toLowerCase() === 'bigint' ? 'int' : type;
    }
    else if (typeof arg === 'bigint') {
        return ['int', arg];
    }
    // otherwise try to guess the type
    else {
        type = (0,_converters_js__WEBPACK_IMPORTED_MODULE_4__.toHex)(arg, true);
        value = (0,_converters_js__WEBPACK_IMPORTED_MODULE_4__.toHex)(arg);
        if (!type.startsWith('int') && !type.startsWith('uint')) {
            type = 'bytes';
        }
    }
    if ((type.startsWith('int') || type.startsWith('uint')) &&
        typeof value === 'string' &&
        !/^(-)?0x/i.test(value)) {
        value = (0,_converters_js__WEBPACK_IMPORTED_MODULE_4__.toBigInt)(value);
    }
    return [type, value];
};
/**
 * returns the type with size if uint or int
 * @param name - the input to return the type with size
 * @returns - the type with size of the input
 */
const elementaryName = (name) => {
    if (name.startsWith('int[')) {
        return `int256${name.slice(3)}`;
    }
    if (name === 'int') {
        return 'int256';
    }
    if (name.startsWith('uint[')) {
        return `uint256'${name.slice(4)}`;
    }
    if (name === 'uint') {
        return 'uint256';
    }
    return name;
};
/**
 * returns the size of the value of type 'byte'
 */
const parseTypeN = (value, typeLength) => {
    const typesize = /^(\d+).*$/.exec(value.slice(typeLength));
    return typesize ? parseInt(typesize[1], 10) : 0;
};
/**
 * returns the bit length of the value
 * @param value - the input to return the bit length
 * @returns - the bit length of the input
 */
const bitLength = (value) => {
    const updatedVal = value.toString(2);
    return updatedVal.length;
};
/**
 * Pads the value based on size and type
 * returns a string of the padded value
 * @param type - the input to pad
 * @returns = the padded value
 */
const solidityPack = (type, val) => {
    const value = val.toString();
    if (type === 'string') {
        if (typeof val === 'string')
            return (0,_converters_js__WEBPACK_IMPORTED_MODULE_4__.utf8ToHex)(val);
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.InvalidStringError(val);
    }
    if (type === 'bool' || type === 'boolean') {
        if (typeof val === 'boolean')
            return val ? '01' : '00';
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.InvalidBooleanError(val);
    }
    if (type === 'address') {
        if (!(0,web3_validator__WEBPACK_IMPORTED_MODULE_3__.isAddress)(value)) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.InvalidAddressError(value);
        }
        return value;
    }
    const name = elementaryName(type);
    if (type.startsWith('uint')) {
        const size = parseTypeN(name, 'uint'.length);
        if (size % 8 || size < 8 || size > 256) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.InvalidSizeError(value);
        }
        const num = (0,_converters_js__WEBPACK_IMPORTED_MODULE_4__.toNumber)(value);
        if (bitLength(num) > size) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.InvalidLargeValueError(value);
        }
        if (num < BigInt(0)) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.InvalidUnsignedIntegerError(value);
        }
        return size ? (0,_string_manipulation_js__WEBPACK_IMPORTED_MODULE_5__.leftPad)(num.toString(16), (size / 8) * 2) : num.toString(16);
    }
    if (type.startsWith('int')) {
        const size = parseTypeN(name, 'int'.length);
        if (size % 8 || size < 8 || size > 256) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.InvalidSizeError(type);
        }
        const num = (0,_converters_js__WEBPACK_IMPORTED_MODULE_4__.toNumber)(value);
        if (bitLength(num) > size) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.InvalidLargeValueError(value);
        }
        if (num < BigInt(0)) {
            return (0,_string_manipulation_js__WEBPACK_IMPORTED_MODULE_5__.toTwosComplement)(num.toString(), (size / 8) * 2);
        }
        return size ? (0,_string_manipulation_js__WEBPACK_IMPORTED_MODULE_5__.leftPad)(num.toString(16), size / 4) : num.toString(16);
    }
    if (name === 'bytes') {
        if (value.replace(/^0x/i, '').length % 2 !== 0) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.InvalidBytesError(value);
        }
        return value;
    }
    if (type.startsWith('bytes')) {
        if (value.replace(/^0x/i, '').length % 2 !== 0) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.InvalidBytesError(value);
        }
        const size = parseTypeN(type, 'bytes'.length);
        if (!size || size < 1 || size > 64 || size < value.replace(/^0x/i, '').length / 2) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.InvalidBytesError(value);
        }
        return (0,_string_manipulation_js__WEBPACK_IMPORTED_MODULE_5__.rightPad)(value, size * 2);
    }
    return '';
};
/**
 * returns a string of the tightly packed value given based on the type
 * @param arg - the input to return the tightly packed value
 * @returns - the tightly packed value
 */
const processSolidityEncodePackedArgs = (arg) => {
    const [type, val] = getType(arg);
    // array case
    if (Array.isArray(val)) {
        // go through each element of the array and use map function to create new hexarg list
        const hexArg = val.map((v) => solidityPack(type, v).replace('0x', ''));
        return hexArg.join('');
    }
    const hexArg = solidityPack(type, val);
    return hexArg.replace('0x', '');
};
/**
 * Encode packed arguments to a hexstring
 */
const encodePacked = (...values) => {
    const hexArgs = values.map(processSolidityEncodePackedArgs);
    return `0x${hexArgs.join('').toLowerCase()}`;
};
/**
 * Will tightly pack values given in the same way solidity would then hash.
 * returns a hash string, or null if input is empty
 * @param values - the input to return the tightly packed values
 * @returns - the keccack246 of the tightly packed values
 *
 * @example
 * ```ts
 * console.log(web3.utils.soliditySha3({ type: "string", value: "31323334" }));
 * > 0xf15f8da2ad27e486d632dc37d24912f634398918d6f9913a0a0ff84e388be62b
 * ```
 */
const soliditySha3 = (...values) => sha3(encodePacked(...values));
/**
 * Will tightly pack values given in the same way solidity would then hash.
 * returns a hash string, if input is empty will return `0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470`
 * @param values - the input to return the tightly packed values
 * @returns - the keccack246 of the tightly packed values
 *
 * @example
 * ```ts
 * console.log(web3.utils.soliditySha3Raw({ type: "string", value: "helloworld" }))
 * > 0xfa26db7ca85ead399216e7c6316bc50ed24393c3122b582735e7f3b0f91b93f0
 * ```
 */
const soliditySha3Raw = (...values) => sha3Raw(encodePacked(...values));
/**
 * Get slot number for storage long string in contract. Basically for getStorage method
 * returns slotNumber where will data placed
 * @param mainSlotNumber - the slot number where will be stored hash of long string
 * @returns - the slot number where will be stored long string
 */
const getStorageSlotNumForLongString = (mainSlotNumber) => sha3(`0x${(typeof mainSlotNumber === 'number'
    ? mainSlotNumber.toString()
    : mainSlotNumber).padStart(64, '0')}`);
//# sourceMappingURL=hash.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/index.js":
/*!**************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChunkResponseParser: () => (/* reexport safe */ _chunk_response_parser_js__WEBPACK_IMPORTED_MODULE_11__.ChunkResponseParser),
/* harmony export */   Eip1193Provider: () => (/* reexport safe */ _web3_eip1193_provider_js__WEBPACK_IMPORTED_MODULE_13__.Eip1193Provider),
/* harmony export */   EventEmitter: () => (/* reexport safe */ _event_emitter_js__WEBPACK_IMPORTED_MODULE_1__.EventEmitter),
/* harmony export */   SocketProvider: () => (/* reexport safe */ _socket_provider_js__WEBPACK_IMPORTED_MODULE_14__.SocketProvider),
/* harmony export */   Web3DeferredPromise: () => (/* reexport safe */ _web3_deferred_promise_js__WEBPACK_IMPORTED_MODULE_10__.Web3DeferredPromise),
/* harmony export */   asciiToHex: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.asciiToHex),
/* harmony export */   bytesToHex: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.bytesToHex),
/* harmony export */   bytesToUint8Array: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.bytesToUint8Array),
/* harmony export */   checkAddressCheckSum: () => (/* reexport safe */ _validation_js__WEBPACK_IMPORTED_MODULE_2__.checkAddressCheckSum),
/* harmony export */   compareBlockNumbers: () => (/* reexport safe */ _validation_js__WEBPACK_IMPORTED_MODULE_2__.compareBlockNumbers),
/* harmony export */   convert: () => (/* reexport safe */ _formatter_js__WEBPACK_IMPORTED_MODULE_3__.convert),
/* harmony export */   convertScalarValue: () => (/* reexport safe */ _formatter_js__WEBPACK_IMPORTED_MODULE_3__.convertScalarValue),
/* harmony export */   encodePacked: () => (/* reexport safe */ _hash_js__WEBPACK_IMPORTED_MODULE_4__.encodePacked),
/* harmony export */   ethUnitMap: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.ethUnitMap),
/* harmony export */   format: () => (/* reexport safe */ _formatter_js__WEBPACK_IMPORTED_MODULE_3__.format),
/* harmony export */   fromAscii: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.fromAscii),
/* harmony export */   fromDecimal: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.fromDecimal),
/* harmony export */   fromTwosComplement: () => (/* reexport safe */ _string_manipulation_js__WEBPACK_IMPORTED_MODULE_6__.fromTwosComplement),
/* harmony export */   fromUtf8: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.fromUtf8),
/* harmony export */   fromWei: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.fromWei),
/* harmony export */   getStorageSlotNumForLongString: () => (/* reexport safe */ _hash_js__WEBPACK_IMPORTED_MODULE_4__.getStorageSlotNumForLongString),
/* harmony export */   hexToAscii: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.hexToAscii),
/* harmony export */   hexToBytes: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.hexToBytes),
/* harmony export */   hexToNumber: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.hexToNumber),
/* harmony export */   hexToNumberString: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.hexToNumberString),
/* harmony export */   hexToString: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.hexToString),
/* harmony export */   hexToUtf8: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.hexToUtf8),
/* harmony export */   isAddress: () => (/* reexport safe */ _validation_js__WEBPACK_IMPORTED_MODULE_2__.isAddress),
/* harmony export */   isBatchRequest: () => (/* reexport safe */ _json_rpc_js__WEBPACK_IMPORTED_MODULE_9__.isBatchRequest),
/* harmony export */   isBatchResponse: () => (/* reexport safe */ _json_rpc_js__WEBPACK_IMPORTED_MODULE_9__.isBatchResponse),
/* harmony export */   isBloom: () => (/* reexport safe */ _validation_js__WEBPACK_IMPORTED_MODULE_2__.isBloom),
/* harmony export */   isContractAddressInBloom: () => (/* reexport safe */ _validation_js__WEBPACK_IMPORTED_MODULE_2__.isContractAddressInBloom),
/* harmony export */   isContractInitOptions: () => (/* reexport safe */ _validation_js__WEBPACK_IMPORTED_MODULE_2__.isContractInitOptions),
/* harmony export */   isDataFormat: () => (/* reexport safe */ _formatter_js__WEBPACK_IMPORTED_MODULE_3__.isDataFormat),
/* harmony export */   isHex: () => (/* reexport safe */ _validation_js__WEBPACK_IMPORTED_MODULE_2__.isHex),
/* harmony export */   isHexStrict: () => (/* reexport safe */ _validation_js__WEBPACK_IMPORTED_MODULE_2__.isHexStrict),
/* harmony export */   isInBloom: () => (/* reexport safe */ _validation_js__WEBPACK_IMPORTED_MODULE_2__.isInBloom),
/* harmony export */   isNullish: () => (/* reexport safe */ _validation_js__WEBPACK_IMPORTED_MODULE_2__.isNullish),
/* harmony export */   isPromise: () => (/* reexport safe */ _promise_helpers_js__WEBPACK_IMPORTED_MODULE_8__.isPromise),
/* harmony export */   isResponseRpcError: () => (/* reexport safe */ _json_rpc_js__WEBPACK_IMPORTED_MODULE_9__.isResponseRpcError),
/* harmony export */   isResponseWithError: () => (/* reexport safe */ _json_rpc_js__WEBPACK_IMPORTED_MODULE_9__.isResponseWithError),
/* harmony export */   isResponseWithNotification: () => (/* reexport safe */ _json_rpc_js__WEBPACK_IMPORTED_MODULE_9__.isResponseWithNotification),
/* harmony export */   isResponseWithResult: () => (/* reexport safe */ _json_rpc_js__WEBPACK_IMPORTED_MODULE_9__.isResponseWithResult),
/* harmony export */   isSubscriptionResult: () => (/* reexport safe */ _json_rpc_js__WEBPACK_IMPORTED_MODULE_9__.isSubscriptionResult),
/* harmony export */   isTopic: () => (/* reexport safe */ _validation_js__WEBPACK_IMPORTED_MODULE_2__.isTopic),
/* harmony export */   isTopicInBloom: () => (/* reexport safe */ _validation_js__WEBPACK_IMPORTED_MODULE_2__.isTopicInBloom),
/* harmony export */   isUint8Array: () => (/* reexport safe */ _uint8array_js__WEBPACK_IMPORTED_MODULE_15__.isUint8Array),
/* harmony export */   isUserEthereumAddressInBloom: () => (/* reexport safe */ _validation_js__WEBPACK_IMPORTED_MODULE_2__.isUserEthereumAddressInBloom),
/* harmony export */   isValidResponse: () => (/* reexport safe */ _json_rpc_js__WEBPACK_IMPORTED_MODULE_9__.isValidResponse),
/* harmony export */   jsonRpc: () => (/* reexport module object */ _json_rpc_js__WEBPACK_IMPORTED_MODULE_9__),
/* harmony export */   keccak256: () => (/* reexport safe */ _hash_js__WEBPACK_IMPORTED_MODULE_4__.keccak256),
/* harmony export */   keccak256Wrapper: () => (/* reexport safe */ _hash_js__WEBPACK_IMPORTED_MODULE_4__.keccak256Wrapper),
/* harmony export */   leftPad: () => (/* reexport safe */ _string_manipulation_js__WEBPACK_IMPORTED_MODULE_6__.leftPad),
/* harmony export */   mergeDeep: () => (/* reexport safe */ _objects_js__WEBPACK_IMPORTED_MODULE_7__.mergeDeep),
/* harmony export */   numberToHex: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.numberToHex),
/* harmony export */   padLeft: () => (/* reexport safe */ _string_manipulation_js__WEBPACK_IMPORTED_MODULE_6__.padLeft),
/* harmony export */   padRight: () => (/* reexport safe */ _string_manipulation_js__WEBPACK_IMPORTED_MODULE_6__.padRight),
/* harmony export */   pollTillDefined: () => (/* reexport safe */ _promise_helpers_js__WEBPACK_IMPORTED_MODULE_8__.pollTillDefined),
/* harmony export */   pollTillDefinedAndReturnIntervalId: () => (/* reexport safe */ _promise_helpers_js__WEBPACK_IMPORTED_MODULE_8__.pollTillDefinedAndReturnIntervalId),
/* harmony export */   processSolidityEncodePackedArgs: () => (/* reexport safe */ _hash_js__WEBPACK_IMPORTED_MODULE_4__.processSolidityEncodePackedArgs),
/* harmony export */   randomBytes: () => (/* reexport safe */ _random_js__WEBPACK_IMPORTED_MODULE_5__.randomBytes),
/* harmony export */   randomHex: () => (/* reexport safe */ _random_js__WEBPACK_IMPORTED_MODULE_5__.randomHex),
/* harmony export */   rejectIfConditionAtInterval: () => (/* reexport safe */ _promise_helpers_js__WEBPACK_IMPORTED_MODULE_8__.rejectIfConditionAtInterval),
/* harmony export */   rejectIfTimeout: () => (/* reexport safe */ _promise_helpers_js__WEBPACK_IMPORTED_MODULE_8__.rejectIfTimeout),
/* harmony export */   rightPad: () => (/* reexport safe */ _string_manipulation_js__WEBPACK_IMPORTED_MODULE_6__.rightPad),
/* harmony export */   setRequestIdStart: () => (/* reexport safe */ _json_rpc_js__WEBPACK_IMPORTED_MODULE_9__.setRequestIdStart),
/* harmony export */   sha3: () => (/* reexport safe */ _hash_js__WEBPACK_IMPORTED_MODULE_4__.sha3),
/* harmony export */   sha3Raw: () => (/* reexport safe */ _hash_js__WEBPACK_IMPORTED_MODULE_4__.sha3Raw),
/* harmony export */   soliditySha3: () => (/* reexport safe */ _hash_js__WEBPACK_IMPORTED_MODULE_4__.soliditySha3),
/* harmony export */   soliditySha3Raw: () => (/* reexport safe */ _hash_js__WEBPACK_IMPORTED_MODULE_4__.soliditySha3Raw),
/* harmony export */   stringToHex: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.stringToHex),
/* harmony export */   toAscii: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.toAscii),
/* harmony export */   toBatchPayload: () => (/* reexport safe */ _json_rpc_js__WEBPACK_IMPORTED_MODULE_9__.toBatchPayload),
/* harmony export */   toBigInt: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.toBigInt),
/* harmony export */   toBool: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.toBool),
/* harmony export */   toChecksumAddress: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.toChecksumAddress),
/* harmony export */   toDecimal: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.toDecimal),
/* harmony export */   toHex: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.toHex),
/* harmony export */   toNumber: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.toNumber),
/* harmony export */   toPayload: () => (/* reexport safe */ _json_rpc_js__WEBPACK_IMPORTED_MODULE_9__.toPayload),
/* harmony export */   toTwosComplement: () => (/* reexport safe */ _string_manipulation_js__WEBPACK_IMPORTED_MODULE_6__.toTwosComplement),
/* harmony export */   toUtf8: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.toUtf8),
/* harmony export */   toWei: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.toWei),
/* harmony export */   uint8ArrayConcat: () => (/* reexport safe */ _uint8array_js__WEBPACK_IMPORTED_MODULE_15__.uint8ArrayConcat),
/* harmony export */   uint8ArrayEquals: () => (/* reexport safe */ _uint8array_js__WEBPACK_IMPORTED_MODULE_15__.uint8ArrayEquals),
/* harmony export */   utf8ToBytes: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.utf8ToBytes),
/* harmony export */   utf8ToHex: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.utf8ToHex),
/* harmony export */   uuidV4: () => (/* reexport safe */ _uuid_js__WEBPACK_IMPORTED_MODULE_12__.uuidV4),
/* harmony export */   validateResponse: () => (/* reexport safe */ _json_rpc_js__WEBPACK_IMPORTED_MODULE_9__.validateResponse),
/* harmony export */   waitWithTimeout: () => (/* reexport safe */ _promise_helpers_js__WEBPACK_IMPORTED_MODULE_8__.waitWithTimeout)
/* harmony export */ });
/* harmony import */ var _converters_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./converters.js */ "./node_modules/web3-utils/lib/esm/converters.js");
/* harmony import */ var _event_emitter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event_emitter.js */ "./node_modules/web3-utils/lib/esm/event_emitter.js");
/* harmony import */ var _validation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation.js */ "./node_modules/web3-utils/lib/esm/validation.js");
/* harmony import */ var _formatter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formatter.js */ "./node_modules/web3-utils/lib/esm/formatter.js");
/* harmony import */ var _hash_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hash.js */ "./node_modules/web3-utils/lib/esm/hash.js");
/* harmony import */ var _random_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./random.js */ "./node_modules/web3-utils/lib/esm/random.js");
/* harmony import */ var _string_manipulation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./string_manipulation.js */ "./node_modules/web3-utils/lib/esm/string_manipulation.js");
/* harmony import */ var _objects_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./objects.js */ "./node_modules/web3-utils/lib/esm/objects.js");
/* harmony import */ var _promise_helpers_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./promise_helpers.js */ "./node_modules/web3-utils/lib/esm/promise_helpers.js");
/* harmony import */ var _json_rpc_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./json_rpc.js */ "./node_modules/web3-utils/lib/esm/json_rpc.js");
/* harmony import */ var _web3_deferred_promise_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./web3_deferred_promise.js */ "./node_modules/web3-utils/lib/esm/web3_deferred_promise.js");
/* harmony import */ var _chunk_response_parser_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./chunk_response_parser.js */ "./node_modules/web3-utils/lib/esm/chunk_response_parser.js");
/* harmony import */ var _uuid_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./uuid.js */ "./node_modules/web3-utils/lib/esm/uuid.js");
/* harmony import */ var _web3_eip1193_provider_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./web3_eip1193_provider.js */ "./node_modules/web3-utils/lib/esm/web3_eip1193_provider.js");
/* harmony import */ var _socket_provider_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./socket_provider.js */ "./node_modules/web3-utils/lib/esm/socket_provider.js");
/* harmony import */ var _uint8array_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./uint8array.js */ "./node_modules/web3-utils/lib/esm/uint8array.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

















//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/json_rpc.js":
/*!*****************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/json_rpc.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBatchRequest: () => (/* binding */ isBatchRequest),
/* harmony export */   isBatchResponse: () => (/* binding */ isBatchResponse),
/* harmony export */   isResponseRpcError: () => (/* binding */ isResponseRpcError),
/* harmony export */   isResponseWithError: () => (/* binding */ isResponseWithError),
/* harmony export */   isResponseWithNotification: () => (/* binding */ isResponseWithNotification),
/* harmony export */   isResponseWithResult: () => (/* binding */ isResponseWithResult),
/* harmony export */   isSubscriptionResult: () => (/* binding */ isSubscriptionResult),
/* harmony export */   isValidResponse: () => (/* binding */ isValidResponse),
/* harmony export */   setRequestIdStart: () => (/* binding */ setRequestIdStart),
/* harmony export */   toBatchPayload: () => (/* binding */ toBatchPayload),
/* harmony export */   toPayload: () => (/* binding */ toPayload),
/* harmony export */   validateResponse: () => (/* binding */ validateResponse)
/* harmony export */ });
/* harmony import */ var web3_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-validator */ "./node_modules/web3-validator/lib/esm/index.js");
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var _uuid_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uuid.js */ "./node_modules/web3-utils/lib/esm/uuid.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/



// check if code is a valid rpc server error code
const isResponseRpcError = (rpcError) => {
    const errorCode = rpcError.error.code;
    return web3_errors__WEBPACK_IMPORTED_MODULE_1__.rpcErrorsMap.has(errorCode) || (errorCode >= -32099 && errorCode <= -32000);
};
const isResponseWithResult = (response) => !Array.isArray(response) &&
    !!response &&
    response.jsonrpc === '2.0' &&
    // JSON RPC consider "null" as valid response
    'result' in response &&
    (0,web3_validator__WEBPACK_IMPORTED_MODULE_0__.isNullish)(response.error) &&
    (typeof response.id === 'number' || typeof response.id === 'string');
// To avoid circular package dependency, copied to code here. If you update this please update same function in `response_errors.ts`
const isResponseWithError = (response) => !Array.isArray(response) &&
    response.jsonrpc === '2.0' &&
    !!response &&
    (0,web3_validator__WEBPACK_IMPORTED_MODULE_0__.isNullish)(response.result) &&
    // JSON RPC consider "null" as valid response
    'error' in response &&
    (typeof response.id === 'number' || typeof response.id === 'string');
const isResponseWithNotification = (response) => !Array.isArray(response) &&
    !!response &&
    response.jsonrpc === '2.0' &&
    !(0,web3_validator__WEBPACK_IMPORTED_MODULE_0__.isNullish)(response.params) &&
    !(0,web3_validator__WEBPACK_IMPORTED_MODULE_0__.isNullish)(response.method);
const isSubscriptionResult = (response) => !Array.isArray(response) &&
    !!response &&
    response.jsonrpc === '2.0' &&
    'id' in response &&
    // JSON RPC consider "null" as valid response
    'result' in response;
const validateResponse = (response) => isResponseWithResult(response) || isResponseWithError(response);
const isValidResponse = (response) => Array.isArray(response) ? response.every(validateResponse) : validateResponse(response);
const isBatchResponse = (response) => Array.isArray(response) && response.length > 0 && isValidResponse(response);
// internal optional variable to increment and use for the jsonrpc `id`
let requestIdSeed;
/**
 * Optionally use to make the jsonrpc `id` start from a specific number.
 * Without calling this function, the `id` will be filled with a Uuid.
 * But after this being called with a number, the `id` will be a number starting from the provided `start` variable.
 * However, if `undefined` was passed to this function, the `id` will be a Uuid again.
 * @param start - a number to start incrementing from.
 * 	Or `undefined` to use a new Uuid (this is the default behavior)
 */
const setRequestIdStart = (start) => {
    requestIdSeed = start;
};
const toPayload = (request) => {
    var _a, _b, _c, _d;
    if (typeof requestIdSeed !== 'undefined') {
        requestIdSeed += 1;
    }
    return {
        jsonrpc: (_a = request.jsonrpc) !== null && _a !== void 0 ? _a : '2.0',
        id: (_c = (_b = request.id) !== null && _b !== void 0 ? _b : requestIdSeed) !== null && _c !== void 0 ? _c : (0,_uuid_js__WEBPACK_IMPORTED_MODULE_2__.uuidV4)(),
        method: request.method,
        params: (_d = request.params) !== null && _d !== void 0 ? _d : undefined,
    };
};
const toBatchPayload = (requests) => requests.map(request => toPayload(request));
const isBatchRequest = (request) => Array.isArray(request) && request.length > 0;
//# sourceMappingURL=json_rpc.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/objects.js":
/*!****************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/objects.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeDeep: () => (/* binding */ mergeDeep)
/* harmony export */ });
/* harmony import */ var web3_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-types */ "./node_modules/web3-types/lib/esm/index.js");
/* harmony import */ var web3_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-validator */ "./node_modules/web3-validator/lib/esm/index.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/


const isIterable = (item) => typeof item === 'object' &&
    !(0,web3_validator__WEBPACK_IMPORTED_MODULE_1__.isNullish)(item) &&
    !Array.isArray(item) &&
    !(item instanceof web3_types__WEBPACK_IMPORTED_MODULE_0__.TypedArray);
// The following code is a derivative work of the code from the "LiskHQ/lisk-sdk" project,
// which is licensed under Apache version 2.
/**
 * Deep merge two objects.
 * @param destination - The destination object.
 * @param sources - An array of source objects.
 * @returns - The merged object.
 */
const mergeDeep = (destination, ...sources) => {
    if (!isIterable(destination)) {
        return destination;
    }
    const result = Object.assign({}, destination); // clone deep here
    for (const src of sources) {
        // const src = { ..._src };
        // eslint-disable-next-line no-restricted-syntax
        for (const key in src) {
            if (isIterable(src[key])) {
                if (!result[key]) {
                    result[key] = {};
                }
                result[key] = mergeDeep(result[key], src[key]);
            }
            else if (!(0,web3_validator__WEBPACK_IMPORTED_MODULE_1__.isNullish)(src[key]) && Object.hasOwnProperty.call(src, key)) {
                if (Array.isArray(src[key]) || src[key] instanceof web3_types__WEBPACK_IMPORTED_MODULE_0__.TypedArray) {
                    result[key] = src[key].slice(0);
                }
                else {
                    result[key] = src[key];
                }
            }
        }
    }
    return result;
};
//# sourceMappingURL=objects.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/promise_helpers.js":
/*!************************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/promise_helpers.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isPromise: () => (/* binding */ isPromise),
/* harmony export */   pollTillDefined: () => (/* binding */ pollTillDefined),
/* harmony export */   pollTillDefinedAndReturnIntervalId: () => (/* binding */ pollTillDefinedAndReturnIntervalId),
/* harmony export */   rejectIfConditionAtInterval: () => (/* binding */ rejectIfConditionAtInterval),
/* harmony export */   rejectIfTimeout: () => (/* binding */ rejectIfTimeout),
/* harmony export */   waitWithTimeout: () => (/* binding */ waitWithTimeout)
/* harmony export */ });
/* harmony import */ var web3_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-validator */ "./node_modules/web3-validator/lib/esm/index.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * An alternative to the node function `isPromise` that exists in `util/types` because it is not available on the browser.
 * @param object - to check if it is a `Promise`
 * @returns `true` if it is an `object` or a `function` that has a `then` function. And returns `false` otherwise.
 */
function isPromise(object) {
    return ((typeof object === 'object' || typeof object === 'function') &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        typeof object.then === 'function');
}
/**
 * Wait for a promise but interrupt it if it did not resolve within a given timeout.
 * If the timeout reached, before the promise code resolve, either throw an error if an error object was provided, or return `undefined`.
 * @param awaitable - The promise or function to wait for.
 * @param timeout - The timeout in milliseconds.
 * @param error - (Optional) The error to throw if the timeout reached.
 */
function waitWithTimeout(awaitable, timeout, error) {
    return __awaiter(this, void 0, void 0, function* () {
        let timeoutId;
        const result = yield Promise.race([
            awaitable instanceof Promise ? awaitable : awaitable(),
            new Promise((resolve, reject) => {
                timeoutId = setTimeout(() => (error ? reject(error) : resolve(undefined)), timeout);
            }),
        ]);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        if (result instanceof Error) {
            throw result;
        }
        return result;
    });
}
/**
 * Repeatedly calls an async function with a given interval until the result of the function is defined (not undefined or null),
 * or until a timeout is reached. It returns promise and intervalId.
 * @param func - The function to call.
 * @param interval - The interval in milliseconds.
 */
function pollTillDefinedAndReturnIntervalId(func, interval) {
    let intervalId;
    const polledRes = new Promise((resolve, reject) => {
        intervalId = setInterval((function intervalCallbackFunc() {
            (() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const res = yield waitWithTimeout(func, interval);
                    if (!(0,web3_validator__WEBPACK_IMPORTED_MODULE_0__.isNullish)(res)) {
                        clearInterval(intervalId);
                        resolve(res);
                    }
                }
                catch (error) {
                    clearInterval(intervalId);
                    reject(error);
                }
            }))();
            return intervalCallbackFunc;
        })(), // this will immediate invoke first call
        interval);
    });
    return [polledRes, intervalId];
}
/**
 * Repeatedly calls an async function with a given interval until the result of the function is defined (not undefined or null),
 * or until a timeout is reached.
 * pollTillDefinedAndReturnIntervalId() function should be used instead of pollTillDefined if you need IntervalId in result.
 * This function will be deprecated in next major release so use pollTillDefinedAndReturnIntervalId().
 * @param func - The function to call.
 * @param interval - The interval in milliseconds.
 */
function pollTillDefined(func, interval) {
    return __awaiter(this, void 0, void 0, function* () {
        return pollTillDefinedAndReturnIntervalId(func, interval)[0];
    });
}
/**
 * Enforce a timeout on a promise, so that it can be rejected if it takes too long to complete
 * @param timeout - The timeout to enforced in milliseconds.
 * @param error - The error to throw if the timeout is reached.
 * @returns A tuple of the timeout id and the promise that will be rejected if the timeout is reached.
 *
 * @example
 * ```ts
 * const [timerId, promise] = web3.utils.rejectIfTimeout(100, new Error('time out'));
 * ```
 */
function rejectIfTimeout(timeout, error) {
    let timeoutId;
    const rejectOnTimeout = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
            reject(error);
        }, timeout);
    });
    return [timeoutId, rejectOnTimeout];
}
/**
 * Sets an interval that repeatedly executes the given cond function with the specified interval between each call.
 * If the condition is met, the interval is cleared and a Promise that rejects with the returned value is returned.
 * @param cond - The function/condition to call.
 * @param interval - The interval in milliseconds.
 * @returns - an array with the interval ID and the Promise.
 */
function rejectIfConditionAtInterval(cond, interval) {
    let intervalId;
    const rejectIfCondition = new Promise((_, reject) => {
        intervalId = setInterval(() => {
            (() => __awaiter(this, void 0, void 0, function* () {
                const error = yield cond();
                if (error) {
                    clearInterval(intervalId);
                    reject(error);
                }
            }))();
        }, interval);
    });
    return [intervalId, rejectIfCondition];
}
//# sourceMappingURL=promise_helpers.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/random.js":
/*!***************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/random.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   randomBytes: () => (/* binding */ randomBytes),
/* harmony export */   randomHex: () => (/* binding */ randomHex)
/* harmony export */ });
/* harmony import */ var ethereum_cryptography_random_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethereum-cryptography/random.js */ "./node_modules/web3-utils/node_modules/ethereum-cryptography/esm/random.js");
/* harmony import */ var _converters_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./converters.js */ "./node_modules/web3-utils/lib/esm/converters.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @module Utils
 */


/**
 * Returns a random byte array by the given bytes size
 * @param size - The size of the random byte array returned
 * @returns - random byte array
 *
 * @example
 * ```ts
 * console.log(web3.utils.randomBytes(32));
 * > Uint8Array(32) [
 *       93, 172, 226,  32,  33, 176, 156, 156,
 *       182,  30, 240,   2,  69,  96, 174, 197,
 *       33, 136, 194, 241, 197, 156, 110, 111,
 *       66,  87,  17,  88,  67,  48, 245, 183
 *    ]
 * ```
 */
const randomBytes = (size) => (0,ethereum_cryptography_random_js__WEBPACK_IMPORTED_MODULE_0__.getRandomBytesSync)(size);
/**
 * Returns a random hex string by the given bytes size
 * @param byteSize - The size of the random hex string returned
 * @returns - random hex string
 *
 * ```ts
 * console.log(web3.utils.randomHex(32));
 * > 0x139f5b88b72a25eab053d3b57fe1f8a9dbc62a526b1cb1774d0d7db1c3e7ce9e
 * ```
 */
const randomHex = (byteSize) => (0,_converters_js__WEBPACK_IMPORTED_MODULE_1__.bytesToHex)(randomBytes(byteSize));
//# sourceMappingURL=random.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/socket_provider.js":
/*!************************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/socket_provider.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SocketProvider: () => (/* binding */ SocketProvider)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var _web3_eip1193_provider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./web3_eip1193_provider.js */ "./node_modules/web3-utils/lib/esm/web3_eip1193_provider.js");
/* harmony import */ var _chunk_response_parser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk_response_parser.js */ "./node_modules/web3-utils/lib/esm/chunk_response_parser.js");
/* harmony import */ var _validation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation.js */ "./node_modules/web3-utils/lib/esm/validation.js");
/* harmony import */ var _web3_deferred_promise_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web3_deferred_promise.js */ "./node_modules/web3-utils/lib/esm/web3_deferred_promise.js");
/* harmony import */ var _json_rpc_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./json_rpc.js */ "./node_modules/web3-utils/lib/esm/json_rpc.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






const DEFAULT_RECONNECTION_OPTIONS = {
    autoReconnect: true,
    delay: 5000,
    maxAttempts: 5,
};
const NORMAL_CLOSE_CODE = 1000; // https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close
class SocketProvider extends _web3_eip1193_provider_js__WEBPACK_IMPORTED_MODULE_1__.Eip1193Provider {
    get SocketConnection() {
        return this._socketConnection;
    }
    /**
     * This is an abstract class for implementing a socket provider (e.g. WebSocket, IPC). It extends the EIP-1193 provider {@link EIP1193Provider}.
     * @param socketPath - The path to the socket (e.g. /ipc/path or ws://localhost:8546)
     * @param socketOptions - The options for the socket connection. Its type is supposed to be specified in the inherited classes.
     * @param reconnectOptions - The options for the socket reconnection {@link ReconnectOptions}
     */
    constructor(socketPath, socketOptions, reconnectOptions) {
        super();
        this._connectionStatus = 'connecting';
        // Message handlers. Due to bounding of `this` and removing the listeners we have to keep it's reference.
        this._onMessageHandler = this._onMessage.bind(this);
        this._onOpenHandler = this._onConnect.bind(this);
        this._onCloseHandler = this._onCloseEvent.bind(this);
        this._onErrorHandler = this._onError.bind(this);
        if (!this._validateProviderPath(socketPath))
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.InvalidClientError(socketPath);
        this._socketPath = socketPath;
        this._socketOptions = socketOptions;
        this._reconnectOptions = Object.assign(Object.assign({}, DEFAULT_RECONNECTION_OPTIONS), (reconnectOptions !== null && reconnectOptions !== void 0 ? reconnectOptions : {}));
        this._pendingRequestsQueue = new Map();
        this._sentRequestsQueue = new Map();
        this._init();
        this.connect();
        this.chunkResponseParser = new _chunk_response_parser_js__WEBPACK_IMPORTED_MODULE_2__.ChunkResponseParser(this._eventEmitter, this._reconnectOptions.autoReconnect);
        this.chunkResponseParser.onError(() => {
            this._clearQueues();
        });
        this.isReconnecting = false;
    }
    _init() {
        this._reconnectAttempts = 0;
    }
    /**
     * Try to establish a connection to the socket
     */
    connect() {
        try {
            this._openSocketConnection();
            this._connectionStatus = 'connecting';
            this._addSocketListeners();
        }
        catch (e) {
            if (!this.isReconnecting) {
                this._connectionStatus = 'disconnected';
                if (e && e.message) {
                    throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.ConnectionError(`Error while connecting to ${this._socketPath}. Reason: ${e.message}`);
                }
                else {
                    throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.InvalidClientError(this._socketPath);
                }
            }
            else {
                setImmediate(() => {
                    this._reconnect();
                });
            }
        }
    }
    // eslint-disable-next-line class-methods-use-this
    _validateProviderPath(path) {
        return !!path;
    }
    /**
     *
     * @returns the pendingRequestQueue size
     */
    // eslint-disable-next-line class-methods-use-this
    getPendingRequestQueueSize() {
        return this._pendingRequestsQueue.size;
    }
    /**
     *
     * @returns the sendPendingRequests size
     */
    // eslint-disable-next-line class-methods-use-this
    getSentRequestsQueueSize() {
        return this._sentRequestsQueue.size;
    }
    /**
     *
     * @returns `true` if the socket supports subscriptions
     */
    // eslint-disable-next-line class-methods-use-this
    supportsSubscriptions() {
        return true;
    }
    on(type, listener) {
        this._eventEmitter.on(type, listener);
    }
    once(type, listener) {
        this._eventEmitter.once(type, listener);
    }
    removeListener(type, listener) {
        this._eventEmitter.removeListener(type, listener);
    }
    _onDisconnect(code, data) {
        this._connectionStatus = 'disconnected';
        super._onDisconnect(code, data);
    }
    /**
     * Disconnects the socket
     * @param code - The code to be sent to the server
     * @param data - The data to be sent to the server
     */
    disconnect(code, data) {
        const disconnectCode = code !== null && code !== void 0 ? code : NORMAL_CLOSE_CODE;
        this._removeSocketListeners();
        if (this.getStatus() !== 'disconnected') {
            this._closeSocketConnection(disconnectCode, data);
        }
        this._onDisconnect(disconnectCode, data);
    }
    /**
     * Safely disconnects the socket, async and waits for request size to be 0 before disconnecting
     * @param forceDisconnect - If true, will clear queue after 5 attempts of waiting for both pending and sent queue to be 0
     * @param ms - Determines the ms of setInterval
     * @param code - The code to be sent to the server
     * @param data - The data to be sent to the server
     */
    safeDisconnect(code_1, data_1) {
        return __awaiter(this, arguments, void 0, function* (code, data, forceDisconnect = false, ms = 1000) {
            let retryAttempt = 0;
            const checkQueue = () => __awaiter(this, void 0, void 0, function* () {
                return new Promise(resolve => {
                    const interval = setInterval(() => {
                        if (forceDisconnect && retryAttempt >= 5) {
                            this.clearQueues();
                        }
                        if (this.getPendingRequestQueueSize() === 0 &&
                            this.getSentRequestsQueueSize() === 0) {
                            clearInterval(interval);
                            resolve(true);
                        }
                        retryAttempt += 1;
                    }, ms);
                });
            });
            yield checkQueue();
            this.disconnect(code, data);
        });
    }
    /**
     * Removes all listeners for the specified event type.
     * @param type - The event type to remove the listeners for
     */
    removeAllListeners(type) {
        this._eventEmitter.removeAllListeners(type);
    }
    _onError(event) {
        // do not emit error while trying to reconnect
        if (this.isReconnecting) {
            this._reconnect();
        }
        else {
            this._eventEmitter.emit('error', event);
        }
    }
    /**
     * Resets the socket, removing all listeners and pending requests
     */
    reset() {
        this._sentRequestsQueue.clear();
        this._pendingRequestsQueue.clear();
        this._init();
        this._removeSocketListeners();
        this._addSocketListeners();
    }
    _reconnect() {
        if (this.isReconnecting) {
            return;
        }
        this.isReconnecting = true;
        if (this._sentRequestsQueue.size > 0) {
            this._sentRequestsQueue.forEach((request, key) => {
                request.deferredPromise.reject(new web3_errors__WEBPACK_IMPORTED_MODULE_0__.PendingRequestsOnReconnectingError());
                this._sentRequestsQueue.delete(key);
            });
        }
        if (this._reconnectAttempts < this._reconnectOptions.maxAttempts) {
            this._reconnectAttempts += 1;
            setTimeout(() => {
                this._removeSocketListeners();
                this.connect(); // this can error out
                this.isReconnecting = false;
            }, this._reconnectOptions.delay);
        }
        else {
            this.isReconnecting = false;
            this._clearQueues();
            this._removeSocketListeners();
            this._eventEmitter.emit('error', new web3_errors__WEBPACK_IMPORTED_MODULE_0__.MaxAttemptsReachedOnReconnectingError(this._reconnectOptions.maxAttempts));
        }
    }
    /**
     *  Creates a request object to be sent to the server
     */
    request(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0,_validation_js__WEBPACK_IMPORTED_MODULE_3__.isNullish)(this._socketConnection)) {
                throw new Error('Connection is undefined');
            }
            // if socket disconnected - open connection
            if (this.getStatus() === 'disconnected') {
                this.connect();
            }
            const requestId = _json_rpc_js__WEBPACK_IMPORTED_MODULE_5__.isBatchRequest(request)
                ? request[0].id
                : request.id;
            if (!requestId) {
                throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.Web3WSProviderError('Request Id not defined');
            }
            if (this._sentRequestsQueue.has(requestId)) {
                throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.RequestAlreadySentError(requestId);
            }
            const deferredPromise = new _web3_deferred_promise_js__WEBPACK_IMPORTED_MODULE_4__.Web3DeferredPromise();
            deferredPromise.catch(error => {
                this._eventEmitter.emit('error', error);
            });
            const reqItem = {
                payload: request,
                deferredPromise,
            };
            if (this.getStatus() === 'connecting') {
                this._pendingRequestsQueue.set(requestId, reqItem);
                return reqItem.deferredPromise;
            }
            this._sentRequestsQueue.set(requestId, reqItem);
            try {
                this._sendToSocket(reqItem.payload);
            }
            catch (error) {
                this._sentRequestsQueue.delete(requestId);
                this._eventEmitter.emit('error', error);
            }
            return deferredPromise;
        });
    }
    _onConnect() {
        this._connectionStatus = 'connected';
        this._reconnectAttempts = 0;
        super._onConnect();
        this._sendPendingRequests();
    }
    _sendPendingRequests() {
        for (const [id, value] of this._pendingRequestsQueue.entries()) {
            try {
                this._sendToSocket(value.payload);
                this._pendingRequestsQueue.delete(id);
                this._sentRequestsQueue.set(id, value);
            }
            catch (error) {
                // catches if sendTosocket fails
                this._pendingRequestsQueue.delete(id);
                this._eventEmitter.emit('error', error);
            }
        }
    }
    _onMessage(event) {
        const responses = this._parseResponses(event);
        if ((0,_validation_js__WEBPACK_IMPORTED_MODULE_3__.isNullish)(responses) || responses.length === 0) {
            return;
        }
        for (const response of responses) {
            if (_json_rpc_js__WEBPACK_IMPORTED_MODULE_5__.isResponseWithNotification(response) &&
                response.method.endsWith('_subscription')) {
                this._eventEmitter.emit('message', response);
                return;
            }
            const requestId = _json_rpc_js__WEBPACK_IMPORTED_MODULE_5__.isBatchResponse(response)
                ? response[0].id
                : response.id;
            const requestItem = this._sentRequestsQueue.get(requestId);
            if (!requestItem) {
                return;
            }
            if (_json_rpc_js__WEBPACK_IMPORTED_MODULE_5__.isBatchResponse(response) ||
                _json_rpc_js__WEBPACK_IMPORTED_MODULE_5__.isResponseWithResult(response) ||
                _json_rpc_js__WEBPACK_IMPORTED_MODULE_5__.isResponseWithError(response)) {
                this._eventEmitter.emit('message', response);
                requestItem.deferredPromise.resolve(response);
            }
            this._sentRequestsQueue.delete(requestId);
        }
    }
    clearQueues(event) {
        this._clearQueues(event);
    }
    _clearQueues(event) {
        if (this._pendingRequestsQueue.size > 0) {
            this._pendingRequestsQueue.forEach((request, key) => {
                request.deferredPromise.reject(new web3_errors__WEBPACK_IMPORTED_MODULE_0__.ConnectionNotOpenError(event));
                this._pendingRequestsQueue.delete(key);
            });
        }
        if (this._sentRequestsQueue.size > 0) {
            this._sentRequestsQueue.forEach((request, key) => {
                request.deferredPromise.reject(new web3_errors__WEBPACK_IMPORTED_MODULE_0__.ConnectionNotOpenError(event));
                this._sentRequestsQueue.delete(key);
            });
        }
        this._removeSocketListeners();
    }
}
//# sourceMappingURL=socket_provider.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/string_manipulation.js":
/*!****************************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/string_manipulation.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromTwosComplement: () => (/* binding */ fromTwosComplement),
/* harmony export */   leftPad: () => (/* binding */ leftPad),
/* harmony export */   padLeft: () => (/* binding */ padLeft),
/* harmony export */   padRight: () => (/* binding */ padRight),
/* harmony export */   rightPad: () => (/* binding */ rightPad),
/* harmony export */   toTwosComplement: () => (/* binding */ toTwosComplement)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var web3_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-validator */ "./node_modules/web3-validator/lib/esm/index.js");
/* harmony import */ var _converters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./converters.js */ "./node_modules/web3-utils/lib/esm/converters.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/



/**
 * Adds a padding on the left of a string, if value is a integer or bigInt will be converted to a hex string.
 * @param value - The value to be padded.
 * @param characterAmount - The amount of characters the string should have.
 * @param sign - The sign to be added (default is 0).
 * @returns The padded string.
 *
 * @example
 * ```ts
 *
 * console.log(web3.utils.padLeft('0x123', 10));
 * >0x0000000123
 * ```
 */
const padLeft = (value, characterAmount, sign = '0') => {
    // To avoid duplicate code and circular dependency we will
    // use `padLeft` implementation from `web3-validator`
    if (typeof value === 'string') {
        if (!(0,web3_validator__WEBPACK_IMPORTED_MODULE_1__.isHexStrict)(value)) {
            return value.padStart(characterAmount, sign);
        }
        return web3_validator__WEBPACK_IMPORTED_MODULE_1__.utils.padLeft(value, characterAmount, sign);
    }
    web3_validator__WEBPACK_IMPORTED_MODULE_1__.validator.validate(['int'], [value]);
    return web3_validator__WEBPACK_IMPORTED_MODULE_1__.utils.padLeft(value, characterAmount, sign);
};
/**
 * Adds a padding on the right of a string, if value is a integer or bigInt will be converted to a hex string.
 * @param value - The value to be padded.
 * @param characterAmount - The amount of characters the string should have.
 * @param sign - The sign to be added (default is 0).
 * @returns The padded string.
 *
 * @example
 * ```ts
 * console.log(web3.utils.padRight('0x123', 10));
 * > 0x1230000000
 *
 * console.log(web3.utils.padRight('0x123', 10, '1'));
 * > 0x1231111111
 * ```
 */
const padRight = (value, characterAmount, sign = '0') => {
    if (typeof value === 'string' && !(0,web3_validator__WEBPACK_IMPORTED_MODULE_1__.isHexStrict)(value)) {
        return value.padEnd(characterAmount, sign);
    }
    const hexString = typeof value === 'string' && (0,web3_validator__WEBPACK_IMPORTED_MODULE_1__.isHexStrict)(value) ? value : (0,_converters_js__WEBPACK_IMPORTED_MODULE_2__.numberToHex)(value);
    const prefixLength = hexString.startsWith('-') ? 3 : 2;
    web3_validator__WEBPACK_IMPORTED_MODULE_1__.validator.validate([hexString.startsWith('-') ? 'int' : 'uint'], [value]);
    return hexString.padEnd(characterAmount + prefixLength, sign);
};
/**
 * Adds a padding on the right of a string, if value is a integer or bigInt will be converted to a hex string. @alias `padRight`
 */
const rightPad = padRight;
/**
 * Adds a padding on the left of a string, if value is a integer or bigInt will be converted to a hex string. @alias `padLeft`
 */
const leftPad = padLeft;
/**
 * Converts a negative number into the two’s complement and return a hexstring of 64 nibbles.
 * @param value - The value to be converted.
 * @param nibbleWidth - The nibble width of the hex string (default is 64).
 *
 * @returns The hex string of the two’s complement.
 *
 * @example
 * ```ts
 * console.log(web3.utils.toTwosComplement(13, 32));
 * > 0x0000000000000000000000000000000d
 *
 * console.log(web3.utils.toTwosComplement('-0x1', 32));
 * > 0xffffffffffffffffffffffffffffffff
 *
 * console.log(web3.utils.toTwosComplement(BigInt('9007199254740992'), 32));
 * > 0x00000000000000000020000000000000
 * ```
 */
const toTwosComplement = (value, nibbleWidth = 64) => {
    web3_validator__WEBPACK_IMPORTED_MODULE_1__.validator.validate(['int'], [value]);
    const val = (0,_converters_js__WEBPACK_IMPORTED_MODULE_2__.toNumber)(value);
    if (val >= 0)
        return padLeft((0,_converters_js__WEBPACK_IMPORTED_MODULE_2__.toHex)(val), nibbleWidth);
    const largestBit = (0,web3_validator__WEBPACK_IMPORTED_MODULE_1__.bigintPower)(BigInt(2), BigInt(nibbleWidth * 4));
    if (-val >= largestBit) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.NibbleWidthError(`value: ${value}, nibbleWidth: ${nibbleWidth}`);
    }
    const updatedVal = BigInt(val);
    const complement = updatedVal + largestBit;
    return padLeft((0,_converters_js__WEBPACK_IMPORTED_MODULE_2__.numberToHex)(complement), nibbleWidth);
};
/**
 * Converts the twos complement into a decimal number or big int.
 * @param value - The value to be converted.
 * @param nibbleWidth - The nibble width of the hex string (default is 64).
 * @returns The decimal number or big int.
 *
 * @example
 * ```ts
 * console.log(web3.utils.fromTwosComplement('0x0000000000000000000000000000000d', 32'));
 * > 13
 *
 * console.log(web3.utils.fromTwosComplement('0x00000000000000000020000000000000', 32));
 * > 9007199254740992n
 * ```
 */
const fromTwosComplement = (value, nibbleWidth = 64) => {
    web3_validator__WEBPACK_IMPORTED_MODULE_1__.validator.validate(['int'], [value]);
    const val = (0,_converters_js__WEBPACK_IMPORTED_MODULE_2__.toNumber)(value);
    if (val < 0)
        return val;
    const largestBit = Math.ceil(Math.log(Number(val)) / Math.log(2));
    if (largestBit > nibbleWidth * 4)
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.NibbleWidthError(`value: "${value}", nibbleWidth: "${nibbleWidth}"`);
    // check the largest bit to see if negative
    if (nibbleWidth * 4 !== largestBit)
        return val;
    const complement = (0,web3_validator__WEBPACK_IMPORTED_MODULE_1__.bigintPower)(BigInt(2), BigInt(nibbleWidth) * BigInt(4));
    return (0,_converters_js__WEBPACK_IMPORTED_MODULE_2__.toNumber)(BigInt(val) - complement);
};
//# sourceMappingURL=string_manipulation.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/uint8array.js":
/*!*******************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/uint8array.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isUint8Array: () => (/* binding */ isUint8Array),
/* harmony export */   uint8ArrayConcat: () => (/* binding */ uint8ArrayConcat),
/* harmony export */   uint8ArrayEquals: () => (/* binding */ uint8ArrayEquals)
/* harmony export */ });
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
function isUint8Array(data) {
    var _a, _b;
    return (data instanceof Uint8Array ||
        ((_a = data === null || data === void 0 ? void 0 : data.constructor) === null || _a === void 0 ? void 0 : _a.name) === 'Uint8Array' ||
        ((_b = data === null || data === void 0 ? void 0 : data.constructor) === null || _b === void 0 ? void 0 : _b.name) === 'Buffer');
}
function uint8ArrayConcat(...parts) {
    const length = parts.reduce((prev, part) => {
        const agg = prev + part.length;
        return agg;
    }, 0);
    const result = new Uint8Array(length);
    let offset = 0;
    for (const part of parts) {
        result.set(part, offset);
        offset += part.length;
    }
    return result;
}
/**
 * Returns true if the two passed Uint8Arrays have the same content
 */
function uint8ArrayEquals(a, b) {
    if (a === b) {
        return true;
    }
    if (a.byteLength !== b.byteLength) {
        return false;
    }
    for (let i = 0; i < a.byteLength; i += 1) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=uint8array.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/uuid.js":
/*!*************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/uuid.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   uuidV4: () => (/* binding */ uuidV4)
/* harmony export */ });
/* harmony import */ var _converters_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./converters.js */ "./node_modules/web3-utils/lib/esm/converters.js");
/* harmony import */ var _random_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./random.js */ "./node_modules/web3-utils/lib/esm/random.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @module Utils
 */


/**
 * Generate a version 4 (random) uuid
 * https://github.com/uuidjs/uuid/blob/main/src/v4.js#L5
 * @returns - A version 4 uuid of the form xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx
 * @example
 * ```ts
 * console.log(web3.utils.uuidV4());
 * > "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
 * ```
 */
const uuidV4 = () => {
    const bytes = (0,_random_js__WEBPACK_IMPORTED_MODULE_1__.randomBytes)(16);
    // https://github.com/ethers-io/ethers.js/blob/ce8f1e4015c0f27bf178238770b1325136e3351a/packages/json-wallets/src.ts/utils.ts#L54
    // Section: 4.1.3:
    // - time_hi_and_version[12:16] = 0b0100
    /* eslint-disable-next-line */
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    // Section 4.4
    // - clock_seq_hi_and_reserved[6] = 0b0
    // - clock_seq_hi_and_reserved[7] = 0b1
    /* eslint-disable-next-line */
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hexString = (0,_converters_js__WEBPACK_IMPORTED_MODULE_0__.bytesToHex)(bytes);
    return [
        hexString.substring(2, 10),
        hexString.substring(10, 14),
        hexString.substring(14, 18),
        hexString.substring(18, 22),
        hexString.substring(22, 34),
    ].join('-');
};
//# sourceMappingURL=uuid.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/validation.js":
/*!*******************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/validation.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkAddressCheckSum: () => (/* binding */ checkAddressCheckSum),
/* harmony export */   compareBlockNumbers: () => (/* binding */ compareBlockNumbers),
/* harmony export */   isAddress: () => (/* binding */ isAddress),
/* harmony export */   isBloom: () => (/* binding */ isBloom),
/* harmony export */   isContractAddressInBloom: () => (/* binding */ isContractAddressInBloom),
/* harmony export */   isContractInitOptions: () => (/* binding */ isContractInitOptions),
/* harmony export */   isHex: () => (/* binding */ isHex),
/* harmony export */   isHexStrict: () => (/* binding */ isHexStrict),
/* harmony export */   isInBloom: () => (/* binding */ isInBloom),
/* harmony export */   isNullish: () => (/* binding */ isNullish),
/* harmony export */   isTopic: () => (/* binding */ isTopic),
/* harmony export */   isTopicInBloom: () => (/* binding */ isTopicInBloom),
/* harmony export */   isUserEthereumAddressInBloom: () => (/* binding */ isUserEthereumAddressInBloom)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var web3_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-validator */ "./node_modules/web3-validator/lib/esm/index.js");
/* harmony import */ var web3_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! web3-types */ "./node_modules/web3-types/lib/esm/index.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @module Utils
 */



/**
 * @deprecated Will be removed in next release. Please use `web3-validator` package instead.
 */
const isHexStrict = web3_validator__WEBPACK_IMPORTED_MODULE_1__.isHexStrict;
/**
 * returns true if input is a hexstring, number or bigint
 *
 * @deprecated Will be removed in next release. Please use `web3-validator` package instead.
 */
const isHex = web3_validator__WEBPACK_IMPORTED_MODULE_1__.isHex;
/**
 * Checks the checksum of a given address. Will also return false on non-checksum addresses.
 *
 * @deprecated Will be removed in next release. Please use `web3-validator` package instead.
 */
const checkAddressCheckSum = web3_validator__WEBPACK_IMPORTED_MODULE_1__.checkAddressCheckSum;
/**
 * Checks if a given string is a valid Ethereum address. It will also check the checksum, if the address has upper and lowercase letters.
 *
 * @deprecated Will be removed in next release. Please use `web3-validator` package instead.
 */
const isAddress = web3_validator__WEBPACK_IMPORTED_MODULE_1__.isAddress;
/**
 * Returns true if the bloom is a valid bloom
 * https://github.com/joshstevens19/ethereum-bloom-filters/blob/fbeb47b70b46243c3963fe1c2988d7461ef17236/src/index.ts#L7
 *
 * @deprecated Will be removed in next release. Please use `web3-validator` package instead.
 */
const isBloom = web3_validator__WEBPACK_IMPORTED_MODULE_1__.isBloom;
/**
 * Returns true if the value is part of the given bloom
 * note: false positives are possible.
 *
 * @deprecated Will be removed in next release. Please use `web3-validator` package instead.
 */
const isInBloom = web3_validator__WEBPACK_IMPORTED_MODULE_1__.isInBloom;
/**
 * Returns true if the ethereum users address is part of the given bloom note: false positives are possible.
 *
 * @deprecated Will be removed in next release. Please use `web3-validator` package instead.
 */
const isUserEthereumAddressInBloom = web3_validator__WEBPACK_IMPORTED_MODULE_1__.isUserEthereumAddressInBloom;
/**
 * Returns true if the contract address is part of the given bloom.
 * note: false positives are possible.
 *
 * @deprecated Will be removed in next release. Please use `web3-validator` package instead.
 */
const isContractAddressInBloom = web3_validator__WEBPACK_IMPORTED_MODULE_1__.isContractAddressInBloom;
/**
 * Checks if its a valid topic
 *
 * @deprecated Will be removed in next release. Please use `web3-validator` package instead.
 */
const isTopic = web3_validator__WEBPACK_IMPORTED_MODULE_1__.isTopic;
/**
 * Returns true if the topic is part of the given bloom.
 * note: false positives are possible.
 *
 * @deprecated Will be removed in next release. Please use `web3-validator` package instead.
 */
const isTopicInBloom = web3_validator__WEBPACK_IMPORTED_MODULE_1__.isTopicInBloom;
/**
 * Compares between block A and block B
 * @param blockA - Block number or string
 * @param blockB - Block number or string
 *
 * @returns - Returns -1 if a \< b, returns 1 if a \> b and returns 0 if a == b
 *
 * @example
 * ```ts
 * console.log(web3.utils.compareBlockNumbers('latest', 'pending'));
 * > -1
 *
 * console.log(web3.utils.compareBlockNumbers(12, 11));
 * > 1
 * ```
 */
const compareBlockNumbers = (blockA, blockB) => {
    const isABlockTag = typeof blockA === 'string' && (0,web3_validator__WEBPACK_IMPORTED_MODULE_1__.isBlockTag)(blockA);
    const isBBlockTag = typeof blockB === 'string' && (0,web3_validator__WEBPACK_IMPORTED_MODULE_1__.isBlockTag)(blockB);
    if (blockA === blockB ||
        ((blockA === 'earliest' || blockA === 0) && (blockB === 'earliest' || blockB === 0)) // only exception compare blocktag with number
    ) {
        return 0;
    }
    if (blockA === 'earliest') {
        return -1;
    }
    if (blockB === 'earliest') {
        return 1;
    }
    if (isABlockTag && isBBlockTag) {
        // Increasing order:  earliest, finalized , safe, latest, pending
        const tagsOrder = {
            [web3_types__WEBPACK_IMPORTED_MODULE_2__.BlockTags.EARLIEST]: 1,
            [web3_types__WEBPACK_IMPORTED_MODULE_2__.BlockTags.FINALIZED]: 2,
            [web3_types__WEBPACK_IMPORTED_MODULE_2__.BlockTags.SAFE]: 3,
            [web3_types__WEBPACK_IMPORTED_MODULE_2__.BlockTags.LATEST]: 4,
            [web3_types__WEBPACK_IMPORTED_MODULE_2__.BlockTags.PENDING]: 5,
        };
        if (tagsOrder[blockA] < tagsOrder[blockB]) {
            return -1;
        }
        return 1;
    }
    if ((isABlockTag && !isBBlockTag) || (!isABlockTag && isBBlockTag)) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.InvalidBlockError('Cannot compare blocktag with provided non-blocktag input.');
    }
    const bigIntA = BigInt(blockA);
    const bigIntB = BigInt(blockB);
    if (bigIntA < bigIntB) {
        return -1;
    }
    if (bigIntA === bigIntB) {
        return 0;
    }
    return 1;
};
const isContractInitOptions = (options) => typeof options === 'object' &&
    !(0,web3_validator__WEBPACK_IMPORTED_MODULE_1__.isNullish)(options) &&
    Object.keys(options).length !== 0 &&
    [
        'input',
        'data',
        'from',
        'gas',
        'gasPrice',
        'gasLimit',
        'address',
        'jsonInterface',
        'syncWithContext',
        'dataInputFill',
    ].some(key => key in options);
const isNullish = web3_validator__WEBPACK_IMPORTED_MODULE_1__.isNullish;
//# sourceMappingURL=validation.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/web3_deferred_promise.js":
/*!******************************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/web3_deferred_promise.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Web3DeferredPromise: () => (/* binding */ Web3DeferredPromise)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;

/**
 * The class is a simple implementation of a deferred promise with optional timeout functionality,
 * which can be useful when dealing with asynchronous tasks.
 *
 */
class Web3DeferredPromise {
    /**
     *
     * @param timeout - (optional) The timeout in milliseconds.
     * @param eagerStart - (optional) If true, the timer starts as soon as the promise is created.
     * @param timeoutMessage - (optional) The message to include in the timeout erro that is thrown when the promise times out.
     */
    constructor({ timeout, eagerStart, timeoutMessage, } = {
        timeout: 0,
        eagerStart: false,
        timeoutMessage: 'DeferredPromise timed out',
    }) {
        // public tag to treat object as promise by different libs
        // eslint-disable-next-line @typescript-eslint/prefer-as-const
        this[_a] = 'Promise';
        this._state = 'pending';
        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this._timeoutMessage = timeoutMessage;
        this._timeoutInterval = timeout;
        if (eagerStart) {
            this.startTimer();
        }
    }
    /**
     * Returns the current state of the promise.
     * @returns 'pending' | 'fulfilled' | 'rejected'
     */
    get state() {
        return this._state;
    }
    /**
     *
     * @param onfulfilled - (optional) The callback to execute when the promise is fulfilled.
     * @param onrejected  - (optional) The callback to execute when the promise is rejected.
     * @returns
     */
    then(onfulfilled, onrejected) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._promise.then(onfulfilled, onrejected);
        });
    }
    /**
     *
     * @param onrejected - (optional) The callback to execute when the promise is rejected.
     * @returns
     */
    catch(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onrejected) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._promise.catch(onrejected);
        });
    }
    /**
     *
     * @param onfinally - (optional) The callback to execute when the promise is settled (fulfilled or rejected).
     * @returns
     */
    finally(onfinally) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._promise.finally(onfinally);
        });
    }
    /**
     * Resolves the current promise.
     * @param value - The value to resolve the promise with.
     */
    resolve(value) {
        this._resolve(value);
        this._state = 'fulfilled';
        this._clearTimeout();
    }
    /**
     * Rejects the current promise.
     * @param reason - The reason to reject the promise with.
     */
    reject(reason) {
        this._reject(reason);
        this._state = 'rejected';
        this._clearTimeout();
    }
    /**
     * Starts the timeout timer for the promise.
     */
    startTimer() {
        if (this._timeoutInterval && this._timeoutInterval > 0) {
            this._timeoutId = setTimeout(this._checkTimeout.bind(this), this._timeoutInterval);
        }
    }
    _checkTimeout() {
        if (this._state === 'pending' && this._timeoutId) {
            this.reject(new web3_errors__WEBPACK_IMPORTED_MODULE_0__.OperationTimeoutError(this._timeoutMessage));
        }
    }
    _clearTimeout() {
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
        }
    }
}
_a = Symbol.toStringTag;
//# sourceMappingURL=web3_deferred_promise.js.map

/***/ }),

/***/ "./node_modules/web3-utils/lib/esm/web3_eip1193_provider.js":
/*!******************************************************************!*\
  !*** ./node_modules/web3-utils/lib/esm/web3_eip1193_provider.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Eip1193Provider: () => (/* binding */ Eip1193Provider)
/* harmony export */ });
/* harmony import */ var web3_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-types */ "./node_modules/web3-types/lib/esm/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.mjs");
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var _json_rpc_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./json_rpc.js */ "./node_modules/web3-utils/lib/esm/json_rpc.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/




/**
 * This is an abstract class, which extends {@link Web3BaseProvider} class. This class is used to implement a provider that adheres to the EIP-1193 standard for Ethereum providers.
 */
class Eip1193Provider extends web3_types__WEBPACK_IMPORTED_MODULE_0__.Web3BaseProvider {
    constructor() {
        super(...arguments);
        this._eventEmitter = new eventemitter3__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        this._chainId = '';
        this._accounts = [];
    }
    _getChainId() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const data = yield this.request((0,_json_rpc_js__WEBPACK_IMPORTED_MODULE_3__.toPayload)({
                method: 'eth_chainId',
                params: [],
            }));
            return (_a = data === null || data === void 0 ? void 0 : data.result) !== null && _a !== void 0 ? _a : '';
        });
    }
    _getAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const data = yield this.request((0,_json_rpc_js__WEBPACK_IMPORTED_MODULE_3__.toPayload)({
                method: 'eth_accounts',
                params: [],
            }));
            return (_a = data === null || data === void 0 ? void 0 : data.result) !== null && _a !== void 0 ? _a : [];
        });
    }
    _onConnect() {
        Promise.all([
            this._getChainId()
                .then(chainId => {
                if (chainId !== this._chainId) {
                    this._chainId = chainId;
                    this._eventEmitter.emit('chainChanged', this._chainId);
                }
            })
                .catch(err => {
                // todo: add error handler
                console.error(err);
            }),
            this._getAccounts()
                .then(accounts => {
                if (!(this._accounts.length === accounts.length &&
                    accounts.every(v => accounts.includes(v)))) {
                    this._accounts = accounts;
                    this._onAccountsChanged();
                }
            })
                .catch(err => {
                // todo: add error handler
                // eslint-disable-next-line no-console
                console.error(err);
            }),
        ])
            .then(() => this._eventEmitter.emit('connect', {
            chainId: this._chainId,
        }))
            .catch(err => {
            // todo: add error handler
            // eslint-disable-next-line no-console
            console.error(err);
        });
    }
    // todo this must be ProvideRpcError with a message too
    _onDisconnect(code, data) {
        this._eventEmitter.emit('disconnect', new web3_errors__WEBPACK_IMPORTED_MODULE_2__.EIP1193ProviderRpcError(code, data));
    }
    _onAccountsChanged() {
        // get chainId and safe to local
        this._eventEmitter.emit('accountsChanged', this._accounts);
    }
}
//# sourceMappingURL=web3_eip1193_provider.js.map

/***/ }),

/***/ "./node_modules/web3-utils/node_modules/@noble/hashes/esm/_assert.js":
/*!***************************************************************************!*\
  !*** ./node_modules/web3-utils/node_modules/@noble/hashes/esm/_assert.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bool: () => (/* binding */ bool),
/* harmony export */   bytes: () => (/* binding */ bytes),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   exists: () => (/* binding */ exists),
/* harmony export */   hash: () => (/* binding */ hash),
/* harmony export */   isBytes: () => (/* binding */ isBytes),
/* harmony export */   number: () => (/* binding */ number),
/* harmony export */   output: () => (/* binding */ output)
/* harmony export */ });
function number(n) {
    if (!Number.isSafeInteger(n) || n < 0)
        throw new Error(`positive integer expected, not ${n}`);
}
function bool(b) {
    if (typeof b !== 'boolean')
        throw new Error(`boolean expected, not ${b}`);
}
// copied from utils
function isBytes(a) {
    return (a instanceof Uint8Array ||
        (a != null && typeof a === 'object' && a.constructor.name === 'Uint8Array'));
}
function bytes(b, ...lengths) {
    if (!isBytes(b))
        throw new Error('Uint8Array expected');
    if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
}
function hash(h) {
    if (typeof h !== 'function' || typeof h.create !== 'function')
        throw new Error('Hash should be wrapped by utils.wrapConstructor');
    number(h.outputLen);
    number(h.blockLen);
}
function exists(instance, checkFinished = true) {
    if (instance.destroyed)
        throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished)
        throw new Error('Hash#digest() has already been called');
}
function output(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
}

const assert = { number, bool, bytes, hash, exists, output };
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (assert);
//# sourceMappingURL=_assert.js.map

/***/ }),

/***/ "./node_modules/web3-utils/node_modules/@noble/hashes/esm/_u64.js":
/*!************************************************************************!*\
  !*** ./node_modules/web3-utils/node_modules/@noble/hashes/esm/_u64.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: () => (/* binding */ add),
/* harmony export */   add3H: () => (/* binding */ add3H),
/* harmony export */   add3L: () => (/* binding */ add3L),
/* harmony export */   add4H: () => (/* binding */ add4H),
/* harmony export */   add4L: () => (/* binding */ add4L),
/* harmony export */   add5H: () => (/* binding */ add5H),
/* harmony export */   add5L: () => (/* binding */ add5L),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fromBig: () => (/* binding */ fromBig),
/* harmony export */   rotlBH: () => (/* binding */ rotlBH),
/* harmony export */   rotlBL: () => (/* binding */ rotlBL),
/* harmony export */   rotlSH: () => (/* binding */ rotlSH),
/* harmony export */   rotlSL: () => (/* binding */ rotlSL),
/* harmony export */   rotr32H: () => (/* binding */ rotr32H),
/* harmony export */   rotr32L: () => (/* binding */ rotr32L),
/* harmony export */   rotrBH: () => (/* binding */ rotrBH),
/* harmony export */   rotrBL: () => (/* binding */ rotrBL),
/* harmony export */   rotrSH: () => (/* binding */ rotrSH),
/* harmony export */   rotrSL: () => (/* binding */ rotrSL),
/* harmony export */   shrSH: () => (/* binding */ shrSH),
/* harmony export */   shrSL: () => (/* binding */ shrSL),
/* harmony export */   split: () => (/* binding */ split),
/* harmony export */   toBig: () => (/* binding */ toBig)
/* harmony export */ });
const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
// We are not using BigUint64Array, because they are extremely slow as per 2022
function fromBig(n, le = false) {
    if (le)
        return { h: Number(n & U32_MASK64), l: Number((n >> _32n) & U32_MASK64) };
    return { h: Number((n >> _32n) & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for (let i = 0; i < lst.length; i++) {
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
}
const toBig = (h, l) => (BigInt(h >>> 0) << _32n) | BigInt(l >>> 0);
// for Shift in [0, 32)
const shrSH = (h, _l, s) => h >>> s;
const shrSL = (h, l, s) => (h << (32 - s)) | (l >>> s);
// Right rotate for Shift in [1, 32)
const rotrSH = (h, l, s) => (h >>> s) | (l << (32 - s));
const rotrSL = (h, l, s) => (h << (32 - s)) | (l >>> s);
// Right rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotrBH = (h, l, s) => (h << (64 - s)) | (l >>> (s - 32));
const rotrBL = (h, l, s) => (h >>> (s - 32)) | (l << (64 - s));
// Right rotate for shift===32 (just swaps l&h)
const rotr32H = (_h, l) => l;
const rotr32L = (h, _l) => h;
// Left rotate for Shift in [1, 32)
const rotlSH = (h, l, s) => (h << s) | (l >>> (32 - s));
const rotlSL = (h, l, s) => (l << s) | (h >>> (32 - s));
// Left rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotlBH = (h, l, s) => (l << (s - 32)) | (h >>> (64 - s));
const rotlBL = (h, l, s) => (h << (s - 32)) | (l >>> (64 - s));
// JS uses 32-bit signed integers for bitwise operations which means we cannot
// simple take carry out of low bit sum by shift, we need to use division.
function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return { h: (Ah + Bh + ((l / 2 ** 32) | 0)) | 0, l: l | 0 };
}
// Addition with more than 2 elements
const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
const add3H = (low, Ah, Bh, Ch) => (Ah + Bh + Ch + ((low / 2 ** 32) | 0)) | 0;
const add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
const add4H = (low, Ah, Bh, Ch, Dh) => (Ah + Bh + Ch + Dh + ((low / 2 ** 32) | 0)) | 0;
const add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
const add5H = (low, Ah, Bh, Ch, Dh, Eh) => (Ah + Bh + Ch + Dh + Eh + ((low / 2 ** 32) | 0)) | 0;
// prettier-ignore

// prettier-ignore
const u64 = {
    fromBig, split, toBig,
    shrSH, shrSL,
    rotrSH, rotrSL, rotrBH, rotrBL,
    rotr32H, rotr32L,
    rotlSH, rotlSL, rotlBH, rotlBL,
    add, add3L, add3H, add4L, add4H, add5H, add5L,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (u64);
//# sourceMappingURL=_u64.js.map

/***/ }),

/***/ "./node_modules/web3-utils/node_modules/@noble/hashes/esm/crypto.js":
/*!**************************************************************************!*\
  !*** ./node_modules/web3-utils/node_modules/@noble/hashes/esm/crypto.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   crypto: () => (/* binding */ crypto)
/* harmony export */ });
const crypto = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined;
//# sourceMappingURL=crypto.js.map

/***/ }),

/***/ "./node_modules/web3-utils/node_modules/@noble/hashes/esm/sha3.js":
/*!************************************************************************!*\
  !*** ./node_modules/web3-utils/node_modules/@noble/hashes/esm/sha3.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Keccak: () => (/* binding */ Keccak),
/* harmony export */   keccakP: () => (/* binding */ keccakP),
/* harmony export */   keccak_224: () => (/* binding */ keccak_224),
/* harmony export */   keccak_256: () => (/* binding */ keccak_256),
/* harmony export */   keccak_384: () => (/* binding */ keccak_384),
/* harmony export */   keccak_512: () => (/* binding */ keccak_512),
/* harmony export */   sha3_224: () => (/* binding */ sha3_224),
/* harmony export */   sha3_256: () => (/* binding */ sha3_256),
/* harmony export */   sha3_384: () => (/* binding */ sha3_384),
/* harmony export */   sha3_512: () => (/* binding */ sha3_512),
/* harmony export */   shake128: () => (/* binding */ shake128),
/* harmony export */   shake256: () => (/* binding */ shake256)
/* harmony export */ });
/* harmony import */ var _assert_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_assert.js */ "./node_modules/web3-utils/node_modules/@noble/hashes/esm/_assert.js");
/* harmony import */ var _u64_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_u64.js */ "./node_modules/web3-utils/node_modules/@noble/hashes/esm/_u64.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web3-utils/node_modules/@noble/hashes/esm/utils.js");



// SHA3 (keccak) is based on a new design: basically, the internal state is bigger than output size.
// It's called a sponge function.
// Various per round constants calculations
const SHA3_PI = [];
const SHA3_ROTL = [];
const _SHA3_IOTA = [];
const _0n = /* @__PURE__ */ BigInt(0);
const _1n = /* @__PURE__ */ BigInt(1);
const _2n = /* @__PURE__ */ BigInt(2);
const _7n = /* @__PURE__ */ BigInt(7);
const _256n = /* @__PURE__ */ BigInt(256);
const _0x71n = /* @__PURE__ */ BigInt(0x71);
for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
    // Pi
    [x, y] = [y, (2 * x + 3 * y) % 5];
    SHA3_PI.push(2 * (5 * y + x));
    // Rotational
    SHA3_ROTL.push((((round + 1) * (round + 2)) / 2) % 64);
    // Iota
    let t = _0n;
    for (let j = 0; j < 7; j++) {
        R = ((R << _1n) ^ ((R >> _7n) * _0x71n)) % _256n;
        if (R & _2n)
            t ^= _1n << ((_1n << /* @__PURE__ */ BigInt(j)) - _1n);
    }
    _SHA3_IOTA.push(t);
}
const [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ (0,_u64_js__WEBPACK_IMPORTED_MODULE_0__.split)(_SHA3_IOTA, true);
// Left rotation (without 0, 32, 64)
const rotlH = (h, l, s) => (s > 32 ? (0,_u64_js__WEBPACK_IMPORTED_MODULE_0__.rotlBH)(h, l, s) : (0,_u64_js__WEBPACK_IMPORTED_MODULE_0__.rotlSH)(h, l, s));
const rotlL = (h, l, s) => (s > 32 ? (0,_u64_js__WEBPACK_IMPORTED_MODULE_0__.rotlBL)(h, l, s) : (0,_u64_js__WEBPACK_IMPORTED_MODULE_0__.rotlSL)(h, l, s));
// Same as keccakf1600, but allows to skip some rounds
function keccakP(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    // NOTE: all indices are x2 since we store state as u32 instead of u64 (bigints to slow in js)
    for (let round = 24 - rounds; round < 24; round++) {
        // Theta θ
        for (let x = 0; x < 10; x++)
            B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
        for (let x = 0; x < 10; x += 2) {
            const idx1 = (x + 8) % 10;
            const idx0 = (x + 2) % 10;
            const B0 = B[idx0];
            const B1 = B[idx0 + 1];
            const Th = rotlH(B0, B1, 1) ^ B[idx1];
            const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
            for (let y = 0; y < 50; y += 10) {
                s[x + y] ^= Th;
                s[x + y + 1] ^= Tl;
            }
        }
        // Rho (ρ) and Pi (π)
        let curH = s[2];
        let curL = s[3];
        for (let t = 0; t < 24; t++) {
            const shift = SHA3_ROTL[t];
            const Th = rotlH(curH, curL, shift);
            const Tl = rotlL(curH, curL, shift);
            const PI = SHA3_PI[t];
            curH = s[PI];
            curL = s[PI + 1];
            s[PI] = Th;
            s[PI + 1] = Tl;
        }
        // Chi (χ)
        for (let y = 0; y < 50; y += 10) {
            for (let x = 0; x < 10; x++)
                B[x] = s[y + x];
            for (let x = 0; x < 10; x++)
                s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
        }
        // Iota (ι)
        s[0] ^= SHA3_IOTA_H[round];
        s[1] ^= SHA3_IOTA_L[round];
    }
    B.fill(0);
}
class Keccak extends _utils_js__WEBPACK_IMPORTED_MODULE_1__.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
        super();
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        // Can be passed from user as dkLen
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_2__.number)(outputLen);
        // 1600 = 5x5 matrix of 64bit.  1600 bits === 200 bytes
        if (0 >= this.blockLen || this.blockLen >= 200)
            throw new Error('Sha3 supports only keccak-f1600 function');
        this.state = new Uint8Array(200);
        this.state32 = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.u32)(this.state);
    }
    keccak() {
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isLE)
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.byteSwap32)(this.state32);
        keccakP(this.state32, this.rounds);
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isLE)
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.byteSwap32)(this.state32);
        this.posOut = 0;
        this.pos = 0;
    }
    update(data) {
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_2__.exists)(this);
        const { blockLen, state } = this;
        data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.toBytes)(data);
        const len = data.length;
        for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);
            for (let i = 0; i < take; i++)
                state[this.pos++] ^= data[pos++];
            if (this.pos === blockLen)
                this.keccak();
        }
        return this;
    }
    finish() {
        if (this.finished)
            return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        // Do the padding
        state[pos] ^= suffix;
        if ((suffix & 0x80) !== 0 && pos === blockLen - 1)
            this.keccak();
        state[blockLen - 1] ^= 0x80;
        this.keccak();
    }
    writeInto(out) {
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_2__.exists)(this, false);
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_2__.bytes)(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for (let pos = 0, len = out.length; pos < len;) {
            if (this.posOut >= blockLen)
                this.keccak();
            const take = Math.min(blockLen - this.posOut, len - pos);
            out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
            this.posOut += take;
            pos += take;
        }
        return out;
    }
    xofInto(out) {
        // Sha3/Keccak usage with XOF is probably mistake, only SHAKE instances can do XOF
        if (!this.enableXOF)
            throw new Error('XOF is not possible for this instance');
        return this.writeInto(out);
    }
    xof(bytes) {
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_2__.number)(bytes);
        return this.xofInto(new Uint8Array(bytes));
    }
    digestInto(out) {
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_2__.output)(out, this);
        if (this.finished)
            throw new Error('digest() was already called');
        this.writeInto(out);
        this.destroy();
        return out;
    }
    digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
        this.destroyed = true;
        this.state.fill(0);
    }
    _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        // Suffix can change in cSHAKE
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
    }
}
const gen = (suffix, blockLen, outputLen) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.wrapConstructor)(() => new Keccak(blockLen, suffix, outputLen));
const sha3_224 = /* @__PURE__ */ gen(0x06, 144, 224 / 8);
/**
 * SHA3-256 hash function
 * @param message - that would be hashed
 */
const sha3_256 = /* @__PURE__ */ gen(0x06, 136, 256 / 8);
const sha3_384 = /* @__PURE__ */ gen(0x06, 104, 384 / 8);
const sha3_512 = /* @__PURE__ */ gen(0x06, 72, 512 / 8);
const keccak_224 = /* @__PURE__ */ gen(0x01, 144, 224 / 8);
/**
 * keccak-256 hash function. Different from SHA3-256.
 * @param message - that would be hashed
 */
const keccak_256 = /* @__PURE__ */ gen(0x01, 136, 256 / 8);
const keccak_384 = /* @__PURE__ */ gen(0x01, 104, 384 / 8);
const keccak_512 = /* @__PURE__ */ gen(0x01, 72, 512 / 8);
const genShake = (suffix, blockLen, outputLen) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.wrapXOFConstructorWithOpts)((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === undefined ? outputLen : opts.dkLen, true));
const shake128 = /* @__PURE__ */ genShake(0x1f, 168, 128 / 8);
const shake256 = /* @__PURE__ */ genShake(0x1f, 136, 256 / 8);
//# sourceMappingURL=sha3.js.map

/***/ }),

/***/ "./node_modules/web3-utils/node_modules/@noble/hashes/esm/utils.js":
/*!*************************************************************************!*\
  !*** ./node_modules/web3-utils/node_modules/@noble/hashes/esm/utils.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hash: () => (/* binding */ Hash),
/* harmony export */   asyncLoop: () => (/* binding */ asyncLoop),
/* harmony export */   byteSwap: () => (/* binding */ byteSwap),
/* harmony export */   byteSwap32: () => (/* binding */ byteSwap32),
/* harmony export */   byteSwapIfBE: () => (/* binding */ byteSwapIfBE),
/* harmony export */   bytesToHex: () => (/* binding */ bytesToHex),
/* harmony export */   checkOpts: () => (/* binding */ checkOpts),
/* harmony export */   concatBytes: () => (/* binding */ concatBytes),
/* harmony export */   createView: () => (/* binding */ createView),
/* harmony export */   hexToBytes: () => (/* binding */ hexToBytes),
/* harmony export */   isBytes: () => (/* binding */ isBytes),
/* harmony export */   isLE: () => (/* binding */ isLE),
/* harmony export */   nextTick: () => (/* binding */ nextTick),
/* harmony export */   randomBytes: () => (/* binding */ randomBytes),
/* harmony export */   rotl: () => (/* binding */ rotl),
/* harmony export */   rotr: () => (/* binding */ rotr),
/* harmony export */   toBytes: () => (/* binding */ toBytes),
/* harmony export */   u32: () => (/* binding */ u32),
/* harmony export */   u8: () => (/* binding */ u8),
/* harmony export */   utf8ToBytes: () => (/* binding */ utf8ToBytes),
/* harmony export */   wrapConstructor: () => (/* binding */ wrapConstructor),
/* harmony export */   wrapConstructorWithOpts: () => (/* binding */ wrapConstructorWithOpts),
/* harmony export */   wrapXOFConstructorWithOpts: () => (/* binding */ wrapXOFConstructorWithOpts)
/* harmony export */ });
/* harmony import */ var _noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noble/hashes/crypto */ "./node_modules/web3-utils/node_modules/@noble/hashes/esm/crypto.js");
/* harmony import */ var _assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_assert.js */ "./node_modules/web3-utils/node_modules/@noble/hashes/esm/_assert.js");
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
// We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
// node.js versions earlier than v19 don't declare it in global scope.
// For node.js, package.json#exports field mapping rewrites import
// from `crypto` to `cryptoNode`, which imports native module.
// Makes the utils un-importable in browsers without a bundler.
// Once node.js 18 is deprecated (2025-04-30), we can just drop the import.


// export { isBytes } from './_assert.js';
// We can't reuse isBytes from _assert, because somehow this causes huge perf issues
function isBytes(a) {
    return (a instanceof Uint8Array ||
        (a != null && typeof a === 'object' && a.constructor.name === 'Uint8Array'));
}
// Cast array to different type
const u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
const u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
// Cast array to view
const createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
// The rotate right (circular right shift) operation for uint32
const rotr = (word, shift) => (word << (32 - shift)) | (word >>> shift);
// The rotate left (circular left shift) operation for uint32
const rotl = (word, shift) => (word << shift) | ((word >>> (32 - shift)) >>> 0);
const isLE = new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44;
// The byte swap operation for uint32
const byteSwap = (word) => ((word << 24) & 0xff000000) |
    ((word << 8) & 0xff0000) |
    ((word >>> 8) & 0xff00) |
    ((word >>> 24) & 0xff);
// Conditionally byte swap if on a big-endian platform
const byteSwapIfBE = isLE ? (n) => n : (n) => byteSwap(n);
// In place byte swap for Uint32Array
function byteSwap32(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = byteSwap(arr[i]);
    }
}
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));
/**
 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
 */
function bytesToHex(bytes) {
    (0,_assert_js__WEBPACK_IMPORTED_MODULE_0__.bytes)(bytes);
    // pre-caching improves the speed 6x
    let hex = '';
    for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
    }
    return hex;
}
// We use optimized technique to convert hex string to byte array
const asciis = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function asciiToBase16(char) {
    if (char >= asciis._0 && char <= asciis._9)
        return char - asciis._0;
    if (char >= asciis._A && char <= asciis._F)
        return char - (asciis._A - 10);
    if (char >= asciis._a && char <= asciis._f)
        return char - (asciis._a - 10);
    return;
}
/**
 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */
function hexToBytes(hex) {
    if (typeof hex !== 'string')
        throw new Error('hex string expected, got ' + typeof hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2)
        throw new Error('padded hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
    }
    return array;
}
// There is no setImmediate in browser and setTimeout is slow.
// call of async fn will return Promise, which will be fullfiled only on
// next scheduler queue processing step and this is exactly what we need.
const nextTick = async () => { };
// Returns control to thread each 'tick' ms to avoid blocking
async function asyncLoop(iters, tick, cb) {
    let ts = Date.now();
    for (let i = 0; i < iters; i++) {
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
            continue;
        await nextTick();
        ts += diff;
    }
}
/**
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */
function utf8ToBytes(str) {
    if (typeof str !== 'string')
        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
/**
 * Normalizes (non-hex) string or Uint8Array to Uint8Array.
 * Warning: when Uint8Array is passed, it would NOT get copied.
 * Keep in mind for future mutable operations.
 */
function toBytes(data) {
    if (typeof data === 'string')
        data = utf8ToBytes(data);
    (0,_assert_js__WEBPACK_IMPORTED_MODULE_0__.bytes)(data);
    return data;
}
/**
 * Copies several Uint8Arrays into one.
 */
function concatBytes(...arrays) {
    let sum = 0;
    for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_0__.bytes)(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
// For runtime check if class implements interface
class Hash {
    // Safe version that clones internal state
    clone() {
        return this._cloneInto();
    }
}
const toStr = {}.toString;
function checkOpts(defaults, opts) {
    if (opts !== undefined && toStr.call(opts) !== '[object Object]')
        throw new Error('Options should be object or undefined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
function wrapConstructor(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
}
function wrapConstructorWithOpts(hashCons) {
    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts) => hashCons(opts);
    return hashC;
}
function wrapXOFConstructorWithOpts(hashCons) {
    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts) => hashCons(opts);
    return hashC;
}
/**
 * Secure PRNG. Uses `crypto.getRandomValues`, which defers to OS.
 */
function randomBytes(bytesLength = 32) {
    if (_noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_1__.crypto && typeof _noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_1__.crypto.getRandomValues === 'function') {
        return _noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_1__.crypto.getRandomValues(new Uint8Array(bytesLength));
    }
    throw new Error('crypto.getRandomValues must be defined');
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/web3-utils/node_modules/ethereum-cryptography/esm/keccak.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/web3-utils/node_modules/ethereum-cryptography/esm/keccak.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   keccak224: () => (/* binding */ keccak224),
/* harmony export */   keccak256: () => (/* binding */ keccak256),
/* harmony export */   keccak384: () => (/* binding */ keccak384),
/* harmony export */   keccak512: () => (/* binding */ keccak512)
/* harmony export */ });
/* harmony import */ var _noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noble/hashes/sha3 */ "./node_modules/web3-utils/node_modules/@noble/hashes/esm/sha3.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web3-utils/node_modules/ethereum-cryptography/esm/utils.js");


const keccak224 = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.wrapHash)(_noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__.keccak_224);
const keccak256 = (() => {
    const k = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.wrapHash)(_noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__.keccak_256);
    k.create = _noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__.keccak_256.create;
    return k;
})();
const keccak384 = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.wrapHash)(_noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__.keccak_384);
const keccak512 = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.wrapHash)(_noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__.keccak_512);


/***/ }),

/***/ "./node_modules/web3-utils/node_modules/ethereum-cryptography/esm/random.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/web3-utils/node_modules/ethereum-cryptography/esm/random.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRandomBytes: () => (/* binding */ getRandomBytes),
/* harmony export */   getRandomBytesSync: () => (/* binding */ getRandomBytesSync)
/* harmony export */ });
/* harmony import */ var _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @noble/hashes/utils */ "./node_modules/web3-utils/node_modules/@noble/hashes/esm/utils.js");

function getRandomBytesSync(bytes) {
    return (0,_noble_hashes_utils__WEBPACK_IMPORTED_MODULE_0__.randomBytes)(bytes);
}
async function getRandomBytes(bytes) {
    return (0,_noble_hashes_utils__WEBPACK_IMPORTED_MODULE_0__.randomBytes)(bytes);
}


/***/ }),

/***/ "./node_modules/web3-utils/node_modules/ethereum-cryptography/esm/utils.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/web3-utils/node_modules/ethereum-cryptography/esm/utils.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assertBool: () => (/* binding */ assertBool),
/* harmony export */   assertBytes: () => (/* binding */ assertBytes),
/* harmony export */   bytesToHex: () => (/* reexport safe */ _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.bytesToHex),
/* harmony export */   bytesToUtf8: () => (/* binding */ bytesToUtf8),
/* harmony export */   concatBytes: () => (/* reexport safe */ _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.concatBytes),
/* harmony export */   createView: () => (/* reexport safe */ _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.createView),
/* harmony export */   crypto: () => (/* binding */ crypto),
/* harmony export */   equalsBytes: () => (/* binding */ equalsBytes),
/* harmony export */   hexToBytes: () => (/* binding */ hexToBytes),
/* harmony export */   toHex: () => (/* reexport safe */ _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.bytesToHex),
/* harmony export */   utf8ToBytes: () => (/* reexport safe */ _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.utf8ToBytes),
/* harmony export */   wrapHash: () => (/* binding */ wrapHash)
/* harmony export */ });
/* harmony import */ var _noble_hashes_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @noble/hashes/_assert */ "./node_modules/web3-utils/node_modules/@noble/hashes/esm/_assert.js");
/* harmony import */ var _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noble/hashes/utils */ "./node_modules/web3-utils/node_modules/@noble/hashes/esm/utils.js");


const assertBool = _noble_hashes_assert__WEBPACK_IMPORTED_MODULE_0__["default"].bool;
const assertBytes = _noble_hashes_assert__WEBPACK_IMPORTED_MODULE_0__["default"].bytes;


// buf.toString('utf8') -> bytesToUtf8(buf)
function bytesToUtf8(data) {
    if (!(data instanceof Uint8Array)) {
        throw new TypeError(`bytesToUtf8 expected Uint8Array, got ${typeof data}`);
    }
    return new TextDecoder().decode(data);
}
function hexToBytes(data) {
    const sliced = data.startsWith("0x") ? data.substring(2) : data;
    return (0,_noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.hexToBytes)(sliced);
}
// buf.equals(buf2) -> equalsBytes(buf, buf2)
function equalsBytes(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
// Internal utils
function wrapHash(hash) {
    return (msg) => {
        _noble_hashes_assert__WEBPACK_IMPORTED_MODULE_0__["default"].bytes(msg);
        return hash(msg);
    };
}
// TODO(v3): switch away from node crypto, remove this unnecessary variable.
const crypto = (() => {
    const webCrypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : undefined;
    const nodeRequire = typeof module !== "undefined" &&
        typeof module.require === "function" &&
        module.require.bind(module);
    return {
        node: nodeRequire && !webCrypto ? nodeRequire("crypto") : undefined,
        web: webCrypto
    };
})();


/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/constants.js":
/*!**********************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/constants.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VALID_ETH_BASE_TYPES: () => (/* binding */ VALID_ETH_BASE_TYPES)
/* harmony export */ });
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
const VALID_ETH_BASE_TYPES = ['bool', 'int', 'uint', 'bytes', 'string', 'address', 'tuple'];
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/default_validator.js":
/*!******************************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/default_validator.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validator: () => (/* binding */ validator)
/* harmony export */ });
/* harmony import */ var _web3_validator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./web3_validator.js */ "./node_modules/web3-validator/lib/esm/web3_validator.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

const validator = new _web3_validator_js__WEBPACK_IMPORTED_MODULE_0__.Web3Validator();
//# sourceMappingURL=default_validator.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/errors.js":
/*!*******************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/errors.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Web3ValidatorError: () => (/* binding */ Web3ValidatorError)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

const errorFormatter = (error) => {
    if (error.message) {
        return error.message;
    }
    return 'unspecified error';
};
class Web3ValidatorError extends web3_errors__WEBPACK_IMPORTED_MODULE_0__.BaseWeb3Error {
    constructor(errors) {
        super();
        this.code = web3_errors__WEBPACK_IMPORTED_MODULE_0__.ERR_VALIDATION;
        this.errors = errors;
        super.message = `Web3 validator found ${errors.length} error[s]:\n${this._compileErrors().join('\n')}`;
    }
    _compileErrors() {
        return this.errors.map(errorFormatter);
    }
}
//# sourceMappingURL=errors.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/formats.js":
/*!********************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/formats.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validation_address_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation/address.js */ "./node_modules/web3-validator/lib/esm/validation/address.js");
/* harmony import */ var _validation_block_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validation/block.js */ "./node_modules/web3-validator/lib/esm/validation/block.js");
/* harmony import */ var _validation_bloom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation/bloom.js */ "./node_modules/web3-validator/lib/esm/validation/bloom.js");
/* harmony import */ var _validation_boolean_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation/boolean.js */ "./node_modules/web3-validator/lib/esm/validation/boolean.js");
/* harmony import */ var _validation_bytes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validation/bytes.js */ "./node_modules/web3-validator/lib/esm/validation/bytes.js");
/* harmony import */ var _validation_filter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validation/filter.js */ "./node_modules/web3-validator/lib/esm/validation/filter.js");
/* harmony import */ var _validation_string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validation/string.js */ "./node_modules/web3-validator/lib/esm/validation/string.js");
/* harmony import */ var _validation_numbers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./validation/numbers.js */ "./node_modules/web3-validator/lib/esm/validation/numbers.js");








const formats = {
    address: (data) => (0,_validation_address_js__WEBPACK_IMPORTED_MODULE_0__.isAddress)(data),
    bloom: (data) => (0,_validation_bloom_js__WEBPACK_IMPORTED_MODULE_2__.isBloom)(data),
    blockNumber: (data) => (0,_validation_block_js__WEBPACK_IMPORTED_MODULE_1__.isBlockNumber)(data),
    blockTag: (data) => (0,_validation_block_js__WEBPACK_IMPORTED_MODULE_1__.isBlockTag)(data),
    blockNumberOrTag: (data) => (0,_validation_block_js__WEBPACK_IMPORTED_MODULE_1__.isBlockNumberOrTag)(data),
    bool: (data) => (0,_validation_boolean_js__WEBPACK_IMPORTED_MODULE_3__.isBoolean)(data),
    bytes: (data) => (0,_validation_bytes_js__WEBPACK_IMPORTED_MODULE_4__.isBytes)(data),
    filter: (data) => (0,_validation_filter_js__WEBPACK_IMPORTED_MODULE_5__.isFilterObject)(data),
    hex: (data) => (0,_validation_string_js__WEBPACK_IMPORTED_MODULE_6__.isHexStrict)(data),
    uint: (data) => (0,_validation_numbers_js__WEBPACK_IMPORTED_MODULE_7__.isUInt)(data),
    int: (data) => (0,_validation_numbers_js__WEBPACK_IMPORTED_MODULE_7__.isInt)(data),
    number: (data) => (0,_validation_numbers_js__WEBPACK_IMPORTED_MODULE_7__.isNumber)(data),
    string: (data) => (0,_validation_string_js__WEBPACK_IMPORTED_MODULE_6__.isString)(data),
};
// generate formats for all numbers types
for (let bitSize = 8; bitSize <= 256; bitSize += 8) {
    formats[`int${bitSize}`] = data => (0,_validation_numbers_js__WEBPACK_IMPORTED_MODULE_7__.isInt)(data, { bitSize });
    formats[`uint${bitSize}`] = data => (0,_validation_numbers_js__WEBPACK_IMPORTED_MODULE_7__.isUInt)(data, { bitSize });
}
// generate bytes
for (let size = 1; size <= 32; size += 1) {
    formats[`bytes${size}`] = data => (0,_validation_bytes_js__WEBPACK_IMPORTED_MODULE_4__.isBytes)(data, { size });
}
formats.bytes256 = formats.bytes;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formats);
//# sourceMappingURL=formats.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/index.js":
/*!******************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VALID_ETH_BASE_TYPES: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_5__.VALID_ETH_BASE_TYPES),
/* harmony export */   Web3Validator: () => (/* reexport safe */ _web3_validator_js__WEBPACK_IMPORTED_MODULE_0__.Web3Validator),
/* harmony export */   Web3ValidatorError: () => (/* reexport safe */ _errors_js__WEBPACK_IMPORTED_MODULE_4__.Web3ValidatorError),
/* harmony export */   bigintPower: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.bigintPower),
/* harmony export */   checkAddressCheckSum: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.checkAddressCheckSum),
/* harmony export */   isAddress: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isAddress),
/* harmony export */   isBigInt: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isBigInt),
/* harmony export */   isBlockNumber: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isBlockNumber),
/* harmony export */   isBlockNumberOrTag: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isBlockNumberOrTag),
/* harmony export */   isBlockTag: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isBlockTag),
/* harmony export */   isBloom: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isBloom),
/* harmony export */   isBoolean: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isBoolean),
/* harmony export */   isBytes: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isBytes),
/* harmony export */   isContractAddressInBloom: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isContractAddressInBloom),
/* harmony export */   isFilterObject: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isFilterObject),
/* harmony export */   isHex: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isHex),
/* harmony export */   isHexPrefixed: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isHexPrefixed),
/* harmony export */   isHexStrict: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isHexStrict),
/* harmony export */   isHexString: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isHexString),
/* harmony export */   isHexString32Bytes: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isHexString32Bytes),
/* harmony export */   isHexString8Bytes: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isHexString8Bytes),
/* harmony export */   isInBloom: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isInBloom),
/* harmony export */   isInt: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isInt),
/* harmony export */   isNullish: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isNullish),
/* harmony export */   isNumber: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isNumber),
/* harmony export */   isObject: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isObject),
/* harmony export */   isString: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isString),
/* harmony export */   isTopic: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isTopic),
/* harmony export */   isTopicInBloom: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isTopicInBloom),
/* harmony export */   isUInt: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isUInt),
/* harmony export */   isUint8Array: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isUint8Array),
/* harmony export */   isUserEthereumAddressInBloom: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isUserEthereumAddressInBloom),
/* harmony export */   isValidEthBaseType: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.isValidEthBaseType),
/* harmony export */   utils: () => (/* reexport module object */ _utils_js__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   validateNoLeadingZeroes: () => (/* reexport safe */ _validation_index_js__WEBPACK_IMPORTED_MODULE_6__.validateNoLeadingZeroes),
/* harmony export */   validator: () => (/* reexport safe */ _default_validator_js__WEBPACK_IMPORTED_MODULE_1__.validator)
/* harmony export */ });
/* harmony import */ var _web3_validator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./web3_validator.js */ "./node_modules/web3-validator/lib/esm/web3_validator.js");
/* harmony import */ var _default_validator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default_validator.js */ "./node_modules/web3-validator/lib/esm/default_validator.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types.js */ "./node_modules/web3-validator/lib/esm/types.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web3-validator/lib/esm/utils.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./errors.js */ "./node_modules/web3-validator/lib/esm/errors.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants.js */ "./node_modules/web3-validator/lib/esm/constants.js");
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validation/index.js */ "./node_modules/web3-validator/lib/esm/validation/index.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/







//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/types.js":
/*!******************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/types.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/utils.js":
/*!******************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/utils.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   abiSchemaToJsonSchema: () => (/* binding */ abiSchemaToJsonSchema),
/* harmony export */   codePointToInt: () => (/* binding */ codePointToInt),
/* harmony export */   ensureIfUint8Array: () => (/* binding */ ensureIfUint8Array),
/* harmony export */   ethAbiToJsonSchema: () => (/* binding */ ethAbiToJsonSchema),
/* harmony export */   fetchArrayElement: () => (/* binding */ fetchArrayElement),
/* harmony export */   hexToNumber: () => (/* binding */ hexToNumber),
/* harmony export */   hexToUint8Array: () => (/* binding */ hexToUint8Array),
/* harmony export */   numberToHex: () => (/* binding */ numberToHex),
/* harmony export */   padLeft: () => (/* binding */ padLeft),
/* harmony export */   parseBaseType: () => (/* binding */ parseBaseType),
/* harmony export */   transformJsonDataToAbiFormat: () => (/* binding */ transformJsonDataToAbiFormat),
/* harmony export */   uint8ArrayToHexString: () => (/* binding */ uint8ArrayToHexString)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./node_modules/web3-validator/lib/esm/constants.js");
/* harmony import */ var _validation_abi_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation/abi.js */ "./node_modules/web3-validator/lib/esm/validation/abi.js");
/* harmony import */ var _validation_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation/string.js */ "./node_modules/web3-validator/lib/esm/validation/string.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./errors.js */ "./node_modules/web3-validator/lib/esm/errors.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/





const extraTypes = ['hex', 'number', 'blockNumber', 'blockNumberOrTag', 'filter', 'bloom'];
const parseBaseType = (type) => {
    // Remove all empty spaces to avoid any parsing issue.
    let strippedType = type.replace(/ /, '');
    let baseTypeSize;
    let isArray = false;
    let arraySizes = [];
    if (type.includes('[')) {
        // Extract the array type
        strippedType = strippedType.slice(0, strippedType.indexOf('['));
        // Extract array indexes
        arraySizes = [...type.matchAll(/(?:\[(\d*)\])/g)]
            .map(match => parseInt(match[1], 10))
            .map(size => (Number.isNaN(size) ? -1 : size));
        isArray = arraySizes.length > 0;
    }
    if (_constants_js__WEBPACK_IMPORTED_MODULE_1__.VALID_ETH_BASE_TYPES.includes(strippedType)) {
        return { baseType: strippedType, isArray, baseTypeSize, arraySizes };
    }
    if (strippedType.startsWith('int')) {
        baseTypeSize = parseInt(strippedType.substring(3), 10);
        strippedType = 'int';
    }
    else if (strippedType.startsWith('uint')) {
        baseTypeSize = parseInt(type.substring(4), 10);
        strippedType = 'uint';
    }
    else if (strippedType.startsWith('bytes')) {
        baseTypeSize = parseInt(strippedType.substring(5), 10);
        strippedType = 'bytes';
    }
    else {
        return { baseType: undefined, isArray: false, baseTypeSize: undefined, arraySizes };
    }
    return { baseType: strippedType, isArray, baseTypeSize, arraySizes };
};
const convertEthType = (type, parentSchema = {}) => {
    const typePropertyPresent = Object.keys(parentSchema).includes('type');
    if (typePropertyPresent) {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_4__.Web3ValidatorError([
            {
                keyword: 'eth',
                message: 'Either "eth" or "type" can be presented in schema',
                params: { eth: type },
                instancePath: '',
                schemaPath: '',
            },
        ]);
    }
    const { baseType, baseTypeSize } = parseBaseType(type);
    if (!baseType && !extraTypes.includes(type)) {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_4__.Web3ValidatorError([
            {
                keyword: 'eth',
                message: `Eth data type "${type}" is not valid`,
                params: { eth: type },
                instancePath: '',
                schemaPath: '',
            },
        ]);
    }
    if (baseType) {
        if (baseType === 'tuple') {
            throw new Error('"tuple" type is not implemented directly.');
        }
        return { format: `${baseType}${baseTypeSize !== null && baseTypeSize !== void 0 ? baseTypeSize : ''}`, required: true };
    }
    if (type) {
        return { format: type, required: true };
    }
    return {};
};
const abiSchemaToJsonSchema = (abis, level = '/0') => {
    const schema = {
        type: 'array',
        items: [],
        maxItems: abis.length,
        minItems: abis.length,
    };
    for (const [index, abi] of abis.entries()) {
        // eslint-disable-next-line no-nested-ternary
        let abiType;
        let abiName;
        let abiComponents = [];
        // If it's a complete Abi Parameter
        // e.g. {name: 'a', type: 'uint'}
        if ((0,_validation_abi_js__WEBPACK_IMPORTED_MODULE_2__.isAbiParameterSchema)(abi)) {
            abiType = abi.type;
            abiName = abi.name || `${level}/${index}`;
            abiComponents = abi.components;
            // If its short form string value e.g. ['uint']
        }
        else if (typeof abi === 'string') {
            abiType = abi;
            abiName = `${level}/${index}`;
            // If it's provided in short form of tuple e.g. [['uint', 'string']]
        }
        else if (Array.isArray(abi)) {
            // If its custom tuple e.g. ['tuple[2]', ['uint', 'string']]
            if (abi[0] &&
                typeof abi[0] === 'string' &&
                abi[0].startsWith('tuple') &&
                !Array.isArray(abi[0]) &&
                abi[1] &&
                Array.isArray(abi[1])) {
                // eslint-disable-next-line prefer-destructuring
                abiType = abi[0];
                abiName = `${level}/${index}`;
                abiComponents = abi[1];
            }
            else {
                abiType = 'tuple';
                abiName = `${level}/${index}`;
                abiComponents = abi;
            }
        }
        const { baseType, isArray, arraySizes } = parseBaseType(abiType);
        let childSchema;
        let lastSchema = schema;
        for (let i = arraySizes.length - 1; i > 0; i -= 1) {
            childSchema = {
                type: 'array',
                $id: abiName,
                items: [],
                maxItems: arraySizes[i],
                minItems: arraySizes[i],
            };
            if (arraySizes[i] < 0) {
                delete childSchema.maxItems;
                delete childSchema.minItems;
            }
            // lastSchema.items is a Schema, concat with 'childSchema'
            if (!Array.isArray(lastSchema.items)) {
                lastSchema.items = [lastSchema.items, childSchema];
            } // lastSchema.items is an empty Scheme array, set it to 'childSchema'
            else if (lastSchema.items.length === 0) {
                lastSchema.items = [childSchema];
            } // lastSchema.items is a non-empty Scheme array, append 'childSchema'
            else {
                lastSchema.items.push(childSchema);
            }
            lastSchema = childSchema;
        }
        if (baseType === 'tuple' && !isArray) {
            const nestedTuple = abiSchemaToJsonSchema(abiComponents, abiName);
            nestedTuple.$id = abiName;
            lastSchema.items.push(nestedTuple);
        }
        else if (baseType === 'tuple' && isArray) {
            const arraySize = arraySizes[0];
            const item = Object.assign({ type: 'array', $id: abiName, items: abiSchemaToJsonSchema(abiComponents, abiName) }, (arraySize >= 0 && { minItems: arraySize, maxItems: arraySize }));
            lastSchema.items.push(item);
        }
        else if (isArray) {
            const arraySize = arraySizes[0];
            const item = Object.assign({ type: 'array', $id: abiName, items: convertEthType(abiType) }, (arraySize >= 0 && { minItems: arraySize, maxItems: arraySize }));
            lastSchema.items.push(item);
        }
        else if (Array.isArray(lastSchema.items)) {
            // Array of non-tuple items
            lastSchema.items.push(Object.assign({ $id: abiName }, convertEthType(abiType)));
        }
        else {
            // Nested object
            lastSchema.items.push(Object.assign({ $id: abiName }, convertEthType(abiType)));
        }
        lastSchema = schema;
    }
    return schema;
};
const ethAbiToJsonSchema = (abis) => abiSchemaToJsonSchema(abis);
const fetchArrayElement = (data, level) => {
    if (level === 1) {
        return data;
    }
    return fetchArrayElement(data[0], level - 1);
};
const transformJsonDataToAbiFormat = (abis, data, transformedData) => {
    const newData = [];
    for (const [index, abi] of abis.entries()) {
        // eslint-disable-next-line no-nested-ternary
        let abiType;
        let abiName;
        let abiComponents = [];
        // If it's a complete Abi Parameter
        // e.g. {name: 'a', type: 'uint'}
        if ((0,_validation_abi_js__WEBPACK_IMPORTED_MODULE_2__.isAbiParameterSchema)(abi)) {
            abiType = abi.type;
            abiName = abi.name;
            abiComponents = abi.components;
            // If its short form string value e.g. ['uint']
        }
        else if (typeof abi === 'string') {
            abiType = abi;
            // If it's provided in short form of tuple e.g. [['uint', 'string']]
        }
        else if (Array.isArray(abi)) {
            // If its custom tuple e.g. ['tuple[2]', ['uint', 'string']]
            if (abi[1] && Array.isArray(abi[1])) {
                abiType = abi[0];
                abiComponents = abi[1];
            }
            else {
                abiType = 'tuple';
                abiComponents = abi;
            }
        }
        const { baseType, isArray, arraySizes } = parseBaseType(abiType);
        const dataItem = Array.isArray(data)
            ? data[index]
            : data[abiName];
        if (baseType === 'tuple' && !isArray) {
            newData.push(transformJsonDataToAbiFormat(abiComponents, dataItem, transformedData));
        }
        else if (baseType === 'tuple' && isArray) {
            const tupleData = [];
            for (const tupleItem of dataItem) {
                // Nested array
                if (arraySizes.length > 1) {
                    const nestedItems = fetchArrayElement(tupleItem, arraySizes.length - 1);
                    const nestedData = [];
                    for (const nestedItem of nestedItems) {
                        nestedData.push(transformJsonDataToAbiFormat(abiComponents, nestedItem, transformedData));
                    }
                    tupleData.push(nestedData);
                }
                else {
                    tupleData.push(transformJsonDataToAbiFormat(abiComponents, tupleItem, transformedData));
                }
            }
            newData.push(tupleData);
        }
        else {
            newData.push(dataItem);
        }
    }
    // Have to reassign before pushing to transformedData
    // eslint-disable-next-line no-param-reassign
    transformedData = transformedData !== null && transformedData !== void 0 ? transformedData : [];
    transformedData.push(...newData);
    return transformedData;
};
/**
 * Code points to int
 */
const codePointToInt = (codePoint) => {
    if (codePoint >= 48 && codePoint <= 57) {
        /* ['0'..'9'] -> [0..9] */
        return codePoint - 48;
    }
    if (codePoint >= 65 && codePoint <= 70) {
        /* ['A'..'F'] -> [10..15] */
        return codePoint - 55;
    }
    if (codePoint >= 97 && codePoint <= 102) {
        /* ['a'..'f'] -> [10..15] */
        return codePoint - 87;
    }
    throw new Error(`Invalid code point: ${codePoint}`);
};
/**
 * Converts value to it's number representation
 */
const hexToNumber = (value) => {
    if (!(0,_validation_string_js__WEBPACK_IMPORTED_MODULE_3__.isHexStrict)(value)) {
        throw new Error('Invalid hex string');
    }
    const [negative, hexValue] = value.startsWith('-') ? [true, value.slice(1)] : [false, value];
    const num = BigInt(hexValue);
    if (num > Number.MAX_SAFE_INTEGER) {
        return negative ? -num : num;
    }
    if (num < Number.MIN_SAFE_INTEGER) {
        return num;
    }
    return negative ? -1 * Number(num) : Number(num);
};
/**
 * Converts value to it's hex representation
 */
const numberToHex = (value) => {
    if ((typeof value === 'number' || typeof value === 'bigint') && value < 0) {
        return `-0x${value.toString(16).slice(1)}`;
    }
    if ((typeof value === 'number' || typeof value === 'bigint') && value >= 0) {
        return `0x${value.toString(16)}`;
    }
    if (typeof value === 'string' && (0,_validation_string_js__WEBPACK_IMPORTED_MODULE_3__.isHexStrict)(value)) {
        const [negative, hex] = value.startsWith('-') ? [true, value.slice(1)] : [false, value];
        const hexValue = hex.split(/^(-)?0(x|X)/).slice(-1)[0];
        return `${negative ? '-' : ''}0x${hexValue.replace(/^0+/, '').toLowerCase()}`;
    }
    if (typeof value === 'string' && !(0,_validation_string_js__WEBPACK_IMPORTED_MODULE_3__.isHexStrict)(value)) {
        return numberToHex(BigInt(value));
    }
    throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.InvalidNumberError(value);
};
/**
 * Adds a padding on the left of a string, if value is a integer or bigInt will be converted to a hex string.
 */
const padLeft = (value, characterAmount, sign = '0') => {
    if (typeof value === 'string' && !(0,_validation_string_js__WEBPACK_IMPORTED_MODULE_3__.isHexStrict)(value)) {
        return value.padStart(characterAmount, sign);
    }
    const hex = typeof value === 'string' && (0,_validation_string_js__WEBPACK_IMPORTED_MODULE_3__.isHexStrict)(value) ? value : numberToHex(value);
    const [prefix, hexValue] = hex.startsWith('-') ? ['-0x', hex.slice(3)] : ['0x', hex.slice(2)];
    return `${prefix}${hexValue.padStart(characterAmount, sign)}`;
};
function uint8ArrayToHexString(uint8Array) {
    let hexString = '0x';
    for (const e of uint8Array) {
        const hex = e.toString(16);
        hexString += hex.length === 1 ? `0${hex}` : hex;
    }
    return hexString;
}
// for optimized technique for hex to bytes conversion
const charCodeMap = {
    zero: 48,
    nine: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102,
};
function charCodeToBase16(char) {
    if (char >= charCodeMap.zero && char <= charCodeMap.nine)
        return char - charCodeMap.zero;
    if (char >= charCodeMap.A && char <= charCodeMap.F)
        return char - (charCodeMap.A - 10);
    if (char >= charCodeMap.a && char <= charCodeMap.f)
        return char - (charCodeMap.a - 10);
    return undefined;
}
function hexToUint8Array(hex) {
    let offset = 0;
    if (hex.startsWith('0') && (hex[1] === 'x' || hex[1] === 'X')) {
        offset = 2;
    }
    if (hex.length % 2 !== 0) {
        throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.InvalidBytesError(`hex string has odd length: ${hex}`);
    }
    const length = (hex.length - offset) / 2;
    const bytes = new Uint8Array(length);
    for (let index = 0, j = offset; index < length; index += 1) {
        // eslint-disable-next-line no-plusplus
        const nibbleLeft = charCodeToBase16(hex.charCodeAt(j++));
        // eslint-disable-next-line no-plusplus
        const nibbleRight = charCodeToBase16(hex.charCodeAt(j++));
        if (nibbleLeft === undefined || nibbleRight === undefined) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.InvalidBytesError(`Invalid byte sequence ("${hex[j - 2]}${hex[j - 1]}" in "${hex}").`);
        }
        bytes[index] = nibbleLeft * 16 + nibbleRight;
    }
    return bytes;
}
// @TODO: Remove this function and its usages once all sub dependencies uses version 1.3.3 or above of @noble/hashes
function ensureIfUint8Array(data) {
    var _a;
    if (!(data instanceof Uint8Array) &&
        ((_a = data === null || data === void 0 ? void 0 : data.constructor) === null || _a === void 0 ? void 0 : _a.name) === 'Uint8Array') {
        return Uint8Array.from(data);
    }
    return data;
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/validation/abi.js":
/*!***************************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/validation/abi.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAbiParameterSchema: () => (/* binding */ isAbiParameterSchema)
/* harmony export */ });
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
const isAbiParameterSchema = (schema) => typeof schema === 'object' && 'type' in schema && 'name' in schema;
//# sourceMappingURL=abi.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/validation/address.js":
/*!*******************************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/validation/address.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkAddressCheckSum: () => (/* binding */ checkAddressCheckSum),
/* harmony export */   isAddress: () => (/* binding */ isAddress)
/* harmony export */ });
/* harmony import */ var ethereum_cryptography_keccak_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethereum-cryptography/keccak.js */ "./node_modules/web3-validator/node_modules/ethereum-cryptography/esm/keccak.js");
/* harmony import */ var ethereum_cryptography_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethereum-cryptography/utils.js */ "./node_modules/web3-validator/node_modules/ethereum-cryptography/esm/utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/web3-validator/lib/esm/utils.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./string.js */ "./node_modules/web3-validator/lib/esm/validation/string.js");
/* harmony import */ var _bytes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bytes.js */ "./node_modules/web3-validator/lib/esm/validation/bytes.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/





/**
 * Checks the checksum of a given address. Will also return false on non-checksum addresses.
 */
const checkAddressCheckSum = (data) => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(data))
        return false;
    const address = data.slice(2);
    const updatedData = (0,ethereum_cryptography_utils_js__WEBPACK_IMPORTED_MODULE_1__.utf8ToBytes)(address.toLowerCase());
    const addressHash = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.uint8ArrayToHexString)((0,ethereum_cryptography_keccak_js__WEBPACK_IMPORTED_MODULE_0__.keccak256)((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.ensureIfUint8Array)(updatedData))).slice(2);
    for (let i = 0; i < 40; i += 1) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
            (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};
/**
 * Checks if a given string is a valid Ethereum address. It will also check the checksum, if the address has upper and lowercase letters.
 */
const isAddress = (value, checkChecksum = true) => {
    if (typeof value !== 'string' && !(0,_bytes_js__WEBPACK_IMPORTED_MODULE_4__.isUint8Array)(value)) {
        return false;
    }
    let valueToCheck;
    if ((0,_bytes_js__WEBPACK_IMPORTED_MODULE_4__.isUint8Array)(value)) {
        valueToCheck = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.uint8ArrayToHexString)(value);
    }
    else if (typeof value === 'string' && !(0,_string_js__WEBPACK_IMPORTED_MODULE_3__.isHexStrict)(value)) {
        valueToCheck = value.toLowerCase().startsWith('0x') ? value : `0x${value}`;
    }
    else {
        valueToCheck = value;
    }
    // check if it has the basic requirements of an address
    if (!/^(0x)?[0-9a-f]{40}$/i.test(valueToCheck)) {
        return false;
    }
    // If it's ALL lowercase or ALL upppercase
    if (/^(0x|0X)?[0-9a-f]{40}$/.test(valueToCheck) ||
        /^(0x|0X)?[0-9A-F]{40}$/.test(valueToCheck)) {
        return true;
        // Otherwise check each case
    }
    return checkChecksum ? checkAddressCheckSum(valueToCheck) : true;
};
//# sourceMappingURL=address.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/validation/block.js":
/*!*****************************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/validation/block.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBlockNumber: () => (/* binding */ isBlockNumber),
/* harmony export */   isBlockNumberOrTag: () => (/* binding */ isBlockNumberOrTag),
/* harmony export */   isBlockTag: () => (/* binding */ isBlockTag)
/* harmony export */ });
/* harmony import */ var web3_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-types */ "./node_modules/web3-types/lib/esm/index.js");
/* harmony import */ var _numbers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./numbers.js */ "./node_modules/web3-validator/lib/esm/validation/numbers.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/


const isBlockNumber = (value) => (0,_numbers_js__WEBPACK_IMPORTED_MODULE_1__.isUInt)(value);
/**
 * Returns true if the given blockNumber is 'latest', 'pending', 'earliest, 'safe' or 'finalized'
 */
const isBlockTag = (value) => Object.values(web3_types__WEBPACK_IMPORTED_MODULE_0__.BlockTags).includes(value);
/**
 * Returns true if given value is valid hex string and not negative, or is a valid BlockTag
 */
const isBlockNumberOrTag = (value) => isBlockTag(value) || isBlockNumber(value);
//# sourceMappingURL=block.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/validation/bloom.js":
/*!*****************************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/validation/bloom.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBloom: () => (/* binding */ isBloom),
/* harmony export */   isContractAddressInBloom: () => (/* binding */ isContractAddressInBloom),
/* harmony export */   isInBloom: () => (/* binding */ isInBloom),
/* harmony export */   isUserEthereumAddressInBloom: () => (/* binding */ isUserEthereumAddressInBloom)
/* harmony export */ });
/* harmony import */ var ethereum_cryptography_keccak_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethereum-cryptography/keccak.js */ "./node_modules/web3-validator/node_modules/ethereum-cryptography/esm/keccak.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/web3-validator/lib/esm/utils.js");
/* harmony import */ var _address_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./address.js */ "./node_modules/web3-validator/lib/esm/validation/address.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./string.js */ "./node_modules/web3-validator/lib/esm/validation/string.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/




/**
 * Returns true if the bloom is a valid bloom
 * https://github.com/joshstevens19/ethereum-bloom-filters/blob/fbeb47b70b46243c3963fe1c2988d7461ef17236/src/index.ts#L7
 */
const isBloom = (bloom) => {
    if (typeof bloom !== 'string') {
        return false;
    }
    if (!/^(0x)?[0-9a-f]{512}$/i.test(bloom)) {
        return false;
    }
    if (/^(0x)?[0-9a-f]{512}$/.test(bloom) || /^(0x)?[0-9A-F]{512}$/.test(bloom)) {
        return true;
    }
    return false;
};
/**
 * Returns true if the value is part of the given bloom
 * note: false positives are possible.
 */
const isInBloom = (bloom, value) => {
    if (typeof value === 'string' && !(0,_string_js__WEBPACK_IMPORTED_MODULE_3__.isHexStrict)(value)) {
        return false;
    }
    if (!isBloom(bloom)) {
        return false;
    }
    const uint8Array = typeof value === 'string' ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.hexToUint8Array)(value) : value;
    const hash = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.uint8ArrayToHexString)((0,ethereum_cryptography_keccak_js__WEBPACK_IMPORTED_MODULE_0__.keccak256)(uint8Array)).slice(2);
    for (let i = 0; i < 12; i += 4) {
        // calculate bit position in bloom filter that must be active
        const bitpos = 
        // eslint-disable-next-line no-bitwise
        ((parseInt(hash.slice(i, i + 2), 16) << 8) + parseInt(hash.slice(i + 2, i + 4), 16)) &
            2047;
        // test if bitpos in bloom is active
        const code = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.codePointToInt)(bloom.charCodeAt(bloom.length - 1 - Math.floor(bitpos / 4)));
        // eslint-disable-next-line no-bitwise
        const offset = 1 << bitpos % 4;
        // eslint-disable-next-line no-bitwise
        if ((code & offset) !== offset) {
            return false;
        }
    }
    return true;
};
/**
 * Returns true if the ethereum users address is part of the given bloom note: false positives are possible.
 */
const isUserEthereumAddressInBloom = (bloom, ethereumAddress) => {
    if (!isBloom(bloom)) {
        return false;
    }
    if (!(0,_address_js__WEBPACK_IMPORTED_MODULE_2__.isAddress)(ethereumAddress)) {
        return false;
    }
    // you have to pad the ethereum address to 32 bytes
    // else the bloom filter does not work
    // this is only if your matching the USERS
    // ethereum address. Contract address do not need this
    // hence why we have 2 methods
    // (0x is not in the 2nd parameter of padleft so 64 chars is fine)
    const address = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.padLeft)(ethereumAddress, 64);
    return isInBloom(bloom, address);
};
/**
 * Returns true if the contract address is part of the given bloom.
 * note: false positives are possible.
 */
const isContractAddressInBloom = (bloom, contractAddress) => {
    if (!isBloom(bloom)) {
        return false;
    }
    if (!(0,_address_js__WEBPACK_IMPORTED_MODULE_2__.isAddress)(contractAddress)) {
        return false;
    }
    return isInBloom(bloom, contractAddress);
};
//# sourceMappingURL=bloom.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/validation/boolean.js":
/*!*******************************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/validation/boolean.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBoolean: () => (/* binding */ isBoolean)
/* harmony export */ });
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./string.js */ "./node_modules/web3-validator/lib/esm/validation/string.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

const isBoolean = (value) => {
    if (!['number', 'string', 'boolean'].includes(typeof value)) {
        return false;
    }
    if (typeof value === 'boolean') {
        return true;
    }
    if (typeof value === 'string' && !(0,_string_js__WEBPACK_IMPORTED_MODULE_0__.isHexStrict)(value)) {
        return value === '1' || value === '0';
    }
    if (typeof value === 'string' && (0,_string_js__WEBPACK_IMPORTED_MODULE_0__.isHexStrict)(value)) {
        return value === '0x1' || value === '0x0';
    }
    // type === number
    return value === 1 || value === 0;
};
//# sourceMappingURL=boolean.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/validation/bytes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/validation/bytes.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBytes: () => (/* binding */ isBytes),
/* harmony export */   isUint8Array: () => (/* binding */ isUint8Array)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/web3-validator/lib/esm/utils.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./string.js */ "./node_modules/web3-validator/lib/esm/validation/string.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/


/**
 * checks input if typeof data is valid Uint8Array input
 */
const isUint8Array = (data) => { var _a, _b; return data instanceof Uint8Array || ((_a = data === null || data === void 0 ? void 0 : data.constructor) === null || _a === void 0 ? void 0 : _a.name) === 'Uint8Array' || ((_b = data === null || data === void 0 ? void 0 : data.constructor) === null || _b === void 0 ? void 0 : _b.name) === 'Buffer'; };
const isBytes = (value, options = {
    abiType: 'bytes',
}) => {
    if (typeof value !== 'string' && !Array.isArray(value) && !isUint8Array(value)) {
        return false;
    }
    // isHexStrict also accepts - prefix which can not exists in bytes
    if (typeof value === 'string' && (0,_string_js__WEBPACK_IMPORTED_MODULE_1__.isHexStrict)(value) && value.startsWith('-')) {
        return false;
    }
    if (typeof value === 'string' && !(0,_string_js__WEBPACK_IMPORTED_MODULE_1__.isHexStrict)(value)) {
        return false;
    }
    let valueToCheck;
    if (typeof value === 'string') {
        if (value.length % 2 !== 0) {
            // odd length hex
            return false;
        }
        valueToCheck = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.hexToUint8Array)(value);
    }
    else if (Array.isArray(value)) {
        if (value.some(d => d < 0 || d > 255 || !Number.isInteger(d))) {
            return false;
        }
        valueToCheck = new Uint8Array(value);
    }
    else {
        valueToCheck = value;
    }
    if (options === null || options === void 0 ? void 0 : options.abiType) {
        const { baseTypeSize } = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.parseBaseType)(options.abiType);
        return baseTypeSize ? valueToCheck.length === baseTypeSize : true;
    }
    if (options === null || options === void 0 ? void 0 : options.size) {
        return valueToCheck.length === (options === null || options === void 0 ? void 0 : options.size);
    }
    return true;
};
//# sourceMappingURL=bytes.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/validation/eth.js":
/*!***************************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/validation/eth.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isValidEthBaseType: () => (/* binding */ isValidEthBaseType)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/web3-validator/lib/esm/utils.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

const isValidEthBaseType = (type) => {
    const { baseType, baseTypeSize } = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.parseBaseType)(type);
    if (!baseType) {
        return false;
    }
    if (baseType === type) {
        return true;
    }
    if ((baseType === 'int' || baseType === 'uint') && baseTypeSize) {
        if (!(baseTypeSize <= 256 && baseTypeSize % 8 === 0)) {
            return false;
        }
    }
    if (baseType === 'bytes' && baseTypeSize) {
        if (!(baseTypeSize >= 1 && baseTypeSize <= 32)) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=eth.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/validation/filter.js":
/*!******************************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/validation/filter.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isFilterObject: () => (/* binding */ isFilterObject)
/* harmony export */ });
/* harmony import */ var _address_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./address.js */ "./node_modules/web3-validator/lib/esm/validation/address.js");
/* harmony import */ var _block_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.js */ "./node_modules/web3-validator/lib/esm/validation/block.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./object.js */ "./node_modules/web3-validator/lib/esm/validation/object.js");
/* harmony import */ var _topic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./topic.js */ "./node_modules/web3-validator/lib/esm/validation/topic.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/




/**
 * First we check if all properties in the provided value are expected,
 * then because all Filter properties are optional, we check if the expected properties
 * are defined. If defined and they're not the expected type, we immediately return false,
 * otherwise we return true after all checks pass.
 */
const isFilterObject = (value) => {
    const expectedFilterProperties = [
        'fromBlock',
        'toBlock',
        'address',
        'topics',
        'blockHash',
    ];
    if ((0,_object_js__WEBPACK_IMPORTED_MODULE_2__.isNullish)(value) || typeof value !== 'object')
        return false;
    if (!Object.keys(value).every(property => expectedFilterProperties.includes(property)))
        return false;
    if ((!(0,_object_js__WEBPACK_IMPORTED_MODULE_2__.isNullish)(value.fromBlock) && !(0,_block_js__WEBPACK_IMPORTED_MODULE_1__.isBlockNumberOrTag)(value.fromBlock)) ||
        (!(0,_object_js__WEBPACK_IMPORTED_MODULE_2__.isNullish)(value.toBlock) && !(0,_block_js__WEBPACK_IMPORTED_MODULE_1__.isBlockNumberOrTag)(value.toBlock)))
        return false;
    if (!(0,_object_js__WEBPACK_IMPORTED_MODULE_2__.isNullish)(value.address)) {
        if (Array.isArray(value.address)) {
            if (!value.address.every(address => (0,_address_js__WEBPACK_IMPORTED_MODULE_0__.isAddress)(address)))
                return false;
        }
        else if (!(0,_address_js__WEBPACK_IMPORTED_MODULE_0__.isAddress)(value.address))
            return false;
    }
    if (!(0,_object_js__WEBPACK_IMPORTED_MODULE_2__.isNullish)(value.topics)) {
        if (!value.topics.every(topic => {
            if ((0,_object_js__WEBPACK_IMPORTED_MODULE_2__.isNullish)(topic))
                return true;
            if (Array.isArray(topic)) {
                return topic.every(nestedTopic => (0,_topic_js__WEBPACK_IMPORTED_MODULE_3__.isTopic)(nestedTopic));
            }
            if ((0,_topic_js__WEBPACK_IMPORTED_MODULE_3__.isTopic)(topic))
                return true;
            return false;
        }))
            return false;
    }
    return true;
};
//# sourceMappingURL=filter.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/validation/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/validation/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bigintPower: () => (/* reexport safe */ _numbers_js__WEBPACK_IMPORTED_MODULE_7__.bigintPower),
/* harmony export */   checkAddressCheckSum: () => (/* reexport safe */ _address_js__WEBPACK_IMPORTED_MODULE_0__.checkAddressCheckSum),
/* harmony export */   isAddress: () => (/* reexport safe */ _address_js__WEBPACK_IMPORTED_MODULE_0__.isAddress),
/* harmony export */   isBigInt: () => (/* reexport safe */ _numbers_js__WEBPACK_IMPORTED_MODULE_7__.isBigInt),
/* harmony export */   isBlockNumber: () => (/* reexport safe */ _block_js__WEBPACK_IMPORTED_MODULE_1__.isBlockNumber),
/* harmony export */   isBlockNumberOrTag: () => (/* reexport safe */ _block_js__WEBPACK_IMPORTED_MODULE_1__.isBlockNumberOrTag),
/* harmony export */   isBlockTag: () => (/* reexport safe */ _block_js__WEBPACK_IMPORTED_MODULE_1__.isBlockTag),
/* harmony export */   isBloom: () => (/* reexport safe */ _bloom_js__WEBPACK_IMPORTED_MODULE_2__.isBloom),
/* harmony export */   isBoolean: () => (/* reexport safe */ _boolean_js__WEBPACK_IMPORTED_MODULE_3__.isBoolean),
/* harmony export */   isBytes: () => (/* reexport safe */ _bytes_js__WEBPACK_IMPORTED_MODULE_4__.isBytes),
/* harmony export */   isContractAddressInBloom: () => (/* reexport safe */ _bloom_js__WEBPACK_IMPORTED_MODULE_2__.isContractAddressInBloom),
/* harmony export */   isFilterObject: () => (/* reexport safe */ _filter_js__WEBPACK_IMPORTED_MODULE_6__.isFilterObject),
/* harmony export */   isHex: () => (/* reexport safe */ _string_js__WEBPACK_IMPORTED_MODULE_8__.isHex),
/* harmony export */   isHexPrefixed: () => (/* reexport safe */ _string_js__WEBPACK_IMPORTED_MODULE_8__.isHexPrefixed),
/* harmony export */   isHexStrict: () => (/* reexport safe */ _string_js__WEBPACK_IMPORTED_MODULE_8__.isHexStrict),
/* harmony export */   isHexString: () => (/* reexport safe */ _string_js__WEBPACK_IMPORTED_MODULE_8__.isHexString),
/* harmony export */   isHexString32Bytes: () => (/* reexport safe */ _string_js__WEBPACK_IMPORTED_MODULE_8__.isHexString32Bytes),
/* harmony export */   isHexString8Bytes: () => (/* reexport safe */ _string_js__WEBPACK_IMPORTED_MODULE_8__.isHexString8Bytes),
/* harmony export */   isInBloom: () => (/* reexport safe */ _bloom_js__WEBPACK_IMPORTED_MODULE_2__.isInBloom),
/* harmony export */   isInt: () => (/* reexport safe */ _numbers_js__WEBPACK_IMPORTED_MODULE_7__.isInt),
/* harmony export */   isNullish: () => (/* reexport safe */ _object_js__WEBPACK_IMPORTED_MODULE_10__.isNullish),
/* harmony export */   isNumber: () => (/* reexport safe */ _numbers_js__WEBPACK_IMPORTED_MODULE_7__.isNumber),
/* harmony export */   isObject: () => (/* reexport safe */ _object_js__WEBPACK_IMPORTED_MODULE_10__.isObject),
/* harmony export */   isString: () => (/* reexport safe */ _string_js__WEBPACK_IMPORTED_MODULE_8__.isString),
/* harmony export */   isTopic: () => (/* reexport safe */ _topic_js__WEBPACK_IMPORTED_MODULE_9__.isTopic),
/* harmony export */   isTopicInBloom: () => (/* reexport safe */ _topic_js__WEBPACK_IMPORTED_MODULE_9__.isTopicInBloom),
/* harmony export */   isUInt: () => (/* reexport safe */ _numbers_js__WEBPACK_IMPORTED_MODULE_7__.isUInt),
/* harmony export */   isUint8Array: () => (/* reexport safe */ _bytes_js__WEBPACK_IMPORTED_MODULE_4__.isUint8Array),
/* harmony export */   isUserEthereumAddressInBloom: () => (/* reexport safe */ _bloom_js__WEBPACK_IMPORTED_MODULE_2__.isUserEthereumAddressInBloom),
/* harmony export */   isValidEthBaseType: () => (/* reexport safe */ _eth_js__WEBPACK_IMPORTED_MODULE_5__.isValidEthBaseType),
/* harmony export */   validateNoLeadingZeroes: () => (/* reexport safe */ _string_js__WEBPACK_IMPORTED_MODULE_8__.validateNoLeadingZeroes)
/* harmony export */ });
/* harmony import */ var _address_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./address.js */ "./node_modules/web3-validator/lib/esm/validation/address.js");
/* harmony import */ var _block_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.js */ "./node_modules/web3-validator/lib/esm/validation/block.js");
/* harmony import */ var _bloom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bloom.js */ "./node_modules/web3-validator/lib/esm/validation/bloom.js");
/* harmony import */ var _boolean_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boolean.js */ "./node_modules/web3-validator/lib/esm/validation/boolean.js");
/* harmony import */ var _bytes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bytes.js */ "./node_modules/web3-validator/lib/esm/validation/bytes.js");
/* harmony import */ var _eth_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./eth.js */ "./node_modules/web3-validator/lib/esm/validation/eth.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./filter.js */ "./node_modules/web3-validator/lib/esm/validation/filter.js");
/* harmony import */ var _numbers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./numbers.js */ "./node_modules/web3-validator/lib/esm/validation/numbers.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./string.js */ "./node_modules/web3-validator/lib/esm/validation/string.js");
/* harmony import */ var _topic_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./topic.js */ "./node_modules/web3-validator/lib/esm/validation/topic.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./object.js */ "./node_modules/web3-validator/lib/esm/validation/object.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/











//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/validation/numbers.js":
/*!*******************************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/validation/numbers.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bigintPower: () => (/* binding */ bigintPower),
/* harmony export */   isBigInt: () => (/* binding */ isBigInt),
/* harmony export */   isInt: () => (/* binding */ isInt),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isUInt: () => (/* binding */ isUInt)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/web3-validator/lib/esm/utils.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./string.js */ "./node_modules/web3-validator/lib/esm/validation/string.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/


/**
 * Checks if a given value is a valid big int
 */
const isBigInt = (value) => typeof value === 'bigint';
// Note: this could be simplified using ** operator, but babel does not handle it well
// 	you can find more at: https://github.com/babel/babel/issues/13109 and https://github.com/web3/web3.js/issues/6187
/** @internal */
const bigintPower = (base, expo) => {
    // edge case
    if (expo === BigInt(0)) {
        return BigInt(1);
    }
    let res = base;
    for (let index = 1; index < expo; index += 1) {
        res *= base;
    }
    return res;
};
const isUInt = (value, options = {
    abiType: 'uint',
}) => {
    if (!['number', 'string', 'bigint'].includes(typeof value) ||
        (typeof value === 'string' && value.length === 0)) {
        return false;
    }
    let size;
    if (options === null || options === void 0 ? void 0 : options.abiType) {
        const { baseTypeSize } = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.parseBaseType)(options.abiType);
        if (baseTypeSize) {
            size = baseTypeSize;
        }
    }
    else if (options.bitSize) {
        size = options.bitSize;
    }
    const maxSize = bigintPower(BigInt(2), BigInt(size !== null && size !== void 0 ? size : 256)) - BigInt(1);
    try {
        const valueToCheck = typeof value === 'string' && (0,_string_js__WEBPACK_IMPORTED_MODULE_1__.isHexStrict)(value)
            ? BigInt((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.hexToNumber)(value))
            : BigInt(value);
        return valueToCheck >= 0 && valueToCheck <= maxSize;
    }
    catch (error) {
        // Some invalid number value given which can not be converted via BigInt
        return false;
    }
};
const isInt = (value, options = {
    abiType: 'int',
}) => {
    if (!['number', 'string', 'bigint'].includes(typeof value)) {
        return false;
    }
    if (typeof value === 'number' && value > Number.MAX_SAFE_INTEGER) {
        return false;
    }
    let size;
    if (options === null || options === void 0 ? void 0 : options.abiType) {
        const { baseTypeSize, baseType } = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.parseBaseType)(options.abiType);
        if (baseType !== 'int') {
            return false;
        }
        if (baseTypeSize) {
            size = baseTypeSize;
        }
    }
    else if (options.bitSize) {
        size = options.bitSize;
    }
    const maxSize = bigintPower(BigInt(2), BigInt((size !== null && size !== void 0 ? size : 256) - 1));
    const minSize = BigInt(-1) * bigintPower(BigInt(2), BigInt((size !== null && size !== void 0 ? size : 256) - 1));
    try {
        const valueToCheck = typeof value === 'string' && (0,_string_js__WEBPACK_IMPORTED_MODULE_1__.isHexStrict)(value)
            ? BigInt((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.hexToNumber)(value))
            : BigInt(value);
        return valueToCheck >= minSize && valueToCheck <= maxSize;
    }
    catch (error) {
        // Some invalid number value given which can not be converted via BigInt
        return false;
    }
};
const isNumber = (value) => {
    if (isInt(value)) {
        return true;
    }
    // It would be a decimal number
    if (typeof value === 'string' &&
        /[0-9.]/.test(value) &&
        value.indexOf('.') === value.lastIndexOf('.')) {
        return true;
    }
    if (typeof value === 'number') {
        return true;
    }
    return false;
};
//# sourceMappingURL=numbers.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/validation/object.js":
/*!******************************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/validation/object.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNullish: () => (/* binding */ isNullish),
/* harmony export */   isObject: () => (/* binding */ isObject)
/* harmony export */ });
/* harmony import */ var web3_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-types */ "./node_modules/web3-types/lib/esm/index.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

// Explicitly check for the
// eslint-disable-next-line @typescript-eslint/ban-types
const isNullish = (item) => 
// Using "null" value intentionally for validation
// eslint-disable-next-line no-null/no-null
item === undefined || item === null;
const isObject = (item) => typeof item === 'object' &&
    !isNullish(item) &&
    !Array.isArray(item) &&
    !(item instanceof web3_types__WEBPACK_IMPORTED_MODULE_0__.TypedArray);
//# sourceMappingURL=object.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/validation/string.js":
/*!******************************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/validation/string.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isHex: () => (/* binding */ isHex),
/* harmony export */   isHexPrefixed: () => (/* binding */ isHexPrefixed),
/* harmony export */   isHexStrict: () => (/* binding */ isHexStrict),
/* harmony export */   isHexString: () => (/* binding */ isHexString),
/* harmony export */   isHexString32Bytes: () => (/* binding */ isHexString32Bytes),
/* harmony export */   isHexString8Bytes: () => (/* binding */ isHexString8Bytes),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   validateNoLeadingZeroes: () => (/* binding */ validateNoLeadingZeroes)
/* harmony export */ });
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * checks input if typeof data is valid string input
 */
const isString = (value) => typeof value === 'string';
const isHexStrict = (hex) => typeof hex === 'string' && /^((-)?0x[0-9a-f]+|(0x))$/i.test(hex);
/**
 * Is the string a hex string.
 *
 * @param  value
 * @param  length
 * @returns  output the string is a hex string
 */
function isHexString(value, length) {
    if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/))
        return false;
    if (typeof length !== 'undefined' && length > 0 && value.length !== 2 + 2 * length)
        return false;
    return true;
}
const isHex = (hex) => typeof hex === 'number' ||
    typeof hex === 'bigint' ||
    (typeof hex === 'string' && /^((-0x|0x|-)?[0-9a-f]+|(0x))$/i.test(hex));
const isHexString8Bytes = (value, prefixed = true) => prefixed ? isHexStrict(value) && value.length === 18 : isHex(value) && value.length === 16;
const isHexString32Bytes = (value, prefixed = true) => prefixed ? isHexStrict(value) && value.length === 66 : isHex(value) && value.length === 64;
/**
 * Returns a `Boolean` on whether or not the a `String` starts with '0x'
 * @param str the string input value
 * @return a boolean if it is or is not hex prefixed
 * @throws if the str input is not a string
 */
function isHexPrefixed(str) {
    if (typeof str !== 'string') {
        throw new Error(`[isHexPrefixed] input must be type 'string', received type ${typeof str}`);
    }
    return str.startsWith('0x');
}
/**
 * Checks provided Uint8Array for leading zeroes and throws if found.
 *
 * Examples:
 *
 * Valid values: 0x1, 0x, 0x01, 0x1234
 * Invalid values: 0x0, 0x00, 0x001, 0x0001
 *
 * Note: This method is useful for validating that RLP encoded integers comply with the rule that all
 * integer values encoded to RLP must be in the most compact form and contain no leading zero bytes
 * @param values An object containing string keys and Uint8Array values
 * @throws if any provided value is found to have leading zero bytes
 */
const validateNoLeadingZeroes = function (values) {
    for (const [k, v] of Object.entries(values)) {
        if (v !== undefined && v.length > 0 && v[0] === 0) {
            throw new Error(`${k} cannot have leading zeroes, received: ${v.toString()}`);
        }
    }
};
//# sourceMappingURL=string.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/validation/topic.js":
/*!*****************************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/validation/topic.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isTopic: () => (/* binding */ isTopic),
/* harmony export */   isTopicInBloom: () => (/* binding */ isTopicInBloom)
/* harmony export */ });
/* harmony import */ var _bloom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bloom.js */ "./node_modules/web3-validator/lib/esm/validation/bloom.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * Checks if its a valid topic
 */
const isTopic = (topic) => {
    if (typeof topic !== 'string') {
        return false;
    }
    if (!/^(0x)?[0-9a-f]{64}$/i.test(topic)) {
        return false;
    }
    if (/^(0x)?[0-9a-f]{64}$/.test(topic) || /^(0x)?[0-9A-F]{64}$/.test(topic)) {
        return true;
    }
    return false;
};
/**
 * Returns true if the topic is part of the given bloom.
 * note: false positives are possible.
 */
const isTopicInBloom = (bloom, topic) => {
    if (!(0,_bloom_js__WEBPACK_IMPORTED_MODULE_0__.isBloom)(bloom)) {
        return false;
    }
    if (!isTopic(topic)) {
        return false;
    }
    return (0,_bloom_js__WEBPACK_IMPORTED_MODULE_0__.isInBloom)(bloom, topic);
};
//# sourceMappingURL=topic.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/validator.js":
/*!**********************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/validator.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Validator: () => (/* binding */ Validator)
/* harmony export */ });
/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3-errors */ "./node_modules/web3-errors/lib/esm/index.js");
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zod */ "./node_modules/zod/dist/esm/index.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors.js */ "./node_modules/web3-validator/lib/esm/errors.js");
/* harmony import */ var _formats_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formats.js */ "./node_modules/web3-validator/lib/esm/formats.js");
/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/




const convertToZod = (schema) => {
    if ((!(schema === null || schema === void 0 ? void 0 : schema.type) || (schema === null || schema === void 0 ? void 0 : schema.type) === 'object') && (schema === null || schema === void 0 ? void 0 : schema.properties)) {
        const obj = {};
        for (const name of Object.keys(schema.properties)) {
            const zItem = convertToZod(schema.properties[name]);
            if (zItem) {
                obj[name] = zItem;
            }
        }
        if (Array.isArray(schema.required)) {
            return zod__WEBPACK_IMPORTED_MODULE_1__.z.object(obj)
                .partial()
                .required(schema.required.reduce((acc, v) => (Object.assign(Object.assign({}, acc), { [v]: true })), {}));
        }
        return zod__WEBPACK_IMPORTED_MODULE_1__.z.object(obj).partial();
    }
    if ((schema === null || schema === void 0 ? void 0 : schema.type) === 'array' && (schema === null || schema === void 0 ? void 0 : schema.items)) {
        if (Array.isArray(schema.items) && schema.items.length > 1
            && schema.maxItems !== undefined
            && new Set(schema.items.map((item) => item.$id)).size === schema.items.length) {
            const arr = [];
            for (const item of schema.items) {
                const zItem = convertToZod(item);
                if (zItem) {
                    arr.push(zItem);
                }
            }
            return zod__WEBPACK_IMPORTED_MODULE_1__.z.tuple(arr);
        }
        const nextSchema = Array.isArray(schema.items) ? schema.items[0] : schema.items;
        let zodArraySchema = zod__WEBPACK_IMPORTED_MODULE_1__.z.array(convertToZod(nextSchema));
        zodArraySchema = schema.minItems !== undefined ? zodArraySchema.min(schema.minItems) : zodArraySchema;
        zodArraySchema = schema.maxItems !== undefined ? zodArraySchema.max(schema.maxItems) : zodArraySchema;
        return zodArraySchema;
    }
    if (schema.oneOf && Array.isArray(schema.oneOf)) {
        return zod__WEBPACK_IMPORTED_MODULE_1__.z.union(schema.oneOf.map(oneOfSchema => convertToZod(oneOfSchema)));
    }
    if (schema === null || schema === void 0 ? void 0 : schema.format) {
        if (!_formats_js__WEBPACK_IMPORTED_MODULE_3__["default"][schema.format]) {
            throw new web3_errors__WEBPACK_IMPORTED_MODULE_0__.SchemaFormatError(schema.format);
        }
        return zod__WEBPACK_IMPORTED_MODULE_1__.z.any().refine(_formats_js__WEBPACK_IMPORTED_MODULE_3__["default"][schema.format], (value) => ({
            params: { value, format: schema.format },
        }));
    }
    if ((schema === null || schema === void 0 ? void 0 : schema.type) &&
        (schema === null || schema === void 0 ? void 0 : schema.type) !== 'object' &&
        typeof zod__WEBPACK_IMPORTED_MODULE_1__.z[String(schema.type)] === 'function') {
        return zod__WEBPACK_IMPORTED_MODULE_1__.z[String(schema.type)]();
    }
    return zod__WEBPACK_IMPORTED_MODULE_1__.z.object({ data: zod__WEBPACK_IMPORTED_MODULE_1__.z.any() }).partial();
};
class Validator {
    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    static factory() {
        if (!Validator.validatorInstance) {
            Validator.validatorInstance = new Validator();
        }
        return Validator.validatorInstance;
    }
    validate(schema, data, options) {
        var _a, _b;
        const zod = convertToZod(schema);
        const result = zod.safeParse(data);
        if (!result.success) {
            const errors = this.convertErrors((_b = (_a = result.error) === null || _a === void 0 ? void 0 : _a.issues) !== null && _b !== void 0 ? _b : []);
            if (errors) {
                if (options === null || options === void 0 ? void 0 : options.silent) {
                    return errors;
                }
                throw new _errors_js__WEBPACK_IMPORTED_MODULE_2__.Web3ValidatorError(errors);
            }
        }
        return undefined;
    }
    // eslint-disable-next-line class-methods-use-this
    convertErrors(errors) {
        if (errors && Array.isArray(errors) && errors.length > 0) {
            return errors.map((error) => {
                var _a;
                let message;
                let keyword;
                let params;
                let schemaPath;
                schemaPath = error.path.join('/');
                const field = String(error.path[error.path.length - 1]);
                const instancePath = error.path.join('/');
                if (error.code === zod__WEBPACK_IMPORTED_MODULE_1__.ZodIssueCode.too_big) {
                    keyword = 'maxItems';
                    schemaPath = `${instancePath}/maxItems`;
                    params = { limit: error.maximum };
                    message = `must NOT have more than ${error.maximum} items`;
                }
                else if (error.code === zod__WEBPACK_IMPORTED_MODULE_1__.ZodIssueCode.too_small) {
                    keyword = 'minItems';
                    schemaPath = `${instancePath}/minItems`;
                    params = { limit: error.minimum };
                    message = `must NOT have fewer than ${error.minimum} items`;
                }
                else if (error.code === zod__WEBPACK_IMPORTED_MODULE_1__.ZodIssueCode.custom) {
                    const { value, format } = ((_a = error.params) !== null && _a !== void 0 ? _a : {});
                    if (typeof value === 'undefined') {
                        message = `value at "/${schemaPath}" is required`;
                    }
                    else {
                        message = `value "${
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        typeof value === 'object' ? JSON.stringify(value) : value}" at "/${schemaPath}" must pass "${format}" validation`;
                    }
                    params = { value };
                }
                return {
                    keyword: keyword !== null && keyword !== void 0 ? keyword : field,
                    instancePath: instancePath ? `/${instancePath}` : '',
                    schemaPath: schemaPath ? `#${schemaPath}` : '#',
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    params: params !== null && params !== void 0 ? params : { value: error.message },
                    message: message !== null && message !== void 0 ? message : error.message,
                };
            });
        }
        return undefined;
    }
}
//# sourceMappingURL=validator.js.map

/***/ }),

/***/ "./node_modules/web3-validator/lib/esm/web3_validator.js":
/*!***************************************************************!*\
  !*** ./node_modules/web3-validator/lib/esm/web3_validator.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Web3Validator: () => (/* binding */ Web3Validator)
/* harmony export */ });
/* harmony import */ var _validator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validator.js */ "./node_modules/web3-validator/lib/esm/validator.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web3-validator/lib/esm/utils.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors.js */ "./node_modules/web3-validator/lib/esm/errors.js");



class Web3Validator {
    constructor() {
        this._validator = _validator_js__WEBPACK_IMPORTED_MODULE_0__.Validator.factory();
    }
    validateJSONSchema(schema, data, options) {
        return this._validator.validate(schema, data, options);
    }
    validate(schema, data, options = { silent: false }) {
        var _a, _b;
        const jsonSchema = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.ethAbiToJsonSchema)(schema);
        if (Array.isArray(jsonSchema.items) &&
            ((_a = jsonSchema.items) === null || _a === void 0 ? void 0 : _a.length) === 0 &&
            data.length === 0) {
            return undefined;
        }
        if (Array.isArray(jsonSchema.items) &&
            ((_b = jsonSchema.items) === null || _b === void 0 ? void 0 : _b.length) === 0 &&
            data.length !== 0) {
            throw new _errors_js__WEBPACK_IMPORTED_MODULE_2__.Web3ValidatorError([
                {
                    instancePath: '/0',
                    schemaPath: '/',
                    keyword: 'required',
                    message: 'empty schema against data can not be validated',
                    params: data,
                },
            ]);
        }
        return this._validator.validate(jsonSchema, data, options);
    }
}
//# sourceMappingURL=web3_validator.js.map

/***/ }),

/***/ "./node_modules/web3-validator/node_modules/@noble/hashes/esm/_assert.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/web3-validator/node_modules/@noble/hashes/esm/_assert.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bool: () => (/* binding */ bool),
/* harmony export */   bytes: () => (/* binding */ bytes),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   exists: () => (/* binding */ exists),
/* harmony export */   hash: () => (/* binding */ hash),
/* harmony export */   isBytes: () => (/* binding */ isBytes),
/* harmony export */   number: () => (/* binding */ number),
/* harmony export */   output: () => (/* binding */ output)
/* harmony export */ });
function number(n) {
    if (!Number.isSafeInteger(n) || n < 0)
        throw new Error(`positive integer expected, not ${n}`);
}
function bool(b) {
    if (typeof b !== 'boolean')
        throw new Error(`boolean expected, not ${b}`);
}
// copied from utils
function isBytes(a) {
    return (a instanceof Uint8Array ||
        (a != null && typeof a === 'object' && a.constructor.name === 'Uint8Array'));
}
function bytes(b, ...lengths) {
    if (!isBytes(b))
        throw new Error('Uint8Array expected');
    if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
}
function hash(h) {
    if (typeof h !== 'function' || typeof h.create !== 'function')
        throw new Error('Hash should be wrapped by utils.wrapConstructor');
    number(h.outputLen);
    number(h.blockLen);
}
function exists(instance, checkFinished = true) {
    if (instance.destroyed)
        throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished)
        throw new Error('Hash#digest() has already been called');
}
function output(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
}

const assert = { number, bool, bytes, hash, exists, output };
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (assert);
//# sourceMappingURL=_assert.js.map

/***/ }),

/***/ "./node_modules/web3-validator/node_modules/@noble/hashes/esm/_u64.js":
/*!****************************************************************************!*\
  !*** ./node_modules/web3-validator/node_modules/@noble/hashes/esm/_u64.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: () => (/* binding */ add),
/* harmony export */   add3H: () => (/* binding */ add3H),
/* harmony export */   add3L: () => (/* binding */ add3L),
/* harmony export */   add4H: () => (/* binding */ add4H),
/* harmony export */   add4L: () => (/* binding */ add4L),
/* harmony export */   add5H: () => (/* binding */ add5H),
/* harmony export */   add5L: () => (/* binding */ add5L),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fromBig: () => (/* binding */ fromBig),
/* harmony export */   rotlBH: () => (/* binding */ rotlBH),
/* harmony export */   rotlBL: () => (/* binding */ rotlBL),
/* harmony export */   rotlSH: () => (/* binding */ rotlSH),
/* harmony export */   rotlSL: () => (/* binding */ rotlSL),
/* harmony export */   rotr32H: () => (/* binding */ rotr32H),
/* harmony export */   rotr32L: () => (/* binding */ rotr32L),
/* harmony export */   rotrBH: () => (/* binding */ rotrBH),
/* harmony export */   rotrBL: () => (/* binding */ rotrBL),
/* harmony export */   rotrSH: () => (/* binding */ rotrSH),
/* harmony export */   rotrSL: () => (/* binding */ rotrSL),
/* harmony export */   shrSH: () => (/* binding */ shrSH),
/* harmony export */   shrSL: () => (/* binding */ shrSL),
/* harmony export */   split: () => (/* binding */ split),
/* harmony export */   toBig: () => (/* binding */ toBig)
/* harmony export */ });
const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
// We are not using BigUint64Array, because they are extremely slow as per 2022
function fromBig(n, le = false) {
    if (le)
        return { h: Number(n & U32_MASK64), l: Number((n >> _32n) & U32_MASK64) };
    return { h: Number((n >> _32n) & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for (let i = 0; i < lst.length; i++) {
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
}
const toBig = (h, l) => (BigInt(h >>> 0) << _32n) | BigInt(l >>> 0);
// for Shift in [0, 32)
const shrSH = (h, _l, s) => h >>> s;
const shrSL = (h, l, s) => (h << (32 - s)) | (l >>> s);
// Right rotate for Shift in [1, 32)
const rotrSH = (h, l, s) => (h >>> s) | (l << (32 - s));
const rotrSL = (h, l, s) => (h << (32 - s)) | (l >>> s);
// Right rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotrBH = (h, l, s) => (h << (64 - s)) | (l >>> (s - 32));
const rotrBL = (h, l, s) => (h >>> (s - 32)) | (l << (64 - s));
// Right rotate for shift===32 (just swaps l&h)
const rotr32H = (_h, l) => l;
const rotr32L = (h, _l) => h;
// Left rotate for Shift in [1, 32)
const rotlSH = (h, l, s) => (h << s) | (l >>> (32 - s));
const rotlSL = (h, l, s) => (l << s) | (h >>> (32 - s));
// Left rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotlBH = (h, l, s) => (l << (s - 32)) | (h >>> (64 - s));
const rotlBL = (h, l, s) => (h << (s - 32)) | (l >>> (64 - s));
// JS uses 32-bit signed integers for bitwise operations which means we cannot
// simple take carry out of low bit sum by shift, we need to use division.
function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return { h: (Ah + Bh + ((l / 2 ** 32) | 0)) | 0, l: l | 0 };
}
// Addition with more than 2 elements
const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
const add3H = (low, Ah, Bh, Ch) => (Ah + Bh + Ch + ((low / 2 ** 32) | 0)) | 0;
const add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
const add4H = (low, Ah, Bh, Ch, Dh) => (Ah + Bh + Ch + Dh + ((low / 2 ** 32) | 0)) | 0;
const add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
const add5H = (low, Ah, Bh, Ch, Dh, Eh) => (Ah + Bh + Ch + Dh + Eh + ((low / 2 ** 32) | 0)) | 0;
// prettier-ignore

// prettier-ignore
const u64 = {
    fromBig, split, toBig,
    shrSH, shrSL,
    rotrSH, rotrSL, rotrBH, rotrBL,
    rotr32H, rotr32L,
    rotlSH, rotlSL, rotlBH, rotlBL,
    add, add3L, add3H, add4L, add4H, add5H, add5L,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (u64);
//# sourceMappingURL=_u64.js.map

/***/ }),

/***/ "./node_modules/web3-validator/node_modules/@noble/hashes/esm/crypto.js":
/*!******************************************************************************!*\
  !*** ./node_modules/web3-validator/node_modules/@noble/hashes/esm/crypto.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   crypto: () => (/* binding */ crypto)
/* harmony export */ });
const crypto = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined;
//# sourceMappingURL=crypto.js.map

/***/ }),

/***/ "./node_modules/web3-validator/node_modules/@noble/hashes/esm/sha3.js":
/*!****************************************************************************!*\
  !*** ./node_modules/web3-validator/node_modules/@noble/hashes/esm/sha3.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Keccak: () => (/* binding */ Keccak),
/* harmony export */   keccakP: () => (/* binding */ keccakP),
/* harmony export */   keccak_224: () => (/* binding */ keccak_224),
/* harmony export */   keccak_256: () => (/* binding */ keccak_256),
/* harmony export */   keccak_384: () => (/* binding */ keccak_384),
/* harmony export */   keccak_512: () => (/* binding */ keccak_512),
/* harmony export */   sha3_224: () => (/* binding */ sha3_224),
/* harmony export */   sha3_256: () => (/* binding */ sha3_256),
/* harmony export */   sha3_384: () => (/* binding */ sha3_384),
/* harmony export */   sha3_512: () => (/* binding */ sha3_512),
/* harmony export */   shake128: () => (/* binding */ shake128),
/* harmony export */   shake256: () => (/* binding */ shake256)
/* harmony export */ });
/* harmony import */ var _assert_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_assert.js */ "./node_modules/web3-validator/node_modules/@noble/hashes/esm/_assert.js");
/* harmony import */ var _u64_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_u64.js */ "./node_modules/web3-validator/node_modules/@noble/hashes/esm/_u64.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web3-validator/node_modules/@noble/hashes/esm/utils.js");



// SHA3 (keccak) is based on a new design: basically, the internal state is bigger than output size.
// It's called a sponge function.
// Various per round constants calculations
const SHA3_PI = [];
const SHA3_ROTL = [];
const _SHA3_IOTA = [];
const _0n = /* @__PURE__ */ BigInt(0);
const _1n = /* @__PURE__ */ BigInt(1);
const _2n = /* @__PURE__ */ BigInt(2);
const _7n = /* @__PURE__ */ BigInt(7);
const _256n = /* @__PURE__ */ BigInt(256);
const _0x71n = /* @__PURE__ */ BigInt(0x71);
for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
    // Pi
    [x, y] = [y, (2 * x + 3 * y) % 5];
    SHA3_PI.push(2 * (5 * y + x));
    // Rotational
    SHA3_ROTL.push((((round + 1) * (round + 2)) / 2) % 64);
    // Iota
    let t = _0n;
    for (let j = 0; j < 7; j++) {
        R = ((R << _1n) ^ ((R >> _7n) * _0x71n)) % _256n;
        if (R & _2n)
            t ^= _1n << ((_1n << /* @__PURE__ */ BigInt(j)) - _1n);
    }
    _SHA3_IOTA.push(t);
}
const [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ (0,_u64_js__WEBPACK_IMPORTED_MODULE_0__.split)(_SHA3_IOTA, true);
// Left rotation (without 0, 32, 64)
const rotlH = (h, l, s) => (s > 32 ? (0,_u64_js__WEBPACK_IMPORTED_MODULE_0__.rotlBH)(h, l, s) : (0,_u64_js__WEBPACK_IMPORTED_MODULE_0__.rotlSH)(h, l, s));
const rotlL = (h, l, s) => (s > 32 ? (0,_u64_js__WEBPACK_IMPORTED_MODULE_0__.rotlBL)(h, l, s) : (0,_u64_js__WEBPACK_IMPORTED_MODULE_0__.rotlSL)(h, l, s));
// Same as keccakf1600, but allows to skip some rounds
function keccakP(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    // NOTE: all indices are x2 since we store state as u32 instead of u64 (bigints to slow in js)
    for (let round = 24 - rounds; round < 24; round++) {
        // Theta θ
        for (let x = 0; x < 10; x++)
            B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
        for (let x = 0; x < 10; x += 2) {
            const idx1 = (x + 8) % 10;
            const idx0 = (x + 2) % 10;
            const B0 = B[idx0];
            const B1 = B[idx0 + 1];
            const Th = rotlH(B0, B1, 1) ^ B[idx1];
            const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
            for (let y = 0; y < 50; y += 10) {
                s[x + y] ^= Th;
                s[x + y + 1] ^= Tl;
            }
        }
        // Rho (ρ) and Pi (π)
        let curH = s[2];
        let curL = s[3];
        for (let t = 0; t < 24; t++) {
            const shift = SHA3_ROTL[t];
            const Th = rotlH(curH, curL, shift);
            const Tl = rotlL(curH, curL, shift);
            const PI = SHA3_PI[t];
            curH = s[PI];
            curL = s[PI + 1];
            s[PI] = Th;
            s[PI + 1] = Tl;
        }
        // Chi (χ)
        for (let y = 0; y < 50; y += 10) {
            for (let x = 0; x < 10; x++)
                B[x] = s[y + x];
            for (let x = 0; x < 10; x++)
                s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
        }
        // Iota (ι)
        s[0] ^= SHA3_IOTA_H[round];
        s[1] ^= SHA3_IOTA_L[round];
    }
    B.fill(0);
}
class Keccak extends _utils_js__WEBPACK_IMPORTED_MODULE_1__.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
        super();
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        // Can be passed from user as dkLen
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_2__.number)(outputLen);
        // 1600 = 5x5 matrix of 64bit.  1600 bits === 200 bytes
        if (0 >= this.blockLen || this.blockLen >= 200)
            throw new Error('Sha3 supports only keccak-f1600 function');
        this.state = new Uint8Array(200);
        this.state32 = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.u32)(this.state);
    }
    keccak() {
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isLE)
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.byteSwap32)(this.state32);
        keccakP(this.state32, this.rounds);
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isLE)
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.byteSwap32)(this.state32);
        this.posOut = 0;
        this.pos = 0;
    }
    update(data) {
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_2__.exists)(this);
        const { blockLen, state } = this;
        data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.toBytes)(data);
        const len = data.length;
        for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);
            for (let i = 0; i < take; i++)
                state[this.pos++] ^= data[pos++];
            if (this.pos === blockLen)
                this.keccak();
        }
        return this;
    }
    finish() {
        if (this.finished)
            return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        // Do the padding
        state[pos] ^= suffix;
        if ((suffix & 0x80) !== 0 && pos === blockLen - 1)
            this.keccak();
        state[blockLen - 1] ^= 0x80;
        this.keccak();
    }
    writeInto(out) {
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_2__.exists)(this, false);
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_2__.bytes)(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for (let pos = 0, len = out.length; pos < len;) {
            if (this.posOut >= blockLen)
                this.keccak();
            const take = Math.min(blockLen - this.posOut, len - pos);
            out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
            this.posOut += take;
            pos += take;
        }
        return out;
    }
    xofInto(out) {
        // Sha3/Keccak usage with XOF is probably mistake, only SHAKE instances can do XOF
        if (!this.enableXOF)
            throw new Error('XOF is not possible for this instance');
        return this.writeInto(out);
    }
    xof(bytes) {
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_2__.number)(bytes);
        return this.xofInto(new Uint8Array(bytes));
    }
    digestInto(out) {
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_2__.output)(out, this);
        if (this.finished)
            throw new Error('digest() was already called');
        this.writeInto(out);
        this.destroy();
        return out;
    }
    digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
        this.destroyed = true;
        this.state.fill(0);
    }
    _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        // Suffix can change in cSHAKE
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
    }
}
const gen = (suffix, blockLen, outputLen) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.wrapConstructor)(() => new Keccak(blockLen, suffix, outputLen));
const sha3_224 = /* @__PURE__ */ gen(0x06, 144, 224 / 8);
/**
 * SHA3-256 hash function
 * @param message - that would be hashed
 */
const sha3_256 = /* @__PURE__ */ gen(0x06, 136, 256 / 8);
const sha3_384 = /* @__PURE__ */ gen(0x06, 104, 384 / 8);
const sha3_512 = /* @__PURE__ */ gen(0x06, 72, 512 / 8);
const keccak_224 = /* @__PURE__ */ gen(0x01, 144, 224 / 8);
/**
 * keccak-256 hash function. Different from SHA3-256.
 * @param message - that would be hashed
 */
const keccak_256 = /* @__PURE__ */ gen(0x01, 136, 256 / 8);
const keccak_384 = /* @__PURE__ */ gen(0x01, 104, 384 / 8);
const keccak_512 = /* @__PURE__ */ gen(0x01, 72, 512 / 8);
const genShake = (suffix, blockLen, outputLen) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.wrapXOFConstructorWithOpts)((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === undefined ? outputLen : opts.dkLen, true));
const shake128 = /* @__PURE__ */ genShake(0x1f, 168, 128 / 8);
const shake256 = /* @__PURE__ */ genShake(0x1f, 136, 256 / 8);
//# sourceMappingURL=sha3.js.map

/***/ }),

/***/ "./node_modules/web3-validator/node_modules/@noble/hashes/esm/utils.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/web3-validator/node_modules/@noble/hashes/esm/utils.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hash: () => (/* binding */ Hash),
/* harmony export */   asyncLoop: () => (/* binding */ asyncLoop),
/* harmony export */   byteSwap: () => (/* binding */ byteSwap),
/* harmony export */   byteSwap32: () => (/* binding */ byteSwap32),
/* harmony export */   byteSwapIfBE: () => (/* binding */ byteSwapIfBE),
/* harmony export */   bytesToHex: () => (/* binding */ bytesToHex),
/* harmony export */   checkOpts: () => (/* binding */ checkOpts),
/* harmony export */   concatBytes: () => (/* binding */ concatBytes),
/* harmony export */   createView: () => (/* binding */ createView),
/* harmony export */   hexToBytes: () => (/* binding */ hexToBytes),
/* harmony export */   isBytes: () => (/* binding */ isBytes),
/* harmony export */   isLE: () => (/* binding */ isLE),
/* harmony export */   nextTick: () => (/* binding */ nextTick),
/* harmony export */   randomBytes: () => (/* binding */ randomBytes),
/* harmony export */   rotl: () => (/* binding */ rotl),
/* harmony export */   rotr: () => (/* binding */ rotr),
/* harmony export */   toBytes: () => (/* binding */ toBytes),
/* harmony export */   u32: () => (/* binding */ u32),
/* harmony export */   u8: () => (/* binding */ u8),
/* harmony export */   utf8ToBytes: () => (/* binding */ utf8ToBytes),
/* harmony export */   wrapConstructor: () => (/* binding */ wrapConstructor),
/* harmony export */   wrapConstructorWithOpts: () => (/* binding */ wrapConstructorWithOpts),
/* harmony export */   wrapXOFConstructorWithOpts: () => (/* binding */ wrapXOFConstructorWithOpts)
/* harmony export */ });
/* harmony import */ var _noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noble/hashes/crypto */ "./node_modules/web3-validator/node_modules/@noble/hashes/esm/crypto.js");
/* harmony import */ var _assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_assert.js */ "./node_modules/web3-validator/node_modules/@noble/hashes/esm/_assert.js");
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
// We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
// node.js versions earlier than v19 don't declare it in global scope.
// For node.js, package.json#exports field mapping rewrites import
// from `crypto` to `cryptoNode`, which imports native module.
// Makes the utils un-importable in browsers without a bundler.
// Once node.js 18 is deprecated (2025-04-30), we can just drop the import.


// export { isBytes } from './_assert.js';
// We can't reuse isBytes from _assert, because somehow this causes huge perf issues
function isBytes(a) {
    return (a instanceof Uint8Array ||
        (a != null && typeof a === 'object' && a.constructor.name === 'Uint8Array'));
}
// Cast array to different type
const u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
const u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
// Cast array to view
const createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
// The rotate right (circular right shift) operation for uint32
const rotr = (word, shift) => (word << (32 - shift)) | (word >>> shift);
// The rotate left (circular left shift) operation for uint32
const rotl = (word, shift) => (word << shift) | ((word >>> (32 - shift)) >>> 0);
const isLE = new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44;
// The byte swap operation for uint32
const byteSwap = (word) => ((word << 24) & 0xff000000) |
    ((word << 8) & 0xff0000) |
    ((word >>> 8) & 0xff00) |
    ((word >>> 24) & 0xff);
// Conditionally byte swap if on a big-endian platform
const byteSwapIfBE = isLE ? (n) => n : (n) => byteSwap(n);
// In place byte swap for Uint32Array
function byteSwap32(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = byteSwap(arr[i]);
    }
}
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));
/**
 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
 */
function bytesToHex(bytes) {
    (0,_assert_js__WEBPACK_IMPORTED_MODULE_0__.bytes)(bytes);
    // pre-caching improves the speed 6x
    let hex = '';
    for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
    }
    return hex;
}
// We use optimized technique to convert hex string to byte array
const asciis = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function asciiToBase16(char) {
    if (char >= asciis._0 && char <= asciis._9)
        return char - asciis._0;
    if (char >= asciis._A && char <= asciis._F)
        return char - (asciis._A - 10);
    if (char >= asciis._a && char <= asciis._f)
        return char - (asciis._a - 10);
    return;
}
/**
 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */
function hexToBytes(hex) {
    if (typeof hex !== 'string')
        throw new Error('hex string expected, got ' + typeof hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2)
        throw new Error('padded hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
    }
    return array;
}
// There is no setImmediate in browser and setTimeout is slow.
// call of async fn will return Promise, which will be fullfiled only on
// next scheduler queue processing step and this is exactly what we need.
const nextTick = async () => { };
// Returns control to thread each 'tick' ms to avoid blocking
async function asyncLoop(iters, tick, cb) {
    let ts = Date.now();
    for (let i = 0; i < iters; i++) {
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
            continue;
        await nextTick();
        ts += diff;
    }
}
/**
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */
function utf8ToBytes(str) {
    if (typeof str !== 'string')
        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
/**
 * Normalizes (non-hex) string or Uint8Array to Uint8Array.
 * Warning: when Uint8Array is passed, it would NOT get copied.
 * Keep in mind for future mutable operations.
 */
function toBytes(data) {
    if (typeof data === 'string')
        data = utf8ToBytes(data);
    (0,_assert_js__WEBPACK_IMPORTED_MODULE_0__.bytes)(data);
    return data;
}
/**
 * Copies several Uint8Arrays into one.
 */
function concatBytes(...arrays) {
    let sum = 0;
    for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        (0,_assert_js__WEBPACK_IMPORTED_MODULE_0__.bytes)(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
// For runtime check if class implements interface
class Hash {
    // Safe version that clones internal state
    clone() {
        return this._cloneInto();
    }
}
const toStr = {}.toString;
function checkOpts(defaults, opts) {
    if (opts !== undefined && toStr.call(opts) !== '[object Object]')
        throw new Error('Options should be object or undefined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
function wrapConstructor(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
}
function wrapConstructorWithOpts(hashCons) {
    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts) => hashCons(opts);
    return hashC;
}
function wrapXOFConstructorWithOpts(hashCons) {
    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts) => hashCons(opts);
    return hashC;
}
/**
 * Secure PRNG. Uses `crypto.getRandomValues`, which defers to OS.
 */
function randomBytes(bytesLength = 32) {
    if (_noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_1__.crypto && typeof _noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_1__.crypto.getRandomValues === 'function') {
        return _noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_1__.crypto.getRandomValues(new Uint8Array(bytesLength));
    }
    throw new Error('crypto.getRandomValues must be defined');
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/web3-validator/node_modules/ethereum-cryptography/esm/keccak.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/web3-validator/node_modules/ethereum-cryptography/esm/keccak.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   keccak224: () => (/* binding */ keccak224),
/* harmony export */   keccak256: () => (/* binding */ keccak256),
/* harmony export */   keccak384: () => (/* binding */ keccak384),
/* harmony export */   keccak512: () => (/* binding */ keccak512)
/* harmony export */ });
/* harmony import */ var _noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noble/hashes/sha3 */ "./node_modules/web3-validator/node_modules/@noble/hashes/esm/sha3.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web3-validator/node_modules/ethereum-cryptography/esm/utils.js");


const keccak224 = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.wrapHash)(_noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__.keccak_224);
const keccak256 = (() => {
    const k = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.wrapHash)(_noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__.keccak_256);
    k.create = _noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__.keccak_256.create;
    return k;
})();
const keccak384 = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.wrapHash)(_noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__.keccak_384);
const keccak512 = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.wrapHash)(_noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__.keccak_512);


/***/ }),

/***/ "./node_modules/web3-validator/node_modules/ethereum-cryptography/esm/utils.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/web3-validator/node_modules/ethereum-cryptography/esm/utils.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assertBool: () => (/* binding */ assertBool),
/* harmony export */   assertBytes: () => (/* binding */ assertBytes),
/* harmony export */   bytesToHex: () => (/* reexport safe */ _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.bytesToHex),
/* harmony export */   bytesToUtf8: () => (/* binding */ bytesToUtf8),
/* harmony export */   concatBytes: () => (/* reexport safe */ _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.concatBytes),
/* harmony export */   createView: () => (/* reexport safe */ _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.createView),
/* harmony export */   crypto: () => (/* binding */ crypto),
/* harmony export */   equalsBytes: () => (/* binding */ equalsBytes),
/* harmony export */   hexToBytes: () => (/* binding */ hexToBytes),
/* harmony export */   toHex: () => (/* reexport safe */ _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.bytesToHex),
/* harmony export */   utf8ToBytes: () => (/* reexport safe */ _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.utf8ToBytes),
/* harmony export */   wrapHash: () => (/* binding */ wrapHash)
/* harmony export */ });
/* harmony import */ var _noble_hashes_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @noble/hashes/_assert */ "./node_modules/web3-validator/node_modules/@noble/hashes/esm/_assert.js");
/* harmony import */ var _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noble/hashes/utils */ "./node_modules/web3-validator/node_modules/@noble/hashes/esm/utils.js");


const assertBool = _noble_hashes_assert__WEBPACK_IMPORTED_MODULE_0__["default"].bool;
const assertBytes = _noble_hashes_assert__WEBPACK_IMPORTED_MODULE_0__["default"].bytes;


// buf.toString('utf8') -> bytesToUtf8(buf)
function bytesToUtf8(data) {
    if (!(data instanceof Uint8Array)) {
        throw new TypeError(`bytesToUtf8 expected Uint8Array, got ${typeof data}`);
    }
    return new TextDecoder().decode(data);
}
function hexToBytes(data) {
    const sliced = data.startsWith("0x") ? data.substring(2) : data;
    return (0,_noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.hexToBytes)(sliced);
}
// buf.equals(buf2) -> equalsBytes(buf, buf2)
function equalsBytes(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
// Internal utils
function wrapHash(hash) {
    return (msg) => {
        _noble_hashes_assert__WEBPACK_IMPORTED_MODULE_0__["default"].bytes(msg);
        return hash(msg);
    };
}
// TODO(v3): switch away from node crypto, remove this unnecessary variable.
const crypto = (() => {
    const webCrypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : undefined;
    const nodeRequire = typeof module !== "undefined" &&
        typeof module.require === "function" &&
        module.require.bind(module);
    return {
        node: nodeRequire && !webCrypto ? nodeRequire("crypto") : undefined,
        web: webCrypto
    };
})();


/***/ }),

/***/ "./node_modules/zod/dist/esm/index.js":
/*!********************************************!*\
  !*** ./node_modules/zod/dist/esm/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BRAND: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.BRAND),
/* harmony export */   DIRTY: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.DIRTY),
/* harmony export */   EMPTY_PATH: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.EMPTY_PATH),
/* harmony export */   INVALID: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.INVALID),
/* harmony export */   NEVER: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.NEVER),
/* harmony export */   OK: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.OK),
/* harmony export */   ParseStatus: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ParseStatus),
/* harmony export */   Schema: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.Schema),
/* harmony export */   ZodAny: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodAny),
/* harmony export */   ZodArray: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodArray),
/* harmony export */   ZodBigInt: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodBigInt),
/* harmony export */   ZodBoolean: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodBoolean),
/* harmony export */   ZodBranded: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodBranded),
/* harmony export */   ZodCatch: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodCatch),
/* harmony export */   ZodDate: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodDate),
/* harmony export */   ZodDefault: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodDefault),
/* harmony export */   ZodDiscriminatedUnion: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodDiscriminatedUnion),
/* harmony export */   ZodEffects: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodEffects),
/* harmony export */   ZodEnum: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodEnum),
/* harmony export */   ZodError: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodError),
/* harmony export */   ZodFirstPartyTypeKind: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodFirstPartyTypeKind),
/* harmony export */   ZodFunction: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodFunction),
/* harmony export */   ZodIntersection: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodIntersection),
/* harmony export */   ZodIssueCode: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode),
/* harmony export */   ZodLazy: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodLazy),
/* harmony export */   ZodLiteral: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodLiteral),
/* harmony export */   ZodMap: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodMap),
/* harmony export */   ZodNaN: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodNaN),
/* harmony export */   ZodNativeEnum: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodNativeEnum),
/* harmony export */   ZodNever: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodNever),
/* harmony export */   ZodNull: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodNull),
/* harmony export */   ZodNullable: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodNullable),
/* harmony export */   ZodNumber: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodNumber),
/* harmony export */   ZodObject: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodObject),
/* harmony export */   ZodOptional: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodOptional),
/* harmony export */   ZodParsedType: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodParsedType),
/* harmony export */   ZodPipeline: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodPipeline),
/* harmony export */   ZodPromise: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodPromise),
/* harmony export */   ZodReadonly: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodReadonly),
/* harmony export */   ZodRecord: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodRecord),
/* harmony export */   ZodSchema: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodSchema),
/* harmony export */   ZodSet: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodSet),
/* harmony export */   ZodString: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodString),
/* harmony export */   ZodSymbol: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodSymbol),
/* harmony export */   ZodTransformer: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodTransformer),
/* harmony export */   ZodTuple: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodTuple),
/* harmony export */   ZodType: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodType),
/* harmony export */   ZodUndefined: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodUndefined),
/* harmony export */   ZodUnion: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodUnion),
/* harmony export */   ZodUnknown: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodUnknown),
/* harmony export */   ZodVoid: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ZodVoid),
/* harmony export */   addIssueToContext: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.addIssueToContext),
/* harmony export */   any: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.any),
/* harmony export */   array: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.array),
/* harmony export */   bigint: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.bigint),
/* harmony export */   boolean: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.boolean),
/* harmony export */   coerce: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.coerce),
/* harmony export */   custom: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.custom),
/* harmony export */   date: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.date),
/* harmony export */   datetimeRegex: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.datetimeRegex),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   defaultErrorMap: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.defaultErrorMap),
/* harmony export */   discriminatedUnion: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.discriminatedUnion),
/* harmony export */   effect: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.effect),
/* harmony export */   "enum": () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__["enum"]),
/* harmony export */   "function": () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__["function"]),
/* harmony export */   getErrorMap: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.getErrorMap),
/* harmony export */   getParsedType: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.getParsedType),
/* harmony export */   "instanceof": () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__["instanceof"]),
/* harmony export */   intersection: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.intersection),
/* harmony export */   isAborted: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.isAborted),
/* harmony export */   isAsync: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.isAsync),
/* harmony export */   isDirty: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.isDirty),
/* harmony export */   isValid: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.isValid),
/* harmony export */   late: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.late),
/* harmony export */   lazy: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.lazy),
/* harmony export */   literal: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.literal),
/* harmony export */   makeIssue: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.makeIssue),
/* harmony export */   map: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.map),
/* harmony export */   nan: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.nan),
/* harmony export */   nativeEnum: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.nativeEnum),
/* harmony export */   never: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.never),
/* harmony export */   "null": () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__["null"]),
/* harmony export */   nullable: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.nullable),
/* harmony export */   number: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.number),
/* harmony export */   object: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.object),
/* harmony export */   objectUtil: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.objectUtil),
/* harmony export */   oboolean: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.oboolean),
/* harmony export */   onumber: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.onumber),
/* harmony export */   optional: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.optional),
/* harmony export */   ostring: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.ostring),
/* harmony export */   pipeline: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.pipeline),
/* harmony export */   preprocess: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.preprocess),
/* harmony export */   promise: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.promise),
/* harmony export */   quotelessJson: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.quotelessJson),
/* harmony export */   record: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.record),
/* harmony export */   set: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.set),
/* harmony export */   setErrorMap: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.setErrorMap),
/* harmony export */   strictObject: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.strictObject),
/* harmony export */   string: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.string),
/* harmony export */   symbol: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.symbol),
/* harmony export */   transformer: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.transformer),
/* harmony export */   tuple: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.tuple),
/* harmony export */   undefined: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.undefined),
/* harmony export */   union: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.union),
/* harmony export */   unknown: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.unknown),
/* harmony export */   util: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.util),
/* harmony export */   "void": () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__["void"]),
/* harmony export */   z: () => (/* reexport safe */ _v3_index_js__WEBPACK_IMPORTED_MODULE_0__.z)
/* harmony export */ });
/* harmony import */ var _v3_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v3/index.js */ "./node_modules/zod/dist/esm/v3/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_v3_index_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/zod/dist/esm/v3/ZodError.js":
/*!**************************************************!*\
  !*** ./node_modules/zod/dist/esm/v3/ZodError.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZodError: () => (/* binding */ ZodError),
/* harmony export */   ZodIssueCode: () => (/* binding */ ZodIssueCode),
/* harmony export */   quotelessJson: () => (/* binding */ quotelessJson)
/* harmony export */ });
/* harmony import */ var _helpers_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/util.js */ "./node_modules/zod/dist/esm/v3/helpers/util.js");

const ZodIssueCode = _helpers_util_js__WEBPACK_IMPORTED_MODULE_0__.util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
]);
const quotelessJson = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
};
class ZodError extends Error {
    get errors() {
        return this.issues;
    }
    constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
            this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
            this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            // eslint-disable-next-line ban/ban
            Object.setPrototypeOf(this, actualProto);
        }
        else {
            this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
    }
    format(_mapper) {
        const mapper = _mapper ||
            function (issue) {
                return issue.message;
            };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
            for (const issue of error.issues) {
                if (issue.code === "invalid_union") {
                    issue.unionErrors.map(processError);
                }
                else if (issue.code === "invalid_return_type") {
                    processError(issue.returnTypeError);
                }
                else if (issue.code === "invalid_arguments") {
                    processError(issue.argumentsError);
                }
                else if (issue.path.length === 0) {
                    fieldErrors._errors.push(mapper(issue));
                }
                else {
                    let curr = fieldErrors;
                    let i = 0;
                    while (i < issue.path.length) {
                        const el = issue.path[i];
                        const terminal = i === issue.path.length - 1;
                        if (!terminal) {
                            curr[el] = curr[el] || { _errors: [] };
                            // if (typeof el === "string") {
                            //   curr[el] = curr[el] || { _errors: [] };
                            // } else if (typeof el === "number") {
                            //   const errorArray: any = [];
                            //   errorArray._errors = [];
                            //   curr[el] = curr[el] || errorArray;
                            // }
                        }
                        else {
                            curr[el] = curr[el] || { _errors: [] };
                            curr[el]._errors.push(mapper(issue));
                        }
                        curr = curr[el];
                        i++;
                    }
                }
            }
        };
        processError(this);
        return fieldErrors;
    }
    static assert(value) {
        if (!(value instanceof ZodError)) {
            throw new Error(`Not a ZodError: ${value}`);
        }
    }
    toString() {
        return this.message;
    }
    get message() {
        return JSON.stringify(this.issues, _helpers_util_js__WEBPACK_IMPORTED_MODULE_0__.util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
        return this.issues.length === 0;
    }
    flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
            if (sub.path.length > 0) {
                fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
                fieldErrors[sub.path[0]].push(mapper(sub));
            }
            else {
                formErrors.push(mapper(sub));
            }
        }
        return { formErrors, fieldErrors };
    }
    get formErrors() {
        return this.flatten();
    }
}
ZodError.create = (issues) => {
    const error = new ZodError(issues);
    return error;
};


/***/ }),

/***/ "./node_modules/zod/dist/esm/v3/errors.js":
/*!************************************************!*\
  !*** ./node_modules/zod/dist/esm/v3/errors.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultErrorMap: () => (/* reexport safe */ _locales_en_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   getErrorMap: () => (/* binding */ getErrorMap),
/* harmony export */   setErrorMap: () => (/* binding */ setErrorMap)
/* harmony export */ });
/* harmony import */ var _locales_en_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./locales/en.js */ "./node_modules/zod/dist/esm/v3/locales/en.js");

let overrideErrorMap = _locales_en_js__WEBPACK_IMPORTED_MODULE_0__["default"];

function setErrorMap(map) {
    overrideErrorMap = map;
}
function getErrorMap() {
    return overrideErrorMap;
}


/***/ }),

/***/ "./node_modules/zod/dist/esm/v3/external.js":
/*!**************************************************!*\
  !*** ./node_modules/zod/dist/esm/v3/external.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BRAND: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.BRAND),
/* harmony export */   DIRTY: () => (/* reexport safe */ _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_1__.DIRTY),
/* harmony export */   EMPTY_PATH: () => (/* reexport safe */ _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_1__.EMPTY_PATH),
/* harmony export */   INVALID: () => (/* reexport safe */ _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_1__.INVALID),
/* harmony export */   NEVER: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.NEVER),
/* harmony export */   OK: () => (/* reexport safe */ _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_1__.OK),
/* harmony export */   ParseStatus: () => (/* reexport safe */ _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_1__.ParseStatus),
/* harmony export */   Schema: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.Schema),
/* harmony export */   ZodAny: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodAny),
/* harmony export */   ZodArray: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodArray),
/* harmony export */   ZodBigInt: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodBigInt),
/* harmony export */   ZodBoolean: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodBoolean),
/* harmony export */   ZodBranded: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodBranded),
/* harmony export */   ZodCatch: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodCatch),
/* harmony export */   ZodDate: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodDate),
/* harmony export */   ZodDefault: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodDefault),
/* harmony export */   ZodDiscriminatedUnion: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodDiscriminatedUnion),
/* harmony export */   ZodEffects: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodEffects),
/* harmony export */   ZodEnum: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodEnum),
/* harmony export */   ZodError: () => (/* reexport safe */ _ZodError_js__WEBPACK_IMPORTED_MODULE_5__.ZodError),
/* harmony export */   ZodFirstPartyTypeKind: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodFirstPartyTypeKind),
/* harmony export */   ZodFunction: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodFunction),
/* harmony export */   ZodIntersection: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodIntersection),
/* harmony export */   ZodIssueCode: () => (/* reexport safe */ _ZodError_js__WEBPACK_IMPORTED_MODULE_5__.ZodIssueCode),
/* harmony export */   ZodLazy: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodLazy),
/* harmony export */   ZodLiteral: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodLiteral),
/* harmony export */   ZodMap: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodMap),
/* harmony export */   ZodNaN: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodNaN),
/* harmony export */   ZodNativeEnum: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodNativeEnum),
/* harmony export */   ZodNever: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodNever),
/* harmony export */   ZodNull: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodNull),
/* harmony export */   ZodNullable: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodNullable),
/* harmony export */   ZodNumber: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodNumber),
/* harmony export */   ZodObject: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodObject),
/* harmony export */   ZodOptional: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodOptional),
/* harmony export */   ZodParsedType: () => (/* reexport safe */ _helpers_util_js__WEBPACK_IMPORTED_MODULE_3__.ZodParsedType),
/* harmony export */   ZodPipeline: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodPipeline),
/* harmony export */   ZodPromise: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodPromise),
/* harmony export */   ZodReadonly: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodReadonly),
/* harmony export */   ZodRecord: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodRecord),
/* harmony export */   ZodSchema: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodSchema),
/* harmony export */   ZodSet: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodSet),
/* harmony export */   ZodString: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodString),
/* harmony export */   ZodSymbol: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodSymbol),
/* harmony export */   ZodTransformer: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodTransformer),
/* harmony export */   ZodTuple: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodTuple),
/* harmony export */   ZodType: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodType),
/* harmony export */   ZodUndefined: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodUndefined),
/* harmony export */   ZodUnion: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodUnion),
/* harmony export */   ZodUnknown: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodUnknown),
/* harmony export */   ZodVoid: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ZodVoid),
/* harmony export */   addIssueToContext: () => (/* reexport safe */ _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_1__.addIssueToContext),
/* harmony export */   any: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.any),
/* harmony export */   array: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.array),
/* harmony export */   bigint: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.bigint),
/* harmony export */   boolean: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.boolean),
/* harmony export */   coerce: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.coerce),
/* harmony export */   custom: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.custom),
/* harmony export */   date: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.date),
/* harmony export */   datetimeRegex: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.datetimeRegex),
/* harmony export */   defaultErrorMap: () => (/* reexport safe */ _errors_js__WEBPACK_IMPORTED_MODULE_0__.defaultErrorMap),
/* harmony export */   discriminatedUnion: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.discriminatedUnion),
/* harmony export */   effect: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.effect),
/* harmony export */   "enum": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__["enum"]),
/* harmony export */   "function": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__["function"]),
/* harmony export */   getErrorMap: () => (/* reexport safe */ _errors_js__WEBPACK_IMPORTED_MODULE_0__.getErrorMap),
/* harmony export */   getParsedType: () => (/* reexport safe */ _helpers_util_js__WEBPACK_IMPORTED_MODULE_3__.getParsedType),
/* harmony export */   "instanceof": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__["instanceof"]),
/* harmony export */   intersection: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.intersection),
/* harmony export */   isAborted: () => (/* reexport safe */ _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_1__.isAborted),
/* harmony export */   isAsync: () => (/* reexport safe */ _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_1__.isAsync),
/* harmony export */   isDirty: () => (/* reexport safe */ _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_1__.isDirty),
/* harmony export */   isValid: () => (/* reexport safe */ _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_1__.isValid),
/* harmony export */   late: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.late),
/* harmony export */   lazy: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.lazy),
/* harmony export */   literal: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.literal),
/* harmony export */   makeIssue: () => (/* reexport safe */ _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_1__.makeIssue),
/* harmony export */   map: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.map),
/* harmony export */   nan: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.nan),
/* harmony export */   nativeEnum: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.nativeEnum),
/* harmony export */   never: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.never),
/* harmony export */   "null": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__["null"]),
/* harmony export */   nullable: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.nullable),
/* harmony export */   number: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.number),
/* harmony export */   object: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.object),
/* harmony export */   objectUtil: () => (/* reexport safe */ _helpers_util_js__WEBPACK_IMPORTED_MODULE_3__.objectUtil),
/* harmony export */   oboolean: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.oboolean),
/* harmony export */   onumber: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.onumber),
/* harmony export */   optional: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.optional),
/* harmony export */   ostring: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.ostring),
/* harmony export */   pipeline: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.pipeline),
/* harmony export */   preprocess: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.preprocess),
/* harmony export */   promise: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.promise),
/* harmony export */   quotelessJson: () => (/* reexport safe */ _ZodError_js__WEBPACK_IMPORTED_MODULE_5__.quotelessJson),
/* harmony export */   record: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.record),
/* harmony export */   set: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.set),
/* harmony export */   setErrorMap: () => (/* reexport safe */ _errors_js__WEBPACK_IMPORTED_MODULE_0__.setErrorMap),
/* harmony export */   strictObject: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.strictObject),
/* harmony export */   string: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.string),
/* harmony export */   symbol: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.symbol),
/* harmony export */   transformer: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.transformer),
/* harmony export */   tuple: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.tuple),
/* harmony export */   undefined: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.undefined),
/* harmony export */   union: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.union),
/* harmony export */   unknown: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__.unknown),
/* harmony export */   util: () => (/* reexport safe */ _helpers_util_js__WEBPACK_IMPORTED_MODULE_3__.util),
/* harmony export */   "void": () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_4__["void"])
/* harmony export */ });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors.js */ "./node_modules/zod/dist/esm/v3/errors.js");
/* harmony import */ var _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/parseUtil.js */ "./node_modules/zod/dist/esm/v3/helpers/parseUtil.js");
/* harmony import */ var _helpers_typeAliases_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/typeAliases.js */ "./node_modules/zod/dist/esm/v3/helpers/typeAliases.js");
/* harmony import */ var _helpers_util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/util.js */ "./node_modules/zod/dist/esm/v3/helpers/util.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types.js */ "./node_modules/zod/dist/esm/v3/types.js");
/* harmony import */ var _ZodError_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ZodError.js */ "./node_modules/zod/dist/esm/v3/ZodError.js");








/***/ }),

/***/ "./node_modules/zod/dist/esm/v3/helpers/errorUtil.js":
/*!***********************************************************!*\
  !*** ./node_modules/zod/dist/esm/v3/helpers/errorUtil.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   errorUtil: () => (/* binding */ errorUtil)
/* harmony export */ });
var errorUtil;
(function (errorUtil) {
    errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
    // biome-ignore lint:
    errorUtil.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));


/***/ }),

/***/ "./node_modules/zod/dist/esm/v3/helpers/parseUtil.js":
/*!***********************************************************!*\
  !*** ./node_modules/zod/dist/esm/v3/helpers/parseUtil.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DIRTY: () => (/* binding */ DIRTY),
/* harmony export */   EMPTY_PATH: () => (/* binding */ EMPTY_PATH),
/* harmony export */   INVALID: () => (/* binding */ INVALID),
/* harmony export */   OK: () => (/* binding */ OK),
/* harmony export */   ParseStatus: () => (/* binding */ ParseStatus),
/* harmony export */   addIssueToContext: () => (/* binding */ addIssueToContext),
/* harmony export */   isAborted: () => (/* binding */ isAborted),
/* harmony export */   isAsync: () => (/* binding */ isAsync),
/* harmony export */   isDirty: () => (/* binding */ isDirty),
/* harmony export */   isValid: () => (/* binding */ isValid),
/* harmony export */   makeIssue: () => (/* binding */ makeIssue)
/* harmony export */ });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors.js */ "./node_modules/zod/dist/esm/v3/errors.js");
/* harmony import */ var _locales_en_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../locales/en.js */ "./node_modules/zod/dist/esm/v3/locales/en.js");


const makeIssue = (params) => {
    const { data, path, errorMaps, issueData } = params;
    const fullPath = [...path, ...(issueData.path || [])];
    const fullIssue = {
        ...issueData,
        path: fullPath,
    };
    if (issueData.message !== undefined) {
        return {
            ...issueData,
            path: fullPath,
            message: issueData.message,
        };
    }
    let errorMessage = "";
    const maps = errorMaps
        .filter((m) => !!m)
        .slice()
        .reverse();
    for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
    }
    return {
        ...issueData,
        path: fullPath,
        message: errorMessage,
    };
};
const EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
    const overrideMap = (0,_errors_js__WEBPACK_IMPORTED_MODULE_0__.getErrorMap)();
    const issue = makeIssue({
        issueData: issueData,
        data: ctx.data,
        path: ctx.path,
        errorMaps: [
            ctx.common.contextualErrorMap, // contextual error map is first priority
            ctx.schemaErrorMap, // then schema-bound map if available
            overrideMap, // then global override map
            overrideMap === _locales_en_js__WEBPACK_IMPORTED_MODULE_1__["default"] ? undefined : _locales_en_js__WEBPACK_IMPORTED_MODULE_1__["default"], // then global default map
        ].filter((x) => !!x),
    });
    ctx.common.issues.push(issue);
}
class ParseStatus {
    constructor() {
        this.value = "valid";
    }
    dirty() {
        if (this.value === "valid")
            this.value = "dirty";
    }
    abort() {
        if (this.value !== "aborted")
            this.value = "aborted";
    }
    static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
            if (s.status === "aborted")
                return INVALID;
            if (s.status === "dirty")
                status.dirty();
            arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
    }
    static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            syncPairs.push({
                key,
                value,
            });
        }
        return ParseStatus.mergeObjectSync(status, syncPairs);
    }
    static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
            const { key, value } = pair;
            if (key.status === "aborted")
                return INVALID;
            if (value.status === "aborted")
                return INVALID;
            if (key.status === "dirty")
                status.dirty();
            if (value.status === "dirty")
                status.dirty();
            if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
                finalObject[key.value] = value.value;
            }
        }
        return { status: status.value, value: finalObject };
    }
}
const INVALID = Object.freeze({
    status: "aborted",
});
const DIRTY = (value) => ({ status: "dirty", value });
const OK = (value) => ({ status: "valid", value });
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;


/***/ }),

/***/ "./node_modules/zod/dist/esm/v3/helpers/typeAliases.js":
/*!*************************************************************!*\
  !*** ./node_modules/zod/dist/esm/v3/helpers/typeAliases.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/zod/dist/esm/v3/helpers/util.js":
/*!******************************************************!*\
  !*** ./node_modules/zod/dist/esm/v3/helpers/util.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZodParsedType: () => (/* binding */ ZodParsedType),
/* harmony export */   getParsedType: () => (/* binding */ getParsedType),
/* harmony export */   objectUtil: () => (/* binding */ objectUtil),
/* harmony export */   util: () => (/* binding */ util)
/* harmony export */ });
var util;
(function (util) {
    util.assertEqual = (_) => { };
    function assertIs(_arg) { }
    util.assertIs = assertIs;
    function assertNever(_x) {
        throw new Error();
    }
    util.assertNever = assertNever;
    util.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
            obj[item] = item;
        }
        return obj;
    };
    util.getValidEnumValues = (obj) => {
        const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
            filtered[k] = obj[k];
        }
        return util.objectValues(filtered);
    };
    util.objectValues = (obj) => {
        return util.objectKeys(obj).map(function (e) {
            return obj[e];
        });
    };
    util.objectKeys = typeof Object.keys === "function" // eslint-disable-line ban/ban
        ? (obj) => Object.keys(obj) // eslint-disable-line ban/ban
        : (object) => {
            const keys = [];
            for (const key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
    util.find = (arr, checker) => {
        for (const item of arr) {
            if (checker(item))
                return item;
        }
        return undefined;
    };
    util.isInteger = typeof Number.isInteger === "function"
        ? (val) => Number.isInteger(val) // eslint-disable-line ban/ban
        : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
    function joinValues(array, separator = " | ") {
        return array.map((val) => (typeof val === "string" ? `'${val}'` : val)).join(separator);
    }
    util.joinValues = joinValues;
    util.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
            return value.toString();
        }
        return value;
    };
})(util || (util = {}));
var objectUtil;
(function (objectUtil) {
    objectUtil.mergeShapes = (first, second) => {
        return {
            ...first,
            ...second, // second overwrites first
        };
    };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
]);
const getParsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "undefined":
            return ZodParsedType.undefined;
        case "string":
            return ZodParsedType.string;
        case "number":
            return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
            return ZodParsedType.boolean;
        case "function":
            return ZodParsedType.function;
        case "bigint":
            return ZodParsedType.bigint;
        case "symbol":
            return ZodParsedType.symbol;
        case "object":
            if (Array.isArray(data)) {
                return ZodParsedType.array;
            }
            if (data === null) {
                return ZodParsedType.null;
            }
            if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
                return ZodParsedType.promise;
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
                return ZodParsedType.map;
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
                return ZodParsedType.set;
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
                return ZodParsedType.date;
            }
            return ZodParsedType.object;
        default:
            return ZodParsedType.unknown;
    }
};


/***/ }),

/***/ "./node_modules/zod/dist/esm/v3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/zod/dist/esm/v3/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BRAND: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.BRAND),
/* harmony export */   DIRTY: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.DIRTY),
/* harmony export */   EMPTY_PATH: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.EMPTY_PATH),
/* harmony export */   INVALID: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.INVALID),
/* harmony export */   NEVER: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.NEVER),
/* harmony export */   OK: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.OK),
/* harmony export */   ParseStatus: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ParseStatus),
/* harmony export */   Schema: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.Schema),
/* harmony export */   ZodAny: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodAny),
/* harmony export */   ZodArray: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodArray),
/* harmony export */   ZodBigInt: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodBigInt),
/* harmony export */   ZodBoolean: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodBoolean),
/* harmony export */   ZodBranded: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodBranded),
/* harmony export */   ZodCatch: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodCatch),
/* harmony export */   ZodDate: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodDate),
/* harmony export */   ZodDefault: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodDefault),
/* harmony export */   ZodDiscriminatedUnion: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodDiscriminatedUnion),
/* harmony export */   ZodEffects: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodEffects),
/* harmony export */   ZodEnum: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodEnum),
/* harmony export */   ZodError: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodError),
/* harmony export */   ZodFirstPartyTypeKind: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodFirstPartyTypeKind),
/* harmony export */   ZodFunction: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodFunction),
/* harmony export */   ZodIntersection: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodIntersection),
/* harmony export */   ZodIssueCode: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode),
/* harmony export */   ZodLazy: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodLazy),
/* harmony export */   ZodLiteral: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodLiteral),
/* harmony export */   ZodMap: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodMap),
/* harmony export */   ZodNaN: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodNaN),
/* harmony export */   ZodNativeEnum: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodNativeEnum),
/* harmony export */   ZodNever: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodNever),
/* harmony export */   ZodNull: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodNull),
/* harmony export */   ZodNullable: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodNullable),
/* harmony export */   ZodNumber: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodNumber),
/* harmony export */   ZodObject: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodObject),
/* harmony export */   ZodOptional: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodOptional),
/* harmony export */   ZodParsedType: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodParsedType),
/* harmony export */   ZodPipeline: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodPipeline),
/* harmony export */   ZodPromise: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodPromise),
/* harmony export */   ZodReadonly: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodReadonly),
/* harmony export */   ZodRecord: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodRecord),
/* harmony export */   ZodSchema: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodSchema),
/* harmony export */   ZodSet: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodSet),
/* harmony export */   ZodString: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodString),
/* harmony export */   ZodSymbol: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodSymbol),
/* harmony export */   ZodTransformer: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodTransformer),
/* harmony export */   ZodTuple: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodTuple),
/* harmony export */   ZodType: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodType),
/* harmony export */   ZodUndefined: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodUndefined),
/* harmony export */   ZodUnion: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodUnion),
/* harmony export */   ZodUnknown: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodUnknown),
/* harmony export */   ZodVoid: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ZodVoid),
/* harmony export */   addIssueToContext: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.addIssueToContext),
/* harmony export */   any: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.any),
/* harmony export */   array: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.array),
/* harmony export */   bigint: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.bigint),
/* harmony export */   boolean: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.boolean),
/* harmony export */   coerce: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.coerce),
/* harmony export */   custom: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.custom),
/* harmony export */   date: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.date),
/* harmony export */   datetimeRegex: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.datetimeRegex),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   defaultErrorMap: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.defaultErrorMap),
/* harmony export */   discriminatedUnion: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.discriminatedUnion),
/* harmony export */   effect: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.effect),
/* harmony export */   "enum": () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__["enum"]),
/* harmony export */   "function": () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__["function"]),
/* harmony export */   getErrorMap: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.getErrorMap),
/* harmony export */   getParsedType: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.getParsedType),
/* harmony export */   "instanceof": () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__["instanceof"]),
/* harmony export */   intersection: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.intersection),
/* harmony export */   isAborted: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.isAborted),
/* harmony export */   isAsync: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.isAsync),
/* harmony export */   isDirty: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.isDirty),
/* harmony export */   isValid: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.isValid),
/* harmony export */   late: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.late),
/* harmony export */   lazy: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.lazy),
/* harmony export */   literal: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.literal),
/* harmony export */   makeIssue: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.makeIssue),
/* harmony export */   map: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.map),
/* harmony export */   nan: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.nan),
/* harmony export */   nativeEnum: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.nativeEnum),
/* harmony export */   never: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.never),
/* harmony export */   "null": () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__["null"]),
/* harmony export */   nullable: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.nullable),
/* harmony export */   number: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.number),
/* harmony export */   object: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.object),
/* harmony export */   objectUtil: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.objectUtil),
/* harmony export */   oboolean: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.oboolean),
/* harmony export */   onumber: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.onumber),
/* harmony export */   optional: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.optional),
/* harmony export */   ostring: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.ostring),
/* harmony export */   pipeline: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.pipeline),
/* harmony export */   preprocess: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.preprocess),
/* harmony export */   promise: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.promise),
/* harmony export */   quotelessJson: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.quotelessJson),
/* harmony export */   record: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.record),
/* harmony export */   set: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.set),
/* harmony export */   setErrorMap: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.setErrorMap),
/* harmony export */   strictObject: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.strictObject),
/* harmony export */   string: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.string),
/* harmony export */   symbol: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.symbol),
/* harmony export */   transformer: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.transformer),
/* harmony export */   tuple: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.tuple),
/* harmony export */   undefined: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.undefined),
/* harmony export */   union: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.union),
/* harmony export */   unknown: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.unknown),
/* harmony export */   util: () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__.util),
/* harmony export */   "void": () => (/* reexport safe */ _external_js__WEBPACK_IMPORTED_MODULE_0__["void"]),
/* harmony export */   z: () => (/* reexport module object */ _external_js__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _external_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./external.js */ "./node_modules/zod/dist/esm/v3/external.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_external_js__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./node_modules/zod/dist/esm/v3/locales/en.js":
/*!****************************************************!*\
  !*** ./node_modules/zod/dist/esm/v3/locales/en.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ZodError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ZodError.js */ "./node_modules/zod/dist/esm/v3/ZodError.js");
/* harmony import */ var _helpers_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/util.js */ "./node_modules/zod/dist/esm/v3/helpers/util.js");


const errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
        case _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type:
            if (issue.received === _helpers_util_js__WEBPACK_IMPORTED_MODULE_1__.ZodParsedType.undefined) {
                message = "Required";
            }
            else {
                message = `Expected ${issue.expected}, received ${issue.received}`;
            }
            break;
        case _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_literal:
            message = `Invalid literal value, expected ${JSON.stringify(issue.expected, _helpers_util_js__WEBPACK_IMPORTED_MODULE_1__.util.jsonStringifyReplacer)}`;
            break;
        case _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.unrecognized_keys:
            message = `Unrecognized key(s) in object: ${_helpers_util_js__WEBPACK_IMPORTED_MODULE_1__.util.joinValues(issue.keys, ", ")}`;
            break;
        case _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_union:
            message = `Invalid input`;
            break;
        case _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_union_discriminator:
            message = `Invalid discriminator value. Expected ${_helpers_util_js__WEBPACK_IMPORTED_MODULE_1__.util.joinValues(issue.options)}`;
            break;
        case _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_enum_value:
            message = `Invalid enum value. Expected ${_helpers_util_js__WEBPACK_IMPORTED_MODULE_1__.util.joinValues(issue.options)}, received '${issue.received}'`;
            break;
        case _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_arguments:
            message = `Invalid function arguments`;
            break;
        case _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_return_type:
            message = `Invalid function return type`;
            break;
        case _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_date:
            message = `Invalid date`;
            break;
        case _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string:
            if (typeof issue.validation === "object") {
                if ("includes" in issue.validation) {
                    message = `Invalid input: must include "${issue.validation.includes}"`;
                    if (typeof issue.validation.position === "number") {
                        message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
                    }
                }
                else if ("startsWith" in issue.validation) {
                    message = `Invalid input: must start with "${issue.validation.startsWith}"`;
                }
                else if ("endsWith" in issue.validation) {
                    message = `Invalid input: must end with "${issue.validation.endsWith}"`;
                }
                else {
                    _helpers_util_js__WEBPACK_IMPORTED_MODULE_1__.util.assertNever(issue.validation);
                }
            }
            else if (issue.validation !== "regex") {
                message = `Invalid ${issue.validation}`;
            }
            else {
                message = "Invalid";
            }
            break;
        case _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_small:
            if (issue.type === "array")
                message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
            else if (issue.type === "date")
                message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
            else
                message = "Invalid input";
            break;
        case _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_big:
            if (issue.type === "array")
                message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
            else if (issue.type === "bigint")
                message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
            else if (issue.type === "date")
                message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
            else
                message = "Invalid input";
            break;
        case _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.custom:
            message = `Invalid input`;
            break;
        case _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_intersection_types:
            message = `Intersection results could not be merged`;
            break;
        case _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.not_multiple_of:
            message = `Number must be a multiple of ${issue.multipleOf}`;
            break;
        case _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.not_finite:
            message = "Number must be finite";
            break;
        default:
            message = _ctx.defaultError;
            _helpers_util_js__WEBPACK_IMPORTED_MODULE_1__.util.assertNever(issue);
    }
    return { message };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (errorMap);


/***/ }),

/***/ "./node_modules/zod/dist/esm/v3/types.js":
/*!***********************************************!*\
  !*** ./node_modules/zod/dist/esm/v3/types.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BRAND: () => (/* binding */ BRAND),
/* harmony export */   NEVER: () => (/* binding */ NEVER),
/* harmony export */   Schema: () => (/* binding */ ZodType),
/* harmony export */   ZodAny: () => (/* binding */ ZodAny),
/* harmony export */   ZodArray: () => (/* binding */ ZodArray),
/* harmony export */   ZodBigInt: () => (/* binding */ ZodBigInt),
/* harmony export */   ZodBoolean: () => (/* binding */ ZodBoolean),
/* harmony export */   ZodBranded: () => (/* binding */ ZodBranded),
/* harmony export */   ZodCatch: () => (/* binding */ ZodCatch),
/* harmony export */   ZodDate: () => (/* binding */ ZodDate),
/* harmony export */   ZodDefault: () => (/* binding */ ZodDefault),
/* harmony export */   ZodDiscriminatedUnion: () => (/* binding */ ZodDiscriminatedUnion),
/* harmony export */   ZodEffects: () => (/* binding */ ZodEffects),
/* harmony export */   ZodEnum: () => (/* binding */ ZodEnum),
/* harmony export */   ZodFirstPartyTypeKind: () => (/* binding */ ZodFirstPartyTypeKind),
/* harmony export */   ZodFunction: () => (/* binding */ ZodFunction),
/* harmony export */   ZodIntersection: () => (/* binding */ ZodIntersection),
/* harmony export */   ZodLazy: () => (/* binding */ ZodLazy),
/* harmony export */   ZodLiteral: () => (/* binding */ ZodLiteral),
/* harmony export */   ZodMap: () => (/* binding */ ZodMap),
/* harmony export */   ZodNaN: () => (/* binding */ ZodNaN),
/* harmony export */   ZodNativeEnum: () => (/* binding */ ZodNativeEnum),
/* harmony export */   ZodNever: () => (/* binding */ ZodNever),
/* harmony export */   ZodNull: () => (/* binding */ ZodNull),
/* harmony export */   ZodNullable: () => (/* binding */ ZodNullable),
/* harmony export */   ZodNumber: () => (/* binding */ ZodNumber),
/* harmony export */   ZodObject: () => (/* binding */ ZodObject),
/* harmony export */   ZodOptional: () => (/* binding */ ZodOptional),
/* harmony export */   ZodPipeline: () => (/* binding */ ZodPipeline),
/* harmony export */   ZodPromise: () => (/* binding */ ZodPromise),
/* harmony export */   ZodReadonly: () => (/* binding */ ZodReadonly),
/* harmony export */   ZodRecord: () => (/* binding */ ZodRecord),
/* harmony export */   ZodSchema: () => (/* binding */ ZodType),
/* harmony export */   ZodSet: () => (/* binding */ ZodSet),
/* harmony export */   ZodString: () => (/* binding */ ZodString),
/* harmony export */   ZodSymbol: () => (/* binding */ ZodSymbol),
/* harmony export */   ZodTransformer: () => (/* binding */ ZodEffects),
/* harmony export */   ZodTuple: () => (/* binding */ ZodTuple),
/* harmony export */   ZodType: () => (/* binding */ ZodType),
/* harmony export */   ZodUndefined: () => (/* binding */ ZodUndefined),
/* harmony export */   ZodUnion: () => (/* binding */ ZodUnion),
/* harmony export */   ZodUnknown: () => (/* binding */ ZodUnknown),
/* harmony export */   ZodVoid: () => (/* binding */ ZodVoid),
/* harmony export */   any: () => (/* binding */ anyType),
/* harmony export */   array: () => (/* binding */ arrayType),
/* harmony export */   bigint: () => (/* binding */ bigIntType),
/* harmony export */   boolean: () => (/* binding */ booleanType),
/* harmony export */   coerce: () => (/* binding */ coerce),
/* harmony export */   custom: () => (/* binding */ custom),
/* harmony export */   date: () => (/* binding */ dateType),
/* harmony export */   datetimeRegex: () => (/* binding */ datetimeRegex),
/* harmony export */   discriminatedUnion: () => (/* binding */ discriminatedUnionType),
/* harmony export */   effect: () => (/* binding */ effectsType),
/* harmony export */   "enum": () => (/* binding */ enumType),
/* harmony export */   "function": () => (/* binding */ functionType),
/* harmony export */   "instanceof": () => (/* binding */ instanceOfType),
/* harmony export */   intersection: () => (/* binding */ intersectionType),
/* harmony export */   late: () => (/* binding */ late),
/* harmony export */   lazy: () => (/* binding */ lazyType),
/* harmony export */   literal: () => (/* binding */ literalType),
/* harmony export */   map: () => (/* binding */ mapType),
/* harmony export */   nan: () => (/* binding */ nanType),
/* harmony export */   nativeEnum: () => (/* binding */ nativeEnumType),
/* harmony export */   never: () => (/* binding */ neverType),
/* harmony export */   "null": () => (/* binding */ nullType),
/* harmony export */   nullable: () => (/* binding */ nullableType),
/* harmony export */   number: () => (/* binding */ numberType),
/* harmony export */   object: () => (/* binding */ objectType),
/* harmony export */   oboolean: () => (/* binding */ oboolean),
/* harmony export */   onumber: () => (/* binding */ onumber),
/* harmony export */   optional: () => (/* binding */ optionalType),
/* harmony export */   ostring: () => (/* binding */ ostring),
/* harmony export */   pipeline: () => (/* binding */ pipelineType),
/* harmony export */   preprocess: () => (/* binding */ preprocessType),
/* harmony export */   promise: () => (/* binding */ promiseType),
/* harmony export */   record: () => (/* binding */ recordType),
/* harmony export */   set: () => (/* binding */ setType),
/* harmony export */   strictObject: () => (/* binding */ strictObjectType),
/* harmony export */   string: () => (/* binding */ stringType),
/* harmony export */   symbol: () => (/* binding */ symbolType),
/* harmony export */   transformer: () => (/* binding */ effectsType),
/* harmony export */   tuple: () => (/* binding */ tupleType),
/* harmony export */   undefined: () => (/* binding */ undefinedType),
/* harmony export */   union: () => (/* binding */ unionType),
/* harmony export */   unknown: () => (/* binding */ unknownType),
/* harmony export */   "void": () => (/* binding */ voidType)
/* harmony export */ });
/* harmony import */ var _ZodError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ZodError.js */ "./node_modules/zod/dist/esm/v3/ZodError.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors.js */ "./node_modules/zod/dist/esm/v3/errors.js");
/* harmony import */ var _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/errorUtil.js */ "./node_modules/zod/dist/esm/v3/helpers/errorUtil.js");
/* harmony import */ var _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/parseUtil.js */ "./node_modules/zod/dist/esm/v3/helpers/parseUtil.js");
/* harmony import */ var _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/util.js */ "./node_modules/zod/dist/esm/v3/helpers/util.js");





class ParseInputLazyPath {
    constructor(parent, value, path, key) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
    }
    get path() {
        if (!this._cachedPath.length) {
            if (Array.isArray(this._key)) {
                this._cachedPath.push(...this._path, ...this._key);
            }
            else {
                this._cachedPath.push(...this._path, this._key);
            }
        }
        return this._cachedPath;
    }
}
const handleResult = (ctx, result) => {
    if ((0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.isValid)(result)) {
        return { success: true, data: result.value };
    }
    else {
        if (!ctx.common.issues.length) {
            throw new Error("Validation failed but no issues detected.");
        }
        return {
            success: false,
            get error() {
                if (this._error)
                    return this._error;
                const error = new _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodError(ctx.common.issues);
                this._error = error;
                return this._error;
            },
        };
    }
};
function processCreateParams(params) {
    if (!params)
        return {};
    const { errorMap, invalid_type_error, required_error, description } = params;
    if (errorMap && (invalid_type_error || required_error)) {
        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap)
        return { errorMap: errorMap, description };
    const customMap = (iss, ctx) => {
        const { message } = params;
        if (iss.code === "invalid_enum_value") {
            return { message: message ?? ctx.defaultError };
        }
        if (typeof ctx.data === "undefined") {
            return { message: message ?? required_error ?? ctx.defaultError };
        }
        if (iss.code !== "invalid_type")
            return { message: ctx.defaultError };
        return { message: message ?? invalid_type_error ?? ctx.defaultError };
    };
    return { errorMap: customMap, description };
}
class ZodType {
    get description() {
        return this._def.description;
    }
    _getType(input) {
        return (0,_helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.getParsedType)(input.data);
    }
    _getOrReturnCtx(input, ctx) {
        return (ctx || {
            common: input.parent.common,
            data: input.data,
            parsedType: (0,_helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.getParsedType)(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent,
        });
    }
    _processInputParams(input) {
        return {
            status: new _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.ParseStatus(),
            ctx: {
                common: input.parent.common,
                data: input.data,
                parsedType: (0,_helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.getParsedType)(input.data),
                schemaErrorMap: this._def.errorMap,
                path: input.path,
                parent: input.parent,
            },
        };
    }
    _parseSync(input) {
        const result = this._parse(input);
        if ((0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.isAsync)(result)) {
            throw new Error("Synchronous parse encountered promise.");
        }
        return result;
    }
    _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
    }
    parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    safeParse(data, params) {
        const ctx = {
            common: {
                issues: [],
                async: params?.async ?? false,
                contextualErrorMap: params?.errorMap,
            },
            path: params?.path || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: (0,_helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.getParsedType)(data),
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
    }
    "~validate"(data) {
        const ctx = {
            common: {
                issues: [],
                async: !!this["~standard"].async,
            },
            path: [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: (0,_helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.getParsedType)(data),
        };
        if (!this["~standard"].async) {
            try {
                const result = this._parseSync({ data, path: [], parent: ctx });
                return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.isValid)(result)
                    ? {
                        value: result.value,
                    }
                    : {
                        issues: ctx.common.issues,
                    };
            }
            catch (err) {
                if (err?.message?.toLowerCase()?.includes("encountered")) {
                    this["~standard"].async = true;
                }
                ctx.common = {
                    issues: [],
                    async: true,
                };
            }
        }
        return this._parseAsync({ data, path: [], parent: ctx }).then((result) => (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.isValid)(result)
            ? {
                value: result.value,
            }
            : {
                issues: ctx.common.issues,
            });
    }
    async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    async safeParseAsync(data, params) {
        const ctx = {
            common: {
                issues: [],
                contextualErrorMap: params?.errorMap,
                async: true,
            },
            path: params?.path || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: (0,_helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.getParsedType)(data),
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await ((0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.isAsync)(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
    }
    refine(check, message) {
        const getIssueProperties = (val) => {
            if (typeof message === "string" || typeof message === "undefined") {
                return { message };
            }
            else if (typeof message === "function") {
                return message(val);
            }
            else {
                return message;
            }
        };
        return this._refinement((val, ctx) => {
            const result = check(val);
            const setError = () => ctx.addIssue({
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.custom,
                ...getIssueProperties(val),
            });
            if (typeof Promise !== "undefined" && result instanceof Promise) {
                return result.then((data) => {
                    if (!data) {
                        setError();
                        return false;
                    }
                    else {
                        return true;
                    }
                });
            }
            if (!result) {
                setError();
                return false;
            }
            else {
                return true;
            }
        });
    }
    refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
            if (!check(val)) {
                ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
                return false;
            }
            else {
                return true;
            }
        });
    }
    _refinement(refinement) {
        return new ZodEffects({
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "refinement", refinement },
        });
    }
    superRefine(refinement) {
        return this._refinement(refinement);
    }
    constructor(def) {
        /** Alias of safeParseAsync */
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
        this["~standard"] = {
            version: 1,
            vendor: "zod",
            validate: (data) => this["~validate"](data),
        };
    }
    optional() {
        return ZodOptional.create(this, this._def);
    }
    nullable() {
        return ZodNullable.create(this, this._def);
    }
    nullish() {
        return this.nullable().optional();
    }
    array() {
        return ZodArray.create(this);
    }
    promise() {
        return ZodPromise.create(this, this._def);
    }
    or(option) {
        return ZodUnion.create([this, option], this._def);
    }
    and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
    }
    transform(transform) {
        return new ZodEffects({
            ...processCreateParams(this._def),
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "transform", transform },
        });
    }
    default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
            ...processCreateParams(this._def),
            innerType: this,
            defaultValue: defaultValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodDefault,
        });
    }
    brand() {
        return new ZodBranded({
            typeName: ZodFirstPartyTypeKind.ZodBranded,
            type: this,
            ...processCreateParams(this._def),
        });
    }
    catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
            ...processCreateParams(this._def),
            innerType: this,
            catchValue: catchValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodCatch,
        });
    }
    describe(description) {
        const This = this.constructor;
        return new This({
            ...this._def,
            description,
        });
    }
    pipe(target) {
        return ZodPipeline.create(this, target);
    }
    readonly() {
        return ZodReadonly.create(this);
    }
    isOptional() {
        return this.safeParse(undefined).success;
    }
    isNullable() {
        return this.safeParse(null).success;
    }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
// const uuidRegex =
//   /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
// from https://stackoverflow.com/a/46181/1550155
// old version: too slow, didn't support unicode
// const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
//old email regex
// const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((?!-)([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})[^-<>()[\].,;:\s@"]$/i;
// eslint-disable-next-line
// const emailRegex =
//   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/;
// const emailRegex =
//   /^[a-zA-Z0-9\.\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// const emailRegex =
//   /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
// const emailRegex =
//   /^[a-z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9\-]+)*$/i;
// from https://thekevinscott.com/emojis-in-javascript/#writing-a-regular-expression
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex;
// faster, simpler, safer
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
// const ipv6Regex =
// /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
const ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
// https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
// https://base64.guru/standards/base64url
const base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
// simple
// const dateRegexSource = `\\d{4}-\\d{2}-\\d{2}`;
// no leap year validation
// const dateRegexSource = `\\d{4}-((0[13578]|10|12)-31|(0[13-9]|1[0-2])-30|(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d))`;
// with leap year validation
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
    let secondsRegexSource = `[0-5]\\d`;
    if (args.precision) {
        secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
    }
    else if (args.precision == null) {
        secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
    }
    const secondsQuantifier = args.precision ? "+" : "?"; // require seconds if precision is nonzero
    return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
    return new RegExp(`^${timeRegexSource(args)}$`);
}
// Adapted from https://stackoverflow.com/a/3143231
function datetimeRegex(args) {
    let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
    const opts = [];
    opts.push(args.local ? `Z?` : `Z`);
    if (args.offset)
        opts.push(`([+-]\\d{2}:?\\d{2})`);
    regex = `${regex}(${opts.join("|")})`;
    return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
    if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
        return true;
    }
    if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
        return true;
    }
    return false;
}
function isValidJWT(jwt, alg) {
    if (!jwtRegex.test(jwt))
        return false;
    try {
        const [header] = jwt.split(".");
        // Convert base64url to base64
        const base64 = header
            .replace(/-/g, "+")
            .replace(/_/g, "/")
            .padEnd(header.length + ((4 - (header.length % 4)) % 4), "=");
        const decoded = JSON.parse(atob(base64));
        if (typeof decoded !== "object" || decoded === null)
            return false;
        if ("typ" in decoded && decoded?.typ !== "JWT")
            return false;
        if (!decoded.alg)
            return false;
        if (alg && decoded.alg !== alg)
            return false;
        return true;
    }
    catch {
        return false;
    }
}
function isValidCidr(ip, version) {
    if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
        return true;
    }
    if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
        return true;
    }
    return false;
}
class ZodString extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.string) {
            const ctx = this._getOrReturnCtx(input);
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.string,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        const status = new _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.length < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.length > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "length") {
                const tooBig = input.data.length > check.value;
                const tooSmall = input.data.length < check.value;
                if (tooBig || tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    if (tooBig) {
                        (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                            code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_big,
                            maximum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message,
                        });
                    }
                    else if (tooSmall) {
                        (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                            code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_small,
                            minimum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message,
                        });
                    }
                    status.dirty();
                }
            }
            else if (check.kind === "email") {
                if (!emailRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        validation: "email",
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "emoji") {
                if (!emojiRegex) {
                    emojiRegex = new RegExp(_emojiRegex, "u");
                }
                if (!emojiRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        validation: "emoji",
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "uuid") {
                if (!uuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        validation: "uuid",
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "nanoid") {
                if (!nanoidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        validation: "nanoid",
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid") {
                if (!cuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        validation: "cuid",
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid2") {
                if (!cuid2Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        validation: "cuid2",
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "ulid") {
                if (!ulidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        validation: "ulid",
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "url") {
                try {
                    new URL(input.data);
                }
                catch {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        validation: "url",
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "regex") {
                check.regex.lastIndex = 0;
                const testResult = check.regex.test(input.data);
                if (!testResult) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        validation: "regex",
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "trim") {
                input.data = input.data.trim();
            }
            else if (check.kind === "includes") {
                if (!input.data.includes(check.value, check.position)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        validation: { includes: check.value, position: check.position },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "toLowerCase") {
                input.data = input.data.toLowerCase();
            }
            else if (check.kind === "toUpperCase") {
                input.data = input.data.toUpperCase();
            }
            else if (check.kind === "startsWith") {
                if (!input.data.startsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        validation: { startsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "endsWith") {
                if (!input.data.endsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        validation: { endsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "datetime") {
                const regex = datetimeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        validation: "datetime",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "date") {
                const regex = dateRegex;
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        validation: "date",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "time") {
                const regex = timeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        validation: "time",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "duration") {
                if (!durationRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        validation: "duration",
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "ip") {
                if (!isValidIP(input.data, check.version)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        validation: "ip",
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "jwt") {
                if (!isValidJWT(input.data, check.alg)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        validation: "jwt",
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cidr") {
                if (!isValidCidr(input.data, check.version)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        validation: "cidr",
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "base64") {
                if (!base64Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        validation: "base64",
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "base64url") {
                if (!base64urlRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        validation: "base64url",
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), {
            validation,
            code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_string,
            ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message),
        });
    }
    _addCheck(check) {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    email(message) {
        return this._addCheck({ kind: "email", ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message) });
    }
    url(message) {
        return this._addCheck({ kind: "url", ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message) });
    }
    emoji(message) {
        return this._addCheck({ kind: "emoji", ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message) });
    }
    uuid(message) {
        return this._addCheck({ kind: "uuid", ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message) });
    }
    nanoid(message) {
        return this._addCheck({ kind: "nanoid", ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message) });
    }
    cuid(message) {
        return this._addCheck({ kind: "cuid", ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message) });
    }
    cuid2(message) {
        return this._addCheck({ kind: "cuid2", ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message) });
    }
    ulid(message) {
        return this._addCheck({ kind: "ulid", ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message) });
    }
    base64(message) {
        return this._addCheck({ kind: "base64", ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message) });
    }
    base64url(message) {
        // base64url encoding is a modification of base64 that can safely be used in URLs and filenames
        return this._addCheck({
            kind: "base64url",
            ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message),
        });
    }
    jwt(options) {
        return this._addCheck({ kind: "jwt", ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(options) });
    }
    ip(options) {
        return this._addCheck({ kind: "ip", ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(options) });
    }
    cidr(options) {
        return this._addCheck({ kind: "cidr", ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(options) });
    }
    datetime(options) {
        if (typeof options === "string") {
            return this._addCheck({
                kind: "datetime",
                precision: null,
                offset: false,
                local: false,
                message: options,
            });
        }
        return this._addCheck({
            kind: "datetime",
            precision: typeof options?.precision === "undefined" ? null : options?.precision,
            offset: options?.offset ?? false,
            local: options?.local ?? false,
            ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(options?.message),
        });
    }
    date(message) {
        return this._addCheck({ kind: "date", message });
    }
    time(options) {
        if (typeof options === "string") {
            return this._addCheck({
                kind: "time",
                precision: null,
                message: options,
            });
        }
        return this._addCheck({
            kind: "time",
            precision: typeof options?.precision === "undefined" ? null : options?.precision,
            ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(options?.message),
        });
    }
    duration(message) {
        return this._addCheck({ kind: "duration", ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message) });
    }
    regex(regex, message) {
        return this._addCheck({
            kind: "regex",
            regex: regex,
            ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message),
        });
    }
    includes(value, options) {
        return this._addCheck({
            kind: "includes",
            value: value,
            position: options?.position,
            ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(options?.message),
        });
    }
    startsWith(value, message) {
        return this._addCheck({
            kind: "startsWith",
            value: value,
            ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message),
        });
    }
    endsWith(value, message) {
        return this._addCheck({
            kind: "endsWith",
            value: value,
            ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message),
        });
    }
    min(minLength, message) {
        return this._addCheck({
            kind: "min",
            value: minLength,
            ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message),
        });
    }
    max(maxLength, message) {
        return this._addCheck({
            kind: "max",
            value: maxLength,
            ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message),
        });
    }
    length(len, message) {
        return this._addCheck({
            kind: "length",
            value: len,
            ..._helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message),
        });
    }
    /**
     * Equivalent to `.min(1)`
     */
    nonempty(message) {
        return this.min(1, _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message));
    }
    trim() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "trim" }],
        });
    }
    toLowerCase() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toLowerCase" }],
        });
    }
    toUpperCase() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toUpperCase" }],
        });
    }
    get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
    }
    get isDate() {
        return !!this._def.checks.find((ch) => ch.kind === "date");
    }
    get isTime() {
        return !!this._def.checks.find((ch) => ch.kind === "time");
    }
    get isDuration() {
        return !!this._def.checks.find((ch) => ch.kind === "duration");
    }
    get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
    }
    get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
    }
    get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
    }
    get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
    }
    get isNANOID() {
        return !!this._def.checks.find((ch) => ch.kind === "nanoid");
    }
    get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
    }
    get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
    }
    get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
    }
    get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
    }
    get isCIDR() {
        return !!this._def.checks.find((ch) => ch.kind === "cidr");
    }
    get isBase64() {
        return !!this._def.checks.find((ch) => ch.kind === "base64");
    }
    get isBase64url() {
        // base64url encoding is a modification of base64 that can safely be used in URLs and filenames
        return !!this._def.checks.find((ch) => ch.kind === "base64url");
    }
    get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
ZodString.create = (params) => {
    return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: params?.coerce ?? false,
        ...processCreateParams(params),
    });
};
// https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript/31711034#31711034
function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepDecCount = (step.toString().split(".")[1] || "").length;
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
    return (valInt % stepInt) / 10 ** decCount;
}
class ZodNumber extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
    }
    _parse(input) {
        if (this._def.coerce) {
            input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.number) {
            const ctx = this._getOrReturnCtx(input);
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.number,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        let ctx = undefined;
        const status = new _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "int") {
                if (!_helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.isInteger(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                        expected: "integer",
                        received: "float",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "min") {
                const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (floatSafeRemainder(input.data, check.value) !== 0) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "finite") {
                if (!Number.isFinite(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.not_finite,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    gte(value, message) {
        return this.setLimit("min", value, true, _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodNumber({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodNumber({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    int(message) {
        return this._addCheck({
            kind: "int",
            message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: false,
            message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: false,
            message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: true,
            message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: true,
            message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value: value,
            message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
        });
    }
    finite(message) {
        return this._addCheck({
            kind: "finite",
            message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
        });
    }
    safe(message) {
        return this._addCheck({
            kind: "min",
            inclusive: true,
            value: Number.MIN_SAFE_INTEGER,
            message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
        })._addCheck({
            kind: "max",
            inclusive: true,
            value: Number.MAX_SAFE_INTEGER,
            message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
    get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" || (ch.kind === "multipleOf" && _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.isInteger(ch.value)));
    }
    get isFinite() {
        let max = null;
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
                return true;
            }
            else if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
            else if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return Number.isFinite(min) && Number.isFinite(max);
    }
}
ZodNumber.create = (params) => {
    return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: params?.coerce || false,
        ...processCreateParams(params),
    });
};
class ZodBigInt extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
    }
    _parse(input) {
        if (this._def.coerce) {
            try {
                input.data = BigInt(input.data);
            }
            catch {
                return this._getInvalidInput(input);
            }
        }
        const parsedType = this._getType(input);
        if (parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.bigint) {
            return this._getInvalidInput(input);
        }
        let ctx = undefined;
        const status = new _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_small,
                        type: "bigint",
                        minimum: check.value,
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_big,
                        type: "bigint",
                        maximum: check.value,
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (input.data % check.value !== BigInt(0)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    _getInvalidInput(input) {
        const ctx = this._getOrReturnCtx(input);
        (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
            code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
            expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.bigint,
            received: ctx.parsedType,
        });
        return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
    }
    gte(value, message) {
        return this.setLimit("min", value, true, _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodBigInt({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodBigInt({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: false,
            message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: false,
            message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: true,
            message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: true,
            message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value,
            message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
ZodBigInt.create = (params) => {
    return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: params?.coerce ?? false,
        ...processCreateParams(params),
    });
};
class ZodBoolean extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.boolean) {
            const ctx = this._getOrReturnCtx(input);
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.boolean,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.OK)(input.data);
    }
}
ZodBoolean.create = (params) => {
    return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: params?.coerce || false,
        ...processCreateParams(params),
    });
};
class ZodDate extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.date) {
            const ctx = this._getOrReturnCtx(input);
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.date,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        if (Number.isNaN(input.data.getTime())) {
            const ctx = this._getOrReturnCtx(input);
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_date,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        const status = new _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.getTime() < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_small,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        minimum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.getTime() > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_big,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        maximum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else {
                _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.assertNever(check);
            }
        }
        return {
            status: status.value,
            value: new Date(input.data.getTime()),
        };
    }
    _addCheck(check) {
        return new ZodDate({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    min(minDate, message) {
        return this._addCheck({
            kind: "min",
            value: minDate.getTime(),
            message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
        });
    }
    max(maxDate, message) {
        return this._addCheck({
            kind: "max",
            value: maxDate.getTime(),
            message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message),
        });
    }
    get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min != null ? new Date(min) : null;
    }
    get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max != null ? new Date(max) : null;
    }
}
ZodDate.create = (params) => {
    return new ZodDate({
        checks: [],
        coerce: params?.coerce || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params),
    });
};
class ZodSymbol extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.symbol) {
            const ctx = this._getOrReturnCtx(input);
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.symbol,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.OK)(input.data);
    }
}
ZodSymbol.create = (params) => {
    return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params),
    });
};
class ZodUndefined extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.undefined,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.OK)(input.data);
    }
}
ZodUndefined.create = (params) => {
    return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params),
    });
};
class ZodNull extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.null) {
            const ctx = this._getOrReturnCtx(input);
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.null,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.OK)(input.data);
    }
}
ZodNull.create = (params) => {
    return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params),
    });
};
class ZodAny extends ZodType {
    constructor() {
        super(...arguments);
        // to prevent instances of other classes from extending ZodAny. this causes issues with catchall in ZodObject.
        this._any = true;
    }
    _parse(input) {
        return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.OK)(input.data);
    }
}
ZodAny.create = (params) => {
    return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params),
    });
};
class ZodUnknown extends ZodType {
    constructor() {
        super(...arguments);
        // required
        this._unknown = true;
    }
    _parse(input) {
        return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.OK)(input.data);
    }
}
ZodUnknown.create = (params) => {
    return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params),
    });
};
class ZodNever extends ZodType {
    _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
            code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
            expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.never,
            received: ctx.parsedType,
        });
        return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
    }
}
ZodNever.create = (params) => {
    return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params),
    });
};
class ZodVoid extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.void,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.OK)(input.data);
    }
}
ZodVoid.create = (params) => {
    return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params),
    });
};
class ZodArray extends ZodType {
    _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.array) {
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.array,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        if (def.exactLength !== null) {
            const tooBig = ctx.data.length > def.exactLength.value;
            const tooSmall = ctx.data.length < def.exactLength.value;
            if (tooBig || tooSmall) {
                (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                    code: tooBig ? _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_big : _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_small,
                    minimum: (tooSmall ? def.exactLength.value : undefined),
                    maximum: (tooBig ? def.exactLength.value : undefined),
                    type: "array",
                    inclusive: true,
                    exact: true,
                    message: def.exactLength.message,
                });
                status.dirty();
            }
        }
        if (def.minLength !== null) {
            if (ctx.data.length < def.minLength.value) {
                (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                    code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_small,
                    minimum: def.minLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.minLength.message,
                });
                status.dirty();
            }
        }
        if (def.maxLength !== null) {
            if (ctx.data.length > def.maxLength.value) {
                (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                    code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_big,
                    maximum: def.maxLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.maxLength.message,
                });
                status.dirty();
            }
        }
        if (ctx.common.async) {
            return Promise.all([...ctx.data].map((item, i) => {
                return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
            })).then((result) => {
                return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.ParseStatus.mergeArray(status, result);
            });
        }
        const result = [...ctx.data].map((item, i) => {
            return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.ParseStatus.mergeArray(status, result);
    }
    get element() {
        return this._def.type;
    }
    min(minLength, message) {
        return new ZodArray({
            ...this._def,
            minLength: { value: minLength, message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message) },
        });
    }
    max(maxLength, message) {
        return new ZodArray({
            ...this._def,
            maxLength: { value: maxLength, message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message) },
        });
    }
    length(len, message) {
        return new ZodArray({
            ...this._def,
            exactLength: { value: len, message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message) },
        });
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
ZodArray.create = (schema, params) => {
    return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params),
    });
};
function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
        const newShape = {};
        for (const key in schema.shape) {
            const fieldSchema = schema.shape[key];
            newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
        }
        return new ZodObject({
            ...schema._def,
            shape: () => newShape,
        });
    }
    else if (schema instanceof ZodArray) {
        return new ZodArray({
            ...schema._def,
            type: deepPartialify(schema.element),
        });
    }
    else if (schema instanceof ZodOptional) {
        return ZodOptional.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodNullable) {
        return ZodNullable.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodTuple) {
        return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
    }
    else {
        return schema;
    }
}
class ZodObject extends ZodType {
    constructor() {
        super(...arguments);
        this._cached = null;
        /**
         * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
         * If you want to pass through unknown properties, use `.passthrough()` instead.
         */
        this.nonstrict = this.passthrough;
        // extend<
        //   Augmentation extends ZodRawShape,
        //   NewOutput extends util.flatten<{
        //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
        //       ? Augmentation[k]["_output"]
        //       : k extends keyof Output
        //       ? Output[k]
        //       : never;
        //   }>,
        //   NewInput extends util.flatten<{
        //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
        //       ? Augmentation[k]["_input"]
        //       : k extends keyof Input
        //       ? Input[k]
        //       : never;
        //   }>
        // >(
        //   augmentation: Augmentation
        // ): ZodObject<
        //   extendShape<T, Augmentation>,
        //   UnknownKeys,
        //   Catchall,
        //   NewOutput,
        //   NewInput
        // > {
        //   return new ZodObject({
        //     ...this._def,
        //     shape: () => ({
        //       ...this._def.shape(),
        //       ...augmentation,
        //     }),
        //   }) as any;
        // }
        /**
         * @deprecated Use `.extend` instead
         *  */
        this.augment = this.extend;
    }
    _getCached() {
        if (this._cached !== null)
            return this._cached;
        const shape = this._def.shape();
        const keys = _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.objectKeys(shape);
        this._cached = { shape, keys };
        return this._cached;
    }
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.object) {
            const ctx = this._getOrReturnCtx(input);
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.object,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
            for (const key in ctx.data) {
                if (!shapeKeys.includes(key)) {
                    extraKeys.push(key);
                }
            }
        }
        const pairs = [];
        for (const key of shapeKeys) {
            const keyValidator = shape[key];
            const value = ctx.data[key];
            pairs.push({
                key: { status: "valid", value: key },
                value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (this._def.catchall instanceof ZodNever) {
            const unknownKeys = this._def.unknownKeys;
            if (unknownKeys === "passthrough") {
                for (const key of extraKeys) {
                    pairs.push({
                        key: { status: "valid", value: key },
                        value: { status: "valid", value: ctx.data[key] },
                    });
                }
            }
            else if (unknownKeys === "strict") {
                if (extraKeys.length > 0) {
                    (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                        code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.unrecognized_keys,
                        keys: extraKeys,
                    });
                    status.dirty();
                }
            }
            else if (unknownKeys === "strip") {
            }
            else {
                throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
            }
        }
        else {
            // run catchall validation
            const catchall = this._def.catchall;
            for (const key of extraKeys) {
                const value = ctx.data[key];
                pairs.push({
                    key: { status: "valid", value: key },
                    value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key) //, ctx.child(key), value, getParsedType(value)
                    ),
                    alwaysSet: key in ctx.data,
                });
            }
        }
        if (ctx.common.async) {
            return Promise.resolve()
                .then(async () => {
                const syncPairs = [];
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    syncPairs.push({
                        key,
                        value,
                        alwaysSet: pair.alwaysSet,
                    });
                }
                return syncPairs;
            })
                .then((syncPairs) => {
                return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.ParseStatus.mergeObjectSync(status, syncPairs);
            });
        }
        else {
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get shape() {
        return this._def.shape();
    }
    strict(message) {
        _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj;
        return new ZodObject({
            ...this._def,
            unknownKeys: "strict",
            ...(message !== undefined
                ? {
                    errorMap: (issue, ctx) => {
                        const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
                        if (issue.code === "unrecognized_keys")
                            return {
                                message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.errToObj(message).message ?? defaultError,
                            };
                        return {
                            message: defaultError,
                        };
                    },
                }
                : {}),
        });
    }
    strip() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "strip",
        });
    }
    passthrough() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "passthrough",
        });
    }
    // const AugmentFactory =
    //   <Def extends ZodObjectDef>(def: Def) =>
    //   <Augmentation extends ZodRawShape>(
    //     augmentation: Augmentation
    //   ): ZodObject<
    //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
    //     Def["unknownKeys"],
    //     Def["catchall"]
    //   > => {
    //     return new ZodObject({
    //       ...def,
    //       shape: () => ({
    //         ...def.shape(),
    //         ...augmentation,
    //       }),
    //     }) as any;
    //   };
    extend(augmentation) {
        return new ZodObject({
            ...this._def,
            shape: () => ({
                ...this._def.shape(),
                ...augmentation,
            }),
        });
    }
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge(merging) {
        const merged = new ZodObject({
            unknownKeys: merging._def.unknownKeys,
            catchall: merging._def.catchall,
            shape: () => ({
                ...this._def.shape(),
                ...merging._def.shape(),
            }),
            typeName: ZodFirstPartyTypeKind.ZodObject,
        });
        return merged;
    }
    // merge<
    //   Incoming extends AnyZodObject,
    //   Augmentation extends Incoming["shape"],
    //   NewOutput extends {
    //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
    //       ? Augmentation[k]["_output"]
    //       : k extends keyof Output
    //       ? Output[k]
    //       : never;
    //   },
    //   NewInput extends {
    //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
    //       ? Augmentation[k]["_input"]
    //       : k extends keyof Input
    //       ? Input[k]
    //       : never;
    //   }
    // >(
    //   merging: Incoming
    // ): ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"],
    //   NewOutput,
    //   NewInput
    // > {
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    setKey(key, schema) {
        return this.augment({ [key]: schema });
    }
    // merge<Incoming extends AnyZodObject>(
    //   merging: Incoming
    // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
    // ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"]
    // > {
    //   // const mergedShape = objectUtil.mergeShapes(
    //   //   this._def.shape(),
    //   //   merging._def.shape()
    //   // );
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    catchall(index) {
        return new ZodObject({
            ...this._def,
            catchall: index,
        });
    }
    pick(mask) {
        const shape = {};
        for (const key of _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.objectKeys(mask)) {
            if (mask[key] && this.shape[key]) {
                shape[key] = this.shape[key];
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    omit(mask) {
        const shape = {};
        for (const key of _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.objectKeys(this.shape)) {
            if (!mask[key]) {
                shape[key] = this.shape[key];
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    /**
     * @deprecated
     */
    deepPartial() {
        return deepPartialify(this);
    }
    partial(mask) {
        const newShape = {};
        for (const key of _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.objectKeys(this.shape)) {
            const fieldSchema = this.shape[key];
            if (mask && !mask[key]) {
                newShape[key] = fieldSchema;
            }
            else {
                newShape[key] = fieldSchema.optional();
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    required(mask) {
        const newShape = {};
        for (const key of _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.objectKeys(this.shape)) {
            if (mask && !mask[key]) {
                newShape[key] = this.shape[key];
            }
            else {
                const fieldSchema = this.shape[key];
                let newField = fieldSchema;
                while (newField instanceof ZodOptional) {
                    newField = newField._def.innerType;
                }
                newShape[key] = newField;
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    keyof() {
        return createZodEnum(_helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.objectKeys(this.shape));
    }
}
ZodObject.create = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.strictCreate = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.lazycreate = (shape, params) => {
    return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
class ZodUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
            // return first issue-free validation if it exists
            for (const result of results) {
                if (result.result.status === "valid") {
                    return result.result;
                }
            }
            for (const result of results) {
                if (result.result.status === "dirty") {
                    // add issues from dirty option
                    ctx.common.issues.push(...result.ctx.common.issues);
                    return result.result;
                }
            }
            // return invalid
            const unionErrors = results.map((result) => new _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodError(result.ctx.common.issues));
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_union,
                unionErrors,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        if (ctx.common.async) {
            return Promise.all(options.map(async (option) => {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                return {
                    result: await option._parseAsync({
                        data: ctx.data,
                        path: ctx.path,
                        parent: childCtx,
                    }),
                    ctx: childCtx,
                };
            })).then(handleResults);
        }
        else {
            let dirty = undefined;
            const issues = [];
            for (const option of options) {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                const result = option._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: childCtx,
                });
                if (result.status === "valid") {
                    return result;
                }
                else if (result.status === "dirty" && !dirty) {
                    dirty = { result, ctx: childCtx };
                }
                if (childCtx.common.issues.length) {
                    issues.push(childCtx.common.issues);
                }
            }
            if (dirty) {
                ctx.common.issues.push(...dirty.ctx.common.issues);
                return dirty.result;
            }
            const unionErrors = issues.map((issues) => new _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodError(issues));
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_union,
                unionErrors,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
    }
    get options() {
        return this._def.options;
    }
}
ZodUnion.create = (types, params) => {
    return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params),
    });
};
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//////////                                 //////////
//////////      ZodDiscriminatedUnion      //////////
//////////                                 //////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
const getDiscriminator = (type) => {
    if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
    }
    else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
    }
    else if (type instanceof ZodLiteral) {
        return [type.value];
    }
    else if (type instanceof ZodEnum) {
        return type.options;
    }
    else if (type instanceof ZodNativeEnum) {
        // eslint-disable-next-line ban/ban
        return _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.objectValues(type.enum);
    }
    else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
    }
    else if (type instanceof ZodUndefined) {
        return [undefined];
    }
    else if (type instanceof ZodNull) {
        return [null];
    }
    else if (type instanceof ZodOptional) {
        return [undefined, ...getDiscriminator(type.unwrap())];
    }
    else if (type instanceof ZodNullable) {
        return [null, ...getDiscriminator(type.unwrap())];
    }
    else if (type instanceof ZodBranded) {
        return getDiscriminator(type.unwrap());
    }
    else if (type instanceof ZodReadonly) {
        return getDiscriminator(type.unwrap());
    }
    else if (type instanceof ZodCatch) {
        return getDiscriminator(type._def.innerType);
    }
    else {
        return [];
    }
};
class ZodDiscriminatedUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.object) {
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.object,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_union_discriminator,
                options: Array.from(this.optionsMap.keys()),
                path: [discriminator],
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        if (ctx.common.async) {
            return option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
        else {
            return option._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
    }
    get discriminator() {
        return this._def.discriminator;
    }
    get options() {
        return this._def.options;
    }
    get optionsMap() {
        return this._def.optionsMap;
    }
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */
    static create(discriminator, options, params) {
        // Get all the valid discriminator values
        const optionsMap = new Map();
        // try {
        for (const type of options) {
            const discriminatorValues = getDiscriminator(type.shape[discriminator]);
            if (!discriminatorValues.length) {
                throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
            }
            for (const value of discriminatorValues) {
                if (optionsMap.has(value)) {
                    throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
                }
                optionsMap.set(value, type);
            }
        }
        return new ZodDiscriminatedUnion({
            typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
            discriminator,
            options,
            optionsMap,
            ...processCreateParams(params),
        });
    }
}
function mergeValues(a, b) {
    const aType = (0,_helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.getParsedType)(a);
    const bType = (0,_helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.getParsedType)(b);
    if (a === b) {
        return { valid: true, data: a };
    }
    else if (aType === _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.object && bType === _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.object) {
        const bKeys = _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.objectKeys(b);
        const sharedKeys = _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = { ...a, ...b };
        for (const key of sharedKeys) {
            const sharedValue = mergeValues(a[key], b[key]);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newObj[key] = sharedValue.data;
        }
        return { valid: true, data: newObj };
    }
    else if (aType === _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.array && bType === _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.array) {
        if (a.length !== b.length) {
            return { valid: false };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
            const itemA = a[index];
            const itemB = b[index];
            const sharedValue = mergeValues(itemA, itemB);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
    }
    else if (aType === _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.date && bType === _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.date && +a === +b) {
        return { valid: true, data: a };
    }
    else {
        return { valid: false };
    }
}
class ZodIntersection extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
            if ((0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.isAborted)(parsedLeft) || (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.isAborted)(parsedRight)) {
                return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
            }
            const merged = mergeValues(parsedLeft.value, parsedRight.value);
            if (!merged.valid) {
                (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                    code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_intersection_types,
                });
                return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
            }
            if ((0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.isDirty)(parsedLeft) || (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.isDirty)(parsedRight)) {
                status.dirty();
            }
            return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
            return Promise.all([
                this._def.left._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
                this._def.right._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
            ]).then(([left, right]) => handleParsed(left, right));
        }
        else {
            return handleParsed(this._def.left._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }), this._def.right._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }));
        }
    }
}
ZodIntersection.create = (left, right, params) => {
    return new ZodIntersection({
        left: left,
        right: right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params),
    });
};
// type ZodTupleItems = [ZodTypeAny, ...ZodTypeAny[]];
class ZodTuple extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.array) {
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.array,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_small,
                minimum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array",
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_big,
                maximum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array",
            });
            status.dirty();
        }
        const items = [...ctx.data]
            .map((item, itemIndex) => {
            const schema = this._def.items[itemIndex] || this._def.rest;
            if (!schema)
                return null;
            return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        })
            .filter((x) => !!x); // filter nulls
        if (ctx.common.async) {
            return Promise.all(items).then((results) => {
                return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.ParseStatus.mergeArray(status, results);
            });
        }
        else {
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.ParseStatus.mergeArray(status, items);
        }
    }
    get items() {
        return this._def.items;
    }
    rest(rest) {
        return new ZodTuple({
            ...this._def,
            rest,
        });
    }
}
ZodTuple.create = (schemas, params) => {
    if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    }
    return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params),
    });
};
class ZodRecord extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.object) {
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.object,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
            pairs.push({
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
                value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (ctx.common.async) {
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.ParseStatus.mergeObjectAsync(status, pairs);
        }
        else {
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get element() {
        return this._def.valueType;
    }
    static create(first, second, third) {
        if (second instanceof ZodType) {
            return new ZodRecord({
                keyType: first,
                valueType: second,
                typeName: ZodFirstPartyTypeKind.ZodRecord,
                ...processCreateParams(third),
            });
        }
        return new ZodRecord({
            keyType: ZodString.create(),
            valueType: first,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(second),
        });
    }
}
class ZodMap extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.map) {
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.map,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
            return {
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
                value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"])),
            };
        });
        if (ctx.common.async) {
            const finalMap = new Map();
            return Promise.resolve().then(async () => {
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    if (key.status === "aborted" || value.status === "aborted") {
                        return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
                    }
                    if (key.status === "dirty" || value.status === "dirty") {
                        status.dirty();
                    }
                    finalMap.set(key.value, value.value);
                }
                return { status: status.value, value: finalMap };
            });
        }
        else {
            const finalMap = new Map();
            for (const pair of pairs) {
                const key = pair.key;
                const value = pair.value;
                if (key.status === "aborted" || value.status === "aborted") {
                    return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
                }
                if (key.status === "dirty" || value.status === "dirty") {
                    status.dirty();
                }
                finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
        }
    }
}
ZodMap.create = (keyType, valueType, params) => {
    return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params),
    });
};
class ZodSet extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.set) {
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.set,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
            if (ctx.data.size < def.minSize.value) {
                (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                    code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_small,
                    minimum: def.minSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.minSize.message,
                });
                status.dirty();
            }
        }
        if (def.maxSize !== null) {
            if (ctx.data.size > def.maxSize.value) {
                (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                    code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.too_big,
                    maximum: def.maxSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.maxSize.message,
                });
                status.dirty();
            }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements) {
            const parsedSet = new Set();
            for (const element of elements) {
                if (element.status === "aborted")
                    return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
                if (element.status === "dirty")
                    status.dirty();
                parsedSet.add(element.value);
            }
            return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
            return Promise.all(elements).then((elements) => finalizeSet(elements));
        }
        else {
            return finalizeSet(elements);
        }
    }
    min(minSize, message) {
        return new ZodSet({
            ...this._def,
            minSize: { value: minSize, message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message) },
        });
    }
    max(maxSize, message) {
        return new ZodSet({
            ...this._def,
            maxSize: { value: maxSize, message: _helpers_errorUtil_js__WEBPACK_IMPORTED_MODULE_2__.errorUtil.toString(message) },
        });
    }
    size(size, message) {
        return this.min(size, message).max(size, message);
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
ZodSet.create = (valueType, params) => {
    return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params),
    });
};
class ZodFunction extends ZodType {
    constructor() {
        super(...arguments);
        this.validate = this.implement;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.function) {
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.function,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        function makeArgsIssue(args, error) {
            return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.makeIssue)({
                data: args,
                path: ctx.path,
                errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, (0,_errors_js__WEBPACK_IMPORTED_MODULE_1__.getErrorMap)(), _errors_js__WEBPACK_IMPORTED_MODULE_1__.defaultErrorMap].filter((x) => !!x),
                issueData: {
                    code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_arguments,
                    argumentsError: error,
                },
            });
        }
        function makeReturnsIssue(returns, error) {
            return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.makeIssue)({
                data: returns,
                path: ctx.path,
                errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, (0,_errors_js__WEBPACK_IMPORTED_MODULE_1__.getErrorMap)(), _errors_js__WEBPACK_IMPORTED_MODULE_1__.defaultErrorMap].filter((x) => !!x),
                issueData: {
                    code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_return_type,
                    returnTypeError: error,
                },
            });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
            // Would love a way to avoid disabling this rule, but we need
            // an alias (using an arrow function was what caused 2651).
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.OK)(async function (...args) {
                const error = new _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodError([]);
                const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
                    error.addIssue(makeArgsIssue(args, e));
                    throw error;
                });
                const result = await Reflect.apply(fn, this, parsedArgs);
                const parsedReturns = await me._def.returns._def.type
                    .parseAsync(result, params)
                    .catch((e) => {
                    error.addIssue(makeReturnsIssue(result, e));
                    throw error;
                });
                return parsedReturns;
            });
        }
        else {
            // Would love a way to avoid disabling this rule, but we need
            // an alias (using an arrow function was what caused 2651).
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.OK)(function (...args) {
                const parsedArgs = me._def.args.safeParse(args, params);
                if (!parsedArgs.success) {
                    throw new _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodError([makeArgsIssue(args, parsedArgs.error)]);
                }
                const result = Reflect.apply(fn, this, parsedArgs.data);
                const parsedReturns = me._def.returns.safeParse(result, params);
                if (!parsedReturns.success) {
                    throw new _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodError([makeReturnsIssue(result, parsedReturns.error)]);
                }
                return parsedReturns.data;
            });
        }
    }
    parameters() {
        return this._def.args;
    }
    returnType() {
        return this._def.returns;
    }
    args(...items) {
        return new ZodFunction({
            ...this._def,
            args: ZodTuple.create(items).rest(ZodUnknown.create()),
        });
    }
    returns(returnType) {
        return new ZodFunction({
            ...this._def,
            returns: returnType,
        });
    }
    implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    static create(args, returns, params) {
        return new ZodFunction({
            args: (args ? args : ZodTuple.create([]).rest(ZodUnknown.create())),
            returns: returns || ZodUnknown.create(),
            typeName: ZodFirstPartyTypeKind.ZodFunction,
            ...processCreateParams(params),
        });
    }
}
class ZodLazy extends ZodType {
    get schema() {
        return this._def.getter();
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
    }
}
ZodLazy.create = (getter, params) => {
    return new ZodLazy({
        getter: getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params),
    });
};
class ZodLiteral extends ZodType {
    _parse(input) {
        if (input.data !== this._def.value) {
            const ctx = this._getOrReturnCtx(input);
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                received: ctx.data,
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_literal,
                expected: this._def.value,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        return { status: "valid", value: input.data };
    }
    get value() {
        return this._def.value;
    }
}
ZodLiteral.create = (value, params) => {
    return new ZodLiteral({
        value: value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params),
    });
};
function createZodEnum(values, params) {
    return new ZodEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodEnum,
        ...processCreateParams(params),
    });
}
class ZodEnum extends ZodType {
    _parse(input) {
        if (typeof input.data !== "string") {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        if (!this._cache) {
            this._cache = new Set(this._def.values);
        }
        if (!this._cache.has(input.data)) {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                received: ctx.data,
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_enum_value,
                options: expectedValues,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.OK)(input.data);
    }
    get options() {
        return this._def.values;
    }
    get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    extract(values, newDef = this._def) {
        return ZodEnum.create(values, {
            ...this._def,
            ...newDef,
        });
    }
    exclude(values, newDef = this._def) {
        return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
            ...this._def,
            ...newDef,
        });
    }
}
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
    _parse(input) {
        const nativeEnumValues = _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.string && ctx.parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.number) {
            const expectedValues = _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.objectValues(nativeEnumValues);
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        if (!this._cache) {
            this._cache = new Set(_helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.getValidEnumValues(this._def.values));
        }
        if (!this._cache.has(input.data)) {
            const expectedValues = _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.objectValues(nativeEnumValues);
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                received: ctx.data,
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_enum_value,
                options: expectedValues,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.OK)(input.data);
    }
    get enum() {
        return this._def.values;
    }
}
ZodNativeEnum.create = (values, params) => {
    return new ZodNativeEnum({
        values: values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params),
    });
};
class ZodPromise extends ZodType {
    unwrap() {
        return this._def.type;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.promise && ctx.common.async === false) {
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.promise,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        const promisified = ctx.parsedType === _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.OK)(promisified.then((data) => {
            return this._def.type.parseAsync(data, {
                path: ctx.path,
                errorMap: ctx.common.contextualErrorMap,
            });
        }));
    }
}
ZodPromise.create = (schema, params) => {
    return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params),
    });
};
class ZodEffects extends ZodType {
    innerType() {
        return this._def.schema;
    }
    sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects
            ? this._def.schema.sourceType()
            : this._def.schema;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
            addIssue: (arg) => {
                (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, arg);
                if (arg.fatal) {
                    status.abort();
                }
                else {
                    status.dirty();
                }
            },
            get path() {
                return ctx.path;
            },
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
            const processed = effect.transform(ctx.data, checkCtx);
            if (ctx.common.async) {
                return Promise.resolve(processed).then(async (processed) => {
                    if (status.value === "aborted")
                        return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
                    const result = await this._def.schema._parseAsync({
                        data: processed,
                        path: ctx.path,
                        parent: ctx,
                    });
                    if (result.status === "aborted")
                        return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
                    if (result.status === "dirty")
                        return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.DIRTY)(result.value);
                    if (status.value === "dirty")
                        return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.DIRTY)(result.value);
                    return result;
                });
            }
            else {
                if (status.value === "aborted")
                    return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
                const result = this._def.schema._parseSync({
                    data: processed,
                    path: ctx.path,
                    parent: ctx,
                });
                if (result.status === "aborted")
                    return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
                if (result.status === "dirty")
                    return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.DIRTY)(result.value);
                if (status.value === "dirty")
                    return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.DIRTY)(result.value);
                return result;
            }
        }
        if (effect.type === "refinement") {
            const executeRefinement = (acc) => {
                const result = effect.refinement(acc, checkCtx);
                if (ctx.common.async) {
                    return Promise.resolve(result);
                }
                if (result instanceof Promise) {
                    throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                }
                return acc;
            };
            if (ctx.common.async === false) {
                const inner = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inner.status === "aborted")
                    return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
                if (inner.status === "dirty")
                    status.dirty();
                // return value is ignored
                executeRefinement(inner.value);
                return { status: status.value, value: inner.value };
            }
            else {
                return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
                    if (inner.status === "aborted")
                        return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
                    if (inner.status === "dirty")
                        status.dirty();
                    return executeRefinement(inner.value).then(() => {
                        return { status: status.value, value: inner.value };
                    });
                });
            }
        }
        if (effect.type === "transform") {
            if (ctx.common.async === false) {
                const base = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (!(0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.isValid)(base))
                    return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
                const result = effect.transform(base.value, checkCtx);
                if (result instanceof Promise) {
                    throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
                }
                return { status: status.value, value: result };
            }
            else {
                return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
                    if (!(0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.isValid)(base))
                        return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
                    return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
                        status: status.value,
                        value: result,
                    }));
                });
            }
        }
        _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.util.assertNever(effect);
    }
}
ZodEffects.create = (schema, effect, params) => {
    return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params),
    });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
    return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params),
    });
};

class ZodOptional extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.undefined) {
            return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.OK)(undefined);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodOptional.create = (type, params) => {
    return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params),
    });
};
class ZodNullable extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.null) {
            return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.OK)(null);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodNullable.create = (type, params) => {
    return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params),
    });
};
class ZodDefault extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.undefined) {
            data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    removeDefault() {
        return this._def.innerType;
    }
}
ZodDefault.create = (type, params) => {
    return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams(params),
    });
};
class ZodCatch extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        // newCtx is used to not collect issues from inner types in ctx
        const newCtx = {
            ...ctx,
            common: {
                ...ctx.common,
                issues: [],
            },
        };
        const result = this._def.innerType._parse({
            data: newCtx.data,
            path: newCtx.path,
            parent: {
                ...newCtx,
            },
        });
        if ((0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.isAsync)(result)) {
            return result.then((result) => {
                return {
                    status: "valid",
                    value: result.status === "valid"
                        ? result.value
                        : this._def.catchValue({
                            get error() {
                                return new _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodError(newCtx.common.issues);
                            },
                            input: newCtx.data,
                        }),
                };
            });
        }
        else {
            return {
                status: "valid",
                value: result.status === "valid"
                    ? result.value
                    : this._def.catchValue({
                        get error() {
                            return new _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodError(newCtx.common.issues);
                        },
                        input: newCtx.data,
                    }),
            };
        }
    }
    removeCatch() {
        return this._def.innerType;
    }
}
ZodCatch.create = (type, params) => {
    return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params),
    });
};
class ZodNaN extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.nan) {
            const ctx = this._getOrReturnCtx(input);
            (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.addIssueToContext)(ctx, {
                code: _ZodError_js__WEBPACK_IMPORTED_MODULE_0__.ZodIssueCode.invalid_type,
                expected: _helpers_util_js__WEBPACK_IMPORTED_MODULE_4__.ZodParsedType.nan,
                received: ctx.parsedType,
            });
            return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
        }
        return { status: "valid", value: input.data };
    }
}
ZodNaN.create = (params) => {
    return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params),
    });
};
const BRAND = Symbol("zod_brand");
class ZodBranded extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    unwrap() {
        return this._def.type;
    }
}
class ZodPipeline extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
            const handleAsync = async () => {
                const inResult = await this._def.in._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inResult.status === "aborted")
                    return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
                if (inResult.status === "dirty") {
                    status.dirty();
                    return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.DIRTY)(inResult.value);
                }
                else {
                    return this._def.out._parseAsync({
                        data: inResult.value,
                        path: ctx.path,
                        parent: ctx,
                    });
                }
            };
            return handleAsync();
        }
        else {
            const inResult = this._def.in._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
            if (inResult.status === "aborted")
                return _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;
            if (inResult.status === "dirty") {
                status.dirty();
                return {
                    status: "dirty",
                    value: inResult.value,
                };
            }
            else {
                return this._def.out._parseSync({
                    data: inResult.value,
                    path: ctx.path,
                    parent: ctx,
                });
            }
        }
    }
    static create(a, b) {
        return new ZodPipeline({
            in: a,
            out: b,
            typeName: ZodFirstPartyTypeKind.ZodPipeline,
        });
    }
}
class ZodReadonly extends ZodType {
    _parse(input) {
        const result = this._def.innerType._parse(input);
        const freeze = (data) => {
            if ((0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.isValid)(data)) {
                data.value = Object.freeze(data.value);
            }
            return data;
        };
        return (0,_helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.isAsync)(result) ? result.then((data) => freeze(data)) : freeze(result);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodReadonly.create = (type, params) => {
    return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params),
    });
};
////////////////////////////////////////
////////////////////////////////////////
//////////                    //////////
//////////      z.custom      //////////
//////////                    //////////
////////////////////////////////////////
////////////////////////////////////////
function cleanParams(params, data) {
    const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
    const p2 = typeof p === "string" ? { message: p } : p;
    return p2;
}
function custom(check, _params = {}, 
/**
 * @deprecated
 *
 * Pass `fatal` into the params object instead:
 *
 * ```ts
 * z.string().custom((val) => val.length > 5, { fatal: false })
 * ```
 *
 */
fatal) {
    if (check)
        return ZodAny.create().superRefine((data, ctx) => {
            const r = check(data);
            if (r instanceof Promise) {
                return r.then((r) => {
                    if (!r) {
                        const params = cleanParams(_params, data);
                        const _fatal = params.fatal ?? fatal ?? true;
                        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
                    }
                });
            }
            if (!r) {
                const params = cleanParams(_params, data);
                const _fatal = params.fatal ?? fatal ?? true;
                ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
            }
            return;
        });
    return ZodAny.create();
}

const late = {
    object: ZodObject.lazycreate,
};
var ZodFirstPartyTypeKind;
(function (ZodFirstPartyTypeKind) {
    ZodFirstPartyTypeKind["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind["ZodSymbol"] = "ZodSymbol";
    ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind["ZodCatch"] = "ZodCatch";
    ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
    ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
    ZodFirstPartyTypeKind["ZodPipeline"] = "ZodPipeline";
    ZodFirstPartyTypeKind["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
// requires TS 4.4+
class Class {
    constructor(..._) { }
}
const instanceOfType = (
// const instanceOfType = <T extends new (...args: any[]) => any>(
cls, params = {
    message: `Input not instance of ${cls.name}`,
}) => custom((data) => data instanceof cls, params);
const stringType = ZodString.create;
const numberType = ZodNumber.create;
const nanType = ZodNaN.create;
const bigIntType = ZodBigInt.create;
const booleanType = ZodBoolean.create;
const dateType = ZodDate.create;
const symbolType = ZodSymbol.create;
const undefinedType = ZodUndefined.create;
const nullType = ZodNull.create;
const anyType = ZodAny.create;
const unknownType = ZodUnknown.create;
const neverType = ZodNever.create;
const voidType = ZodVoid.create;
const arrayType = ZodArray.create;
const objectType = ZodObject.create;
const strictObjectType = ZodObject.strictCreate;
const unionType = ZodUnion.create;
const discriminatedUnionType = ZodDiscriminatedUnion.create;
const intersectionType = ZodIntersection.create;
const tupleType = ZodTuple.create;
const recordType = ZodRecord.create;
const mapType = ZodMap.create;
const setType = ZodSet.create;
const functionType = ZodFunction.create;
const lazyType = ZodLazy.create;
const literalType = ZodLiteral.create;
const enumType = ZodEnum.create;
const nativeEnumType = ZodNativeEnum.create;
const promiseType = ZodPromise.create;
const effectsType = ZodEffects.create;
const optionalType = ZodOptional.create;
const nullableType = ZodNullable.create;
const preprocessType = ZodEffects.createWithPreprocess;
const pipelineType = ZodPipeline.create;
const ostring = () => stringType().optional();
const onumber = () => numberType().optional();
const oboolean = () => booleanType().optional();
const coerce = {
    string: ((arg) => ZodString.create({ ...arg, coerce: true })),
    number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
    boolean: ((arg) => ZodBoolean.create({
        ...arg,
        coerce: true,
    })),
    bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
    date: ((arg) => ZodDate.create({ ...arg, coerce: true })),
};

const NEVER = _helpers_parseUtil_js__WEBPACK_IMPORTED_MODULE_3__.INVALID;


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/*!***********************!*\
  !*** ./js/service.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var web3_eth_abi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-eth-abi */ "./node_modules/web3-eth-abi/lib/esm/index.js");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./client */ "./js/client.js");
/* harmony import */ var _tx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tx */ "./js/tx.js");





const T = "victory"
let listeningTabs = new Map()

class InternalEvents extends events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {

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
          ws = new _client__WEBPACK_IMPORTED_MODULE_2__.WebSocketClient(web3rpc[selectedChainId])
          ws.connect()
          trySubscribe()
        })


interalEvents.on("SELECT_CHAIN", async e => {
  await updateSelected()
  ws?.disconnect()
  ws = new _client__WEBPACK_IMPORTED_MODULE_2__.WebSocketClient(web3rpc[selectedChainId]);
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

            await (0,_tx__WEBPACK_IMPORTED_MODULE_3__.storeTx)(addr, response.result, receipt.result , header.timestamp, pending[1].dapp)

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
        data: (0,web3_eth_abi__WEBPACK_IMPORTED_MODULE_1__.encodeFunctionCall)(erc20Abi[0], [])
      }, "latest"]
    }
    ,
    {
      id: internalId++,
      method: "eth_call",
      params: [{
        to: tokenAddr,
        data: (0,web3_eth_abi__WEBPACK_IMPORTED_MODULE_1__.encodeFunctionCall)(erc20Abi[1], [])
      }, "latest"]
    }
    ,
    {
      id: internalId++,
      method: "eth_call",
      params: [{
        to: tokenAddr,
        data: (0,web3_eth_abi__WEBPACK_IMPORTED_MODULE_1__.encodeFunctionCall)(erc20Abi[2], [])
      }, "latest"]
    }
  ]
  //name
  const response = await requestWS({
    payload: calls
  })

    console.log("token",response)


  const name = (0,web3_eth_abi__WEBPACK_IMPORTED_MODULE_1__.decodeParameter)('string', response[0].result)
  const symbol = (0,web3_eth_abi__WEBPACK_IMPORTED_MODULE_1__.decodeParameter)('string', response[1].result)
  const decimals = parseInt((0,web3_eth_abi__WEBPACK_IMPORTED_MODULE_1__.decodeParameter)('uint8', response[2].result))

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
      data: (0,web3_eth_abi__WEBPACK_IMPORTED_MODULE_1__.encodeFunctionCall)(reservesAbi, []),
    }, "latest"]
  }]

  const response = await requestWS({ payload: calls })

  console.log("getReserves",response)
  const reserves = (0,web3_eth_abi__WEBPACK_IMPORTED_MODULE_1__.decodeParameters)(['uint112', 'uint112', 'uint32'], response[0].result)
  return (reserves[1] * 10n ** BigInt(factor)) / reserves[0]
}
})();

/******/ })()
;