(()=>{"use strict";const t=function(){if("undefined"!=typeof globalThis)return globalThis;if("undefined"!=typeof global)return global;if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;try{return new Function("return this")()}catch(t){return{}}}();void 0===t.trustedTypes&&(t.trustedTypes={createPolicy:(t,e)=>e});const e={configurable:!1,enumerable:!1,writable:!1};void 0===t.FAST&&Reflect.defineProperty(t,"FAST",Object.assign({value:Object.create(null)},e));const r=t.FAST;if(void 0===r.getById){const t=Object.create(null);Reflect.defineProperty(r,"getById",Object.assign({value(e,r){let o=t[e];return void 0===o&&(o=r?t[e]=r():null),o}},e))}const o=Object.freeze([]);function i(){const t=new WeakMap;return function(e){let r=t.get(e);if(void 0===r){let o=Reflect.getPrototypeOf(e);for(;void 0===r&&null!==o;)r=t.get(o),o=Reflect.getPrototypeOf(o);r=void 0===r?[]:r.slice(0),t.set(e,r)}return r}}const n=t.FAST.getById(1,(()=>{const e=[],r=[];function o(){if(r.length)throw r.shift()}function i(t){try{t.call()}catch(t){r.push(t),setTimeout(o,0)}}function n(){let t=0;for(;t<e.length;)if(i(e[t]),t++,t>1024){for(let r=0,o=e.length-t;r<o;r++)e[r]=e[r+t];e.length-=t,t=0}e.length=0}return Object.freeze({enqueue:function(r){e.length<1&&t.requestAnimationFrame(n),e.push(r)},process:n})})),s=t.trustedTypes.createPolicy("fast-html",{createHTML:t=>t});let a=s;const l=`fast-${Math.random().toString(36).substring(2,8)}`,u=`${l}{`,c=`}${l}`,h=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(t){if(a!==s)throw new Error("The HTML policy can only be set once.");a=t},createHTML:t=>a.createHTML(t),isMarker:t=>t&&8===t.nodeType&&t.data.startsWith(l),extractDirectiveIndexFromMarker:t=>parseInt(t.data.replace(`${l}:`,"")),createInterpolationPlaceholder:t=>`${u}${t}${c}`,createCustomAttributePlaceholder(t,e){return`${t}="${this.createInterpolationPlaceholder(e)}"`},createBlockPlaceholder:t=>`\x3c!--${l}:${t}--\x3e`,queueUpdate:n.enqueue,processUpdates:n.process,nextUpdate:()=>new Promise(n.enqueue),setAttribute(t,e,r){null==r?t.removeAttribute(e):t.setAttribute(e,r)},setBooleanAttribute(t,e,r){r?t.setAttribute(e,""):t.removeAttribute(e)},removeChildNodes(t){for(let e=t.firstChild;null!==e;e=t.firstChild)t.removeChild(e)},createTemplateWalker:t=>document.createTreeWalker(t,133,null,!1)});class d{constructor(t,e){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=t,this.sub1=e}has(t){return void 0===this.spillover?this.sub1===t||this.sub2===t:-1!==this.spillover.indexOf(t)}subscribe(t){const e=this.spillover;if(void 0===e){if(this.has(t))return;if(void 0===this.sub1)return void(this.sub1=t);if(void 0===this.sub2)return void(this.sub2=t);this.spillover=[this.sub1,this.sub2,t],this.sub1=void 0,this.sub2=void 0}else-1===e.indexOf(t)&&e.push(t)}unsubscribe(t){const e=this.spillover;if(void 0===e)this.sub1===t?this.sub1=void 0:this.sub2===t&&(this.sub2=void 0);else{const r=e.indexOf(t);-1!==r&&e.splice(r,1)}}notify(t){const e=this.spillover,r=this.source;if(void 0===e){const e=this.sub1,o=this.sub2;void 0!==e&&e.handleChange(r,t),void 0!==o&&o.handleChange(r,t)}else for(let o=0,i=e.length;o<i;++o)e[o].handleChange(r,t)}}class p{constructor(t){this.subscribers={},this.sourceSubscribers=null,this.source=t}notify(t){var e;const r=this.subscribers[t];void 0!==r&&r.notify(t),null===(e=this.sourceSubscribers)||void 0===e||e.notify(t)}subscribe(t,e){var r;if(e){let r=this.subscribers[e];void 0===r&&(this.subscribers[e]=r=new d(this.source)),r.subscribe(t)}else this.sourceSubscribers=null!==(r=this.sourceSubscribers)&&void 0!==r?r:new d(this.source),this.sourceSubscribers.subscribe(t)}unsubscribe(t,e){var r;if(e){const r=this.subscribers[e];void 0!==r&&r.unsubscribe(t)}else null===(r=this.sourceSubscribers)||void 0===r||r.unsubscribe(t)}}const f=r.getById(2,(()=>{const t=/(:|&&|\|\||if)/,e=new WeakMap,r=h.queueUpdate;let o,n=t=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function s(t){let r=t.$fastController||e.get(t);return void 0===r&&(Array.isArray(t)?r=n(t):e.set(t,r=new p(t))),r}const a=i();class l{constructor(t){this.name=t,this.field=`_${t}`,this.callback=`${t}Changed`}getValue(t){return void 0!==o&&o.watch(t,this.name),t[this.field]}setValue(t,e){const r=this.field,o=t[r];if(o!==e){t[r]=e;const i=t[this.callback];"function"==typeof i&&i.call(t,o,e),s(t).notify(this.name)}}}class u extends d{constructor(t,e,r=!1){super(t,e),this.binding=t,this.isVolatileBinding=r,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(t,e){this.needsRefresh&&null!==this.last&&this.disconnect();const r=o;o=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const i=this.binding(t,e);return o=r,i}disconnect(){if(null!==this.last){let t=this.first;for(;void 0!==t;)t.notifier.unsubscribe(this,t.propertyName),t=t.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(t,e){const r=this.last,i=s(t),n=null===r?this.first:{};if(n.propertySource=t,n.propertyName=e,n.notifier=i,i.subscribe(this,e),null!==r){if(!this.needsRefresh){let e;o=void 0,e=r.propertySource[r.propertyName],o=this,t===e&&(this.needsRefresh=!0)}r.next=n}this.last=n}handleChange(){this.needsQueue&&(this.needsQueue=!1,r(this))}call(){null!==this.last&&(this.needsQueue=!0,this.notify(this))}records(){let t=this.first;return{next:()=>{const e=t;return void 0===e?{value:void 0,done:!0}:(t=t.next,{value:e,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(t){n=t},getNotifier:s,track(t,e){void 0!==o&&o.watch(t,e)},trackVolatile(){void 0!==o&&(o.needsRefresh=!0)},notify(t,e){s(t).notify(e)},defineProperty(t,e){"string"==typeof e&&(e=new l(e)),a(t).push(e),Reflect.defineProperty(t,e.name,{enumerable:!0,get:function(){return e.getValue(this)},set:function(t){e.setValue(this,t)}})},getAccessors:a,binding(t,e,r=this.isVolatileBinding(t)){return new u(t,e,r)},isVolatileBinding:e=>t.test(e.toString())})}));function g(t,e){f.defineProperty(t,e)}const v=r.getById(3,(()=>{let t=null;return{get:()=>t,set(e){t=e}}}));class y{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return v.get()}get isEven(){return this.index%2==0}get isOdd(){return this.index%2!=0}get isFirst(){return 0===this.index}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(t){v.set(t)}}f.defineProperty(y.prototype,"index"),f.defineProperty(y.prototype,"length");const b=Object.seal(new y);class m{constructor(){this.targets=new WeakSet}addStylesTo(t){this.targets.add(t)}removeStylesFrom(t){this.targets.delete(t)}isAttachedTo(t){return this.targets.has(t)}withBehaviors(...t){return this.behaviors=null===this.behaviors?t:this.behaviors.concat(t),this}}function w(t){return t.map((t=>t instanceof m?w(t.styles):[t])).reduce(((t,e)=>t.concat(e)),[])}function $(t){return t.map((t=>t instanceof m?t.behaviors:null)).reduce(((t,e)=>null===e?t:(null===t&&(t=[]),t.concat(e))),null)}m.create=(()=>{if(h.supportsAdoptedStyleSheets){const t=new Map;return e=>new V(e,t)}return t=>new S(t)})();const x=Symbol("prependToAdoptedStyleSheets");function C(t){const e=[],r=[];return t.forEach((t=>(t[x]?e:r).push(t))),{prepend:e,append:r}}let F=(t,e)=>{const{prepend:r,append:o}=C(e);t.adoptedStyleSheets=[...r,...t.adoptedStyleSheets,...o]},k=(t,e)=>{t.adoptedStyleSheets=t.adoptedStyleSheets.filter((t=>-1===e.indexOf(t)))};if(h.supportsAdoptedStyleSheets)try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),F=(t,e)=>{const{prepend:r,append:o}=C(e);t.adoptedStyleSheets.splice(0,0,...r),t.adoptedStyleSheets.push(...o)},k=(t,e)=>{for(const r of e){const e=t.adoptedStyleSheets.indexOf(r);-1!==e&&t.adoptedStyleSheets.splice(e,1)}}}catch(t){}class V extends m{constructor(t,e){super(),this.styles=t,this.styleSheetCache=e,this._styleSheets=void 0,this.behaviors=$(t)}get styleSheets(){if(void 0===this._styleSheets){const t=this.styles,e=this.styleSheetCache;this._styleSheets=w(t).map((t=>{if(t instanceof CSSStyleSheet)return t;let r=e.get(t);return void 0===r&&(r=new CSSStyleSheet,r.replaceSync(t),e.set(t,r)),r}))}return this._styleSheets}addStylesTo(t){F(t,this.styleSheets),super.addStylesTo(t)}removeStylesFrom(t){k(t,this.styleSheets),super.removeStylesFrom(t)}}let D=0;class S extends m{constructor(t){super(),this.styles=t,this.behaviors=null,this.behaviors=$(t),this.styleSheets=w(t),this.styleClass="fast-style-class-"+ ++D}addStylesTo(t){const e=this.styleSheets,r=this.styleClass;t=this.normalizeTarget(t);for(let o=0;o<e.length;o++){const i=document.createElement("style");i.innerHTML=e[o],i.className=r,t.append(i)}super.addStylesTo(t)}removeStylesFrom(t){const e=(t=this.normalizeTarget(t)).querySelectorAll(`.${this.styleClass}`);for(let r=0,o=e.length;r<o;++r)t.removeChild(e[r]);super.removeStylesFrom(t)}isAttachedTo(t){return super.isAttachedTo(this.normalizeTarget(t))}normalizeTarget(t){return t===document?document.body:t}}const T=Object.freeze({locate:i()}),O={toView:t=>t?"true":"false",fromView:t=>null!=t&&"false"!==t&&!1!==t&&0!==t},R={toView(t){if(null==t)return null;const e=1*t;return isNaN(e)?null:e.toString()},fromView(t){if(null==t)return null;const e=1*t;return isNaN(e)?null:e}};class L{constructor(t,e,r=e.toLowerCase(),o="reflect",i){this.guards=new Set,this.Owner=t,this.name=e,this.attribute=r,this.mode=o,this.converter=i,this.fieldName=`_${e}`,this.callbackName=`${e}Changed`,this.hasCallback=this.callbackName in t.prototype,"boolean"===o&&void 0===i&&(this.converter=O)}setValue(t,e){const r=t[this.fieldName],o=this.converter;void 0!==o&&(e=o.fromView(e)),r!==e&&(t[this.fieldName]=e,this.tryReflectToAttribute(t),this.hasCallback&&t[this.callbackName](r,e),t.$fastController.notify(this.name))}getValue(t){return f.track(t,this.name),t[this.fieldName]}onAttributeChangedCallback(t,e){this.guards.has(t)||(this.guards.add(t),this.setValue(t,e),this.guards.delete(t))}tryReflectToAttribute(t){const e=this.mode,r=this.guards;r.has(t)||"fromView"===e||h.queueUpdate((()=>{r.add(t);const o=t[this.fieldName];switch(e){case"reflect":const e=this.converter;h.setAttribute(t,this.attribute,void 0!==e?e.toView(o):o);break;case"boolean":h.setBooleanAttribute(t,this.attribute,o)}r.delete(t)}))}static collect(t,...e){const r=[];e.push(T.locate(t));for(let o=0,i=e.length;o<i;++o){const i=e[o];if(void 0!==i)for(let e=0,o=i.length;e<o;++e){const o=i[e];"string"==typeof o?r.push(new L(t,o)):r.push(new L(t,o.property,o.attribute,o.mode,o.converter))}}return r}}function P(t,e){let r;function o(t,e){arguments.length>1&&(r.property=e),T.locate(t.constructor).push(r)}return arguments.length>1?(r={},void o(t,e)):(r=void 0===t?{}:t,o)}const I={mode:"open"},N={},M=r.getById(4,(()=>{const t=new Map;return Object.freeze({register:e=>!t.has(e.type)&&(t.set(e.type,e),!0),getByType:e=>t.get(e)})}));class B{constructor(t,e=t.definition){"string"==typeof e&&(e={name:e}),this.type=t,this.name=e.name,this.template=e.template;const r=L.collect(t,e.attributes),o=new Array(r.length),i={},n={};for(let t=0,e=r.length;t<e;++t){const e=r[t];o[t]=e.attribute,i[e.name]=e,n[e.attribute]=e}this.attributes=r,this.observedAttributes=o,this.propertyLookup=i,this.attributeLookup=n,this.shadowOptions=void 0===e.shadowOptions?I:null===e.shadowOptions?void 0:Object.assign(Object.assign({},I),e.shadowOptions),this.elementOptions=void 0===e.elementOptions?N:Object.assign(Object.assign({},N),e.elementOptions),this.styles=void 0===e.styles?void 0:Array.isArray(e.styles)?m.create(e.styles):e.styles instanceof m?e.styles:m.create([e.styles])}get isDefined(){return!!M.getByType(this.type)}define(t=customElements){const e=this.type;if(M.register(this)){const t=this.attributes,r=e.prototype;for(let e=0,o=t.length;e<o;++e)f.defineProperty(r,t[e]);Reflect.defineProperty(e,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return t.get(this.name)||t.define(this.name,e,this.elementOptions),this}}function E(t,e,r,o){var i,n=arguments.length,s=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,o);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(n<3?i(s):n>3?i(e,r,s):i(e,r))||s);return n>3&&s&&Object.defineProperty(e,r,s),s}B.forType=M.getByType;const A=new WeakMap,z={bubbles:!0,composed:!0,cancelable:!0};function j(t){return t.shadowRoot||A.get(t)||null}class H extends p{constructor(t,e){super(t),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=t,this.definition=e;const r=e.shadowOptions;if(void 0!==r){const e=t.attachShadow(r);"closed"===r.mode&&A.set(t,e)}const o=f.getAccessors(t);if(o.length>0){const e=this.boundObservables=Object.create(null);for(let r=0,i=o.length;r<i;++r){const i=o[r].name,n=t[i];void 0!==n&&(delete t[i],e[i]=n)}}}get isConnected(){return f.track(this,"isConnected"),this._isConnected}setIsConnected(t){this._isConnected=t,f.notify(this,"isConnected")}get template(){return this._template}set template(t){this._template!==t&&(this._template=t,this.needsInitialization||this.renderTemplate(t))}get styles(){return this._styles}set styles(t){this._styles!==t&&(null!==this._styles&&this.removeStyles(this._styles),this._styles=t,this.needsInitialization||null===t||this.addStyles(t))}addStyles(t){const e=j(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)e.append(t);else if(!t.isAttachedTo(e)){const r=t.behaviors;t.addStylesTo(e),null!==r&&this.addBehaviors(r)}}removeStyles(t){const e=j(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)e.removeChild(t);else if(t.isAttachedTo(e)){const r=t.behaviors;t.removeStylesFrom(e),null!==r&&this.removeBehaviors(r)}}addBehaviors(t){const e=this.behaviors||(this.behaviors=new Map),r=t.length,o=[];for(let i=0;i<r;++i){const r=t[i];e.has(r)?e.set(r,e.get(r)+1):(e.set(r,1),o.push(r))}if(this._isConnected){const t=this.element;for(let e=0;e<o.length;++e)o[e].bind(t,b)}}removeBehaviors(t,e=!1){const r=this.behaviors;if(null===r)return;const o=t.length,i=[];for(let n=0;n<o;++n){const o=t[n];if(r.has(o)){const t=r.get(o)-1;0===t||e?r.delete(o)&&i.push(o):r.set(o,t)}}if(this._isConnected){const t=this.element;for(let e=0;e<i.length;++e)i[e].unbind(t)}}onConnectedCallback(){if(this._isConnected)return;const t=this.element;this.needsInitialization?this.finishInitialization():null!==this.view&&this.view.bind(t,b);const e=this.behaviors;if(null!==e)for(const[r]of e)r.bind(t,b);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const t=this.view;null!==t&&t.unbind();const e=this.behaviors;if(null!==e){const t=this.element;for(const[r]of e)r.unbind(t)}}onAttributeChangedCallback(t,e,r){const o=this.definition.attributeLookup[t];void 0!==o&&o.onAttributeChangedCallback(this.element,r)}emit(t,e,r){return!!this._isConnected&&this.element.dispatchEvent(new CustomEvent(t,Object.assign(Object.assign({detail:e},z),r)))}finishInitialization(){const t=this.element,e=this.boundObservables;if(null!==e){const r=Object.keys(e);for(let o=0,i=r.length;o<i;++o){const i=r[o];t[i]=e[i]}this.boundObservables=null}const r=this.definition;null===this._template&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():r.template&&(this._template=r.template||null)),null!==this._template&&this.renderTemplate(this._template),null===this._styles&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():r.styles&&(this._styles=r.styles||null)),null!==this._styles&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(t){const e=this.element,r=j(e)||e;null!==this.view?(this.view.dispose(),this.view=null):this.needsInitialization||h.removeChildNodes(r),t&&(this.view=t.render(e,r,e))}static forCustomElement(t){const e=t.$fastController;if(void 0!==e)return e;const r=B.forType(t.constructor);if(void 0===r)throw new Error("Missing FASTElement definition.");return t.$fastController=new H(t,r)}}function _(t){return class extends t{constructor(){super(),H.forCustomElement(this)}$emit(t,e,r){return this.$fastController.emit(t,e,r)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(t,e,r){this.$fastController.onAttributeChangedCallback(t,e,r)}}}const q=Object.assign(_(HTMLElement),{from:t=>_(t),define:(t,e)=>new B(t,e).define().type}),U=new Map;"metadata"in Reflect||(Reflect.metadata=function(t,e){return function(r){Reflect.defineMetadata(t,e,r)}},Reflect.defineMetadata=function(t,e,r){let o=U.get(r);void 0===o&&U.set(r,o=new Map),o.set(t,e)},Reflect.getOwnMetadata=function(t,e){const r=U.get(e);if(void 0!==r)return r.get(t)});class G{constructor(t,e){this.container=t,this.key=e}instance(t){return this.registerResolver(0,t)}singleton(t){return this.registerResolver(1,t)}transient(t){return this.registerResolver(2,t)}callback(t){return this.registerResolver(3,t)}cachedCallback(t){return this.registerResolver(3,yt(t))}aliasTo(t){return this.registerResolver(5,t)}registerResolver(t,e){const{container:r,key:o}=this;return this.container=this.key=void 0,r.registerResolver(o,new nt(o,t,e))}}function W(t){const e=t.slice(),r=Object.keys(t),o=r.length;let i;for(let n=0;n<o;++n)i=r[n],kt(i)||(e[i]=t[i]);return e}const Y=Object.freeze({none(t){throw Error(`${t.toString()} not registered, did you forget to add @singleton()?`)},singleton:t=>new nt(t,1,t),transient:t=>new nt(t,2,t)}),Z=Object.freeze({default:Object.freeze({parentLocator:()=>null,responsibleForOwnerRequests:!1,defaultResolver:Y.singleton})}),Q=new Map;function X(t){return e=>Reflect.getOwnMetadata(t,e)}let J=null;const K=Object.freeze({createContainer:t=>new gt(null,Object.assign({},Z.default,t)),findResponsibleContainer(t){const e=t.$$container$$;return e&&e.responsibleForOwnerRequests?e:K.findParentContainer(t)},findParentContainer(t){const e=new CustomEvent(pt,{bubbles:!0,composed:!0,cancelable:!0,detail:{container:void 0}});return t.dispatchEvent(e),e.detail.container||K.getOrCreateDOMContainer()},getOrCreateDOMContainer:(t,e)=>t?t.$$container$$||new gt(t,Object.assign({},Z.default,e,{parentLocator:K.findParentContainer})):J||(J=new gt(null,Object.assign({},Z.default,e,{parentLocator:()=>null}))),getDesignParamtypes:X("design:paramtypes"),getAnnotationParamtypes:X("di:paramtypes"),getOrCreateAnnotationParamTypes(t){let e=this.getAnnotationParamtypes(t);return void 0===e&&Reflect.defineMetadata("di:paramtypes",e=[],t),e},getDependencies(t){let e=Q.get(t);if(void 0===e){const r=t.inject;if(void 0===r){const r=K.getDesignParamtypes(t),o=K.getAnnotationParamtypes(t);if(void 0===r)if(void 0===o){const r=Object.getPrototypeOf(t);e="function"==typeof r&&r!==Function.prototype?W(K.getDependencies(r)):[]}else e=W(o);else if(void 0===o)e=W(r);else{e=W(r);let t,i=o.length;for(let r=0;r<i;++r)t=o[r],void 0!==t&&(e[r]=t);const n=Object.keys(o);let s;i=n.length;for(let t=0;t<i;++t)s=n[t],kt(s)||(e[s]=o[s])}}else e=W(r);Q.set(t,e)}return e},defineProperty(t,e,r,o=!1){const i=`$di_${e}`;Reflect.defineProperty(t,e,{get:function(){let t=this[i];if(void 0===t){const n=this instanceof HTMLElement?K.findResponsibleContainer(this):K.getOrCreateDOMContainer();if(t=n.get(r),this[i]=t,o&&this instanceof q){const o=this.$fastController,n=()=>{K.findResponsibleContainer(this).get(r)!==this[i]&&(this[i]=t,o.notify(e))};o.subscribe({handleChange:n},"isConnected")}}return t}})},createInterface(t,e){const r="function"==typeof t?t:e,o="string"==typeof t?t:t&&"friendlyName"in t&&t.friendlyName||$t,i="string"!=typeof t&&(t&&"respectConnection"in t&&t.respectConnection||!1),n=function(t,e,r){if(null==t||void 0!==new.target)throw new Error(`No registration for interface: '${n.friendlyName}'`);e?K.defineProperty(t,e,n,i):K.getOrCreateAnnotationParamTypes(t)[r]=n};return n.$isInterface=!0,n.friendlyName=null==o?"(anonymous)":o,null!=r&&(n.register=function(t,e){return r(new G(t,null!=e?e:n))}),n.toString=function(){return`InterfaceSymbol<${n.friendlyName}>`},n},inject:(...t)=>function(e,r,o){if("number"==typeof o){const r=K.getOrCreateAnnotationParamTypes(e),i=t[0];void 0!==i&&(r[o]=i)}else if(r)K.defineProperty(e,r,t[0]);else{const r=o?K.getOrCreateAnnotationParamTypes(o.value):K.getOrCreateAnnotationParamTypes(e);let i;for(let e=0;e<t.length;++e)i=t[e],void 0!==i&&(r[e]=i)}},transient:t=>(t.register=function(e){return bt.transient(t,t).register(e)},t.registerInRequestor=!1,t),singleton:(t,e=rt)=>(t.register=function(e){return bt.singleton(t,t).register(e)},t.registerInRequestor=e.scoped,t)}),tt=K.createInterface("Container");function et(t){return function(e){const r=function(t,e,o){K.inject(r)(t,e,o)};return r.$isResolver=!0,r.resolve=function(r,o){return t(e,r,o)},r}}K.inject;const rt={scoped:!1};function ot(t,e,r){K.inject(ot)(t,e,r)}function it(t,e){return e.getFactory(t).construct(e)}et(((t,e,r)=>()=>r.get(t))),et(((t,e,r)=>r.has(t,!0)?r.get(t):void 0)),ot.$isResolver=!0,ot.resolve=()=>{},et(((t,e,r)=>{const o=it(t,e),i=new nt(t,0,o);return r.registerResolver(t,i),o})),et(((t,e,r)=>it(t,e)));class nt{constructor(t,e,r){this.key=t,this.strategy=e,this.state=r,this.resolving=!1}get $isResolver(){return!0}register(t){return t.registerResolver(this.key,this)}resolve(t,e){switch(this.strategy){case 0:return this.state;case 1:if(this.resolving)throw new Error(`Cyclic dependency found: ${this.state.name}`);return this.resolving=!0,this.state=t.getFactory(this.state).construct(e),this.strategy=0,this.resolving=!1,this.state;case 2:{const r=t.getFactory(this.state);if(null===r)throw new Error(`Resolver for ${String(this.key)} returned a null factory`);return r.construct(e)}case 3:return this.state(t,e,this);case 4:return this.state[0].resolve(t,e);case 5:return e.get(this.state);default:throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`)}}getFactory(t){var e,r,o;switch(this.strategy){case 1:case 2:return t.getFactory(this.state);case 5:return null!==(o=null===(r=null===(e=t.getResolver(this.state))||void 0===e?void 0:e.getFactory)||void 0===r?void 0:r.call(e,t))&&void 0!==o?o:null;default:return null}}}function st(t){return this.get(t)}function at(t,e){return e(t)}class lt{constructor(t,e){this.Type=t,this.dependencies=e,this.transformers=null}construct(t,e){let r;return r=void 0===e?new this.Type(...this.dependencies.map(st,t)):new this.Type(...this.dependencies.map(st,t),...e),null==this.transformers?r:this.transformers.reduce(at,r)}registerTransformer(t){(this.transformers||(this.transformers=[])).push(t)}}const ut={$isResolver:!0,resolve:(t,e)=>e};function ct(t){return"function"==typeof t.register}function ht(t){return function(t){return ct(t)&&"boolean"==typeof t.registerInRequestor}(t)&&t.registerInRequestor}const dt=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]),pt="__DI_LOCATE_PARENT__",ft=new Map;class gt{constructor(t,e){this.owner=t,this.config=e,this._parent=void 0,this.registerDepth=0,this.context=null,null!==t&&(t.$$container$$=this),this.resolvers=new Map,this.resolvers.set(tt,ut),t instanceof Node&&t.addEventListener(pt,(t=>{t.composedPath()[0]!==this.owner&&(t.detail.container=this,t.stopImmediatePropagation())}))}get parent(){return void 0===this._parent&&(this._parent=this.config.parentLocator(this.owner)),this._parent}get depth(){return null===this.parent?0:this.parent.depth+1}get responsibleForOwnerRequests(){return this.config.responsibleForOwnerRequests}registerWithContext(t,...e){return this.context=t,this.register(...e),this.context=null,this}register(...t){if(100===++this.registerDepth)throw new Error("Unable to autoregister dependency");let e,r,o,i,n;const s=this.context;for(let a=0,l=t.length;a<l;++a)if(e=t[a],xt(e))if(ct(e))e.register(this,s);else if(void 0!==e.prototype)bt.singleton(e,e).register(this);else for(r=Object.keys(e),i=0,n=r.length;i<n;++i)o=e[r[i]],xt(o)&&(ct(o)?o.register(this,s):this.register(o));return--this.registerDepth,this}registerResolver(t,e){mt(t);const r=this.resolvers,o=r.get(t);return null==o?r.set(t,e):o instanceof nt&&4===o.strategy?o.state.push(e):r.set(t,new nt(t,4,[o,e])),e}registerTransformer(t,e){const r=this.getResolver(t);if(null==r)return!1;if(r.getFactory){const t=r.getFactory(this);return null!=t&&(t.registerTransformer(e),!0)}return!1}getResolver(t,e=!0){if(mt(t),void 0!==t.resolve)return t;let r,o=this;for(;null!=o;){if(r=o.resolvers.get(t),null!=r)return r;if(null==o.parent){const r=ht(t)?this:o;return e?this.jitRegister(t,r):null}o=o.parent}return null}has(t,e=!1){return!!this.resolvers.has(t)||!(!e||null==this.parent)&&this.parent.has(t,!0)}get(t){if(mt(t),t.$isResolver)return t.resolve(this,this);let e,r=this;for(;null!=r;){if(e=r.resolvers.get(t),null!=e)return e.resolve(r,this);if(null==r.parent){const o=ht(t)?this:r;return e=this.jitRegister(t,o),e.resolve(r,this)}r=r.parent}throw new Error(`Unable to resolve key: ${String(t)}`)}getAll(t,e=!1){mt(t);const r=this;let i,n=r;if(e){let e=o;for(;null!=n;)i=n.resolvers.get(t),null!=i&&(e=e.concat(wt(i,n,r))),n=n.parent;return e}for(;null!=n;){if(i=n.resolvers.get(t),null!=i)return wt(i,n,r);if(n=n.parent,null==n)return o}return o}getFactory(t){let e=ft.get(t);if(void 0===e){if(Ct(t))throw new Error(`${t.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);ft.set(t,e=new lt(t,K.getDependencies(t)))}return e}registerFactory(t,e){ft.set(t,e)}createChild(t){return new gt(null,Object.assign({},this.config,t,{parentLocator:()=>this}))}jitRegister(t,e){if("function"!=typeof t)throw new Error(`Attempted to jitRegister something that is not a constructor: '${t}'. Did you forget to register this dependency?`);if(dt.has(t.name))throw new Error(`Attempted to jitRegister an intrinsic type: ${t.name}. Did you forget to add @inject(Key)`);if(ct(t)){const r=t.register(e);if(!(r instanceof Object)||null==r.resolve){const r=e.resolvers.get(t);if(null!=r)return r;throw new Error("A valid resolver was not returned from the static register method")}return r}if(t.$isInterface)throw new Error(`Attempted to jitRegister an interface: ${t.friendlyName}`);{const r=this.config.defaultResolver(t,e);return e.resolvers.set(t,r),r}}}const vt=new WeakMap;function yt(t){return function(e,r,o){if(vt.has(o))return vt.get(o);const i=t(e,r,o);return vt.set(o,i),i}}const bt=Object.freeze({instance:(t,e)=>new nt(t,0,e),singleton:(t,e)=>new nt(t,1,e),transient:(t,e)=>new nt(t,2,e),callback:(t,e)=>new nt(t,3,e),cachedCallback:(t,e)=>new nt(t,3,yt(e)),aliasTo:(t,e)=>new nt(e,5,t)});function mt(t){if(null==t)throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?")}function wt(t,e,r){if(t instanceof nt&&4===t.strategy){const o=t.state;let i=o.length;const n=new Array(i);for(;i--;)n[i]=o[i].resolve(e,r);return n}return[t.resolve(e,r)]}const $t="(anonymous)";function xt(t){return"object"==typeof t&&null!==t||"function"==typeof t}const Ct=function(){const t=new WeakMap;let e=!1,r="",o=0;return function(i){return e=t.get(i),void 0===e&&(r=i.toString(),o=r.length,e=o>=29&&o<=100&&125===r.charCodeAt(o-1)&&r.charCodeAt(o-2)<=32&&93===r.charCodeAt(o-3)&&101===r.charCodeAt(o-4)&&100===r.charCodeAt(o-5)&&111===r.charCodeAt(o-6)&&99===r.charCodeAt(o-7)&&32===r.charCodeAt(o-8)&&101===r.charCodeAt(o-9)&&118===r.charCodeAt(o-10)&&105===r.charCodeAt(o-11)&&116===r.charCodeAt(o-12)&&97===r.charCodeAt(o-13)&&110===r.charCodeAt(o-14)&&88===r.charCodeAt(o-15),t.set(i,e)),e}}(),Ft={};function kt(t){switch(typeof t){case"number":return t>=0&&(0|t)===t;case"string":{const e=Ft[t];if(void 0!==e)return e;const r=t.length;if(0===r)return Ft[t]=!1;let o=0;for(let e=0;e<r;++e)if(o=t.charCodeAt(e),0===e&&48===o&&r>1||o<48||o>57)return Ft[t]=!1;return Ft[t]=!0}default:return!1}}function Vt(t){return`${t.toLowerCase()}:presentation`}const Dt=new Map,St=Object.freeze({define(t,e,r){const o=Vt(t);void 0===Dt.get(o)?Dt.set(o,e):Dt.set(o,!1),r.register(bt.instance(o,e))},forTag(t,e){const r=Vt(t),o=Dt.get(r);return!1===o?K.findResponsibleContainer(e).get(r):o||null}});class Tt{constructor(t,e){this.template=t||null,this.styles=void 0===e?null:Array.isArray(e)?m.create(e):e instanceof m?e:m.create([e])}applyTo(t){const e=t.$fastController;null===e.template&&(e.template=this.template),null===e.styles&&(e.styles=this.styles)}}class Ot extends q{constructor(){super(...arguments),this._presentation=void 0}get $presentation(){return void 0===this._presentation&&(this._presentation=St.forTag(this.tagName,this)),this._presentation}templateChanged(){void 0!==this.template&&(this.$fastController.template=this.template)}stylesChanged(){void 0!==this.styles&&(this.$fastController.styles=this.styles)}connectedCallback(){null!==this.$presentation&&this.$presentation.applyTo(this),super.connectedCallback()}static compose(t){return(e={})=>new Lt(this===Ot?class extends Ot{}:this,t,e)}}function Rt(t,e,r){return"function"==typeof t?t(e,r):t}E([g],Ot.prototype,"template",void 0),E([g],Ot.prototype,"styles",void 0);class Lt{constructor(t,e,r){this.type=t,this.elementDefinition=e,this.overrideDefinition=r,this.definition=Object.assign(Object.assign({},this.elementDefinition),this.overrideDefinition)}register(t,e){const r=this.definition,o=this.overrideDefinition,i=`${r.prefix||e.elementPrefix}-${r.baseName}`;e.tryDefineElement({name:i,type:this.type,baseClass:this.elementDefinition.baseClass,callback:t=>{const e=new Tt(Rt(r.template,t,r),Rt(r.styles,t,r));t.definePresentation(e);let i=Rt(r.shadowOptions,t,r);t.shadowRootMode&&(i?o.shadowOptions||(i.mode=t.shadowRootMode):null!==i&&(i={mode:t.shadowRootMode})),t.defineElement({elementOptions:Rt(r.elementOptions,t,r),shadowOptions:i,attributes:Rt(r.attributes,t,r)})}})}}class Pt{createCSS(){return""}createBehavior(){}}function It(t){const e=t.parentElement;if(e)return e;{const e=t.getRootNode();if(e.host instanceof HTMLElement)return e.host}return null}const Nt=document.createElement("div");class Mt{setProperty(t,e){h.queueUpdate((()=>this.target.setProperty(t,e)))}removeProperty(t){h.queueUpdate((()=>this.target.removeProperty(t)))}}class Bt extends Mt{constructor(){super();const t=new CSSStyleSheet;this.target=t.cssRules[t.insertRule(":root{}")].style,document.adoptedStyleSheets=[...document.adoptedStyleSheets,t]}}class Et extends Mt{constructor(){super(),this.style=document.createElement("style"),document.head.appendChild(this.style);const{sheet:t}=this.style;if(t){const e=t.insertRule(":root{}",t.cssRules.length);this.target=t.cssRules[e].style}}}class At{constructor(t){this.store=new Map,this.target=null;const e=t.$fastController;this.style=document.createElement("style"),e.addStyles(this.style),f.getNotifier(e).subscribe(this,"isConnected"),this.handleChange(e,"isConnected")}targetChanged(){if(null!==this.target)for(const[t,e]of this.store.entries())this.target.setProperty(t,e)}setProperty(t,e){this.store.set(t,e),h.queueUpdate((()=>{null!==this.target&&this.target.setProperty(t,e)}))}removeProperty(t){this.store.delete(t),h.queueUpdate((()=>{null!==this.target&&this.target.removeProperty(t)}))}handleChange(t,e){const{sheet:r}=this.style;if(r){const t=r.insertRule(":host{}",r.cssRules.length);this.target=r.cssRules[t].style}else this.target=null}}E([g],At.prototype,"target",void 0);class zt{constructor(t){this.target=t.style}setProperty(t,e){h.queueUpdate((()=>this.target.setProperty(t,e)))}removeProperty(t){h.queueUpdate((()=>this.target.removeProperty(t)))}}class jt{setProperty(t,e){jt.properties[t]=e;for(const r of jt.roots.values())qt.getOrCreate(jt.normalizeRoot(r)).setProperty(t,e)}removeProperty(t){delete jt.properties[t];for(const e of jt.roots.values())qt.getOrCreate(jt.normalizeRoot(e)).removeProperty(t)}static registerRoot(t){const{roots:e}=jt;if(!e.has(t)){e.add(t);const r=qt.getOrCreate(this.normalizeRoot(t));for(const t in jt.properties)r.setProperty(t,jt.properties[t])}}static unregisterRoot(t){const{roots:e}=jt;if(e.has(t)){e.delete(t);const r=qt.getOrCreate(jt.normalizeRoot(t));for(const t in jt.properties)r.removeProperty(t)}}static normalizeRoot(t){return t===Nt?document:t}}jt.roots=new Set,jt.properties={};const Ht=new WeakMap,_t=h.supportsAdoptedStyleSheets?class extends Mt{constructor(t){super();const e=new CSSStyleSheet;e[x]=!0,this.target=e.cssRules[e.insertRule(":host{}")].style,t.$fastController.addStyles(m.create([e]))}}:At,qt=Object.freeze({getOrCreate(t){if(Ht.has(t))return Ht.get(t);let e;return e=t===Nt?new jt:t instanceof Document?h.supportsAdoptedStyleSheets?new Bt:new Et:t instanceof q?new _t(t):new zt(t),Ht.set(t,e),e}});class Ut extends Pt{constructor(t){super(),this.subscribers=new WeakMap,this._appliedTo=new Set,this.name=t.name,null!==t.cssCustomPropertyName&&(this.cssCustomProperty=`--${t.cssCustomPropertyName}`,this.cssVar=`var(${this.cssCustomProperty})`),this.id=Ut.uniqueId(),Ut.tokensById.set(this.id,this)}get appliedTo(){return[...this._appliedTo]}static from(t){return new Ut({name:"string"==typeof t?t:t.name,cssCustomPropertyName:"string"==typeof t?t:void 0===t.cssCustomPropertyName?t.name:t.cssCustomPropertyName})}static isCSSDesignToken(t){return"string"==typeof t.cssCustomProperty}static isDerivedDesignTokenValue(t){return"function"==typeof t}static getTokenById(t){return Ut.tokensById.get(t)}getOrCreateSubscriberSet(t=this){return this.subscribers.get(t)||this.subscribers.set(t,new Set)&&this.subscribers.get(t)}createCSS(){return this.cssVar||""}getValueFor(t){const e=Qt.getOrCreate(t).get(this);if(void 0!==e)return e;throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${t} or an ancestor of ${t}.`)}setValueFor(t,e){return this._appliedTo.add(t),e instanceof Ut&&(e=this.alias(e)),Qt.getOrCreate(t).set(this,e),this}deleteValueFor(t){return this._appliedTo.delete(t),Qt.existsFor(t)&&Qt.getOrCreate(t).delete(this),this}withDefault(t){return this.setValueFor(Nt,t),this}subscribe(t,e){const r=this.getOrCreateSubscriberSet(e);e&&!Qt.existsFor(e)&&Qt.getOrCreate(e),r.has(t)||r.add(t)}unsubscribe(t,e){const r=this.subscribers.get(e||this);r&&r.has(t)&&r.delete(t)}notify(t){const e=Object.freeze({token:this,target:t});this.subscribers.has(this)&&this.subscribers.get(this).forEach((t=>t.handleChange(e))),this.subscribers.has(t)&&this.subscribers.get(t).forEach((t=>t.handleChange(e)))}alias(t){return e=>t.getValueFor(e)}}Ut.uniqueId=(()=>{let t=0;return()=>(t++,t.toString(16))})(),Ut.tokensById=new Map;class Gt{constructor(t,e,r){this.source=t,this.token=e,this.node=r,this.dependencies=new Set,this.observer=f.binding(t,this,!1),this.observer.handleChange=this.observer.call,this.handleChange()}disconnect(){this.observer.disconnect()}handleChange(){try{this.node.store.set(this.token,this.observer.observe(this.node.target,b))}catch(t){console.error(t)}}}class Wt{constructor(){this.values=new Map}set(t,e){this.values.get(t)!==e&&(this.values.set(t,e),f.getNotifier(this).notify(t.id))}get(t){return f.track(this,t.id),this.values.get(t)}delete(t){this.values.delete(t),f.getNotifier(this).notify(t.id)}all(){return this.values.entries()}}const Yt=new WeakMap,Zt=new WeakMap;class Qt{constructor(t){this.target=t,this.store=new Wt,this.children=[],this.assignedValues=new Map,this.reflecting=new Set,this.bindingObservers=new Map,this.tokenValueChangeHandler={handleChange:(t,e)=>{const r=Ut.getTokenById(e);r&&(r.notify(this.target),this.updateCSSTokenReflection(t,r))}},Yt.set(t,this),f.getNotifier(this.store).subscribe(this.tokenValueChangeHandler),t instanceof q?t.$fastController.addBehaviors([this]):t.isConnected&&this.bind()}static getOrCreate(t){return Yt.get(t)||new Qt(t)}static existsFor(t){return Yt.has(t)}static findParent(t){if(Nt!==t.target){let e=It(t.target);for(;null!==e;){if(Yt.has(e))return Yt.get(e);e=It(e)}return Qt.getOrCreate(Nt)}return null}static findClosestAssignedNode(t,e){let r=e;do{if(r.has(t))return r;r=r.parent?r.parent:r.target!==Nt?Qt.getOrCreate(Nt):null}while(null!==r);return null}get parent(){return Zt.get(this)||null}updateCSSTokenReflection(t,e){if(Ut.isCSSDesignToken(e)){const r=this.parent,o=this.isReflecting(e);if(r){const i=r.get(e),n=t.get(e);i===n||o?i===n&&o&&this.stopReflectToCSS(e):this.reflectToCSS(e)}else o||this.reflectToCSS(e)}}has(t){return this.assignedValues.has(t)}get(t){const e=this.store.get(t);if(void 0!==e)return e;const r=this.getRaw(t);return void 0!==r?(this.hydrate(t,r),this.get(t)):void 0}getRaw(t){var e;return this.assignedValues.has(t)?this.assignedValues.get(t):null===(e=Qt.findClosestAssignedNode(t,this))||void 0===e?void 0:e.getRaw(t)}set(t,e){Ut.isDerivedDesignTokenValue(this.assignedValues.get(t))&&this.tearDownBindingObserver(t),this.assignedValues.set(t,e),Ut.isDerivedDesignTokenValue(e)?this.setupBindingObserver(t,e):this.store.set(t,e)}delete(t){this.assignedValues.delete(t),this.tearDownBindingObserver(t);const e=this.getRaw(t);e?this.hydrate(t,e):this.store.delete(t)}bind(){const t=Qt.findParent(this);t&&t.appendChild(this);for(const t of this.assignedValues.keys())t.notify(this.target)}unbind(){this.parent&&Zt.get(this).removeChild(this);for(const t of this.bindingObservers.keys())this.tearDownBindingObserver(t)}appendChild(t){t.parent&&Zt.get(t).removeChild(t);const e=this.children.filter((e=>t.contains(e)));Zt.set(t,this),this.children.push(t),e.forEach((e=>t.appendChild(e))),f.getNotifier(this.store).subscribe(t);for(const[e,r]of this.store.all())t.hydrate(e,this.bindingObservers.has(e)?this.getRaw(e):r),t.updateCSSTokenReflection(t.store,e)}removeChild(t){const e=this.children.indexOf(t);if(-1!==e&&this.children.splice(e,1),f.getNotifier(this.store).unsubscribe(t),t.parent!==this)return!1;const r=Zt.delete(t);for(const[e]of this.store.all())t.hydrate(e,t.getRaw(e)),t.updateCSSTokenReflection(t.store,e);return r}contains(t){return function(t,e){let r=e;for(;null!==r;){if(r===t)return!0;r=It(r)}return!1}(this.target,t.target)}reflectToCSS(t){this.isReflecting(t)||(this.reflecting.add(t),Qt.cssCustomPropertyReflector.startReflection(t,this.target))}stopReflectToCSS(t){this.isReflecting(t)&&(this.reflecting.delete(t),Qt.cssCustomPropertyReflector.stopReflection(t,this.target))}isReflecting(t){return this.reflecting.has(t)}handleChange(t,e){const r=Ut.getTokenById(e);r&&(this.hydrate(r,this.getRaw(r)),this.updateCSSTokenReflection(this.store,r))}hydrate(t,e){if(!this.has(t)){const r=this.bindingObservers.get(t);Ut.isDerivedDesignTokenValue(e)?r?r.source!==e&&(this.tearDownBindingObserver(t),this.setupBindingObserver(t,e)):this.setupBindingObserver(t,e):(r&&this.tearDownBindingObserver(t),this.store.set(t,e))}}setupBindingObserver(t,e){const r=new Gt(e,t,this);return this.bindingObservers.set(t,r),r}tearDownBindingObserver(t){return!!this.bindingObservers.has(t)&&(this.bindingObservers.get(t).disconnect(),this.bindingObservers.delete(t),!0)}}Qt.cssCustomPropertyReflector=new class{startReflection(t,e){t.subscribe(this,e),this.handleChange({token:t,target:e})}stopReflection(t,e){t.unsubscribe(this,e),this.remove(t,e)}handleChange(t){const{token:e,target:r}=t;this.add(e,r)}add(t,e){qt.getOrCreate(e).setProperty(t.cssCustomProperty,this.resolveCSSValue(Qt.getOrCreate(e).get(t)))}remove(t,e){qt.getOrCreate(e).removeProperty(t.cssCustomProperty)}resolveCSSValue(t){return t&&"function"==typeof t.createCSS?t.createCSS():t}},E([g],Qt.prototype,"children",void 0);const Xt=Object.freeze({create:function(t){return Ut.from(t)},notifyConnection:t=>!(!t.isConnected||!Qt.existsFor(t)||(Qt.getOrCreate(t).bind(),0)),notifyDisconnection:t=>!(t.isConnected||!Qt.existsFor(t)||(Qt.getOrCreate(t).unbind(),0)),registerRoot(t=Nt){jt.registerRoot(t)},unregisterRoot(t=Nt){jt.unregisterRoot(t)}}),Jt=Object.freeze({definitionCallbackOnly:null,ignoreDuplicate:Symbol()}),Kt=new Map,te=new Map;let ee=null;const re=K.createInterface((t=>t.cachedCallback((t=>(null===ee&&(ee=new ie(null,t)),ee))))),oe=Object.freeze({tagFor:t=>te.get(t),responsibleFor(t){const e=t.$$designSystem$$;return e||K.findResponsibleContainer(t).get(re)},getOrCreate(t){if(!t)return null===ee&&(ee=K.getOrCreateDOMContainer().get(re)),ee;const e=t.$$designSystem$$;if(e)return e;const r=K.getOrCreateDOMContainer(t);if(r.has(re,!1))return r.get(re);{const e=new ie(t,r);return r.register(bt.instance(re,e)),e}}});class ie{constructor(t,e){this.owner=t,this.container=e,this.designTokensInitialized=!1,this.prefix="fast",this.shadowRootMode=void 0,this.disambiguate=()=>Jt.definitionCallbackOnly,null!==t&&(t.$$designSystem$$=this)}withPrefix(t){return this.prefix=t,this}withShadowRootMode(t){return this.shadowRootMode=t,this}withElementDisambiguation(t){return this.disambiguate=t,this}withDesignTokenRoot(t){return this.designTokenRoot=t,this}register(...t){const e=this.container,r=[],o=this.disambiguate,i=this.shadowRootMode,n={elementPrefix:this.prefix,tryDefineElement(t,n,s){const a=function(t,e,r){return"string"==typeof t?{name:t,type:e,callback:r}:t}(t,n,s),{name:l,callback:u,baseClass:c}=a;let{type:h}=a,d=l,p=Kt.get(d),f=!0;for(;p;){const t=o(d,h,p);switch(t){case Jt.ignoreDuplicate:return;case Jt.definitionCallbackOnly:f=!1,p=void 0;break;default:d=t,p=Kt.get(d)}}f&&((te.has(h)||h===Ot)&&(h=class extends h{}),Kt.set(d,h),te.set(h,d),c&&te.set(c,d)),r.push(new ne(e,d,h,i,u,f))}};this.designTokensInitialized||(this.designTokensInitialized=!0,null!==this.designTokenRoot&&Xt.registerRoot(this.designTokenRoot)),e.registerWithContext(n,...t);for(const t of r)t.callback(t),t.willDefine&&null!==t.definition&&t.definition.define();return this}}class ne{constructor(t,e,r,o,i,n){this.container=t,this.name=e,this.type=r,this.shadowRootMode=o,this.callback=i,this.willDefine=n,this.definition=null}definePresentation(t){St.define(this.name,t,this.container)}defineElement(t){this.definition=new B(this.type,Object.assign(Object.assign({},t),{name:this.name}))}tagFor(t){return oe.tagFor(t)}}class se extends Ot{constructor(){super(...arguments),this.percentComplete=0}valueChanged(){this.$fastController.isConnected&&this.updatePercentComplete()}minChanged(){this.$fastController.isConnected&&this.updatePercentComplete()}maxChanged(){this.$fastController.isConnected&&this.updatePercentComplete()}connectedCallback(){super.connectedCallback(),this.updatePercentComplete()}updatePercentComplete(){const t="number"==typeof this.min?this.min:0,e="number"==typeof this.max?this.max:100,r="number"==typeof this.value?this.value:0,o=e-t;this.percentComplete=0===o?0:Math.fround((r-t)/o*100)}}E([P({converter:R})],se.prototype,"value",void 0),E([P({converter:R})],se.prototype,"min",void 0),E([P({converter:R})],se.prototype,"max",void 0),E([P({mode:"boolean"})],se.prototype,"paused",void 0),E([g],se.prototype,"percentComplete",void 0);class ae{constructor(){this.targetIndex=0}}class le extends ae{constructor(){super(...arguments),this.createPlaceholder=h.createInterpolationPlaceholder}}class ue extends ae{constructor(t,e,r){super(),this.name=t,this.behavior=e,this.options=r}createPlaceholder(t){return h.createCustomAttributePlaceholder(this.name,t)}createBehavior(t){return new this.behavior(t,this.options)}}function ce(t,e){this.source=t,this.context=e,null===this.bindingObserver&&(this.bindingObserver=f.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(t,e))}function he(t,e){this.source=t,this.context=e,this.target.addEventListener(this.targetName,this)}function de(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function pe(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const t=this.target.$fastView;void 0!==t&&t.isComposed&&(t.unbind(),t.needsBindOnly=!0)}function fe(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function ge(t){h.setAttribute(this.target,this.targetName,t)}function ve(t){h.setBooleanAttribute(this.target,this.targetName,t)}function ye(t){if(null==t&&(t=""),t.create){this.target.textContent="";let e=this.target.$fastView;void 0===e?e=t.create():this.target.$fastTemplate!==t&&(e.isComposed&&(e.remove(),e.unbind()),e=t.create()),e.isComposed?e.needsBindOnly&&(e.needsBindOnly=!1,e.bind(this.source,this.context)):(e.isComposed=!0,e.bind(this.source,this.context),e.insertBefore(this.target),this.target.$fastView=e,this.target.$fastTemplate=t)}else{const e=this.target.$fastView;void 0!==e&&e.isComposed&&(e.isComposed=!1,e.remove(),e.needsBindOnly?e.needsBindOnly=!1:e.unbind()),this.target.textContent=t}}function be(t){this.target[this.targetName]=t}function me(t){const e=this.classVersions||Object.create(null),r=this.target;let o=this.version||0;if(null!=t&&t.length){const i=t.split(/\s+/);for(let t=0,n=i.length;t<n;++t){const n=i[t];""!==n&&(e[n]=o,r.classList.add(n))}}if(this.classVersions=e,this.version=o+1,0!==o){o-=1;for(const t in e)e[t]===o&&r.classList.remove(t)}}class we extends le{constructor(t){super(),this.binding=t,this.bind=ce,this.unbind=de,this.updateTarget=ge,this.isBindingVolatile=f.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(t){if(this.originalTargetName=t,void 0!==t)switch(t[0]){case":":if(this.cleanedTargetName=t.substr(1),this.updateTarget=be,"innerHTML"===this.cleanedTargetName){const t=this.binding;this.binding=(e,r)=>h.createHTML(t(e,r))}break;case"?":this.cleanedTargetName=t.substr(1),this.updateTarget=ve;break;case"@":this.cleanedTargetName=t.substr(1),this.bind=he,this.unbind=fe;break;default:this.cleanedTargetName=t,"class"===t&&(this.updateTarget=me)}}targetAtContent(){this.updateTarget=ye,this.unbind=pe}createBehavior(t){return new $e(t,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class $e{constructor(t,e,r,o,i,n,s){this.source=null,this.context=null,this.bindingObserver=null,this.target=t,this.binding=e,this.isBindingVolatile=r,this.bind=o,this.unbind=i,this.updateTarget=n,this.targetName=s}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(t){y.setEvent(t);const e=this.binding(this.source,this.context);y.setEvent(null),!0!==e&&t.preventDefault()}}let xe=null;class Ce{addFactory(t){t.targetIndex=this.targetIndex,this.behaviorFactories.push(t)}captureContentBinding(t){t.targetAtContent(),this.addFactory(t)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){xe=this}static borrow(t){const e=xe||new Ce;return e.directives=t,e.reset(),xe=null,e}}function Fe(t){if(1===t.length)return t[0];let e;const r=t.length,o=t.map((t=>"string"==typeof t?()=>t:(e=t.targetName||e,t.binding))),i=new we(((t,e)=>{let i="";for(let n=0;n<r;++n)i+=o[n](t,e);return i}));return i.targetName=e,i}const ke=c.length;function Ve(t,e){const r=e.split(u);if(1===r.length)return null;const o=[];for(let e=0,i=r.length;e<i;++e){const i=r[e],n=i.indexOf(c);let s;if(-1===n)s=i;else{const e=parseInt(i.substring(0,n));o.push(t.directives[e]),s=i.substring(n+ke)}""!==s&&o.push(s)}return o}function De(t,e,r=!1){const o=e.attributes;for(let i=0,n=o.length;i<n;++i){const s=o[i],a=s.value,l=Ve(t,a);let u=null;null===l?r&&(u=new we((()=>a)),u.targetName=s.name):u=Fe(l),null!==u&&(e.removeAttributeNode(s),i--,n--,t.addFactory(u))}}function Se(t,e,r){const o=Ve(t,e.textContent);if(null!==o){let i=e;for(let n=0,s=o.length;n<s;++n){const s=o[n],a=0===n?e:i.parentNode.insertBefore(document.createTextNode(""),i.nextSibling);"string"==typeof s?a.textContent=s:(a.textContent=" ",t.captureContentBinding(s)),i=a,t.targetIndex++,a!==e&&r.nextNode()}t.targetIndex--}}const Te=document.createRange();class Oe{constructor(t,e){this.fragment=t,this.behaviors=e,this.source=null,this.context=null,this.firstChild=t.firstChild,this.lastChild=t.lastChild}appendTo(t){t.appendChild(this.fragment)}insertBefore(t){if(this.fragment.hasChildNodes())t.parentNode.insertBefore(this.fragment,t);else{const e=this.lastChild;if(t.previousSibling===e)return;const r=t.parentNode;let o,i=this.firstChild;for(;i!==e;)o=i.nextSibling,r.insertBefore(i,t),i=o;r.insertBefore(e,t)}}remove(){const t=this.fragment,e=this.lastChild;let r,o=this.firstChild;for(;o!==e;)r=o.nextSibling,t.appendChild(o),o=r;t.appendChild(e)}dispose(){const t=this.firstChild.parentNode,e=this.lastChild;let r,o=this.firstChild;for(;o!==e;)r=o.nextSibling,t.removeChild(o),o=r;t.removeChild(e);const i=this.behaviors,n=this.source;for(let t=0,e=i.length;t<e;++t)i[t].unbind(n)}bind(t,e){const r=this.behaviors;if(this.source!==t)if(null!==this.source){const o=this.source;this.source=t,this.context=e;for(let i=0,n=r.length;i<n;++i){const n=r[i];n.unbind(o),n.bind(t,e)}}else{this.source=t,this.context=e;for(let o=0,i=r.length;o<i;++o)r[o].bind(t,e)}}unbind(){if(null===this.source)return;const t=this.behaviors,e=this.source;for(let r=0,o=t.length;r<o;++r)t[r].unbind(e);this.source=null}static disposeContiguousBatch(t){if(0!==t.length){Te.setStartBefore(t[0].firstChild),Te.setEndAfter(t[t.length-1].lastChild),Te.deleteContents();for(let e=0,r=t.length;e<r;++e){const r=t[e],o=r.behaviors,i=r.source;for(let t=0,e=o.length;t<e;++t)o[t].unbind(i)}}}}class Re{constructor(t,e){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=t,this.directives=e}create(t){if(null===this.fragment){let t;const e=this.html;if("string"==typeof e){t=document.createElement("template"),t.innerHTML=h.createHTML(e);const r=t.content.firstElementChild;null!==r&&"TEMPLATE"===r.tagName&&(t=r)}else t=e;const r=function(t,e){const r=t.content;document.adoptNode(r);const o=Ce.borrow(e);De(o,t,!0);const i=o.behaviorFactories;o.reset();const n=h.createTemplateWalker(r);let s;for(;s=n.nextNode();)switch(o.targetIndex++,s.nodeType){case 1:De(o,s);break;case 3:Se(o,s,n);break;case 8:h.isMarker(s)&&o.addFactory(e[h.extractDirectiveIndexFromMarker(s)])}let a=0;(h.isMarker(r.firstChild)||1===r.childNodes.length&&e.length)&&(r.insertBefore(document.createComment(""),r.firstChild),a=-1);const l=o.behaviorFactories;return o.release(),{fragment:r,viewBehaviorFactories:l,hostBehaviorFactories:i,targetOffset:a}}(t,this.directives);this.fragment=r.fragment,this.viewBehaviorFactories=r.viewBehaviorFactories,this.hostBehaviorFactories=r.hostBehaviorFactories,this.targetOffset=r.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const e=this.fragment.cloneNode(!0),r=this.viewBehaviorFactories,o=new Array(this.behaviorCount),i=h.createTemplateWalker(e);let n=0,s=this.targetOffset,a=i.nextNode();for(let t=r.length;n<t;++n){const t=r[n],e=t.targetIndex;for(;null!==a;){if(s===e){o[n]=t.createBehavior(a);break}a=i.nextNode(),s++}}if(this.hasHostBehaviors){const e=this.hostBehaviorFactories;for(let r=0,i=e.length;r<i;++r,++n)o[n]=e[r].createBehavior(t)}return new Oe(e,o)}render(t,e,r){"string"==typeof e&&(e=document.getElementById(e)),void 0===r&&(r=e);const o=this.create(r);return o.bind(t,b),o.appendTo(e),o}}const Le=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function Pe(t,...e){const r=[];let o="";for(let i=0,n=t.length-1;i<n;++i){const n=t[i];let s=e[i];if(o+=n,s instanceof Re){const t=s;s=()=>t}if("function"==typeof s&&(s=new we(s)),s instanceof le){const t=Le.exec(n);null!==t&&(s.targetName=t[2])}s instanceof ae?(o+=s.createPlaceholder(r.length),r.push(s)):o+=s}return o+=t[t.length-1],new Re(o,r)}const Ie=t=>"function"==typeof t,Ne=()=>null;function Me(t){return void 0===t?Ne:Ie(t)?t:()=>t}function Be(t,e){const r=[];let o="";const i=[];for(let n=0,s=t.length-1;n<s;++n){o+=t[n];let s=e[n];if(s instanceof Pt){const t=s.createBehavior();s=s.createCSS(),t&&i.push(t)}s instanceof m||s instanceof CSSStyleSheet?(""!==o.trim()&&(r.push(o),o=""),r.push(s)):o+=s}return o+=t[t.length-1],""!==o.trim()&&r.push(o),{styles:r,behaviors:i}}function Ee(t,...e){const{styles:r,behaviors:o}=Be(t,e),i=m.create(r);return o.length&&i.withBehaviors(...o),i}class Ae extends Pt{constructor(t,e){super(),this.behaviors=e,this.css="";const r=t.reduce(((t,e)=>("string"==typeof e?this.css+=e:t.push(e),t)),[]);r.length&&(this.styles=m.create(r))}createBehavior(){return this}createCSS(){return this.css}bind(t){this.styles&&t.$fastController.addStyles(this.styles),this.behaviors.length&&t.$fastController.addBehaviors(this.behaviors)}unbind(t){this.styles&&t.$fastController.removeStyles(this.styles),this.behaviors.length&&t.$fastController.removeBehaviors(this.behaviors)}}function ze(t,...e){const{styles:r,behaviors:o}=Be(t,e);return new Ae(r,o)}var je,He;function _e(t){return`:host([hidden]){display:none}:host{display:${t}}`}(He=je||(je={})).Canvas="Canvas",He.CanvasText="CanvasText",He.LinkText="LinkText",He.VisitedText="VisitedText",He.ActiveText="ActiveText",He.ButtonFace="ButtonFace",He.ButtonText="ButtonText",He.Field="Field",He.FieldText="FieldText",He.Highlight="Highlight",He.HighlightText="HighlightText",He.GrayText="GrayText";class qe{constructor(t){this.listenerCache=new WeakMap,this.query=t}bind(t){const{query:e}=this,r=this.constructListener(t);r.bind(e)(),e.addListener(r),this.listenerCache.set(t,r)}unbind(t){const e=this.listenerCache.get(t);e&&(this.query.removeListener(e),this.listenerCache.delete(t))}}class Ue extends qe{constructor(t,e){super(t),this.styles=e}static with(t){return e=>new Ue(t,e)}constructListener(t){let e=!1;const r=this.styles;return function(){const{matches:o}=this;o&&!e?(t.$fastController.addStyles(r),e=o):!o&&e&&(t.$fastController.removeStyles(r),e=o)}}unbind(t){super.unbind(t),t.$fastController.removeStyles(this.styles)}}const Ge=Ue.with(window.matchMedia("(forced-colors)"));var We,Ye;function Ze(t,e,r){return isNaN(t)||t<=e?e:t>=r?r:t}function Qe(t,e,r){return isNaN(t)||t<=e?0:t>=r?1:t/(r-e)}function Xe(t,e,r){return isNaN(t)?e:e+t*(r-e)}function Je(t,e,r){return isNaN(t)||t<=0?e:t>=1?r:e+t*(r-e)}function Ke(t,e){const r=Math.pow(10,e);return Math.round(t*r)/r}Ue.with(window.matchMedia("(prefers-color-scheme: dark)")),Ue.with(window.matchMedia("(prefers-color-scheme: light)")),function(t){t.ltr="ltr",t.rtl="rtl"}(We||(We={})),Math.PI;class tr{constructor(t,e,r){this.h=t,this.s=e,this.l=r}static fromObject(t){return!t||isNaN(t.h)||isNaN(t.s)||isNaN(t.l)?null:new tr(t.h,t.s,t.l)}equalValue(t){return this.h===t.h&&this.s===t.s&&this.l===t.l}roundToPrecision(t){return new tr(Ke(this.h,t),Ke(this.s,t),Ke(this.l,t))}toObject(){return{h:this.h,s:this.s,l:this.l}}}class er{constructor(t,e,r){this.l=t,this.a=e,this.b=r}static fromObject(t){return!t||isNaN(t.l)||isNaN(t.a)||isNaN(t.b)?null:new er(t.l,t.a,t.b)}equalValue(t){return this.l===t.l&&this.a===t.a&&this.b===t.b}roundToPrecision(t){return new er(Ke(this.l,t),Ke(this.a,t),Ke(this.b,t))}toObject(){return{l:this.l,a:this.a,b:this.b}}}er.epsilon=216/24389,er.kappa=24389/27;class rr{constructor(t,e,r,o){this.r=t,this.g=e,this.b=r,this.a="number"!=typeof o||isNaN(o)?1:o}static fromObject(t){return!t||isNaN(t.r)||isNaN(t.g)||isNaN(t.b)?null:new rr(t.r,t.g,t.b,t.a)}equalValue(t){return this.r===t.r&&this.g===t.g&&this.b===t.b&&this.a===t.a}toStringHexRGB(){return"#"+[this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringHexRGBA(){return this.toStringHexRGB()+this.formatHexValue(this.a)}toStringHexARGB(){return"#"+[this.a,this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringWebRGB(){return`rgb(${Math.round(Xe(this.r,0,255))},${Math.round(Xe(this.g,0,255))},${Math.round(Xe(this.b,0,255))})`}toStringWebRGBA(){return`rgba(${Math.round(Xe(this.r,0,255))},${Math.round(Xe(this.g,0,255))},${Math.round(Xe(this.b,0,255))},${Ze(this.a,0,1)})`}roundToPrecision(t){return new rr(Ke(this.r,t),Ke(this.g,t),Ke(this.b,t),Ke(this.a,t))}clamp(){return new rr(Ze(this.r,0,1),Ze(this.g,0,1),Ze(this.b,0,1),Ze(this.a,0,1))}toObject(){return{r:this.r,g:this.g,b:this.b,a:this.a}}formatHexValue(t){return function(t){const e=Math.round(Ze(t,0,255)).toString(16);return 1===e.length?"0"+e:e}(Xe(t,0,255))}}class or{constructor(t,e,r){this.x=t,this.y=e,this.z=r}static fromObject(t){return!t||isNaN(t.x)||isNaN(t.y)||isNaN(t.z)?null:new or(t.x,t.y,t.z)}equalValue(t){return this.x===t.x&&this.y===t.y&&this.z===t.z}roundToPrecision(t){return new or(Ke(this.x,t),Ke(this.y,t),Ke(this.z,t))}toObject(){return{x:this.x,y:this.y,z:this.z}}}function ir(t){function e(t){return t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)}return function(t){return.2126*t.r+.7152*t.g+.0722*t.b}(new rr(e(t.r),e(t.g),e(t.b),1))}function nr(t,e,r){return r-e===0?0:(t-e)/(r-e)}function sr(t,e,r){return(nr(t.r,e.r,r.r)+nr(t.g,e.g,r.g)+nr(t.b,e.b,r.b))/3}function ar(t){const e=Math.max(t.r,t.g,t.b),r=Math.min(t.r,t.g,t.b),o=e-r;let i=0;0!==o&&(i=e===t.r?(t.g-t.b)/o%6*60:e===t.g?60*((t.b-t.r)/o+2):60*((t.r-t.g)/o+4)),i<0&&(i+=360);const n=(e+r)/2;let s=0;return 0!==o&&(s=o/(1-Math.abs(2*n-1))),new tr(i,s,n)}function lr(t,e=1){return function(t,e=1){function r(t){return t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055}const o=r(3.2404542*t.x-1.5371385*t.y-.4985314*t.z),i=r(-.969266*t.x+1.8760108*t.y+.041556*t.z),n=r(.0556434*t.x-.2040259*t.y+1.0572252*t.z);return new rr(o,i,n,e)}(function(t){const e=(t.l+16)/116,r=e+t.a/500,o=e-t.b/200,i=Math.pow(r,3),n=Math.pow(e,3),s=Math.pow(o,3);let a=0;a=i>er.epsilon?i:(116*r-16)/er.kappa;let l=0;l=t.l>er.epsilon*er.kappa?n:t.l/er.kappa;let u=0;return u=s>er.epsilon?s:(116*o-16)/er.kappa,a=or.whitePoint.x*a,l=or.whitePoint.y*l,u=or.whitePoint.z*u,new or(a,l,u)}(t),e)}function ur(t,e,r){return isNaN(t)||t<=0?e:t>=1?r:new rr(Je(t,e.r,r.r),Je(t,e.g,r.g),Je(t,e.b,r.b),Je(t,e.a,r.a))}function cr(t,e){const r=t.relativeLuminance>e.relativeLuminance?t:e,o=t.relativeLuminance>e.relativeLuminance?e:t;return(r.relativeLuminance+.05)/(o.relativeLuminance+.05)}or.whitePoint=new or(.95047,1,1.08883),function(t){t[t.RGB=0]="RGB",t[t.HSL=1]="HSL",t[t.HSV=2]="HSV",t[t.XYZ=3]="XYZ",t[t.LAB=4]="LAB",t[t.LCH=5]="LCH"}(Ye||(Ye={}));const hr=Object.freeze({create:(t,e,r)=>new dr(t,e,r),from:t=>new dr(t.r,t.g,t.b)});class dr extends rr{constructor(t,e,r){super(t,e,r,1),this.toColorString=this.toStringHexRGB,this.contrast=cr.bind(null,this),this.createCSS=this.toColorString,this.relativeLuminance=ir(this)}static fromObject(t){return new dr(t.r,t.g,t.b)}}function pr(t,e,r=0,o=t.length-1){if(o===r)return t[r];const i=Math.floor((o-r)/2)+r;return e(t[i])?pr(t,e,r,i):pr(t,e,i+1,o)}const fr=(-.1+Math.sqrt(.21))/2;function gr(t){return t.relativeLuminance<=fr}function vr(t){return gr(t)?-1:1}const yr={stepContrast:1.03,stepContrastRamp:.03,preserveSource:!1},br=Object.freeze({create:function(t,e,r){return"number"==typeof t?br.from(hr.create(t,e,r)):br.from(t)},from:function(t,e){return function(t){const e={r:0,g:0,b:0,toColorString:()=>"",contrast:()=>0,relativeLuminance:0};for(const r in e)if(typeof e[r]!=typeof t[r])return!1;return!0}(t)?mr.from(t,e):mr.from(hr.create(t.r,t.g,t.b),e)}});class mr{constructor(t,e){this.closestIndexCache=new Map,this.source=t,this.swatches=e,this.reversedSwatches=Object.freeze([...this.swatches].reverse()),this.lastIndex=this.swatches.length-1}colorContrast(t,e,r,o){void 0===r&&(r=this.closestIndexOf(t));let i=this.swatches;const n=this.lastIndex;let s=r;return void 0===o&&(o=vr(t)),-1===o&&(i=this.reversedSwatches,s=n-s),pr(i,(r=>cr(t,r)>=e),s,n)}get(t){return this.swatches[t]||this.swatches[Ze(t,0,this.lastIndex)]}closestIndexOf(t){if(this.closestIndexCache.has(t.relativeLuminance))return this.closestIndexCache.get(t.relativeLuminance);let e=this.swatches.indexOf(t);if(-1!==e)return this.closestIndexCache.set(t.relativeLuminance,e),e;const r=this.swatches.reduce(((e,r)=>Math.abs(r.relativeLuminance-t.relativeLuminance)<Math.abs(e.relativeLuminance-t.relativeLuminance)?r:e));return e=this.swatches.indexOf(r),this.closestIndexCache.set(t.relativeLuminance,e),e}static saturationBump(t,e){const r=ar(t).s,o=ar(e);return o.s<r?function(t,e=1){const r=(1-Math.abs(2*t.l-1))*t.s,o=r*(1-Math.abs(t.h/60%2-1)),i=t.l-r/2;let n=0,s=0,a=0;return t.h<60?(n=r,s=o,a=0):t.h<120?(n=o,s=r,a=0):t.h<180?(n=0,s=r,a=o):t.h<240?(n=0,s=o,a=r):t.h<300?(n=o,s=0,a=r):t.h<360&&(n=r,s=0,a=o),new rr(n+i,s+i,a+i,e)}(new tr(o.h,r,o.l)):e}static ramp(t){const e=t/100;return e>.5?(e-.5)/.5:2*e}static createHighResolutionPalette(t){const e=[],r=function(t){function e(t){return t>er.epsilon?Math.pow(t,1/3):(er.kappa*t+16)/116}const r=e(t.x/or.whitePoint.x),o=e(t.y/or.whitePoint.y),i=e(t.z/or.whitePoint.z);return new er(116*o-16,500*(r-o),200*(o-i))}(function(t){function e(t){return t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}const r=e(t.r),o=e(t.g),i=e(t.b);return new or(.4124564*r+.3575761*o+.1804375*i,.2126729*r+.7151522*o+.072175*i,.0193339*r+.119192*o+.9503041*i)}(rr.fromObject(t).roundToPrecision(4))),o=lr(new er(0,r.a,r.b)).clamp().roundToPrecision(4),i=lr(new er(50,r.a,r.b)).clamp().roundToPrecision(4),n=lr(new er(100,r.a,r.b)).clamp().roundToPrecision(4),s=new rr(0,0,0),a=new rr(1,1,1),l=n.equalValue(a)?0:14,u=o.equalValue(s)?0:14;for(let t=100+l;t>=0-u;t-=.5){let r;r=t<0?ur(t/u+1,s,o):t<=50?ur(mr.ramp(t),o,i):t<=100?ur(mr.ramp(t),i,n):ur((t-100)/l,n,a),r=mr.saturationBump(i,r).roundToPrecision(4),e.push(hr.from(r))}return new mr(t,e)}static adjustEnd(t,e,r,o){const i=-1===o?e.swatches:e.reversedSwatches,n=t=>{const r=e.closestIndexOf(t);return 1===o?e.lastIndex-r:r};1===o&&r.reverse();const s=t(r[r.length-2]);if(Ke(cr(r[r.length-1],r[r.length-2]),2)<s){r.pop();const t=n(e.colorContrast(i[e.lastIndex],s,void 0,o))-n(r[r.length-2]);let a=1;for(let o=r.length-t-1;o<r.length;o++){const t=n(r[o]),s=o===r.length-1?e.lastIndex:t+a;r[o]=i[s],a++}}1===o&&r.reverse()}static createColorPaletteByContrast(t,e){const r=mr.createHighResolutionPalette(t),o=t=>Ke(e.stepContrast+e.stepContrast*(1-t.relativeLuminance)*e.stepContrastRamp,2),i=[];let n=e.preserveSource?t:r.swatches[0];i.push(n);do{const t=o(n);n=r.colorContrast(n,t,void 0,1),i.push(n)}while(n.relativeLuminance>0);if(e.preserveSource){n=t;do{const t=o(n);n=r.colorContrast(n,t,void 0,-1),i.unshift(n)}while(n.relativeLuminance<1)}return this.adjustEnd(o,r,i,-1),e.preserveSource&&this.adjustEnd(o,r,i,1),i}static from(t,e){const r=void 0===e?yr:Object.assign(Object.assign({},yr),e);return new mr(t,Object.freeze(mr.createColorPaletteByContrast(t,r)))}}const wr=/^#((?:[0-9a-f]{6}|[0-9a-f]{3}))$/i;function $r(t){const e=wr.exec(t);if(null===e)return null;let r=e[1];if(3===r.length){const t=r.charAt(0),e=r.charAt(1),o=r.charAt(2);r=t.concat(t,e,e,o,o)}const o=parseInt(r,16);return isNaN(o)?null:new rr(Qe((16711680&o)>>>16,0,255),Qe((65280&o)>>>8,0,255),Qe(255&o,0,255),1)}const xr=hr.create(1,1,1),Cr=hr.create(0,0,0),Fr=hr.create(.5,.5,.5),kr=$r("#0078D4"),Vr=hr.create(kr.r,kr.g,kr.b);function Dr(t,e,r,o,i){const n=t=>t.contrast(xr)>=i?xr:Cr,s=n(t),a=n(e);return{rest:s,hover:a,active:s.relativeLuminance===a.relativeLuminance?s:n(r),focus:n(o)}}var Sr;!function(t){t[t.Burn=0]="Burn",t[t.Color=1]="Color",t[t.Darken=2]="Darken",t[t.Dodge=3]="Dodge",t[t.Lighten=4]="Lighten",t[t.Multiply=5]="Multiply",t[t.Overlay=6]="Overlay",t[t.Screen=7]="Screen"}(Sr||(Sr={}));class Tr{constructor(t,e,r,o){this.toColorString=()=>this.cssGradient,this.contrast=cr.bind(null,this),this.createCSS=this.toColorString,this.color=new rr(t,e,r),this.cssGradient=o,this.relativeLuminance=ir(this.color),this.r=t,this.g=e,this.b=r}static fromObject(t,e){return new Tr(t.r,t.g,t.b,e)}}const Or=new rr(0,0,0),Rr=new rr(1,1,1);function Lr(t,e,r,o,i,n,s,a,l=10,u=!1){const c=t.closestIndexOf(e);function h(r){if(u){const o=t.closestIndexOf(e),i=t.get(o),n=r.relativeLuminance<e.relativeLuminance?Or:Rr,s=function(t,e,r=null){let o=0,i=r;return null!==i?o=sr(t,e,i):(i=new rr(0,0,0,1),o=sr(t,e,i),o<=0&&(i=new rr(1,1,1,1),o=sr(t,e,i))),o=Math.round(1e3*o)/1e3,new rr(i.r,i.g,i.b,o)}($r(r.toColorString()),$r(i.toColorString()),n).roundToPrecision(2),a=function(t,e){if(e.a>=1)return e;if(e.a<=0)return new rr(t.r,t.g,t.b,1);const r=e.a*e.r+(1-e.a)*t.r,o=e.a*e.g+(1-e.a)*t.g,i=e.a*e.b+(1-e.a)*t.b;return new rr(r,o,i,1)}($r(e.toColorString()),s);return hr.from(a)}return r}void 0===a&&(a=vr(e));const d=c+a*r,p=d+a*(o-r),f=d+a*(i-r),g=d+a*(n-r),v=-1===a?0:100-l,y=-1===a?l:100;function b(e,r){const o=t.get(e);if(r){const r=t.get(e+a*s),i=-1===a?r:o,n=-1===a?o:r,l=`linear-gradient(${h(i).toColorString()} ${v}%, ${h(n).toColorString()} ${y}%)`;return Tr.fromObject(i,l)}return h(o)}return{rest:b(d,!0),hover:b(p,!0),active:b(f,!1),focus:b(g,!0)}}function Pr(t,e,r,o,i,n,s,a){null==a&&(a=vr(e));const l=t.closestIndexOf(t.colorContrast(e,r));return{rest:t.get(l+a*o),hover:t.get(l+a*i),active:t.get(l+a*n),focus:t.get(l+a*s)}}function Ir(t,e,r,o,i,n,s){const a=t.closestIndexOf(e);return null==s&&(s=vr(e)),{rest:t.get(a+s*r),hover:t.get(a+s*o),active:t.get(a+s*i),focus:t.get(a+s*n)}}function Nr(t,e,r,o,i,n,s=void 0,a,l,u,c,h=void 0){return gr(e)?Ir(t,e,a,l,u,c,h):Ir(t,e,r,o,i,n,s)}var Mr;function Br(t,e){return t.closestIndexOf((r=e,hr.create(r,r,r)));var r}function Er(t,e,r){return t.get(Br(t,e)+-1*r)}!function(t){t[t.LightMode=.98]="LightMode",t[t.DarkMode=.15]="DarkMode"}(Mr||(Mr={}));const{create:Ar}=Xt;function zr(t){return Xt.create({name:t,cssCustomPropertyName:null})}const jr=Ar("direction").withDefault(We.ltr),Hr=Ar("disabled-opacity").withDefault(.3),_r=Ar("base-height-multiplier").withDefault(8),qr=Ar("base-horizontal-spacing-multiplier").withDefault(3),Ur=Ar("density").withDefault(0),Gr=Ar("design-unit").withDefault(4),Wr=Ar("control-corner-radius").withDefault(4),Yr=Ar("layer-corner-radius").withDefault(8),Zr=Ar("stroke-width").withDefault(1),Qr=Ar("focus-stroke-width").withDefault(2),Xr=Ar("body-font").withDefault('"Segoe UI Variable", "Segoe UI", sans-serif'),Jr=Ar("font-weight").withDefault(400);function Kr(t){return e=>{const r=t.getValueFor(e),o=Jr.getValueFor(e);if(r.endsWith("px")){const t=Number.parseFloat(r.replace("px",""));if(t<=12)return`"wght" ${o}, "opsz" 8`;if(t>24)return`"wght" ${o}, "opsz" 36`}return`"wght" ${o}, "opsz" 10.5`}}const to=Ar("type-ramp-base-font-size").withDefault("14px"),eo=Ar("type-ramp-base-line-height").withDefault("20px"),ro=Ar("type-ramp-base-font-variations").withDefault(Kr(to)),oo=Ar("type-ramp-minus-1-font-size").withDefault("12px"),io=Ar("type-ramp-minus-1-line-height").withDefault("16px"),no=Ar("type-ramp-minus-1-font-variations").withDefault(Kr(oo)),so=Ar("type-ramp-minus-2-font-size").withDefault("10px"),ao=Ar("type-ramp-minus-2-line-height").withDefault("14px"),lo=Ar("type-ramp-minus-2-font-variations").withDefault(Kr(so)),uo=Ar("type-ramp-plus-1-font-size").withDefault("16px"),co=Ar("type-ramp-plus-1-line-height").withDefault("22px"),ho=Ar("type-ramp-plus-1-font-variations").withDefault(Kr(uo)),po=Ar("type-ramp-plus-2-font-size").withDefault("20px"),fo=Ar("type-ramp-plus-2-line-height").withDefault("26px"),go=Ar("type-ramp-plus-2-font-variations").withDefault(Kr(po)),vo=Ar("type-ramp-plus-3-font-size").withDefault("24px"),yo=Ar("type-ramp-plus-3-line-height").withDefault("32px"),bo=Ar("type-ramp-plus-3-font-variations").withDefault(Kr(vo)),mo=Ar("type-ramp-plus-4-font-size").withDefault("28px"),wo=Ar("type-ramp-plus-4-line-height").withDefault("36px"),$o=Ar("type-ramp-plus-4-font-variations").withDefault(Kr(mo)),xo=Ar("type-ramp-plus-5-font-size").withDefault("32px"),Co=Ar("type-ramp-plus-5-line-height").withDefault("40px"),Fo=Ar("type-ramp-plus-5-font-variations").withDefault(Kr(xo)),ko=Ar("type-ramp-plus-6-font-size").withDefault("40px"),Vo=Ar("type-ramp-plus-6-line-height").withDefault("52px"),Do=Ar("type-ramp-plus-6-font-variations").withDefault(Kr(ko)),So=Ar("base-layer-luminance").withDefault(Mr.LightMode),To=zr("accent-fill-rest-delta").withDefault(0),Oo=zr("accent-fill-hover-delta").withDefault(-2),Ro=zr("accent-fill-active-delta").withDefault(-5),Lo=zr("accent-fill-focus-delta").withDefault(0),Po=zr("accent-foreground-rest-delta").withDefault(0),Io=zr("accent-foreground-hover-delta").withDefault(3),No=zr("accent-foreground-active-delta").withDefault(-8),Mo=zr("accent-foreground-focus-delta").withDefault(0),Bo=zr("neutral-fill-rest-delta").withDefault(-1),Eo=zr("neutral-fill-hover-delta").withDefault(1),Ao=zr("neutral-fill-active-delta").withDefault(0),zo=zr("neutral-fill-focus-delta").withDefault(0),jo=zr("neutral-fill-input-rest-delta").withDefault(-1),Ho=zr("neutral-fill-input-hover-delta").withDefault(1),_o=zr("neutral-fill-input-active-delta").withDefault(0),qo=zr("neutral-fill-input-focus-delta").withDefault(-2),Uo=zr("neutral-fill-input-alt-rest-delta").withDefault(2),Go=zr("neutral-fill-input-alt-hover-delta").withDefault(4),Wo=zr("neutral-fill-input-alt-active-delta").withDefault(6),Yo=zr("neutral-fill-input-alt-focus-delta").withDefault(2),Zo=zr("neutral-fill-layer-rest-delta").withDefault(-2),Qo=zr("neutral-fill-layer-hover-delta").withDefault(-3),Xo=zr("neutral-fill-layer-active-delta").withDefault(-3),Jo=zr("neutral-fill-layer-alt-rest-delta").withDefault(-1),Ko=zr("neutral-fill-secondary-rest-delta").withDefault(3),ti=zr("neutral-fill-secondary-hover-delta").withDefault(2),ei=zr("neutral-fill-secondary-active-delta").withDefault(1),ri=zr("neutral-fill-secondary-focus-delta").withDefault(3),oi=zr("neutral-fill-stealth-rest-delta").withDefault(0),ii=zr("neutral-fill-stealth-hover-delta").withDefault(3),ni=zr("neutral-fill-stealth-active-delta").withDefault(2),si=zr("neutral-fill-stealth-focus-delta").withDefault(0),ai=zr("neutral-fill-strong-rest-delta").withDefault(0),li=zr("neutral-fill-strong-hover-delta").withDefault(8),ui=zr("neutral-fill-strong-active-delta").withDefault(-5),ci=zr("neutral-fill-strong-focus-delta").withDefault(0),hi=zr("neutral-stroke-rest-delta").withDefault(8),di=zr("neutral-stroke-hover-delta").withDefault(12),pi=zr("neutral-stroke-active-delta").withDefault(6),fi=zr("neutral-stroke-focus-delta").withDefault(8),gi=zr("neutral-stroke-control-rest-delta").withDefault(3),vi=zr("neutral-stroke-control-hover-delta").withDefault(5),yi=zr("neutral-stroke-control-active-delta").withDefault(5),bi=zr("neutral-stroke-control-focus-delta").withDefault(5),mi=zr("neutral-stroke-divider-rest-delta").withDefault(4),wi=zr("neutral-stroke-layer-rest-delta").withDefault(3),$i=zr("neutral-stroke-layer-hover-delta").withDefault(3),xi=zr("neutral-stroke-layer-active-delta").withDefault(3),Ci=zr("neutral-stroke-strong-hover-delta").withDefault(0),Fi=zr("neutral-stroke-strong-active-delta").withDefault(0),ki=zr("neutral-stroke-strong-focus-delta").withDefault(0),Vi=Ar("neutral-base-color").withDefault(Fr),Di=zr("neutral-palette").withDefault((t=>br.from(Vi.getValueFor(t)))),Si=Ar("accent-base-color").withDefault(Vr),Ti=zr("accent-palette").withDefault((t=>br.from(Si.getValueFor(t)))),Oi=zr("neutral-layer-card-container-recipe").withDefault({evaluate:t=>Er(Di.getValueFor(t),So.getValueFor(t),Zo.getValueFor(t))}),Ri=(Ar("neutral-layer-card-container").withDefault((t=>Oi.getValueFor(t).evaluate(t))),zr("neutral-layer-floating-recipe").withDefault({evaluate:t=>function(t,e,r){return t.get(Br(t,e)+r)}(Di.getValueFor(t),So.getValueFor(t),Zo.getValueFor(t))})),Li=(Ar("neutral-layer-floating").withDefault((t=>Ri.getValueFor(t).evaluate(t))),zr("neutral-layer-1-recipe").withDefault({evaluate:t=>function(t,e){return t.get(Br(t,e))}(Di.getValueFor(t),So.getValueFor(t))})),Pi=Ar("neutral-layer-1").withDefault((t=>Li.getValueFor(t).evaluate(t))),Ii=zr("neutral-layer-2-recipe").withDefault({evaluate:t=>Er(Di.getValueFor(t),So.getValueFor(t),Zo.getValueFor(t))}),Ni=(Ar("neutral-layer-2").withDefault((t=>Ii.getValueFor(t).evaluate(t))),zr("neutral-layer-3-recipe").withDefault({evaluate:t=>function(t,e,r){return t.get(Br(t,e)+-1*r*2)}(Di.getValueFor(t),So.getValueFor(t),Zo.getValueFor(t))})),Mi=(Ar("neutral-layer-3").withDefault((t=>Ni.getValueFor(t).evaluate(t))),zr("neutral-layer-4-recipe").withDefault({evaluate:t=>function(t,e,r){return t.get(Br(t,e)+-1*r*3)}(Di.getValueFor(t),So.getValueFor(t),Zo.getValueFor(t))})),Bi=(Ar("neutral-layer-4").withDefault((t=>Mi.getValueFor(t).evaluate(t))),Ar("fill-color").withDefault((t=>Pi.getValueFor(t))));var Ei;!function(t){t[t.normal=4.5]="normal",t[t.large=3]="large"}(Ei||(Ei={}));const Ai=zr("accent-fill-recipe").withDefault({evaluate:(t,e)=>function(t,e,r,o,i,n,s,a,l,u,c,h,d){return gr(e)?Pr(t,e,8,u,c,h,d,void 0):Pr(t,e,5,o,i,n,s,void 0)}(Ti.getValueFor(t),e||Bi.getValueFor(t),0,To.getValueFor(t),Oo.getValueFor(t),Ro.getValueFor(t),Lo.getValueFor(t),0,0,To.getValueFor(t),Oo.getValueFor(t),Ro.getValueFor(t),Lo.getValueFor(t))}),zi=Ar("accent-fill-rest").withDefault((t=>Ai.getValueFor(t).evaluate(t).rest)),ji=Ar("accent-fill-hover").withDefault((t=>Ai.getValueFor(t).evaluate(t).hover)),Hi=Ar("accent-fill-active").withDefault((t=>Ai.getValueFor(t).evaluate(t).active)),_i=Ar("accent-fill-focus").withDefault((t=>Ai.getValueFor(t).evaluate(t).focus)),qi=zr("foreground-on-accent-recipe").withDefault({evaluate:t=>Dr(zi.getValueFor(t),ji.getValueFor(t),Hi.getValueFor(t),_i.getValueFor(t),Ei.normal)}),Ui=Ar("foreground-on-accent-rest").withDefault((t=>qi.getValueFor(t).evaluate(t).rest)),Gi=Ar("foreground-on-accent-hover").withDefault((t=>qi.getValueFor(t).evaluate(t).hover)),Wi=Ar("foreground-on-accent-active").withDefault((t=>qi.getValueFor(t).evaluate(t).active)),Yi=(Ar("foreground-on-accent-focus").withDefault((t=>qi.getValueFor(t).evaluate(t).focus)),zr("accent-foreground-recipe").withDefault({evaluate:(t,e)=>Pr(Ti.getValueFor(t),e||Bi.getValueFor(t),9.5,Po.getValueFor(t),Io.getValueFor(t),No.getValueFor(t),Mo.getValueFor(t))})),Zi=Ar("accent-foreground-rest").withDefault((t=>Yi.getValueFor(t).evaluate(t).rest)),Qi=Ar("accent-foreground-hover").withDefault((t=>Yi.getValueFor(t).evaluate(t).hover)),Xi=Ar("accent-foreground-active").withDefault((t=>Yi.getValueFor(t).evaluate(t).active)),Ji=(Ar("accent-foreground-focus").withDefault((t=>Yi.getValueFor(t).evaluate(t).focus)),zr("accent-stroke-control-recipe").withDefault({evaluate:(t,e)=>Lr(Di.getValueFor(t),e||Bi.getValueFor(t),-3,-3,-3,-3,10,1,void 0,!0)})),Ki=Ar("accent-stroke-control-rest").withDefault((t=>Ji.getValueFor(t).evaluate(t,zi.getValueFor(t)).rest)),tn=Ar("accent-stroke-control-hover").withDefault((t=>Ji.getValueFor(t).evaluate(t,ji.getValueFor(t)).hover)),en=Ar("accent-stroke-control-active").withDefault((t=>Ji.getValueFor(t).evaluate(t,Hi.getValueFor(t)).active)),rn=(Ar("accent-stroke-control-focus").withDefault((t=>Ji.getValueFor(t).evaluate(t,_i.getValueFor(t)).focus)),zr("neutral-fill-recipe").withDefault({evaluate:(t,e)=>Nr(Di.getValueFor(t),e||Bi.getValueFor(t),Bo.getValueFor(t),Eo.getValueFor(t),Ao.getValueFor(t),zo.getValueFor(t),void 0,2,3,1,2,void 0)})),on=Ar("neutral-fill-rest").withDefault((t=>rn.getValueFor(t).evaluate(t).rest)),nn=Ar("neutral-fill-hover").withDefault((t=>rn.getValueFor(t).evaluate(t).hover)),sn=Ar("neutral-fill-active").withDefault((t=>rn.getValueFor(t).evaluate(t).active)),an=(Ar("neutral-fill-focus").withDefault((t=>rn.getValueFor(t).evaluate(t).focus)),zr("neutral-fill-input-recipe").withDefault({evaluate:(t,e)=>Nr(Di.getValueFor(t),e||Bi.getValueFor(t),jo.getValueFor(t),Ho.getValueFor(t),_o.getValueFor(t),qo.getValueFor(t),void 0,2,3,1,0,void 0)})),ln=Ar("neutral-fill-input-rest").withDefault((t=>an.getValueFor(t).evaluate(t).rest)),un=Ar("neutral-fill-input-hover").withDefault((t=>an.getValueFor(t).evaluate(t).hover)),cn=(Ar("neutral-fill-input-active").withDefault((t=>an.getValueFor(t).evaluate(t).active)),Ar("neutral-fill-input-focus").withDefault((t=>an.getValueFor(t).evaluate(t).focus))),hn=zr("neutral-fill-input-alt-recipe").withDefault({evaluate:(t,e)=>Nr(Di.getValueFor(t),e||Bi.getValueFor(t),Uo.getValueFor(t),Go.getValueFor(t),Wo.getValueFor(t),Yo.getValueFor(t),1,Uo.getValueFor(t),Uo.getValueFor(t)-Go.getValueFor(t),Uo.getValueFor(t)-Wo.getValueFor(t),Yo.getValueFor(t),1)}),dn=(Ar("neutral-fill-input-alt-rest").withDefault((t=>hn.getValueFor(t).evaluate(t).rest)),Ar("neutral-fill-input-alt-hover").withDefault((t=>hn.getValueFor(t).evaluate(t).hover)),Ar("neutral-fill-input-alt-active").withDefault((t=>hn.getValueFor(t).evaluate(t).active)),Ar("neutral-fill-input-alt-focus").withDefault((t=>hn.getValueFor(t).evaluate(t).focus)),zr("neutral-fill-layer-recipe").withDefault({evaluate:(t,e)=>Ir(Di.getValueFor(t),e||Bi.getValueFor(t),Zo.getValueFor(t),Qo.getValueFor(t),Xo.getValueFor(t),Zo.getValueFor(t),1)})),pn=(Ar("neutral-fill-layer-rest").withDefault((t=>dn.getValueFor(t).evaluate(t).rest)),Ar("neutral-fill-layer-hover").withDefault((t=>dn.getValueFor(t).evaluate(t).hover)),Ar("neutral-fill-layer-active").withDefault((t=>dn.getValueFor(t).evaluate(t).active)),zr("neutral-fill-layer-alt-recipe").withDefault({evaluate:(t,e)=>Ir(Di.getValueFor(t),e||Bi.getValueFor(t),Jo.getValueFor(t),Jo.getValueFor(t),Jo.getValueFor(t),Jo.getValueFor(t))})),fn=(Ar("neutral-fill-layer-alt-rest").withDefault((t=>pn.getValueFor(t).evaluate(t).rest)),zr("neutral-fill-secondary-recipe").withDefault({evaluate:(t,e)=>Ir(Di.getValueFor(t),e||Bi.getValueFor(t),Ko.getValueFor(t),ti.getValueFor(t),ei.getValueFor(t),ri.getValueFor(t))})),gn=Ar("neutral-fill-secondary-rest").withDefault((t=>fn.getValueFor(t).evaluate(t).rest)),vn=Ar("neutral-fill-secondary-hover").withDefault((t=>fn.getValueFor(t).evaluate(t).hover)),yn=(Ar("neutral-fill-secondary-active").withDefault((t=>fn.getValueFor(t).evaluate(t).active)),Ar("neutral-fill-secondary-focus").withDefault((t=>fn.getValueFor(t).evaluate(t).focus))),bn=zr("neutral-fill-stealth-recipe").withDefault({evaluate:(t,e)=>Ir(Di.getValueFor(t),e||Bi.getValueFor(t),oi.getValueFor(t),ii.getValueFor(t),ni.getValueFor(t),si.getValueFor(t))}),mn=Ar("neutral-fill-stealth-rest").withDefault((t=>bn.getValueFor(t).evaluate(t).rest)),wn=Ar("neutral-fill-stealth-hover").withDefault((t=>bn.getValueFor(t).evaluate(t).hover)),$n=Ar("neutral-fill-stealth-active").withDefault((t=>bn.getValueFor(t).evaluate(t).active)),xn=(Ar("neutral-fill-stealth-focus").withDefault((t=>bn.getValueFor(t).evaluate(t).focus)),zr("neutral-fill-strong-recipe").withDefault({evaluate:(t,e)=>Pr(Di.getValueFor(t),e||Bi.getValueFor(t),4.5,ai.getValueFor(t),li.getValueFor(t),ui.getValueFor(t),ci.getValueFor(t))})),Cn=(Ar("neutral-fill-strong-rest").withDefault((t=>xn.getValueFor(t).evaluate(t).rest)),Ar("neutral-fill-strong-hover").withDefault((t=>xn.getValueFor(t).evaluate(t).hover)),Ar("neutral-fill-strong-active").withDefault((t=>xn.getValueFor(t).evaluate(t).active)),Ar("neutral-fill-strong-focus").withDefault((t=>xn.getValueFor(t).evaluate(t).focus)),zr("neutral-foreground-recipe").withDefault({evaluate:(t,e)=>Pr(Di.getValueFor(t),e||Bi.getValueFor(t),16,0,-19,-30,0)})),Fn=Ar("neutral-foreground-rest").withDefault((t=>Cn.getValueFor(t).evaluate(t).rest)),kn=(Ar("neutral-foreground-hover").withDefault((t=>Cn.getValueFor(t).evaluate(t).hover)),Ar("neutral-foreground-active").withDefault((t=>Cn.getValueFor(t).evaluate(t).active)),Ar("neutral-foreground-focus").withDefault((t=>Cn.getValueFor(t).evaluate(t).focus)),zr("neutral-foreground-hint-recipe").withDefault({evaluate:(t,e)=>function(t,e){return t.colorContrast(e,4.5)}(Di.getValueFor(t),e||Bi.getValueFor(t))})),Vn=Ar("neutral-foreground-hint").withDefault((t=>kn.getValueFor(t).evaluate(t))),Dn=zr("neutral-stroke-recipe").withDefault({evaluate:(t,e)=>Ir(Di.getValueFor(t),e||Bi.getValueFor(t),hi.getValueFor(t),di.getValueFor(t),pi.getValueFor(t),fi.getValueFor(t))}),Sn=Ar("neutral-stroke-rest").withDefault((t=>Dn.getValueFor(t).evaluate(t).rest)),Tn=Ar("neutral-stroke-hover").withDefault((t=>Dn.getValueFor(t).evaluate(t).hover)),On=Ar("neutral-stroke-active").withDefault((t=>Dn.getValueFor(t).evaluate(t).active)),Rn=(Ar("neutral-stroke-focus").withDefault((t=>Dn.getValueFor(t).evaluate(t).focus)),zr("neutral-stroke-control-recipe").withDefault({evaluate:(t,e)=>Lr(Di.getValueFor(t),e||Bi.getValueFor(t),gi.getValueFor(t),vi.getValueFor(t),yi.getValueFor(t),bi.getValueFor(t),5)})),Ln=Ar("neutral-stroke-control-rest").withDefault((t=>Rn.getValueFor(t).evaluate(t).rest)),Pn=Ar("neutral-stroke-control-hover").withDefault((t=>Rn.getValueFor(t).evaluate(t).hover)),In=Ar("neutral-stroke-control-active").withDefault((t=>Rn.getValueFor(t).evaluate(t).active)),Nn=(Ar("neutral-stroke-control-focus").withDefault((t=>Rn.getValueFor(t).evaluate(t).focus)),zr("neutral-stroke-divider-recipe").withDefault({evaluate:(t,e)=>function(t,e,r){return t.get(t.closestIndexOf(e)+vr(e)*r)}(Di.getValueFor(t),e||Bi.getValueFor(t),mi.getValueFor(t))})),Mn=(Ar("neutral-stroke-divider-rest").withDefault((t=>Nn.getValueFor(t).evaluate(t))),zr("neutral-stroke-input-recipe").withDefault({evaluate:(t,e)=>function(t,e,r,o,i,n,s,a){const l=t.closestIndexOf(e),u=vr(e),c=l+u*r,h=c+u*(o-r),d=c+u*(i-r),p=c+u*(n-r),f=`calc(100% - ${a})`;function g(e,r){const o=t.get(e);if(r){const r=t.get(e+20*u),i=`linear-gradient(${o.toColorString()} ${f}, ${r.toColorString()} ${f}, ${r.toColorString()})`;return Tr.fromObject(o,i)}return o}return{rest:g(c,!0),hover:g(h,!0),active:g(d,!1),focus:g(p,!0)}}(Di.getValueFor(t),e||Bi.getValueFor(t),gi.getValueFor(t),vi.getValueFor(t),yi.getValueFor(t),bi.getValueFor(t),0,Zr.getValueFor(t)+"px")})),Bn=Ar("neutral-stroke-input-rest").withDefault((t=>Mn.getValueFor(t).evaluate(t).rest)),En=Ar("neutral-stroke-input-hover").withDefault((t=>Mn.getValueFor(t).evaluate(t).hover)),An=(Ar("neutral-stroke-input-active").withDefault((t=>Mn.getValueFor(t).evaluate(t).active)),Ar("neutral-stroke-input-focus").withDefault((t=>Mn.getValueFor(t).evaluate(t).focus)),zr("neutral-stroke-layer-recipe").withDefault({evaluate:(t,e)=>Ir(Di.getValueFor(t),e||Bi.getValueFor(t),wi.getValueFor(t),$i.getValueFor(t),xi.getValueFor(t),wi.getValueFor(t))})),zn=(Ar("neutral-stroke-layer-rest").withDefault((t=>An.getValueFor(t).evaluate(t).rest)),Ar("neutral-stroke-layer-hover").withDefault((t=>An.getValueFor(t).evaluate(t).hover)),Ar("neutral-stroke-layer-active").withDefault((t=>An.getValueFor(t).evaluate(t).active)),zr("neutral-stroke-strong-recipe").withDefault({evaluate:(t,e)=>Pr(Di.getValueFor(t),e||Bi.getValueFor(t),5.5,0,Ci.getValueFor(t),Fi.getValueFor(t),ki.getValueFor(t))})),jn=(Ar("neutral-stroke-strong-rest").withDefault((t=>zn.getValueFor(t).evaluate(t).rest)),Ar("neutral-stroke-strong-hover").withDefault((t=>zn.getValueFor(t).evaluate(t).hover)),Ar("neutral-stroke-strong-active").withDefault((t=>zn.getValueFor(t).evaluate(t).active)),Ar("neutral-stroke-strong-focus").withDefault((t=>zn.getValueFor(t).evaluate(t).focus)),zr("focus-stroke-outer-recipe").withDefault({evaluate:t=>(Di.getValueFor(t),gr(Bi.getValueFor(t))?xr:Cr)})),Hn=Ar("focus-stroke-outer").withDefault((t=>jn.getValueFor(t).evaluate(t))),_n=zr("focus-stroke-inner-recipe").withDefault({evaluate:t=>{return Ti.getValueFor(t),e=Bi.getValueFor(t),Hn.getValueFor(t),gr(e)?Cr:xr;var e}}),qn=Ar("focus-stroke-inner").withDefault((t=>_n.getValueFor(t).evaluate(t))),Un=zr("foreground-on-accent-large-recipe").withDefault({evaluate:t=>Dr(zi.getValueFor(t),ji.getValueFor(t),Hi.getValueFor(t),_i.getValueFor(t),Ei.large)}),Gn=(Ar("foreground-on-accent-rest-large").withDefault((t=>Un.getValueFor(t).evaluate(t).rest)),Ar("foreground-on-accent-hover-large").withDefault((t=>Un.getValueFor(t).evaluate(t,ji.getValueFor(t)).hover)),Ar("foreground-on-accent-active-large").withDefault((t=>Un.getValueFor(t).evaluate(t,Hi.getValueFor(t)).active)),Ar("foreground-on-accent-focus-large").withDefault((t=>Un.getValueFor(t).evaluate(t,_i.getValueFor(t)).focus)),Ar("neutral-fill-inverse-rest-delta").withDefault(0)),Wn=Ar("neutral-fill-inverse-hover-delta").withDefault(-3),Yn=Ar("neutral-fill-inverse-active-delta").withDefault(7),Zn=Ar("neutral-fill-inverse-focus-delta").withDefault(0),Qn=zr("neutral-fill-inverse-recipe").withDefault({evaluate:(t,e)=>function(t,e,r,o,i,n){const s=vr(e),a=t.closestIndexOf(t.colorContrast(e,14)),l=a+s*Math.abs(r-o);let u,c;return(1===s?r<o:s*r>s*o)?(u=a,c=l):(u=l,c=a),{rest:t.get(u),hover:t.get(c),active:t.get(u+s*i),focus:t.get(u+s*n)}}(Di.getValueFor(t),e||Bi.getValueFor(t),Gn.getValueFor(t),Wn.getValueFor(t),Yn.getValueFor(t),Zn.getValueFor(t))}),Xn=(Ar("neutral-fill-inverse-rest").withDefault((t=>Qn.getValueFor(t).evaluate(t).rest)),Ar("neutral-fill-inverse-hover").withDefault((t=>Qn.getValueFor(t).evaluate(t).hover)),Ar("neutral-fill-inverse-active").withDefault((t=>Qn.getValueFor(t).evaluate(t).active)),Ar("neutral-fill-inverse-focus").withDefault((t=>Qn.getValueFor(t).evaluate(t).focus)),ze`(${_r} + ${Ur}) * ${Gr}`),Jn=class extends se{}.compose({baseName:"progress-ring",template:(t,e)=>Pe`
    <template
        role="progressbar"
        aria-valuenow="${t=>t.value}"
        aria-valuemin="${t=>t.min}"
        aria-valuemax="${t=>t.max}"
        class="${t=>t.paused?"paused":""}"
    >
        ${function(t,e,r){const o=Ie(t)?t:()=>t,i=Me(e),n=Me(r);return(t,e)=>o(t,e)?i(t,e):n(t,e)}((t=>"number"==typeof t.value),Pe`
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
                        style="stroke-dasharray: ${t=>44*t.percentComplete/100}px ${44}px"
                        cx="8px"
                        cy="8px"
                        r="7px"
                    ></circle>
                </svg>
            `,Pe`
                <slot name="indeterminate" slot="indeterminate">
                    ${e.indeterminateIndicator||""}
                </slot>
            `)}
    </template>
`,styles:(t,e)=>Ee`
    ${_e("flex")} :host {
      align-items: center;
      height: calc(${Xn} * 1px);
      width: calc(${Xn} * 1px);
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
      stroke: ${zi};
      fill: none;
      stroke-width: 2px;
      stroke-linecap: round;
      transform-origin: 50% 50%;
      transform: rotate(-90deg);
      transition: all 0.2s ease-in-out;
    }

    .indeterminate-indicator-1 {
      stroke: ${zi};
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
      stroke: ${Vn};
    }

    :host(.paused) .determinate {
      stroke: ${Vn};
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
  `.withBehaviors(Ge(Ee`
        .background {
          stroke: ${je.Field};
        }
        .determinate,
        .indeterminate-indicator-1 {
          stroke: ${je.ButtonText};
        }
        :host(.paused) .determinate,
        :host(.paused) .indeterminate-indicator-1 {
          stroke: ${je.GrayText};
        }
      `)),indeterminateIndicator:'\n    <svg class="progress" part="progress" viewBox="0 0 16 16">\n        <circle\n            class="background"\n            part="background"\n            cx="8px"\n            cy="8px"\n            r="7px"\n        ></circle>\n        <circle\n            class="indeterminate-indicator-1"\n            part="indeterminate-indicator-1"\n            cx="8px"\n            cy="8px"\n            r="7px"\n        ></circle>\n    </svg>\n  '});function Kn(t,e,r,o){var i,n=arguments.length,s=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,o);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(n<3?i(s):n>3?i(e,r,s):i(e,r))||s);return n>3&&s&&Object.defineProperty(e,r,s),s}Object.create,Object.create,"function"==typeof SuppressedError&&SuppressedError;class ts{}E([P({attribute:"aria-atomic"})],ts.prototype,"ariaAtomic",void 0),E([P({attribute:"aria-busy"})],ts.prototype,"ariaBusy",void 0),E([P({attribute:"aria-controls"})],ts.prototype,"ariaControls",void 0),E([P({attribute:"aria-current"})],ts.prototype,"ariaCurrent",void 0),E([P({attribute:"aria-describedby"})],ts.prototype,"ariaDescribedby",void 0),E([P({attribute:"aria-details"})],ts.prototype,"ariaDetails",void 0),E([P({attribute:"aria-disabled"})],ts.prototype,"ariaDisabled",void 0),E([P({attribute:"aria-errormessage"})],ts.prototype,"ariaErrormessage",void 0),E([P({attribute:"aria-flowto"})],ts.prototype,"ariaFlowto",void 0),E([P({attribute:"aria-haspopup"})],ts.prototype,"ariaHaspopup",void 0),E([P({attribute:"aria-hidden"})],ts.prototype,"ariaHidden",void 0),E([P({attribute:"aria-invalid"})],ts.prototype,"ariaInvalid",void 0),E([P({attribute:"aria-keyshortcuts"})],ts.prototype,"ariaKeyshortcuts",void 0),E([P({attribute:"aria-label"})],ts.prototype,"ariaLabel",void 0),E([P({attribute:"aria-labelledby"})],ts.prototype,"ariaLabelledby",void 0),E([P({attribute:"aria-live"})],ts.prototype,"ariaLive",void 0),E([P({attribute:"aria-owns"})],ts.prototype,"ariaOwns",void 0),E([P({attribute:"aria-relevant"})],ts.prototype,"ariaRelevant",void 0),E([P({attribute:"aria-roledescription"})],ts.prototype,"ariaRoledescription",void 0);class es{constructor(t,e){this.target=t,this.propertyName=e}bind(t){t[this.propertyName]=this.target}unbind(){}}function rs(t){return new ue("fast-ref",es,t)}class os{handleStartContentChange(){this.startContainer.classList.toggle("start",this.start.assignedNodes().length>0)}handleEndContentChange(){this.endContainer.classList.toggle("end",this.end.assignedNodes().length>0)}}const is=(t,e)=>Pe`
    <span
        part="end"
        ${rs("endContainer")}
        class=${t=>e.end?"end":void 0}
    >
        <slot name="end" ${rs("end")} @slotchange="${t=>t.handleEndContentChange()}">
            ${e.end||""}
        </slot>
    </span>
`,ns=(t,e)=>Pe`
    <span
        part="start"
        ${rs("startContainer")}
        class="${t=>e.start?"start":void 0}"
    >
        <slot
            name="start"
            ${rs("start")}
            @slotchange="${t=>t.handleStartContentChange()}"
        >
            ${e.start||""}
        </slot>
    </span>
`;function ss(t,...e){const r=T.locate(t);e.forEach((e=>{Object.getOwnPropertyNames(e.prototype).forEach((r=>{"constructor"!==r&&Object.defineProperty(t.prototype,r,Object.getOwnPropertyDescriptor(e.prototype,r))})),T.locate(e).forEach((t=>r.push(t)))}))}var as;Pe`
    <span part="end" ${rs("endContainer")}>
        <slot
            name="end"
            ${rs("end")}
            @slotchange="${t=>t.handleEndContentChange()}"
        ></slot>
    </span>
`,Pe`
    <span part="start" ${rs("startContainer")}>
        <slot
            name="start"
            ${rs("start")}
            @slotchange="${t=>t.handleStartContentChange()}"
        ></slot>
    </span>
`,function(t){t[t.alt=18]="alt",t[t.arrowDown=40]="arrowDown",t[t.arrowLeft=37]="arrowLeft",t[t.arrowRight=39]="arrowRight",t[t.arrowUp=38]="arrowUp",t[t.back=8]="back",t[t.backSlash=220]="backSlash",t[t.break=19]="break",t[t.capsLock=20]="capsLock",t[t.closeBracket=221]="closeBracket",t[t.colon=186]="colon",t[t.colon2=59]="colon2",t[t.comma=188]="comma",t[t.ctrl=17]="ctrl",t[t.delete=46]="delete",t[t.end=35]="end",t[t.enter=13]="enter",t[t.equals=187]="equals",t[t.equals2=61]="equals2",t[t.equals3=107]="equals3",t[t.escape=27]="escape",t[t.forwardSlash=191]="forwardSlash",t[t.function1=112]="function1",t[t.function10=121]="function10",t[t.function11=122]="function11",t[t.function12=123]="function12",t[t.function2=113]="function2",t[t.function3=114]="function3",t[t.function4=115]="function4",t[t.function5=116]="function5",t[t.function6=117]="function6",t[t.function7=118]="function7",t[t.function8=119]="function8",t[t.function9=120]="function9",t[t.home=36]="home",t[t.insert=45]="insert",t[t.menu=93]="menu",t[t.minus=189]="minus",t[t.minus2=109]="minus2",t[t.numLock=144]="numLock",t[t.numPad0=96]="numPad0",t[t.numPad1=97]="numPad1",t[t.numPad2=98]="numPad2",t[t.numPad3=99]="numPad3",t[t.numPad4=100]="numPad4",t[t.numPad5=101]="numPad5",t[t.numPad6=102]="numPad6",t[t.numPad7=103]="numPad7",t[t.numPad8=104]="numPad8",t[t.numPad9=105]="numPad9",t[t.numPadDivide=111]="numPadDivide",t[t.numPadDot=110]="numPadDot",t[t.numPadMinus=109]="numPadMinus",t[t.numPadMultiply=106]="numPadMultiply",t[t.numPadPlus=107]="numPadPlus",t[t.openBracket=219]="openBracket",t[t.pageDown=34]="pageDown",t[t.pageUp=33]="pageUp",t[t.period=190]="period",t[t.print=44]="print",t[t.quote=222]="quote",t[t.scrollLock=145]="scrollLock",t[t.shift=16]="shift",t[t.space=32]="space",t[t.tab=9]="tab",t[t.tilde=192]="tilde",t[t.windowsLeft=91]="windowsLeft",t[t.windowsOpera=219]="windowsOpera",t[t.windowsRight=92]="windowsRight"}(as||(as={}));const ls="form-associated-proxy",us="ElementInternals",cs=us in window&&"setFormValue"in window[us].prototype,hs=new WeakMap;function ds(t){const e=class extends t{constructor(...t){super(...t),this.dirtyValue=!1,this.disabled=!1,this.proxyEventsToBlock=["change","click"],this.proxyInitialized=!1,this.required=!1,this.initialValue=this.initialValue||"",this.elementInternals||(this.formResetCallback=this.formResetCallback.bind(this))}static get formAssociated(){return cs}get validity(){return this.elementInternals?this.elementInternals.validity:this.proxy.validity}get form(){return this.elementInternals?this.elementInternals.form:this.proxy.form}get validationMessage(){return this.elementInternals?this.elementInternals.validationMessage:this.proxy.validationMessage}get willValidate(){return this.elementInternals?this.elementInternals.willValidate:this.proxy.willValidate}get labels(){if(this.elementInternals)return Object.freeze(Array.from(this.elementInternals.labels));if(this.proxy instanceof HTMLElement&&this.proxy.ownerDocument&&this.id){const t=this.proxy.labels,e=Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)),r=t?e.concat(Array.from(t)):e;return Object.freeze(r)}return o}valueChanged(t,e){this.dirtyValue=!0,this.proxy instanceof HTMLElement&&(this.proxy.value=this.value),this.currentValue=this.value,this.setFormValue(this.value),this.validate()}currentValueChanged(){this.value=this.currentValue}initialValueChanged(t,e){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}disabledChanged(t,e){this.proxy instanceof HTMLElement&&(this.proxy.disabled=this.disabled),h.queueUpdate((()=>this.classList.toggle("disabled",this.disabled)))}nameChanged(t,e){this.proxy instanceof HTMLElement&&(this.proxy.name=this.name)}requiredChanged(t,e){this.proxy instanceof HTMLElement&&(this.proxy.required=this.required),h.queueUpdate((()=>this.classList.toggle("required",this.required))),this.validate()}get elementInternals(){if(!cs)return null;let t=hs.get(this);return t||(t=this.attachInternals(),hs.set(this,t)),t}connectedCallback(){super.connectedCallback(),this.addEventListener("keypress",this._keypressHandler),this.value||(this.value=this.initialValue,this.dirtyValue=!1),this.elementInternals||(this.attachProxy(),this.form&&this.form.addEventListener("reset",this.formResetCallback))}disconnectedCallback(){super.disconnectedCallback(),this.proxyEventsToBlock.forEach((t=>this.proxy.removeEventListener(t,this.stopPropagation))),!this.elementInternals&&this.form&&this.form.removeEventListener("reset",this.formResetCallback)}checkValidity(){return this.elementInternals?this.elementInternals.checkValidity():this.proxy.checkValidity()}reportValidity(){return this.elementInternals?this.elementInternals.reportValidity():this.proxy.reportValidity()}setValidity(t,e,r){this.elementInternals?this.elementInternals.setValidity(t,e,r):"string"==typeof e&&this.proxy.setCustomValidity(e)}formDisabledCallback(t){this.disabled=t}formResetCallback(){this.value=this.initialValue,this.dirtyValue=!1}attachProxy(){var t;this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.display="none",this.proxyEventsToBlock.forEach((t=>this.proxy.addEventListener(t,this.stopPropagation))),this.proxy.disabled=this.disabled,this.proxy.required=this.required,"string"==typeof this.name&&(this.proxy.name=this.name),"string"==typeof this.value&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",ls),this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",ls)),null===(t=this.shadowRoot)||void 0===t||t.appendChild(this.proxySlot),this.appendChild(this.proxy)}detachProxy(){var t;this.removeChild(this.proxy),null===(t=this.shadowRoot)||void 0===t||t.removeChild(this.proxySlot)}validate(t){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage,t)}setFormValue(t,e){this.elementInternals&&this.elementInternals.setFormValue(t,e||t)}_keypressHandler(t){if("Enter"===t.key&&this.form instanceof HTMLFormElement){const t=this.form.querySelector("[type=submit]");null==t||t.click()}}stopPropagation(t){t.stopPropagation()}};return P({mode:"boolean"})(e.prototype,"disabled"),P({mode:"fromView",attribute:"value"})(e.prototype,"initialValue"),P({attribute:"current-value"})(e.prototype,"currentValue"),P(e.prototype,"name"),P({mode:"boolean"})(e.prototype,"required"),g(e.prototype,"value"),e}class ps extends Ot{}class fs extends(ds(ps)){constructor(){super(...arguments),this.proxy=document.createElement("input")}}class gs extends fs{constructor(){super(...arguments),this.type="text"}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly,this.validate())}autofocusChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.autofocus=this.autofocus,this.validate())}placeholderChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.placeholder=this.placeholder)}typeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type,this.validate())}listChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.setAttribute("list",this.list),this.validate())}maxlengthChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.maxLength=this.maxlength,this.validate())}minlengthChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.minLength=this.minlength,this.validate())}patternChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.pattern=this.pattern,this.validate())}sizeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.size=this.size)}spellcheckChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.spellcheck=this.spellcheck)}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.validate(),this.autofocus&&h.queueUpdate((()=>{this.focus()}))}select(){this.control.select(),this.$emit("select")}handleTextInput(){this.value=this.control.value}handleChange(){this.$emit("change")}validate(){super.validate(this.control)}}E([P({attribute:"readonly",mode:"boolean"})],gs.prototype,"readOnly",void 0),E([P({mode:"boolean"})],gs.prototype,"autofocus",void 0),E([P],gs.prototype,"placeholder",void 0),E([P],gs.prototype,"type",void 0),E([P],gs.prototype,"list",void 0),E([P({converter:R})],gs.prototype,"maxlength",void 0),E([P({converter:R})],gs.prototype,"minlength",void 0),E([P],gs.prototype,"pattern",void 0),E([P({converter:R})],gs.prototype,"size",void 0),E([P({mode:"boolean"})],gs.prototype,"spellcheck",void 0),E([g],gs.prototype,"defaultSlottedNodes",void 0);class vs{}ss(vs,ts),ss(gs,os,vs);class ys{constructor(t,e){this.target=t,this.options=e,this.source=null}bind(t){const e=this.options.property;this.shouldUpdate=f.getAccessors(t).some((t=>t.name===e)),this.source=t,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(o),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let t=this.getNodes();return void 0!==this.options.filter&&(t=t.filter(this.options.filter)),t}updateTarget(t){this.source[this.options.property]=t}}class bs extends ys{constructor(t,e){super(t,e)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function ms(t){return"string"==typeof t&&(t={property:t}),new ue("fast-slotted",bs,t)}function ws(t,e,r){return t.nodeType!==Node.TEXT_NODE||"string"==typeof t.nodeValue&&!!t.nodeValue.trim().length}const $s="not-allowed",xs=ze`
  font-family: ${Xr};
  font-size: ${to};
  line-height: ${eo};
  font-weight: initial;
  font-variation-settings: ${ro};
`,Cs=(ze`
  font-family: ${Xr};
  font-size: ${oo};
  line-height: ${io};
  font-weight: initial;
  font-variation-settings: ${no};
`,ze`
  font-family: ${Xr};
  font-size: ${so};
  line-height: ${ao};
  font-weight: initial;
  font-variation-settings: ${lo};
`,ze`
  font-family: ${Xr};
  font-size: ${uo};
  line-height: ${co};
  font-weight: initial;
  font-variation-settings: ${ho};
`,ze`
  font-family: ${Xr};
  font-size: ${po};
  line-height: ${fo};
  font-weight: initial;
  font-variation-settings: ${go};
`,ze`
  font-family: ${Xr};
  font-size: ${vo};
  line-height: ${yo};
  font-weight: initial;
  font-variation-settings: ${bo};
`,ze`
  font-family: ${Xr};
  font-size: ${mo};
  line-height: ${wo};
  font-weight: initial;
  font-variation-settings: ${$o};
`,ze`
  font-family: ${Xr};
  font-size: ${xo};
  line-height: ${Co};
  font-weight: initial;
  font-variation-settings: ${Fo};
`,ze`
  font-family: ${Xr};
  font-size: ${ko};
  line-height: ${Vo};
  font-weight: initial;
  font-variation-settings: ${Do};
`,ze`
  outline: calc(${Qr} * 1px) solid ${Hn};
  outline-offset: calc(${Qr} * -1px);
`),Fs=(ze`
  outline: calc(${Qr} * 1px) solid ${Hn};
  outline-offset: calc(${Zr} * 1px);
`,Xt.create("input-placeholder-rest").withDefault((t=>{const e=an.getValueFor(t);return kn.getValueFor(t).evaluate(t,e.evaluate(t).rest)}))),ks=Xt.create("input-placeholder-hover").withDefault((t=>{const e=an.getValueFor(t);return kn.getValueFor(t).evaluate(t,e.evaluate(t).hover)})),Vs=Xt.create("input-filled-placeholder-rest").withDefault((t=>{const e=fn.getValueFor(t);return kn.getValueFor(t).evaluate(t,e.evaluate(t).rest)})),Ds=Xt.create("input-filled-placeholder-hover").withDefault((t=>{const e=fn.getValueFor(t);return kn.getValueFor(t).evaluate(t,e.evaluate(t).hover)}));class Ss{constructor(t,e,r){this.propertyName=t,this.value=e,this.styles=r}bind(t){f.getNotifier(t).subscribe(this,this.propertyName),this.handleChange(t,this.propertyName)}unbind(t){f.getNotifier(t).unsubscribe(this,this.propertyName),t.$fastController.removeStyles(this.styles)}handleChange(t,e){t[e]===this.value?t.$fastController.addStyles(this.styles):t.$fastController.removeStyles(this.styles)}}function Ts(t,e){return new Ss("appearance",t,e)}const Os=".root";class Rs extends gs{appearanceChanged(t,e){t!==e&&(this.classList.add(e),this.classList.remove(t))}connectedCallback(){super.connectedCallback(),this.appearance||(this.appearance="outline")}}Kn([P],Rs.prototype,"appearance",void 0);const Ls=Rs.compose({baseName:"text-field",baseClass:gs,template:(t,e)=>Pe`
    <template
        class="
            ${t=>t.readOnly?"readonly":""}
        "
    >
        <label
            part="label"
            for="control"
            class="${t=>t.defaultSlottedNodes&&t.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot
                ${ms({property:"defaultSlottedNodes",filter:ws})}
            ></slot>
        </label>
        <div class="root" part="root">
            ${ns(0,e)}
            <input
                class="control"
                part="control"
                id="control"
                @input="${t=>t.handleTextInput()}"
                @change="${t=>t.handleChange()}"
                ?autofocus="${t=>t.autofocus}"
                ?disabled="${t=>t.disabled}"
                list="${t=>t.list}"
                maxlength="${t=>t.maxlength}"
                minlength="${t=>t.minlength}"
                pattern="${t=>t.pattern}"
                placeholder="${t=>t.placeholder}"
                ?readonly="${t=>t.readOnly}"
                ?required="${t=>t.required}"
                size="${t=>t.size}"
                ?spellcheck="${t=>t.spellcheck}"
                :value="${t=>t.value}"
                type="${t=>t.type}"
                aria-atomic="${t=>t.ariaAtomic}"
                aria-busy="${t=>t.ariaBusy}"
                aria-controls="${t=>t.ariaControls}"
                aria-current="${t=>t.ariaCurrent}"
                aria-describedby="${t=>t.ariaDescribedby}"
                aria-details="${t=>t.ariaDetails}"
                aria-disabled="${t=>t.ariaDisabled}"
                aria-errormessage="${t=>t.ariaErrormessage}"
                aria-flowto="${t=>t.ariaFlowto}"
                aria-haspopup="${t=>t.ariaHaspopup}"
                aria-hidden="${t=>t.ariaHidden}"
                aria-invalid="${t=>t.ariaInvalid}"
                aria-keyshortcuts="${t=>t.ariaKeyshortcuts}"
                aria-label="${t=>t.ariaLabel}"
                aria-labelledby="${t=>t.ariaLabelledby}"
                aria-live="${t=>t.ariaLive}"
                aria-owns="${t=>t.ariaOwns}"
                aria-relevant="${t=>t.ariaRelevant}"
                aria-roledescription="${t=>t.ariaRoledescription}"
                ${rs("control")}
            />
            ${is(0,e)}
        </div>
    </template>
`,styles:(t,e)=>Ee`
    ${_e("inline-block")}

    ${((t,e,r)=>Ee`
  :host {
    ${xs}
    color: ${Fn};
    fill: currentcolor;
    user-select: none;
    position: relative;
  }

  ${r} {
    box-sizing: border-box;
    position: relative;
    color: inherit;
    border: calc(${Zr} * 1px) solid transparent;
    border-radius: calc(${Wr} * 1px);
    height: calc(${Xn} * 1px);
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
    color: ${Fn};
    cursor: pointer;
    ${xs}
    margin-bottom: 4px;
  }

  .label__hidden {
    display: none;
    visibility: hidden;
  }

  :host([disabled]) ${r},
  :host([readonly]) ${r},
  :host([disabled]) .label,
  :host([readonly]) .label,
  :host([disabled]) .control,
  :host([readonly]) .control {
    cursor: ${$s};
  }

  :host([disabled]) {
    opacity: ${Hr};
  }
`)(0,0,Os)}

    ${Ee`
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
      height: calc(${Qr} * 1px);
      bottom: 0;
      border-bottom: calc(${Qr} * 1px) solid ${zi};
      border-bottom-left-radius: calc(${Wr} * 1px);
      border-bottom-right-radius: calc(${Wr} * 1px);
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
      padding: 0 calc(${Gr} * 2px + 1px);
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
  `.withBehaviors(Ts("outline",((t,e,r,o=":not([disabled]):not(:focus-within)")=>Ee`
  ${r} {
    background: padding-box linear-gradient(${ln}, ${ln}),
      border-box ${Bn};
  }

  :host(${o}:hover) ${r} {
    background: padding-box linear-gradient(${un}, ${un}),
      border-box ${En};
  }

  :host(:not([disabled]):focus-within) ${r} {
    background: padding-box linear-gradient(${cn}, ${cn}),
      border-box ${Bn};
  }
  
  :host([disabled]) ${r} {
    background: padding-box linear-gradient(${ln}, ${ln}),
      border-box ${Sn};
  }

  .control::placeholder {
    color: ${Fs};
  }

  :host(${o}:hover) .control::placeholder {
    color: ${ks};
  }
`)(0,0,Os)),Ts("filled",((t,e,r,o=":not([disabled]):not(:focus-within)")=>Ee`
  ${r} {
    background: ${gn};
  }

  :host(${o}:hover) ${r} {
    background: ${vn};
  }

  :host(:not([disabled]):focus-within) ${r} {
    background: ${yn};
  }

  :host([disabled]) ${r} {
    background: ${gn};
  }

  .control::placeholder {
    color: ${Vs};
  }

  :host(${o}:hover) .control::placeholder {
    color: ${Ds};
  }
`)(0,0,Os)),Ge(((t,e,r,o=":not([disabled]):not(:focus-within)")=>Ee`
  :host {
    color: ${je.ButtonText};
  }

  ${r} {
    background: ${je.ButtonFace};
    border-color: ${je.ButtonText};
  }

  :host(${o}:hover) ${r},
  :host(:not([disabled]):focus-within) ${r} {
    border-color: ${je.Highlight};
  }

  :host([disabled]) ${r} {
    opacity: 1;
    background: ${je.ButtonFace};
    border-color: ${je.GrayText};
  }

  .control::placeholder,
  :host(${o}:hover) .control::placeholder {
    color: ${je.CanvasText};
  }

  :host(:not([disabled]):focus) ${r} {
    ${Cs}
    outline-color: ${je.Highlight};
  }

  :host([disabled]) {
    opacity: 1;
    color: ${je.GrayText};
  }

  :host([disabled]) ::placeholder,
  :host([disabled]) ::-webkit-input-placeholder {
    color: ${je.GrayText};
  }
`)(0,0,Os))),shadowOptions:{delegatesFocus:!0}});class Ps extends Ot{}class Is extends(ds(Ps)){constructor(){super(...arguments),this.proxy=document.createElement("input")}}class Ns extends Is{constructor(){super(...arguments),this.handleClick=t=>{var e;this.disabled&&(null===(e=this.defaultSlottedContent)||void 0===e?void 0:e.length)<=1&&t.stopPropagation()},this.handleSubmission=()=>{if(!this.form)return;const t=this.proxy.isConnected;t||this.attachProxy(),"function"==typeof this.form.requestSubmit?this.form.requestSubmit(this.proxy):this.proxy.click(),t||this.detachProxy()},this.handleFormReset=()=>{var t;null===(t=this.form)||void 0===t||t.reset()},this.handleUnsupportedDelegatesFocus=()=>{var t;window.ShadowRoot&&!window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus")&&(null===(t=this.$fastController.definition.shadowOptions)||void 0===t?void 0:t.delegatesFocus)&&(this.focus=()=>{this.control.focus()})}}formactionChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formAction=this.formaction)}formenctypeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formEnctype=this.formenctype)}formmethodChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formMethod=this.formmethod)}formnovalidateChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formNoValidate=this.formnovalidate)}formtargetChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formTarget=this.formtarget)}typeChanged(t,e){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type),"submit"===e&&this.addEventListener("click",this.handleSubmission),"submit"===t&&this.removeEventListener("click",this.handleSubmission),"reset"===e&&this.addEventListener("click",this.handleFormReset),"reset"===t&&this.removeEventListener("click",this.handleFormReset)}validate(){super.validate(this.control)}connectedCallback(){var t;super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.handleUnsupportedDelegatesFocus();const e=Array.from(null===(t=this.control)||void 0===t?void 0:t.children);e&&e.forEach((t=>{t.addEventListener("click",this.handleClick)}))}disconnectedCallback(){var t;super.disconnectedCallback();const e=Array.from(null===(t=this.control)||void 0===t?void 0:t.children);e&&e.forEach((t=>{t.removeEventListener("click",this.handleClick)}))}}E([P({mode:"boolean"})],Ns.prototype,"autofocus",void 0),E([P({attribute:"form"})],Ns.prototype,"formId",void 0),E([P],Ns.prototype,"formaction",void 0),E([P],Ns.prototype,"formenctype",void 0),E([P],Ns.prototype,"formmethod",void 0),E([P({mode:"boolean"})],Ns.prototype,"formnovalidate",void 0),E([P],Ns.prototype,"formtarget",void 0),E([P],Ns.prototype,"type",void 0),E([g],Ns.prototype,"defaultSlottedContent",void 0);class Ms{}let Bs;E([P({attribute:"aria-expanded"})],Ms.prototype,"ariaExpanded",void 0),E([P({attribute:"aria-pressed"})],Ms.prototype,"ariaPressed",void 0),ss(Ms,ts),ss(Ns,os,Ms);const Es=function(){if("boolean"==typeof Bs)return Bs;if("undefined"==typeof window||!window.document||!window.document.createElement)return Bs=!1,Bs;const t=document.createElement("style"),e=function(){const t=document.querySelector('meta[property="csp-nonce"]');return t?t.getAttribute("content"):null}();null!==e&&t.setAttribute("nonce",e),document.head.appendChild(t);try{t.sheet.insertRule("foo:focus-visible {color:inherit}",0),Bs=!0}catch(t){Bs=!1}finally{document.head.removeChild(t)}return Bs}()?"focus-visible":"focus",As=":not([disabled])",zs="[disabled]";class js extends Ns{appearanceChanged(t,e){t!==e&&(this.classList.add(e),this.classList.remove(t))}connectedCallback(){super.connectedCallback(),this.appearance||(this.appearance="neutral")}defaultSlottedContentChanged(){const t=this.defaultSlottedContent.filter((t=>t.nodeType===Node.ELEMENT_NODE));1===t.length&&t[0]instanceof SVGElement?this.control.classList.add("icon-only"):this.control.classList.remove("icon-only")}}Kn([P],js.prototype,"appearance",void 0);const Hs=js.compose({baseName:"button",baseClass:Ns,template:(t,e)=>Pe`
    <button
        class="control"
        part="control"
        ?autofocus="${t=>t.autofocus}"
        ?disabled="${t=>t.disabled}"
        form="${t=>t.formId}"
        formaction="${t=>t.formaction}"
        formenctype="${t=>t.formenctype}"
        formmethod="${t=>t.formmethod}"
        formnovalidate="${t=>t.formnovalidate}"
        formtarget="${t=>t.formtarget}"
        name="${t=>t.name}"
        type="${t=>t.type}"
        value="${t=>t.value}"
        aria-atomic="${t=>t.ariaAtomic}"
        aria-busy="${t=>t.ariaBusy}"
        aria-controls="${t=>t.ariaControls}"
        aria-current="${t=>t.ariaCurrent}"
        aria-describedby="${t=>t.ariaDescribedby}"
        aria-details="${t=>t.ariaDetails}"
        aria-disabled="${t=>t.ariaDisabled}"
        aria-errormessage="${t=>t.ariaErrormessage}"
        aria-expanded="${t=>t.ariaExpanded}"
        aria-flowto="${t=>t.ariaFlowto}"
        aria-haspopup="${t=>t.ariaHaspopup}"
        aria-hidden="${t=>t.ariaHidden}"
        aria-invalid="${t=>t.ariaInvalid}"
        aria-keyshortcuts="${t=>t.ariaKeyshortcuts}"
        aria-label="${t=>t.ariaLabel}"
        aria-labelledby="${t=>t.ariaLabelledby}"
        aria-live="${t=>t.ariaLive}"
        aria-owns="${t=>t.ariaOwns}"
        aria-pressed="${t=>t.ariaPressed}"
        aria-relevant="${t=>t.ariaRelevant}"
        aria-roledescription="${t=>t.ariaRoledescription}"
        ${rs("control")}
    >
        ${ns(0,e)}
        <span class="content" part="content">
            <slot ${ms("defaultSlottedContent")}></slot>
        </span>
        ${is(0,e)}
    </button>
`,styles:(t,e)=>Ee`
    :host(${As}) .control {
      cursor: pointer;
    }

    :host(${zs}) .control {
      cursor: ${$s};
    }

    @media (forced-colors: none) {
      :host(${zs}) .control {
        opacity: ${Hr};
      }
    }

    ${Ee`
    ${_e("inline-flex")}
    
    :host {
      position: relative;
      box-sizing: border-box;
      ${xs}
      height: calc(${Xn} * 1px);
      min-width: calc(${Xn} * 1px);
      color: ${Fn};
      border-radius: calc(${Wr} * 1px);
      fill: currentcolor;
    }

    .control {
      border: calc(${Zr} * 1px) solid transparent;
      flex-grow: 1;
      box-sizing: border-box;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0 calc((10 + (${Gr} * 2 * ${Ur})) * 1px);
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

    .control:${Es} {
      ${Cs}
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
  `.withBehaviors(Ts("neutral",((t,e,r,o="[disabled]")=>Ee`
    .control {
      background: padding-box linear-gradient(${on}, ${on}),
        border-box ${Ln};
    }

    :host(${r}:hover) .control {
      background: padding-box linear-gradient(${nn}, ${nn}),
        border-box ${Pn};
    }

    :host(${r}:active) .control {
      background: padding-box linear-gradient(${sn}, ${sn}),
        border-box ${In};
    }

    :host(${o}) .control {
      background: padding-box linear-gradient(${on}, ${on}),
        border-box ${Sn};
    }
  `.withBehaviors(Ge(Ee`
        .control {
          background: ${je.ButtonFace};
          border-color: ${je.ButtonText};
          color: ${je.ButtonText};
        }

        :host(${r}:hover) .control,
        :host(${r}:active) .control {
          forced-color-adjust: none;
          background: ${je.HighlightText};
          border-color: ${je.Highlight};
          color: ${je.Highlight};
        }

        :host(${o}) .control {
          background: transparent;
          border-color: ${je.GrayText};
          color: ${je.GrayText};
        }

        .control:${Es} {
          outline-color: ${je.CanvasText};
        }

        :host([href]) .control {
          background: transparent;
          border-color: ${je.LinkText};
          color: ${je.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          background: transparent;
          border-color: ${je.CanvasText};
          color: ${je.CanvasText};
        }
    `)))(0,0,As,zs)),Ts("accent",((t,e,r,o="[disabled]")=>Ee`
    .control {
      background: padding-box linear-gradient(${zi}, ${zi}),
        border-box ${Ki};
      color: ${Ui};
    }

    :host(${r}:hover) .control {
      background: padding-box linear-gradient(${ji}, ${ji}),
        border-box ${tn};
      color: ${Gi};
    }

    :host(${r}:active) .control {
      background: padding-box linear-gradient(${Hi}, ${Hi}),
        border-box ${en};
      color: ${Wi};
    }

    :host(${o}) .control {
      background: ${zi};
    }

    .control:${Es} {
      box-shadow: 0 0 0 calc(${Qr} * 1px) ${qn} inset !important;
    }
  `.withBehaviors(Ge(Ee`
        .control {
          forced-color-adjust: none;
          background: ${je.Highlight};
          color: ${je.HighlightText};
        }

        :host(${r}:hover) .control,
        :host(${r}:active) .control {
          background: ${je.HighlightText};
          border-color: ${je.Highlight};
          color: ${je.Highlight};
        }

        :host(${o}) .control {
          background: transparent;
          border-color: ${je.GrayText};
          color: ${je.GrayText};
        }

        .control:${Es} {
          outline-color: ${je.CanvasText};
          box-shadow: 0 0 0 calc(${Qr} * 1px) ${je.HighlightText} inset !important;
        }

        :host([href]) .control {
          background: ${je.LinkText};
          color: ${je.HighlightText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          background: ${je.ButtonFace};
          border-color: ${je.LinkText};
          color: ${je.LinkText};
        }
      `)))(0,0,As,zs)),Ts("lightweight",((t,e,r,o="[disabled]")=>Ee`
    :host {
      color: ${Zi};
    }

    .control {
      background: ${mn};
    }

    :host(${r}:hover) .control {
      background: ${wn};
      color: ${Qi};
    }

    :host(${r}:active) .control {
      background: ${$n};
      color: ${Xi};
    }

    :host(${o}) .control {
      background: ${mn};
    }
  `.withBehaviors(Ge(Ee`
        :host {
          color: ${je.ButtonText};
        }

        .control {
          forced-color-adjust: none;
          background: transparent;
        }

        :host(${r}:hover) .control,
        :host(${r}:active) .control {
          background: transparent;
          border-color: ${je.ButtonText};
          color: ${je.ButtonText};
        }

        :host(${o}) .control {
          background: transparent;
          color: ${je.GrayText};
        }

        .control:${Es} {
          outline-color: ${je.CanvasText};
        }

        :host([href]) .control {
          color: ${je.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          border-color: ${je.LinkText};
          color: ${je.LinkText};
        }
      `)))(0,0,As,zs)),Ts("outline",((t,e,r,o="[disabled]")=>Ee`
    .control {
      background: transparent !important;
      border-color: ${Sn};
    }

    :host(${r}:hover) .control {
      border-color: ${Tn};
    }

    :host(${r}:active) .control {
      border-color: ${On};
    }

    :host(${o}) .control {
      background: transparent !important;
      border-color: ${Sn};
    }
  `.withBehaviors(Ge(Ee`
        .control {
          border-color: ${je.ButtonText};
          color: ${je.ButtonText};
        }

        :host(${r}:hover) .control,
        :host(${r}:active) .control {
          background: ${je.HighlightText};
          border-color: ${je.Highlight};
          color: ${je.Highlight};
        }

        :host(${o}) .control {
          border-color: ${je.GrayText};
          color: ${je.GrayText};
        }

        .control:${Es} {
          outline-color: ${je.CanvasText};
        }

        :host([href]) .control {
          border-color: ${je.LinkText};
          color: ${je.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          border-color: ${je.CanvasText};
          color: ${je.CanvasText};
        }
      `)))(0,0,As,zs)),Ts("stealth",((t,e,r,o="[disabled]")=>Ee`
    .control {
      background: ${mn};
    }

    :host(${r}:hover) .control {
      background: ${wn};
    }

    :host(${r}:active) .control {
      background: ${$n};
    }

    :host(${o}) .control {
      background: ${mn};
    }
  `.withBehaviors(Ge(Ee`
        .control {
          forced-color-adjust: none;
          background: transparent;
          color: ${je.ButtonText};
        }

        :host(${r}:hover) .control,
        :host(${r}:active) .control {
          background: transparent;
          border-color: ${je.ButtonText};
          color: ${je.ButtonText};
        }

        :host(${o}) .control {
          background: transparent;
          color: ${je.GrayText};
        }
        
        .control:${Es} {
          outline-color: ${je.CanvasText};
        }

        :host([href]) .control {
          color: ${je.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          background: transparent;
          border-color: ${je.LinkText};
          color: ${je.LinkText};
        }
      `)))(0,0,As,zs))),shadowOptions:{delegatesFocus:!0}}),_s={toView:t=>null==t?null:null==t?void 0:t.toColorString(),fromView(t){if(null==t)return null;const e=$r(t);return e?hr.create(e.r,e.g,e.b):null}},qs=Ee`
  :host {
    background-color: ${Bi};
    color: ${Fn};
  }
`.withBehaviors(Ge(Ee`
      :host {
        background-color: ${je.Canvas};
        box-shadow: 0 0 0 1px ${je.CanvasText};
        color: ${je.CanvasText};
      }
    `));function Us(t){return(e,r)=>{e[r+"Changed"]=function(e,r){null!=r?t.setValueFor(this,r):t.deleteValueFor(this)}}}class Gs extends Ot{constructor(){super(),this.noPaint=!1;const t={handleChange:this.noPaintChanged.bind(this)};f.getNotifier(this).subscribe(t,"fillColor"),f.getNotifier(this).subscribe(t,"baseLayerLuminance")}connectedCallback(){super.connectedCallback(),this.noPaintChanged()}noPaintChanged(){this.noPaint||void 0===this.fillColor&&!this.baseLayerLuminance?this.$fastController.removeStyles(qs):this.$fastController.addStyles(qs)}}Kn([P({attribute:"no-paint",mode:"boolean"})],Gs.prototype,"noPaint",void 0),Kn([P({attribute:"fill-color",converter:_s,mode:"fromView"}),Us(Bi)],Gs.prototype,"fillColor",void 0),Kn([P({attribute:"accent-base-color",converter:_s,mode:"fromView"}),Us(Si)],Gs.prototype,"accentBaseColor",void 0),Kn([P({attribute:"neutral-base-color",converter:_s,mode:"fromView"}),Us(Vi)],Gs.prototype,"neutralBaseColor",void 0),Kn([P({converter:R}),Us(Ur)],Gs.prototype,"density",void 0),Kn([P({attribute:"design-unit",converter:R}),Us(Gr)],Gs.prototype,"designUnit",void 0),Kn([P({attribute:"direction"}),Us(jr)],Gs.prototype,"direction",void 0),Kn([P({attribute:"base-height-multiplier",converter:R}),Us(_r)],Gs.prototype,"baseHeightMultiplier",void 0),Kn([P({attribute:"base-horizontal-spacing-multiplier",converter:R}),Us(qr)],Gs.prototype,"baseHorizontalSpacingMultiplier",void 0),Kn([P({attribute:"control-corner-radius",converter:R}),Us(Wr)],Gs.prototype,"controlCornerRadius",void 0),Kn([P({attribute:"layer-corner-radius",converter:R}),Us(Yr)],Gs.prototype,"layerCornerRadius",void 0),Kn([P({attribute:"stroke-width",converter:R}),Us(Zr)],Gs.prototype,"strokeWidth",void 0),Kn([P({attribute:"focus-stroke-width",converter:R}),Us(Qr)],Gs.prototype,"focusStrokeWidth",void 0),Kn([P({attribute:"disabled-opacity",converter:R}),Us(Hr)],Gs.prototype,"disabledOpacity",void 0),Kn([P({attribute:"type-ramp-minus-2-font-size"}),Us(so)],Gs.prototype,"typeRampMinus2FontSize",void 0),Kn([P({attribute:"type-ramp-minus-2-line-height"}),Us(ao)],Gs.prototype,"typeRampMinus2LineHeight",void 0),Kn([P({attribute:"type-ramp-minus-1-font-size"}),Us(oo)],Gs.prototype,"typeRampMinus1FontSize",void 0),Kn([P({attribute:"type-ramp-minus-1-line-height"}),Us(io)],Gs.prototype,"typeRampMinus1LineHeight",void 0),Kn([P({attribute:"type-ramp-base-font-size"}),Us(to)],Gs.prototype,"typeRampBaseFontSize",void 0),Kn([P({attribute:"type-ramp-base-line-height"}),Us(eo)],Gs.prototype,"typeRampBaseLineHeight",void 0),Kn([P({attribute:"type-ramp-plus-1-font-size"}),Us(uo)],Gs.prototype,"typeRampPlus1FontSize",void 0),Kn([P({attribute:"type-ramp-plus-1-line-height"}),Us(co)],Gs.prototype,"typeRampPlus1LineHeight",void 0),Kn([P({attribute:"type-ramp-plus-2-font-size"}),Us(po)],Gs.prototype,"typeRampPlus2FontSize",void 0),Kn([P({attribute:"type-ramp-plus-2-line-height"}),Us(fo)],Gs.prototype,"typeRampPlus2LineHeight",void 0),Kn([P({attribute:"type-ramp-plus-3-font-size"}),Us(vo)],Gs.prototype,"typeRampPlus3FontSize",void 0),Kn([P({attribute:"type-ramp-plus-3-line-height"}),Us(yo)],Gs.prototype,"typeRampPlus3LineHeight",void 0),Kn([P({attribute:"type-ramp-plus-4-font-size"}),Us(mo)],Gs.prototype,"typeRampPlus4FontSize",void 0),Kn([P({attribute:"type-ramp-plus-4-line-height"}),Us(wo)],Gs.prototype,"typeRampPlus4LineHeight",void 0),Kn([P({attribute:"type-ramp-plus-5-font-size"}),Us(xo)],Gs.prototype,"typeRampPlus5FontSize",void 0),Kn([P({attribute:"type-ramp-plus-5-line-height"}),Us(Co)],Gs.prototype,"typeRampPlus5LineHeight",void 0),Kn([P({attribute:"type-ramp-plus-6-font-size"}),Us(ko)],Gs.prototype,"typeRampPlus6FontSize",void 0),Kn([P({attribute:"type-ramp-plus-6-line-height"}),Us(Vo)],Gs.prototype,"typeRampPlus6LineHeight",void 0),Kn([P({attribute:"accent-fill-rest-delta",converter:R}),Us(To)],Gs.prototype,"accentFillRestDelta",void 0),Kn([P({attribute:"accent-fill-hover-delta",converter:R}),Us(Oo)],Gs.prototype,"accentFillHoverDelta",void 0),Kn([P({attribute:"accent-fill-active-delta",converter:R}),Us(Ro)],Gs.prototype,"accentFillActiveDelta",void 0),Kn([P({attribute:"accent-fill-focus-delta",converter:R}),Us(Lo)],Gs.prototype,"accentFillFocusDelta",void 0),Kn([P({attribute:"accent-foreground-rest-delta",converter:R}),Us(Po)],Gs.prototype,"accentForegroundRestDelta",void 0),Kn([P({attribute:"accent-foreground-hover-delta",converter:R}),Us(Io)],Gs.prototype,"accentForegroundHoverDelta",void 0),Kn([P({attribute:"accent-foreground-active-delta",converter:R}),Us(No)],Gs.prototype,"accentForegroundActiveDelta",void 0),Kn([P({attribute:"accent-foreground-focus-delta",converter:R}),Us(Mo)],Gs.prototype,"accentForegroundFocusDelta",void 0),Kn([P({attribute:"neutral-fill-rest-delta",converter:R}),Us(Bo)],Gs.prototype,"neutralFillRestDelta",void 0),Kn([P({attribute:"neutral-fill-hover-delta",converter:R}),Us(Eo)],Gs.prototype,"neutralFillHoverDelta",void 0),Kn([P({attribute:"neutral-fill-active-delta",converter:R}),Us(Ao)],Gs.prototype,"neutralFillActiveDelta",void 0),Kn([P({attribute:"neutral-fill-focus-delta",converter:R}),Us(zo)],Gs.prototype,"neutralFillFocusDelta",void 0),Kn([P({attribute:"neutral-fill-input-rest-delta",converter:R}),Us(jo)],Gs.prototype,"neutralFillInputRestDelta",void 0),Kn([P({attribute:"neutral-fill-input-hover-delta",converter:R}),Us(Ho)],Gs.prototype,"neutralFillInputHoverDelta",void 0),Kn([P({attribute:"neutral-fill-input-active-delta",converter:R}),Us(_o)],Gs.prototype,"neutralFillInputActiveDelta",void 0),Kn([P({attribute:"neutral-fill-input-focus-delta",converter:R}),Us(qo)],Gs.prototype,"neutralFillInputFocusDelta",void 0),Kn([P({attribute:"neutral-fill-layer-rest-delta",converter:R}),Us(Zo)],Gs.prototype,"neutralFillLayerRestDelta",void 0),Kn([P({attribute:"neutral-fill-stealth-rest-delta",converter:R}),Us(oi)],Gs.prototype,"neutralFillStealthRestDelta",void 0),Kn([P({attribute:"neutral-fill-stealth-hover-delta",converter:R}),Us(ii)],Gs.prototype,"neutralFillStealthHoverDelta",void 0),Kn([P({attribute:"neutral-fill-stealth-active-delta",converter:R}),Us(ni)],Gs.prototype,"neutralFillStealthActiveDelta",void 0),Kn([P({attribute:"neutral-fill-stealth-focus-delta",converter:R}),Us(si)],Gs.prototype,"neutralFillStealthFocusDelta",void 0),Kn([P({attribute:"neutral-fill-strong-hover-delta",converter:R}),Us(li)],Gs.prototype,"neutralFillStrongHoverDelta",void 0),Kn([P({attribute:"neutral-fill-strong-active-delta",converter:R}),Us(ui)],Gs.prototype,"neutralFillStrongActiveDelta",void 0),Kn([P({attribute:"neutral-fill-strong-focus-delta",converter:R}),Us(ci)],Gs.prototype,"neutralFillStrongFocusDelta",void 0),Kn([P({attribute:"base-layer-luminance",converter:R}),Us(So)],Gs.prototype,"baseLayerLuminance",void 0),Kn([P({attribute:"neutral-stroke-divider-rest-delta",converter:R}),Us(mi)],Gs.prototype,"neutralStrokeDividerRestDelta",void 0),Kn([P({attribute:"neutral-stroke-rest-delta",converter:R}),Us(hi)],Gs.prototype,"neutralStrokeRestDelta",void 0),Kn([P({attribute:"neutral-stroke-hover-delta",converter:R}),Us(di)],Gs.prototype,"neutralStrokeHoverDelta",void 0),Kn([P({attribute:"neutral-stroke-active-delta",converter:R}),Us(pi)],Gs.prototype,"neutralStrokeActiveDelta",void 0),Kn([P({attribute:"neutral-stroke-focus-delta",converter:R}),Us(fi)],Gs.prototype,"neutralStrokeFocusDelta",void 0);const Ws=Gs.compose({baseName:"design-system-provider",template:Pe` <slot></slot> `,styles:Ee`
    ${_e("block")}
  `});let Ys,Zs,Qs,Xs,Js,Ks,ta;async function ea(){Ys=(await chrome.storage.local.get("selected")).selected,Zs=(await chrome.storage.local.get("chains")).chains,Ks=Zs[Ys.chainId].explorer.replace("tx","address"),Js="https://tokens.app.pulsex.com/images/tokens/0xA1077a294dDE1B09bB078844df40758a5D0f9a27.png",document.getElementById("title").textContent="Balances on "+Zs[Ys.chainId].name,document.getElementById("wallet").textContent="For "+Ys.wallet}oe.getOrCreate(undefined).withPrefix("fluent").register(Jn(),Ls(),Hs(),Ws()),document.addEventListener("DOMContentLoaded",(()=>{ta=document.getElementById("errorOutput"),Qs=document.getElementById("sum"),Xs=document.getElementById("tokens"),document.getElementById("queryBtn").addEventListener("click",(()=>{!async function(t,e,r){ta.textContent="",Qs.textContent="",Xs.innerHTML="<fluent-progress-ring></fluent-progress-ring>";const o={method:"GET",headers:{accept:"application/json","X-API-Key":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImE1MTNhYWFlLTE1NjYtNDkzMS05NDg3LTk3ODdkYTBkODBiYyIsIm9yZ0lkIjoiNDQ4NDAzIiwidXNlcklkIjoiNDYxMzU0IiwidHlwZUlkIjoiYTMxZGJkZjYtZjM2MS00OTZmLWI4ZWEtZGNhNWQ3MjY2NGRkIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NDc4NTczMDcsImV4cCI6NDkwMzYxNzMwN30.xCrcAj6yG34xZm-GRwjVppiksIQwyq0D8dmM_J-Cry0"}};try{const n=`https://deep-index.moralis.io/api/v2.2/dateToBlock?chain=${e}&date=${r}`,s=await fetch(n,o);if(!s.ok)throw new Error(`HTTP error! Status: ${s.status}`);const a=`https://deep-index.moralis.io/api/v2.2/wallets/${t}/tokens?chain=${e}&to_block=${(await s.json()).block}&exclude_spam=true`,l=await fetch(a,o);if(!l.ok)throw new Error(`HTTP error! Status: ${l.status}`);const u=await l.json();Xs.innerHTML="";let c=0;for(var i of u.result){const t=parseFloat(i.usd_value);if(t>1){c+=t;const e=document.createElement("fluent-list-item");Xs.appendChild(e);const r=Math.max(0,i.usd_price.toString().split(".")[0].length-2);console.log(i.usd_price,r,i.balance/10**i.decimals),e.innerHTML=`\n                    <div class="line">\n                        <img src="${i.native_token&&"0x171"==Ys.chainId?Js:i.logo}">\n                        <div class="line0">\n                        <div class="line1"> <a href="${Ks}${i.token_address}">${i.name}</a> <div>${parseInt(i.usd_value).toLocaleString(navigator.language)} USD</div> </div>\n                        <div class="line2"> ${(i.balance/10**i.decimals).toLocaleString(navigator.language,{maximumFractionDigits:r})} ${i.symbol}</div>\n                        </div>\n                    </div>`}}Qs.innerHTML=`Total: ${c.toLocaleString(navigator.language,{maximumFractionDigits:0})} USD`}catch(t){Xs.innerHTML="",ta.textContent="Error fetching tokens: "+t.message}}(Ys.wallet,Zs[Ys.chainId].id,document.getElementById("date").value)}));const t=new Date;document.getElementById("date").value=`${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`,ea()})),chrome.storage.local.onChanged.addListener((async t=>{t.selected&&(Qs.textContent="",Xs.innerHTML="",ea())}))})();