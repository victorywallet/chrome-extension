/*! For license information please see send.js.LICENSE.txt */
(()=>{"use strict";var e={228:e=>{var t=Object.prototype.hasOwnProperty,i="~";function s(){}function n(e,t,i){this.fn=e,this.context=t,this.once=i||!1}function r(e,t,s,r,o){if("function"!=typeof s)throw new TypeError("The listener must be a function");var a=new n(s,r||e,o),l=i?i+t:t;return e._events[l]?e._events[l].fn?e._events[l]=[e._events[l],a]:e._events[l].push(a):(e._events[l]=a,e._eventsCount++),e}function o(e,t){0===--e._eventsCount?e._events=new s:delete e._events[t]}function a(){this._events=new s,this._eventsCount=0}Object.create&&(s.prototype=Object.create(null),(new s).__proto__||(i=!1)),a.prototype.eventNames=function(){var e,s,n=[];if(0===this._eventsCount)return n;for(s in e=this._events)t.call(e,s)&&n.push(i?s.slice(1):s);return Object.getOwnPropertySymbols?n.concat(Object.getOwnPropertySymbols(e)):n},a.prototype.listeners=function(e){var t=i?i+e:e,s=this._events[t];if(!s)return[];if(s.fn)return[s.fn];for(var n=0,r=s.length,o=new Array(r);n<r;n++)o[n]=s[n].fn;return o},a.prototype.listenerCount=function(e){var t=i?i+e:e,s=this._events[t];return s?s.fn?1:s.length:0},a.prototype.emit=function(e,t,s,n,r,o){var a=i?i+e:e;if(!this._events[a])return!1;var l,c,u=this._events[a],d=arguments.length;if(u.fn){switch(u.once&&this.removeListener(e,u.fn,void 0,!0),d){case 1:return u.fn.call(u.context),!0;case 2:return u.fn.call(u.context,t),!0;case 3:return u.fn.call(u.context,t,s),!0;case 4:return u.fn.call(u.context,t,s,n),!0;case 5:return u.fn.call(u.context,t,s,n,r),!0;case 6:return u.fn.call(u.context,t,s,n,r,o),!0}for(c=1,l=new Array(d-1);c<d;c++)l[c-1]=arguments[c];u.fn.apply(u.context,l)}else{var h,p=u.length;for(c=0;c<p;c++)switch(u[c].once&&this.removeListener(e,u[c].fn,void 0,!0),d){case 1:u[c].fn.call(u[c].context);break;case 2:u[c].fn.call(u[c].context,t);break;case 3:u[c].fn.call(u[c].context,t,s);break;case 4:u[c].fn.call(u[c].context,t,s,n);break;default:if(!l)for(h=1,l=new Array(d-1);h<d;h++)l[h-1]=arguments[h];u[c].fn.apply(u[c].context,l)}}return!0},a.prototype.on=function(e,t,i){return r(this,e,t,i,!1)},a.prototype.once=function(e,t,i){return r(this,e,t,i,!0)},a.prototype.removeListener=function(e,t,s,n){var r=i?i+e:e;if(!this._events[r])return this;if(!t)return o(this,r),this;var a=this._events[r];if(a.fn)a.fn!==t||n&&!a.once||s&&a.context!==s||o(this,r);else{for(var l=0,c=[],u=a.length;l<u;l++)(a[l].fn!==t||n&&!a[l].once||s&&a[l].context!==s)&&c.push(a[l]);c.length?this._events[r]=1===c.length?c[0]:c:o(this,r)}return this},a.prototype.removeAllListeners=function(e){var t;return e?(t=i?i+e:e,this._events[t]&&o(this,t)):(this._events=new s,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=i,a.EventEmitter=a,e.exports=a}},t={};function i(s){var n=t[s];if(void 0!==n)return n.exports;var r=t[s]={exports:{}};return e[s](r,r.exports,i),r.exports}i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var s={};i.r(s),i.d(s,{BRAND:()=>ud,DIRTY:()=>Xc,EMPTY_PATH:()=>Zc,INVALID:()=>Wc,NEVER:()=>sh,OK:()=>Gc,ParseStatus:()=>qc,Schema:()=>nu,ZodAny:()=>Vu,ZodArray:()=>Mu,ZodBigInt:()=>Ou,ZodBoolean:()=>Fu,ZodBranded:()=>dd,ZodCatch:()=>ld,ZodDate:()=>Au,ZodDefault:()=>ad,ZodDiscriminatedUnion:()=>Zu,ZodEffects:()=>nd,ZodEnum:()=>td,ZodError:()=>Lc,ZodFirstPartyTypeKind:()=>vd,ZodFunction:()=>Yu,ZodIntersection:()=>qu,ZodIssueCode:()=>Nc,ZodLazy:()=>Ju,ZodLiteral:()=>Qu,ZodMap:()=>Gu,ZodNaN:()=>cd,ZodNativeEnum:()=>id,ZodNever:()=>Pu,ZodNull:()=>Ru,ZodNullable:()=>od,ZodNumber:()=>Tu,ZodObject:()=>zu,ZodOptional:()=>rd,ZodParsedType:()=>Rc,ZodPipeline:()=>hd,ZodPromise:()=>sd,ZodReadonly:()=>pd,ZodRecord:()=>Xu,ZodSchema:()=>nu,ZodSet:()=>Ku,ZodString:()=>Su,ZodSymbol:()=>Eu,ZodTransformer:()=>nd,ZodTuple:()=>Wu,ZodType:()=>nu,ZodUndefined:()=>Du,ZodUnion:()=>ju,ZodUnknown:()=>Nu,ZodVoid:()=>Lu,addIssueToContext:()=>Uc,any:()=>Td,array:()=>Ed,bigint:()=>kd,boolean:()=>$d,coerce:()=>ih,custom:()=>gd,date:()=>Cd,datetimeRegex:()=>$u,defaultErrorMap:()=>Mc,discriminatedUnion:()=>Nd,effect:()=>Xd,enum:()=>Ud,function:()=>jd,getErrorMap:()=>jc,getParsedType:()=>Vc,instanceof:()=>yd,intersection:()=>Pd,isAborted:()=>Kc,isAsync:()=>Qc,isDirty:()=>Yc,isValid:()=>Jc,late:()=>md,lazy:()=>Hd,literal:()=>Zd,makeIssue:()=>Hc,map:()=>Bd,nan:()=>xd,nativeEnum:()=>qd,never:()=>Fd,null:()=>Id,nullable:()=>Kd,number:()=>wd,object:()=>Dd,objectUtil:()=>Dc,oboolean:()=>th,onumber:()=>eh,optional:()=>Gd,ostring:()=>Qd,pipeline:()=>Jd,preprocess:()=>Yd,promise:()=>Wd,quotelessJson:()=>Pc,record:()=>Md,set:()=>zd,setErrorMap:()=>zc,strictObject:()=>Rd,string:()=>bd,symbol:()=>_d,transformer:()=>Xd,tuple:()=>Ld,undefined:()=>Sd,union:()=>Vd,unknown:()=>Od,util:()=>Ec,void:()=>Ad});var n={};i.r(n),i.d(n,{abiSchemaToJsonSchema:()=>Wh,codePointToInt:()=>Yh,ensureIfUint8Array:()=>rp,ethAbiToJsonSchema:()=>Xh,fetchArrayElement:()=>Gh,hexToNumber:()=>Jh,hexToUint8Array:()=>np,numberToHex:()=>Qh,padLeft:()=>ep,parseBaseType:()=>Uh,transformJsonDataToAbiFormat:()=>Kh,uint8ArrayToHexString:()=>tp});const r=function(){if("undefined"!=typeof globalThis)return globalThis;if("undefined"!=typeof global)return global;if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;try{return new Function("return this")()}catch(e){return{}}}();void 0===r.trustedTypes&&(r.trustedTypes={createPolicy:(e,t)=>t});const o={configurable:!1,enumerable:!1,writable:!1};void 0===r.FAST&&Reflect.defineProperty(r,"FAST",Object.assign({value:Object.create(null)},o));const a=r.FAST;if(void 0===a.getById){const e=Object.create(null);Reflect.defineProperty(a,"getById",Object.assign({value(t,i){let s=e[t];return void 0===s&&(s=i?e[t]=i():null),s}},o))}const l=Object.freeze([]);function c(){const e=new WeakMap;return function(t){let i=e.get(t);if(void 0===i){let s=Reflect.getPrototypeOf(t);for(;void 0===i&&null!==s;)i=e.get(s),s=Reflect.getPrototypeOf(s);i=void 0===i?[]:i.slice(0),e.set(t,i)}return i}}const u=r.FAST.getById(1,(()=>{const e=[],t=[];function i(){if(t.length)throw t.shift()}function s(e){try{e.call()}catch(e){t.push(e),setTimeout(i,0)}}function n(){let t=0;for(;t<e.length;)if(s(e[t]),t++,t>1024){for(let i=0,s=e.length-t;i<s;i++)e[i]=e[i+t];e.length-=t,t=0}e.length=0}return Object.freeze({enqueue:function(t){e.length<1&&r.requestAnimationFrame(n),e.push(t)},process:n})})),d=r.trustedTypes.createPolicy("fast-html",{createHTML:e=>e});let h=d;const p=`fast-${Math.random().toString(36).substring(2,8)}`,f=`${p}{`,g=`}${p}`,m=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(e){if(h!==d)throw new Error("The HTML policy can only be set once.");h=e},createHTML:e=>h.createHTML(e),isMarker:e=>e&&8===e.nodeType&&e.data.startsWith(p),extractDirectiveIndexFromMarker:e=>parseInt(e.data.replace(`${p}:`,"")),createInterpolationPlaceholder:e=>`${f}${e}${g}`,createCustomAttributePlaceholder(e,t){return`${e}="${this.createInterpolationPlaceholder(t)}"`},createBlockPlaceholder:e=>`\x3c!--${p}:${e}--\x3e`,queueUpdate:u.enqueue,processUpdates:u.process,nextUpdate:()=>new Promise(u.enqueue),setAttribute(e,t,i){null==i?e.removeAttribute(t):e.setAttribute(t,i)},setBooleanAttribute(e,t,i){i?e.setAttribute(t,""):e.removeAttribute(t)},removeChildNodes(e){for(let t=e.firstChild;null!==t;t=e.firstChild)e.removeChild(t)},createTemplateWalker:e=>document.createTreeWalker(e,133,null,!1)});class v{constructor(e,t){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=e,this.sub1=t}has(e){return void 0===this.spillover?this.sub1===e||this.sub2===e:-1!==this.spillover.indexOf(e)}subscribe(e){const t=this.spillover;if(void 0===t){if(this.has(e))return;if(void 0===this.sub1)return void(this.sub1=e);if(void 0===this.sub2)return void(this.sub2=e);this.spillover=[this.sub1,this.sub2,e],this.sub1=void 0,this.sub2=void 0}else-1===t.indexOf(e)&&t.push(e)}unsubscribe(e){const t=this.spillover;if(void 0===t)this.sub1===e?this.sub1=void 0:this.sub2===e&&(this.sub2=void 0);else{const i=t.indexOf(e);-1!==i&&t.splice(i,1)}}notify(e){const t=this.spillover,i=this.source;if(void 0===t){const t=this.sub1,s=this.sub2;void 0!==t&&t.handleChange(i,e),void 0!==s&&s.handleChange(i,e)}else for(let s=0,n=t.length;s<n;++s)t[s].handleChange(i,e)}}class y{constructor(e){this.subscribers={},this.sourceSubscribers=null,this.source=e}notify(e){var t;const i=this.subscribers[e];void 0!==i&&i.notify(e),null===(t=this.sourceSubscribers)||void 0===t||t.notify(e)}subscribe(e,t){var i;if(t){let i=this.subscribers[t];void 0===i&&(this.subscribers[t]=i=new v(this.source)),i.subscribe(e)}else this.sourceSubscribers=null!==(i=this.sourceSubscribers)&&void 0!==i?i:new v(this.source),this.sourceSubscribers.subscribe(e)}unsubscribe(e,t){var i;if(t){const i=this.subscribers[t];void 0!==i&&i.unsubscribe(e)}else null===(i=this.sourceSubscribers)||void 0===i||i.unsubscribe(e)}}const b=a.getById(2,(()=>{const e=/(:|&&|\|\||if)/,t=new WeakMap,i=m.queueUpdate;let s,n=e=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function r(e){let i=e.$fastController||t.get(e);return void 0===i&&(Array.isArray(e)?i=n(e):t.set(e,i=new y(e))),i}const o=c();class a{constructor(e){this.name=e,this.field=`_${e}`,this.callback=`${e}Changed`}getValue(e){return void 0!==s&&s.watch(e,this.name),e[this.field]}setValue(e,t){const i=this.field,s=e[i];if(s!==t){e[i]=t;const n=e[this.callback];"function"==typeof n&&n.call(e,s,t),r(e).notify(this.name)}}}class l extends v{constructor(e,t,i=!1){super(e,t),this.binding=e,this.isVolatileBinding=i,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(e,t){this.needsRefresh&&null!==this.last&&this.disconnect();const i=s;s=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const n=this.binding(e,t);return s=i,n}disconnect(){if(null!==this.last){let e=this.first;for(;void 0!==e;)e.notifier.unsubscribe(this,e.propertyName),e=e.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(e,t){const i=this.last,n=r(e),o=null===i?this.first:{};if(o.propertySource=e,o.propertyName=t,o.notifier=n,n.subscribe(this,t),null!==i){if(!this.needsRefresh){let t;s=void 0,t=i.propertySource[i.propertyName],s=this,e===t&&(this.needsRefresh=!0)}i.next=o}this.last=o}handleChange(){this.needsQueue&&(this.needsQueue=!1,i(this))}call(){null!==this.last&&(this.needsQueue=!0,this.notify(this))}records(){let e=this.first;return{next:()=>{const t=e;return void 0===t?{value:void 0,done:!0}:(e=e.next,{value:t,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(e){n=e},getNotifier:r,track(e,t){void 0!==s&&s.watch(e,t)},trackVolatile(){void 0!==s&&(s.needsRefresh=!0)},notify(e,t){r(e).notify(t)},defineProperty(e,t){"string"==typeof t&&(t=new a(t)),o(e).push(t),Reflect.defineProperty(e,t.name,{enumerable:!0,get:function(){return t.getValue(this)},set:function(e){t.setValue(this,e)}})},getAccessors:o,binding(e,t,i=this.isVolatileBinding(e)){return new l(e,t,i)},isVolatileBinding:t=>e.test(t.toString())})}));function w(e,t){b.defineProperty(e,t)}const x=a.getById(3,(()=>{let e=null;return{get:()=>e,set(t){e=t}}}));class k{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return x.get()}get isEven(){return this.index%2==0}get isOdd(){return this.index%2!=0}get isFirst(){return 0===this.index}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(e){x.set(e)}}b.defineProperty(k.prototype,"index"),b.defineProperty(k.prototype,"length");const $=Object.seal(new k);class C{constructor(){this.targets=new WeakSet}addStylesTo(e){this.targets.add(e)}removeStylesFrom(e){this.targets.delete(e)}isAttachedTo(e){return this.targets.has(e)}withBehaviors(...e){return this.behaviors=null===this.behaviors?e:this.behaviors.concat(e),this}}function _(e){return e.map((e=>e instanceof C?_(e.styles):[e])).reduce(((e,t)=>e.concat(t)),[])}function S(e){return e.map((e=>e instanceof C?e.behaviors:null)).reduce(((e,t)=>null===t?e:(null===e&&(e=[]),e.concat(t))),null)}C.create=(()=>{if(m.supportsAdoptedStyleSheets){const e=new Map;return t=>new A(t,e)}return e=>new D(e)})();const I=Symbol("prependToAdoptedStyleSheets");function T(e){const t=[],i=[];return e.forEach((e=>(e[I]?t:i).push(e))),{prepend:t,append:i}}let O=(e,t)=>{const{prepend:i,append:s}=T(t);e.adoptedStyleSheets=[...i,...e.adoptedStyleSheets,...s]},F=(e,t)=>{e.adoptedStyleSheets=e.adoptedStyleSheets.filter((e=>-1===t.indexOf(e)))};if(m.supportsAdoptedStyleSheets)try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),O=(e,t)=>{const{prepend:i,append:s}=T(t);e.adoptedStyleSheets.splice(0,0,...i),e.adoptedStyleSheets.push(...s)},F=(e,t)=>{for(const i of t){const t=e.adoptedStyleSheets.indexOf(i);-1!==t&&e.adoptedStyleSheets.splice(t,1)}}}catch(e){}class A extends C{constructor(e,t){super(),this.styles=e,this.styleSheetCache=t,this._styleSheets=void 0,this.behaviors=S(e)}get styleSheets(){if(void 0===this._styleSheets){const e=this.styles,t=this.styleSheetCache;this._styleSheets=_(e).map((e=>{if(e instanceof CSSStyleSheet)return e;let i=t.get(e);return void 0===i&&(i=new CSSStyleSheet,i.replaceSync(e),t.set(e,i)),i}))}return this._styleSheets}addStylesTo(e){O(e,this.styleSheets),super.addStylesTo(e)}removeStylesFrom(e){F(e,this.styleSheets),super.removeStylesFrom(e)}}let E=0;class D extends C{constructor(e){super(),this.styles=e,this.behaviors=null,this.behaviors=S(e),this.styleSheets=_(e),this.styleClass="fast-style-class-"+ ++E}addStylesTo(e){const t=this.styleSheets,i=this.styleClass;e=this.normalizeTarget(e);for(let s=0;s<t.length;s++){const n=document.createElement("style");n.innerHTML=t[s],n.className=i,e.append(n)}super.addStylesTo(e)}removeStylesFrom(e){const t=(e=this.normalizeTarget(e)).querySelectorAll(`.${this.styleClass}`);for(let i=0,s=t.length;i<s;++i)e.removeChild(t[i]);super.removeStylesFrom(e)}isAttachedTo(e){return super.isAttachedTo(this.normalizeTarget(e))}normalizeTarget(e){return e===document?document.body:e}}const R=Object.freeze({locate:c()}),V={toView:e=>e?"true":"false",fromView:e=>null!=e&&"false"!==e&&!1!==e&&0!==e},N={toView(e){if(null==e)return null;const t=1*e;return isNaN(t)?null:t.toString()},fromView(e){if(null==e)return null;const t=1*e;return isNaN(t)?null:t}};class P{constructor(e,t,i=t.toLowerCase(),s="reflect",n){this.guards=new Set,this.Owner=e,this.name=t,this.attribute=i,this.mode=s,this.converter=n,this.fieldName=`_${t}`,this.callbackName=`${t}Changed`,this.hasCallback=this.callbackName in e.prototype,"boolean"===s&&void 0===n&&(this.converter=V)}setValue(e,t){const i=e[this.fieldName],s=this.converter;void 0!==s&&(t=s.fromView(t)),i!==t&&(e[this.fieldName]=t,this.tryReflectToAttribute(e),this.hasCallback&&e[this.callbackName](i,t),e.$fastController.notify(this.name))}getValue(e){return b.track(e,this.name),e[this.fieldName]}onAttributeChangedCallback(e,t){this.guards.has(e)||(this.guards.add(e),this.setValue(e,t),this.guards.delete(e))}tryReflectToAttribute(e){const t=this.mode,i=this.guards;i.has(e)||"fromView"===t||m.queueUpdate((()=>{i.add(e);const s=e[this.fieldName];switch(t){case"reflect":const t=this.converter;m.setAttribute(e,this.attribute,void 0!==t?t.toView(s):s);break;case"boolean":m.setBooleanAttribute(e,this.attribute,s)}i.delete(e)}))}static collect(e,...t){const i=[];t.push(R.locate(e));for(let s=0,n=t.length;s<n;++s){const n=t[s];if(void 0!==n)for(let t=0,s=n.length;t<s;++t){const s=n[t];"string"==typeof s?i.push(new P(e,s)):i.push(new P(e,s.property,s.attribute,s.mode,s.converter))}}return i}}function L(e,t){let i;function s(e,t){arguments.length>1&&(i.property=t),R.locate(e.constructor).push(i)}return arguments.length>1?(i={},void s(e,t)):(i=void 0===e?{}:e,s)}const M={mode:"open"},B={},z=a.getById(4,(()=>{const e=new Map;return Object.freeze({register:t=>!e.has(t.type)&&(e.set(t.type,t),!0),getByType:t=>e.get(t)})}));class j{constructor(e,t=e.definition){"string"==typeof t&&(t={name:t}),this.type=e,this.name=t.name,this.template=t.template;const i=P.collect(e,t.attributes),s=new Array(i.length),n={},r={};for(let e=0,t=i.length;e<t;++e){const t=i[e];s[e]=t.attribute,n[t.name]=t,r[t.attribute]=t}this.attributes=i,this.observedAttributes=s,this.propertyLookup=n,this.attributeLookup=r,this.shadowOptions=void 0===t.shadowOptions?M:null===t.shadowOptions?void 0:Object.assign(Object.assign({},M),t.shadowOptions),this.elementOptions=void 0===t.elementOptions?B:Object.assign(Object.assign({},B),t.elementOptions),this.styles=void 0===t.styles?void 0:Array.isArray(t.styles)?C.create(t.styles):t.styles instanceof C?t.styles:C.create([t.styles])}get isDefined(){return!!z.getByType(this.type)}define(e=customElements){const t=this.type;if(z.register(this)){const e=this.attributes,i=t.prototype;for(let t=0,s=e.length;t<s;++t)b.defineProperty(i,e[t]);Reflect.defineProperty(t,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return e.get(this.name)||e.define(this.name,t,this.elementOptions),this}}function H(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o}j.forType=z.getByType;const Z=new WeakMap,U={bubbles:!0,composed:!0,cancelable:!0};function q(e){return e.shadowRoot||Z.get(e)||null}class W extends y{constructor(e,t){super(e),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=e,this.definition=t;const i=t.shadowOptions;if(void 0!==i){const t=e.attachShadow(i);"closed"===i.mode&&Z.set(e,t)}const s=b.getAccessors(e);if(s.length>0){const t=this.boundObservables=Object.create(null);for(let i=0,n=s.length;i<n;++i){const n=s[i].name,r=e[n];void 0!==r&&(delete e[n],t[n]=r)}}}get isConnected(){return b.track(this,"isConnected"),this._isConnected}setIsConnected(e){this._isConnected=e,b.notify(this,"isConnected")}get template(){return this._template}set template(e){this._template!==e&&(this._template=e,this.needsInitialization||this.renderTemplate(e))}get styles(){return this._styles}set styles(e){this._styles!==e&&(null!==this._styles&&this.removeStyles(this._styles),this._styles=e,this.needsInitialization||null===e||this.addStyles(e))}addStyles(e){const t=q(this.element)||this.element.getRootNode();if(e instanceof HTMLStyleElement)t.append(e);else if(!e.isAttachedTo(t)){const i=e.behaviors;e.addStylesTo(t),null!==i&&this.addBehaviors(i)}}removeStyles(e){const t=q(this.element)||this.element.getRootNode();if(e instanceof HTMLStyleElement)t.removeChild(e);else if(e.isAttachedTo(t)){const i=e.behaviors;e.removeStylesFrom(t),null!==i&&this.removeBehaviors(i)}}addBehaviors(e){const t=this.behaviors||(this.behaviors=new Map),i=e.length,s=[];for(let n=0;n<i;++n){const i=e[n];t.has(i)?t.set(i,t.get(i)+1):(t.set(i,1),s.push(i))}if(this._isConnected){const e=this.element;for(let t=0;t<s.length;++t)s[t].bind(e,$)}}removeBehaviors(e,t=!1){const i=this.behaviors;if(null===i)return;const s=e.length,n=[];for(let r=0;r<s;++r){const s=e[r];if(i.has(s)){const e=i.get(s)-1;0===e||t?i.delete(s)&&n.push(s):i.set(s,e)}}if(this._isConnected){const e=this.element;for(let t=0;t<n.length;++t)n[t].unbind(e)}}onConnectedCallback(){if(this._isConnected)return;const e=this.element;this.needsInitialization?this.finishInitialization():null!==this.view&&this.view.bind(e,$);const t=this.behaviors;if(null!==t)for(const[i]of t)i.bind(e,$);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const e=this.view;null!==e&&e.unbind();const t=this.behaviors;if(null!==t){const e=this.element;for(const[i]of t)i.unbind(e)}}onAttributeChangedCallback(e,t,i){const s=this.definition.attributeLookup[e];void 0!==s&&s.onAttributeChangedCallback(this.element,i)}emit(e,t,i){return!!this._isConnected&&this.element.dispatchEvent(new CustomEvent(e,Object.assign(Object.assign({detail:t},U),i)))}finishInitialization(){const e=this.element,t=this.boundObservables;if(null!==t){const i=Object.keys(t);for(let s=0,n=i.length;s<n;++s){const n=i[s];e[n]=t[n]}this.boundObservables=null}const i=this.definition;null===this._template&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():i.template&&(this._template=i.template||null)),null!==this._template&&this.renderTemplate(this._template),null===this._styles&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():i.styles&&(this._styles=i.styles||null)),null!==this._styles&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(e){const t=this.element,i=q(t)||t;null!==this.view?(this.view.dispose(),this.view=null):this.needsInitialization||m.removeChildNodes(i),e&&(this.view=e.render(t,i,t))}static forCustomElement(e){const t=e.$fastController;if(void 0!==t)return t;const i=j.forType(e.constructor);if(void 0===i)throw new Error("Missing FASTElement definition.");return e.$fastController=new W(e,i)}}function X(e){return class extends e{constructor(){super(),W.forCustomElement(this)}$emit(e,t,i){return this.$fastController.emit(e,t,i)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(e,t,i){this.$fastController.onAttributeChangedCallback(e,t,i)}}}const G=Object.assign(X(HTMLElement),{from:e=>X(e),define:(e,t)=>new j(e,t).define().type}),K=new Map;"metadata"in Reflect||(Reflect.metadata=function(e,t){return function(i){Reflect.defineMetadata(e,t,i)}},Reflect.defineMetadata=function(e,t,i){let s=K.get(i);void 0===s&&K.set(i,s=new Map),s.set(e,t)},Reflect.getOwnMetadata=function(e,t){const i=K.get(t);if(void 0!==i)return i.get(e)});class Y{constructor(e,t){this.container=e,this.key=t}instance(e){return this.registerResolver(0,e)}singleton(e){return this.registerResolver(1,e)}transient(e){return this.registerResolver(2,e)}callback(e){return this.registerResolver(3,e)}cachedCallback(e){return this.registerResolver(3,ke(e))}aliasTo(e){return this.registerResolver(5,e)}registerResolver(e,t){const{container:i,key:s}=this;return this.container=this.key=void 0,i.registerResolver(s,new ue(s,e,t))}}function J(e){const t=e.slice(),i=Object.keys(e),s=i.length;let n;for(let r=0;r<s;++r)n=i[r],Fe(n)||(t[n]=e[n]);return t}const Q=Object.freeze({none(e){throw Error(`${e.toString()} not registered, did you forget to add @singleton()?`)},singleton:e=>new ue(e,1,e),transient:e=>new ue(e,2,e)}),ee=Object.freeze({default:Object.freeze({parentLocator:()=>null,responsibleForOwnerRequests:!1,defaultResolver:Q.singleton})}),te=new Map;function ie(e){return t=>Reflect.getOwnMetadata(e,t)}let se=null;const ne=Object.freeze({createContainer:e=>new we(null,Object.assign({},ee.default,e)),findResponsibleContainer(e){const t=e.$$container$$;return t&&t.responsibleForOwnerRequests?t:ne.findParentContainer(e)},findParentContainer(e){const t=new CustomEvent(ye,{bubbles:!0,composed:!0,cancelable:!0,detail:{container:void 0}});return e.dispatchEvent(t),t.detail.container||ne.getOrCreateDOMContainer()},getOrCreateDOMContainer:(e,t)=>e?e.$$container$$||new we(e,Object.assign({},ee.default,t,{parentLocator:ne.findParentContainer})):se||(se=new we(null,Object.assign({},ee.default,t,{parentLocator:()=>null}))),getDesignParamtypes:ie("design:paramtypes"),getAnnotationParamtypes:ie("di:paramtypes"),getOrCreateAnnotationParamTypes(e){let t=this.getAnnotationParamtypes(e);return void 0===t&&Reflect.defineMetadata("di:paramtypes",t=[],e),t},getDependencies(e){let t=te.get(e);if(void 0===t){const i=e.inject;if(void 0===i){const i=ne.getDesignParamtypes(e),s=ne.getAnnotationParamtypes(e);if(void 0===i)if(void 0===s){const i=Object.getPrototypeOf(e);t="function"==typeof i&&i!==Function.prototype?J(ne.getDependencies(i)):[]}else t=J(s);else if(void 0===s)t=J(i);else{t=J(i);let e,n=s.length;for(let i=0;i<n;++i)e=s[i],void 0!==e&&(t[i]=e);const r=Object.keys(s);let o;n=r.length;for(let e=0;e<n;++e)o=r[e],Fe(o)||(t[o]=s[o])}}else t=J(i);te.set(e,t)}return t},defineProperty(e,t,i,s=!1){const n=`$di_${t}`;Reflect.defineProperty(e,t,{get:function(){let e=this[n];if(void 0===e){const r=this instanceof HTMLElement?ne.findResponsibleContainer(this):ne.getOrCreateDOMContainer();if(e=r.get(i),this[n]=e,s&&this instanceof G){const s=this.$fastController,r=()=>{ne.findResponsibleContainer(this).get(i)!==this[n]&&(this[n]=e,s.notify(t))};s.subscribe({handleChange:r},"isConnected")}}return e}})},createInterface(e,t){const i="function"==typeof e?e:t,s="string"==typeof e?e:e&&"friendlyName"in e&&e.friendlyName||Se,n="string"!=typeof e&&(e&&"respectConnection"in e&&e.respectConnection||!1),r=function(e,t,i){if(null==e||void 0!==new.target)throw new Error(`No registration for interface: '${r.friendlyName}'`);t?ne.defineProperty(e,t,r,n):ne.getOrCreateAnnotationParamTypes(e)[i]=r};return r.$isInterface=!0,r.friendlyName=null==s?"(anonymous)":s,null!=i&&(r.register=function(e,t){return i(new Y(e,null!=t?t:r))}),r.toString=function(){return`InterfaceSymbol<${r.friendlyName}>`},r},inject:(...e)=>function(t,i,s){if("number"==typeof s){const i=ne.getOrCreateAnnotationParamTypes(t),n=e[0];void 0!==n&&(i[s]=n)}else if(i)ne.defineProperty(t,i,e[0]);else{const i=s?ne.getOrCreateAnnotationParamTypes(s.value):ne.getOrCreateAnnotationParamTypes(t);let n;for(let t=0;t<e.length;++t)n=e[t],void 0!==n&&(i[t]=n)}},transient:e=>(e.register=function(t){return $e.transient(e,e).register(t)},e.registerInRequestor=!1,e),singleton:(e,t=ae)=>(e.register=function(t){return $e.singleton(e,e).register(t)},e.registerInRequestor=t.scoped,e)}),re=ne.createInterface("Container");function oe(e){return function(t){const i=function(e,t,s){ne.inject(i)(e,t,s)};return i.$isResolver=!0,i.resolve=function(i,s){return e(t,i,s)},i}}ne.inject;const ae={scoped:!1};function le(e,t,i){ne.inject(le)(e,t,i)}function ce(e,t){return t.getFactory(e).construct(t)}oe(((e,t,i)=>()=>i.get(e))),oe(((e,t,i)=>i.has(e,!0)?i.get(e):void 0)),le.$isResolver=!0,le.resolve=()=>{},oe(((e,t,i)=>{const s=ce(e,t),n=new ue(e,0,s);return i.registerResolver(e,n),s})),oe(((e,t,i)=>ce(e,t)));class ue{constructor(e,t,i){this.key=e,this.strategy=t,this.state=i,this.resolving=!1}get $isResolver(){return!0}register(e){return e.registerResolver(this.key,this)}resolve(e,t){switch(this.strategy){case 0:return this.state;case 1:if(this.resolving)throw new Error(`Cyclic dependency found: ${this.state.name}`);return this.resolving=!0,this.state=e.getFactory(this.state).construct(t),this.strategy=0,this.resolving=!1,this.state;case 2:{const i=e.getFactory(this.state);if(null===i)throw new Error(`Resolver for ${String(this.key)} returned a null factory`);return i.construct(t)}case 3:return this.state(e,t,this);case 4:return this.state[0].resolve(e,t);case 5:return t.get(this.state);default:throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`)}}getFactory(e){var t,i,s;switch(this.strategy){case 1:case 2:return e.getFactory(this.state);case 5:return null!==(s=null===(i=null===(t=e.getResolver(this.state))||void 0===t?void 0:t.getFactory)||void 0===i?void 0:i.call(t,e))&&void 0!==s?s:null;default:return null}}}function de(e){return this.get(e)}function he(e,t){return t(e)}class pe{constructor(e,t){this.Type=e,this.dependencies=t,this.transformers=null}construct(e,t){let i;return i=void 0===t?new this.Type(...this.dependencies.map(de,e)):new this.Type(...this.dependencies.map(de,e),...t),null==this.transformers?i:this.transformers.reduce(he,i)}registerTransformer(e){(this.transformers||(this.transformers=[])).push(e)}}const fe={$isResolver:!0,resolve:(e,t)=>t};function ge(e){return"function"==typeof e.register}function me(e){return function(e){return ge(e)&&"boolean"==typeof e.registerInRequestor}(e)&&e.registerInRequestor}const ve=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]),ye="__DI_LOCATE_PARENT__",be=new Map;class we{constructor(e,t){this.owner=e,this.config=t,this._parent=void 0,this.registerDepth=0,this.context=null,null!==e&&(e.$$container$$=this),this.resolvers=new Map,this.resolvers.set(re,fe),e instanceof Node&&e.addEventListener(ye,(e=>{e.composedPath()[0]!==this.owner&&(e.detail.container=this,e.stopImmediatePropagation())}))}get parent(){return void 0===this._parent&&(this._parent=this.config.parentLocator(this.owner)),this._parent}get depth(){return null===this.parent?0:this.parent.depth+1}get responsibleForOwnerRequests(){return this.config.responsibleForOwnerRequests}registerWithContext(e,...t){return this.context=e,this.register(...t),this.context=null,this}register(...e){if(100===++this.registerDepth)throw new Error("Unable to autoregister dependency");let t,i,s,n,r;const o=this.context;for(let a=0,l=e.length;a<l;++a)if(t=e[a],Ie(t))if(ge(t))t.register(this,o);else if(void 0!==t.prototype)$e.singleton(t,t).register(this);else for(i=Object.keys(t),n=0,r=i.length;n<r;++n)s=t[i[n]],Ie(s)&&(ge(s)?s.register(this,o):this.register(s));return--this.registerDepth,this}registerResolver(e,t){Ce(e);const i=this.resolvers,s=i.get(e);return null==s?i.set(e,t):s instanceof ue&&4===s.strategy?s.state.push(t):i.set(e,new ue(e,4,[s,t])),t}registerTransformer(e,t){const i=this.getResolver(e);if(null==i)return!1;if(i.getFactory){const e=i.getFactory(this);return null!=e&&(e.registerTransformer(t),!0)}return!1}getResolver(e,t=!0){if(Ce(e),void 0!==e.resolve)return e;let i,s=this;for(;null!=s;){if(i=s.resolvers.get(e),null!=i)return i;if(null==s.parent){const i=me(e)?this:s;return t?this.jitRegister(e,i):null}s=s.parent}return null}has(e,t=!1){return!!this.resolvers.has(e)||!(!t||null==this.parent)&&this.parent.has(e,!0)}get(e){if(Ce(e),e.$isResolver)return e.resolve(this,this);let t,i=this;for(;null!=i;){if(t=i.resolvers.get(e),null!=t)return t.resolve(i,this);if(null==i.parent){const s=me(e)?this:i;return t=this.jitRegister(e,s),t.resolve(i,this)}i=i.parent}throw new Error(`Unable to resolve key: ${String(e)}`)}getAll(e,t=!1){Ce(e);const i=this;let s,n=i;if(t){let t=l;for(;null!=n;)s=n.resolvers.get(e),null!=s&&(t=t.concat(_e(s,n,i))),n=n.parent;return t}for(;null!=n;){if(s=n.resolvers.get(e),null!=s)return _e(s,n,i);if(n=n.parent,null==n)return l}return l}getFactory(e){let t=be.get(e);if(void 0===t){if(Te(e))throw new Error(`${e.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);be.set(e,t=new pe(e,ne.getDependencies(e)))}return t}registerFactory(e,t){be.set(e,t)}createChild(e){return new we(null,Object.assign({},this.config,e,{parentLocator:()=>this}))}jitRegister(e,t){if("function"!=typeof e)throw new Error(`Attempted to jitRegister something that is not a constructor: '${e}'. Did you forget to register this dependency?`);if(ve.has(e.name))throw new Error(`Attempted to jitRegister an intrinsic type: ${e.name}. Did you forget to add @inject(Key)`);if(ge(e)){const i=e.register(t);if(!(i instanceof Object)||null==i.resolve){const i=t.resolvers.get(e);if(null!=i)return i;throw new Error("A valid resolver was not returned from the static register method")}return i}if(e.$isInterface)throw new Error(`Attempted to jitRegister an interface: ${e.friendlyName}`);{const i=this.config.defaultResolver(e,t);return t.resolvers.set(e,i),i}}}const xe=new WeakMap;function ke(e){return function(t,i,s){if(xe.has(s))return xe.get(s);const n=e(t,i,s);return xe.set(s,n),n}}const $e=Object.freeze({instance:(e,t)=>new ue(e,0,t),singleton:(e,t)=>new ue(e,1,t),transient:(e,t)=>new ue(e,2,t),callback:(e,t)=>new ue(e,3,t),cachedCallback:(e,t)=>new ue(e,3,ke(t)),aliasTo:(e,t)=>new ue(t,5,e)});function Ce(e){if(null==e)throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?")}function _e(e,t,i){if(e instanceof ue&&4===e.strategy){const s=e.state;let n=s.length;const r=new Array(n);for(;n--;)r[n]=s[n].resolve(t,i);return r}return[e.resolve(t,i)]}const Se="(anonymous)";function Ie(e){return"object"==typeof e&&null!==e||"function"==typeof e}const Te=function(){const e=new WeakMap;let t=!1,i="",s=0;return function(n){return t=e.get(n),void 0===t&&(i=n.toString(),s=i.length,t=s>=29&&s<=100&&125===i.charCodeAt(s-1)&&i.charCodeAt(s-2)<=32&&93===i.charCodeAt(s-3)&&101===i.charCodeAt(s-4)&&100===i.charCodeAt(s-5)&&111===i.charCodeAt(s-6)&&99===i.charCodeAt(s-7)&&32===i.charCodeAt(s-8)&&101===i.charCodeAt(s-9)&&118===i.charCodeAt(s-10)&&105===i.charCodeAt(s-11)&&116===i.charCodeAt(s-12)&&97===i.charCodeAt(s-13)&&110===i.charCodeAt(s-14)&&88===i.charCodeAt(s-15),e.set(n,t)),t}}(),Oe={};function Fe(e){switch(typeof e){case"number":return e>=0&&(0|e)===e;case"string":{const t=Oe[e];if(void 0!==t)return t;const i=e.length;if(0===i)return Oe[e]=!1;let s=0;for(let t=0;t<i;++t)if(s=e.charCodeAt(t),0===t&&48===s&&i>1||s<48||s>57)return Oe[e]=!1;return Oe[e]=!0}default:return!1}}function Ae(e){return`${e.toLowerCase()}:presentation`}const Ee=new Map,De=Object.freeze({define(e,t,i){const s=Ae(e);void 0===Ee.get(s)?Ee.set(s,t):Ee.set(s,!1),i.register($e.instance(s,t))},forTag(e,t){const i=Ae(e),s=Ee.get(i);return!1===s?ne.findResponsibleContainer(t).get(i):s||null}});class Re{constructor(e,t){this.template=e||null,this.styles=void 0===t?null:Array.isArray(t)?C.create(t):t instanceof C?t:C.create([t])}applyTo(e){const t=e.$fastController;null===t.template&&(t.template=this.template),null===t.styles&&(t.styles=this.styles)}}class Ve extends G{constructor(){super(...arguments),this._presentation=void 0}get $presentation(){return void 0===this._presentation&&(this._presentation=De.forTag(this.tagName,this)),this._presentation}templateChanged(){void 0!==this.template&&(this.$fastController.template=this.template)}stylesChanged(){void 0!==this.styles&&(this.$fastController.styles=this.styles)}connectedCallback(){null!==this.$presentation&&this.$presentation.applyTo(this),super.connectedCallback()}static compose(e){return(t={})=>new Pe(this===Ve?class extends Ve{}:this,e,t)}}function Ne(e,t,i){return"function"==typeof e?e(t,i):e}H([w],Ve.prototype,"template",void 0),H([w],Ve.prototype,"styles",void 0);class Pe{constructor(e,t,i){this.type=e,this.elementDefinition=t,this.overrideDefinition=i,this.definition=Object.assign(Object.assign({},this.elementDefinition),this.overrideDefinition)}register(e,t){const i=this.definition,s=this.overrideDefinition,n=`${i.prefix||t.elementPrefix}-${i.baseName}`;t.tryDefineElement({name:n,type:this.type,baseClass:this.elementDefinition.baseClass,callback:e=>{const t=new Re(Ne(i.template,e,i),Ne(i.styles,e,i));e.definePresentation(t);let n=Ne(i.shadowOptions,e,i);e.shadowRootMode&&(n?s.shadowOptions||(n.mode=e.shadowRootMode):null!==n&&(n={mode:e.shadowRootMode})),e.defineElement({elementOptions:Ne(i.elementOptions,e,i),shadowOptions:n,attributes:Ne(i.attributes,e,i)})}})}}class Le{createCSS(){return""}createBehavior(){}}function Me(e){const t=e.parentElement;if(t)return t;{const t=e.getRootNode();if(t.host instanceof HTMLElement)return t.host}return null}const Be=document.createElement("div");class ze{setProperty(e,t){m.queueUpdate((()=>this.target.setProperty(e,t)))}removeProperty(e){m.queueUpdate((()=>this.target.removeProperty(e)))}}class je extends ze{constructor(){super();const e=new CSSStyleSheet;this.target=e.cssRules[e.insertRule(":root{}")].style,document.adoptedStyleSheets=[...document.adoptedStyleSheets,e]}}class He extends ze{constructor(){super(),this.style=document.createElement("style"),document.head.appendChild(this.style);const{sheet:e}=this.style;if(e){const t=e.insertRule(":root{}",e.cssRules.length);this.target=e.cssRules[t].style}}}class Ze{constructor(e){this.store=new Map,this.target=null;const t=e.$fastController;this.style=document.createElement("style"),t.addStyles(this.style),b.getNotifier(t).subscribe(this,"isConnected"),this.handleChange(t,"isConnected")}targetChanged(){if(null!==this.target)for(const[e,t]of this.store.entries())this.target.setProperty(e,t)}setProperty(e,t){this.store.set(e,t),m.queueUpdate((()=>{null!==this.target&&this.target.setProperty(e,t)}))}removeProperty(e){this.store.delete(e),m.queueUpdate((()=>{null!==this.target&&this.target.removeProperty(e)}))}handleChange(e,t){const{sheet:i}=this.style;if(i){const e=i.insertRule(":host{}",i.cssRules.length);this.target=i.cssRules[e].style}else this.target=null}}H([w],Ze.prototype,"target",void 0);class Ue{constructor(e){this.target=e.style}setProperty(e,t){m.queueUpdate((()=>this.target.setProperty(e,t)))}removeProperty(e){m.queueUpdate((()=>this.target.removeProperty(e)))}}class qe{setProperty(e,t){qe.properties[e]=t;for(const i of qe.roots.values())Ge.getOrCreate(qe.normalizeRoot(i)).setProperty(e,t)}removeProperty(e){delete qe.properties[e];for(const t of qe.roots.values())Ge.getOrCreate(qe.normalizeRoot(t)).removeProperty(e)}static registerRoot(e){const{roots:t}=qe;if(!t.has(e)){t.add(e);const i=Ge.getOrCreate(this.normalizeRoot(e));for(const e in qe.properties)i.setProperty(e,qe.properties[e])}}static unregisterRoot(e){const{roots:t}=qe;if(t.has(e)){t.delete(e);const i=Ge.getOrCreate(qe.normalizeRoot(e));for(const e in qe.properties)i.removeProperty(e)}}static normalizeRoot(e){return e===Be?document:e}}qe.roots=new Set,qe.properties={};const We=new WeakMap,Xe=m.supportsAdoptedStyleSheets?class extends ze{constructor(e){super();const t=new CSSStyleSheet;t[I]=!0,this.target=t.cssRules[t.insertRule(":host{}")].style,e.$fastController.addStyles(C.create([t]))}}:Ze,Ge=Object.freeze({getOrCreate(e){if(We.has(e))return We.get(e);let t;return t=e===Be?new qe:e instanceof Document?m.supportsAdoptedStyleSheets?new je:new He:e instanceof G?new Xe(e):new Ue(e),We.set(e,t),t}});class Ke extends Le{constructor(e){super(),this.subscribers=new WeakMap,this._appliedTo=new Set,this.name=e.name,null!==e.cssCustomPropertyName&&(this.cssCustomProperty=`--${e.cssCustomPropertyName}`,this.cssVar=`var(${this.cssCustomProperty})`),this.id=Ke.uniqueId(),Ke.tokensById.set(this.id,this)}get appliedTo(){return[...this._appliedTo]}static from(e){return new Ke({name:"string"==typeof e?e:e.name,cssCustomPropertyName:"string"==typeof e?e:void 0===e.cssCustomPropertyName?e.name:e.cssCustomPropertyName})}static isCSSDesignToken(e){return"string"==typeof e.cssCustomProperty}static isDerivedDesignTokenValue(e){return"function"==typeof e}static getTokenById(e){return Ke.tokensById.get(e)}getOrCreateSubscriberSet(e=this){return this.subscribers.get(e)||this.subscribers.set(e,new Set)&&this.subscribers.get(e)}createCSS(){return this.cssVar||""}getValueFor(e){const t=tt.getOrCreate(e).get(this);if(void 0!==t)return t;throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${e} or an ancestor of ${e}.`)}setValueFor(e,t){return this._appliedTo.add(e),t instanceof Ke&&(t=this.alias(t)),tt.getOrCreate(e).set(this,t),this}deleteValueFor(e){return this._appliedTo.delete(e),tt.existsFor(e)&&tt.getOrCreate(e).delete(this),this}withDefault(e){return this.setValueFor(Be,e),this}subscribe(e,t){const i=this.getOrCreateSubscriberSet(t);t&&!tt.existsFor(t)&&tt.getOrCreate(t),i.has(e)||i.add(e)}unsubscribe(e,t){const i=this.subscribers.get(t||this);i&&i.has(e)&&i.delete(e)}notify(e){const t=Object.freeze({token:this,target:e});this.subscribers.has(this)&&this.subscribers.get(this).forEach((e=>e.handleChange(t))),this.subscribers.has(e)&&this.subscribers.get(e).forEach((e=>e.handleChange(t)))}alias(e){return t=>e.getValueFor(t)}}Ke.uniqueId=(()=>{let e=0;return()=>(e++,e.toString(16))})(),Ke.tokensById=new Map;class Ye{constructor(e,t,i){this.source=e,this.token=t,this.node=i,this.dependencies=new Set,this.observer=b.binding(e,this,!1),this.observer.handleChange=this.observer.call,this.handleChange()}disconnect(){this.observer.disconnect()}handleChange(){try{this.node.store.set(this.token,this.observer.observe(this.node.target,$))}catch(e){console.error(e)}}}class Je{constructor(){this.values=new Map}set(e,t){this.values.get(e)!==t&&(this.values.set(e,t),b.getNotifier(this).notify(e.id))}get(e){return b.track(this,e.id),this.values.get(e)}delete(e){this.values.delete(e),b.getNotifier(this).notify(e.id)}all(){return this.values.entries()}}const Qe=new WeakMap,et=new WeakMap;class tt{constructor(e){this.target=e,this.store=new Je,this.children=[],this.assignedValues=new Map,this.reflecting=new Set,this.bindingObservers=new Map,this.tokenValueChangeHandler={handleChange:(e,t)=>{const i=Ke.getTokenById(t);i&&(i.notify(this.target),this.updateCSSTokenReflection(e,i))}},Qe.set(e,this),b.getNotifier(this.store).subscribe(this.tokenValueChangeHandler),e instanceof G?e.$fastController.addBehaviors([this]):e.isConnected&&this.bind()}static getOrCreate(e){return Qe.get(e)||new tt(e)}static existsFor(e){return Qe.has(e)}static findParent(e){if(Be!==e.target){let t=Me(e.target);for(;null!==t;){if(Qe.has(t))return Qe.get(t);t=Me(t)}return tt.getOrCreate(Be)}return null}static findClosestAssignedNode(e,t){let i=t;do{if(i.has(e))return i;i=i.parent?i.parent:i.target!==Be?tt.getOrCreate(Be):null}while(null!==i);return null}get parent(){return et.get(this)||null}updateCSSTokenReflection(e,t){if(Ke.isCSSDesignToken(t)){const i=this.parent,s=this.isReflecting(t);if(i){const n=i.get(t),r=e.get(t);n===r||s?n===r&&s&&this.stopReflectToCSS(t):this.reflectToCSS(t)}else s||this.reflectToCSS(t)}}has(e){return this.assignedValues.has(e)}get(e){const t=this.store.get(e);if(void 0!==t)return t;const i=this.getRaw(e);return void 0!==i?(this.hydrate(e,i),this.get(e)):void 0}getRaw(e){var t;return this.assignedValues.has(e)?this.assignedValues.get(e):null===(t=tt.findClosestAssignedNode(e,this))||void 0===t?void 0:t.getRaw(e)}set(e,t){Ke.isDerivedDesignTokenValue(this.assignedValues.get(e))&&this.tearDownBindingObserver(e),this.assignedValues.set(e,t),Ke.isDerivedDesignTokenValue(t)?this.setupBindingObserver(e,t):this.store.set(e,t)}delete(e){this.assignedValues.delete(e),this.tearDownBindingObserver(e);const t=this.getRaw(e);t?this.hydrate(e,t):this.store.delete(e)}bind(){const e=tt.findParent(this);e&&e.appendChild(this);for(const e of this.assignedValues.keys())e.notify(this.target)}unbind(){this.parent&&et.get(this).removeChild(this);for(const e of this.bindingObservers.keys())this.tearDownBindingObserver(e)}appendChild(e){e.parent&&et.get(e).removeChild(e);const t=this.children.filter((t=>e.contains(t)));et.set(e,this),this.children.push(e),t.forEach((t=>e.appendChild(t))),b.getNotifier(this.store).subscribe(e);for(const[t,i]of this.store.all())e.hydrate(t,this.bindingObservers.has(t)?this.getRaw(t):i),e.updateCSSTokenReflection(e.store,t)}removeChild(e){const t=this.children.indexOf(e);if(-1!==t&&this.children.splice(t,1),b.getNotifier(this.store).unsubscribe(e),e.parent!==this)return!1;const i=et.delete(e);for(const[t]of this.store.all())e.hydrate(t,e.getRaw(t)),e.updateCSSTokenReflection(e.store,t);return i}contains(e){return function(e,t){let i=t;for(;null!==i;){if(i===e)return!0;i=Me(i)}return!1}(this.target,e.target)}reflectToCSS(e){this.isReflecting(e)||(this.reflecting.add(e),tt.cssCustomPropertyReflector.startReflection(e,this.target))}stopReflectToCSS(e){this.isReflecting(e)&&(this.reflecting.delete(e),tt.cssCustomPropertyReflector.stopReflection(e,this.target))}isReflecting(e){return this.reflecting.has(e)}handleChange(e,t){const i=Ke.getTokenById(t);i&&(this.hydrate(i,this.getRaw(i)),this.updateCSSTokenReflection(this.store,i))}hydrate(e,t){if(!this.has(e)){const i=this.bindingObservers.get(e);Ke.isDerivedDesignTokenValue(t)?i?i.source!==t&&(this.tearDownBindingObserver(e),this.setupBindingObserver(e,t)):this.setupBindingObserver(e,t):(i&&this.tearDownBindingObserver(e),this.store.set(e,t))}}setupBindingObserver(e,t){const i=new Ye(t,e,this);return this.bindingObservers.set(e,i),i}tearDownBindingObserver(e){return!!this.bindingObservers.has(e)&&(this.bindingObservers.get(e).disconnect(),this.bindingObservers.delete(e),!0)}}tt.cssCustomPropertyReflector=new class{startReflection(e,t){e.subscribe(this,t),this.handleChange({token:e,target:t})}stopReflection(e,t){e.unsubscribe(this,t),this.remove(e,t)}handleChange(e){const{token:t,target:i}=e;this.add(t,i)}add(e,t){Ge.getOrCreate(t).setProperty(e.cssCustomProperty,this.resolveCSSValue(tt.getOrCreate(t).get(e)))}remove(e,t){Ge.getOrCreate(t).removeProperty(e.cssCustomProperty)}resolveCSSValue(e){return e&&"function"==typeof e.createCSS?e.createCSS():e}},H([w],tt.prototype,"children",void 0);const it=Object.freeze({create:function(e){return Ke.from(e)},notifyConnection:e=>!(!e.isConnected||!tt.existsFor(e)||(tt.getOrCreate(e).bind(),0)),notifyDisconnection:e=>!(e.isConnected||!tt.existsFor(e)||(tt.getOrCreate(e).unbind(),0)),registerRoot(e=Be){qe.registerRoot(e)},unregisterRoot(e=Be){qe.unregisterRoot(e)}}),st=Object.freeze({definitionCallbackOnly:null,ignoreDuplicate:Symbol()}),nt=new Map,rt=new Map;let ot=null;const at=ne.createInterface((e=>e.cachedCallback((e=>(null===ot&&(ot=new ct(null,e)),ot))))),lt=Object.freeze({tagFor:e=>rt.get(e),responsibleFor(e){const t=e.$$designSystem$$;return t||ne.findResponsibleContainer(e).get(at)},getOrCreate(e){if(!e)return null===ot&&(ot=ne.getOrCreateDOMContainer().get(at)),ot;const t=e.$$designSystem$$;if(t)return t;const i=ne.getOrCreateDOMContainer(e);if(i.has(at,!1))return i.get(at);{const t=new ct(e,i);return i.register($e.instance(at,t)),t}}});class ct{constructor(e,t){this.owner=e,this.container=t,this.designTokensInitialized=!1,this.prefix="fast",this.shadowRootMode=void 0,this.disambiguate=()=>st.definitionCallbackOnly,null!==e&&(e.$$designSystem$$=this)}withPrefix(e){return this.prefix=e,this}withShadowRootMode(e){return this.shadowRootMode=e,this}withElementDisambiguation(e){return this.disambiguate=e,this}withDesignTokenRoot(e){return this.designTokenRoot=e,this}register(...e){const t=this.container,i=[],s=this.disambiguate,n=this.shadowRootMode,r={elementPrefix:this.prefix,tryDefineElement(e,r,o){const a=function(e,t,i){return"string"==typeof e?{name:e,type:t,callback:i}:e}(e,r,o),{name:l,callback:c,baseClass:u}=a;let{type:d}=a,h=l,p=nt.get(h),f=!0;for(;p;){const e=s(h,d,p);switch(e){case st.ignoreDuplicate:return;case st.definitionCallbackOnly:f=!1,p=void 0;break;default:h=e,p=nt.get(h)}}f&&((rt.has(d)||d===Ve)&&(d=class extends d{}),nt.set(h,d),rt.set(d,h),u&&rt.set(u,h)),i.push(new ut(t,h,d,n,c,f))}};this.designTokensInitialized||(this.designTokensInitialized=!0,null!==this.designTokenRoot&&it.registerRoot(this.designTokenRoot)),t.registerWithContext(r,...e);for(const e of i)e.callback(e),e.willDefine&&null!==e.definition&&e.definition.define();return this}}class ut{constructor(e,t,i,s,n,r){this.container=e,this.name=t,this.type=i,this.shadowRootMode=s,this.callback=n,this.willDefine=r,this.definition=null}definePresentation(e){De.define(this.name,e,this.container)}defineElement(e){this.definition=new j(this.type,Object.assign(Object.assign({},e),{name:this.name}))}tagFor(e){return lt.tagFor(e)}}function dt(...e){return e.every((e=>e instanceof HTMLElement))}let ht;var pt;!function(e){e[e.alt=18]="alt",e[e.arrowDown=40]="arrowDown",e[e.arrowLeft=37]="arrowLeft",e[e.arrowRight=39]="arrowRight",e[e.arrowUp=38]="arrowUp",e[e.back=8]="back",e[e.backSlash=220]="backSlash",e[e.break=19]="break",e[e.capsLock=20]="capsLock",e[e.closeBracket=221]="closeBracket",e[e.colon=186]="colon",e[e.colon2=59]="colon2",e[e.comma=188]="comma",e[e.ctrl=17]="ctrl",e[e.delete=46]="delete",e[e.end=35]="end",e[e.enter=13]="enter",e[e.equals=187]="equals",e[e.equals2=61]="equals2",e[e.equals3=107]="equals3",e[e.escape=27]="escape",e[e.forwardSlash=191]="forwardSlash",e[e.function1=112]="function1",e[e.function10=121]="function10",e[e.function11=122]="function11",e[e.function12=123]="function12",e[e.function2=113]="function2",e[e.function3=114]="function3",e[e.function4=115]="function4",e[e.function5=116]="function5",e[e.function6=117]="function6",e[e.function7=118]="function7",e[e.function8=119]="function8",e[e.function9=120]="function9",e[e.home=36]="home",e[e.insert=45]="insert",e[e.menu=93]="menu",e[e.minus=189]="minus",e[e.minus2=109]="minus2",e[e.numLock=144]="numLock",e[e.numPad0=96]="numPad0",e[e.numPad1=97]="numPad1",e[e.numPad2=98]="numPad2",e[e.numPad3=99]="numPad3",e[e.numPad4=100]="numPad4",e[e.numPad5=101]="numPad5",e[e.numPad6=102]="numPad6",e[e.numPad7=103]="numPad7",e[e.numPad8=104]="numPad8",e[e.numPad9=105]="numPad9",e[e.numPadDivide=111]="numPadDivide",e[e.numPadDot=110]="numPadDot",e[e.numPadMinus=109]="numPadMinus",e[e.numPadMultiply=106]="numPadMultiply",e[e.numPadPlus=107]="numPadPlus",e[e.openBracket=219]="openBracket",e[e.pageDown=34]="pageDown",e[e.pageUp=33]="pageUp",e[e.period=190]="period",e[e.print=44]="print",e[e.quote=222]="quote",e[e.scrollLock=145]="scrollLock",e[e.shift=16]="shift",e[e.space=32]="space",e[e.tab=9]="tab",e[e.tilde=192]="tilde",e[e.windowsLeft=91]="windowsLeft",e[e.windowsOpera=219]="windowsOpera",e[e.windowsRight=92]="windowsRight"}(pt||(pt={}));const ft="ArrowDown",gt="ArrowUp",mt="Enter",vt="Escape",yt="Home",bt="End",wt=" ",xt="Tab",kt="menuitem",$t="menuitemcheckbox",Ct="menuitemradio",_t={[kt]:"menuitem",[$t]:"menuitemcheckbox",[Ct]:"menuitemradio"};var St;!function(e){e.ltr="ltr",e.rtl="rtl"}(St||(St={}));class It{constructor(){this.targetIndex=0}}class Tt extends It{constructor(){super(...arguments),this.createPlaceholder=m.createInterpolationPlaceholder}}class Ot extends It{constructor(e,t,i){super(),this.name=e,this.behavior=t,this.options=i}createPlaceholder(e){return m.createCustomAttributePlaceholder(this.name,e)}createBehavior(e){return new this.behavior(e,this.options)}}function Ft(e,t){this.source=e,this.context=t,null===this.bindingObserver&&(this.bindingObserver=b.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(e,t))}function At(e,t){this.source=e,this.context=t,this.target.addEventListener(this.targetName,this)}function Et(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function Dt(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const e=this.target.$fastView;void 0!==e&&e.isComposed&&(e.unbind(),e.needsBindOnly=!0)}function Rt(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function Vt(e){m.setAttribute(this.target,this.targetName,e)}function Nt(e){m.setBooleanAttribute(this.target,this.targetName,e)}function Pt(e){if(null==e&&(e=""),e.create){this.target.textContent="";let t=this.target.$fastView;void 0===t?t=e.create():this.target.$fastTemplate!==e&&(t.isComposed&&(t.remove(),t.unbind()),t=e.create()),t.isComposed?t.needsBindOnly&&(t.needsBindOnly=!1,t.bind(this.source,this.context)):(t.isComposed=!0,t.bind(this.source,this.context),t.insertBefore(this.target),this.target.$fastView=t,this.target.$fastTemplate=e)}else{const t=this.target.$fastView;void 0!==t&&t.isComposed&&(t.isComposed=!1,t.remove(),t.needsBindOnly?t.needsBindOnly=!1:t.unbind()),this.target.textContent=e}}function Lt(e){this.target[this.targetName]=e}function Mt(e){const t=this.classVersions||Object.create(null),i=this.target;let s=this.version||0;if(null!=e&&e.length){const n=e.split(/\s+/);for(let e=0,r=n.length;e<r;++e){const r=n[e];""!==r&&(t[r]=s,i.classList.add(r))}}if(this.classVersions=t,this.version=s+1,0!==s){s-=1;for(const e in t)t[e]===s&&i.classList.remove(e)}}class Bt extends Tt{constructor(e){super(),this.binding=e,this.bind=Ft,this.unbind=Et,this.updateTarget=Vt,this.isBindingVolatile=b.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(e){if(this.originalTargetName=e,void 0!==e)switch(e[0]){case":":if(this.cleanedTargetName=e.substr(1),this.updateTarget=Lt,"innerHTML"===this.cleanedTargetName){const e=this.binding;this.binding=(t,i)=>m.createHTML(e(t,i))}break;case"?":this.cleanedTargetName=e.substr(1),this.updateTarget=Nt;break;case"@":this.cleanedTargetName=e.substr(1),this.bind=At,this.unbind=Rt;break;default:this.cleanedTargetName=e,"class"===e&&(this.updateTarget=Mt)}}targetAtContent(){this.updateTarget=Pt,this.unbind=Dt}createBehavior(e){return new zt(e,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class zt{constructor(e,t,i,s,n,r,o){this.source=null,this.context=null,this.bindingObserver=null,this.target=e,this.binding=t,this.isBindingVolatile=i,this.bind=s,this.unbind=n,this.updateTarget=r,this.targetName=o}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(e){k.setEvent(e);const t=this.binding(this.source,this.context);k.setEvent(null),!0!==t&&e.preventDefault()}}let jt=null;class Ht{addFactory(e){e.targetIndex=this.targetIndex,this.behaviorFactories.push(e)}captureContentBinding(e){e.targetAtContent(),this.addFactory(e)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){jt=this}static borrow(e){const t=jt||new Ht;return t.directives=e,t.reset(),jt=null,t}}function Zt(e){if(1===e.length)return e[0];let t;const i=e.length,s=e.map((e=>"string"==typeof e?()=>e:(t=e.targetName||t,e.binding))),n=new Bt(((e,t)=>{let n="";for(let r=0;r<i;++r)n+=s[r](e,t);return n}));return n.targetName=t,n}const Ut=g.length;function qt(e,t){const i=t.split(f);if(1===i.length)return null;const s=[];for(let t=0,n=i.length;t<n;++t){const n=i[t],r=n.indexOf(g);let o;if(-1===r)o=n;else{const t=parseInt(n.substring(0,r));s.push(e.directives[t]),o=n.substring(r+Ut)}""!==o&&s.push(o)}return s}function Wt(e,t,i=!1){const s=t.attributes;for(let n=0,r=s.length;n<r;++n){const o=s[n],a=o.value,l=qt(e,a);let c=null;null===l?i&&(c=new Bt((()=>a)),c.targetName=o.name):c=Zt(l),null!==c&&(t.removeAttributeNode(o),n--,r--,e.addFactory(c))}}function Xt(e,t,i){const s=qt(e,t.textContent);if(null!==s){let n=t;for(let r=0,o=s.length;r<o;++r){const o=s[r],a=0===r?t:n.parentNode.insertBefore(document.createTextNode(""),n.nextSibling);"string"==typeof o?a.textContent=o:(a.textContent=" ",e.captureContentBinding(o)),n=a,e.targetIndex++,a!==t&&i.nextNode()}e.targetIndex--}}const Gt=document.createRange();class Kt{constructor(e,t){this.fragment=e,this.behaviors=t,this.source=null,this.context=null,this.firstChild=e.firstChild,this.lastChild=e.lastChild}appendTo(e){e.appendChild(this.fragment)}insertBefore(e){if(this.fragment.hasChildNodes())e.parentNode.insertBefore(this.fragment,e);else{const t=this.lastChild;if(e.previousSibling===t)return;const i=e.parentNode;let s,n=this.firstChild;for(;n!==t;)s=n.nextSibling,i.insertBefore(n,e),n=s;i.insertBefore(t,e)}}remove(){const e=this.fragment,t=this.lastChild;let i,s=this.firstChild;for(;s!==t;)i=s.nextSibling,e.appendChild(s),s=i;e.appendChild(t)}dispose(){const e=this.firstChild.parentNode,t=this.lastChild;let i,s=this.firstChild;for(;s!==t;)i=s.nextSibling,e.removeChild(s),s=i;e.removeChild(t);const n=this.behaviors,r=this.source;for(let e=0,t=n.length;e<t;++e)n[e].unbind(r)}bind(e,t){const i=this.behaviors;if(this.source!==e)if(null!==this.source){const s=this.source;this.source=e,this.context=t;for(let n=0,r=i.length;n<r;++n){const r=i[n];r.unbind(s),r.bind(e,t)}}else{this.source=e,this.context=t;for(let s=0,n=i.length;s<n;++s)i[s].bind(e,t)}}unbind(){if(null===this.source)return;const e=this.behaviors,t=this.source;for(let i=0,s=e.length;i<s;++i)e[i].unbind(t);this.source=null}static disposeContiguousBatch(e){if(0!==e.length){Gt.setStartBefore(e[0].firstChild),Gt.setEndAfter(e[e.length-1].lastChild),Gt.deleteContents();for(let t=0,i=e.length;t<i;++t){const i=e[t],s=i.behaviors,n=i.source;for(let e=0,t=s.length;e<t;++e)s[e].unbind(n)}}}}class Yt{constructor(e,t){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=e,this.directives=t}create(e){if(null===this.fragment){let e;const t=this.html;if("string"==typeof t){e=document.createElement("template"),e.innerHTML=m.createHTML(t);const i=e.content.firstElementChild;null!==i&&"TEMPLATE"===i.tagName&&(e=i)}else e=t;const i=function(e,t){const i=e.content;document.adoptNode(i);const s=Ht.borrow(t);Wt(s,e,!0);const n=s.behaviorFactories;s.reset();const r=m.createTemplateWalker(i);let o;for(;o=r.nextNode();)switch(s.targetIndex++,o.nodeType){case 1:Wt(s,o);break;case 3:Xt(s,o,r);break;case 8:m.isMarker(o)&&s.addFactory(t[m.extractDirectiveIndexFromMarker(o)])}let a=0;(m.isMarker(i.firstChild)||1===i.childNodes.length&&t.length)&&(i.insertBefore(document.createComment(""),i.firstChild),a=-1);const l=s.behaviorFactories;return s.release(),{fragment:i,viewBehaviorFactories:l,hostBehaviorFactories:n,targetOffset:a}}(e,this.directives);this.fragment=i.fragment,this.viewBehaviorFactories=i.viewBehaviorFactories,this.hostBehaviorFactories=i.hostBehaviorFactories,this.targetOffset=i.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const t=this.fragment.cloneNode(!0),i=this.viewBehaviorFactories,s=new Array(this.behaviorCount),n=m.createTemplateWalker(t);let r=0,o=this.targetOffset,a=n.nextNode();for(let e=i.length;r<e;++r){const e=i[r],t=e.targetIndex;for(;null!==a;){if(o===t){s[r]=e.createBehavior(a);break}a=n.nextNode(),o++}}if(this.hasHostBehaviors){const t=this.hostBehaviorFactories;for(let i=0,n=t.length;i<n;++i,++r)s[r]=t[i].createBehavior(e)}return new Kt(t,s)}render(e,t,i){"string"==typeof t&&(t=document.getElementById(t)),void 0===i&&(i=t);const s=this.create(i);return s.bind(e,$),s.appendTo(t),s}}const Jt=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function Qt(e,...t){const i=[];let s="";for(let n=0,r=e.length-1;n<r;++n){const r=e[n];let o=t[n];if(s+=r,o instanceof Yt){const e=o;o=()=>e}if("function"==typeof o&&(o=new Bt(o)),o instanceof Tt){const e=Jt.exec(r);null!==e&&(o.targetName=e[2])}o instanceof It?(s+=o.createPlaceholder(i.length),i.push(o)):s+=o}return s+=e[e.length-1],new Yt(s,i)}class ei{constructor(e,t){this.target=e,this.propertyName=t}bind(e){e[this.propertyName]=this.target}unbind(){}}function ti(e){return new Ot("fast-ref",ei,e)}class ii{handleStartContentChange(){this.startContainer.classList.toggle("start",this.start.assignedNodes().length>0)}handleEndContentChange(){this.endContainer.classList.toggle("end",this.end.assignedNodes().length>0)}}const si=(e,t)=>Qt`
    <span
        part="end"
        ${ti("endContainer")}
        class=${e=>t.end?"end":void 0}
    >
        <slot name="end" ${ti("end")} @slotchange="${e=>e.handleEndContentChange()}">
            ${t.end||""}
        </slot>
    </span>
`,ni=(e,t)=>Qt`
    <span
        part="start"
        ${ti("startContainer")}
        class="${e=>t.start?"start":void 0}"
    >
        <slot
            name="start"
            ${ti("start")}
            @slotchange="${e=>e.handleStartContentChange()}"
        >
            ${t.start||""}
        </slot>
    </span>
`,ri=(Qt`
    <span part="end" ${ti("endContainer")}>
        <slot
            name="end"
            ${ti("end")}
            @slotchange="${e=>e.handleEndContentChange()}"
        ></slot>
    </span>
`,Qt`
    <span part="start" ${ti("startContainer")}>
        <slot
            name="start"
            ${ti("start")}
            @slotchange="${e=>e.handleStartContentChange()}"
        ></slot>
    </span>
`,e=>{const t=e.closest("[dir]");return null!==t&&"rtl"===t.dir?St.rtl:St.ltr});function oi(e,...t){const i=R.locate(e);t.forEach((t=>{Object.getOwnPropertyNames(t.prototype).forEach((i=>{"constructor"!==i&&Object.defineProperty(e.prototype,i,Object.getOwnPropertyDescriptor(t.prototype,i))})),R.locate(t).forEach((e=>i.push(e)))}))}class ai extends Ve{constructor(){super(...arguments),this.role=kt,this.hasSubmenu=!1,this.currentDirection=St.ltr,this.focusSubmenuOnLoad=!1,this.handleMenuItemKeyDown=e=>{if(e.defaultPrevented)return!1;switch(e.key){case mt:case wt:return this.invoke(),!1;case"ArrowRight":return this.expandAndFocus(),!1;case"ArrowLeft":if(this.expanded)return this.expanded=!1,this.focus(),!1}return!0},this.handleMenuItemClick=e=>(e.defaultPrevented||this.disabled||this.invoke(),!1),this.submenuLoaded=()=>{this.focusSubmenuOnLoad&&(this.focusSubmenuOnLoad=!1,this.hasSubmenu&&(this.submenu.focus(),this.setAttribute("tabindex","-1")))},this.handleMouseOver=e=>(this.disabled||!this.hasSubmenu||this.expanded||(this.expanded=!0),!1),this.handleMouseOut=e=>(!this.expanded||this.contains(document.activeElement)||(this.expanded=!1),!1),this.expandAndFocus=()=>{this.hasSubmenu&&(this.focusSubmenuOnLoad=!0,this.expanded=!0)},this.invoke=()=>{if(!this.disabled)switch(this.role){case $t:this.checked=!this.checked;break;case kt:this.updateSubmenu(),this.hasSubmenu?this.expandAndFocus():this.$emit("change");break;case Ct:this.checked||(this.checked=!0)}},this.updateSubmenu=()=>{this.submenu=this.domChildren().find((e=>"menu"===e.getAttribute("role"))),this.hasSubmenu=void 0!==this.submenu}}expandedChanged(e){if(this.$fastController.isConnected){if(void 0===this.submenu)return;!1===this.expanded?this.submenu.collapseExpandedItem():this.currentDirection=ri(this),this.$emit("expanded-change",this,{bubbles:!1})}}checkedChanged(e,t){this.$fastController.isConnected&&this.$emit("change")}connectedCallback(){super.connectedCallback(),m.queueUpdate((()=>{this.updateSubmenu()})),this.startColumnCount||(this.startColumnCount=1),this.observer=new MutationObserver(this.updateSubmenu)}disconnectedCallback(){super.disconnectedCallback(),this.submenu=void 0,void 0!==this.observer&&(this.observer.disconnect(),this.observer=void 0)}domChildren(){return Array.from(this.children).filter((e=>!e.hasAttribute("hidden")))}}H([L({mode:"boolean"})],ai.prototype,"disabled",void 0),H([L({mode:"boolean"})],ai.prototype,"expanded",void 0),H([w],ai.prototype,"startColumnCount",void 0),H([L],ai.prototype,"role",void 0),H([L({mode:"boolean"})],ai.prototype,"checked",void 0),H([w],ai.prototype,"submenuRegion",void 0),H([w],ai.prototype,"hasSubmenu",void 0),H([w],ai.prototype,"currentDirection",void 0),H([w],ai.prototype,"submenu",void 0),oi(ai,ii);class li extends Ve{constructor(){super(...arguments),this.expandedItem=null,this.focusIndex=-1,this.isNestedMenu=()=>null!==this.parentElement&&dt(this.parentElement)&&"menuitem"===this.parentElement.getAttribute("role"),this.handleFocusOut=e=>{if(!this.contains(e.relatedTarget)&&void 0!==this.menuItems){this.collapseExpandedItem();const e=this.menuItems.findIndex(this.isFocusableElement);this.menuItems[this.focusIndex].setAttribute("tabindex","-1"),this.menuItems[e].setAttribute("tabindex","0"),this.focusIndex=e}},this.handleItemFocus=e=>{const t=e.target;void 0!==this.menuItems&&t!==this.menuItems[this.focusIndex]&&(this.menuItems[this.focusIndex].setAttribute("tabindex","-1"),this.focusIndex=this.menuItems.indexOf(t),t.setAttribute("tabindex","0"))},this.handleExpandedChanged=e=>{if(e.defaultPrevented||null===e.target||void 0===this.menuItems||this.menuItems.indexOf(e.target)<0)return;e.preventDefault();const t=e.target;null===this.expandedItem||t!==this.expandedItem||!1!==t.expanded?t.expanded&&(null!==this.expandedItem&&this.expandedItem!==t&&(this.expandedItem.expanded=!1),this.menuItems[this.focusIndex].setAttribute("tabindex","-1"),this.expandedItem=t,this.focusIndex=this.menuItems.indexOf(t),t.setAttribute("tabindex","0")):this.expandedItem=null},this.removeItemListeners=()=>{void 0!==this.menuItems&&this.menuItems.forEach((e=>{e.removeEventListener("expanded-change",this.handleExpandedChanged),e.removeEventListener("focus",this.handleItemFocus)}))},this.setItems=()=>{const e=this.domChildren();this.removeItemListeners(),this.menuItems=e;const t=this.menuItems.filter(this.isMenuItemElement);t.length&&(this.focusIndex=0);const i=t.reduce(((e,t)=>{const i=function(e){const t=e.getAttribute("role"),i=e.querySelector("[slot=start]");return t!==kt&&null===i||t===kt&&null!==i?1:t!==kt&&null!==i?2:0}(t);return e>i?e:i}),0);t.forEach(((e,t)=>{e.setAttribute("tabindex",0===t?"0":"-1"),e.addEventListener("expanded-change",this.handleExpandedChanged),e.addEventListener("focus",this.handleItemFocus),(e instanceof ai||"startColumnCount"in e)&&(e.startColumnCount=i)}))},this.changeHandler=e=>{if(void 0===this.menuItems)return;const t=e.target,i=this.menuItems.indexOf(t);if(-1!==i&&"menuitemradio"===t.role&&!0===t.checked){for(let e=i-1;e>=0;--e){const t=this.menuItems[e],i=t.getAttribute("role");if(i===Ct&&(t.checked=!1),"separator"===i)break}const e=this.menuItems.length-1;for(let t=i+1;t<=e;++t){const e=this.menuItems[t],i=e.getAttribute("role");if(i===Ct&&(e.checked=!1),"separator"===i)break}}},this.isMenuItemElement=e=>dt(e)&&li.focusableElementRoles.hasOwnProperty(e.getAttribute("role")),this.isFocusableElement=e=>this.isMenuItemElement(e)}itemsChanged(e,t){this.$fastController.isConnected&&void 0!==this.menuItems&&this.setItems()}connectedCallback(){super.connectedCallback(),m.queueUpdate((()=>{this.setItems()})),this.addEventListener("change",this.changeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.removeItemListeners(),this.menuItems=void 0,this.removeEventListener("change",this.changeHandler)}focus(){this.setFocus(0,1)}collapseExpandedItem(){null!==this.expandedItem&&(this.expandedItem.expanded=!1,this.expandedItem=null)}handleMenuKeyDown(e){if(!e.defaultPrevented&&void 0!==this.menuItems)switch(e.key){case ft:return void this.setFocus(this.focusIndex+1,1);case gt:return void this.setFocus(this.focusIndex-1,-1);case bt:return void this.setFocus(this.menuItems.length-1,-1);case yt:return void this.setFocus(0,1);default:return!0}}domChildren(){return Array.from(this.children).filter((e=>!e.hasAttribute("hidden")))}setFocus(e,t){if(void 0!==this.menuItems)for(;e>=0&&e<this.menuItems.length;){const i=this.menuItems[e];if(this.isFocusableElement(i)){this.focusIndex>-1&&this.menuItems.length>=this.focusIndex-1&&this.menuItems[this.focusIndex].setAttribute("tabindex","-1"),this.focusIndex=e,i.setAttribute("tabindex","0"),i.focus();break}e+=t}}}li.focusableElementRoles=_t,H([w],li.prototype,"items",void 0);class ci{constructor(e,t){this.target=e,this.options=t,this.source=null}bind(e){const t=this.options.property;this.shouldUpdate=b.getAccessors(e).some((e=>e.name===t)),this.source=e,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(l),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let e=this.getNodes();return void 0!==this.options.filter&&(e=e.filter(this.options.filter)),e}updateTarget(e){this.source[this.options.property]=e}}class ui extends ci{constructor(e,t){super(e,t)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function di(e){return"string"==typeof e&&(e={property:e}),new Ot("fast-slotted",ui,e)}function hi(e,t,i){return isNaN(e)||e<=t?t:e>=i?i:e}function pi(e,t,i){return isNaN(e)||e<=t?0:e>=i?1:e/(i-t)}function fi(e,t,i){return isNaN(e)?t:t+e*(i-t)}function gi(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:t+e*(i-t)}function mi(e,t){const i=Math.pow(10,t);return Math.round(e*i)/i}Math.PI;class vi{constructor(e,t,i){this.h=e,this.s=t,this.l=i}static fromObject(e){return!e||isNaN(e.h)||isNaN(e.s)||isNaN(e.l)?null:new vi(e.h,e.s,e.l)}equalValue(e){return this.h===e.h&&this.s===e.s&&this.l===e.l}roundToPrecision(e){return new vi(mi(this.h,e),mi(this.s,e),mi(this.l,e))}toObject(){return{h:this.h,s:this.s,l:this.l}}}class yi{constructor(e,t,i){this.l=e,this.a=t,this.b=i}static fromObject(e){return!e||isNaN(e.l)||isNaN(e.a)||isNaN(e.b)?null:new yi(e.l,e.a,e.b)}equalValue(e){return this.l===e.l&&this.a===e.a&&this.b===e.b}roundToPrecision(e){return new yi(mi(this.l,e),mi(this.a,e),mi(this.b,e))}toObject(){return{l:this.l,a:this.a,b:this.b}}}yi.epsilon=216/24389,yi.kappa=24389/27;class bi{constructor(e,t,i,s){this.r=e,this.g=t,this.b=i,this.a="number"!=typeof s||isNaN(s)?1:s}static fromObject(e){return!e||isNaN(e.r)||isNaN(e.g)||isNaN(e.b)?null:new bi(e.r,e.g,e.b,e.a)}equalValue(e){return this.r===e.r&&this.g===e.g&&this.b===e.b&&this.a===e.a}toStringHexRGB(){return"#"+[this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringHexRGBA(){return this.toStringHexRGB()+this.formatHexValue(this.a)}toStringHexARGB(){return"#"+[this.a,this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringWebRGB(){return`rgb(${Math.round(fi(this.r,0,255))},${Math.round(fi(this.g,0,255))},${Math.round(fi(this.b,0,255))})`}toStringWebRGBA(){return`rgba(${Math.round(fi(this.r,0,255))},${Math.round(fi(this.g,0,255))},${Math.round(fi(this.b,0,255))},${hi(this.a,0,1)})`}roundToPrecision(e){return new bi(mi(this.r,e),mi(this.g,e),mi(this.b,e),mi(this.a,e))}clamp(){return new bi(hi(this.r,0,1),hi(this.g,0,1),hi(this.b,0,1),hi(this.a,0,1))}toObject(){return{r:this.r,g:this.g,b:this.b,a:this.a}}formatHexValue(e){return function(e){const t=Math.round(hi(e,0,255)).toString(16);return 1===t.length?"0"+t:t}(fi(e,0,255))}}class wi{constructor(e,t,i){this.x=e,this.y=t,this.z=i}static fromObject(e){return!e||isNaN(e.x)||isNaN(e.y)||isNaN(e.z)?null:new wi(e.x,e.y,e.z)}equalValue(e){return this.x===e.x&&this.y===e.y&&this.z===e.z}roundToPrecision(e){return new wi(mi(this.x,e),mi(this.y,e),mi(this.z,e))}toObject(){return{x:this.x,y:this.y,z:this.z}}}function xi(e){function t(e){return e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4)}return function(e){return.2126*e.r+.7152*e.g+.0722*e.b}(new bi(t(e.r),t(e.g),t(e.b),1))}function ki(e,t,i){return i-t===0?0:(e-t)/(i-t)}function $i(e,t,i){return(ki(e.r,t.r,i.r)+ki(e.g,t.g,i.g)+ki(e.b,t.b,i.b))/3}function Ci(e){const t=Math.max(e.r,e.g,e.b),i=Math.min(e.r,e.g,e.b),s=t-i;let n=0;0!==s&&(n=t===e.r?(e.g-e.b)/s%6*60:t===e.g?60*((e.b-e.r)/s+2):60*((e.r-e.g)/s+4)),n<0&&(n+=360);const r=(t+i)/2;let o=0;return 0!==s&&(o=s/(1-Math.abs(2*r-1))),new vi(n,o,r)}function _i(e,t=1){return function(e,t=1){function i(e){return e<=.0031308?12.92*e:1.055*Math.pow(e,1/2.4)-.055}const s=i(3.2404542*e.x-1.5371385*e.y-.4985314*e.z),n=i(-.969266*e.x+1.8760108*e.y+.041556*e.z),r=i(.0556434*e.x-.2040259*e.y+1.0572252*e.z);return new bi(s,n,r,t)}(function(e){const t=(e.l+16)/116,i=t+e.a/500,s=t-e.b/200,n=Math.pow(i,3),r=Math.pow(t,3),o=Math.pow(s,3);let a=0;a=n>yi.epsilon?n:(116*i-16)/yi.kappa;let l=0;l=e.l>yi.epsilon*yi.kappa?r:e.l/yi.kappa;let c=0;return c=o>yi.epsilon?o:(116*s-16)/yi.kappa,a=wi.whitePoint.x*a,l=wi.whitePoint.y*l,c=wi.whitePoint.z*c,new wi(a,l,c)}(e),t)}function Si(e,t,i){return isNaN(e)||e<=0?t:e>=1?i:new bi(gi(e,t.r,i.r),gi(e,t.g,i.g),gi(e,t.b,i.b),gi(e,t.a,i.a))}var Ii;function Ti(e,t){const i=e.relativeLuminance>t.relativeLuminance?e:t,s=e.relativeLuminance>t.relativeLuminance?t:e;return(i.relativeLuminance+.05)/(s.relativeLuminance+.05)}wi.whitePoint=new wi(.95047,1,1.08883),function(e){e[e.RGB=0]="RGB",e[e.HSL=1]="HSL",e[e.HSV=2]="HSV",e[e.XYZ=3]="XYZ",e[e.LAB=4]="LAB",e[e.LCH=5]="LCH"}(Ii||(Ii={}));const Oi=Object.freeze({create:(e,t,i)=>new Fi(e,t,i),from:e=>new Fi(e.r,e.g,e.b)});class Fi extends bi{constructor(e,t,i){super(e,t,i,1),this.toColorString=this.toStringHexRGB,this.contrast=Ti.bind(null,this),this.createCSS=this.toColorString,this.relativeLuminance=xi(this)}static fromObject(e){return new Fi(e.r,e.g,e.b)}}function Ai(e,t,i=0,s=e.length-1){if(s===i)return e[i];const n=Math.floor((s-i)/2)+i;return t(e[n])?Ai(e,t,i,n):Ai(e,t,n+1,s)}const Ei=(-.1+Math.sqrt(.21))/2;function Di(e){return e.relativeLuminance<=Ei}function Ri(e){return Di(e)?-1:1}const Vi={stepContrast:1.03,stepContrastRamp:.03,preserveSource:!1},Ni=Object.freeze({create:function(e,t,i){return"number"==typeof e?Ni.from(Oi.create(e,t,i)):Ni.from(e)},from:function(e,t){return function(e){const t={r:0,g:0,b:0,toColorString:()=>"",contrast:()=>0,relativeLuminance:0};for(const i in t)if(typeof t[i]!=typeof e[i])return!1;return!0}(e)?Pi.from(e,t):Pi.from(Oi.create(e.r,e.g,e.b),t)}});class Pi{constructor(e,t){this.closestIndexCache=new Map,this.source=e,this.swatches=t,this.reversedSwatches=Object.freeze([...this.swatches].reverse()),this.lastIndex=this.swatches.length-1}colorContrast(e,t,i,s){void 0===i&&(i=this.closestIndexOf(e));let n=this.swatches;const r=this.lastIndex;let o=i;return void 0===s&&(s=Ri(e)),-1===s&&(n=this.reversedSwatches,o=r-o),Ai(n,(i=>Ti(e,i)>=t),o,r)}get(e){return this.swatches[e]||this.swatches[hi(e,0,this.lastIndex)]}closestIndexOf(e){if(this.closestIndexCache.has(e.relativeLuminance))return this.closestIndexCache.get(e.relativeLuminance);let t=this.swatches.indexOf(e);if(-1!==t)return this.closestIndexCache.set(e.relativeLuminance,t),t;const i=this.swatches.reduce(((t,i)=>Math.abs(i.relativeLuminance-e.relativeLuminance)<Math.abs(t.relativeLuminance-e.relativeLuminance)?i:t));return t=this.swatches.indexOf(i),this.closestIndexCache.set(e.relativeLuminance,t),t}static saturationBump(e,t){const i=Ci(e).s,s=Ci(t);return s.s<i?function(e,t=1){const i=(1-Math.abs(2*e.l-1))*e.s,s=i*(1-Math.abs(e.h/60%2-1)),n=e.l-i/2;let r=0,o=0,a=0;return e.h<60?(r=i,o=s,a=0):e.h<120?(r=s,o=i,a=0):e.h<180?(r=0,o=i,a=s):e.h<240?(r=0,o=s,a=i):e.h<300?(r=s,o=0,a=i):e.h<360&&(r=i,o=0,a=s),new bi(r+n,o+n,a+n,t)}(new vi(s.h,i,s.l)):t}static ramp(e){const t=e/100;return t>.5?(t-.5)/.5:2*t}static createHighResolutionPalette(e){const t=[],i=function(e){function t(e){return e>yi.epsilon?Math.pow(e,1/3):(yi.kappa*e+16)/116}const i=t(e.x/wi.whitePoint.x),s=t(e.y/wi.whitePoint.y),n=t(e.z/wi.whitePoint.z);return new yi(116*s-16,500*(i-s),200*(s-n))}(function(e){function t(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}const i=t(e.r),s=t(e.g),n=t(e.b);return new wi(.4124564*i+.3575761*s+.1804375*n,.2126729*i+.7151522*s+.072175*n,.0193339*i+.119192*s+.9503041*n)}(bi.fromObject(e).roundToPrecision(4))),s=_i(new yi(0,i.a,i.b)).clamp().roundToPrecision(4),n=_i(new yi(50,i.a,i.b)).clamp().roundToPrecision(4),r=_i(new yi(100,i.a,i.b)).clamp().roundToPrecision(4),o=new bi(0,0,0),a=new bi(1,1,1),l=r.equalValue(a)?0:14,c=s.equalValue(o)?0:14;for(let e=100+l;e>=0-c;e-=.5){let i;i=e<0?Si(e/c+1,o,s):e<=50?Si(Pi.ramp(e),s,n):e<=100?Si(Pi.ramp(e),n,r):Si((e-100)/l,r,a),i=Pi.saturationBump(n,i).roundToPrecision(4),t.push(Oi.from(i))}return new Pi(e,t)}static adjustEnd(e,t,i,s){const n=-1===s?t.swatches:t.reversedSwatches,r=e=>{const i=t.closestIndexOf(e);return 1===s?t.lastIndex-i:i};1===s&&i.reverse();const o=e(i[i.length-2]);if(mi(Ti(i[i.length-1],i[i.length-2]),2)<o){i.pop();const e=r(t.colorContrast(n[t.lastIndex],o,void 0,s))-r(i[i.length-2]);let a=1;for(let s=i.length-e-1;s<i.length;s++){const e=r(i[s]),o=s===i.length-1?t.lastIndex:e+a;i[s]=n[o],a++}}1===s&&i.reverse()}static createColorPaletteByContrast(e,t){const i=Pi.createHighResolutionPalette(e),s=e=>mi(t.stepContrast+t.stepContrast*(1-e.relativeLuminance)*t.stepContrastRamp,2),n=[];let r=t.preserveSource?e:i.swatches[0];n.push(r);do{const e=s(r);r=i.colorContrast(r,e,void 0,1),n.push(r)}while(r.relativeLuminance>0);if(t.preserveSource){r=e;do{const e=s(r);r=i.colorContrast(r,e,void 0,-1),n.unshift(r)}while(r.relativeLuminance<1)}return this.adjustEnd(s,i,n,-1),t.preserveSource&&this.adjustEnd(s,i,n,1),n}static from(e,t){const i=void 0===t?Vi:Object.assign(Object.assign({},Vi),t);return new Pi(e,Object.freeze(Pi.createColorPaletteByContrast(e,i)))}}const Li=/^#((?:[0-9a-f]{6}|[0-9a-f]{3}))$/i;function Mi(e){const t=Li.exec(e);if(null===t)return null;let i=t[1];if(3===i.length){const e=i.charAt(0),t=i.charAt(1),s=i.charAt(2);i=e.concat(e,t,t,s,s)}const s=parseInt(i,16);return isNaN(s)?null:new bi(pi((16711680&s)>>>16,0,255),pi((65280&s)>>>8,0,255),pi(255&s,0,255),1)}const Bi=Oi.create(1,1,1),zi=Oi.create(0,0,0),ji=Oi.create(.5,.5,.5),Hi=Mi("#0078D4"),Zi=Oi.create(Hi.r,Hi.g,Hi.b);function Ui(e,t,i,s,n){const r=e=>e.contrast(Bi)>=n?Bi:zi,o=r(e),a=r(t);return{rest:o,hover:a,active:o.relativeLuminance===a.relativeLuminance?o:r(i),focus:r(s)}}var qi;!function(e){e[e.Burn=0]="Burn",e[e.Color=1]="Color",e[e.Darken=2]="Darken",e[e.Dodge=3]="Dodge",e[e.Lighten=4]="Lighten",e[e.Multiply=5]="Multiply",e[e.Overlay=6]="Overlay",e[e.Screen=7]="Screen"}(qi||(qi={}));class Wi{constructor(e,t,i,s){this.toColorString=()=>this.cssGradient,this.contrast=Ti.bind(null,this),this.createCSS=this.toColorString,this.color=new bi(e,t,i),this.cssGradient=s,this.relativeLuminance=xi(this.color),this.r=e,this.g=t,this.b=i}static fromObject(e,t){return new Wi(e.r,e.g,e.b,t)}}const Xi=new bi(0,0,0),Gi=new bi(1,1,1);function Ki(e,t,i,s,n,r,o,a,l=10,c=!1){const u=e.closestIndexOf(t);function d(i){if(c){const s=e.closestIndexOf(t),n=e.get(s),r=i.relativeLuminance<t.relativeLuminance?Xi:Gi,o=function(e,t,i=null){let s=0,n=i;return null!==n?s=$i(e,t,n):(n=new bi(0,0,0,1),s=$i(e,t,n),s<=0&&(n=new bi(1,1,1,1),s=$i(e,t,n))),s=Math.round(1e3*s)/1e3,new bi(n.r,n.g,n.b,s)}(Mi(i.toColorString()),Mi(n.toColorString()),r).roundToPrecision(2),a=function(e,t){if(t.a>=1)return t;if(t.a<=0)return new bi(e.r,e.g,e.b,1);const i=t.a*t.r+(1-t.a)*e.r,s=t.a*t.g+(1-t.a)*e.g,n=t.a*t.b+(1-t.a)*e.b;return new bi(i,s,n,1)}(Mi(t.toColorString()),o);return Oi.from(a)}return i}void 0===a&&(a=Ri(t));const h=u+a*i,p=h+a*(s-i),f=h+a*(n-i),g=h+a*(r-i),m=-1===a?0:100-l,v=-1===a?l:100;function y(t,i){const s=e.get(t);if(i){const i=e.get(t+a*o),n=-1===a?i:s,r=-1===a?s:i,l=`linear-gradient(${d(n).toColorString()} ${m}%, ${d(r).toColorString()} ${v}%)`;return Wi.fromObject(n,l)}return d(s)}return{rest:y(h,!0),hover:y(p,!0),active:y(f,!1),focus:y(g,!0)}}function Yi(e,t,i,s,n,r,o,a){null==a&&(a=Ri(t));const l=e.closestIndexOf(e.colorContrast(t,i));return{rest:e.get(l+a*s),hover:e.get(l+a*n),active:e.get(l+a*r),focus:e.get(l+a*o)}}function Ji(e,t,i,s,n,r,o){const a=e.closestIndexOf(t);return null==o&&(o=Ri(t)),{rest:e.get(a+o*i),hover:e.get(a+o*s),active:e.get(a+o*n),focus:e.get(a+o*r)}}function Qi(e,t,i,s,n,r,o=void 0,a,l,c,u,d=void 0){return Di(t)?Ji(e,t,a,l,c,u,d):Ji(e,t,i,s,n,r,o)}var es;function ts(e,t){return e.closestIndexOf((i=t,Oi.create(i,i,i)));var i}function is(e,t,i){return e.get(ts(e,t)+-1*i)}!function(e){e[e.LightMode=.98]="LightMode",e[e.DarkMode=.15]="DarkMode"}(es||(es={}));const{create:ss}=it;function ns(e){return it.create({name:e,cssCustomPropertyName:null})}const rs=ss("direction").withDefault(St.ltr),os=ss("disabled-opacity").withDefault(.3),as=ss("base-height-multiplier").withDefault(8),ls=ss("base-horizontal-spacing-multiplier").withDefault(3),cs=ss("density").withDefault(0),us=ss("design-unit").withDefault(4),ds=ss("control-corner-radius").withDefault(4),hs=ss("layer-corner-radius").withDefault(8),ps=ss("stroke-width").withDefault(1),fs=ss("focus-stroke-width").withDefault(2),gs=ss("body-font").withDefault('"Segoe UI Variable", "Segoe UI", sans-serif'),ms=ss("font-weight").withDefault(400);function vs(e){return t=>{const i=e.getValueFor(t),s=ms.getValueFor(t);if(i.endsWith("px")){const e=Number.parseFloat(i.replace("px",""));if(e<=12)return`"wght" ${s}, "opsz" 8`;if(e>24)return`"wght" ${s}, "opsz" 36`}return`"wght" ${s}, "opsz" 10.5`}}const ys=ss("type-ramp-base-font-size").withDefault("14px"),bs=ss("type-ramp-base-line-height").withDefault("20px"),ws=ss("type-ramp-base-font-variations").withDefault(vs(ys)),xs=ss("type-ramp-minus-1-font-size").withDefault("12px"),ks=ss("type-ramp-minus-1-line-height").withDefault("16px"),$s=ss("type-ramp-minus-1-font-variations").withDefault(vs(xs)),Cs=ss("type-ramp-minus-2-font-size").withDefault("10px"),_s=ss("type-ramp-minus-2-line-height").withDefault("14px"),Ss=ss("type-ramp-minus-2-font-variations").withDefault(vs(Cs)),Is=ss("type-ramp-plus-1-font-size").withDefault("16px"),Ts=ss("type-ramp-plus-1-line-height").withDefault("22px"),Os=ss("type-ramp-plus-1-font-variations").withDefault(vs(Is)),Fs=ss("type-ramp-plus-2-font-size").withDefault("20px"),As=ss("type-ramp-plus-2-line-height").withDefault("26px"),Es=ss("type-ramp-plus-2-font-variations").withDefault(vs(Fs)),Ds=ss("type-ramp-plus-3-font-size").withDefault("24px"),Rs=ss("type-ramp-plus-3-line-height").withDefault("32px"),Vs=ss("type-ramp-plus-3-font-variations").withDefault(vs(Ds)),Ns=ss("type-ramp-plus-4-font-size").withDefault("28px"),Ps=ss("type-ramp-plus-4-line-height").withDefault("36px"),Ls=ss("type-ramp-plus-4-font-variations").withDefault(vs(Ns)),Ms=ss("type-ramp-plus-5-font-size").withDefault("32px"),Bs=ss("type-ramp-plus-5-line-height").withDefault("40px"),zs=ss("type-ramp-plus-5-font-variations").withDefault(vs(Ms)),js=ss("type-ramp-plus-6-font-size").withDefault("40px"),Hs=ss("type-ramp-plus-6-line-height").withDefault("52px"),Zs=ss("type-ramp-plus-6-font-variations").withDefault(vs(js)),Us=ss("base-layer-luminance").withDefault(es.LightMode),qs=ns("accent-fill-rest-delta").withDefault(0),Ws=ns("accent-fill-hover-delta").withDefault(-2),Xs=ns("accent-fill-active-delta").withDefault(-5),Gs=ns("accent-fill-focus-delta").withDefault(0),Ks=ns("accent-foreground-rest-delta").withDefault(0),Ys=ns("accent-foreground-hover-delta").withDefault(3),Js=ns("accent-foreground-active-delta").withDefault(-8),Qs=ns("accent-foreground-focus-delta").withDefault(0),en=ns("neutral-fill-rest-delta").withDefault(-1),tn=ns("neutral-fill-hover-delta").withDefault(1),sn=ns("neutral-fill-active-delta").withDefault(0),nn=ns("neutral-fill-focus-delta").withDefault(0),rn=ns("neutral-fill-input-rest-delta").withDefault(-1),on=ns("neutral-fill-input-hover-delta").withDefault(1),an=ns("neutral-fill-input-active-delta").withDefault(0),ln=ns("neutral-fill-input-focus-delta").withDefault(-2),cn=ns("neutral-fill-input-alt-rest-delta").withDefault(2),un=ns("neutral-fill-input-alt-hover-delta").withDefault(4),dn=ns("neutral-fill-input-alt-active-delta").withDefault(6),hn=ns("neutral-fill-input-alt-focus-delta").withDefault(2),pn=ns("neutral-fill-layer-rest-delta").withDefault(-2),fn=ns("neutral-fill-layer-hover-delta").withDefault(-3),gn=ns("neutral-fill-layer-active-delta").withDefault(-3),mn=ns("neutral-fill-layer-alt-rest-delta").withDefault(-1),vn=ns("neutral-fill-secondary-rest-delta").withDefault(3),yn=ns("neutral-fill-secondary-hover-delta").withDefault(2),bn=ns("neutral-fill-secondary-active-delta").withDefault(1),wn=ns("neutral-fill-secondary-focus-delta").withDefault(3),xn=ns("neutral-fill-stealth-rest-delta").withDefault(0),kn=ns("neutral-fill-stealth-hover-delta").withDefault(3),$n=ns("neutral-fill-stealth-active-delta").withDefault(2),Cn=ns("neutral-fill-stealth-focus-delta").withDefault(0),_n=ns("neutral-fill-strong-rest-delta").withDefault(0),Sn=ns("neutral-fill-strong-hover-delta").withDefault(8),In=ns("neutral-fill-strong-active-delta").withDefault(-5),Tn=ns("neutral-fill-strong-focus-delta").withDefault(0),On=ns("neutral-stroke-rest-delta").withDefault(8),Fn=ns("neutral-stroke-hover-delta").withDefault(12),An=ns("neutral-stroke-active-delta").withDefault(6),En=ns("neutral-stroke-focus-delta").withDefault(8),Dn=ns("neutral-stroke-control-rest-delta").withDefault(3),Rn=ns("neutral-stroke-control-hover-delta").withDefault(5),Vn=ns("neutral-stroke-control-active-delta").withDefault(5),Nn=ns("neutral-stroke-control-focus-delta").withDefault(5),Pn=ns("neutral-stroke-divider-rest-delta").withDefault(4),Ln=ns("neutral-stroke-layer-rest-delta").withDefault(3),Mn=ns("neutral-stroke-layer-hover-delta").withDefault(3),Bn=ns("neutral-stroke-layer-active-delta").withDefault(3),zn=ns("neutral-stroke-strong-hover-delta").withDefault(0),jn=ns("neutral-stroke-strong-active-delta").withDefault(0),Hn=ns("neutral-stroke-strong-focus-delta").withDefault(0),Zn=ss("neutral-base-color").withDefault(ji),Un=ns("neutral-palette").withDefault((e=>Ni.from(Zn.getValueFor(e)))),qn=ss("accent-base-color").withDefault(Zi),Wn=ns("accent-palette").withDefault((e=>Ni.from(qn.getValueFor(e)))),Xn=ns("neutral-layer-card-container-recipe").withDefault({evaluate:e=>is(Un.getValueFor(e),Us.getValueFor(e),pn.getValueFor(e))}),Gn=(ss("neutral-layer-card-container").withDefault((e=>Xn.getValueFor(e).evaluate(e))),ns("neutral-layer-floating-recipe").withDefault({evaluate:e=>function(e,t,i){return e.get(ts(e,t)+i)}(Un.getValueFor(e),Us.getValueFor(e),pn.getValueFor(e))})),Kn=ss("neutral-layer-floating").withDefault((e=>Gn.getValueFor(e).evaluate(e))),Yn=ns("neutral-layer-1-recipe").withDefault({evaluate:e=>function(e,t){return e.get(ts(e,t))}(Un.getValueFor(e),Us.getValueFor(e))}),Jn=ss("neutral-layer-1").withDefault((e=>Yn.getValueFor(e).evaluate(e))),Qn=ns("neutral-layer-2-recipe").withDefault({evaluate:e=>is(Un.getValueFor(e),Us.getValueFor(e),pn.getValueFor(e))}),er=(ss("neutral-layer-2").withDefault((e=>Qn.getValueFor(e).evaluate(e))),ns("neutral-layer-3-recipe").withDefault({evaluate:e=>function(e,t,i){return e.get(ts(e,t)+-1*i*2)}(Un.getValueFor(e),Us.getValueFor(e),pn.getValueFor(e))})),tr=(ss("neutral-layer-3").withDefault((e=>er.getValueFor(e).evaluate(e))),ns("neutral-layer-4-recipe").withDefault({evaluate:e=>function(e,t,i){return e.get(ts(e,t)+-1*i*3)}(Un.getValueFor(e),Us.getValueFor(e),pn.getValueFor(e))})),ir=(ss("neutral-layer-4").withDefault((e=>tr.getValueFor(e).evaluate(e))),ss("fill-color").withDefault((e=>Jn.getValueFor(e))));var sr;!function(e){e[e.normal=4.5]="normal",e[e.large=3]="large"}(sr||(sr={}));const nr=ns("accent-fill-recipe").withDefault({evaluate:(e,t)=>function(e,t,i,s,n,r,o,a,l,c,u,d,h){return Di(t)?Yi(e,t,8,c,u,d,h,void 0):Yi(e,t,5,s,n,r,o,void 0)}(Wn.getValueFor(e),t||ir.getValueFor(e),0,qs.getValueFor(e),Ws.getValueFor(e),Xs.getValueFor(e),Gs.getValueFor(e),0,0,qs.getValueFor(e),Ws.getValueFor(e),Xs.getValueFor(e),Gs.getValueFor(e))}),rr=ss("accent-fill-rest").withDefault((e=>nr.getValueFor(e).evaluate(e).rest)),or=ss("accent-fill-hover").withDefault((e=>nr.getValueFor(e).evaluate(e).hover)),ar=ss("accent-fill-active").withDefault((e=>nr.getValueFor(e).evaluate(e).active)),lr=ss("accent-fill-focus").withDefault((e=>nr.getValueFor(e).evaluate(e).focus)),cr=ns("foreground-on-accent-recipe").withDefault({evaluate:e=>Ui(rr.getValueFor(e),or.getValueFor(e),ar.getValueFor(e),lr.getValueFor(e),sr.normal)}),ur=ss("foreground-on-accent-rest").withDefault((e=>cr.getValueFor(e).evaluate(e).rest)),dr=ss("foreground-on-accent-hover").withDefault((e=>cr.getValueFor(e).evaluate(e).hover)),hr=ss("foreground-on-accent-active").withDefault((e=>cr.getValueFor(e).evaluate(e).active)),pr=(ss("foreground-on-accent-focus").withDefault((e=>cr.getValueFor(e).evaluate(e).focus)),ns("accent-foreground-recipe").withDefault({evaluate:(e,t)=>Yi(Wn.getValueFor(e),t||ir.getValueFor(e),9.5,Ks.getValueFor(e),Ys.getValueFor(e),Js.getValueFor(e),Qs.getValueFor(e))})),fr=ss("accent-foreground-rest").withDefault((e=>pr.getValueFor(e).evaluate(e).rest)),gr=ss("accent-foreground-hover").withDefault((e=>pr.getValueFor(e).evaluate(e).hover)),mr=ss("accent-foreground-active").withDefault((e=>pr.getValueFor(e).evaluate(e).active)),vr=(ss("accent-foreground-focus").withDefault((e=>pr.getValueFor(e).evaluate(e).focus)),ns("accent-stroke-control-recipe").withDefault({evaluate:(e,t)=>Ki(Un.getValueFor(e),t||ir.getValueFor(e),-3,-3,-3,-3,10,1,void 0,!0)})),yr=ss("accent-stroke-control-rest").withDefault((e=>vr.getValueFor(e).evaluate(e,rr.getValueFor(e)).rest)),br=ss("accent-stroke-control-hover").withDefault((e=>vr.getValueFor(e).evaluate(e,or.getValueFor(e)).hover)),wr=ss("accent-stroke-control-active").withDefault((e=>vr.getValueFor(e).evaluate(e,ar.getValueFor(e)).active)),xr=(ss("accent-stroke-control-focus").withDefault((e=>vr.getValueFor(e).evaluate(e,lr.getValueFor(e)).focus)),ns("neutral-fill-recipe").withDefault({evaluate:(e,t)=>Qi(Un.getValueFor(e),t||ir.getValueFor(e),en.getValueFor(e),tn.getValueFor(e),sn.getValueFor(e),nn.getValueFor(e),void 0,2,3,1,2,void 0)})),kr=ss("neutral-fill-rest").withDefault((e=>xr.getValueFor(e).evaluate(e).rest)),$r=ss("neutral-fill-hover").withDefault((e=>xr.getValueFor(e).evaluate(e).hover)),Cr=ss("neutral-fill-active").withDefault((e=>xr.getValueFor(e).evaluate(e).active)),_r=(ss("neutral-fill-focus").withDefault((e=>xr.getValueFor(e).evaluate(e).focus)),ns("neutral-fill-input-recipe").withDefault({evaluate:(e,t)=>Qi(Un.getValueFor(e),t||ir.getValueFor(e),rn.getValueFor(e),on.getValueFor(e),an.getValueFor(e),ln.getValueFor(e),void 0,2,3,1,0,void 0)})),Sr=ss("neutral-fill-input-rest").withDefault((e=>_r.getValueFor(e).evaluate(e).rest)),Ir=ss("neutral-fill-input-hover").withDefault((e=>_r.getValueFor(e).evaluate(e).hover)),Tr=(ss("neutral-fill-input-active").withDefault((e=>_r.getValueFor(e).evaluate(e).active)),ss("neutral-fill-input-focus").withDefault((e=>_r.getValueFor(e).evaluate(e).focus))),Or=ns("neutral-fill-input-alt-recipe").withDefault({evaluate:(e,t)=>Qi(Un.getValueFor(e),t||ir.getValueFor(e),cn.getValueFor(e),un.getValueFor(e),dn.getValueFor(e),hn.getValueFor(e),1,cn.getValueFor(e),cn.getValueFor(e)-un.getValueFor(e),cn.getValueFor(e)-dn.getValueFor(e),hn.getValueFor(e),1)}),Fr=(ss("neutral-fill-input-alt-rest").withDefault((e=>Or.getValueFor(e).evaluate(e).rest)),ss("neutral-fill-input-alt-hover").withDefault((e=>Or.getValueFor(e).evaluate(e).hover)),ss("neutral-fill-input-alt-active").withDefault((e=>Or.getValueFor(e).evaluate(e).active)),ss("neutral-fill-input-alt-focus").withDefault((e=>Or.getValueFor(e).evaluate(e).focus)),ns("neutral-fill-layer-recipe").withDefault({evaluate:(e,t)=>Ji(Un.getValueFor(e),t||ir.getValueFor(e),pn.getValueFor(e),fn.getValueFor(e),gn.getValueFor(e),pn.getValueFor(e),1)})),Ar=(ss("neutral-fill-layer-rest").withDefault((e=>Fr.getValueFor(e).evaluate(e).rest)),ss("neutral-fill-layer-hover").withDefault((e=>Fr.getValueFor(e).evaluate(e).hover)),ss("neutral-fill-layer-active").withDefault((e=>Fr.getValueFor(e).evaluate(e).active)),ns("neutral-fill-layer-alt-recipe").withDefault({evaluate:(e,t)=>Ji(Un.getValueFor(e),t||ir.getValueFor(e),mn.getValueFor(e),mn.getValueFor(e),mn.getValueFor(e),mn.getValueFor(e))})),Er=(ss("neutral-fill-layer-alt-rest").withDefault((e=>Ar.getValueFor(e).evaluate(e).rest)),ns("neutral-fill-secondary-recipe").withDefault({evaluate:(e,t)=>Ji(Un.getValueFor(e),t||ir.getValueFor(e),vn.getValueFor(e),yn.getValueFor(e),bn.getValueFor(e),wn.getValueFor(e))})),Dr=ss("neutral-fill-secondary-rest").withDefault((e=>Er.getValueFor(e).evaluate(e).rest)),Rr=ss("neutral-fill-secondary-hover").withDefault((e=>Er.getValueFor(e).evaluate(e).hover)),Vr=ss("neutral-fill-secondary-active").withDefault((e=>Er.getValueFor(e).evaluate(e).active)),Nr=ss("neutral-fill-secondary-focus").withDefault((e=>Er.getValueFor(e).evaluate(e).focus)),Pr=ns("neutral-fill-stealth-recipe").withDefault({evaluate:(e,t)=>Ji(Un.getValueFor(e),t||ir.getValueFor(e),xn.getValueFor(e),kn.getValueFor(e),$n.getValueFor(e),Cn.getValueFor(e))}),Lr=ss("neutral-fill-stealth-rest").withDefault((e=>Pr.getValueFor(e).evaluate(e).rest)),Mr=ss("neutral-fill-stealth-hover").withDefault((e=>Pr.getValueFor(e).evaluate(e).hover)),Br=ss("neutral-fill-stealth-active").withDefault((e=>Pr.getValueFor(e).evaluate(e).active)),zr=ss("neutral-fill-stealth-focus").withDefault((e=>Pr.getValueFor(e).evaluate(e).focus)),jr=ns("neutral-fill-strong-recipe").withDefault({evaluate:(e,t)=>Yi(Un.getValueFor(e),t||ir.getValueFor(e),4.5,_n.getValueFor(e),Sn.getValueFor(e),In.getValueFor(e),Tn.getValueFor(e))}),Hr=(ss("neutral-fill-strong-rest").withDefault((e=>jr.getValueFor(e).evaluate(e).rest)),ss("neutral-fill-strong-hover").withDefault((e=>jr.getValueFor(e).evaluate(e).hover)),ss("neutral-fill-strong-active").withDefault((e=>jr.getValueFor(e).evaluate(e).active)),ss("neutral-fill-strong-focus").withDefault((e=>jr.getValueFor(e).evaluate(e).focus)),ns("neutral-foreground-recipe").withDefault({evaluate:(e,t)=>Yi(Un.getValueFor(e),t||ir.getValueFor(e),16,0,-19,-30,0)})),Zr=ss("neutral-foreground-rest").withDefault((e=>Hr.getValueFor(e).evaluate(e).rest)),Ur=(ss("neutral-foreground-hover").withDefault((e=>Hr.getValueFor(e).evaluate(e).hover)),ss("neutral-foreground-active").withDefault((e=>Hr.getValueFor(e).evaluate(e).active)),ss("neutral-foreground-focus").withDefault((e=>Hr.getValueFor(e).evaluate(e).focus)),ns("neutral-foreground-hint-recipe").withDefault({evaluate:(e,t)=>function(e,t){return e.colorContrast(t,4.5)}(Un.getValueFor(e),t||ir.getValueFor(e))})),qr=ss("neutral-foreground-hint").withDefault((e=>Ur.getValueFor(e).evaluate(e))),Wr=ns("neutral-stroke-recipe").withDefault({evaluate:(e,t)=>Ji(Un.getValueFor(e),t||ir.getValueFor(e),On.getValueFor(e),Fn.getValueFor(e),An.getValueFor(e),En.getValueFor(e))}),Xr=ss("neutral-stroke-rest").withDefault((e=>Wr.getValueFor(e).evaluate(e).rest)),Gr=ss("neutral-stroke-hover").withDefault((e=>Wr.getValueFor(e).evaluate(e).hover)),Kr=ss("neutral-stroke-active").withDefault((e=>Wr.getValueFor(e).evaluate(e).active)),Yr=(ss("neutral-stroke-focus").withDefault((e=>Wr.getValueFor(e).evaluate(e).focus)),ns("neutral-stroke-control-recipe").withDefault({evaluate:(e,t)=>Ki(Un.getValueFor(e),t||ir.getValueFor(e),Dn.getValueFor(e),Rn.getValueFor(e),Vn.getValueFor(e),Nn.getValueFor(e),5)})),Jr=ss("neutral-stroke-control-rest").withDefault((e=>Yr.getValueFor(e).evaluate(e).rest)),Qr=ss("neutral-stroke-control-hover").withDefault((e=>Yr.getValueFor(e).evaluate(e).hover)),eo=ss("neutral-stroke-control-active").withDefault((e=>Yr.getValueFor(e).evaluate(e).active)),to=(ss("neutral-stroke-control-focus").withDefault((e=>Yr.getValueFor(e).evaluate(e).focus)),ns("neutral-stroke-divider-recipe").withDefault({evaluate:(e,t)=>function(e,t,i){return e.get(e.closestIndexOf(t)+Ri(t)*i)}(Un.getValueFor(e),t||ir.getValueFor(e),Pn.getValueFor(e))})),io=ss("neutral-stroke-divider-rest").withDefault((e=>to.getValueFor(e).evaluate(e))),so=ns("neutral-stroke-input-recipe").withDefault({evaluate:(e,t)=>function(e,t,i,s,n,r,o,a){const l=e.closestIndexOf(t),c=Ri(t),u=l+c*i,d=u+c*(s-i),h=u+c*(n-i),p=u+c*(r-i),f=`calc(100% - ${a})`;function g(t,i){const s=e.get(t);if(i){const i=e.get(t+20*c),n=`linear-gradient(${s.toColorString()} ${f}, ${i.toColorString()} ${f}, ${i.toColorString()})`;return Wi.fromObject(s,n)}return s}return{rest:g(u,!0),hover:g(d,!0),active:g(h,!1),focus:g(p,!0)}}(Un.getValueFor(e),t||ir.getValueFor(e),Dn.getValueFor(e),Rn.getValueFor(e),Vn.getValueFor(e),Nn.getValueFor(e),0,ps.getValueFor(e)+"px")}),no=ss("neutral-stroke-input-rest").withDefault((e=>so.getValueFor(e).evaluate(e).rest)),ro=ss("neutral-stroke-input-hover").withDefault((e=>so.getValueFor(e).evaluate(e).hover)),oo=(ss("neutral-stroke-input-active").withDefault((e=>so.getValueFor(e).evaluate(e).active)),ss("neutral-stroke-input-focus").withDefault((e=>so.getValueFor(e).evaluate(e).focus)),ns("neutral-stroke-layer-recipe").withDefault({evaluate:(e,t)=>Ji(Un.getValueFor(e),t||ir.getValueFor(e),Ln.getValueFor(e),Mn.getValueFor(e),Bn.getValueFor(e),Ln.getValueFor(e))})),ao=ss("neutral-stroke-layer-rest").withDefault((e=>oo.getValueFor(e).evaluate(e).rest)),lo=(ss("neutral-stroke-layer-hover").withDefault((e=>oo.getValueFor(e).evaluate(e).hover)),ss("neutral-stroke-layer-active").withDefault((e=>oo.getValueFor(e).evaluate(e).active)),ns("neutral-stroke-strong-recipe").withDefault({evaluate:(e,t)=>Yi(Un.getValueFor(e),t||ir.getValueFor(e),5.5,0,zn.getValueFor(e),jn.getValueFor(e),Hn.getValueFor(e))})),co=(ss("neutral-stroke-strong-rest").withDefault((e=>lo.getValueFor(e).evaluate(e).rest)),ss("neutral-stroke-strong-hover").withDefault((e=>lo.getValueFor(e).evaluate(e).hover)),ss("neutral-stroke-strong-active").withDefault((e=>lo.getValueFor(e).evaluate(e).active)),ss("neutral-stroke-strong-focus").withDefault((e=>lo.getValueFor(e).evaluate(e).focus)),ns("focus-stroke-outer-recipe").withDefault({evaluate:e=>(Un.getValueFor(e),Di(ir.getValueFor(e))?Bi:zi)})),uo=ss("focus-stroke-outer").withDefault((e=>co.getValueFor(e).evaluate(e))),ho=ns("focus-stroke-inner-recipe").withDefault({evaluate:e=>{return Wn.getValueFor(e),t=ir.getValueFor(e),uo.getValueFor(e),Di(t)?zi:Bi;var t}}),po=ss("focus-stroke-inner").withDefault((e=>ho.getValueFor(e).evaluate(e))),fo=ns("foreground-on-accent-large-recipe").withDefault({evaluate:e=>Ui(rr.getValueFor(e),or.getValueFor(e),ar.getValueFor(e),lr.getValueFor(e),sr.large)}),go=(ss("foreground-on-accent-rest-large").withDefault((e=>fo.getValueFor(e).evaluate(e).rest)),ss("foreground-on-accent-hover-large").withDefault((e=>fo.getValueFor(e).evaluate(e,or.getValueFor(e)).hover)),ss("foreground-on-accent-active-large").withDefault((e=>fo.getValueFor(e).evaluate(e,ar.getValueFor(e)).active)),ss("foreground-on-accent-focus-large").withDefault((e=>fo.getValueFor(e).evaluate(e,lr.getValueFor(e)).focus)),ss("neutral-fill-inverse-rest-delta").withDefault(0)),mo=ss("neutral-fill-inverse-hover-delta").withDefault(-3),vo=ss("neutral-fill-inverse-active-delta").withDefault(7),yo=ss("neutral-fill-inverse-focus-delta").withDefault(0),bo=ns("neutral-fill-inverse-recipe").withDefault({evaluate:(e,t)=>function(e,t,i,s,n,r){const o=Ri(t),a=e.closestIndexOf(e.colorContrast(t,14)),l=a+o*Math.abs(i-s);let c,u;return(1===o?i<s:o*i>o*s)?(c=a,u=l):(c=l,u=a),{rest:e.get(c),hover:e.get(u),active:e.get(c+o*n),focus:e.get(c+o*r)}}(Un.getValueFor(e),t||ir.getValueFor(e),go.getValueFor(e),mo.getValueFor(e),vo.getValueFor(e),yo.getValueFor(e))});function wo(e,t){const i=[];let s="";const n=[];for(let r=0,o=e.length-1;r<o;++r){s+=e[r];let o=t[r];if(o instanceof Le){const e=o.createBehavior();o=o.createCSS(),e&&n.push(e)}o instanceof C||o instanceof CSSStyleSheet?(""!==s.trim()&&(i.push(s),s=""),i.push(o)):s+=o}return s+=e[e.length-1],""!==s.trim()&&i.push(s),{styles:i,behaviors:n}}function xo(e,...t){const{styles:i,behaviors:s}=wo(e,t),n=C.create(i);return s.length&&n.withBehaviors(...s),n}ss("neutral-fill-inverse-rest").withDefault((e=>bo.getValueFor(e).evaluate(e).rest)),ss("neutral-fill-inverse-hover").withDefault((e=>bo.getValueFor(e).evaluate(e).hover)),ss("neutral-fill-inverse-active").withDefault((e=>bo.getValueFor(e).evaluate(e).active)),ss("neutral-fill-inverse-focus").withDefault((e=>bo.getValueFor(e).evaluate(e).focus));class ko extends Le{constructor(e,t){super(),this.behaviors=t,this.css="";const i=e.reduce(((e,t)=>("string"==typeof t?this.css+=t:e.push(t),e)),[]);i.length&&(this.styles=C.create(i))}createBehavior(){return this}createCSS(){return this.css}bind(e){this.styles&&e.$fastController.addStyles(this.styles),this.behaviors.length&&e.$fastController.addBehaviors(this.behaviors)}unbind(e){this.styles&&e.$fastController.removeStyles(this.styles),this.behaviors.length&&e.$fastController.removeBehaviors(this.behaviors)}}function $o(e,...t){const{styles:i,behaviors:s}=wo(e,t);return new ko(i,s)}function Co(e){return`:host([hidden]){display:none}:host{display:${e}}`}class _o extends Ve{constructor(){super(...arguments),this.role="separator",this.orientation="horizontal"}}H([L],_o.prototype,"role",void 0),H([L],_o.prototype,"orientation",void 0);class So{constructor(e){this.listenerCache=new WeakMap,this.query=e}bind(e){const{query:t}=this,i=this.constructListener(e);i.bind(t)(),t.addListener(i),this.listenerCache.set(e,i)}unbind(e){const t=this.listenerCache.get(e);t&&(this.query.removeListener(t),this.listenerCache.delete(e))}}class Io extends So{constructor(e,t){super(e),this.styles=t}static with(e){return t=>new Io(e,t)}constructListener(e){let t=!1;const i=this.styles;return function(){const{matches:s}=this;s&&!t?(e.$fastController.addStyles(i),t=s):!s&&t&&(e.$fastController.removeStyles(i),t=s)}}unbind(e){super.unbind(e),e.$fastController.removeStyles(this.styles)}}const To=Io.with(window.matchMedia("(forced-colors)"));var Oo,Fo;Io.with(window.matchMedia("(prefers-color-scheme: dark)")),Io.with(window.matchMedia("(prefers-color-scheme: light)")),(Fo=Oo||(Oo={})).Canvas="Canvas",Fo.CanvasText="CanvasText",Fo.LinkText="LinkText",Fo.VisitedText="VisitedText",Fo.ActiveText="ActiveText",Fo.ButtonFace="ButtonFace",Fo.ButtonText="ButtonText",Fo.Field="Field",Fo.FieldText="FieldText",Fo.Highlight="Highlight",Fo.HighlightText="HighlightText",Fo.GrayText="GrayText";const Ao=it.create({name:"elevation-shadow",cssCustomPropertyName:null}).withDefault({evaluate:(e,t,i)=>{let s=.12,n=.14;return t>16&&(s=.2,n=.24),`0 0 2px rgba(0, 0, 0, ${s}), 0 calc(${t} * 0.5px) calc((${t} * 1px)) rgba(0, 0, 0, ${n})`}}),Eo=it.create("elevation-shadow-card-rest-size").withDefault(4),Do=it.create("elevation-shadow-card-hover-size").withDefault(8),Ro=it.create("elevation-shadow-card-active-size").withDefault(0),Vo=it.create("elevation-shadow-card-focus-size").withDefault(8),No=it.create("elevation-shadow-card-rest").withDefault((e=>Ao.getValueFor(e).evaluate(e,Eo.getValueFor(e)))),Po=(it.create("elevation-shadow-card-hover").withDefault((e=>Ao.getValueFor(e).evaluate(e,Do.getValueFor(e)))),it.create("elevation-shadow-card-active").withDefault((e=>Ao.getValueFor(e).evaluate(e,Ro.getValueFor(e)))),it.create("elevation-shadow-card-focus").withDefault((e=>Ao.getValueFor(e).evaluate(e,Vo.getValueFor(e)))),it.create("elevation-shadow-tooltip-size").withDefault(16)),Lo=(it.create("elevation-shadow-tooltip").withDefault((e=>Ao.getValueFor(e).evaluate(e,Po.getValueFor(e)))),it.create("elevation-shadow-flyout-size").withDefault(32)),Mo=it.create("elevation-shadow-flyout").withDefault((e=>Ao.getValueFor(e).evaluate(e,Lo.getValueFor(e)))),Bo=it.create("elevation-shadow-dialog-size").withDefault(128),zo=it.create("elevation-shadow-dialog").withDefault((e=>Ao.getValueFor(e).evaluate(e,Bo.getValueFor(e)))),jo=class extends li{connectedCallback(){super.connectedCallback(),ir.setValueFor(this,Kn)}}.compose({baseName:"menu",baseClass:li,template:(e,t)=>Qt`
    <template
        slot="${e=>e.slot?e.slot:e.isNestedMenu()?"submenu":void 0}"
        role="menu"
        @keydown="${(e,t)=>e.handleMenuKeyDown(t.event)}"
        @focusout="${(e,t)=>e.handleFocusOut(t.event)}"
    >
        <slot ${di("items")}></slot>
    </template>
`,styles:(e,t)=>xo`
    ${Co("block")} :host {
      background: ${Kn};
      border: calc(${ps} * 1px) solid transparent;
      border-radius: calc(${hs} * 1px);
      box-shadow: ${Mo};
      padding: calc((${us} - ${ps}) * 1px) 0;
      max-width: 368px;
      min-width: 64px;
    }

    :host([slot='submenu']) {
      width: max-content;
      margin: 0 calc(${us} * 2px);
    }

    ::slotted(${e.tagFor(ai)}) {
      margin: 0 calc(${us} * 1px);
    }

    ::slotted(${e.tagFor(_o)}) {
      margin: calc(${us} * 1px) 0;
    }

    ::slotted(hr) {
      box-sizing: content-box;
      height: 0;
      margin: calc(${us} * 1px) 0;
      border: none;
      border-top: calc(${ps} * 1px) solid ${io};
    }
  `.withBehaviors(To(xo`
        :host([slot='submenu']) {
          background: ${Oo.Canvas};
          border-color: ${Oo.CanvasText};
        }
      `))}),Ho=e=>"function"==typeof e,Zo=()=>null;function Uo(e){return void 0===e?Zo:Ho(e)?e:()=>e}function qo(e,t,i){const s=Ho(e)?e:()=>e,n=Uo(t),r=Uo(i);return(e,t)=>s(e,t)?n(e,t):r(e,t)}const Wo="resize",Xo="scroll";class Go extends Ve{constructor(){super(...arguments),this.anchor="",this.viewport="",this.horizontalPositioningMode="uncontrolled",this.horizontalDefaultPosition="unset",this.horizontalViewportLock=!1,this.horizontalInset=!1,this.horizontalScaling="content",this.verticalPositioningMode="uncontrolled",this.verticalDefaultPosition="unset",this.verticalViewportLock=!1,this.verticalInset=!1,this.verticalScaling="content",this.fixedPlacement=!1,this.autoUpdateMode="anchor",this.anchorElement=null,this.viewportElement=null,this.initialLayoutComplete=!1,this.resizeDetector=null,this.baseHorizontalOffset=0,this.baseVerticalOffset=0,this.pendingPositioningUpdate=!1,this.pendingReset=!1,this.currentDirection=St.ltr,this.regionVisible=!1,this.forceUpdate=!1,this.updateThreshold=.5,this.update=()=>{this.pendingPositioningUpdate||this.requestPositionUpdates()},this.startObservers=()=>{this.stopObservers(),null!==this.anchorElement&&(this.requestPositionUpdates(),null!==this.resizeDetector&&(this.resizeDetector.observe(this.anchorElement),this.resizeDetector.observe(this)))},this.requestPositionUpdates=()=>{null===this.anchorElement||this.pendingPositioningUpdate||(Go.intersectionService.requestPosition(this,this.handleIntersection),Go.intersectionService.requestPosition(this.anchorElement,this.handleIntersection),null!==this.viewportElement&&Go.intersectionService.requestPosition(this.viewportElement,this.handleIntersection),this.pendingPositioningUpdate=!0)},this.stopObservers=()=>{this.pendingPositioningUpdate&&(this.pendingPositioningUpdate=!1,Go.intersectionService.cancelRequestPosition(this,this.handleIntersection),null!==this.anchorElement&&Go.intersectionService.cancelRequestPosition(this.anchorElement,this.handleIntersection),null!==this.viewportElement&&Go.intersectionService.cancelRequestPosition(this.viewportElement,this.handleIntersection)),null!==this.resizeDetector&&this.resizeDetector.disconnect()},this.getViewport=()=>"string"!=typeof this.viewport||""===this.viewport?document.documentElement:document.getElementById(this.viewport),this.getAnchor=()=>document.getElementById(this.anchor),this.handleIntersection=e=>{this.pendingPositioningUpdate&&(this.pendingPositioningUpdate=!1,this.applyIntersectionEntries(e)&&this.updateLayout())},this.applyIntersectionEntries=e=>{const t=e.find((e=>e.target===this)),i=e.find((e=>e.target===this.anchorElement)),s=e.find((e=>e.target===this.viewportElement));return void 0!==t&&void 0!==s&&void 0!==i&&!!(!this.regionVisible||this.forceUpdate||void 0===this.regionRect||void 0===this.anchorRect||void 0===this.viewportRect||this.isRectDifferent(this.anchorRect,i.boundingClientRect)||this.isRectDifferent(this.viewportRect,s.boundingClientRect)||this.isRectDifferent(this.regionRect,t.boundingClientRect))&&(this.regionRect=t.boundingClientRect,this.anchorRect=i.boundingClientRect,this.viewportElement===document.documentElement?this.viewportRect=new DOMRectReadOnly(s.boundingClientRect.x+document.documentElement.scrollLeft,s.boundingClientRect.y+document.documentElement.scrollTop,s.boundingClientRect.width,s.boundingClientRect.height):this.viewportRect=s.boundingClientRect,this.updateRegionOffset(),this.forceUpdate=!1,!0)},this.updateRegionOffset=()=>{this.anchorRect&&this.regionRect&&(this.baseHorizontalOffset=this.baseHorizontalOffset+(this.anchorRect.left-this.regionRect.left)+(this.translateX-this.baseHorizontalOffset),this.baseVerticalOffset=this.baseVerticalOffset+(this.anchorRect.top-this.regionRect.top)+(this.translateY-this.baseVerticalOffset))},this.isRectDifferent=(e,t)=>Math.abs(e.top-t.top)>this.updateThreshold||Math.abs(e.right-t.right)>this.updateThreshold||Math.abs(e.bottom-t.bottom)>this.updateThreshold||Math.abs(e.left-t.left)>this.updateThreshold,this.handleResize=e=>{this.update()},this.reset=()=>{this.pendingReset&&(this.pendingReset=!1,null===this.anchorElement&&(this.anchorElement=this.getAnchor()),null===this.viewportElement&&(this.viewportElement=this.getViewport()),this.currentDirection=ri(this),this.startObservers())},this.updateLayout=()=>{let e,t;if("uncontrolled"!==this.horizontalPositioningMode){const e=this.getPositioningOptions(this.horizontalInset);if("center"===this.horizontalDefaultPosition)t="center";else if("unset"!==this.horizontalDefaultPosition){let e=this.horizontalDefaultPosition;if("start"===e||"end"===e){const t=ri(this);if(t!==this.currentDirection)return this.currentDirection=t,void this.initialize();e=this.currentDirection===St.ltr?"start"===e?"left":"right":"start"===e?"right":"left"}switch(e){case"left":t=this.horizontalInset?"insetStart":"start";break;case"right":t=this.horizontalInset?"insetEnd":"end"}}const i=void 0!==this.horizontalThreshold?this.horizontalThreshold:void 0!==this.regionRect?this.regionRect.width:0,s=void 0!==this.anchorRect?this.anchorRect.left:0,n=void 0!==this.anchorRect?this.anchorRect.right:0,r=void 0!==this.anchorRect?this.anchorRect.width:0,o=void 0!==this.viewportRect?this.viewportRect.left:0,a=void 0!==this.viewportRect?this.viewportRect.right:0;(void 0===t||"locktodefault"!==this.horizontalPositioningMode&&this.getAvailableSpace(t,s,n,r,o,a)<i)&&(t=this.getAvailableSpace(e[0],s,n,r,o,a)>this.getAvailableSpace(e[1],s,n,r,o,a)?e[0]:e[1])}if("uncontrolled"!==this.verticalPositioningMode){const t=this.getPositioningOptions(this.verticalInset);if("center"===this.verticalDefaultPosition)e="center";else if("unset"!==this.verticalDefaultPosition)switch(this.verticalDefaultPosition){case"top":e=this.verticalInset?"insetStart":"start";break;case"bottom":e=this.verticalInset?"insetEnd":"end"}const i=void 0!==this.verticalThreshold?this.verticalThreshold:void 0!==this.regionRect?this.regionRect.height:0,s=void 0!==this.anchorRect?this.anchorRect.top:0,n=void 0!==this.anchorRect?this.anchorRect.bottom:0,r=void 0!==this.anchorRect?this.anchorRect.height:0,o=void 0!==this.viewportRect?this.viewportRect.top:0,a=void 0!==this.viewportRect?this.viewportRect.bottom:0;(void 0===e||"locktodefault"!==this.verticalPositioningMode&&this.getAvailableSpace(e,s,n,r,o,a)<i)&&(e=this.getAvailableSpace(t[0],s,n,r,o,a)>this.getAvailableSpace(t[1],s,n,r,o,a)?t[0]:t[1])}const i=this.getNextRegionDimension(t,e),s=this.horizontalPosition!==t||this.verticalPosition!==e;if(this.setHorizontalPosition(t,i),this.setVerticalPosition(e,i),this.updateRegionStyle(),!this.initialLayoutComplete)return this.initialLayoutComplete=!0,void this.requestPositionUpdates();this.regionVisible||(this.regionVisible=!0,this.style.removeProperty("pointer-events"),this.style.removeProperty("opacity"),this.classList.toggle("loaded",!0),this.$emit("loaded",this,{bubbles:!1})),this.updatePositionClasses(),s&&this.$emit("positionchange",this,{bubbles:!1})},this.updateRegionStyle=()=>{this.style.width=this.regionWidth,this.style.height=this.regionHeight,this.style.transform=`translate(${this.translateX}px, ${this.translateY}px)`},this.updatePositionClasses=()=>{this.classList.toggle("top","start"===this.verticalPosition),this.classList.toggle("bottom","end"===this.verticalPosition),this.classList.toggle("inset-top","insetStart"===this.verticalPosition),this.classList.toggle("inset-bottom","insetEnd"===this.verticalPosition),this.classList.toggle("vertical-center","center"===this.verticalPosition),this.classList.toggle("left","start"===this.horizontalPosition),this.classList.toggle("right","end"===this.horizontalPosition),this.classList.toggle("inset-left","insetStart"===this.horizontalPosition),this.classList.toggle("inset-right","insetEnd"===this.horizontalPosition),this.classList.toggle("horizontal-center","center"===this.horizontalPosition)},this.setHorizontalPosition=(e,t)=>{if(void 0===e||void 0===this.regionRect||void 0===this.anchorRect||void 0===this.viewportRect)return;let i=0;switch(this.horizontalScaling){case"anchor":case"fill":i=this.horizontalViewportLock?this.viewportRect.width:t.width,this.regionWidth=`${i}px`;break;case"content":i=this.regionRect.width,this.regionWidth="unset"}let s=0;switch(e){case"start":this.translateX=this.baseHorizontalOffset-i,this.horizontalViewportLock&&this.anchorRect.left>this.viewportRect.right&&(this.translateX=this.translateX-(this.anchorRect.left-this.viewportRect.right));break;case"insetStart":this.translateX=this.baseHorizontalOffset-i+this.anchorRect.width,this.horizontalViewportLock&&this.anchorRect.right>this.viewportRect.right&&(this.translateX=this.translateX-(this.anchorRect.right-this.viewportRect.right));break;case"insetEnd":this.translateX=this.baseHorizontalOffset,this.horizontalViewportLock&&this.anchorRect.left<this.viewportRect.left&&(this.translateX=this.translateX-(this.anchorRect.left-this.viewportRect.left));break;case"end":this.translateX=this.baseHorizontalOffset+this.anchorRect.width,this.horizontalViewportLock&&this.anchorRect.right<this.viewportRect.left&&(this.translateX=this.translateX-(this.anchorRect.right-this.viewportRect.left));break;case"center":if(s=(this.anchorRect.width-i)/2,this.translateX=this.baseHorizontalOffset+s,this.horizontalViewportLock){const e=this.anchorRect.left+s,t=this.anchorRect.right-s;e<this.viewportRect.left&&!(t>this.viewportRect.right)?this.translateX=this.translateX-(e-this.viewportRect.left):t>this.viewportRect.right&&!(e<this.viewportRect.left)&&(this.translateX=this.translateX-(t-this.viewportRect.right))}}this.horizontalPosition=e},this.setVerticalPosition=(e,t)=>{if(void 0===e||void 0===this.regionRect||void 0===this.anchorRect||void 0===this.viewportRect)return;let i=0;switch(this.verticalScaling){case"anchor":case"fill":i=this.verticalViewportLock?this.viewportRect.height:t.height,this.regionHeight=`${i}px`;break;case"content":i=this.regionRect.height,this.regionHeight="unset"}let s=0;switch(e){case"start":this.translateY=this.baseVerticalOffset-i,this.verticalViewportLock&&this.anchorRect.top>this.viewportRect.bottom&&(this.translateY=this.translateY-(this.anchorRect.top-this.viewportRect.bottom));break;case"insetStart":this.translateY=this.baseVerticalOffset-i+this.anchorRect.height,this.verticalViewportLock&&this.anchorRect.bottom>this.viewportRect.bottom&&(this.translateY=this.translateY-(this.anchorRect.bottom-this.viewportRect.bottom));break;case"insetEnd":this.translateY=this.baseVerticalOffset,this.verticalViewportLock&&this.anchorRect.top<this.viewportRect.top&&(this.translateY=this.translateY-(this.anchorRect.top-this.viewportRect.top));break;case"end":this.translateY=this.baseVerticalOffset+this.anchorRect.height,this.verticalViewportLock&&this.anchorRect.bottom<this.viewportRect.top&&(this.translateY=this.translateY-(this.anchorRect.bottom-this.viewportRect.top));break;case"center":if(s=(this.anchorRect.height-i)/2,this.translateY=this.baseVerticalOffset+s,this.verticalViewportLock){const e=this.anchorRect.top+s,t=this.anchorRect.bottom-s;e<this.viewportRect.top&&!(t>this.viewportRect.bottom)?this.translateY=this.translateY-(e-this.viewportRect.top):t>this.viewportRect.bottom&&!(e<this.viewportRect.top)&&(this.translateY=this.translateY-(t-this.viewportRect.bottom))}}this.verticalPosition=e},this.getPositioningOptions=e=>e?["insetStart","insetEnd"]:["start","end"],this.getAvailableSpace=(e,t,i,s,n,r)=>{const o=t-n,a=r-(t+s);switch(e){case"start":return o;case"insetStart":return o+s;case"insetEnd":return a+s;case"end":return a;case"center":return 2*Math.min(o,a)+s}},this.getNextRegionDimension=(e,t)=>{const i={height:void 0!==this.regionRect?this.regionRect.height:0,width:void 0!==this.regionRect?this.regionRect.width:0};return void 0!==e&&"fill"===this.horizontalScaling?i.width=this.getAvailableSpace(e,void 0!==this.anchorRect?this.anchorRect.left:0,void 0!==this.anchorRect?this.anchorRect.right:0,void 0!==this.anchorRect?this.anchorRect.width:0,void 0!==this.viewportRect?this.viewportRect.left:0,void 0!==this.viewportRect?this.viewportRect.right:0):"anchor"===this.horizontalScaling&&(i.width=void 0!==this.anchorRect?this.anchorRect.width:0),void 0!==t&&"fill"===this.verticalScaling?i.height=this.getAvailableSpace(t,void 0!==this.anchorRect?this.anchorRect.top:0,void 0!==this.anchorRect?this.anchorRect.bottom:0,void 0!==this.anchorRect?this.anchorRect.height:0,void 0!==this.viewportRect?this.viewportRect.top:0,void 0!==this.viewportRect?this.viewportRect.bottom:0):"anchor"===this.verticalScaling&&(i.height=void 0!==this.anchorRect?this.anchorRect.height:0),i},this.startAutoUpdateEventListeners=()=>{window.addEventListener(Wo,this.update,{passive:!0}),window.addEventListener(Xo,this.update,{passive:!0,capture:!0}),null!==this.resizeDetector&&null!==this.viewportElement&&this.resizeDetector.observe(this.viewportElement)},this.stopAutoUpdateEventListeners=()=>{window.removeEventListener(Wo,this.update),window.removeEventListener(Xo,this.update),null!==this.resizeDetector&&null!==this.viewportElement&&this.resizeDetector.unobserve(this.viewportElement)}}anchorChanged(){this.initialLayoutComplete&&(this.anchorElement=this.getAnchor())}viewportChanged(){this.initialLayoutComplete&&(this.viewportElement=this.getViewport())}horizontalPositioningModeChanged(){this.requestReset()}horizontalDefaultPositionChanged(){this.updateForAttributeChange()}horizontalViewportLockChanged(){this.updateForAttributeChange()}horizontalInsetChanged(){this.updateForAttributeChange()}horizontalThresholdChanged(){this.updateForAttributeChange()}horizontalScalingChanged(){this.updateForAttributeChange()}verticalPositioningModeChanged(){this.requestReset()}verticalDefaultPositionChanged(){this.updateForAttributeChange()}verticalViewportLockChanged(){this.updateForAttributeChange()}verticalInsetChanged(){this.updateForAttributeChange()}verticalThresholdChanged(){this.updateForAttributeChange()}verticalScalingChanged(){this.updateForAttributeChange()}fixedPlacementChanged(){this.$fastController.isConnected&&this.initialLayoutComplete&&this.initialize()}autoUpdateModeChanged(e,t){this.$fastController.isConnected&&this.initialLayoutComplete&&("auto"===e&&this.stopAutoUpdateEventListeners(),"auto"===t&&this.startAutoUpdateEventListeners())}anchorElementChanged(){this.requestReset()}viewportElementChanged(){this.$fastController.isConnected&&this.initialLayoutComplete&&this.initialize()}connectedCallback(){super.connectedCallback(),"auto"===this.autoUpdateMode&&this.startAutoUpdateEventListeners(),this.initialize()}disconnectedCallback(){super.disconnectedCallback(),"auto"===this.autoUpdateMode&&this.stopAutoUpdateEventListeners(),this.stopObservers(),this.disconnectResizeDetector()}adoptedCallback(){this.initialize()}disconnectResizeDetector(){null!==this.resizeDetector&&(this.resizeDetector.disconnect(),this.resizeDetector=null)}initializeResizeDetector(){this.disconnectResizeDetector(),this.resizeDetector=new window.ResizeObserver(this.handleResize)}updateForAttributeChange(){this.$fastController.isConnected&&this.initialLayoutComplete&&(this.forceUpdate=!0,this.update())}initialize(){this.initializeResizeDetector(),null===this.anchorElement&&(this.anchorElement=this.getAnchor()),this.requestReset()}requestReset(){this.$fastController.isConnected&&!1===this.pendingReset&&(this.setInitialState(),m.queueUpdate((()=>this.reset())),this.pendingReset=!0)}setInitialState(){this.initialLayoutComplete=!1,this.regionVisible=!1,this.translateX=0,this.translateY=0,this.baseHorizontalOffset=0,this.baseVerticalOffset=0,this.viewportRect=void 0,this.regionRect=void 0,this.anchorRect=void 0,this.verticalPosition=void 0,this.horizontalPosition=void 0,this.style.opacity="0",this.style.pointerEvents="none",this.forceUpdate=!1,this.style.position=this.fixedPlacement?"fixed":"absolute",this.updatePositionClasses(),this.updateRegionStyle()}}Go.intersectionService=new class{constructor(){this.intersectionDetector=null,this.observedElements=new Map,this.requestPosition=(e,t)=>{var i;null!==this.intersectionDetector&&(this.observedElements.has(e)?null===(i=this.observedElements.get(e))||void 0===i||i.push(t):(this.observedElements.set(e,[t]),this.intersectionDetector.observe(e)))},this.cancelRequestPosition=(e,t)=>{const i=this.observedElements.get(e);if(void 0!==i){const e=i.indexOf(t);-1!==e&&i.splice(e,1)}},this.initializeIntersectionDetector=()=>{r.IntersectionObserver&&(this.intersectionDetector=new IntersectionObserver(this.handleIntersection,{root:null,rootMargin:"0px",threshold:[0,1]}))},this.handleIntersection=e=>{if(null===this.intersectionDetector)return;const t=[],i=[];e.forEach((e=>{var s;null===(s=this.intersectionDetector)||void 0===s||s.unobserve(e.target);const n=this.observedElements.get(e.target);void 0!==n&&(n.forEach((s=>{let n=t.indexOf(s);-1===n&&(n=t.length,t.push(s),i.push([])),i[n].push(e)})),this.observedElements.delete(e.target))})),t.forEach(((e,t)=>{e(i[t])}))},this.initializeIntersectionDetector()}},H([L],Go.prototype,"anchor",void 0),H([L],Go.prototype,"viewport",void 0),H([L({attribute:"horizontal-positioning-mode"})],Go.prototype,"horizontalPositioningMode",void 0),H([L({attribute:"horizontal-default-position"})],Go.prototype,"horizontalDefaultPosition",void 0),H([L({attribute:"horizontal-viewport-lock",mode:"boolean"})],Go.prototype,"horizontalViewportLock",void 0),H([L({attribute:"horizontal-inset",mode:"boolean"})],Go.prototype,"horizontalInset",void 0),H([L({attribute:"horizontal-threshold"})],Go.prototype,"horizontalThreshold",void 0),H([L({attribute:"horizontal-scaling"})],Go.prototype,"horizontalScaling",void 0),H([L({attribute:"vertical-positioning-mode"})],Go.prototype,"verticalPositioningMode",void 0),H([L({attribute:"vertical-default-position"})],Go.prototype,"verticalDefaultPosition",void 0),H([L({attribute:"vertical-viewport-lock",mode:"boolean"})],Go.prototype,"verticalViewportLock",void 0),H([L({attribute:"vertical-inset",mode:"boolean"})],Go.prototype,"verticalInset",void 0),H([L({attribute:"vertical-threshold"})],Go.prototype,"verticalThreshold",void 0),H([L({attribute:"vertical-scaling"})],Go.prototype,"verticalScaling",void 0),H([L({attribute:"fixed-placement",mode:"boolean"})],Go.prototype,"fixedPlacement",void 0),H([L({attribute:"auto-update-mode"})],Go.prototype,"autoUpdateMode",void 0),H([w],Go.prototype,"anchorElement",void 0),H([w],Go.prototype,"viewportElement",void 0),H([w],Go.prototype,"initialLayoutComplete",void 0);const Ko=function(){if("boolean"==typeof ht)return ht;if("undefined"==typeof window||!window.document||!window.document.createElement)return ht=!1,ht;const e=document.createElement("style"),t=function(){const e=document.querySelector('meta[property="csp-nonce"]');return e?e.getAttribute("content"):null}();null!==t&&e.setAttribute("nonce",t),document.head.appendChild(e);try{e.sheet.insertRule("foo:focus-visible {color:inherit}",0),ht=!0}catch(e){ht=!1}finally{document.head.removeChild(e)}return ht}()?"focus-visible":"focus",Yo="not-allowed",Jo=$o`(${as} + ${cs}) * ${us}`;class Qo{constructor(e,t){this.cache=new WeakMap,this.ltr=e,this.rtl=t}bind(e){this.attach(e)}unbind(e){const t=this.cache.get(e);t&&rs.unsubscribe(t)}attach(e){const t=this.cache.get(e)||new ea(this.ltr,this.rtl,e),i=rs.getValueFor(e);rs.subscribe(t),t.attach(i),this.cache.set(e,t)}}class ea{constructor(e,t,i){this.ltr=e,this.rtl=t,this.source=i,this.attached=null}handleChange({target:e,token:t}){this.attach(t.getValueFor(this.source))}attach(e){this.attached!==this[e]&&(null!==this.attached&&this.source.$fastController.removeStyles(this.attached),this.attached=this[e],null!==this.attached&&this.source.$fastController.addStyles(this.attached))}}const ta=$o`
  font-family: ${gs};
  font-size: ${ys};
  line-height: ${bs};
  font-weight: initial;
  font-variation-settings: ${ws};
`,ia=($o`
  font-family: ${gs};
  font-size: ${xs};
  line-height: ${ks};
  font-weight: initial;
  font-variation-settings: ${$s};
`,$o`
  font-family: ${gs};
  font-size: ${Cs};
  line-height: ${_s};
  font-weight: initial;
  font-variation-settings: ${Ss};
`,$o`
  font-family: ${gs};
  font-size: ${Is};
  line-height: ${Ts};
  font-weight: initial;
  font-variation-settings: ${Os};
`,$o`
  font-family: ${gs};
  font-size: ${Fs};
  line-height: ${As};
  font-weight: initial;
  font-variation-settings: ${Es};
`,$o`
  font-family: ${gs};
  font-size: ${Ds};
  line-height: ${Rs};
  font-weight: initial;
  font-variation-settings: ${Vs};
`,$o`
  font-family: ${gs};
  font-size: ${Ns};
  line-height: ${Ps};
  font-weight: initial;
  font-variation-settings: ${Ls};
`,$o`
  font-family: ${gs};
  font-size: ${Ms};
  line-height: ${Bs};
  font-weight: initial;
  font-variation-settings: ${zs};
`,$o`
  font-family: ${gs};
  font-size: ${js};
  line-height: ${Hs};
  font-weight: initial;
  font-variation-settings: ${Zs};
`,$o`
  outline: calc(${fs} * 1px) solid ${uo};
  outline-offset: calc(${fs} * -1px);
`),sa=($o`
  outline: calc(${fs} * 1px) solid ${uo};
  outline-offset: calc(${ps} * 1px);
`,ai.compose({baseName:"menu-item",template:(e,t)=>Qt`
    <template
        role="${e=>e.role}"
        aria-haspopup="${e=>e.hasSubmenu?"menu":void 0}"
        aria-checked="${e=>e.role!==kt?e.checked:void 0}"
        aria-disabled="${e=>e.disabled}"
        aria-expanded="${e=>e.expanded}"
        @keydown="${(e,t)=>e.handleMenuItemKeyDown(t.event)}"
        @click="${(e,t)=>e.handleMenuItemClick(t.event)}"
        @mouseover="${(e,t)=>e.handleMouseOver(t.event)}"
        @mouseout="${(e,t)=>e.handleMouseOut(t.event)}"
        class="${e=>e.disabled?"disabled":""} ${e=>e.expanded?"expanded":""} ${e=>`indent-${e.startColumnCount}`}"
    >
            ${qo((e=>e.role===$t),Qt`
                    <div part="input-container" class="input-container">
                        <span part="checkbox" class="checkbox">
                            <slot name="checkbox-indicator">
                                ${t.checkboxIndicator||""}
                            </slot>
                        </span>
                    </div>
                `)}
            ${qo((e=>e.role===Ct),Qt`
                    <div part="input-container" class="input-container">
                        <span part="radio" class="radio">
                            <slot name="radio-indicator">
                                ${t.radioIndicator||""}
                            </slot>
                        </span>
                    </div>
                `)}
        </div>
        ${ni(0,t)}
        <span class="content" part="content">
            <slot></slot>
        </span>
        ${si(0,t)}
        ${qo((e=>e.hasSubmenu),Qt`
                <div
                    part="expand-collapse-glyph-container"
                    class="expand-collapse-glyph-container"
                >
                    <span part="expand-collapse" class="expand-collapse">
                        <slot name="expand-collapse-indicator">
                            ${t.expandCollapseGlyph||""}
                        </slot>
                    </span>
                </div>
            `)}
        ${qo((e=>e.expanded),Qt`
                <${e.tagFor(Go)}
                    :anchorElement="${e=>e}"
                    vertical-positioning-mode="dynamic"
                    vertical-default-position="bottom"
                    vertical-inset="true"
                    horizontal-positioning-mode="dynamic"
                    horizontal-default-position="end"
                    class="submenu-region"
                    dir="${e=>e.currentDirection}"
                    @loaded="${e=>e.submenuLoaded()}"
                    ${ti("submenuRegion")}
                    part="submenu-region"
                >
                    <slot name="submenu"></slot>
                </${e.tagFor(Go)}>
            `)}
    </template>
`,styles:(e,t)=>xo`
    ${Co("grid")} :host {
      contain: layout;
      overflow: visible;
      ${ta}
      box-sizing: border-box;
      height: calc(${Jo} * 1px);
      grid-template-columns: minmax(32px, auto) 1fr minmax(32px, auto);
      grid-template-rows: auto;
      justify-items: center;
      align-items: center;
      padding: 0;
      white-space: nowrap;
      color: ${Zr};
      fill: currentcolor;
      cursor: pointer;
      border-radius: calc(${ds} * 1px);
      border: calc(${ps} * 1px) solid transparent;
      position: relative;
    }

    :host(.indent-0) {
      grid-template-columns: auto 1fr minmax(32px, auto);
    }

    :host(.indent-0) .content {
      grid-column: 1;
      grid-row: 1;
      margin-inline-start: 10px;
    }

    :host(.indent-0) .expand-collapse-glyph-container {
      grid-column: 5;
      grid-row: 1;
    }

    :host(.indent-2) {
      grid-template-columns: minmax(32px, auto) minmax(32px, auto) 1fr minmax(32px, auto) minmax(32px, auto);
    }

    :host(.indent-2) .content {
      grid-column: 3;
      grid-row: 1;
      margin-inline-start: 10px;
    }

    :host(.indent-2) .expand-collapse-glyph-container {
      grid-column: 5;
      grid-row: 1;
    }

    :host(.indent-2) .start {
      grid-column: 2;
    }

    :host(.indent-2) .end {
      grid-column: 4;
    }

    :host(:${Ko}) {
      ${ia}
    }

    :host(:not([disabled]):hover) {
      background: ${Mr};
    }

    :host(:not([disabled]):active),
    :host(.expanded) {
      background: ${Br};
      color: ${Zr};
      z-index: 2;
    }

    :host([disabled]) {
      cursor: ${Yo};
      opacity: ${os};
    }

    .content {
      grid-column-start: 2;
      justify-self: start;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .start,
    .end {
      display: flex;
      justify-content: center;
    }

    :host(.indent-0[aria-haspopup='menu']) {
      display: grid;
      grid-template-columns: minmax(32px, auto) auto 1fr minmax(32px, auto) minmax(32px, auto);
      align-items: center;
      min-height: 32px;
    }

    :host(.indent-1[aria-haspopup='menu']),
    :host(.indent-1[role='menuitemcheckbox']),
    :host(.indent-1[role='menuitemradio']) {
      display: grid;
      grid-template-columns: minmax(32px, auto) auto 1fr minmax(32px, auto) minmax(32px, auto);
      align-items: center;
      min-height: 32px;
    }

    :host(.indent-2:not([aria-haspopup='menu'])) .end {
      grid-column: 5;
    }

    :host .input-container,
    :host .expand-collapse-glyph-container {
      display: none;
    }

    :host([aria-haspopup='menu']) .expand-collapse-glyph-container,
    :host([role='menuitemcheckbox']) .input-container,
    :host([role='menuitemradio']) .input-container {
      display: grid;
    }

    :host([aria-haspopup='menu']) .content,
    :host([role='menuitemcheckbox']) .content,
    :host([role='menuitemradio']) .content {
      grid-column-start: 3;
    }

    :host([aria-haspopup='menu'].indent-0) .content {
      grid-column-start: 1;
    }

    :host([aria-haspopup='menu']) .end,
    :host([role='menuitemcheckbox']) .end,
    :host([role='menuitemradio']) .end {
      grid-column-start: 4;
    }

    :host .expand-collapse,
    :host .checkbox,
    :host .radio {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-sizing: border-box;
    }

    :host .checkbox-indicator,
    :host .radio-indicator,
    slot[name='checkbox-indicator'],
    slot[name='radio-indicator'] {
      display: none;
    }

    ::slotted([slot='end']:not(svg)) {
      margin-inline-end: 10px;
      color: ${qr};
    }

    :host([aria-checked='true']) .checkbox-indicator,
    :host([aria-checked='true']) slot[name='checkbox-indicator'],
    :host([aria-checked='true']) .radio-indicator,
    :host([aria-checked='true']) slot[name='radio-indicator'] {
      display: flex;
    }
  `.withBehaviors(To(xo`
        :host,
        ::slotted([slot='end']:not(svg)) {
          forced-color-adjust: none;
          color: ${Oo.ButtonText};
          fill: currentcolor;
        }
        :host(:not([disabled]):hover) {
          background: ${Oo.Highlight};
          color: ${Oo.HighlightText};
          fill: currentcolor;
        }
        :host(:hover) .start,
        :host(:hover) .end,
        :host(:hover)::slotted(svg),
        :host(:active) .start,
        :host(:active) .end,
        :host(:active)::slotted(svg),
        :host(:hover) ::slotted([slot='end']:not(svg)),
        :host(:${Ko}) ::slotted([slot='end']:not(svg)) {
          color: ${Oo.HighlightText};
          fill: currentcolor;
        }
        :host(.expanded) {
          background: ${Oo.Highlight};
          color: ${Oo.HighlightText};
        }
        :host(:${Ko}) {
          background: ${Oo.Highlight};
          outline-color: ${Oo.ButtonText};
          color: ${Oo.HighlightText};
          fill: currentcolor;
        }
        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:hover) .start,
        :host([disabled]:hover) .end,
        :host([disabled]:hover)::slotted(svg),
        :host([disabled]:${Ko}) {
          background: ${Oo.ButtonFace};
          color: ${Oo.GrayText};
          fill: currentcolor;
          opacity: 1;
        }
        :host([disabled]:${Ko}) {
          outline-color: ${Oo.GrayText};
        }
        :host .expanded-toggle,
        :host .checkbox,
        :host .radio {
          border-color: ${Oo.ButtonText};
          background: ${Oo.HighlightText};
        }
        :host([checked]) .checkbox,
        :host([checked]) .radio {
          background: ${Oo.HighlightText};
          border-color: ${Oo.HighlightText};
        }
        :host(:hover) .expanded-toggle,
            :host(:hover) .checkbox,
            :host(:hover) .radio,
            :host(:${Ko}) .expanded-toggle,
            :host(:${Ko}) .checkbox,
            :host(:${Ko}) .radio,
            :host([checked]:hover) .checkbox,
            :host([checked]:hover) .radio,
            :host([checked]:${Ko}) .checkbox,
            :host([checked]:${Ko}) .radio {
          border-color: ${Oo.HighlightText};
        }
        :host([aria-checked='true']) {
          background: ${Oo.Highlight};
          color: ${Oo.HighlightText};
        }
        :host([aria-checked='true']) .checkbox-indicator,
        :host([aria-checked='true']) ::slotted([slot='checkbox-indicator']),
        :host([aria-checked='true']) ::slotted([slot='radio-indicator']) {
          fill: ${Oo.Highlight};
        }
        :host([aria-checked='true']) .radio-indicator {
          background: ${Oo.Highlight};
        }
      `),new Qo(xo`
        .expand-collapse-glyph-container {
          transform: rotate(0deg);
        }
      `,xo`
        .expand-collapse-glyph-container {
          transform: rotate(180deg);
        }
      `)),checkboxIndicator:'\n    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">\n      <path d="M13.86 3.66a.5.5 0 01-.02.7l-7.93 7.48a.6.6 0 01-.84-.02L2.4 9.1a.5.5 0 01.72-.7l2.4 2.44 7.65-7.2a.5.5 0 01.7.02z"/>\n    </svg>\n  ',expandCollapseGlyph:'\n    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">\n      <path d="M5.65 3.15a.5.5 0 000 .7L9.79 8l-4.14 4.15a.5.5 0 00.7.7l4.5-4.5a.5.5 0 000-.7l-4.5-4.5a.5.5 0 00-.7 0z"/>\n    </svg>\n  ',radioIndicator:'\n    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">\n      <circle cx="8" cy="8" r="2"/>\n    </svg>\n  '}));class na extends Ve{constructor(){super(...arguments),this.percentComplete=0}valueChanged(){this.$fastController.isConnected&&this.updatePercentComplete()}minChanged(){this.$fastController.isConnected&&this.updatePercentComplete()}maxChanged(){this.$fastController.isConnected&&this.updatePercentComplete()}connectedCallback(){super.connectedCallback(),this.updatePercentComplete()}updatePercentComplete(){const e="number"==typeof this.min?this.min:0,t="number"==typeof this.max?this.max:100,i="number"==typeof this.value?this.value:0,s=t-e;this.percentComplete=0===s?0:Math.fround((i-e)/s*100)}}H([L({converter:N})],na.prototype,"value",void 0),H([L({converter:N})],na.prototype,"min",void 0),H([L({converter:N})],na.prototype,"max",void 0),H([L({mode:"boolean"})],na.prototype,"paused",void 0),H([w],na.prototype,"percentComplete",void 0);const ra=class extends na{}.compose({baseName:"progress-ring",template:(e,t)=>Qt`
    <template
        role="progressbar"
        aria-valuenow="${e=>e.value}"
        aria-valuemin="${e=>e.min}"
        aria-valuemax="${e=>e.max}"
        class="${e=>e.paused?"paused":""}"
    >
        ${qo((e=>"number"==typeof e.value),Qt`
                <svg
                    class="progress"
                    part="progress"
                    viewBox="0 0 16 16"
                    slot="determinate"
                >
                    <circle
                        class="background"
                        part="background"
                        cx="8px"
                        cy="8px"
                        r="7px"
                    ></circle>
                    <circle
                        class="determinate"
                        part="determinate"
                        style="stroke-dasharray: ${e=>44*e.percentComplete/100}px ${44}px"
                        cx="8px"
                        cy="8px"
                        r="7px"
                    ></circle>
                </svg>
            `,Qt`
                <slot name="indeterminate" slot="indeterminate">
                    ${t.indeterminateIndicator||""}
                </slot>
            `)}
    </template>
`,styles:(e,t)=>xo`
    ${Co("flex")} :host {
      align-items: center;
      height: calc(${Jo} * 1px);
      width: calc(${Jo} * 1px);
    }

    .progress {
      height: 100%;
      width: 100%;
    }

    .background {
      fill: none;
      stroke-width: 2px;
    }

    .determinate {
      stroke: ${rr};
      fill: none;
      stroke-width: 2px;
      stroke-linecap: round;
      transform-origin: 50% 50%;
      transform: rotate(-90deg);
      transition: all 0.2s ease-in-out;
    }

    .indeterminate-indicator-1 {
      stroke: ${rr};
      fill: none;
      stroke-width: 2px;
      stroke-linecap: round;
      transform-origin: 50% 50%;
      transform: rotate(-90deg);
      transition: all 0.2s ease-in-out;
      animation: spin-infinite 2s linear infinite;
    }

    :host(.paused) .indeterminate-indicator-1 {
      animation: none;
      stroke: ${qr};
    }

    :host(.paused) .determinate {
      stroke: ${qr};
    }

    @keyframes spin-infinite {
      0% {
        stroke-dasharray: 0.01px 43.97px;
        transform: rotate(0deg);
      }
      50% {
        stroke-dasharray: 21.99px 21.99px;
        transform: rotate(450deg);
      }
      100% {
        stroke-dasharray: 0.01px 43.97px;
        transform: rotate(1080deg);
      }
    }
  `.withBehaviors(To(xo`
        .background {
          stroke: ${Oo.Field};
        }
        .determinate,
        .indeterminate-indicator-1 {
          stroke: ${Oo.ButtonText};
        }
        :host(.paused) .determinate,
        :host(.paused) .indeterminate-indicator-1 {
          stroke: ${Oo.GrayText};
        }
      `)),indeterminateIndicator:'\n    <svg class="progress" part="progress" viewBox="0 0 16 16">\n        <circle\n            class="background"\n            part="background"\n            cx="8px"\n            cy="8px"\n            r="7px"\n        ></circle>\n        <circle\n            class="indeterminate-indicator-1"\n            part="indeterminate-indicator-1"\n            cx="8px"\n            cy="8px"\n            r="7px"\n        ></circle>\n    </svg>\n  '});function oa(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o}Object.create,Object.create,"function"==typeof SuppressedError&&SuppressedError;let aa=0;function la(e=""){return`${e}${aa++}`}class ca{}function ua(e){return dt(e)&&("option"===e.getAttribute("role")||e instanceof HTMLOptionElement)}H([L({attribute:"aria-atomic"})],ca.prototype,"ariaAtomic",void 0),H([L({attribute:"aria-busy"})],ca.prototype,"ariaBusy",void 0),H([L({attribute:"aria-controls"})],ca.prototype,"ariaControls",void 0),H([L({attribute:"aria-current"})],ca.prototype,"ariaCurrent",void 0),H([L({attribute:"aria-describedby"})],ca.prototype,"ariaDescribedby",void 0),H([L({attribute:"aria-details"})],ca.prototype,"ariaDetails",void 0),H([L({attribute:"aria-disabled"})],ca.prototype,"ariaDisabled",void 0),H([L({attribute:"aria-errormessage"})],ca.prototype,"ariaErrormessage",void 0),H([L({attribute:"aria-flowto"})],ca.prototype,"ariaFlowto",void 0),H([L({attribute:"aria-haspopup"})],ca.prototype,"ariaHaspopup",void 0),H([L({attribute:"aria-hidden"})],ca.prototype,"ariaHidden",void 0),H([L({attribute:"aria-invalid"})],ca.prototype,"ariaInvalid",void 0),H([L({attribute:"aria-keyshortcuts"})],ca.prototype,"ariaKeyshortcuts",void 0),H([L({attribute:"aria-label"})],ca.prototype,"ariaLabel",void 0),H([L({attribute:"aria-labelledby"})],ca.prototype,"ariaLabelledby",void 0),H([L({attribute:"aria-live"})],ca.prototype,"ariaLive",void 0),H([L({attribute:"aria-owns"})],ca.prototype,"ariaOwns",void 0),H([L({attribute:"aria-relevant"})],ca.prototype,"ariaRelevant",void 0),H([L({attribute:"aria-roledescription"})],ca.prototype,"ariaRoledescription",void 0);class da extends Ve{constructor(e,t,i,s){super(),this.defaultSelected=!1,this.dirtySelected=!1,this.selected=this.defaultSelected,this.dirtyValue=!1,e&&(this.textContent=e),t&&(this.initialValue=t),i&&(this.defaultSelected=i),s&&(this.selected=s),this.proxy=new Option(`${this.textContent}`,this.initialValue,this.defaultSelected,this.selected),this.proxy.disabled=this.disabled}checkedChanged(e,t){this.ariaChecked="boolean"!=typeof t?null:t?"true":"false"}contentChanged(e,t){this.proxy instanceof HTMLOptionElement&&(this.proxy.textContent=this.textContent),this.$emit("contentchange",null,{bubbles:!0})}defaultSelectedChanged(){this.dirtySelected||(this.selected=this.defaultSelected,this.proxy instanceof HTMLOptionElement&&(this.proxy.selected=this.defaultSelected))}disabledChanged(e,t){this.ariaDisabled=this.disabled?"true":"false",this.proxy instanceof HTMLOptionElement&&(this.proxy.disabled=this.disabled)}selectedAttributeChanged(){this.defaultSelected=this.selectedAttribute,this.proxy instanceof HTMLOptionElement&&(this.proxy.defaultSelected=this.defaultSelected)}selectedChanged(){this.ariaSelected=this.selected?"true":"false",this.dirtySelected||(this.dirtySelected=!0),this.proxy instanceof HTMLOptionElement&&(this.proxy.selected=this.selected)}initialValueChanged(e,t){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}get label(){var e;return null!==(e=this.value)&&void 0!==e?e:this.text}get text(){var e,t;return null!==(t=null===(e=this.textContent)||void 0===e?void 0:e.replace(/\s+/g," ").trim())&&void 0!==t?t:""}set value(e){const t=`${null!=e?e:""}`;this._value=t,this.dirtyValue=!0,this.proxy instanceof HTMLOptionElement&&(this.proxy.value=t),b.notify(this,"value")}get value(){var e;return b.track(this,"value"),null!==(e=this._value)&&void 0!==e?e:this.text}get form(){return this.proxy?this.proxy.form:null}}H([w],da.prototype,"checked",void 0),H([w],da.prototype,"content",void 0),H([w],da.prototype,"defaultSelected",void 0),H([L({mode:"boolean"})],da.prototype,"disabled",void 0),H([L({attribute:"selected",mode:"boolean"})],da.prototype,"selectedAttribute",void 0),H([w],da.prototype,"selected",void 0),H([L({attribute:"value",mode:"fromView"})],da.prototype,"initialValue",void 0);class ha{}H([w],ha.prototype,"ariaChecked",void 0),H([w],ha.prototype,"ariaPosInSet",void 0),H([w],ha.prototype,"ariaSelected",void 0),H([w],ha.prototype,"ariaSetSize",void 0),oi(ha,ca),oi(da,ii,ha);class pa extends Ve{constructor(){super(...arguments),this._options=[],this.selectedIndex=-1,this.selectedOptions=[],this.shouldSkipFocus=!1,this.typeaheadBuffer="",this.typeaheadExpired=!0,this.typeaheadTimeout=-1}get firstSelectedOption(){var e;return null!==(e=this.selectedOptions[0])&&void 0!==e?e:null}get hasSelectableOptions(){return this.options.length>0&&!this.options.every((e=>e.disabled))}get length(){var e,t;return null!==(t=null===(e=this.options)||void 0===e?void 0:e.length)&&void 0!==t?t:0}get options(){return b.track(this,"options"),this._options}set options(e){this._options=e,b.notify(this,"options")}get typeAheadExpired(){return this.typeaheadExpired}set typeAheadExpired(e){this.typeaheadExpired=e}clickHandler(e){const t=e.target.closest("option,[role=option]");if(t&&!t.disabled)return this.selectedIndex=this.options.indexOf(t),!0}focusAndScrollOptionIntoView(e=this.firstSelectedOption){this.contains(document.activeElement)&&null!==e&&(e.focus(),requestAnimationFrame((()=>{e.scrollIntoView({block:"nearest"})})))}focusinHandler(e){this.shouldSkipFocus||e.target!==e.currentTarget||(this.setSelectedOptions(),this.focusAndScrollOptionIntoView()),this.shouldSkipFocus=!1}getTypeaheadMatches(){const e=this.typeaheadBuffer.replace(/[.*+\-?^${}()|[\]\\]/g,"\\$&"),t=new RegExp(`^${e}`,"gi");return this.options.filter((e=>e.text.trim().match(t)))}getSelectableIndex(e=this.selectedIndex,t){const i=e>t?-1:e<t?1:0,s=e+i;let n=null;switch(i){case-1:n=this.options.reduceRight(((e,t,i)=>!e&&!t.disabled&&i<s?t:e),n);break;case 1:n=this.options.reduce(((e,t,i)=>!e&&!t.disabled&&i>s?t:e),n)}return this.options.indexOf(n)}handleChange(e,t){"selected"===t&&(pa.slottedOptionFilter(e)&&(this.selectedIndex=this.options.indexOf(e)),this.setSelectedOptions())}handleTypeAhead(e){this.typeaheadTimeout&&window.clearTimeout(this.typeaheadTimeout),this.typeaheadTimeout=window.setTimeout((()=>this.typeaheadExpired=!0),pa.TYPE_AHEAD_TIMEOUT_MS),e.length>1||(this.typeaheadBuffer=`${this.typeaheadExpired?"":this.typeaheadBuffer}${e}`)}keydownHandler(e){if(this.disabled)return!0;this.shouldSkipFocus=!1;const t=e.key;switch(t){case yt:e.shiftKey||(e.preventDefault(),this.selectFirstOption());break;case ft:e.shiftKey||(e.preventDefault(),this.selectNextOption());break;case gt:e.shiftKey||(e.preventDefault(),this.selectPreviousOption());break;case bt:e.preventDefault(),this.selectLastOption();break;case xt:return this.focusAndScrollOptionIntoView(),!0;case mt:case vt:return!0;case wt:if(this.typeaheadExpired)return!0;default:return 1===t.length&&this.handleTypeAhead(`${t}`),!0}}mousedownHandler(e){return this.shouldSkipFocus=!this.contains(document.activeElement),!0}multipleChanged(e,t){this.ariaMultiSelectable=t?"true":null}selectedIndexChanged(e,t){var i;if(this.hasSelectableOptions){if((null===(i=this.options[this.selectedIndex])||void 0===i?void 0:i.disabled)&&"number"==typeof e){const i=this.getSelectableIndex(e,t),s=i>-1?i:e;return this.selectedIndex=s,void(t===s&&this.selectedIndexChanged(t,s))}this.setSelectedOptions()}else this.selectedIndex=-1}selectedOptionsChanged(e,t){var i;const s=t.filter(pa.slottedOptionFilter);null===(i=this.options)||void 0===i||i.forEach((e=>{const t=b.getNotifier(e);t.unsubscribe(this,"selected"),e.selected=s.includes(e),t.subscribe(this,"selected")}))}selectFirstOption(){var e,t;this.disabled||(this.selectedIndex=null!==(t=null===(e=this.options)||void 0===e?void 0:e.findIndex((e=>!e.disabled)))&&void 0!==t?t:-1)}selectLastOption(){this.disabled||(this.selectedIndex=function(e){let t=e.length;for(;t--;)if(!e[t].disabled)return t;return-1}(this.options))}selectNextOption(){!this.disabled&&this.selectedIndex<this.options.length-1&&(this.selectedIndex+=1)}selectPreviousOption(){!this.disabled&&this.selectedIndex>0&&(this.selectedIndex=this.selectedIndex-1)}setDefaultSelectedOption(){var e,t;this.selectedIndex=null!==(t=null===(e=this.options)||void 0===e?void 0:e.findIndex((e=>e.defaultSelected)))&&void 0!==t?t:-1}setSelectedOptions(){var e,t,i;(null===(e=this.options)||void 0===e?void 0:e.length)&&(this.selectedOptions=[this.options[this.selectedIndex]],this.ariaActiveDescendant=null!==(i=null===(t=this.firstSelectedOption)||void 0===t?void 0:t.id)&&void 0!==i?i:"",this.focusAndScrollOptionIntoView())}slottedOptionsChanged(e,t){this.options=t.reduce(((e,t)=>(ua(t)&&e.push(t),e)),[]);const i=`${this.options.length}`;this.options.forEach(((e,t)=>{e.id||(e.id=la("option-")),e.ariaPosInSet=`${t+1}`,e.ariaSetSize=i})),this.$fastController.isConnected&&(this.setSelectedOptions(),this.setDefaultSelectedOption())}typeaheadBufferChanged(e,t){if(this.$fastController.isConnected){const e=this.getTypeaheadMatches();if(e.length){const t=this.options.indexOf(e[0]);t>-1&&(this.selectedIndex=t)}this.typeaheadExpired=!1}}}pa.slottedOptionFilter=e=>ua(e)&&!e.hidden,pa.TYPE_AHEAD_TIMEOUT_MS=1e3,H([L({mode:"boolean"})],pa.prototype,"disabled",void 0),H([w],pa.prototype,"selectedIndex",void 0),H([w],pa.prototype,"selectedOptions",void 0),H([w],pa.prototype,"slottedOptions",void 0),H([w],pa.prototype,"typeaheadBuffer",void 0);class fa{}function ga(e,t,i=0){return[t,i]=[t,i].sort(((e,t)=>e-t)),t<=e&&e<i}H([w],fa.prototype,"ariaActiveDescendant",void 0),H([w],fa.prototype,"ariaDisabled",void 0),H([w],fa.prototype,"ariaExpanded",void 0),H([w],fa.prototype,"ariaMultiSelectable",void 0),oi(fa,ca),oi(pa,fa);class ma extends pa{constructor(){super(...arguments),this.activeIndex=-1,this.rangeStartIndex=-1}get activeOption(){return this.options[this.activeIndex]}get checkedOptions(){var e;return null===(e=this.options)||void 0===e?void 0:e.filter((e=>e.checked))}get firstSelectedOptionIndex(){return this.options.indexOf(this.firstSelectedOption)}activeIndexChanged(e,t){var i,s;this.ariaActiveDescendant=null!==(s=null===(i=this.options[t])||void 0===i?void 0:i.id)&&void 0!==s?s:"",this.focusAndScrollOptionIntoView()}checkActiveIndex(){if(!this.multiple)return;const e=this.activeOption;e&&(e.checked=!0)}checkFirstOption(e=!1){e?(-1===this.rangeStartIndex&&(this.rangeStartIndex=this.activeIndex+1),this.options.forEach(((e,t)=>{e.checked=ga(t,this.rangeStartIndex)}))):this.uncheckAllOptions(),this.activeIndex=0,this.checkActiveIndex()}checkLastOption(e=!1){e?(-1===this.rangeStartIndex&&(this.rangeStartIndex=this.activeIndex),this.options.forEach(((e,t)=>{e.checked=ga(t,this.rangeStartIndex,this.options.length)}))):this.uncheckAllOptions(),this.activeIndex=this.options.length-1,this.checkActiveIndex()}connectedCallback(){super.connectedCallback(),this.addEventListener("focusout",this.focusoutHandler)}disconnectedCallback(){this.removeEventListener("focusout",this.focusoutHandler),super.disconnectedCallback()}checkNextOption(e=!1){e?(-1===this.rangeStartIndex&&(this.rangeStartIndex=this.activeIndex),this.options.forEach(((e,t)=>{e.checked=ga(t,this.rangeStartIndex,this.activeIndex+1)}))):this.uncheckAllOptions(),this.activeIndex+=this.activeIndex<this.options.length-1?1:0,this.checkActiveIndex()}checkPreviousOption(e=!1){e?(-1===this.rangeStartIndex&&(this.rangeStartIndex=this.activeIndex),1===this.checkedOptions.length&&(this.rangeStartIndex+=1),this.options.forEach(((e,t)=>{e.checked=ga(t,this.activeIndex,this.rangeStartIndex)}))):this.uncheckAllOptions(),this.activeIndex-=this.activeIndex>0?1:0,this.checkActiveIndex()}clickHandler(e){var t;if(!this.multiple)return super.clickHandler(e);const i=null===(t=e.target)||void 0===t?void 0:t.closest("[role=option]");return i&&!i.disabled?(this.uncheckAllOptions(),this.activeIndex=this.options.indexOf(i),this.checkActiveIndex(),this.toggleSelectedForAllCheckedOptions(),!0):void 0}focusAndScrollOptionIntoView(){super.focusAndScrollOptionIntoView(this.activeOption)}focusinHandler(e){if(!this.multiple)return super.focusinHandler(e);this.shouldSkipFocus||e.target!==e.currentTarget||(this.uncheckAllOptions(),-1===this.activeIndex&&(this.activeIndex=-1!==this.firstSelectedOptionIndex?this.firstSelectedOptionIndex:0),this.checkActiveIndex(),this.setSelectedOptions(),this.focusAndScrollOptionIntoView()),this.shouldSkipFocus=!1}focusoutHandler(e){this.multiple&&this.uncheckAllOptions()}keydownHandler(e){if(!this.multiple)return super.keydownHandler(e);if(this.disabled)return!0;const{key:t,shiftKey:i}=e;switch(this.shouldSkipFocus=!1,t){case yt:return void this.checkFirstOption(i);case ft:return void this.checkNextOption(i);case gt:return void this.checkPreviousOption(i);case bt:return void this.checkLastOption(i);case xt:return this.focusAndScrollOptionIntoView(),!0;case vt:return this.uncheckAllOptions(),this.checkActiveIndex(),!0;case wt:if(e.preventDefault(),this.typeAheadExpired)return void this.toggleSelectedForAllCheckedOptions();default:return 1===t.length&&this.handleTypeAhead(`${t}`),!0}}mousedownHandler(e){if(e.offsetX>=0&&e.offsetX<=this.scrollWidth)return super.mousedownHandler(e)}multipleChanged(e,t){var i;this.ariaMultiSelectable=t?"true":null,null===(i=this.options)||void 0===i||i.forEach((e=>{e.checked=!t&&void 0})),this.setSelectedOptions()}setSelectedOptions(){this.multiple?this.$fastController.isConnected&&this.options&&(this.selectedOptions=this.options.filter((e=>e.selected)),this.focusAndScrollOptionIntoView()):super.setSelectedOptions()}sizeChanged(e,t){var i;const s=Math.max(0,parseInt(null!==(i=null==t?void 0:t.toFixed())&&void 0!==i?i:"",10));s!==t&&m.queueUpdate((()=>{this.size=s}))}toggleSelectedForAllCheckedOptions(){const e=this.checkedOptions.filter((e=>!e.disabled)),t=!e.every((e=>e.selected));e.forEach((e=>e.selected=t)),this.selectedIndex=this.options.indexOf(e[e.length-1]),this.setSelectedOptions()}typeaheadBufferChanged(e,t){if(this.multiple){if(this.$fastController.isConnected){const e=this.getTypeaheadMatches(),t=this.options.indexOf(e[0]);t>-1&&(this.activeIndex=t,this.uncheckAllOptions(),this.checkActiveIndex()),this.typeAheadExpired=!1}}else super.typeaheadBufferChanged(e,t)}uncheckAllOptions(e=!1){this.options.forEach((e=>e.checked=!this.multiple&&void 0)),e||(this.rangeStartIndex=-1)}}H([w],ma.prototype,"activeIndex",void 0),H([L({mode:"boolean"})],ma.prototype,"multiple",void 0),H([L({converter:N})],ma.prototype,"size",void 0);const va="form-associated-proxy",ya="ElementInternals",ba=ya in window&&"setFormValue"in window[ya].prototype,wa=new WeakMap;function xa(e){const t=class extends e{constructor(...e){super(...e),this.dirtyValue=!1,this.disabled=!1,this.proxyEventsToBlock=["change","click"],this.proxyInitialized=!1,this.required=!1,this.initialValue=this.initialValue||"",this.elementInternals||(this.formResetCallback=this.formResetCallback.bind(this))}static get formAssociated(){return ba}get validity(){return this.elementInternals?this.elementInternals.validity:this.proxy.validity}get form(){return this.elementInternals?this.elementInternals.form:this.proxy.form}get validationMessage(){return this.elementInternals?this.elementInternals.validationMessage:this.proxy.validationMessage}get willValidate(){return this.elementInternals?this.elementInternals.willValidate:this.proxy.willValidate}get labels(){if(this.elementInternals)return Object.freeze(Array.from(this.elementInternals.labels));if(this.proxy instanceof HTMLElement&&this.proxy.ownerDocument&&this.id){const e=this.proxy.labels,t=Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)),i=e?t.concat(Array.from(e)):t;return Object.freeze(i)}return l}valueChanged(e,t){this.dirtyValue=!0,this.proxy instanceof HTMLElement&&(this.proxy.value=this.value),this.currentValue=this.value,this.setFormValue(this.value),this.validate()}currentValueChanged(){this.value=this.currentValue}initialValueChanged(e,t){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}disabledChanged(e,t){this.proxy instanceof HTMLElement&&(this.proxy.disabled=this.disabled),m.queueUpdate((()=>this.classList.toggle("disabled",this.disabled)))}nameChanged(e,t){this.proxy instanceof HTMLElement&&(this.proxy.name=this.name)}requiredChanged(e,t){this.proxy instanceof HTMLElement&&(this.proxy.required=this.required),m.queueUpdate((()=>this.classList.toggle("required",this.required))),this.validate()}get elementInternals(){if(!ba)return null;let e=wa.get(this);return e||(e=this.attachInternals(),wa.set(this,e)),e}connectedCallback(){super.connectedCallback(),this.addEventListener("keypress",this._keypressHandler),this.value||(this.value=this.initialValue,this.dirtyValue=!1),this.elementInternals||(this.attachProxy(),this.form&&this.form.addEventListener("reset",this.formResetCallback))}disconnectedCallback(){super.disconnectedCallback(),this.proxyEventsToBlock.forEach((e=>this.proxy.removeEventListener(e,this.stopPropagation))),!this.elementInternals&&this.form&&this.form.removeEventListener("reset",this.formResetCallback)}checkValidity(){return this.elementInternals?this.elementInternals.checkValidity():this.proxy.checkValidity()}reportValidity(){return this.elementInternals?this.elementInternals.reportValidity():this.proxy.reportValidity()}setValidity(e,t,i){this.elementInternals?this.elementInternals.setValidity(e,t,i):"string"==typeof t&&this.proxy.setCustomValidity(t)}formDisabledCallback(e){this.disabled=e}formResetCallback(){this.value=this.initialValue,this.dirtyValue=!1}attachProxy(){var e;this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.display="none",this.proxyEventsToBlock.forEach((e=>this.proxy.addEventListener(e,this.stopPropagation))),this.proxy.disabled=this.disabled,this.proxy.required=this.required,"string"==typeof this.name&&(this.proxy.name=this.name),"string"==typeof this.value&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",va),this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",va)),null===(e=this.shadowRoot)||void 0===e||e.appendChild(this.proxySlot),this.appendChild(this.proxy)}detachProxy(){var e;this.removeChild(this.proxy),null===(e=this.shadowRoot)||void 0===e||e.removeChild(this.proxySlot)}validate(e){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage,e)}setFormValue(e,t){this.elementInternals&&this.elementInternals.setFormValue(e,t||e)}_keypressHandler(e){if(e.key===mt&&this.form instanceof HTMLFormElement){const e=this.form.querySelector("[type=submit]");null==e||e.click()}}stopPropagation(e){e.stopPropagation()}};return L({mode:"boolean"})(t.prototype,"disabled"),L({mode:"fromView",attribute:"value"})(t.prototype,"initialValue"),L({attribute:"current-value"})(t.prototype,"currentValue"),L(t.prototype,"name"),L({mode:"boolean"})(t.prototype,"required"),w(t.prototype,"value"),t}class ka extends ma{}class $a extends(xa(ka)){constructor(){super(...arguments),this.proxy=document.createElement("select")}}const Ca="above";class _a extends $a{constructor(){super(...arguments),this.open=!1,this.forcedPosition=!1,this.listboxId=la("listbox-"),this.maxHeight=0}openChanged(e,t){if(this.collapsible){if(this.open)return this.ariaControls=this.listboxId,this.ariaExpanded="true",this.setPositioning(),this.focusAndScrollOptionIntoView(),this.indexWhenOpened=this.selectedIndex,void m.queueUpdate((()=>this.focus()));this.ariaControls="",this.ariaExpanded="false"}}get collapsible(){return!(this.multiple||"number"==typeof this.size)}get value(){return b.track(this,"value"),this._value}set value(e){var t,i,s,n,r,o,a;const l=`${this._value}`;if(null===(t=this._options)||void 0===t?void 0:t.length){const t=this._options.findIndex((t=>t.value===e)),l=null!==(s=null===(i=this._options[this.selectedIndex])||void 0===i?void 0:i.value)&&void 0!==s?s:null,c=null!==(r=null===(n=this._options[t])||void 0===n?void 0:n.value)&&void 0!==r?r:null;-1!==t&&l===c||(e="",this.selectedIndex=t),e=null!==(a=null===(o=this.firstSelectedOption)||void 0===o?void 0:o.value)&&void 0!==a?a:e}l!==e&&(this._value=e,super.valueChanged(l,e),b.notify(this,"value"),this.updateDisplayValue())}updateValue(e){var t,i;this.$fastController.isConnected&&(this.value=null!==(i=null===(t=this.firstSelectedOption)||void 0===t?void 0:t.value)&&void 0!==i?i:""),e&&(this.$emit("input"),this.$emit("change",this,{bubbles:!0,composed:void 0}))}selectedIndexChanged(e,t){super.selectedIndexChanged(e,t),this.updateValue()}positionChanged(e,t){this.positionAttribute=t,this.setPositioning()}setPositioning(){const e=this.getBoundingClientRect(),t=window.innerHeight-e.bottom;this.position=this.forcedPosition?this.positionAttribute:e.top>t?Ca:"below",this.positionAttribute=this.forcedPosition?this.positionAttribute:this.position,this.maxHeight=this.position===Ca?~~e.top:~~t}get displayValue(){var e,t;return b.track(this,"displayValue"),null!==(t=null===(e=this.firstSelectedOption)||void 0===e?void 0:e.text)&&void 0!==t?t:""}disabledChanged(e,t){super.disabledChanged&&super.disabledChanged(e,t),this.ariaDisabled=this.disabled?"true":"false"}formResetCallback(){this.setProxyOptions(),super.setDefaultSelectedOption(),-1===this.selectedIndex&&(this.selectedIndex=0)}clickHandler(e){if(!this.disabled){if(this.open){const t=e.target.closest("option,[role=option]");if(t&&t.disabled)return}return super.clickHandler(e),this.open=this.collapsible&&!this.open,this.open||this.indexWhenOpened===this.selectedIndex||this.updateValue(!0),!0}}focusoutHandler(e){var t;if(super.focusoutHandler(e),!this.open)return!0;const i=e.relatedTarget;this.isSameNode(i)?this.focus():(null===(t=this.options)||void 0===t?void 0:t.includes(i))||(this.open=!1,this.indexWhenOpened!==this.selectedIndex&&this.updateValue(!0))}handleChange(e,t){super.handleChange(e,t),"value"===t&&this.updateValue()}slottedOptionsChanged(e,t){this.options.forEach((e=>{b.getNotifier(e).unsubscribe(this,"value")})),super.slottedOptionsChanged(e,t),this.options.forEach((e=>{b.getNotifier(e).subscribe(this,"value")})),this.setProxyOptions(),this.updateValue()}mousedownHandler(e){var t;return e.offsetX>=0&&e.offsetX<=(null===(t=this.listbox)||void 0===t?void 0:t.scrollWidth)?super.mousedownHandler(e):this.collapsible}multipleChanged(e,t){super.multipleChanged(e,t),this.proxy&&(this.proxy.multiple=t)}selectedOptionsChanged(e,t){var i;super.selectedOptionsChanged(e,t),null===(i=this.options)||void 0===i||i.forEach(((e,t)=>{var i;const s=null===(i=this.proxy)||void 0===i?void 0:i.options.item(t);s&&(s.selected=e.selected)}))}setDefaultSelectedOption(){var e;const t=null!==(e=this.options)&&void 0!==e?e:Array.from(this.children).filter(pa.slottedOptionFilter),i=null==t?void 0:t.findIndex((e=>e.hasAttribute("selected")||e.selected||e.value===this.value));this.selectedIndex=-1===i?0:i}setProxyOptions(){this.proxy instanceof HTMLSelectElement&&this.options&&(this.proxy.options.length=0,this.options.forEach((e=>{const t=e.proxy||(e instanceof HTMLOptionElement?e.cloneNode():null);t&&this.proxy.options.add(t)})))}keydownHandler(e){super.keydownHandler(e);const t=e.key||e.key.charCodeAt(0);switch(t){case wt:e.preventDefault(),this.collapsible&&this.typeAheadExpired&&(this.open=!this.open);break;case yt:case bt:e.preventDefault();break;case mt:e.preventDefault(),this.open=!this.open;break;case vt:this.collapsible&&this.open&&(e.preventDefault(),this.open=!1);break;case xt:return this.collapsible&&this.open&&(e.preventDefault(),this.open=!1),!0}return this.open||this.indexWhenOpened===this.selectedIndex||(this.updateValue(!0),this.indexWhenOpened=this.selectedIndex),!(t===ft||t===gt)}connectedCallback(){super.connectedCallback(),this.forcedPosition=!!this.positionAttribute,this.addEventListener("contentchange",this.updateDisplayValue)}disconnectedCallback(){this.removeEventListener("contentchange",this.updateDisplayValue),super.disconnectedCallback()}sizeChanged(e,t){super.sizeChanged(e,t),this.proxy&&(this.proxy.size=t)}updateDisplayValue(){this.collapsible&&b.notify(this,"displayValue")}}H([L({attribute:"open",mode:"boolean"})],_a.prototype,"open",void 0),H([function(e,t,i){return Object.assign({},i,{get:function(){return b.trackVolatile(),i.get.apply(this)}})}],_a.prototype,"collapsible",null),H([w],_a.prototype,"control",void 0),H([L({attribute:"position"})],_a.prototype,"positionAttribute",void 0),H([w],_a.prototype,"position",void 0),H([w],_a.prototype,"maxHeight",void 0);class Sa{}H([w],Sa.prototype,"ariaControls",void 0),oi(Sa,fa),oi(_a,ii,Sa);class Ia{constructor(e,t,i){this.propertyName=e,this.value=t,this.styles=i}bind(e){b.getNotifier(e).subscribe(this,this.propertyName),this.handleChange(e,this.propertyName)}unbind(e){b.getNotifier(e).unsubscribe(this,this.propertyName),e.$fastController.removeStyles(this.styles)}handleChange(e,t){e[t]===this.value?e.$fastController.addStyles(this.styles):e.$fastController.removeStyles(this.styles)}}function Ta(e,t){return new Ia("appearance",e,t)}const Oa=(e,t,i,s="[disabled]")=>xo`
    .control {
      background: padding-box linear-gradient(${kr}, ${kr}),
        border-box ${Jr};
    }

    :host(${i}:hover) .control {
      background: padding-box linear-gradient(${$r}, ${$r}),
        border-box ${Qr};
    }

    :host(${i}:active) .control {
      background: padding-box linear-gradient(${Cr}, ${Cr}),
        border-box ${eo};
    }

    :host(${s}) .control {
      background: padding-box linear-gradient(${kr}, ${kr}),
        border-box ${Xr};
    }
  `.withBehaviors(To(xo`
        .control {
          background: ${Oo.ButtonFace};
          border-color: ${Oo.ButtonText};
          color: ${Oo.ButtonText};
        }

        :host(${i}:hover) .control,
        :host(${i}:active) .control {
          forced-color-adjust: none;
          background: ${Oo.HighlightText};
          border-color: ${Oo.Highlight};
          color: ${Oo.Highlight};
        }

        :host(${s}) .control {
          background: transparent;
          border-color: ${Oo.GrayText};
          color: ${Oo.GrayText};
        }

        .control:${Ko} {
          outline-color: ${Oo.CanvasText};
        }

        :host([href]) .control {
          background: transparent;
          border-color: ${Oo.LinkText};
          color: ${Oo.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          background: transparent;
          border-color: ${Oo.CanvasText};
          color: ${Oo.CanvasText};
        }
    `)),Fa=(e,t,i,s="[disabled]")=>xo`
    .control {
      background: ${Lr};
    }

    :host(${i}:hover) .control {
      background: ${Mr};
    }

    :host(${i}:active) .control {
      background: ${Br};
    }

    :host(${s}) .control {
      background: ${Lr};
    }
  `.withBehaviors(To(xo`
        .control {
          forced-color-adjust: none;
          background: transparent;
          color: ${Oo.ButtonText};
        }

        :host(${i}:hover) .control,
        :host(${i}:active) .control {
          background: transparent;
          border-color: ${Oo.ButtonText};
          color: ${Oo.ButtonText};
        }

        :host(${s}) .control {
          background: transparent;
          color: ${Oo.GrayText};
        }
        
        .control:${Ko} {
          outline-color: ${Oo.CanvasText};
        }

        :host([href]) .control {
          color: ${Oo.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          background: transparent;
          border-color: ${Oo.LinkText};
          color: ${Oo.LinkText};
        }
      `)),Aa=it.create("input-placeholder-rest").withDefault((e=>{const t=_r.getValueFor(e);return Ur.getValueFor(e).evaluate(e,t.evaluate(e).rest)})),Ea=it.create("input-placeholder-hover").withDefault((e=>{const t=_r.getValueFor(e);return Ur.getValueFor(e).evaluate(e,t.evaluate(e).hover)})),Da=it.create("input-filled-placeholder-rest").withDefault((e=>{const t=Er.getValueFor(e);return Ur.getValueFor(e).evaluate(e,t.evaluate(e).rest)})),Ra=it.create("input-filled-placeholder-hover").withDefault((e=>{const t=Er.getValueFor(e);return Ur.getValueFor(e).evaluate(e,t.evaluate(e).hover)})),Va=(e,t,i,s=":not([disabled]):not(:focus-within)")=>xo`
  ${i} {
    background: ${Dr};
  }

  :host(${s}:hover) ${i} {
    background: ${Rr};
  }

  :host(:not([disabled]):focus-within) ${i} {
    background: ${Nr};
  }

  :host([disabled]) ${i} {
    background: ${Dr};
  }

  .control::placeholder {
    color: ${Da};
  }

  :host(${s}:hover) .control::placeholder {
    color: ${Ra};
  }
`,Na=(e,t,i,s=":not([disabled]):not(:focus-within)")=>xo`
  :host {
    color: ${Oo.ButtonText};
  }

  ${i} {
    background: ${Oo.ButtonFace};
    border-color: ${Oo.ButtonText};
  }

  :host(${s}:hover) ${i},
  :host(:not([disabled]):focus-within) ${i} {
    border-color: ${Oo.Highlight};
  }

  :host([disabled]) ${i} {
    opacity: 1;
    background: ${Oo.ButtonFace};
    border-color: ${Oo.GrayText};
  }

  .control::placeholder,
  :host(${s}:hover) .control::placeholder {
    color: ${Oo.CanvasText};
  }

  :host(:not([disabled]):focus) ${i} {
    ${ia}
    outline-color: ${Oo.Highlight};
  }

  :host([disabled]) {
    opacity: 1;
    color: ${Oo.GrayText};
  }

  :host([disabled]) ::placeholder,
  :host([disabled]) ::-webkit-input-placeholder {
    color: ${Oo.GrayText};
  }
`,Pa=".control",La=":not([disabled]):not([open])",Ma="[disabled]";class Ba extends _a{appearanceChanged(e,t){e!==t&&(this.classList.add(t),this.classList.remove(e))}connectedCallback(){super.connectedCallback(),this.appearance||(this.appearance="outline"),this.listbox&&ir.setValueFor(this.listbox,Kn)}}oa([L({mode:"fromView"})],Ba.prototype,"appearance",void 0);const za=Ba.compose({baseName:"select",baseClass:_a,template:(e,t)=>Qt`
    <template
        class="${e=>[e.collapsible&&"collapsible",e.collapsible&&e.open&&"open",e.disabled&&"disabled",e.collapsible&&e.position].filter(Boolean).join(" ")}"
        aria-activedescendant="${e=>e.ariaActiveDescendant}"
        aria-controls="${e=>e.ariaControls}"
        aria-disabled="${e=>e.ariaDisabled}"
        aria-expanded="${e=>e.ariaExpanded}"
        aria-haspopup="${e=>e.collapsible?"listbox":null}"
        aria-multiselectable="${e=>e.ariaMultiSelectable}"
        ?open="${e=>e.open}"
        role="combobox"
        tabindex="${e=>e.disabled?null:"0"}"
        @click="${(e,t)=>e.clickHandler(t.event)}"
        @focusin="${(e,t)=>e.focusinHandler(t.event)}"
        @focusout="${(e,t)=>e.focusoutHandler(t.event)}"
        @keydown="${(e,t)=>e.keydownHandler(t.event)}"
        @mousedown="${(e,t)=>e.mousedownHandler(t.event)}"
    >
        ${qo((e=>e.collapsible),Qt`
                <div
                    class="control"
                    part="control"
                    ?disabled="${e=>e.disabled}"
                    ${ti("control")}
                >
                    ${ni(0,t)}
                    <slot name="button-container">
                        <div class="selected-value" part="selected-value">
                            <slot name="selected-value">${e=>e.displayValue}</slot>
                        </div>
                        <div aria-hidden="true" class="indicator" part="indicator">
                            <slot name="indicator">
                                ${t.indicator||""}
                            </slot>
                        </div>
                    </slot>
                    ${si(0,t)}
                </div>
            `)}
        <div
            class="listbox"
            id="${e=>e.listboxId}"
            part="listbox"
            role="listbox"
            ?disabled="${e=>e.disabled}"
            ?hidden="${e=>!!e.collapsible&&!e.open}"
            ${ti("listbox")}
        >
            <slot
                ${di({filter:pa.slottedOptionFilter,flatten:!0,property:"slottedOptions"})}
            ></slot>
        </div>
    </template>
`,styles:(e,t)=>xo`
    ${Co("inline-flex")}
    
    :host {
      border-radius: calc(${ds} * 1px);
      box-sizing: border-box;
      color: ${Zr};
      fill: currentcolor;
      font-family: ${gs};
      position: relative;
      user-select: none;
      min-width: 250px;
      vertical-align: top;
    }

    .listbox {
      box-shadow: ${Mo};
      background: ${ir};
      border-radius: calc(${hs} * 1px);
      box-sizing: border-box;
      display: inline-flex;
      flex-direction: column;
      left: 0;
      max-height: calc(var(--max-height) - (${Jo} * 1px));
      padding: calc((${us} - ${ps} ) * 1px);
      overflow-y: auto;
      position: absolute;
      width: 100%;
      z-index: 1;
      margin: 1px 0;
      border: calc(${ps} * 1px) solid transparent;
    }

    .listbox[hidden] {
      display: none;
    }

    .control {
      border: calc(${ps} * 1px) solid transparent;
      border-radius: calc(${ds} * 1px);
      height: calc(${Jo} * 1px);
      align-items: center;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      ${ta}
      min-height: 100%;
      padding: 0 calc(${us} * 2.25px);
      width: 100%;
    }

    :host(:${Ko}) {
      ${ia}
    }

    :host([disabled]) .control {
      cursor: ${Yo};
      opacity: ${os};
      user-select: none;
    }

    :host([open][position='above']) .listbox {
      bottom: calc((${Jo} + ${us} * 2) * 1px);
    }

    :host([open][position='below']) .listbox {
      top: calc((${Jo} + ${us} * 2) * 1px);
    }

    .selected-value {
      font-family: inherit;
      flex: 1 1 auto;
      text-align: start;
    }

    .indicator {
      flex: 0 0 auto;
      margin-inline-start: 1em;
    }

    slot[name='listbox'] {
      display: none;
      width: 100%;
    }

    :host([open]) slot[name='listbox'] {
      display: flex;
      position: absolute;
    }

    .start {
      margin-inline-end: 11px;
    }

    .end {
      margin-inline-start: 11px;
    }

    .start,
    .end,
    .indicator,
    ::slotted(svg) {
      display: flex;
    }

    ::slotted([role='option']) {
      flex: 0 0 auto;
    }
  `.withBehaviors(Ta("outline",Oa(0,0,La,Ma)),Ta("filled",Va(0,0,Pa,La).withBehaviors(To(Na(0,0,Pa,La)))),Ta("stealth",Fa(0,0,La,Ma)),To(xo`
    :host([open]) .listbox {
      background: ${Oo.ButtonFace};
      border-color: ${Oo.CanvasText};
    }
  `)),indicator:'\n    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">\n      <path d="M2.15 4.65c.2-.2.5-.2.7 0L6 7.79l3.15-3.14a.5.5 0 11.7.7l-3.5 3.5a.5.5 0 01-.7 0l-3.5-3.5a.5.5 0 010-.7z"/>\n    </svg>\n  '}),ja=da.compose({baseName:"option",template:(e,t)=>Qt`
    <template
        aria-checked="${e=>e.ariaChecked}"
        aria-disabled="${e=>e.ariaDisabled}"
        aria-posinset="${e=>e.ariaPosInSet}"
        aria-selected="${e=>e.ariaSelected}"
        aria-setsize="${e=>e.ariaSetSize}"
        class="${e=>[e.checked&&"checked",e.selected&&"selected",e.disabled&&"disabled"].filter(Boolean).join(" ")}"
        role="option"
    >
        ${ni(0,t)}
        <span class="content" part="content">
            <slot ${di("content")}></slot>
        </span>
        ${si(0,t)}
    </template>
`,styles:(e,t)=>xo`
    ${Co("inline-flex")} :host {
      position: relative;
      ${ta}
      background: ${Lr};
      border-radius: calc(${ds} * 1px);
      border: calc(${ps} * 1px) solid transparent;
      box-sizing: border-box;
      color: ${Zr};
      cursor: pointer;
      fill: currentcolor;
      height: calc(${Jo} * 1px);
      overflow: hidden;
      align-items: center;
      padding: 0 calc(((${us} * 3) - ${ps} - 1) * 1px);
      user-select: none;
      white-space: nowrap;
    }

    :host::before {
      content: '';
      display: block;
      position: absolute;
      left: calc((${fs} - ${ps}) * 1px);
      top: calc((${Jo} / 4) - ${fs} * 1px);
      width: 3px;
      height: calc((${Jo} / 2) * 1px);
      background: transparent;
      border-radius: calc(${ds} * 1px);
    }

    :host(:not([disabled]):hover) {
      background: ${Mr};
    }

    :host(:not([disabled]):active) {
      background: ${Br};
    }

    :host(:not([disabled]):active)::before {
      background: ${rr};
      height: calc(((${Jo} / 2) - 6) * 1px);
    }

    :host([aria-selected='true'])::before {
      background: ${rr};
    }

    :host(:${Ko}) {
      ${ia}
      background: ${zr};
    }

    :host([aria-selected='true']) {
      background: ${Dr};
    }

    :host(:not([disabled])[aria-selected='true']:hover) {
      background: ${Rr};
    }

    :host(:not([disabled])[aria-selected='true']:active) {
      background: ${Vr};
    }

    :host(:not([disabled]):not([aria-selected='true']):hover) {
      background: ${Mr};
    }

    :host(:not([disabled]):not([aria-selected='true']):active) {
      background: ${Br};
    }

    :host([disabled]) {
      cursor: ${Yo};
      opacity: ${os};
    }

    .content {
      grid-column-start: 2;
      justify-self: start;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .start,
    .end,
    ::slotted(svg) {
      display: flex;
    }

    ::slotted([slot='end']) {
      margin-inline-start: 1ch;
    }

    ::slotted([slot='start']) {
      margin-inline-end: 1ch;
    }
  `.withBehaviors(new Qo(null,xo`
      :host::before {
        right: calc((${fs} - ${ps}) * 1px);
      }
    `),To(xo`
        :host {
          background: ${Oo.ButtonFace};
          border-color: ${Oo.ButtonFace};
          color: ${Oo.ButtonText};
        }
        :host(:not([disabled]):not([aria-selected="true"]):hover),
        :host(:not([disabled])[aria-selected="true"]:hover),
        :host([aria-selected="true"]) {
          forced-color-adjust: none;
          background: ${Oo.Highlight};
          color: ${Oo.HighlightText};
        }
        :host(:not([disabled]):active)::before,
        :host([aria-selected='true'])::before {
          background: ${Oo.HighlightText};
        }
        :host([disabled]),
        :host([disabled]:not([aria-selected='true']):hover) {
          background: ${Oo.Canvas};
          color: ${Oo.GrayText};
          fill: currentcolor;
          opacity: 1;
        }
        :host(:${Ko}) {
          outline-color: ${Oo.CanvasText};
        }
      `))});class Ha extends Ve{}class Za extends(xa(Ha)){constructor(){super(...arguments),this.proxy=document.createElement("input")}}class Ua extends Za{constructor(){super(...arguments),this.type="text"}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly,this.validate())}autofocusChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.autofocus=this.autofocus,this.validate())}placeholderChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.placeholder=this.placeholder)}typeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type,this.validate())}listChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.setAttribute("list",this.list),this.validate())}maxlengthChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.maxLength=this.maxlength,this.validate())}minlengthChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.minLength=this.minlength,this.validate())}patternChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.pattern=this.pattern,this.validate())}sizeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.size=this.size)}spellcheckChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.spellcheck=this.spellcheck)}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.validate(),this.autofocus&&m.queueUpdate((()=>{this.focus()}))}select(){this.control.select(),this.$emit("select")}handleTextInput(){this.value=this.control.value}handleChange(){this.$emit("change")}validate(){super.validate(this.control)}}H([L({attribute:"readonly",mode:"boolean"})],Ua.prototype,"readOnly",void 0),H([L({mode:"boolean"})],Ua.prototype,"autofocus",void 0),H([L],Ua.prototype,"placeholder",void 0),H([L],Ua.prototype,"type",void 0),H([L],Ua.prototype,"list",void 0),H([L({converter:N})],Ua.prototype,"maxlength",void 0),H([L({converter:N})],Ua.prototype,"minlength",void 0),H([L],Ua.prototype,"pattern",void 0),H([L({converter:N})],Ua.prototype,"size",void 0),H([L({mode:"boolean"})],Ua.prototype,"spellcheck",void 0),H([w],Ua.prototype,"defaultSlottedNodes",void 0);class qa{}function Wa(e,t,i){return e.nodeType!==Node.TEXT_NODE||"string"==typeof e.nodeValue&&!!e.nodeValue.trim().length}oi(qa,ca),oi(Ua,ii,qa);const Xa=".root";class Ga extends Ua{appearanceChanged(e,t){e!==t&&(this.classList.add(t),this.classList.remove(e))}connectedCallback(){super.connectedCallback(),this.appearance||(this.appearance="outline")}}oa([L],Ga.prototype,"appearance",void 0);const Ka=Ga.compose({baseName:"text-field",baseClass:Ua,template:(e,t)=>Qt`
    <template
        class="
            ${e=>e.readOnly?"readonly":""}
        "
    >
        <label
            part="label"
            for="control"
            class="${e=>e.defaultSlottedNodes&&e.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot
                ${di({property:"defaultSlottedNodes",filter:Wa})}
            ></slot>
        </label>
        <div class="root" part="root">
            ${ni(0,t)}
            <input
                class="control"
                part="control"
                id="control"
                @input="${e=>e.handleTextInput()}"
                @change="${e=>e.handleChange()}"
                ?autofocus="${e=>e.autofocus}"
                ?disabled="${e=>e.disabled}"
                list="${e=>e.list}"
                maxlength="${e=>e.maxlength}"
                minlength="${e=>e.minlength}"
                pattern="${e=>e.pattern}"
                placeholder="${e=>e.placeholder}"
                ?readonly="${e=>e.readOnly}"
                ?required="${e=>e.required}"
                size="${e=>e.size}"
                ?spellcheck="${e=>e.spellcheck}"
                :value="${e=>e.value}"
                type="${e=>e.type}"
                aria-atomic="${e=>e.ariaAtomic}"
                aria-busy="${e=>e.ariaBusy}"
                aria-controls="${e=>e.ariaControls}"
                aria-current="${e=>e.ariaCurrent}"
                aria-describedby="${e=>e.ariaDescribedby}"
                aria-details="${e=>e.ariaDetails}"
                aria-disabled="${e=>e.ariaDisabled}"
                aria-errormessage="${e=>e.ariaErrormessage}"
                aria-flowto="${e=>e.ariaFlowto}"
                aria-haspopup="${e=>e.ariaHaspopup}"
                aria-hidden="${e=>e.ariaHidden}"
                aria-invalid="${e=>e.ariaInvalid}"
                aria-keyshortcuts="${e=>e.ariaKeyshortcuts}"
                aria-label="${e=>e.ariaLabel}"
                aria-labelledby="${e=>e.ariaLabelledby}"
                aria-live="${e=>e.ariaLive}"
                aria-owns="${e=>e.ariaOwns}"
                aria-relevant="${e=>e.ariaRelevant}"
                aria-roledescription="${e=>e.ariaRoledescription}"
                ${ti("control")}
            />
            ${si(0,t)}
        </div>
    </template>
`,styles:(e,t)=>xo`
    ${Co("inline-block")}

    ${((e,t,i)=>xo`
  :host {
    ${ta}
    color: ${Zr};
    fill: currentcolor;
    user-select: none;
    position: relative;
  }

  ${i} {
    box-sizing: border-box;
    position: relative;
    color: inherit;
    border: calc(${ps} * 1px) solid transparent;
    border-radius: calc(${ds} * 1px);
    height: calc(${Jo} * 1px);
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  .control {
    width: 100%;
    outline: none;
  }

  .label {
    display: block;
    color: ${Zr};
    cursor: pointer;
    ${ta}
    margin-bottom: 4px;
  }

  .label__hidden {
    display: none;
    visibility: hidden;
  }

  :host([disabled]) ${i},
  :host([readonly]) ${i},
  :host([disabled]) .label,
  :host([readonly]) .label,
  :host([disabled]) .control,
  :host([readonly]) .control {
    cursor: ${Yo};
  }

  :host([disabled]) {
    opacity: ${os};
  }
`)(0,0,Xa)}

    ${xo`
  @media (forced-colors: none) {
    :host(:not([disabled]):active)::after {
      left: 50%;
      width: 40%;
      transform: translateX(-50%);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    :host(:not([disabled]):focus-within)::after {
      left: 0;
      width: 100%;
      transform: none;
    }

    :host(:not([disabled]):active)::after,
    :host(:not([disabled]):focus-within:not(:active))::after {
      content: '';
      position: absolute;
      height: calc(${fs} * 1px);
      bottom: 0;
      border-bottom: calc(${fs} * 1px) solid ${rr};
      border-bottom-left-radius: calc(${ds} * 1px);
      border-bottom-right-radius: calc(${ds} * 1px);
      z-index: 2;
      transition: all 300ms cubic-bezier(0.1, 0.9, 0.2, 1);
    }
  }
`}

    .root {
      display: flex;
      flex-direction: row;
    }

    .control {
      -webkit-appearance: none;
      color: inherit;
      background: transparent;
      border: 0;
      height: calc(100% - 4px);
      margin-top: auto;
      margin-bottom: auto;
      padding: 0 calc(${us} * 2px + 1px);
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
    }

    .start,
    .end {
      display: flex;
      margin: auto;
    }

    .start {
      display: flex;
      margin-inline-start: 11px;
    }

    .end {
      display: flex;
      margin-inline-end: 11px;
    }
  `.withBehaviors(Ta("outline",((e,t,i,s=":not([disabled]):not(:focus-within)")=>xo`
  ${i} {
    background: padding-box linear-gradient(${Sr}, ${Sr}),
      border-box ${no};
  }

  :host(${s}:hover) ${i} {
    background: padding-box linear-gradient(${Ir}, ${Ir}),
      border-box ${ro};
  }

  :host(:not([disabled]):focus-within) ${i} {
    background: padding-box linear-gradient(${Tr}, ${Tr}),
      border-box ${no};
  }
  
  :host([disabled]) ${i} {
    background: padding-box linear-gradient(${Sr}, ${Sr}),
      border-box ${Xr};
  }

  .control::placeholder {
    color: ${Aa};
  }

  :host(${s}:hover) .control::placeholder {
    color: ${Ea};
  }
`)(0,0,Xa)),Ta("filled",Va(0,0,Xa)),To(Na(0,0,Xa))),shadowOptions:{delegatesFocus:!0}});var Ya=["input","select","textarea","a[href]","button","[tabindex]:not(slot)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"].join(","),Ja="undefined"==typeof Element,Qa=Ja?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,el=!Ja&&Element.prototype.getRootNode?function(e){return e.getRootNode()}:function(e){return e.ownerDocument},tl=function(e){return"INPUT"===e.tagName},il=function(e){var t=e.getBoundingClientRect(),i=t.width,s=t.height;return 0===i&&0===s},sl=function(e,t){return!(function(e){return function(e){return tl(e)&&"radio"===e.type}(e)&&!function(e){if(!e.name)return!0;var t,i=e.form||el(e),s=function(e){return i.querySelectorAll('input[type="radio"][name="'+e+'"]')};if("undefined"!=typeof window&&void 0!==window.CSS&&"function"==typeof window.CSS.escape)t=s(window.CSS.escape(e.name));else try{t=s(e.name)}catch(e){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",e.message),!1}var n=function(e,t){for(var i=0;i<e.length;i++)if(e[i].checked&&e[i].form===t)return e[i]}(t,e.form);return!n||n===e}(e)}(t)||function(e,t){return e.tabIndex<0&&(t||/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||e.isContentEditable)&&isNaN(parseInt(e.getAttribute("tabindex"),10))?0:e.tabIndex}(t)<0||!function(e,t){return!(t.disabled||function(e){return tl(e)&&"hidden"===e.type}(t)||function(e,t){var i=t.displayCheck,s=t.getShadowRoot;if("hidden"===getComputedStyle(e).visibility)return!0;var n=Qa.call(e,"details>summary:first-of-type")?e.parentElement:e;if(Qa.call(n,"details:not([open]) *"))return!0;var r=el(e).host,o=(null==r?void 0:r.ownerDocument.contains(r))||e.ownerDocument.contains(e);if(i&&"full"!==i){if("non-zero-area"===i)return il(e)}else{if("function"==typeof s){for(var a=e;e;){var l=e.parentElement,c=el(e);if(l&&!l.shadowRoot&&!0===s(l))return il(e);e=e.assignedSlot?e.assignedSlot:l||c===e.ownerDocument?l:c.host}e=a}if(o)return!e.getClientRects().length}return!1}(t,e)||function(e){return"DETAILS"===e.tagName&&Array.prototype.slice.apply(e.children).some((function(e){return"SUMMARY"===e.tagName}))}(t)||function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var t=e.parentElement;t;){if("FIELDSET"===t.tagName&&t.disabled){for(var i=0;i<t.children.length;i++){var s=t.children.item(i);if("LEGEND"===s.tagName)return!!Qa.call(t,"fieldset[disabled] *")||!s.contains(e)}return!0}t=t.parentElement}return!1}(t))}(e,t))},nl=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return!1!==Qa.call(e,Ya)&&sl(t,e)};class rl extends Ve{constructor(){super(...arguments),this.modal=!0,this.hidden=!1,this.trapFocus=!0,this.trapFocusChanged=()=>{this.$fastController.isConnected&&this.updateTrapFocus()},this.isTrappingFocus=!1,this.handleDocumentKeydown=e=>{if(!e.defaultPrevented&&!this.hidden)switch(e.key){case vt:this.dismiss(),e.preventDefault();break;case xt:this.handleTabKeyDown(e)}},this.handleDocumentFocus=e=>{!e.defaultPrevented&&this.shouldForceFocus(e.target)&&(this.focusFirstElement(),e.preventDefault())},this.handleTabKeyDown=e=>{if(!this.trapFocus||this.hidden)return;const t=this.getTabQueueBounds();return 0!==t.length?1===t.length?(t[0].focus(),void e.preventDefault()):void(e.shiftKey&&e.target===t[0]?(t[t.length-1].focus(),e.preventDefault()):e.shiftKey||e.target!==t[t.length-1]||(t[0].focus(),e.preventDefault())):void 0},this.getTabQueueBounds=()=>rl.reduceTabbableItems([],this),this.focusFirstElement=()=>{const e=this.getTabQueueBounds();e.length>0?e[0].focus():this.dialog instanceof HTMLElement&&this.dialog.focus()},this.shouldForceFocus=e=>this.isTrappingFocus&&!this.contains(e),this.shouldTrapFocus=()=>this.trapFocus&&!this.hidden,this.updateTrapFocus=e=>{const t=void 0===e?this.shouldTrapFocus():e;t&&!this.isTrappingFocus?(this.isTrappingFocus=!0,document.addEventListener("focusin",this.handleDocumentFocus),m.queueUpdate((()=>{this.shouldForceFocus(document.activeElement)&&this.focusFirstElement()}))):!t&&this.isTrappingFocus&&(this.isTrappingFocus=!1,document.removeEventListener("focusin",this.handleDocumentFocus))}}dismiss(){this.$emit("dismiss"),this.$emit("cancel")}show(){this.hidden=!1}hide(){this.hidden=!0,this.$emit("close")}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleDocumentKeydown),this.notifier=b.getNotifier(this),this.notifier.subscribe(this,"hidden"),this.updateTrapFocus()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeydown),this.updateTrapFocus(!1),this.notifier.unsubscribe(this,"hidden")}handleChange(e,t){"hidden"===t&&this.updateTrapFocus()}static reduceTabbableItems(e,t){return"-1"===t.getAttribute("tabindex")?e:nl(t)||rl.isFocusableFastElement(t)&&rl.hasTabbableShadow(t)?(e.push(t),e):t.childElementCount?e.concat(Array.from(t.children).reduce(rl.reduceTabbableItems,[])):e}static isFocusableFastElement(e){var t,i;return!!(null===(i=null===(t=e.$fastController)||void 0===t?void 0:t.definition.shadowOptions)||void 0===i?void 0:i.delegatesFocus)}static hasTabbableShadow(e){var t,i;return Array.from(null!==(i=null===(t=e.shadowRoot)||void 0===t?void 0:t.querySelectorAll("*"))&&void 0!==i?i:[]).some((e=>nl(e)))}}H([L({mode:"boolean"})],rl.prototype,"modal",void 0),H([L({mode:"boolean"})],rl.prototype,"hidden",void 0),H([L({attribute:"trap-focus",mode:"boolean"})],rl.prototype,"trapFocus",void 0),H([L({attribute:"aria-describedby"})],rl.prototype,"ariaDescribedby",void 0),H([L({attribute:"aria-labelledby"})],rl.prototype,"ariaLabelledby",void 0),H([L({attribute:"aria-label"})],rl.prototype,"ariaLabel",void 0);const ol=rl.compose({baseName:"dialog",template:(e,t)=>Qt`
    <div class="positioning-region" part="positioning-region">
        ${qo((e=>e.modal),Qt`
                <div
                    class="overlay"
                    part="overlay"
                    role="presentation"
                    @click="${e=>e.dismiss()}"
                ></div>
            `)}
        <div
            role="dialog"
            tabindex="-1"
            class="control"
            part="control"
            aria-modal="${e=>e.modal}"
            aria-describedby="${e=>e.ariaDescribedby}"
            aria-labelledby="${e=>e.ariaLabelledby}"
            aria-label="${e=>e.ariaLabel}"
            ${ti("dialog")}
        >
            <slot></slot>
        </div>
    </div>
`,styles:(e,t)=>xo`
  :host([hidden]) {
    display: none;
  }

  :host {
    --dialog-height: 480px;
    --dialog-width: 640px;
    display: block;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    touch-action: none;
  }

  .positioning-region {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
  }

  .control {
    box-shadow: ${zo};
    margin-top: auto;
    margin-bottom: auto;
    border-radius: calc(${hs} * 1px);
    width: var(--dialog-width);
    height: var(--dialog-height);
    background: ${ir};
    z-index: 1;
    border: calc(${ps} * 1px) solid transparent;
  }
`});class al extends Ve{}class ll extends(xa(al)){constructor(){super(...arguments),this.proxy=document.createElement("input")}}class cl extends ll{constructor(){super(...arguments),this.handleClick=e=>{var t;this.disabled&&(null===(t=this.defaultSlottedContent)||void 0===t?void 0:t.length)<=1&&e.stopPropagation()},this.handleSubmission=()=>{if(!this.form)return;const e=this.proxy.isConnected;e||this.attachProxy(),"function"==typeof this.form.requestSubmit?this.form.requestSubmit(this.proxy):this.proxy.click(),e||this.detachProxy()},this.handleFormReset=()=>{var e;null===(e=this.form)||void 0===e||e.reset()},this.handleUnsupportedDelegatesFocus=()=>{var e;window.ShadowRoot&&!window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus")&&(null===(e=this.$fastController.definition.shadowOptions)||void 0===e?void 0:e.delegatesFocus)&&(this.focus=()=>{this.control.focus()})}}formactionChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formAction=this.formaction)}formenctypeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formEnctype=this.formenctype)}formmethodChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formMethod=this.formmethod)}formnovalidateChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formNoValidate=this.formnovalidate)}formtargetChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formTarget=this.formtarget)}typeChanged(e,t){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type),"submit"===t&&this.addEventListener("click",this.handleSubmission),"submit"===e&&this.removeEventListener("click",this.handleSubmission),"reset"===t&&this.addEventListener("click",this.handleFormReset),"reset"===e&&this.removeEventListener("click",this.handleFormReset)}validate(){super.validate(this.control)}connectedCallback(){var e;super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.handleUnsupportedDelegatesFocus();const t=Array.from(null===(e=this.control)||void 0===e?void 0:e.children);t&&t.forEach((e=>{e.addEventListener("click",this.handleClick)}))}disconnectedCallback(){var e;super.disconnectedCallback();const t=Array.from(null===(e=this.control)||void 0===e?void 0:e.children);t&&t.forEach((e=>{e.removeEventListener("click",this.handleClick)}))}}H([L({mode:"boolean"})],cl.prototype,"autofocus",void 0),H([L({attribute:"form"})],cl.prototype,"formId",void 0),H([L],cl.prototype,"formaction",void 0),H([L],cl.prototype,"formenctype",void 0),H([L],cl.prototype,"formmethod",void 0),H([L({mode:"boolean"})],cl.prototype,"formnovalidate",void 0),H([L],cl.prototype,"formtarget",void 0),H([L],cl.prototype,"type",void 0),H([w],cl.prototype,"defaultSlottedContent",void 0);class ul{}H([L({attribute:"aria-expanded"})],ul.prototype,"ariaExpanded",void 0),H([L({attribute:"aria-pressed"})],ul.prototype,"ariaPressed",void 0),oi(ul,ca),oi(cl,ii,ul);const dl=":not([disabled])",hl="[disabled]";class pl extends cl{appearanceChanged(e,t){e!==t&&(this.classList.add(t),this.classList.remove(e))}connectedCallback(){super.connectedCallback(),this.appearance||(this.appearance="neutral")}defaultSlottedContentChanged(){const e=this.defaultSlottedContent.filter((e=>e.nodeType===Node.ELEMENT_NODE));1===e.length&&e[0]instanceof SVGElement?this.control.classList.add("icon-only"):this.control.classList.remove("icon-only")}}oa([L],pl.prototype,"appearance",void 0);const fl=pl.compose({baseName:"button",baseClass:cl,template:(e,t)=>Qt`
    <button
        class="control"
        part="control"
        ?autofocus="${e=>e.autofocus}"
        ?disabled="${e=>e.disabled}"
        form="${e=>e.formId}"
        formaction="${e=>e.formaction}"
        formenctype="${e=>e.formenctype}"
        formmethod="${e=>e.formmethod}"
        formnovalidate="${e=>e.formnovalidate}"
        formtarget="${e=>e.formtarget}"
        name="${e=>e.name}"
        type="${e=>e.type}"
        value="${e=>e.value}"
        aria-atomic="${e=>e.ariaAtomic}"
        aria-busy="${e=>e.ariaBusy}"
        aria-controls="${e=>e.ariaControls}"
        aria-current="${e=>e.ariaCurrent}"
        aria-describedby="${e=>e.ariaDescribedby}"
        aria-details="${e=>e.ariaDetails}"
        aria-disabled="${e=>e.ariaDisabled}"
        aria-errormessage="${e=>e.ariaErrormessage}"
        aria-expanded="${e=>e.ariaExpanded}"
        aria-flowto="${e=>e.ariaFlowto}"
        aria-haspopup="${e=>e.ariaHaspopup}"
        aria-hidden="${e=>e.ariaHidden}"
        aria-invalid="${e=>e.ariaInvalid}"
        aria-keyshortcuts="${e=>e.ariaKeyshortcuts}"
        aria-label="${e=>e.ariaLabel}"
        aria-labelledby="${e=>e.ariaLabelledby}"
        aria-live="${e=>e.ariaLive}"
        aria-owns="${e=>e.ariaOwns}"
        aria-pressed="${e=>e.ariaPressed}"
        aria-relevant="${e=>e.ariaRelevant}"
        aria-roledescription="${e=>e.ariaRoledescription}"
        ${ti("control")}
    >
        ${ni(0,t)}
        <span class="content" part="content">
            <slot ${di("defaultSlottedContent")}></slot>
        </span>
        ${si(0,t)}
    </button>
`,styles:(e,t)=>xo`
    :host(${dl}) .control {
      cursor: pointer;
    }

    :host(${hl}) .control {
      cursor: ${Yo};
    }

    @media (forced-colors: none) {
      :host(${hl}) .control {
        opacity: ${os};
      }
    }

    ${xo`
    ${Co("inline-flex")}
    
    :host {
      position: relative;
      box-sizing: border-box;
      ${ta}
      height: calc(${Jo} * 1px);
      min-width: calc(${Jo} * 1px);
      color: ${Zr};
      border-radius: calc(${ds} * 1px);
      fill: currentcolor;
    }

    .control {
      border: calc(${ps} * 1px) solid transparent;
      flex-grow: 1;
      box-sizing: border-box;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0 calc((10 + (${us} * 2 * ${cs})) * 1px);
      white-space: nowrap;
      outline: none;
      text-decoration: none;
      color: inherit;
      border-radius: inherit;
      fill: inherit;
      font-family: inherit;
    }

    .control,
    .end,
    .start {
      font: inherit;
    }

    .control.icon-only {
      padding: 0;
      line-height: 0;
    }

    .control:${Ko} {
      ${ia}
    }

    .control::-moz-focus-inner {
      border: 0;
    }

    .content {
      pointer-events: none;
    }

    .start,
    .end {
      display: flex;
      pointer-events: none;
    }

    .start {
      margin-inline-end: 11px;
    }

    .end {
      margin-inline-start: 11px;
    }
  `}
  `.withBehaviors(Ta("neutral",Oa(0,0,dl,hl)),Ta("accent",((e,t,i,s="[disabled]")=>xo`
    .control {
      background: padding-box linear-gradient(${rr}, ${rr}),
        border-box ${yr};
      color: ${ur};
    }

    :host(${i}:hover) .control {
      background: padding-box linear-gradient(${or}, ${or}),
        border-box ${br};
      color: ${dr};
    }

    :host(${i}:active) .control {
      background: padding-box linear-gradient(${ar}, ${ar}),
        border-box ${wr};
      color: ${hr};
    }

    :host(${s}) .control {
      background: ${rr};
    }

    .control:${Ko} {
      box-shadow: 0 0 0 calc(${fs} * 1px) ${po} inset !important;
    }
  `.withBehaviors(To(xo`
        .control {
          forced-color-adjust: none;
          background: ${Oo.Highlight};
          color: ${Oo.HighlightText};
        }

        :host(${i}:hover) .control,
        :host(${i}:active) .control {
          background: ${Oo.HighlightText};
          border-color: ${Oo.Highlight};
          color: ${Oo.Highlight};
        }

        :host(${s}) .control {
          background: transparent;
          border-color: ${Oo.GrayText};
          color: ${Oo.GrayText};
        }

        .control:${Ko} {
          outline-color: ${Oo.CanvasText};
          box-shadow: 0 0 0 calc(${fs} * 1px) ${Oo.HighlightText} inset !important;
        }

        :host([href]) .control {
          background: ${Oo.LinkText};
          color: ${Oo.HighlightText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          background: ${Oo.ButtonFace};
          border-color: ${Oo.LinkText};
          color: ${Oo.LinkText};
        }
      `)))(0,0,dl,hl)),Ta("lightweight",((e,t,i,s="[disabled]")=>xo`
    :host {
      color: ${fr};
    }

    .control {
      background: ${Lr};
    }

    :host(${i}:hover) .control {
      background: ${Mr};
      color: ${gr};
    }

    :host(${i}:active) .control {
      background: ${Br};
      color: ${mr};
    }

    :host(${s}) .control {
      background: ${Lr};
    }
  `.withBehaviors(To(xo`
        :host {
          color: ${Oo.ButtonText};
        }

        .control {
          forced-color-adjust: none;
          background: transparent;
        }

        :host(${i}:hover) .control,
        :host(${i}:active) .control {
          background: transparent;
          border-color: ${Oo.ButtonText};
          color: ${Oo.ButtonText};
        }

        :host(${s}) .control {
          background: transparent;
          color: ${Oo.GrayText};
        }

        .control:${Ko} {
          outline-color: ${Oo.CanvasText};
        }

        :host([href]) .control {
          color: ${Oo.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          border-color: ${Oo.LinkText};
          color: ${Oo.LinkText};
        }
      `)))(0,0,dl,hl)),Ta("outline",((e,t,i,s="[disabled]")=>xo`
    .control {
      background: transparent !important;
      border-color: ${Xr};
    }

    :host(${i}:hover) .control {
      border-color: ${Gr};
    }

    :host(${i}:active) .control {
      border-color: ${Kr};
    }

    :host(${s}) .control {
      background: transparent !important;
      border-color: ${Xr};
    }
  `.withBehaviors(To(xo`
        .control {
          border-color: ${Oo.ButtonText};
          color: ${Oo.ButtonText};
        }

        :host(${i}:hover) .control,
        :host(${i}:active) .control {
          background: ${Oo.HighlightText};
          border-color: ${Oo.Highlight};
          color: ${Oo.Highlight};
        }

        :host(${s}) .control {
          border-color: ${Oo.GrayText};
          color: ${Oo.GrayText};
        }

        .control:${Ko} {
          outline-color: ${Oo.CanvasText};
        }

        :host([href]) .control {
          border-color: ${Oo.LinkText};
          color: ${Oo.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          border-color: ${Oo.CanvasText};
          color: ${Oo.CanvasText};
        }
      `)))(0,0,dl,hl)),Ta("stealth",Fa(0,0,dl,hl))),shadowOptions:{delegatesFocus:!0}});class gl extends Ve{}class ml extends gl{cardFillColorChanged(e,t){if(t){const e=Mi(t);null!==e&&(this.neutralPaletteSource=t,ir.setValueFor(this,Oi.create(e.r,e.g,e.b)))}}neutralPaletteSourceChanged(e,t){if(t){const e=Mi(t),i=Oi.create(e.r,e.g,e.b);Un.setValueFor(this,Ni.create(i))}}handleChange(e,t){this.cardFillColor||ir.setValueFor(this,(t=>Fr.getValueFor(t).evaluate(t,ir.getValueFor(e)).rest))}connectedCallback(){super.connectedCallback();const e=Me(this);if(e){const t=b.getNotifier(e);t.subscribe(this,"fillColor"),t.subscribe(this,"neutralPalette"),this.handleChange(e,"fillColor")}}}oa([L({attribute:"card-fill-color",mode:"fromView"})],ml.prototype,"cardFillColor",void 0),oa([L({attribute:"neutral-palette-source",mode:"fromView"})],ml.prototype,"neutralPaletteSource",void 0);const vl=ml.compose({baseName:"card",baseClass:gl,template:(e,t)=>Qt`
    <slot></slot>
`,styles:(e,t)=>xo`
    ${Co("block")} :host {
      display: block;
      contain: content;
      height: var(--card-height, 100%);
      width: var(--card-width, 100%);
      box-sizing: border-box;
      background: ${ir};
      color: ${Zr};
      border: calc(${ps} * 1px) solid ${ao};
      border-radius: calc(${hs} * 1px);
      box-shadow: ${No};
    }

    :host {
      content-visibility: auto;
    }
  `.withBehaviors(To(xo`
        :host {
          background: ${Oo.Canvas};
          color: ${Oo.CanvasText};
        }
      `))}),yl={toView:e=>null==e?null:null==e?void 0:e.toColorString(),fromView(e){if(null==e)return null;const t=Mi(e);return t?Oi.create(t.r,t.g,t.b):null}},bl=xo`
  :host {
    background-color: ${ir};
    color: ${Zr};
  }
`.withBehaviors(To(xo`
      :host {
        background-color: ${Oo.Canvas};
        box-shadow: 0 0 0 1px ${Oo.CanvasText};
        color: ${Oo.CanvasText};
      }
    `));function wl(e){return(t,i)=>{t[i+"Changed"]=function(t,i){null!=i?e.setValueFor(this,i):e.deleteValueFor(this)}}}class xl extends Ve{constructor(){super(),this.noPaint=!1;const e={handleChange:this.noPaintChanged.bind(this)};b.getNotifier(this).subscribe(e,"fillColor"),b.getNotifier(this).subscribe(e,"baseLayerLuminance")}connectedCallback(){super.connectedCallback(),this.noPaintChanged()}noPaintChanged(){this.noPaint||void 0===this.fillColor&&!this.baseLayerLuminance?this.$fastController.removeStyles(bl):this.$fastController.addStyles(bl)}}oa([L({attribute:"no-paint",mode:"boolean"})],xl.prototype,"noPaint",void 0),oa([L({attribute:"fill-color",converter:yl,mode:"fromView"}),wl(ir)],xl.prototype,"fillColor",void 0),oa([L({attribute:"accent-base-color",converter:yl,mode:"fromView"}),wl(qn)],xl.prototype,"accentBaseColor",void 0),oa([L({attribute:"neutral-base-color",converter:yl,mode:"fromView"}),wl(Zn)],xl.prototype,"neutralBaseColor",void 0),oa([L({converter:N}),wl(cs)],xl.prototype,"density",void 0),oa([L({attribute:"design-unit",converter:N}),wl(us)],xl.prototype,"designUnit",void 0),oa([L({attribute:"direction"}),wl(rs)],xl.prototype,"direction",void 0),oa([L({attribute:"base-height-multiplier",converter:N}),wl(as)],xl.prototype,"baseHeightMultiplier",void 0),oa([L({attribute:"base-horizontal-spacing-multiplier",converter:N}),wl(ls)],xl.prototype,"baseHorizontalSpacingMultiplier",void 0),oa([L({attribute:"control-corner-radius",converter:N}),wl(ds)],xl.prototype,"controlCornerRadius",void 0),oa([L({attribute:"layer-corner-radius",converter:N}),wl(hs)],xl.prototype,"layerCornerRadius",void 0),oa([L({attribute:"stroke-width",converter:N}),wl(ps)],xl.prototype,"strokeWidth",void 0),oa([L({attribute:"focus-stroke-width",converter:N}),wl(fs)],xl.prototype,"focusStrokeWidth",void 0),oa([L({attribute:"disabled-opacity",converter:N}),wl(os)],xl.prototype,"disabledOpacity",void 0),oa([L({attribute:"type-ramp-minus-2-font-size"}),wl(Cs)],xl.prototype,"typeRampMinus2FontSize",void 0),oa([L({attribute:"type-ramp-minus-2-line-height"}),wl(_s)],xl.prototype,"typeRampMinus2LineHeight",void 0),oa([L({attribute:"type-ramp-minus-1-font-size"}),wl(xs)],xl.prototype,"typeRampMinus1FontSize",void 0),oa([L({attribute:"type-ramp-minus-1-line-height"}),wl(ks)],xl.prototype,"typeRampMinus1LineHeight",void 0),oa([L({attribute:"type-ramp-base-font-size"}),wl(ys)],xl.prototype,"typeRampBaseFontSize",void 0),oa([L({attribute:"type-ramp-base-line-height"}),wl(bs)],xl.prototype,"typeRampBaseLineHeight",void 0),oa([L({attribute:"type-ramp-plus-1-font-size"}),wl(Is)],xl.prototype,"typeRampPlus1FontSize",void 0),oa([L({attribute:"type-ramp-plus-1-line-height"}),wl(Ts)],xl.prototype,"typeRampPlus1LineHeight",void 0),oa([L({attribute:"type-ramp-plus-2-font-size"}),wl(Fs)],xl.prototype,"typeRampPlus2FontSize",void 0),oa([L({attribute:"type-ramp-plus-2-line-height"}),wl(As)],xl.prototype,"typeRampPlus2LineHeight",void 0),oa([L({attribute:"type-ramp-plus-3-font-size"}),wl(Ds)],xl.prototype,"typeRampPlus3FontSize",void 0),oa([L({attribute:"type-ramp-plus-3-line-height"}),wl(Rs)],xl.prototype,"typeRampPlus3LineHeight",void 0),oa([L({attribute:"type-ramp-plus-4-font-size"}),wl(Ns)],xl.prototype,"typeRampPlus4FontSize",void 0),oa([L({attribute:"type-ramp-plus-4-line-height"}),wl(Ps)],xl.prototype,"typeRampPlus4LineHeight",void 0),oa([L({attribute:"type-ramp-plus-5-font-size"}),wl(Ms)],xl.prototype,"typeRampPlus5FontSize",void 0),oa([L({attribute:"type-ramp-plus-5-line-height"}),wl(Bs)],xl.prototype,"typeRampPlus5LineHeight",void 0),oa([L({attribute:"type-ramp-plus-6-font-size"}),wl(js)],xl.prototype,"typeRampPlus6FontSize",void 0),oa([L({attribute:"type-ramp-plus-6-line-height"}),wl(Hs)],xl.prototype,"typeRampPlus6LineHeight",void 0),oa([L({attribute:"accent-fill-rest-delta",converter:N}),wl(qs)],xl.prototype,"accentFillRestDelta",void 0),oa([L({attribute:"accent-fill-hover-delta",converter:N}),wl(Ws)],xl.prototype,"accentFillHoverDelta",void 0),oa([L({attribute:"accent-fill-active-delta",converter:N}),wl(Xs)],xl.prototype,"accentFillActiveDelta",void 0),oa([L({attribute:"accent-fill-focus-delta",converter:N}),wl(Gs)],xl.prototype,"accentFillFocusDelta",void 0),oa([L({attribute:"accent-foreground-rest-delta",converter:N}),wl(Ks)],xl.prototype,"accentForegroundRestDelta",void 0),oa([L({attribute:"accent-foreground-hover-delta",converter:N}),wl(Ys)],xl.prototype,"accentForegroundHoverDelta",void 0),oa([L({attribute:"accent-foreground-active-delta",converter:N}),wl(Js)],xl.prototype,"accentForegroundActiveDelta",void 0),oa([L({attribute:"accent-foreground-focus-delta",converter:N}),wl(Qs)],xl.prototype,"accentForegroundFocusDelta",void 0),oa([L({attribute:"neutral-fill-rest-delta",converter:N}),wl(en)],xl.prototype,"neutralFillRestDelta",void 0),oa([L({attribute:"neutral-fill-hover-delta",converter:N}),wl(tn)],xl.prototype,"neutralFillHoverDelta",void 0),oa([L({attribute:"neutral-fill-active-delta",converter:N}),wl(sn)],xl.prototype,"neutralFillActiveDelta",void 0),oa([L({attribute:"neutral-fill-focus-delta",converter:N}),wl(nn)],xl.prototype,"neutralFillFocusDelta",void 0),oa([L({attribute:"neutral-fill-input-rest-delta",converter:N}),wl(rn)],xl.prototype,"neutralFillInputRestDelta",void 0),oa([L({attribute:"neutral-fill-input-hover-delta",converter:N}),wl(on)],xl.prototype,"neutralFillInputHoverDelta",void 0),oa([L({attribute:"neutral-fill-input-active-delta",converter:N}),wl(an)],xl.prototype,"neutralFillInputActiveDelta",void 0),oa([L({attribute:"neutral-fill-input-focus-delta",converter:N}),wl(ln)],xl.prototype,"neutralFillInputFocusDelta",void 0),oa([L({attribute:"neutral-fill-layer-rest-delta",converter:N}),wl(pn)],xl.prototype,"neutralFillLayerRestDelta",void 0),oa([L({attribute:"neutral-fill-stealth-rest-delta",converter:N}),wl(xn)],xl.prototype,"neutralFillStealthRestDelta",void 0),oa([L({attribute:"neutral-fill-stealth-hover-delta",converter:N}),wl(kn)],xl.prototype,"neutralFillStealthHoverDelta",void 0),oa([L({attribute:"neutral-fill-stealth-active-delta",converter:N}),wl($n)],xl.prototype,"neutralFillStealthActiveDelta",void 0),oa([L({attribute:"neutral-fill-stealth-focus-delta",converter:N}),wl(Cn)],xl.prototype,"neutralFillStealthFocusDelta",void 0),oa([L({attribute:"neutral-fill-strong-hover-delta",converter:N}),wl(Sn)],xl.prototype,"neutralFillStrongHoverDelta",void 0),oa([L({attribute:"neutral-fill-strong-active-delta",converter:N}),wl(In)],xl.prototype,"neutralFillStrongActiveDelta",void 0),oa([L({attribute:"neutral-fill-strong-focus-delta",converter:N}),wl(Tn)],xl.prototype,"neutralFillStrongFocusDelta",void 0),oa([L({attribute:"base-layer-luminance",converter:N}),wl(Us)],xl.prototype,"baseLayerLuminance",void 0),oa([L({attribute:"neutral-stroke-divider-rest-delta",converter:N}),wl(Pn)],xl.prototype,"neutralStrokeDividerRestDelta",void 0),oa([L({attribute:"neutral-stroke-rest-delta",converter:N}),wl(On)],xl.prototype,"neutralStrokeRestDelta",void 0),oa([L({attribute:"neutral-stroke-hover-delta",converter:N}),wl(Fn)],xl.prototype,"neutralStrokeHoverDelta",void 0),oa([L({attribute:"neutral-stroke-active-delta",converter:N}),wl(An)],xl.prototype,"neutralStrokeActiveDelta",void 0),oa([L({attribute:"neutral-stroke-focus-delta",converter:N}),wl(En)],xl.prototype,"neutralStrokeFocusDelta",void 0);const kl=xl.compose({baseName:"design-system-provider",template:Qt` <slot></slot> `,styles:xo`
    ${Co("block")}
  `});function $l(e){if(!Number.isSafeInteger(e)||e<0)throw new Error(`positive integer expected, not ${e}`)}function Cl(e,...t){if(!((i=e)instanceof Uint8Array||null!=i&&"object"==typeof i&&"Uint8Array"===i.constructor.name))throw new Error("Uint8Array expected");var i;if(t.length>0&&!t.includes(e.length))throw new Error(`Uint8Array expected of length ${t}, not of length=${e.length}`)}function _l(e,t=!0){if(e.destroyed)throw new Error("Hash instance has been destroyed");if(t&&e.finished)throw new Error("Hash#digest() has already been called")}function Sl(e,t){Cl(e);const i=t.outputLen;if(e.length<i)throw new Error(`digestInto() expects output buffer of length at least ${i}`)}const Il={number:$l,bool:function(e){if("boolean"!=typeof e)throw new Error(`boolean expected, not ${e}`)},bytes:Cl,hash:function(e){if("function"!=typeof e||"function"!=typeof e.create)throw new Error("Hash should be wrapped by utils.wrapConstructor");$l(e.outputLen),$l(e.blockLen)},exists:_l,output:Sl},Tl=BigInt(2**32-1),Ol=BigInt(32);function Fl(e,t=!1){return t?{h:Number(e&Tl),l:Number(e>>Ol&Tl)}:{h:0|Number(e>>Ol&Tl),l:0|Number(e&Tl)}}function Al(e,t=!1){let i=new Uint32Array(e.length),s=new Uint32Array(e.length);for(let n=0;n<e.length;n++){const{h:r,l:o}=Fl(e[n],t);[i[n],s[n]]=[r,o]}return[i,s]}"object"==typeof globalThis&&"crypto"in globalThis&&globalThis.crypto;const El=68===new Uint8Array(new Uint32Array([287454020]).buffer)[0];function Dl(e){for(let i=0;i<e.length;i++)e[i]=(t=e[i])<<24&4278190080|t<<8&16711680|t>>>8&65280|t>>>24&255;var t}function Rl(e){if("string"!=typeof e)throw new Error("utf8ToBytes expected string, got "+typeof e);return new Uint8Array((new TextEncoder).encode(e))}function Vl(e){return"string"==typeof e&&(e=Rl(e)),Cl(e),e}class Nl{clone(){return this._cloneInto()}}const Pl=[],Ll=[],Ml=[],Bl=BigInt(0),zl=BigInt(1),jl=BigInt(2),Hl=BigInt(7),Zl=BigInt(256),Ul=BigInt(113);for(let e=0,t=zl,i=1,s=0;e<24;e++){[i,s]=[s,(2*i+3*s)%5],Pl.push(2*(5*s+i)),Ll.push((e+1)*(e+2)/2%64);let n=Bl;for(let e=0;e<7;e++)t=(t<<zl^(t>>Hl)*Ul)%Zl,t&jl&&(n^=zl<<(zl<<BigInt(e))-zl);Ml.push(n)}const[ql,Wl]=Al(Ml,!0),Xl=(e,t,i)=>i>32?((e,t,i)=>t<<i-32|e>>>64-i)(e,t,i):((e,t,i)=>e<<i|t>>>32-i)(e,t,i),Gl=(e,t,i)=>i>32?((e,t,i)=>e<<i-32|t>>>64-i)(e,t,i):((e,t,i)=>t<<i|e>>>32-i)(e,t,i);class Kl extends Nl{constructor(e,t,i,s=!1,n=24){if(super(),this.blockLen=e,this.suffix=t,this.outputLen=i,this.enableXOF=s,this.rounds=n,this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,$l(i),0>=this.blockLen||this.blockLen>=200)throw new Error("Sha3 supports only keccak-f1600 function");var r;this.state=new Uint8Array(200),this.state32=(r=this.state,new Uint32Array(r.buffer,r.byteOffset,Math.floor(r.byteLength/4)))}keccak(){El||Dl(this.state32),function(e,t=24){const i=new Uint32Array(10);for(let s=24-t;s<24;s++){for(let t=0;t<10;t++)i[t]=e[t]^e[t+10]^e[t+20]^e[t+30]^e[t+40];for(let t=0;t<10;t+=2){const s=(t+8)%10,n=(t+2)%10,r=i[n],o=i[n+1],a=Xl(r,o,1)^i[s],l=Gl(r,o,1)^i[s+1];for(let i=0;i<50;i+=10)e[t+i]^=a,e[t+i+1]^=l}let t=e[2],n=e[3];for(let i=0;i<24;i++){const s=Ll[i],r=Xl(t,n,s),o=Gl(t,n,s),a=Pl[i];t=e[a],n=e[a+1],e[a]=r,e[a+1]=o}for(let t=0;t<50;t+=10){for(let s=0;s<10;s++)i[s]=e[t+s];for(let s=0;s<10;s++)e[t+s]^=~i[(s+2)%10]&i[(s+4)%10]}e[0]^=ql[s],e[1]^=Wl[s]}i.fill(0)}(this.state32,this.rounds),El||Dl(this.state32),this.posOut=0,this.pos=0}update(e){_l(this);const{blockLen:t,state:i}=this,s=(e=Vl(e)).length;for(let n=0;n<s;){const r=Math.min(t-this.pos,s-n);for(let t=0;t<r;t++)i[this.pos++]^=e[n++];this.pos===t&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;const{state:e,suffix:t,pos:i,blockLen:s}=this;e[i]^=t,128&t&&i===s-1&&this.keccak(),e[s-1]^=128,this.keccak()}writeInto(e){_l(this,!1),Cl(e),this.finish();const t=this.state,{blockLen:i}=this;for(let s=0,n=e.length;s<n;){this.posOut>=i&&this.keccak();const r=Math.min(i-this.posOut,n-s);e.set(t.subarray(this.posOut,this.posOut+r),s),this.posOut+=r,s+=r}return e}xofInto(e){if(!this.enableXOF)throw new Error("XOF is not possible for this instance");return this.writeInto(e)}xof(e){return $l(e),this.xofInto(new Uint8Array(e))}digestInto(e){if(Sl(e,this),this.finished)throw new Error("digest() was already called");return this.writeInto(e),this.destroy(),e}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=!0,this.state.fill(0)}_cloneInto(e){const{blockLen:t,suffix:i,outputLen:s,rounds:n,enableXOF:r}=this;return e||(e=new Kl(t,i,s,r,n)),e.state32.set(this.state32),e.pos=this.pos,e.posOut=this.posOut,e.finished=this.finished,e.rounds=n,e.suffix=i,e.outputLen=s,e.enableXOF=r,e.destroyed=this.destroyed,e}}const Yl=(e,t,i)=>function(e){const t=t=>e().update(Vl(t)).digest(),i=e();return t.outputLen=i.outputLen,t.blockLen=i.blockLen,t.create=()=>e(),t}((()=>new Kl(t,e,i))),Jl=Yl(1,144,28),Ql=Yl(1,136,32),ec=Yl(1,104,48),tc=Yl(1,72,64);function ic(e){return t=>(Il.bytes(t),e(t))}Il.bool,Il.bytes,(()=>{const e="object"==typeof globalThis&&"crypto"in globalThis?globalThis.crypto:void 0,t="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);t&&!e&&t("crypto")})(),ic(Jl);const sc=(()=>{const e=ic(Ql);return e.create=Ql.create,e})(),nc=(ic(ec),ic(tc),4001),rc=4100,oc=4200,ac=4900,lc=4901,cc=-32700,uc=-32600,dc=-32601,hc=-32602,pc=-32603,fc=-32e3,gc=-32001,mc=-32002,vc=-32003,yc=-32004,bc=-32005,wc=-32006;class xc extends Error{get innerError(){return this.cause instanceof kc?this.cause.errors:this.cause}set innerError(e){Array.isArray(e)?this.cause=new kc(e):this.cause=e}constructor(e,t){super(e),Array.isArray(t)?this.cause=new kc(t):this.cause=t,this.name=this.constructor.name,"function"==typeof Error.captureStackTrace?Error.captureStackTrace(new.target.constructor):this.stack=(new Error).stack}static convertToString(e,t=!1){if(null==e)return"undefined";const i=JSON.stringify(e,((e,t)=>"bigint"==typeof t?t.toString():t));return t&&["bigint","string"].includes(typeof e)?i.replace(/['\\"]+/g,""):i}toJSON(){return{name:this.name,code:this.code,message:this.message,cause:this.cause,innerError:this.cause}}}class kc extends xc{constructor(e){super(`Multiple errors occurred: [${e.map((e=>e.message)).join("], [")}]`),this.code=208,this.errors=e}}class $c extends xc{constructor(e,t){super(`Invalid value given "${xc.convertToString(e,!0)}". Error: ${t}.`),this.name=this.constructor.name}}class Cc extends xc{constructor(e,t){super(e),this.code=205,this.props=null!=t?t:{}}}class _c extends $c{constructor(e){super(e,"can not parse as byte data"),this.code=1002}}class Sc extends $c{constructor(e){super(e,"can not parse as number data"),this.code=1003}}class Ic extends $c{constructor(e){super(e,"not a valid boolean."),this.code=1008}}const Tc={[cc]:{message:"Parse error",description:"Invalid JSON"},[uc]:{message:"Invalid request",description:"JSON is not a valid request object\t"},[dc]:{message:"Method not found",description:"Method does not exist\t"},[hc]:{message:"Invalid params",description:"Invalid method parameters"},[pc]:{message:"Internal error",description:"Internal JSON-RPC error"},[fc]:{message:"Invalid input",description:"Missing or invalid parameters"},[gc]:{message:"Resource not found",description:"Requested resource not found"},[mc]:{message:"Resource unavailable",description:"Requested resource not available"},[vc]:{message:"Transaction rejected",description:"Transaction creation failed"},[yc]:{message:"Method not supported",description:"Method is not implemented"},[bc]:{message:"Limit exceeded",description:"Request exceeds defined limit"},[wc]:{message:"JSON-RPC version not supported",description:"Version of JSON-RPC protocol is not supported"},[nc]:{name:"User Rejected Request",message:"The user rejected the request."},[rc]:{name:"Unauthorized",message:"The requested method and/or account has not been authorized by the user."},[oc]:{name:"Unsupported Method",message:"The Provider does not support the requested method."},[ac]:{name:"Disconnected",message:"The Provider is disconnected from all chains."},[lc]:{name:"Chain Disconnected",message:"The Provider is not connected to the requested chain."},"0-999":{name:"",message:"Not used."},1e3:{name:"Normal Closure",message:"The connection successfully completed the purpose for which it was created."},1001:{name:"Going Away",message:"The endpoint is going away, either because of a server failure or because the browser is navigating away from the page that opened the connection."},1002:{name:"Protocol error",message:"The endpoint is terminating the connection due to a protocol error."},1003:{name:"Unsupported Data",message:"The connection is being terminated because the endpoint received data of a type it cannot accept. (For example, a text-only endpoint received binary data.)"},1004:{name:"Reserved",message:"Reserved. A meaning might be defined in the future."},1005:{name:"No Status Rcvd",message:"Reserved. Indicates that no status code was provided even though one was expected."},1006:{name:"Abnormal Closure",message:"Reserved. Indicates that a connection was closed abnormally (that is, with no close frame being sent) when a status code is expected."},1007:{name:"Invalid frame payload data",message:"The endpoint is terminating the connection because a message was received that contained inconsistent data (e.g., non-UTF-8 data within a text message)."},1008:{name:"Policy Violation",message:"The endpoint is terminating the connection because it received a message that violates its policy. This is a generic status code, used when codes 1003 and 1009 are not suitable."},1009:{name:"Message Too Big",message:"The endpoint is terminating the connection because a data frame was received that is too large."},1010:{name:"Mandatory Ext.",message:"The client is terminating the connection because it expected the server to negotiate one or more extension, but the server didn't."},1011:{name:"Internal Error",message:"The server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request."},1012:{name:"Service Restart",message:"The server is terminating the connection because it is restarting."},1013:{name:"Try Again Later",message:"The server is terminating the connection due to a temporary condition, e.g. it is overloaded and is casting off some of its clients."},1014:{name:"Bad Gateway",message:"The server was acting as a gateway or proxy and received an invalid response from the upstream server. This is similar to 502 HTTP Status Code."},1015:{name:"TLS handshake",message:"Reserved. Indicates that the connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified)."},"1016-2999":{name:"",message:"For definition by future revisions of the WebSocket Protocol specification, and for definition by extension specifications."},"3000-3999":{name:"",message:"For use by libraries, frameworks, and applications. These status codes are registered directly with IANA. The interpretation of these codes is undefined by the WebSocket protocol."},"4000-4999":{name:"",message:"For private use, and thus can't be registered. Such codes can be used by prior agreements between WebSocket applications. The interpretation of these codes is undefined by the WebSocket protocol."}};class Oc extends xc{constructor(e,t){super(null!=t?t:"An Rpc error has occured with a code of *code*".replace("*code*",e.error.code.toString())),this.code=e.error.code,this.id=e.id,this.jsonrpc=e.jsonrpc,this.jsonRpcError=e.error}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{error:this.jsonRpcError,id:this.id,jsonRpc:this.jsonrpc})}}const Fc=new Map;Fc.set(cc,{error:class extends Oc{constructor(e){super(e,Tc[-32700].message),this.code=cc}}}),Fc.set(uc,{error:class extends Oc{constructor(e){super(e,Tc[-32600].message),this.code=uc}}}),Fc.set(dc,{error:class extends Oc{constructor(e){super(e,Tc[-32601].message),this.code=dc}}}),Fc.set(hc,{error:class extends Oc{constructor(e){super(e,Tc[-32602].message),this.code=hc}}}),Fc.set(pc,{error:class extends Oc{constructor(e){super(e,Tc[-32603].message),this.code=pc}}}),Fc.set(fc,{error:class extends Oc{constructor(e){super(e,Tc[-32e3].message),this.code=fc}}}),Fc.set(yc,{error:class extends Oc{constructor(e){super(e,Tc[-32004].message),this.code=yc}}}),Fc.set(mc,{error:class extends Oc{constructor(e){super(e,Tc[-32002].message),this.code=mc}}}),Fc.set(vc,{error:class extends Oc{constructor(e){super(e,Tc[-32003].message),this.code=vc}}}),Fc.set(gc,{error:class extends Oc{constructor(e){super(e,Tc[-32001].message),this.code=gc}}}),Fc.set(wc,{error:class extends Oc{constructor(e){super(e,Tc[-32006].message),this.code=wc}}}),Fc.set(bc,{error:class extends Oc{constructor(e){super(e,Tc[-32005].message),this.code=bc}}});class Ac extends xc{constructor(e){super(`Format for the type ${e} is unsupported`),this.type=e,this.code=1200}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{type:this.type})}}var Ec,Dc;!function(e){e.assertEqual=e=>{},e.assertIs=function(e){},e.assertNever=function(e){throw new Error},e.arrayToEnum=e=>{const t={};for(const i of e)t[i]=i;return t},e.getValidEnumValues=t=>{const i=e.objectKeys(t).filter((e=>"number"!=typeof t[t[e]])),s={};for(const e of i)s[e]=t[e];return e.objectValues(s)},e.objectValues=t=>e.objectKeys(t).map((function(e){return t[e]})),e.objectKeys="function"==typeof Object.keys?e=>Object.keys(e):e=>{const t=[];for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.push(i);return t},e.find=(e,t)=>{for(const i of e)if(t(i))return i},e.isInteger="function"==typeof Number.isInteger?e=>Number.isInteger(e):e=>"number"==typeof e&&Number.isFinite(e)&&Math.floor(e)===e,e.joinValues=function(e,t=" | "){return e.map((e=>"string"==typeof e?`'${e}'`:e)).join(t)},e.jsonStringifyReplacer=(e,t)=>"bigint"==typeof t?t.toString():t}(Ec||(Ec={})),function(e){e.mergeShapes=(e,t)=>({...e,...t})}(Dc||(Dc={}));const Rc=Ec.arrayToEnum(["string","nan","number","integer","float","boolean","date","bigint","symbol","function","undefined","null","array","object","unknown","promise","void","never","map","set"]),Vc=e=>{switch(typeof e){case"undefined":return Rc.undefined;case"string":return Rc.string;case"number":return Number.isNaN(e)?Rc.nan:Rc.number;case"boolean":return Rc.boolean;case"function":return Rc.function;case"bigint":return Rc.bigint;case"symbol":return Rc.symbol;case"object":return Array.isArray(e)?Rc.array:null===e?Rc.null:e.then&&"function"==typeof e.then&&e.catch&&"function"==typeof e.catch?Rc.promise:"undefined"!=typeof Map&&e instanceof Map?Rc.map:"undefined"!=typeof Set&&e instanceof Set?Rc.set:"undefined"!=typeof Date&&e instanceof Date?Rc.date:Rc.object;default:return Rc.unknown}},Nc=Ec.arrayToEnum(["invalid_type","invalid_literal","custom","invalid_union","invalid_union_discriminator","invalid_enum_value","unrecognized_keys","invalid_arguments","invalid_return_type","invalid_date","invalid_string","too_small","too_big","invalid_intersection_types","not_multiple_of","not_finite"]),Pc=e=>JSON.stringify(e,null,2).replace(/"([^"]+)":/g,"$1:");class Lc extends Error{get errors(){return this.issues}constructor(e){super(),this.issues=[],this.addIssue=e=>{this.issues=[...this.issues,e]},this.addIssues=(e=[])=>{this.issues=[...this.issues,...e]};const t=new.target.prototype;Object.setPrototypeOf?Object.setPrototypeOf(this,t):this.__proto__=t,this.name="ZodError",this.issues=e}format(e){const t=e||function(e){return e.message},i={_errors:[]},s=e=>{for(const n of e.issues)if("invalid_union"===n.code)n.unionErrors.map(s);else if("invalid_return_type"===n.code)s(n.returnTypeError);else if("invalid_arguments"===n.code)s(n.argumentsError);else if(0===n.path.length)i._errors.push(t(n));else{let e=i,s=0;for(;s<n.path.length;){const i=n.path[s];s===n.path.length-1?(e[i]=e[i]||{_errors:[]},e[i]._errors.push(t(n))):e[i]=e[i]||{_errors:[]},e=e[i],s++}}};return s(this),i}static assert(e){if(!(e instanceof Lc))throw new Error(`Not a ZodError: ${e}`)}toString(){return this.message}get message(){return JSON.stringify(this.issues,Ec.jsonStringifyReplacer,2)}get isEmpty(){return 0===this.issues.length}flatten(e=e=>e.message){const t={},i=[];for(const s of this.issues)s.path.length>0?(t[s.path[0]]=t[s.path[0]]||[],t[s.path[0]].push(e(s))):i.push(e(s));return{formErrors:i,fieldErrors:t}}get formErrors(){return this.flatten()}}Lc.create=e=>new Lc(e);const Mc=(e,t)=>{let i;switch(e.code){case Nc.invalid_type:i=e.received===Rc.undefined?"Required":`Expected ${e.expected}, received ${e.received}`;break;case Nc.invalid_literal:i=`Invalid literal value, expected ${JSON.stringify(e.expected,Ec.jsonStringifyReplacer)}`;break;case Nc.unrecognized_keys:i=`Unrecognized key(s) in object: ${Ec.joinValues(e.keys,", ")}`;break;case Nc.invalid_union:i="Invalid input";break;case Nc.invalid_union_discriminator:i=`Invalid discriminator value. Expected ${Ec.joinValues(e.options)}`;break;case Nc.invalid_enum_value:i=`Invalid enum value. Expected ${Ec.joinValues(e.options)}, received '${e.received}'`;break;case Nc.invalid_arguments:i="Invalid function arguments";break;case Nc.invalid_return_type:i="Invalid function return type";break;case Nc.invalid_date:i="Invalid date";break;case Nc.invalid_string:"object"==typeof e.validation?"includes"in e.validation?(i=`Invalid input: must include "${e.validation.includes}"`,"number"==typeof e.validation.position&&(i=`${i} at one or more positions greater than or equal to ${e.validation.position}`)):"startsWith"in e.validation?i=`Invalid input: must start with "${e.validation.startsWith}"`:"endsWith"in e.validation?i=`Invalid input: must end with "${e.validation.endsWith}"`:Ec.assertNever(e.validation):i="regex"!==e.validation?`Invalid ${e.validation}`:"Invalid";break;case Nc.too_small:i="array"===e.type?`Array must contain ${e.exact?"exactly":e.inclusive?"at least":"more than"} ${e.minimum} element(s)`:"string"===e.type?`String must contain ${e.exact?"exactly":e.inclusive?"at least":"over"} ${e.minimum} character(s)`:"number"===e.type?`Number must be ${e.exact?"exactly equal to ":e.inclusive?"greater than or equal to ":"greater than "}${e.minimum}`:"date"===e.type?`Date must be ${e.exact?"exactly equal to ":e.inclusive?"greater than or equal to ":"greater than "}${new Date(Number(e.minimum))}`:"Invalid input";break;case Nc.too_big:i="array"===e.type?`Array must contain ${e.exact?"exactly":e.inclusive?"at most":"less than"} ${e.maximum} element(s)`:"string"===e.type?`String must contain ${e.exact?"exactly":e.inclusive?"at most":"under"} ${e.maximum} character(s)`:"number"===e.type?`Number must be ${e.exact?"exactly":e.inclusive?"less than or equal to":"less than"} ${e.maximum}`:"bigint"===e.type?`BigInt must be ${e.exact?"exactly":e.inclusive?"less than or equal to":"less than"} ${e.maximum}`:"date"===e.type?`Date must be ${e.exact?"exactly":e.inclusive?"smaller than or equal to":"smaller than"} ${new Date(Number(e.maximum))}`:"Invalid input";break;case Nc.custom:i="Invalid input";break;case Nc.invalid_intersection_types:i="Intersection results could not be merged";break;case Nc.not_multiple_of:i=`Number must be a multiple of ${e.multipleOf}`;break;case Nc.not_finite:i="Number must be finite";break;default:i=t.defaultError,Ec.assertNever(e)}return{message:i}};let Bc=Mc;function zc(e){Bc=e}function jc(){return Bc}const Hc=e=>{const{data:t,path:i,errorMaps:s,issueData:n}=e,r=[...i,...n.path||[]],o={...n,path:r};if(void 0!==n.message)return{...n,path:r,message:n.message};let a="";const l=s.filter((e=>!!e)).slice().reverse();for(const e of l)a=e(o,{data:t,defaultError:a}).message;return{...n,path:r,message:a}},Zc=[];function Uc(e,t){const i=jc(),s=Hc({issueData:t,data:e.data,path:e.path,errorMaps:[e.common.contextualErrorMap,e.schemaErrorMap,i,i===Mc?void 0:Mc].filter((e=>!!e))});e.common.issues.push(s)}class qc{constructor(){this.value="valid"}dirty(){"valid"===this.value&&(this.value="dirty")}abort(){"aborted"!==this.value&&(this.value="aborted")}static mergeArray(e,t){const i=[];for(const s of t){if("aborted"===s.status)return Wc;"dirty"===s.status&&e.dirty(),i.push(s.value)}return{status:e.value,value:i}}static async mergeObjectAsync(e,t){const i=[];for(const e of t){const t=await e.key,s=await e.value;i.push({key:t,value:s})}return qc.mergeObjectSync(e,i)}static mergeObjectSync(e,t){const i={};for(const s of t){const{key:t,value:n}=s;if("aborted"===t.status)return Wc;if("aborted"===n.status)return Wc;"dirty"===t.status&&e.dirty(),"dirty"===n.status&&e.dirty(),"__proto__"===t.value||void 0===n.value&&!s.alwaysSet||(i[t.value]=n.value)}return{status:e.value,value:i}}}const Wc=Object.freeze({status:"aborted"}),Xc=e=>({status:"dirty",value:e}),Gc=e=>({status:"valid",value:e}),Kc=e=>"aborted"===e.status,Yc=e=>"dirty"===e.status,Jc=e=>"valid"===e.status,Qc=e=>"undefined"!=typeof Promise&&e instanceof Promise;var eu;!function(e){e.errToObj=e=>"string"==typeof e?{message:e}:e||{},e.toString=e=>"string"==typeof e?e:e?.message}(eu||(eu={}));class tu{constructor(e,t,i,s){this._cachedPath=[],this.parent=e,this.data=t,this._path=i,this._key=s}get path(){return this._cachedPath.length||(Array.isArray(this._key)?this._cachedPath.push(...this._path,...this._key):this._cachedPath.push(...this._path,this._key)),this._cachedPath}}const iu=(e,t)=>{if(Jc(t))return{success:!0,data:t.value};if(!e.common.issues.length)throw new Error("Validation failed but no issues detected.");return{success:!1,get error(){if(this._error)return this._error;const t=new Lc(e.common.issues);return this._error=t,this._error}}};function su(e){if(!e)return{};const{errorMap:t,invalid_type_error:i,required_error:s,description:n}=e;if(t&&(i||s))throw new Error('Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.');return t?{errorMap:t,description:n}:{errorMap:(t,n)=>{const{message:r}=e;return"invalid_enum_value"===t.code?{message:r??n.defaultError}:void 0===n.data?{message:r??s??n.defaultError}:"invalid_type"!==t.code?{message:n.defaultError}:{message:r??i??n.defaultError}},description:n}}class nu{get description(){return this._def.description}_getType(e){return Vc(e.data)}_getOrReturnCtx(e,t){return t||{common:e.parent.common,data:e.data,parsedType:Vc(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}_processInputParams(e){return{status:new qc,ctx:{common:e.parent.common,data:e.data,parsedType:Vc(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}}_parseSync(e){const t=this._parse(e);if(Qc(t))throw new Error("Synchronous parse encountered promise.");return t}_parseAsync(e){const t=this._parse(e);return Promise.resolve(t)}parse(e,t){const i=this.safeParse(e,t);if(i.success)return i.data;throw i.error}safeParse(e,t){const i={common:{issues:[],async:t?.async??!1,contextualErrorMap:t?.errorMap},path:t?.path||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:Vc(e)},s=this._parseSync({data:e,path:i.path,parent:i});return iu(i,s)}"~validate"(e){const t={common:{issues:[],async:!!this["~standard"].async},path:[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:Vc(e)};if(!this["~standard"].async)try{const i=this._parseSync({data:e,path:[],parent:t});return Jc(i)?{value:i.value}:{issues:t.common.issues}}catch(e){e?.message?.toLowerCase()?.includes("encountered")&&(this["~standard"].async=!0),t.common={issues:[],async:!0}}return this._parseAsync({data:e,path:[],parent:t}).then((e=>Jc(e)?{value:e.value}:{issues:t.common.issues}))}async parseAsync(e,t){const i=await this.safeParseAsync(e,t);if(i.success)return i.data;throw i.error}async safeParseAsync(e,t){const i={common:{issues:[],contextualErrorMap:t?.errorMap,async:!0},path:t?.path||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:Vc(e)},s=this._parse({data:e,path:i.path,parent:i}),n=await(Qc(s)?s:Promise.resolve(s));return iu(i,n)}refine(e,t){const i=e=>"string"==typeof t||void 0===t?{message:t}:"function"==typeof t?t(e):t;return this._refinement(((t,s)=>{const n=e(t),r=()=>s.addIssue({code:Nc.custom,...i(t)});return"undefined"!=typeof Promise&&n instanceof Promise?n.then((e=>!!e||(r(),!1))):!!n||(r(),!1)}))}refinement(e,t){return this._refinement(((i,s)=>!!e(i)||(s.addIssue("function"==typeof t?t(i,s):t),!1)))}_refinement(e){return new nd({schema:this,typeName:vd.ZodEffects,effect:{type:"refinement",refinement:e}})}superRefine(e){return this._refinement(e)}constructor(e){this.spa=this.safeParseAsync,this._def=e,this.parse=this.parse.bind(this),this.safeParse=this.safeParse.bind(this),this.parseAsync=this.parseAsync.bind(this),this.safeParseAsync=this.safeParseAsync.bind(this),this.spa=this.spa.bind(this),this.refine=this.refine.bind(this),this.refinement=this.refinement.bind(this),this.superRefine=this.superRefine.bind(this),this.optional=this.optional.bind(this),this.nullable=this.nullable.bind(this),this.nullish=this.nullish.bind(this),this.array=this.array.bind(this),this.promise=this.promise.bind(this),this.or=this.or.bind(this),this.and=this.and.bind(this),this.transform=this.transform.bind(this),this.brand=this.brand.bind(this),this.default=this.default.bind(this),this.catch=this.catch.bind(this),this.describe=this.describe.bind(this),this.pipe=this.pipe.bind(this),this.readonly=this.readonly.bind(this),this.isNullable=this.isNullable.bind(this),this.isOptional=this.isOptional.bind(this),this["~standard"]={version:1,vendor:"zod",validate:e=>this["~validate"](e)}}optional(){return rd.create(this,this._def)}nullable(){return od.create(this,this._def)}nullish(){return this.nullable().optional()}array(){return Mu.create(this)}promise(){return sd.create(this,this._def)}or(e){return ju.create([this,e],this._def)}and(e){return qu.create(this,e,this._def)}transform(e){return new nd({...su(this._def),schema:this,typeName:vd.ZodEffects,effect:{type:"transform",transform:e}})}default(e){const t="function"==typeof e?e:()=>e;return new ad({...su(this._def),innerType:this,defaultValue:t,typeName:vd.ZodDefault})}brand(){return new dd({typeName:vd.ZodBranded,type:this,...su(this._def)})}catch(e){const t="function"==typeof e?e:()=>e;return new ld({...su(this._def),innerType:this,catchValue:t,typeName:vd.ZodCatch})}describe(e){return new(0,this.constructor)({...this._def,description:e})}pipe(e){return hd.create(this,e)}readonly(){return pd.create(this)}isOptional(){return this.safeParse(void 0).success}isNullable(){return this.safeParse(null).success}}const ru=/^c[^\s-]{8,}$/i,ou=/^[0-9a-z]+$/,au=/^[0-9A-HJKMNP-TV-Z]{26}$/i,lu=/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,cu=/^[a-z0-9_-]{21}$/i,uu=/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,du=/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,hu=/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;let pu;const fu=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,gu=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,mu=/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,vu=/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,yu=/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,bu=/^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,wu="((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",xu=new RegExp(`^${wu}$`);function ku(e){let t="[0-5]\\d";return e.precision?t=`${t}\\.\\d{${e.precision}}`:null==e.precision&&(t=`${t}(\\.\\d+)?`),`([01]\\d|2[0-3]):[0-5]\\d(:${t})${e.precision?"+":"?"}`}function $u(e){let t=`${wu}T${ku(e)}`;const i=[];return i.push(e.local?"Z?":"Z"),e.offset&&i.push("([+-]\\d{2}:?\\d{2})"),t=`${t}(${i.join("|")})`,new RegExp(`^${t}$`)}function Cu(e,t){if(!uu.test(e))return!1;try{const[i]=e.split("."),s=i.replace(/-/g,"+").replace(/_/g,"/").padEnd(i.length+(4-i.length%4)%4,"="),n=JSON.parse(atob(s));return!("object"!=typeof n||null===n||"typ"in n&&"JWT"!==n?.typ||!n.alg||t&&n.alg!==t)}catch{return!1}}function _u(e,t){return!("v4"!==t&&t||!gu.test(e))||!("v6"!==t&&t||!vu.test(e))}class Su extends nu{_parse(e){if(this._def.coerce&&(e.data=String(e.data)),this._getType(e)!==Rc.string){const t=this._getOrReturnCtx(e);return Uc(t,{code:Nc.invalid_type,expected:Rc.string,received:t.parsedType}),Wc}const t=new qc;let i;for(const r of this._def.checks)if("min"===r.kind)e.data.length<r.value&&(i=this._getOrReturnCtx(e,i),Uc(i,{code:Nc.too_small,minimum:r.value,type:"string",inclusive:!0,exact:!1,message:r.message}),t.dirty());else if("max"===r.kind)e.data.length>r.value&&(i=this._getOrReturnCtx(e,i),Uc(i,{code:Nc.too_big,maximum:r.value,type:"string",inclusive:!0,exact:!1,message:r.message}),t.dirty());else if("length"===r.kind){const s=e.data.length>r.value,n=e.data.length<r.value;(s||n)&&(i=this._getOrReturnCtx(e,i),s?Uc(i,{code:Nc.too_big,maximum:r.value,type:"string",inclusive:!0,exact:!0,message:r.message}):n&&Uc(i,{code:Nc.too_small,minimum:r.value,type:"string",inclusive:!0,exact:!0,message:r.message}),t.dirty())}else if("email"===r.kind)hu.test(e.data)||(i=this._getOrReturnCtx(e,i),Uc(i,{validation:"email",code:Nc.invalid_string,message:r.message}),t.dirty());else if("emoji"===r.kind)pu||(pu=new RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$","u")),pu.test(e.data)||(i=this._getOrReturnCtx(e,i),Uc(i,{validation:"emoji",code:Nc.invalid_string,message:r.message}),t.dirty());else if("uuid"===r.kind)lu.test(e.data)||(i=this._getOrReturnCtx(e,i),Uc(i,{validation:"uuid",code:Nc.invalid_string,message:r.message}),t.dirty());else if("nanoid"===r.kind)cu.test(e.data)||(i=this._getOrReturnCtx(e,i),Uc(i,{validation:"nanoid",code:Nc.invalid_string,message:r.message}),t.dirty());else if("cuid"===r.kind)ru.test(e.data)||(i=this._getOrReturnCtx(e,i),Uc(i,{validation:"cuid",code:Nc.invalid_string,message:r.message}),t.dirty());else if("cuid2"===r.kind)ou.test(e.data)||(i=this._getOrReturnCtx(e,i),Uc(i,{validation:"cuid2",code:Nc.invalid_string,message:r.message}),t.dirty());else if("ulid"===r.kind)au.test(e.data)||(i=this._getOrReturnCtx(e,i),Uc(i,{validation:"ulid",code:Nc.invalid_string,message:r.message}),t.dirty());else if("url"===r.kind)try{new URL(e.data)}catch{i=this._getOrReturnCtx(e,i),Uc(i,{validation:"url",code:Nc.invalid_string,message:r.message}),t.dirty()}else"regex"===r.kind?(r.regex.lastIndex=0,r.regex.test(e.data)||(i=this._getOrReturnCtx(e,i),Uc(i,{validation:"regex",code:Nc.invalid_string,message:r.message}),t.dirty())):"trim"===r.kind?e.data=e.data.trim():"includes"===r.kind?e.data.includes(r.value,r.position)||(i=this._getOrReturnCtx(e,i),Uc(i,{code:Nc.invalid_string,validation:{includes:r.value,position:r.position},message:r.message}),t.dirty()):"toLowerCase"===r.kind?e.data=e.data.toLowerCase():"toUpperCase"===r.kind?e.data=e.data.toUpperCase():"startsWith"===r.kind?e.data.startsWith(r.value)||(i=this._getOrReturnCtx(e,i),Uc(i,{code:Nc.invalid_string,validation:{startsWith:r.value},message:r.message}),t.dirty()):"endsWith"===r.kind?e.data.endsWith(r.value)||(i=this._getOrReturnCtx(e,i),Uc(i,{code:Nc.invalid_string,validation:{endsWith:r.value},message:r.message}),t.dirty()):"datetime"===r.kind?$u(r).test(e.data)||(i=this._getOrReturnCtx(e,i),Uc(i,{code:Nc.invalid_string,validation:"datetime",message:r.message}),t.dirty()):"date"===r.kind?xu.test(e.data)||(i=this._getOrReturnCtx(e,i),Uc(i,{code:Nc.invalid_string,validation:"date",message:r.message}),t.dirty()):"time"===r.kind?new RegExp(`^${ku(r)}$`).test(e.data)||(i=this._getOrReturnCtx(e,i),Uc(i,{code:Nc.invalid_string,validation:"time",message:r.message}),t.dirty()):"duration"===r.kind?du.test(e.data)||(i=this._getOrReturnCtx(e,i),Uc(i,{validation:"duration",code:Nc.invalid_string,message:r.message}),t.dirty()):"ip"===r.kind?(s=e.data,("v4"===(n=r.version)||!n)&&fu.test(s)||("v6"===n||!n)&&mu.test(s)||(i=this._getOrReturnCtx(e,i),Uc(i,{validation:"ip",code:Nc.invalid_string,message:r.message}),t.dirty())):"jwt"===r.kind?Cu(e.data,r.alg)||(i=this._getOrReturnCtx(e,i),Uc(i,{validation:"jwt",code:Nc.invalid_string,message:r.message}),t.dirty()):"cidr"===r.kind?_u(e.data,r.version)||(i=this._getOrReturnCtx(e,i),Uc(i,{validation:"cidr",code:Nc.invalid_string,message:r.message}),t.dirty()):"base64"===r.kind?yu.test(e.data)||(i=this._getOrReturnCtx(e,i),Uc(i,{validation:"base64",code:Nc.invalid_string,message:r.message}),t.dirty()):"base64url"===r.kind?bu.test(e.data)||(i=this._getOrReturnCtx(e,i),Uc(i,{validation:"base64url",code:Nc.invalid_string,message:r.message}),t.dirty()):Ec.assertNever(r);var s,n;return{status:t.value,value:e.data}}_regex(e,t,i){return this.refinement((t=>e.test(t)),{validation:t,code:Nc.invalid_string,...eu.errToObj(i)})}_addCheck(e){return new Su({...this._def,checks:[...this._def.checks,e]})}email(e){return this._addCheck({kind:"email",...eu.errToObj(e)})}url(e){return this._addCheck({kind:"url",...eu.errToObj(e)})}emoji(e){return this._addCheck({kind:"emoji",...eu.errToObj(e)})}uuid(e){return this._addCheck({kind:"uuid",...eu.errToObj(e)})}nanoid(e){return this._addCheck({kind:"nanoid",...eu.errToObj(e)})}cuid(e){return this._addCheck({kind:"cuid",...eu.errToObj(e)})}cuid2(e){return this._addCheck({kind:"cuid2",...eu.errToObj(e)})}ulid(e){return this._addCheck({kind:"ulid",...eu.errToObj(e)})}base64(e){return this._addCheck({kind:"base64",...eu.errToObj(e)})}base64url(e){return this._addCheck({kind:"base64url",...eu.errToObj(e)})}jwt(e){return this._addCheck({kind:"jwt",...eu.errToObj(e)})}ip(e){return this._addCheck({kind:"ip",...eu.errToObj(e)})}cidr(e){return this._addCheck({kind:"cidr",...eu.errToObj(e)})}datetime(e){return"string"==typeof e?this._addCheck({kind:"datetime",precision:null,offset:!1,local:!1,message:e}):this._addCheck({kind:"datetime",precision:void 0===e?.precision?null:e?.precision,offset:e?.offset??!1,local:e?.local??!1,...eu.errToObj(e?.message)})}date(e){return this._addCheck({kind:"date",message:e})}time(e){return"string"==typeof e?this._addCheck({kind:"time",precision:null,message:e}):this._addCheck({kind:"time",precision:void 0===e?.precision?null:e?.precision,...eu.errToObj(e?.message)})}duration(e){return this._addCheck({kind:"duration",...eu.errToObj(e)})}regex(e,t){return this._addCheck({kind:"regex",regex:e,...eu.errToObj(t)})}includes(e,t){return this._addCheck({kind:"includes",value:e,position:t?.position,...eu.errToObj(t?.message)})}startsWith(e,t){return this._addCheck({kind:"startsWith",value:e,...eu.errToObj(t)})}endsWith(e,t){return this._addCheck({kind:"endsWith",value:e,...eu.errToObj(t)})}min(e,t){return this._addCheck({kind:"min",value:e,...eu.errToObj(t)})}max(e,t){return this._addCheck({kind:"max",value:e,...eu.errToObj(t)})}length(e,t){return this._addCheck({kind:"length",value:e,...eu.errToObj(t)})}nonempty(e){return this.min(1,eu.errToObj(e))}trim(){return new Su({...this._def,checks:[...this._def.checks,{kind:"trim"}]})}toLowerCase(){return new Su({...this._def,checks:[...this._def.checks,{kind:"toLowerCase"}]})}toUpperCase(){return new Su({...this._def,checks:[...this._def.checks,{kind:"toUpperCase"}]})}get isDatetime(){return!!this._def.checks.find((e=>"datetime"===e.kind))}get isDate(){return!!this._def.checks.find((e=>"date"===e.kind))}get isTime(){return!!this._def.checks.find((e=>"time"===e.kind))}get isDuration(){return!!this._def.checks.find((e=>"duration"===e.kind))}get isEmail(){return!!this._def.checks.find((e=>"email"===e.kind))}get isURL(){return!!this._def.checks.find((e=>"url"===e.kind))}get isEmoji(){return!!this._def.checks.find((e=>"emoji"===e.kind))}get isUUID(){return!!this._def.checks.find((e=>"uuid"===e.kind))}get isNANOID(){return!!this._def.checks.find((e=>"nanoid"===e.kind))}get isCUID(){return!!this._def.checks.find((e=>"cuid"===e.kind))}get isCUID2(){return!!this._def.checks.find((e=>"cuid2"===e.kind))}get isULID(){return!!this._def.checks.find((e=>"ulid"===e.kind))}get isIP(){return!!this._def.checks.find((e=>"ip"===e.kind))}get isCIDR(){return!!this._def.checks.find((e=>"cidr"===e.kind))}get isBase64(){return!!this._def.checks.find((e=>"base64"===e.kind))}get isBase64url(){return!!this._def.checks.find((e=>"base64url"===e.kind))}get minLength(){let e=null;for(const t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return e}get maxLength(){let e=null;for(const t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return e}}function Iu(e,t){const i=(e.toString().split(".")[1]||"").length,s=(t.toString().split(".")[1]||"").length,n=i>s?i:s;return Number.parseInt(e.toFixed(n).replace(".",""))%Number.parseInt(t.toFixed(n).replace(".",""))/10**n}Su.create=e=>new Su({checks:[],typeName:vd.ZodString,coerce:e?.coerce??!1,...su(e)});class Tu extends nu{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte,this.step=this.multipleOf}_parse(e){if(this._def.coerce&&(e.data=Number(e.data)),this._getType(e)!==Rc.number){const t=this._getOrReturnCtx(e);return Uc(t,{code:Nc.invalid_type,expected:Rc.number,received:t.parsedType}),Wc}let t;const i=new qc;for(const s of this._def.checks)"int"===s.kind?Ec.isInteger(e.data)||(t=this._getOrReturnCtx(e,t),Uc(t,{code:Nc.invalid_type,expected:"integer",received:"float",message:s.message}),i.dirty()):"min"===s.kind?(s.inclusive?e.data<s.value:e.data<=s.value)&&(t=this._getOrReturnCtx(e,t),Uc(t,{code:Nc.too_small,minimum:s.value,type:"number",inclusive:s.inclusive,exact:!1,message:s.message}),i.dirty()):"max"===s.kind?(s.inclusive?e.data>s.value:e.data>=s.value)&&(t=this._getOrReturnCtx(e,t),Uc(t,{code:Nc.too_big,maximum:s.value,type:"number",inclusive:s.inclusive,exact:!1,message:s.message}),i.dirty()):"multipleOf"===s.kind?0!==Iu(e.data,s.value)&&(t=this._getOrReturnCtx(e,t),Uc(t,{code:Nc.not_multiple_of,multipleOf:s.value,message:s.message}),i.dirty()):"finite"===s.kind?Number.isFinite(e.data)||(t=this._getOrReturnCtx(e,t),Uc(t,{code:Nc.not_finite,message:s.message}),i.dirty()):Ec.assertNever(s);return{status:i.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,eu.toString(t))}gt(e,t){return this.setLimit("min",e,!1,eu.toString(t))}lte(e,t){return this.setLimit("max",e,!0,eu.toString(t))}lt(e,t){return this.setLimit("max",e,!1,eu.toString(t))}setLimit(e,t,i,s){return new Tu({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:i,message:eu.toString(s)}]})}_addCheck(e){return new Tu({...this._def,checks:[...this._def.checks,e]})}int(e){return this._addCheck({kind:"int",message:eu.toString(e)})}positive(e){return this._addCheck({kind:"min",value:0,inclusive:!1,message:eu.toString(e)})}negative(e){return this._addCheck({kind:"max",value:0,inclusive:!1,message:eu.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:0,inclusive:!0,message:eu.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:0,inclusive:!0,message:eu.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:eu.toString(t)})}finite(e){return this._addCheck({kind:"finite",message:eu.toString(e)})}safe(e){return this._addCheck({kind:"min",inclusive:!0,value:Number.MIN_SAFE_INTEGER,message:eu.toString(e)})._addCheck({kind:"max",inclusive:!0,value:Number.MAX_SAFE_INTEGER,message:eu.toString(e)})}get minValue(){let e=null;for(const t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(const t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return e}get isInt(){return!!this._def.checks.find((e=>"int"===e.kind||"multipleOf"===e.kind&&Ec.isInteger(e.value)))}get isFinite(){let e=null,t=null;for(const i of this._def.checks){if("finite"===i.kind||"int"===i.kind||"multipleOf"===i.kind)return!0;"min"===i.kind?(null===t||i.value>t)&&(t=i.value):"max"===i.kind&&(null===e||i.value<e)&&(e=i.value)}return Number.isFinite(t)&&Number.isFinite(e)}}Tu.create=e=>new Tu({checks:[],typeName:vd.ZodNumber,coerce:e?.coerce||!1,...su(e)});class Ou extends nu{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte}_parse(e){if(this._def.coerce)try{e.data=BigInt(e.data)}catch{return this._getInvalidInput(e)}if(this._getType(e)!==Rc.bigint)return this._getInvalidInput(e);let t;const i=new qc;for(const s of this._def.checks)"min"===s.kind?(s.inclusive?e.data<s.value:e.data<=s.value)&&(t=this._getOrReturnCtx(e,t),Uc(t,{code:Nc.too_small,type:"bigint",minimum:s.value,inclusive:s.inclusive,message:s.message}),i.dirty()):"max"===s.kind?(s.inclusive?e.data>s.value:e.data>=s.value)&&(t=this._getOrReturnCtx(e,t),Uc(t,{code:Nc.too_big,type:"bigint",maximum:s.value,inclusive:s.inclusive,message:s.message}),i.dirty()):"multipleOf"===s.kind?e.data%s.value!==BigInt(0)&&(t=this._getOrReturnCtx(e,t),Uc(t,{code:Nc.not_multiple_of,multipleOf:s.value,message:s.message}),i.dirty()):Ec.assertNever(s);return{status:i.value,value:e.data}}_getInvalidInput(e){const t=this._getOrReturnCtx(e);return Uc(t,{code:Nc.invalid_type,expected:Rc.bigint,received:t.parsedType}),Wc}gte(e,t){return this.setLimit("min",e,!0,eu.toString(t))}gt(e,t){return this.setLimit("min",e,!1,eu.toString(t))}lte(e,t){return this.setLimit("max",e,!0,eu.toString(t))}lt(e,t){return this.setLimit("max",e,!1,eu.toString(t))}setLimit(e,t,i,s){return new Ou({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:i,message:eu.toString(s)}]})}_addCheck(e){return new Ou({...this._def,checks:[...this._def.checks,e]})}positive(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!1,message:eu.toString(e)})}negative(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!1,message:eu.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!0,message:eu.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!0,message:eu.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:eu.toString(t)})}get minValue(){let e=null;for(const t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(const t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return e}}Ou.create=e=>new Ou({checks:[],typeName:vd.ZodBigInt,coerce:e?.coerce??!1,...su(e)});class Fu extends nu{_parse(e){if(this._def.coerce&&(e.data=Boolean(e.data)),this._getType(e)!==Rc.boolean){const t=this._getOrReturnCtx(e);return Uc(t,{code:Nc.invalid_type,expected:Rc.boolean,received:t.parsedType}),Wc}return Gc(e.data)}}Fu.create=e=>new Fu({typeName:vd.ZodBoolean,coerce:e?.coerce||!1,...su(e)});class Au extends nu{_parse(e){if(this._def.coerce&&(e.data=new Date(e.data)),this._getType(e)!==Rc.date){const t=this._getOrReturnCtx(e);return Uc(t,{code:Nc.invalid_type,expected:Rc.date,received:t.parsedType}),Wc}if(Number.isNaN(e.data.getTime()))return Uc(this._getOrReturnCtx(e),{code:Nc.invalid_date}),Wc;const t=new qc;let i;for(const s of this._def.checks)"min"===s.kind?e.data.getTime()<s.value&&(i=this._getOrReturnCtx(e,i),Uc(i,{code:Nc.too_small,message:s.message,inclusive:!0,exact:!1,minimum:s.value,type:"date"}),t.dirty()):"max"===s.kind?e.data.getTime()>s.value&&(i=this._getOrReturnCtx(e,i),Uc(i,{code:Nc.too_big,message:s.message,inclusive:!0,exact:!1,maximum:s.value,type:"date"}),t.dirty()):Ec.assertNever(s);return{status:t.value,value:new Date(e.data.getTime())}}_addCheck(e){return new Au({...this._def,checks:[...this._def.checks,e]})}min(e,t){return this._addCheck({kind:"min",value:e.getTime(),message:eu.toString(t)})}max(e,t){return this._addCheck({kind:"max",value:e.getTime(),message:eu.toString(t)})}get minDate(){let e=null;for(const t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return null!=e?new Date(e):null}get maxDate(){let e=null;for(const t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return null!=e?new Date(e):null}}Au.create=e=>new Au({checks:[],coerce:e?.coerce||!1,typeName:vd.ZodDate,...su(e)});class Eu extends nu{_parse(e){if(this._getType(e)!==Rc.symbol){const t=this._getOrReturnCtx(e);return Uc(t,{code:Nc.invalid_type,expected:Rc.symbol,received:t.parsedType}),Wc}return Gc(e.data)}}Eu.create=e=>new Eu({typeName:vd.ZodSymbol,...su(e)});class Du extends nu{_parse(e){if(this._getType(e)!==Rc.undefined){const t=this._getOrReturnCtx(e);return Uc(t,{code:Nc.invalid_type,expected:Rc.undefined,received:t.parsedType}),Wc}return Gc(e.data)}}Du.create=e=>new Du({typeName:vd.ZodUndefined,...su(e)});class Ru extends nu{_parse(e){if(this._getType(e)!==Rc.null){const t=this._getOrReturnCtx(e);return Uc(t,{code:Nc.invalid_type,expected:Rc.null,received:t.parsedType}),Wc}return Gc(e.data)}}Ru.create=e=>new Ru({typeName:vd.ZodNull,...su(e)});class Vu extends nu{constructor(){super(...arguments),this._any=!0}_parse(e){return Gc(e.data)}}Vu.create=e=>new Vu({typeName:vd.ZodAny,...su(e)});class Nu extends nu{constructor(){super(...arguments),this._unknown=!0}_parse(e){return Gc(e.data)}}Nu.create=e=>new Nu({typeName:vd.ZodUnknown,...su(e)});class Pu extends nu{_parse(e){const t=this._getOrReturnCtx(e);return Uc(t,{code:Nc.invalid_type,expected:Rc.never,received:t.parsedType}),Wc}}Pu.create=e=>new Pu({typeName:vd.ZodNever,...su(e)});class Lu extends nu{_parse(e){if(this._getType(e)!==Rc.undefined){const t=this._getOrReturnCtx(e);return Uc(t,{code:Nc.invalid_type,expected:Rc.void,received:t.parsedType}),Wc}return Gc(e.data)}}Lu.create=e=>new Lu({typeName:vd.ZodVoid,...su(e)});class Mu extends nu{_parse(e){const{ctx:t,status:i}=this._processInputParams(e),s=this._def;if(t.parsedType!==Rc.array)return Uc(t,{code:Nc.invalid_type,expected:Rc.array,received:t.parsedType}),Wc;if(null!==s.exactLength){const e=t.data.length>s.exactLength.value,n=t.data.length<s.exactLength.value;(e||n)&&(Uc(t,{code:e?Nc.too_big:Nc.too_small,minimum:n?s.exactLength.value:void 0,maximum:e?s.exactLength.value:void 0,type:"array",inclusive:!0,exact:!0,message:s.exactLength.message}),i.dirty())}if(null!==s.minLength&&t.data.length<s.minLength.value&&(Uc(t,{code:Nc.too_small,minimum:s.minLength.value,type:"array",inclusive:!0,exact:!1,message:s.minLength.message}),i.dirty()),null!==s.maxLength&&t.data.length>s.maxLength.value&&(Uc(t,{code:Nc.too_big,maximum:s.maxLength.value,type:"array",inclusive:!0,exact:!1,message:s.maxLength.message}),i.dirty()),t.common.async)return Promise.all([...t.data].map(((e,i)=>s.type._parseAsync(new tu(t,e,t.path,i))))).then((e=>qc.mergeArray(i,e)));const n=[...t.data].map(((e,i)=>s.type._parseSync(new tu(t,e,t.path,i))));return qc.mergeArray(i,n)}get element(){return this._def.type}min(e,t){return new Mu({...this._def,minLength:{value:e,message:eu.toString(t)}})}max(e,t){return new Mu({...this._def,maxLength:{value:e,message:eu.toString(t)}})}length(e,t){return new Mu({...this._def,exactLength:{value:e,message:eu.toString(t)}})}nonempty(e){return this.min(1,e)}}function Bu(e){if(e instanceof zu){const t={};for(const i in e.shape){const s=e.shape[i];t[i]=rd.create(Bu(s))}return new zu({...e._def,shape:()=>t})}return e instanceof Mu?new Mu({...e._def,type:Bu(e.element)}):e instanceof rd?rd.create(Bu(e.unwrap())):e instanceof od?od.create(Bu(e.unwrap())):e instanceof Wu?Wu.create(e.items.map((e=>Bu(e)))):e}Mu.create=(e,t)=>new Mu({type:e,minLength:null,maxLength:null,exactLength:null,typeName:vd.ZodArray,...su(t)});class zu extends nu{constructor(){super(...arguments),this._cached=null,this.nonstrict=this.passthrough,this.augment=this.extend}_getCached(){if(null!==this._cached)return this._cached;const e=this._def.shape(),t=Ec.objectKeys(e);return this._cached={shape:e,keys:t},this._cached}_parse(e){if(this._getType(e)!==Rc.object){const t=this._getOrReturnCtx(e);return Uc(t,{code:Nc.invalid_type,expected:Rc.object,received:t.parsedType}),Wc}const{status:t,ctx:i}=this._processInputParams(e),{shape:s,keys:n}=this._getCached(),r=[];if(!(this._def.catchall instanceof Pu&&"strip"===this._def.unknownKeys))for(const e in i.data)n.includes(e)||r.push(e);const o=[];for(const e of n){const t=s[e],n=i.data[e];o.push({key:{status:"valid",value:e},value:t._parse(new tu(i,n,i.path,e)),alwaysSet:e in i.data})}if(this._def.catchall instanceof Pu){const e=this._def.unknownKeys;if("passthrough"===e)for(const e of r)o.push({key:{status:"valid",value:e},value:{status:"valid",value:i.data[e]}});else if("strict"===e)r.length>0&&(Uc(i,{code:Nc.unrecognized_keys,keys:r}),t.dirty());else if("strip"!==e)throw new Error("Internal ZodObject error: invalid unknownKeys value.")}else{const e=this._def.catchall;for(const t of r){const s=i.data[t];o.push({key:{status:"valid",value:t},value:e._parse(new tu(i,s,i.path,t)),alwaysSet:t in i.data})}}return i.common.async?Promise.resolve().then((async()=>{const e=[];for(const t of o){const i=await t.key,s=await t.value;e.push({key:i,value:s,alwaysSet:t.alwaysSet})}return e})).then((e=>qc.mergeObjectSync(t,e))):qc.mergeObjectSync(t,o)}get shape(){return this._def.shape()}strict(e){return eu.errToObj,new zu({...this._def,unknownKeys:"strict",...void 0!==e?{errorMap:(t,i)=>{const s=this._def.errorMap?.(t,i).message??i.defaultError;return"unrecognized_keys"===t.code?{message:eu.errToObj(e).message??s}:{message:s}}}:{}})}strip(){return new zu({...this._def,unknownKeys:"strip"})}passthrough(){return new zu({...this._def,unknownKeys:"passthrough"})}extend(e){return new zu({...this._def,shape:()=>({...this._def.shape(),...e})})}merge(e){return new zu({unknownKeys:e._def.unknownKeys,catchall:e._def.catchall,shape:()=>({...this._def.shape(),...e._def.shape()}),typeName:vd.ZodObject})}setKey(e,t){return this.augment({[e]:t})}catchall(e){return new zu({...this._def,catchall:e})}pick(e){const t={};for(const i of Ec.objectKeys(e))e[i]&&this.shape[i]&&(t[i]=this.shape[i]);return new zu({...this._def,shape:()=>t})}omit(e){const t={};for(const i of Ec.objectKeys(this.shape))e[i]||(t[i]=this.shape[i]);return new zu({...this._def,shape:()=>t})}deepPartial(){return Bu(this)}partial(e){const t={};for(const i of Ec.objectKeys(this.shape)){const s=this.shape[i];e&&!e[i]?t[i]=s:t[i]=s.optional()}return new zu({...this._def,shape:()=>t})}required(e){const t={};for(const i of Ec.objectKeys(this.shape))if(e&&!e[i])t[i]=this.shape[i];else{let e=this.shape[i];for(;e instanceof rd;)e=e._def.innerType;t[i]=e}return new zu({...this._def,shape:()=>t})}keyof(){return ed(Ec.objectKeys(this.shape))}}zu.create=(e,t)=>new zu({shape:()=>e,unknownKeys:"strip",catchall:Pu.create(),typeName:vd.ZodObject,...su(t)}),zu.strictCreate=(e,t)=>new zu({shape:()=>e,unknownKeys:"strict",catchall:Pu.create(),typeName:vd.ZodObject,...su(t)}),zu.lazycreate=(e,t)=>new zu({shape:e,unknownKeys:"strip",catchall:Pu.create(),typeName:vd.ZodObject,...su(t)});class ju extends nu{_parse(e){const{ctx:t}=this._processInputParams(e),i=this._def.options;if(t.common.async)return Promise.all(i.map((async e=>{const i={...t,common:{...t.common,issues:[]},parent:null};return{result:await e._parseAsync({data:t.data,path:t.path,parent:i}),ctx:i}}))).then((function(e){for(const t of e)if("valid"===t.result.status)return t.result;for(const i of e)if("dirty"===i.result.status)return t.common.issues.push(...i.ctx.common.issues),i.result;const i=e.map((e=>new Lc(e.ctx.common.issues)));return Uc(t,{code:Nc.invalid_union,unionErrors:i}),Wc}));{let e;const s=[];for(const n of i){const i={...t,common:{...t.common,issues:[]},parent:null},r=n._parseSync({data:t.data,path:t.path,parent:i});if("valid"===r.status)return r;"dirty"!==r.status||e||(e={result:r,ctx:i}),i.common.issues.length&&s.push(i.common.issues)}if(e)return t.common.issues.push(...e.ctx.common.issues),e.result;const n=s.map((e=>new Lc(e)));return Uc(t,{code:Nc.invalid_union,unionErrors:n}),Wc}}get options(){return this._def.options}}ju.create=(e,t)=>new ju({options:e,typeName:vd.ZodUnion,...su(t)});const Hu=e=>e instanceof Ju?Hu(e.schema):e instanceof nd?Hu(e.innerType()):e instanceof Qu?[e.value]:e instanceof td?e.options:e instanceof id?Ec.objectValues(e.enum):e instanceof ad?Hu(e._def.innerType):e instanceof Du?[void 0]:e instanceof Ru?[null]:e instanceof rd?[void 0,...Hu(e.unwrap())]:e instanceof od?[null,...Hu(e.unwrap())]:e instanceof dd||e instanceof pd?Hu(e.unwrap()):e instanceof ld?Hu(e._def.innerType):[];class Zu extends nu{_parse(e){const{ctx:t}=this._processInputParams(e);if(t.parsedType!==Rc.object)return Uc(t,{code:Nc.invalid_type,expected:Rc.object,received:t.parsedType}),Wc;const i=this.discriminator,s=t.data[i],n=this.optionsMap.get(s);return n?t.common.async?n._parseAsync({data:t.data,path:t.path,parent:t}):n._parseSync({data:t.data,path:t.path,parent:t}):(Uc(t,{code:Nc.invalid_union_discriminator,options:Array.from(this.optionsMap.keys()),path:[i]}),Wc)}get discriminator(){return this._def.discriminator}get options(){return this._def.options}get optionsMap(){return this._def.optionsMap}static create(e,t,i){const s=new Map;for(const i of t){const t=Hu(i.shape[e]);if(!t.length)throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);for(const n of t){if(s.has(n))throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(n)}`);s.set(n,i)}}return new Zu({typeName:vd.ZodDiscriminatedUnion,discriminator:e,options:t,optionsMap:s,...su(i)})}}function Uu(e,t){const i=Vc(e),s=Vc(t);if(e===t)return{valid:!0,data:e};if(i===Rc.object&&s===Rc.object){const i=Ec.objectKeys(t),s=Ec.objectKeys(e).filter((e=>-1!==i.indexOf(e))),n={...e,...t};for(const i of s){const s=Uu(e[i],t[i]);if(!s.valid)return{valid:!1};n[i]=s.data}return{valid:!0,data:n}}if(i===Rc.array&&s===Rc.array){if(e.length!==t.length)return{valid:!1};const i=[];for(let s=0;s<e.length;s++){const n=Uu(e[s],t[s]);if(!n.valid)return{valid:!1};i.push(n.data)}return{valid:!0,data:i}}return i===Rc.date&&s===Rc.date&&+e===+t?{valid:!0,data:e}:{valid:!1}}class qu extends nu{_parse(e){const{status:t,ctx:i}=this._processInputParams(e),s=(e,s)=>{if(Kc(e)||Kc(s))return Wc;const n=Uu(e.value,s.value);return n.valid?((Yc(e)||Yc(s))&&t.dirty(),{status:t.value,value:n.data}):(Uc(i,{code:Nc.invalid_intersection_types}),Wc)};return i.common.async?Promise.all([this._def.left._parseAsync({data:i.data,path:i.path,parent:i}),this._def.right._parseAsync({data:i.data,path:i.path,parent:i})]).then((([e,t])=>s(e,t))):s(this._def.left._parseSync({data:i.data,path:i.path,parent:i}),this._def.right._parseSync({data:i.data,path:i.path,parent:i}))}}qu.create=(e,t,i)=>new qu({left:e,right:t,typeName:vd.ZodIntersection,...su(i)});class Wu extends nu{_parse(e){const{status:t,ctx:i}=this._processInputParams(e);if(i.parsedType!==Rc.array)return Uc(i,{code:Nc.invalid_type,expected:Rc.array,received:i.parsedType}),Wc;if(i.data.length<this._def.items.length)return Uc(i,{code:Nc.too_small,minimum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),Wc;!this._def.rest&&i.data.length>this._def.items.length&&(Uc(i,{code:Nc.too_big,maximum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),t.dirty());const s=[...i.data].map(((e,t)=>{const s=this._def.items[t]||this._def.rest;return s?s._parse(new tu(i,e,i.path,t)):null})).filter((e=>!!e));return i.common.async?Promise.all(s).then((e=>qc.mergeArray(t,e))):qc.mergeArray(t,s)}get items(){return this._def.items}rest(e){return new Wu({...this._def,rest:e})}}Wu.create=(e,t)=>{if(!Array.isArray(e))throw new Error("You must pass an array of schemas to z.tuple([ ... ])");return new Wu({items:e,typeName:vd.ZodTuple,rest:null,...su(t)})};class Xu extends nu{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){const{status:t,ctx:i}=this._processInputParams(e);if(i.parsedType!==Rc.object)return Uc(i,{code:Nc.invalid_type,expected:Rc.object,received:i.parsedType}),Wc;const s=[],n=this._def.keyType,r=this._def.valueType;for(const e in i.data)s.push({key:n._parse(new tu(i,e,i.path,e)),value:r._parse(new tu(i,i.data[e],i.path,e)),alwaysSet:e in i.data});return i.common.async?qc.mergeObjectAsync(t,s):qc.mergeObjectSync(t,s)}get element(){return this._def.valueType}static create(e,t,i){return new Xu(t instanceof nu?{keyType:e,valueType:t,typeName:vd.ZodRecord,...su(i)}:{keyType:Su.create(),valueType:e,typeName:vd.ZodRecord,...su(t)})}}class Gu extends nu{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){const{status:t,ctx:i}=this._processInputParams(e);if(i.parsedType!==Rc.map)return Uc(i,{code:Nc.invalid_type,expected:Rc.map,received:i.parsedType}),Wc;const s=this._def.keyType,n=this._def.valueType,r=[...i.data.entries()].map((([e,t],r)=>({key:s._parse(new tu(i,e,i.path,[r,"key"])),value:n._parse(new tu(i,t,i.path,[r,"value"]))})));if(i.common.async){const e=new Map;return Promise.resolve().then((async()=>{for(const i of r){const s=await i.key,n=await i.value;if("aborted"===s.status||"aborted"===n.status)return Wc;"dirty"!==s.status&&"dirty"!==n.status||t.dirty(),e.set(s.value,n.value)}return{status:t.value,value:e}}))}{const e=new Map;for(const i of r){const s=i.key,n=i.value;if("aborted"===s.status||"aborted"===n.status)return Wc;"dirty"!==s.status&&"dirty"!==n.status||t.dirty(),e.set(s.value,n.value)}return{status:t.value,value:e}}}}Gu.create=(e,t,i)=>new Gu({valueType:t,keyType:e,typeName:vd.ZodMap,...su(i)});class Ku extends nu{_parse(e){const{status:t,ctx:i}=this._processInputParams(e);if(i.parsedType!==Rc.set)return Uc(i,{code:Nc.invalid_type,expected:Rc.set,received:i.parsedType}),Wc;const s=this._def;null!==s.minSize&&i.data.size<s.minSize.value&&(Uc(i,{code:Nc.too_small,minimum:s.minSize.value,type:"set",inclusive:!0,exact:!1,message:s.minSize.message}),t.dirty()),null!==s.maxSize&&i.data.size>s.maxSize.value&&(Uc(i,{code:Nc.too_big,maximum:s.maxSize.value,type:"set",inclusive:!0,exact:!1,message:s.maxSize.message}),t.dirty());const n=this._def.valueType;function r(e){const i=new Set;for(const s of e){if("aborted"===s.status)return Wc;"dirty"===s.status&&t.dirty(),i.add(s.value)}return{status:t.value,value:i}}const o=[...i.data.values()].map(((e,t)=>n._parse(new tu(i,e,i.path,t))));return i.common.async?Promise.all(o).then((e=>r(e))):r(o)}min(e,t){return new Ku({...this._def,minSize:{value:e,message:eu.toString(t)}})}max(e,t){return new Ku({...this._def,maxSize:{value:e,message:eu.toString(t)}})}size(e,t){return this.min(e,t).max(e,t)}nonempty(e){return this.min(1,e)}}Ku.create=(e,t)=>new Ku({valueType:e,minSize:null,maxSize:null,typeName:vd.ZodSet,...su(t)});class Yu extends nu{constructor(){super(...arguments),this.validate=this.implement}_parse(e){const{ctx:t}=this._processInputParams(e);if(t.parsedType!==Rc.function)return Uc(t,{code:Nc.invalid_type,expected:Rc.function,received:t.parsedType}),Wc;function i(e,i){return Hc({data:e,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,jc(),Mc].filter((e=>!!e)),issueData:{code:Nc.invalid_arguments,argumentsError:i}})}function s(e,i){return Hc({data:e,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,jc(),Mc].filter((e=>!!e)),issueData:{code:Nc.invalid_return_type,returnTypeError:i}})}const n={errorMap:t.common.contextualErrorMap},r=t.data;if(this._def.returns instanceof sd){const e=this;return Gc((async function(...t){const o=new Lc([]),a=await e._def.args.parseAsync(t,n).catch((e=>{throw o.addIssue(i(t,e)),o})),l=await Reflect.apply(r,this,a);return await e._def.returns._def.type.parseAsync(l,n).catch((e=>{throw o.addIssue(s(l,e)),o}))}))}{const e=this;return Gc((function(...t){const o=e._def.args.safeParse(t,n);if(!o.success)throw new Lc([i(t,o.error)]);const a=Reflect.apply(r,this,o.data),l=e._def.returns.safeParse(a,n);if(!l.success)throw new Lc([s(a,l.error)]);return l.data}))}}parameters(){return this._def.args}returnType(){return this._def.returns}args(...e){return new Yu({...this._def,args:Wu.create(e).rest(Nu.create())})}returns(e){return new Yu({...this._def,returns:e})}implement(e){return this.parse(e)}strictImplement(e){return this.parse(e)}static create(e,t,i){return new Yu({args:e||Wu.create([]).rest(Nu.create()),returns:t||Nu.create(),typeName:vd.ZodFunction,...su(i)})}}class Ju extends nu{get schema(){return this._def.getter()}_parse(e){const{ctx:t}=this._processInputParams(e);return this._def.getter()._parse({data:t.data,path:t.path,parent:t})}}Ju.create=(e,t)=>new Ju({getter:e,typeName:vd.ZodLazy,...su(t)});class Qu extends nu{_parse(e){if(e.data!==this._def.value){const t=this._getOrReturnCtx(e);return Uc(t,{received:t.data,code:Nc.invalid_literal,expected:this._def.value}),Wc}return{status:"valid",value:e.data}}get value(){return this._def.value}}function ed(e,t){return new td({values:e,typeName:vd.ZodEnum,...su(t)})}Qu.create=(e,t)=>new Qu({value:e,typeName:vd.ZodLiteral,...su(t)});class td extends nu{_parse(e){if("string"!=typeof e.data){const t=this._getOrReturnCtx(e),i=this._def.values;return Uc(t,{expected:Ec.joinValues(i),received:t.parsedType,code:Nc.invalid_type}),Wc}if(this._cache||(this._cache=new Set(this._def.values)),!this._cache.has(e.data)){const t=this._getOrReturnCtx(e),i=this._def.values;return Uc(t,{received:t.data,code:Nc.invalid_enum_value,options:i}),Wc}return Gc(e.data)}get options(){return this._def.values}get enum(){const e={};for(const t of this._def.values)e[t]=t;return e}get Values(){const e={};for(const t of this._def.values)e[t]=t;return e}get Enum(){const e={};for(const t of this._def.values)e[t]=t;return e}extract(e,t=this._def){return td.create(e,{...this._def,...t})}exclude(e,t=this._def){return td.create(this.options.filter((t=>!e.includes(t))),{...this._def,...t})}}td.create=ed;class id extends nu{_parse(e){const t=Ec.getValidEnumValues(this._def.values),i=this._getOrReturnCtx(e);if(i.parsedType!==Rc.string&&i.parsedType!==Rc.number){const e=Ec.objectValues(t);return Uc(i,{expected:Ec.joinValues(e),received:i.parsedType,code:Nc.invalid_type}),Wc}if(this._cache||(this._cache=new Set(Ec.getValidEnumValues(this._def.values))),!this._cache.has(e.data)){const e=Ec.objectValues(t);return Uc(i,{received:i.data,code:Nc.invalid_enum_value,options:e}),Wc}return Gc(e.data)}get enum(){return this._def.values}}id.create=(e,t)=>new id({values:e,typeName:vd.ZodNativeEnum,...su(t)});class sd extends nu{unwrap(){return this._def.type}_parse(e){const{ctx:t}=this._processInputParams(e);if(t.parsedType!==Rc.promise&&!1===t.common.async)return Uc(t,{code:Nc.invalid_type,expected:Rc.promise,received:t.parsedType}),Wc;const i=t.parsedType===Rc.promise?t.data:Promise.resolve(t.data);return Gc(i.then((e=>this._def.type.parseAsync(e,{path:t.path,errorMap:t.common.contextualErrorMap}))))}}sd.create=(e,t)=>new sd({type:e,typeName:vd.ZodPromise,...su(t)});class nd extends nu{innerType(){return this._def.schema}sourceType(){return this._def.schema._def.typeName===vd.ZodEffects?this._def.schema.sourceType():this._def.schema}_parse(e){const{status:t,ctx:i}=this._processInputParams(e),s=this._def.effect||null,n={addIssue:e=>{Uc(i,e),e.fatal?t.abort():t.dirty()},get path(){return i.path}};if(n.addIssue=n.addIssue.bind(n),"preprocess"===s.type){const e=s.transform(i.data,n);if(i.common.async)return Promise.resolve(e).then((async e=>{if("aborted"===t.value)return Wc;const s=await this._def.schema._parseAsync({data:e,path:i.path,parent:i});return"aborted"===s.status?Wc:"dirty"===s.status||"dirty"===t.value?Xc(s.value):s}));{if("aborted"===t.value)return Wc;const s=this._def.schema._parseSync({data:e,path:i.path,parent:i});return"aborted"===s.status?Wc:"dirty"===s.status||"dirty"===t.value?Xc(s.value):s}}if("refinement"===s.type){const e=e=>{const t=s.refinement(e,n);if(i.common.async)return Promise.resolve(t);if(t instanceof Promise)throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");return e};if(!1===i.common.async){const s=this._def.schema._parseSync({data:i.data,path:i.path,parent:i});return"aborted"===s.status?Wc:("dirty"===s.status&&t.dirty(),e(s.value),{status:t.value,value:s.value})}return this._def.schema._parseAsync({data:i.data,path:i.path,parent:i}).then((i=>"aborted"===i.status?Wc:("dirty"===i.status&&t.dirty(),e(i.value).then((()=>({status:t.value,value:i.value}))))))}if("transform"===s.type){if(!1===i.common.async){const e=this._def.schema._parseSync({data:i.data,path:i.path,parent:i});if(!Jc(e))return Wc;const r=s.transform(e.value,n);if(r instanceof Promise)throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");return{status:t.value,value:r}}return this._def.schema._parseAsync({data:i.data,path:i.path,parent:i}).then((e=>Jc(e)?Promise.resolve(s.transform(e.value,n)).then((e=>({status:t.value,value:e}))):Wc))}Ec.assertNever(s)}}nd.create=(e,t,i)=>new nd({schema:e,typeName:vd.ZodEffects,effect:t,...su(i)}),nd.createWithPreprocess=(e,t,i)=>new nd({schema:t,effect:{type:"preprocess",transform:e},typeName:vd.ZodEffects,...su(i)});class rd extends nu{_parse(e){return this._getType(e)===Rc.undefined?Gc(void 0):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}}rd.create=(e,t)=>new rd({innerType:e,typeName:vd.ZodOptional,...su(t)});class od extends nu{_parse(e){return this._getType(e)===Rc.null?Gc(null):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}}od.create=(e,t)=>new od({innerType:e,typeName:vd.ZodNullable,...su(t)});class ad extends nu{_parse(e){const{ctx:t}=this._processInputParams(e);let i=t.data;return t.parsedType===Rc.undefined&&(i=this._def.defaultValue()),this._def.innerType._parse({data:i,path:t.path,parent:t})}removeDefault(){return this._def.innerType}}ad.create=(e,t)=>new ad({innerType:e,typeName:vd.ZodDefault,defaultValue:"function"==typeof t.default?t.default:()=>t.default,...su(t)});class ld extends nu{_parse(e){const{ctx:t}=this._processInputParams(e),i={...t,common:{...t.common,issues:[]}},s=this._def.innerType._parse({data:i.data,path:i.path,parent:{...i}});return Qc(s)?s.then((e=>({status:"valid",value:"valid"===e.status?e.value:this._def.catchValue({get error(){return new Lc(i.common.issues)},input:i.data})}))):{status:"valid",value:"valid"===s.status?s.value:this._def.catchValue({get error(){return new Lc(i.common.issues)},input:i.data})}}removeCatch(){return this._def.innerType}}ld.create=(e,t)=>new ld({innerType:e,typeName:vd.ZodCatch,catchValue:"function"==typeof t.catch?t.catch:()=>t.catch,...su(t)});class cd extends nu{_parse(e){if(this._getType(e)!==Rc.nan){const t=this._getOrReturnCtx(e);return Uc(t,{code:Nc.invalid_type,expected:Rc.nan,received:t.parsedType}),Wc}return{status:"valid",value:e.data}}}cd.create=e=>new cd({typeName:vd.ZodNaN,...su(e)});const ud=Symbol("zod_brand");class dd extends nu{_parse(e){const{ctx:t}=this._processInputParams(e),i=t.data;return this._def.type._parse({data:i,path:t.path,parent:t})}unwrap(){return this._def.type}}class hd extends nu{_parse(e){const{status:t,ctx:i}=this._processInputParams(e);if(i.common.async)return(async()=>{const e=await this._def.in._parseAsync({data:i.data,path:i.path,parent:i});return"aborted"===e.status?Wc:"dirty"===e.status?(t.dirty(),Xc(e.value)):this._def.out._parseAsync({data:e.value,path:i.path,parent:i})})();{const e=this._def.in._parseSync({data:i.data,path:i.path,parent:i});return"aborted"===e.status?Wc:"dirty"===e.status?(t.dirty(),{status:"dirty",value:e.value}):this._def.out._parseSync({data:e.value,path:i.path,parent:i})}}static create(e,t){return new hd({in:e,out:t,typeName:vd.ZodPipeline})}}class pd extends nu{_parse(e){const t=this._def.innerType._parse(e),i=e=>(Jc(e)&&(e.value=Object.freeze(e.value)),e);return Qc(t)?t.then((e=>i(e))):i(t)}unwrap(){return this._def.innerType}}function fd(e,t){const i="function"==typeof e?e(t):"string"==typeof e?{message:e}:e;return"string"==typeof i?{message:i}:i}function gd(e,t={},i){return e?Vu.create().superRefine(((s,n)=>{const r=e(s);if(r instanceof Promise)return r.then((e=>{if(!e){const e=fd(t,s),r=e.fatal??i??!0;n.addIssue({code:"custom",...e,fatal:r})}}));if(!r){const e=fd(t,s),r=e.fatal??i??!0;n.addIssue({code:"custom",...e,fatal:r})}})):Vu.create()}pd.create=(e,t)=>new pd({innerType:e,typeName:vd.ZodReadonly,...su(t)});const md={object:zu.lazycreate};var vd;!function(e){e.ZodString="ZodString",e.ZodNumber="ZodNumber",e.ZodNaN="ZodNaN",e.ZodBigInt="ZodBigInt",e.ZodBoolean="ZodBoolean",e.ZodDate="ZodDate",e.ZodSymbol="ZodSymbol",e.ZodUndefined="ZodUndefined",e.ZodNull="ZodNull",e.ZodAny="ZodAny",e.ZodUnknown="ZodUnknown",e.ZodNever="ZodNever",e.ZodVoid="ZodVoid",e.ZodArray="ZodArray",e.ZodObject="ZodObject",e.ZodUnion="ZodUnion",e.ZodDiscriminatedUnion="ZodDiscriminatedUnion",e.ZodIntersection="ZodIntersection",e.ZodTuple="ZodTuple",e.ZodRecord="ZodRecord",e.ZodMap="ZodMap",e.ZodSet="ZodSet",e.ZodFunction="ZodFunction",e.ZodLazy="ZodLazy",e.ZodLiteral="ZodLiteral",e.ZodEnum="ZodEnum",e.ZodEffects="ZodEffects",e.ZodNativeEnum="ZodNativeEnum",e.ZodOptional="ZodOptional",e.ZodNullable="ZodNullable",e.ZodDefault="ZodDefault",e.ZodCatch="ZodCatch",e.ZodPromise="ZodPromise",e.ZodBranded="ZodBranded",e.ZodPipeline="ZodPipeline",e.ZodReadonly="ZodReadonly"}(vd||(vd={}));const yd=(e,t={message:`Input not instance of ${e.name}`})=>gd((t=>t instanceof e),t),bd=Su.create,wd=Tu.create,xd=cd.create,kd=Ou.create,$d=Fu.create,Cd=Au.create,_d=Eu.create,Sd=Du.create,Id=Ru.create,Td=Vu.create,Od=Nu.create,Fd=Pu.create,Ad=Lu.create,Ed=Mu.create,Dd=zu.create,Rd=zu.strictCreate,Vd=ju.create,Nd=Zu.create,Pd=qu.create,Ld=Wu.create,Md=Xu.create,Bd=Gu.create,zd=Ku.create,jd=Yu.create,Hd=Ju.create,Zd=Qu.create,Ud=td.create,qd=id.create,Wd=sd.create,Xd=nd.create,Gd=rd.create,Kd=od.create,Yd=nd.createWithPreprocess,Jd=hd.create,Qd=()=>bd().optional(),eh=()=>wd().optional(),th=()=>$d().optional(),ih={string:e=>Su.create({...e,coerce:!0}),number:e=>Tu.create({...e,coerce:!0}),boolean:e=>Fu.create({...e,coerce:!0}),bigint:e=>Ou.create({...e,coerce:!0}),date:e=>Au.create({...e,coerce:!0})},sh=Wc,nh=e=>e.message?e.message:"unspecified error";class rh extends xc{constructor(e){super(),this.code=1100,this.errors=e,super.message=`Web3 validator found ${e.length} error[s]:\n${this._compileErrors().join("\n")}`}_compileErrors(){return this.errors.map(nh)}}function oh(e){if(!Number.isSafeInteger(e)||e<0)throw new Error(`positive integer expected, not ${e}`)}function ah(e,...t){if(!((i=e)instanceof Uint8Array||null!=i&&"object"==typeof i&&"Uint8Array"===i.constructor.name))throw new Error("Uint8Array expected");var i;if(t.length>0&&!t.includes(e.length))throw new Error(`Uint8Array expected of length ${t}, not of length=${e.length}`)}function lh(e,t=!0){if(e.destroyed)throw new Error("Hash instance has been destroyed");if(t&&e.finished)throw new Error("Hash#digest() has already been called")}function ch(e,t){ah(e);const i=t.outputLen;if(e.length<i)throw new Error(`digestInto() expects output buffer of length at least ${i}`)}const uh={number:oh,bool:function(e){if("boolean"!=typeof e)throw new Error(`boolean expected, not ${e}`)},bytes:ah,hash:function(e){if("function"!=typeof e||"function"!=typeof e.create)throw new Error("Hash should be wrapped by utils.wrapConstructor");oh(e.outputLen),oh(e.blockLen)},exists:lh,output:ch},dh=BigInt(2**32-1),hh=BigInt(32);function ph(e,t=!1){return t?{h:Number(e&dh),l:Number(e>>hh&dh)}:{h:0|Number(e>>hh&dh),l:0|Number(e&dh)}}function fh(e,t=!1){let i=new Uint32Array(e.length),s=new Uint32Array(e.length);for(let n=0;n<e.length;n++){const{h:r,l:o}=ph(e[n],t);[i[n],s[n]]=[r,o]}return[i,s]}const gh=68===new Uint8Array(new Uint32Array([287454020]).buffer)[0];function mh(e){for(let i=0;i<e.length;i++)e[i]=(t=e[i])<<24&4278190080|t<<8&16711680|t>>>8&65280|t>>>24&255;var t}function vh(e){if("string"!=typeof e)throw new Error("utf8ToBytes expected string, got "+typeof e);return new Uint8Array((new TextEncoder).encode(e))}function yh(e){return"string"==typeof e&&(e=vh(e)),ah(e),e}class bh{clone(){return this._cloneInto()}}const wh=[],xh=[],kh=[],$h=BigInt(0),Ch=BigInt(1),_h=BigInt(2),Sh=BigInt(7),Ih=BigInt(256),Th=BigInt(113);for(let e=0,t=Ch,i=1,s=0;e<24;e++){[i,s]=[s,(2*i+3*s)%5],wh.push(2*(5*s+i)),xh.push((e+1)*(e+2)/2%64);let n=$h;for(let e=0;e<7;e++)t=(t<<Ch^(t>>Sh)*Th)%Ih,t&_h&&(n^=Ch<<(Ch<<BigInt(e))-Ch);kh.push(n)}const[Oh,Fh]=fh(kh,!0),Ah=(e,t,i)=>i>32?((e,t,i)=>t<<i-32|e>>>64-i)(e,t,i):((e,t,i)=>e<<i|t>>>32-i)(e,t,i),Eh=(e,t,i)=>i>32?((e,t,i)=>e<<i-32|t>>>64-i)(e,t,i):((e,t,i)=>t<<i|e>>>32-i)(e,t,i);class Dh extends bh{constructor(e,t,i,s=!1,n=24){if(super(),this.blockLen=e,this.suffix=t,this.outputLen=i,this.enableXOF=s,this.rounds=n,this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,oh(i),0>=this.blockLen||this.blockLen>=200)throw new Error("Sha3 supports only keccak-f1600 function");var r;this.state=new Uint8Array(200),this.state32=(r=this.state,new Uint32Array(r.buffer,r.byteOffset,Math.floor(r.byteLength/4)))}keccak(){gh||mh(this.state32),function(e,t=24){const i=new Uint32Array(10);for(let s=24-t;s<24;s++){for(let t=0;t<10;t++)i[t]=e[t]^e[t+10]^e[t+20]^e[t+30]^e[t+40];for(let t=0;t<10;t+=2){const s=(t+8)%10,n=(t+2)%10,r=i[n],o=i[n+1],a=Ah(r,o,1)^i[s],l=Eh(r,o,1)^i[s+1];for(let i=0;i<50;i+=10)e[t+i]^=a,e[t+i+1]^=l}let t=e[2],n=e[3];for(let i=0;i<24;i++){const s=xh[i],r=Ah(t,n,s),o=Eh(t,n,s),a=wh[i];t=e[a],n=e[a+1],e[a]=r,e[a+1]=o}for(let t=0;t<50;t+=10){for(let s=0;s<10;s++)i[s]=e[t+s];for(let s=0;s<10;s++)e[t+s]^=~i[(s+2)%10]&i[(s+4)%10]}e[0]^=Oh[s],e[1]^=Fh[s]}i.fill(0)}(this.state32,this.rounds),gh||mh(this.state32),this.posOut=0,this.pos=0}update(e){lh(this);const{blockLen:t,state:i}=this,s=(e=yh(e)).length;for(let n=0;n<s;){const r=Math.min(t-this.pos,s-n);for(let t=0;t<r;t++)i[this.pos++]^=e[n++];this.pos===t&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;const{state:e,suffix:t,pos:i,blockLen:s}=this;e[i]^=t,128&t&&i===s-1&&this.keccak(),e[s-1]^=128,this.keccak()}writeInto(e){lh(this,!1),ah(e),this.finish();const t=this.state,{blockLen:i}=this;for(let s=0,n=e.length;s<n;){this.posOut>=i&&this.keccak();const r=Math.min(i-this.posOut,n-s);e.set(t.subarray(this.posOut,this.posOut+r),s),this.posOut+=r,s+=r}return e}xofInto(e){if(!this.enableXOF)throw new Error("XOF is not possible for this instance");return this.writeInto(e)}xof(e){return oh(e),this.xofInto(new Uint8Array(e))}digestInto(e){if(ch(e,this),this.finished)throw new Error("digest() was already called");return this.writeInto(e),this.destroy(),e}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=!0,this.state.fill(0)}_cloneInto(e){const{blockLen:t,suffix:i,outputLen:s,rounds:n,enableXOF:r}=this;return e||(e=new Dh(t,i,s,r,n)),e.state32.set(this.state32),e.pos=this.pos,e.posOut=this.posOut,e.finished=this.finished,e.rounds=n,e.suffix=i,e.outputLen=s,e.enableXOF=r,e.destroyed=this.destroyed,e}}const Rh=(e,t,i)=>function(e){const t=t=>e().update(yh(t)).digest(),i=e();return t.outputLen=i.outputLen,t.blockLen=i.blockLen,t.create=()=>e(),t}((()=>new Dh(t,e,i))),Vh=Rh(1,144,28),Nh=Rh(1,136,32),Ph=Rh(1,104,48),Lh=Rh(1,72,64);function Mh(e){return t=>(uh.bytes(t),e(t))}uh.bool,uh.bytes,(()=>{const e="object"==typeof globalThis&&"crypto"in globalThis?globalThis.crypto:void 0,t="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);t&&!e&&t("crypto")})(),Mh(Vh);const Bh=(()=>{const e=Mh(Nh);return e.create=Nh.create,e})(),zh=(Mh(Ph),Mh(Lh),["bool","int","uint","bytes","string","address","tuple"]),jh=e=>"object"==typeof e&&"type"in e&&"name"in e,Hh=e=>"string"==typeof e&&/^((-)?0x[0-9a-f]+|(0x))$/i.test(e),Zh=["hex","number","blockNumber","blockNumberOrTag","filter","bloom"],Uh=e=>{let t,i=e.replace(/ /,""),s=!1,n=[];if(e.includes("[")&&(i=i.slice(0,i.indexOf("[")),n=[...e.matchAll(/(?:\[(\d*)\])/g)].map((e=>parseInt(e[1],10))).map((e=>Number.isNaN(e)?-1:e)),s=n.length>0),zh.includes(i))return{baseType:i,isArray:s,baseTypeSize:t,arraySizes:n};if(i.startsWith("int"))t=parseInt(i.substring(3),10),i="int";else if(i.startsWith("uint"))t=parseInt(e.substring(4),10),i="uint";else{if(!i.startsWith("bytes"))return{baseType:void 0,isArray:!1,baseTypeSize:void 0,arraySizes:n};t=parseInt(i.substring(5),10),i="bytes"}return{baseType:i,isArray:s,baseTypeSize:t,arraySizes:n}},qh=(e,t={})=>{if(Object.keys(t).includes("type"))throw new rh([{keyword:"eth",message:'Either "eth" or "type" can be presented in schema',params:{eth:e},instancePath:"",schemaPath:""}]);const{baseType:i,baseTypeSize:s}=Uh(e);if(!i&&!Zh.includes(e))throw new rh([{keyword:"eth",message:`Eth data type "${e}" is not valid`,params:{eth:e},instancePath:"",schemaPath:""}]);if(i){if("tuple"===i)throw new Error('"tuple" type is not implemented directly.');return{format:`${i}${null!=s?s:""}`,required:!0}}return e?{format:e,required:!0}:{}},Wh=(e,t="/0")=>{const i={type:"array",items:[],maxItems:e.length,minItems:e.length};for(const[s,n]of e.entries()){let e,r,o=[];jh(n)?(e=n.type,r=n.name||`${t}/${s}`,o=n.components):"string"==typeof n?(e=n,r=`${t}/${s}`):Array.isArray(n)&&(n[0]&&"string"==typeof n[0]&&n[0].startsWith("tuple")&&!Array.isArray(n[0])&&n[1]&&Array.isArray(n[1])?(e=n[0],r=`${t}/${s}`,o=n[1]):(e="tuple",r=`${t}/${s}`,o=n));const{baseType:a,isArray:l,arraySizes:c}=Uh(e);let u,d=i;for(let e=c.length-1;e>0;e-=1)u={type:"array",$id:r,items:[],maxItems:c[e],minItems:c[e]},c[e]<0&&(delete u.maxItems,delete u.minItems),Array.isArray(d.items)?0===d.items.length?d.items=[u]:d.items.push(u):d.items=[d.items,u],d=u;if("tuple"!==a||l)if("tuple"===a&&l){const e=c[0],t=Object.assign({type:"array",$id:r,items:Wh(o,r)},e>=0&&{minItems:e,maxItems:e});d.items.push(t)}else if(l){const t=c[0],i=Object.assign({type:"array",$id:r,items:qh(e)},t>=0&&{minItems:t,maxItems:t});d.items.push(i)}else Array.isArray(d.items),d.items.push(Object.assign({$id:r},qh(e)));else{const e=Wh(o,r);e.$id=r,d.items.push(e)}d=i}return i},Xh=e=>Wh(e),Gh=(e,t)=>1===t?e:Gh(e[0],t-1),Kh=(e,t,i)=>{const s=[];for(const[n,r]of e.entries()){let e,o,a=[];jh(r)?(e=r.type,o=r.name,a=r.components):"string"==typeof r?e=r:Array.isArray(r)&&(r[1]&&Array.isArray(r[1])?(e=r[0],a=r[1]):(e="tuple",a=r));const{baseType:l,isArray:c,arraySizes:u}=Uh(e),d=Array.isArray(t)?t[n]:t[o];if("tuple"!==l||c)if("tuple"===l&&c){const e=[];for(const t of d)if(u.length>1){const s=Gh(t,u.length-1),n=[];for(const e of s)n.push(Kh(a,e,i));e.push(n)}else e.push(Kh(a,t,i));s.push(e)}else s.push(d);else s.push(Kh(a,d,i))}return(i=null!=i?i:[]).push(...s),i},Yh=e=>{if(e>=48&&e<=57)return e-48;if(e>=65&&e<=70)return e-55;if(e>=97&&e<=102)return e-87;throw new Error(`Invalid code point: ${e}`)},Jh=e=>{if(!Hh(e))throw new Error("Invalid hex string");const[t,i]=e.startsWith("-")?[!0,e.slice(1)]:[!1,e],s=BigInt(i);return s>Number.MAX_SAFE_INTEGER?t?-s:s:s<Number.MIN_SAFE_INTEGER?s:t?-1*Number(s):Number(s)},Qh=e=>{if(("number"==typeof e||"bigint"==typeof e)&&e<0)return`-0x${e.toString(16).slice(1)}`;if(("number"==typeof e||"bigint"==typeof e)&&e>=0)return`0x${e.toString(16)}`;if("string"==typeof e&&Hh(e)){const[t,i]=e.startsWith("-")?[!0,e.slice(1)]:[!1,e];return`${t?"-":""}0x${i.split(/^(-)?0(x|X)/).slice(-1)[0].replace(/^0+/,"").toLowerCase()}`}if("string"==typeof e&&!Hh(e))return Qh(BigInt(e));throw new Sc(e)},ep=(e,t,i="0")=>{if("string"==typeof e&&!Hh(e))return e.padStart(t,i);const s="string"==typeof e&&Hh(e)?e:Qh(e),[n,r]=s.startsWith("-")?["-0x",s.slice(3)]:["0x",s.slice(2)];return`${n}${r.padStart(t,i)}`};function tp(e){let t="0x";for(const i of e){const e=i.toString(16);t+=1===e.length?`0${e}`:e}return t}const ip={zero:48,nine:57,A:65,F:70,a:97,f:102};function sp(e){return e>=ip.zero&&e<=ip.nine?e-ip.zero:e>=ip.A&&e<=ip.F?e-(ip.A-10):e>=ip.a&&e<=ip.f?e-(ip.a-10):void 0}function np(e){let t=0;if(!e.startsWith("0")||"x"!==e[1]&&"X"!==e[1]||(t=2),e.length%2!=0)throw new _c(`hex string has odd length: ${e}`);const i=(e.length-t)/2,s=new Uint8Array(i);for(let n=0,r=t;n<i;n+=1){const t=sp(e.charCodeAt(r++)),i=sp(e.charCodeAt(r++));if(void 0===t||void 0===i)throw new _c(`Invalid byte sequence ("${e[r-2]}${e[r-1]}" in "${e}").`);s[n]=16*t+i}return s}function rp(e){var t;return e instanceof Uint8Array||"Uint8Array"!==(null===(t=null==e?void 0:e.constructor)||void 0===t?void 0:t.name)?e:Uint8Array.from(e)}const op=e=>{var t,i;return e instanceof Uint8Array||"Uint8Array"===(null===(t=null==e?void 0:e.constructor)||void 0===t?void 0:t.name)||"Buffer"===(null===(i=null==e?void 0:e.constructor)||void 0===i?void 0:i.name)},ap=(e,t={abiType:"bytes"})=>{if("string"!=typeof e&&!Array.isArray(e)&&!op(e))return!1;if("string"==typeof e&&Hh(e)&&e.startsWith("-"))return!1;if("string"==typeof e&&!Hh(e))return!1;let i;if("string"==typeof e){if(e.length%2!=0)return!1;i=np(e)}else if(Array.isArray(e)){if(e.some((e=>e<0||e>255||!Number.isInteger(e))))return!1;i=new Uint8Array(e)}else i=e;if(null==t?void 0:t.abiType){const{baseTypeSize:e}=Uh(t.abiType);return!e||i.length===e}return!(null==t?void 0:t.size)||i.length===(null==t?void 0:t.size)},lp=(e,t=!0)=>{if("string"!=typeof e&&!op(e))return!1;let i;return i=op(e)?tp(e):"string"!=typeof e||Hh(e)||e.toLowerCase().startsWith("0x")?e:`0x${e}`,!!/^(0x)?[0-9a-f]{40}$/i.test(i)&&(!(!/^(0x|0X)?[0-9a-f]{40}$/.test(i)&&!/^(0x|0X)?[0-9A-F]{40}$/.test(i))||!t||(e=>{if(!/^(0x)?[0-9a-f]{40}$/i.test(e))return!1;const t=e.slice(2),i=vh(t.toLowerCase()),s=tp(Bh(rp(i))).slice(2);for(let e=0;e<40;e+=1)if(parseInt(s[e],16)>7&&t[e].toUpperCase()!==t[e]||parseInt(s[e],16)<=7&&t[e].toLowerCase()!==t[e])return!1;return!0})(i))};var cp,up,dp,hp,pp,fp,gp;(hp=cp||(cp={})).NUMBER="NUMBER_NUMBER",hp.HEX="NUMBER_HEX",hp.STR="NUMBER_STR",hp.BIGINT="NUMBER_BIGINT",(dp=up||(up={})).HEX="BYTES_HEX",dp.UINT8ARRAY="BYTES_UINT8ARRAY",cp.BIGINT,up.HEX,cp.HEX,up.HEX,(gp=pp||(pp={})).EARLIEST="earliest",gp.LATEST="latest",gp.PENDING="pending",gp.SAFE="safe",gp.FINALIZED="finalized",gp.COMMITTED="committed",function(e){e.chainstart="chainstart",e.frontier="frontier",e.homestead="homestead",e.dao="dao",e.tangerineWhistle="tangerineWhistle",e.spuriousDragon="spuriousDragon",e.byzantium="byzantium",e.constantinople="constantinople",e.petersburg="petersburg",e.istanbul="istanbul",e.muirGlacier="muirGlacier",e.berlin="berlin",e.london="london",e.altair="altair",e.arrowGlacier="arrowGlacier",e.grayGlacier="grayGlacier",e.bellatrix="bellatrix",e.merge="merge",e.capella="capella",e.shanghai="shanghai"}(fp||(fp={})),Object.getPrototypeOf(Uint8Array),Symbol.for("web3/base-provider");const mp=(e,t)=>{if(t===BigInt(0))return BigInt(1);let i=e;for(let s=1;s<t;s+=1)i*=e;return i},vp=(e,t={abiType:"uint"})=>{if(!["number","string","bigint"].includes(typeof e)||"string"==typeof e&&0===e.length)return!1;let i;if(null==t?void 0:t.abiType){const{baseTypeSize:e}=Uh(t.abiType);e&&(i=e)}else t.bitSize&&(i=t.bitSize);const s=mp(BigInt(2),BigInt(null!=i?i:256))-BigInt(1);try{const t="string"==typeof e&&Hh(e)?BigInt(Jh(e)):BigInt(e);return t>=0&&t<=s}catch(e){return!1}},yp=(e,t={abiType:"int"})=>{if(!["number","string","bigint"].includes(typeof e))return!1;if("number"==typeof e&&e>Number.MAX_SAFE_INTEGER)return!1;let i;if(null==t?void 0:t.abiType){const{baseTypeSize:e,baseType:s}=Uh(t.abiType);if("int"!==s)return!1;e&&(i=e)}else t.bitSize&&(i=t.bitSize);const s=mp(BigInt(2),BigInt((null!=i?i:256)-1)),n=BigInt(-1)*mp(BigInt(2),BigInt((null!=i?i:256)-1));try{const t="string"==typeof e&&Hh(e)?BigInt(Jh(e)):BigInt(e);return t>=n&&t<=s}catch(e){return!1}},bp=e=>vp(e),wp=e=>Object.values(pp).includes(e),xp=e=>wp(e)||bp(e),kp=e=>null==e,$p=e=>!("string"!=typeof e||!/^(0x)?[0-9a-f]{64}$/i.test(e)||!/^(0x)?[0-9a-f]{64}$/.test(e)&&!/^(0x)?[0-9A-F]{64}$/.test(e)),Cp={address:e=>lp(e),bloom:e=>{return!("string"!=typeof(t=e)||!/^(0x)?[0-9a-f]{512}$/i.test(t)||!/^(0x)?[0-9a-f]{512}$/.test(t)&&!/^(0x)?[0-9A-F]{512}$/.test(t));var t},blockNumber:e=>bp(e),blockTag:e=>wp(e),blockNumberOrTag:e=>xp(e),bool:e=>{return!!["number","string","boolean"].includes(typeof(t=e))&&("boolean"==typeof t||("string"!=typeof t||Hh(t)?"string"==typeof t&&Hh(t)?"0x1"===t||"0x0"===t:1===t||0===t:"1"===t||"0"===t));var t},bytes:e=>ap(e),filter:e=>(e=>{const t=["fromBlock","toBlock","address","topics","blockHash"];if(kp(e)||"object"!=typeof e)return!1;if(!Object.keys(e).every((e=>t.includes(e))))return!1;if(!kp(e.fromBlock)&&!xp(e.fromBlock)||!kp(e.toBlock)&&!xp(e.toBlock))return!1;if(!kp(e.address))if(Array.isArray(e.address)){if(!e.address.every((e=>lp(e))))return!1}else if(!lp(e.address))return!1;return!(!kp(e.topics)&&!e.topics.every((e=>!!kp(e)||(Array.isArray(e)?e.every((e=>$p(e))):!!$p(e)))))})(e),hex:e=>Hh(e),uint:e=>vp(e),int:e=>yp(e),number:e=>{return!!yp(t=e)||!("string"!=typeof t||!/[0-9.]/.test(t)||t.indexOf(".")!==t.lastIndexOf("."))||"number"==typeof t;var t},string:e=>"string"==typeof e};for(let e=8;e<=256;e+=8)Cp[`int${e}`]=t=>yp(t,{bitSize:e}),Cp[`uint${e}`]=t=>vp(t,{bitSize:e});for(let e=1;e<=32;e+=1)Cp[`bytes${e}`]=t=>ap(t,{size:e});Cp.bytes256=Cp.bytes;const _p=Cp,Sp=e=>{if((!(null==e?void 0:e.type)||"object"===(null==e?void 0:e.type))&&(null==e?void 0:e.properties)){const t={};for(const i of Object.keys(e.properties)){const s=Sp(e.properties[i]);s&&(t[i]=s)}return Array.isArray(e.required)?Dd(t).partial().required(e.required.reduce(((e,t)=>Object.assign(Object.assign({},e),{[t]:!0})),{})):Dd(t).partial()}if("array"===(null==e?void 0:e.type)&&(null==e?void 0:e.items)){if(Array.isArray(e.items)&&e.items.length>1&&void 0!==e.maxItems&&new Set(e.items.map((e=>e.$id))).size===e.items.length){const t=[];for(const i of e.items){const e=Sp(i);e&&t.push(e)}return Ld(t)}const t=Array.isArray(e.items)?e.items[0]:e.items;let i=Ed(Sp(t));return i=void 0!==e.minItems?i.min(e.minItems):i,i=void 0!==e.maxItems?i.max(e.maxItems):i,i}if(e.oneOf&&Array.isArray(e.oneOf))return Vd(e.oneOf.map((e=>Sp(e))));if(null==e?void 0:e.format){if(!_p[e.format])throw new Ac(e.format);return Td().refine(_p[e.format],(t=>({params:{value:t,format:e.format}})))}return(null==e?void 0:e.type)&&"object"!==(null==e?void 0:e.type)&&"function"==typeof s[String(e.type)]?s[String(e.type)]():Dd({data:Td()}).partial()};class Ip{static factory(){return Ip.validatorInstance||(Ip.validatorInstance=new Ip),Ip.validatorInstance}validate(e,t,i){var s,n;const r=Sp(e).safeParse(t);if(!r.success){const e=this.convertErrors(null!==(n=null===(s=r.error)||void 0===s?void 0:s.issues)&&void 0!==n?n:[]);if(e){if(null==i?void 0:i.silent)return e;throw new rh(e)}}}convertErrors(e){if(e&&Array.isArray(e)&&e.length>0)return e.map((e=>{var t;let i,s,n,r;r=e.path.join("/");const o=String(e.path[e.path.length-1]),a=e.path.join("/");if(e.code===Nc.too_big)s="maxItems",r=`${a}/maxItems`,n={limit:e.maximum},i=`must NOT have more than ${e.maximum} items`;else if(e.code===Nc.too_small)s="minItems",r=`${a}/minItems`,n={limit:e.minimum},i=`must NOT have fewer than ${e.minimum} items`;else if(e.code===Nc.custom){const{value:s,format:o}=null!==(t=e.params)&&void 0!==t?t:{};i=void 0===s?`value at "/${r}" is required`:`value "${"object"==typeof s?JSON.stringify(s):s}" at "/${r}" must pass "${o}" validation`,n={value:s}}return{keyword:null!=s?s:o,instancePath:a?`/${a}`:"",schemaPath:r?`#${r}`:"#",params:null!=n?n:{value:e.message},message:null!=i?i:e.message}}))}}const Tp=new class{constructor(){this._validator=Ip.factory()}validateJSONSchema(e,t,i){return this._validator.validate(e,t,i)}validate(e,t,i={silent:!1}){var s,n;const r=Xh(e);if(!Array.isArray(r.items)||0!==(null===(s=r.items)||void 0===s?void 0:s.length)||0!==t.length){if(Array.isArray(r.items)&&0===(null===(n=r.items)||void 0===n?void 0:n.length)&&0!==t.length)throw new rh([{instancePath:"/0",schemaPath:"/",keyword:"required",message:"empty schema against data can not be validated",params:t}]);return this._validator.validate(r,t,i)}}};function Op(...e){const t=e.reduce(((e,t)=>e+t.length),0),i=new Uint8Array(t);let s=0;for(const t of e)i.set(t,s),s+=t.length;return i}BigInt(0),BigInt(1),BigInt(1e3),BigInt(1e3),BigInt(1e3),BigInt(1e3),BigInt(1e6),BigInt(1e6),BigInt(1e6),BigInt(1e6),BigInt(1e9),BigInt(1e9),BigInt(1e9),BigInt(1e9),BigInt(1e9),BigInt(1e12),BigInt(1e12),BigInt(1e12),BigInt(1e15),BigInt(1e15),BigInt(1e15),BigInt("1000000000000000000"),BigInt("1000000000000000000000"),BigInt("1000000000000000000000"),BigInt("1000000000000000000000000"),BigInt("1000000000000000000000000000"),BigInt("1000000000000000000000000000000");const Fp=e=>{if(Tp.validate(["bytes"],[e]),function(e){var t,i;return e instanceof Uint8Array||"Uint8Array"===(null===(t=null==e?void 0:e.constructor)||void 0===t?void 0:t.name)||"Buffer"===(null===(i=null==e?void 0:e.constructor)||void 0===i?void 0:i.name)}(e))return e;if(Array.isArray(e))return new Uint8Array(e);if("string"==typeof e)return np(e);throw new _c(e)},{uint8ArrayToHexString:Ap}=n,Ep=Rl,Dp=e=>{if("number"==typeof e)return e>1e20?(console.warn("Warning: Using type `number` with values that are large or contain many decimals may cause loss of precision, it is recommended to use type `string` or `BigInt` when using conversion methods"),BigInt(e)):e;if("bigint"==typeof e)return e>=Number.MIN_SAFE_INTEGER&&e<=Number.MAX_SAFE_INTEGER?Number(e):e;if("string"==typeof e&&Hh(e))return(e=>(Tp.validate(["hex"],[e]),Jh(e)))(e);try{return Dp(BigInt(e))}catch(t){throw new Sc(e)}};i(228);const Rp=kp,{parseBaseType:Vp}=n,Np="0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",Pp=e=>{let t;t="string"==typeof e?e.startsWith("0x")&&Hh(e)?(e=>"string"==typeof e&&"0x"!==e.slice(0,2).toLowerCase()?Fp(`0x${e}`):Fp(e))(e):Rl(e):e;const i=(e=>{let t;return t="bigint"==typeof e||"number"==typeof e?Rl(e.toString()):Array.isArray(e)?new Uint8Array(e):"string"!=typeof e||Hh(e)?Fp(e):Rl(e),(e=>Ap(Fp(e)))(sc(rp(t)))})(t);return i===Np?void 0:i};Symbol.toStringTag;const Lp=e=>!Rp(e)&&"object"==typeof e&&!Rp(e.type)&&"function"===e.type,Mp=e=>e.includes("[]")?{type:"tuple[]",name:e.slice(0,-2)}:{type:"tuple",name:e},Bp=e=>{const t=[];for(const i of Object.keys(e)){const s=e[i];"object"==typeof s?t.push(Object.assign(Object.assign({},Mp(i)),{components:Bp(s)})):t.push({name:i,type:e[i]})}return t},zp=(e,t)=>{const i=[];return t.forEach((t=>{if("object"==typeof t.components){if(!t.type.startsWith("tuple"))throw new Cc(`Invalid value given "${t.type}". Error: components found but type is not tuple.`);const s=t.type.indexOf("["),n=s>=0?t.type.substring(s):"",r=zp(e,t.components);Array.isArray(r)&&e?i.push(`tuple(${r.join(",")})${n}`):e?i.push(`(${r.join()})`):i.push(`(${r.join(",")})${n}`)}else i.push(t.type)})),i};function jp(e,t){const i=e.exec(t);return i?.groups}var Hp=/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,Zp=/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/,Up=/^\(.+?\).*?$/,qp=Object.defineProperty,Wp=(e,t,i)=>(((e,t,i)=>{t in e?qp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i})(e,"symbol"!=typeof t?t+"":t,i),i),Xp=class extends Error{constructor(e,t={}){const i=t.cause instanceof Xp?t.cause.details:t.cause?.message?t.cause.message:t.details,s=t.cause instanceof Xp&&t.cause.docsPath||t.docsPath;super([e||"An error occurred.","",...t.metaMessages?[...t.metaMessages,""]:[],...s?[`Docs: https://abitype.dev${s}`]:[],...i?[`Details: ${i}`]:[],"Version: abitype@0.7.1"].join("\n")),Wp(this,"details"),Wp(this,"docsPath"),Wp(this,"metaMessages"),Wp(this,"shortMessage"),Wp(this,"name","AbiTypeError"),t.cause&&(this.cause=t.cause),this.details=i,this.docsPath=s,this.metaMessages=t.metaMessages,this.shortMessage=e}},Gp=/^struct (?<name>[a-zA-Z0-9_]+) \{(?<properties>.*?)\}$/;function Kp(e){return Gp.test(e)}function Yp(e){return jp(Gp,e)}var Jp=new Set(["memory","indexed","storage","calldata"]),Qp=new Set(["calldata","memory","storage"]),ef=new Map([["address",{type:"address"}],["bool",{type:"bool"}],["bytes",{type:"bytes"}],["bytes32",{type:"bytes32"}],["int",{type:"int256"}],["int256",{type:"int256"}],["string",{type:"string"}],["uint",{type:"uint256"}],["uint8",{type:"uint8"}],["uint16",{type:"uint16"}],["uint24",{type:"uint24"}],["uint32",{type:"uint32"}],["uint64",{type:"uint64"}],["uint96",{type:"uint96"}],["uint112",{type:"uint112"}],["uint160",{type:"uint160"}],["uint192",{type:"uint192"}],["uint256",{type:"uint256"}],["address owner",{type:"address",name:"owner"}],["address to",{type:"address",name:"to"}],["bool approved",{type:"bool",name:"approved"}],["bytes _data",{type:"bytes",name:"_data"}],["bytes data",{type:"bytes",name:"data"}],["bytes signature",{type:"bytes",name:"signature"}],["bytes32 hash",{type:"bytes32",name:"hash"}],["bytes32 r",{type:"bytes32",name:"r"}],["bytes32 root",{type:"bytes32",name:"root"}],["bytes32 s",{type:"bytes32",name:"s"}],["string name",{type:"string",name:"name"}],["string symbol",{type:"string",name:"symbol"}],["string tokenURI",{type:"string",name:"tokenURI"}],["uint tokenId",{type:"uint256",name:"tokenId"}],["uint8 v",{type:"uint8",name:"v"}],["uint256 balance",{type:"uint256",name:"balance"}],["uint256 tokenId",{type:"uint256",name:"tokenId"}],["uint256 value",{type:"uint256",name:"value"}],["event:address indexed from",{type:"address",name:"from",indexed:!0}],["event:address indexed to",{type:"address",name:"to",indexed:!0}],["event:uint indexed tokenId",{type:"uint256",name:"tokenId",indexed:!0}],["event:uint256 indexed tokenId",{type:"uint256",name:"tokenId",indexed:!0}]]),tf=/^(?<type>[a-zA-Z0-9_]+?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z0-9_]+))?$/,sf=/^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z0-9_]+))?$/,nf=/^u?int$/;function rf(e,t){const i=function(e,t){return t?`${t}:${e}`:e}(e,t?.type);if(ef.has(i))return ef.get(i);const s=Up.test(e),n=jp(s?sf:tf,e);if(!n)throw new Xp("Invalid ABI parameter.",{details:e});if(n.name&&function(e){return"address"===e||"bool"===e||"function"===e||"string"===e||"tuple"===e||Hp.test(e)||Zp.test(e)||lf.test(e)}(n.name))throw new Xp("Invalid ABI parameter.",{details:e,metaMessages:[`"${n.name}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`]});const r=n.name?{name:n.name}:{},o="indexed"===n.modifier?{indexed:!0}:{},a=t?.structs??{};let l,c={};if(s){l="tuple";const e=of(n.type),t=[],i=e.length;for(let s=0;s<i;s++)t.push(rf(e[s],{structs:a}));c={components:t}}else if(n.type in a)l="tuple",c={components:a[n.type]};else if(nf.test(n.type))l=`${n.type}256`;else if(l=n.type,"struct"!==t?.type&&!af(l))throw new Xp("Unknown type.",{metaMessages:[`Type "${l}" is not a valid ABI type.`]});if(n.modifier){if(!t?.modifiers?.has?.(n.modifier))throw new Xp("Invalid ABI parameter.",{details:e,metaMessages:[`Modifier "${n.modifier}" not allowed${t?.type?` in "${t.type}" type`:""}.`]});if(Qp.has(n.modifier)&&!function(e,t){return t||"bytes"===e||"string"===e||"tuple"===e}(l,!!n.array))throw new Xp("Invalid ABI parameter.",{details:e,metaMessages:[`Modifier "${n.modifier}" not allowed${t?.type?` in "${t.type}" type`:""}.`,`Data location can only be specified for array, struct, or mapping types, but "${n.modifier}" was given.`]})}const u={type:`${l}${n.array??""}`,...r,...o,...c};return ef.set(i,u),u}function of(e,t=[],i="",s=0){if(""===e){if(""===i)return t;if(0!==s)throw new Xp("Unbalanced parentheses.",{metaMessages:[`"${i.trim()}" has too many ${s>0?"opening":"closing"} parentheses.`],details:`Depth "${s}"`});return[...t,i.trim()]}const n=e.length;for(let r=0;r<n;r++){const n=e[r],o=e.slice(r+1);switch(n){case",":return 0===s?of(o,[...t,i.trim()]):of(o,t,`${i}${n}`,s);case"(":return of(o,t,`${i}${n}`,s+1);case")":return of(o,t,`${i}${n}`,s-1);default:return of(o,t,`${i}${n}`,s)}}return[]}function af(e){return"address"===e||"bool"===e||"function"===e||"string"===e||Hp.test(e)||Zp.test(e)}var lf=/^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;var cf=/^(?<type>[a-zA-Z0-9_]+?)(?<array>(?:\[\d*?\])+?)?$/;function uf(e,t,i=new Set){const s=[],n=e.length;for(let r=0;r<n;r++){const n=e[r];if(Up.test(n.type))s.push(n);else{const e=jp(cf,n.type);if(!e?.type)throw new Xp("Invalid ABI parameter.",{details:JSON.stringify(n,null,2),metaMessages:["ABI parameter type is invalid."]});const{array:r,type:o}=e;if(o in t){if(i.has(o))throw new Xp("Circular reference detected.",{metaMessages:[`Struct "${o}" is a circular reference.`]});s.push({...n,type:`tuple${r??""}`,components:uf(t[o]??[],t,new Set([...i,o]))})}else{if(!af(o))throw new Xp("Unknown type.",{metaMessages:[`Type "${o}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`]});s.push(n)}}}return s}const df=32;function hf(e=0){var t;if(void 0!==(null===(t=globalThis.Buffer)||void 0===t?void 0:t.alloc)){const t=globalThis.Buffer.alloc(e);return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}return new Uint8Array(e)}function pf(e){var t,i;return Object.assign(Object.assign({},e),{name:null!==(t=e.name)&&void 0!==t?t:"",components:null===(i=e.components)||void 0===i?void 0:i.map((e=>pf(e)))})}function ff(e){return e.map((e=>{var t,i,s;if(!Rp(i=e)&&"object"==typeof i&&!Rp(i.type)&&"string"==typeof i.type)return e;if("string"==typeof e)return pf(function(e){let t;if("string"==typeof e)t=rf(e,{modifiers:Jp});else{const i=function(e){const t={},i=e.length;for(let s=0;s<i;s++){const i=e[s];if(!Kp(i))continue;const n=Yp(i);if(!n)throw new Xp("Invalid struct signature.",{details:i});const r=n.properties.split(";"),o=[],a=r.length;for(let e=0;e<a;e++){const t=r[e].trim();if(!t)continue;const i=rf(t,{type:"struct"});o.push(i)}if(!o.length)throw new Xp("Invalid struct signature.",{details:i,metaMessages:["No properties exist."]});t[n.name]=o}const s={},n=Object.entries(t),r=n.length;for(let e=0;e<r;e++){const[i,r]=n[e];s[i]=uf(r,t)}return s}(e),s=e.length;for(let n=0;n<s;n++){const s=e[n];if(!Kp(s)){t=rf(s,{modifiers:Jp,structs:i});break}}}if(!t)throw new Xp("Failed to parse ABI parameter.",{details:`parseAbiParameter(${JSON.stringify(e,null,2)})`,docsPath:"/api/human.html#parseabiparameter-1"});return t}(e.replace(/tuple/,"")));if("object"==typeof(s=e)&&void 0===s.components&&void 0===s.name){const i=Object.keys(e)[0],s=Mp(i);return s.name=null!==(t=s.name)&&void 0!==t?t:"",Object.assign(Object.assign({},s),{components:Bp(e[i])})}throw new Cc("Invalid abi")}))}const gf=new Map;let mf=BigInt(256);for(let e=8;e<=256;e+=8)gf.set(`uint${e}`,{min:BigInt(0),max:mf-BigInt(1)}),gf.set(`int${e}`,{min:-mf/BigInt(2),max:mf/BigInt(2)-BigInt(1)}),mf*=BigInt(256);gf.set("int",gf.get("int256")),gf.set("uint",gf.get("uint256"));const vf=BigInt(1)<<BigInt(256);function yf(e,t=32){let i;return i=e<0?(vf+e).toString(16):e.toString(16),i=((e,t,i="0")=>"string"==typeof e?Hh(e)?ep(e,t,i):e.padStart(t,i):(Tp.validate(["int"],[e]),ep(e,t,i)))(i,2*t),np(i)}function bf(e,t){let i;try{i=(e=>{if("number"==typeof e)return BigInt(e);if("bigint"==typeof e)return e;if("string"==typeof e&&("number"==typeof(t=e)||"bigint"==typeof t||"string"==typeof t&&/^((-0x|0x|-)?[0-9a-f]+|(0x))$/i.test(t)))return e.startsWith("-")?-BigInt(e.substring(1)):BigInt(e);var t;throw new Sc(e)})(t)}catch(i){throw new Cc("provided input is not number value",{type:e.type,value:t,name:e.name})}const s=gf.get(e.type);if(!s)throw new Cc("provided abi contains invalid number datatype",{type:e.type});if(i<s.min)throw new Cc("provided input is less then minimum for given type",{type:e.type,value:t,name:e.name,minimum:s.min.toString()});if(i>s.max)throw new Cc("provided input is greater then maximum for given type",{type:e.type,value:t,name:e.name,maximum:s.max.toString()});return{dynamic:!1,encoded:yf(i)}}function wf(e,t){if("string"==typeof t&&t.length%2!=0&&(t+="0"),!ap(t))throw new Cc("provided input is not valid bytes value",{type:e.type,value:t,name:e.name});const i=Fp(t),[,s]=e.type.split("bytes");if(s){if(Number(s)>32||Number(s)<1)throw new Cc("invalid bytes type. Static byte type can have between 1 and 32 bytes",{type:e.type});if(Number(s)<i.length)throw new Cc("provided input size is different than type size",{type:e.type,value:t,name:e.name});const n=hf(df);return n.set(i),{dynamic:!1,encoded:n}}const n=Math.ceil(i.length/df),r=hf(df+n*df);return r.set(bf({type:"uint32",name:""},i.length).encoded),r.set(i,df),{dynamic:!0,encoded:r}}function xf(e){let t=0,i=0;const s=[],n=[];for(const i of e)i.dynamic?t+=df:t+=i.encoded.length;for(const r of e)r.dynamic?(s.push(bf({type:"uint256",name:""},t+i)),n.push(r),i+=r.encoded.length):s.push(r);return Op(...s.map((e=>e.encoded)),...n.map((e=>e.encoded)))}function kf(e,t){if("string"===e.type)return function(e,t){if("string"!=typeof t)throw new Cc("invalid input, should be string",{input:t});return wf({type:"bytes",name:""},Ep(t))}(0,t);if("bool"===e.type)return function(e,t){let i;try{i=(e=>{if("boolean"==typeof e)return e;if("number"==typeof e&&(0===e||1===e))return Boolean(e);if("bigint"==typeof e&&(e===BigInt(0)||e===BigInt(1)))return Boolean(e);if("string"==typeof e&&!Hh(e)&&("1"===e||"0"===e||"false"===e||"true"===e))return"true"===e||"false"!==e&&Boolean(Number(e));if("string"==typeof e&&Hh(e)&&("0x1"===e||"0x0"===e))return Boolean(Dp(e));throw new Ic(e)})(t)}catch(i){if(i instanceof Ic)throw new Cc("provided input is not valid boolean value",{type:e.type,value:t,name:e.name})}return bf({type:"uint8",name:""},Number(i))}(e,t);if("address"===e.type)return function(e,t){if("string"!=typeof t)throw new Cc("address type expects string as input type",{value:t,name:e.name,type:e.type});let i=t.toLowerCase();if(i.startsWith("0x")||(i=`0x${i}`),!lp(i))throw new Cc("provided input is not valid address",{value:t,name:e.name,type:e.type});const s=np(i),n=hf(df);return n.set(s,12),{dynamic:!1,encoded:n}}(e,t);if("tuple"===e.type)return $f(e,t);if(e.type.endsWith("]"))return function(e,t){if(!Array.isArray(t))throw new Cc("Expected value to be array",{abi:e,values:t});const{size:i,param:s}=function(e){const t=e.type.lastIndexOf("["),i=e.type.substring(0,t),s=e.type.substring(t);let n=-1;if("[]"!==s&&(n=Number(s.slice(1,-1)),isNaN(n)))throw new Cc("Invalid fixed array size",{size:s});return{param:{type:i,name:"",components:e.components},size:n}}(e),n=t.map((e=>kf(s,e))),r=-1===i,o=n.length>0&&n[0].dynamic;if(!r&&t.length!==i)throw new Cc("Given arguments count doesn't match array length",{arrayLength:i,argumentsLength:t.length});if(r||o){const e=xf(n);if(r){const t=bf({type:"uint256",name:""},n.length).encoded;return{dynamic:!0,encoded:n.length>0?Op(t,e):t}}return{dynamic:!0,encoded:e}}return{dynamic:!1,encoded:Op(...n.map((e=>e.encoded)))}}(e,t);if(e.type.startsWith("bytes"))return wf(e,t);if(e.type.startsWith("uint")||e.type.startsWith("int"))return bf(e,t);throw new Cc("Unsupported",{param:e,value:t})}function $f(e,t){var i,s,n;let r=!1;if(!Array.isArray(t)&&"object"!=typeof t)throw new Cc("param must be either Array or Object",{param:e,input:t});const o=t,a=[];for(let l=0;l<(null!==(s=null===(i=e.components)||void 0===i?void 0:i.length)&&void 0!==s?s:0);l+=1){const i=e.components[l];let s;if(Array.isArray(o)){if(l>=o.length)throw new Cc("input param length missmatch",{param:e,input:t});s=kf(i,o[l])}else{const r=o[null!==(n=i.name)&&void 0!==n?n:""];if(null==r)throw new Cc("missing input defined in abi",{param:e,input:t,paramName:i.name});s=kf(i,r)}s.dynamic&&(r=!0),a.push(s)}return r?{dynamic:!0,encoded:xf(a)}:{dynamic:!1,encoded:Op(...a.map((e=>e.encoded)))}}const Cf=(e,t)=>{var i;if(!Lp(e))throw new Cc("Invalid parameter value in encodeFunctionCall");return`${(e=>{if("string"!=typeof e&&!Lp(e))throw new Cc("Invalid parameter value in encodeFunctionSignature");let t;return t=!e||"function"!=typeof e&&"object"!=typeof e?e:(e=>{var t,i,s,n,r;return!Rp(r=e)&&"object"==typeof r&&!Rp(r.type)&&"error"===r.type||(e=>!Rp(e)&&"object"==typeof e&&!Rp(e.type)&&"event"===e.type)(e)||Lp(e)?(null===(t=e.name)||void 0===t?void 0:t.includes("("))?e.name:`${null!==(i=e.name)&&void 0!==i?i:""}(${zp(!1,null!==(s=e.inputs)&&void 0!==s?s:[]).join(",")})`:`(${zp(!1,null!==(n=e.inputs)&&void 0!==n?n:[]).join(",")})`})(e),(e=>{const t=Pp(e);return kp(t)?Np:t})(t).slice(0,10)})(e)}${function(e,t){if((null==e?void 0:e.length)!==t.length)throw new Cc("Invalid number of values received for given ABI",{expected:null==e?void 0:e.length,received:t.length});return tp($f({type:"tuple",name:"",components:ff(e)},t).encoded)}(null!==(i=e.inputs)&&void 0!==i?i:[],null!=t?t:[]).replace("0x","")}`},_f={constant:!0,inputs:[{name:"_to",type:"address"},{name:"_value",type:"uint256"}],name:"transfer",outputs:[{name:"success",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"};let Sf,If;function Tf(e){const t=e.toString(),[i,s=""]=t.split("."),n=BigInt("1000000000000000000"),r=BigInt(i)*n;console.log(r);let o=r;if(s){const e=s.padEnd(18,"0").slice(0,18);o+=BigInt(e)}return console.log(o),"0x"+o.toString(16)}document.addEventListener("DOMContentLoaded",(async()=>{lt.getOrCreate(undefined).withPrefix("fluent").register(jo(),sa(),ra(),za(),ja(),Ka(),ol(),fl(),vl(),kl());const e=document.getElementById("title"),t=document.getElementsByClassName("available-balance")[0],i=document.getElementsByClassName("usd-conversion")[0],s=document.getElementsByClassName("logo")[0],n=document.getElementById("progress"),r=document.getElementById("tokensBt"),o=document.getElementById("tokensMenu"),a=document.getElementById("to"),l=document.getElementById("amount"),c=document.getElementById("max"),u=(await chrome.storage.local.get("selected")).selected;let d=u.wallet,h=u.chainId;const p=(await chrome.storage.local.get("chains")).chains[h],f=await chrome.runtime.sendMessage({type:"REQUEST_INTERNAL",params:{method:"eth_getBalance",params:[d,"latest"]}});If={native_token:!0,name:p.symbol,logo:"0x1"==h?"../icons/eth.png":"../icons/pls.png",usd_price:0,balance:f.result,decimals:18,symbol:p.symbol},e.textContent="Send "+If.name,s.src=If.logo;const g=Math.max(0,If.usd_price.toString().split(".")[0].length-2);t.textContent=`Available ${(If.balance/10**If.decimals).toLocaleString(navigator.language,{maximumFractionDigits:g})} ${If.symbol}`;const m=async()=>{const e=(await chrome.storage.local.get("wallets")).wallets[d];if(document.getElementById("sender").textContent=e.label,document.getElementById("sender").style.borderColor=e.color1,"native"==i){s.src="0x1"==h?"../icons/eth.png":"../icons/pls.png";const e=await chrome.runtime.sendMessage({type:"REQUEST_INTERNAL",params:{method:"eth_getBalance",params:[d,"latest"]}});t.textContent=e.result}for(var i of(n.hidden=!1,r.hidden=!0,o.innerHTML="",Sf=await async function(e,t){const i={method:"GET",headers:{accept:"application/json","X-API-Key":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImE1MTNhYWFlLTE1NjYtNDkzMS05NDg3LTk3ODdkYTBkODBiYyIsIm9yZ0lkIjoiNDQ4NDAzIiwidXNlcklkIjoiNDYxMzU0IiwidHlwZUlkIjoiYTMxZGJkZjYtZjM2MS00OTZmLWI4ZWEtZGNhNWQ3MjY2NGRkIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NDc4NTczMDcsImV4cCI6NDkwMzYxNzMwN30.xCrcAj6yG34xZm-GRwjVppiksIQwyq0D8dmM_J-Cry0"}};try{const s=`https://deep-index.moralis.io/api/v2.2/wallets/${e}/tokens?chain=${t}&exclude_spam=true`,n=await fetch(s,i);if(!n.ok)throw new Error(`HTTP error! Status: ${n.status}`);return(await n.json()).result}catch{}}(d,h),Sf))if(parseFloat(i.usd_value)>.1){const e=Math.max(0,i.usd_price.toString().split(".")[0].length-2),t=`\n                        <fluent-menu-item id="${i.token_address}">\n                        <div class="menu-content">\n                            <span class="line1"> <img src="${i.native_token&&"0x171"==h?"https://tokens.app.pulsex.com/images/tokens/0xA1077a294dDE1B09bB078844df40758a5D0f9a27.png":i.logo}"> ${i.name}  </span>\n                            <span class="line2" > ${(i.balance/10**i.decimals).toLocaleString(navigator.language,{maximumFractionDigits:e})}</span>\n                        </div>\n                        </fluent-menu-item>`;o.innerHTML+=t}n.hidden=!0,r.hidden=!1};chrome.storage.local.onChanged.addListener((async e=>{e.selected&&(d=e.selected.newValue.wallet,h!=e.selected.newValue.chainId?window.location.reload():await m())})),await m(),l.addEventListener("keyup",(()=>{i.textContent=(If.usd_price*l.value).toLocaleString(navigator.language,{maximumFractionDigits:0})+" USD"})),c.addEventListener("click",(()=>{l.value=If.balance/10**If.decimals})),o.addEventListener("change",(i=>{console.log(i.target.id),If=Sf.find((e=>e.token_address==i.target.id)),e.textContent="Send "+If.name,s.src=If.logo;const n=Math.max(0,If.usd_price.toString().split(".")[0].length-2);t.textContent=`Available ${(If.balance/10**If.decimals).toLocaleString(navigator.language,{maximumFractionDigits:n})} ${If.symbol}`,o.toggleAttribute("hidden")})),r.addEventListener("click",(()=>{o.toggleAttribute("hidden")})),document.getElementById("cancel").addEventListener("click",(async()=>{window.close()})),document.getElementById("send").addEventListener("click",(async()=>{if(!(a.value.length<42||0==l.value.length))if(If.native_token)await chrome.runtime.sendMessage({type:"CONFIRM_TX_INTERNAL",params:{host:"Send",tx:{from:d,to:a.value.trim(),value:Tf(l.value.toString().trim())}}});else{console.log(l.value);const e=l.value.toString().trim()*10**If.decimals,t=Cf(_f,[a.value,e]);await chrome.runtime.sendMessage({type:"CONFIRM_TX_INTERNAL",params:{host:"Send",tx:{from:d,to:If.token_address,value:"0x0",data:t}}})}}))}))})();