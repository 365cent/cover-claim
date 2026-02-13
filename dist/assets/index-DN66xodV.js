/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt=globalThis,gt=lt.ShadowRoot&&(lt.ShadyCSS===void 0||lt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,bt=Symbol(),xt=new WeakMap;let Pt=class{constructor(t,i,e){if(this._$cssResult$=!0,e!==bt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(gt&&t===void 0){const e=i!==void 0&&i.length===1;e&&(t=xt.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&xt.set(i,t))}return t}toString(){return this.cssText}};const Gt=n=>new Pt(typeof n=="string"?n:n+"",void 0,bt),zt=(n,...t)=>{const i=n.length===1?n[0]:t.reduce((e,r,a)=>e+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+n[a+1],n[0]);return new Pt(i,n,bt)},Wt=(n,t)=>{if(gt)n.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of t){const e=document.createElement("style"),r=lt.litNonce;r!==void 0&&e.setAttribute("nonce",r),e.textContent=i.cssText,n.appendChild(e)}},yt=gt?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return Gt(i)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Zt,defineProperty:Ft,getOwnPropertyDescriptor:Qt,getOwnPropertyNames:Yt,getOwnPropertySymbols:Kt,getPrototypeOf:Xt}=Object,H=globalThis,kt=H.trustedTypes,Jt=kt?kt.emptyScript:"",Vt=H.reactiveElementPolyfillSupport,V=(n,t)=>n,ut={toAttribute(n,t){switch(t){case Boolean:n=n?Jt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let i=n;switch(t){case Boolean:i=n!==null;break;case Number:i=n===null?null:Number(n);break;case Object:case Array:try{i=JSON.parse(n)}catch{i=null}}return i}},mt=(n,t)=>!Zt(n,t),At={attribute:!0,type:String,converter:ut,reflect:!1,useDefault:!1,hasChanged:mt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),H.litPropertyMetadata??(H.litPropertyMetadata=new WeakMap);let Z=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=At){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const e=Symbol(),r=this.getPropertyDescriptor(t,e,i);r!==void 0&&Ft(this.prototype,t,r)}}static getPropertyDescriptor(t,i,e){const{get:r,set:a}=Qt(this.prototype,t)??{get(){return this[i]},set(o){this[i]=o}};return{get:r,set(o){const s=r?.call(this);a?.call(this,o),this.requestUpdate(t,s,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??At}static _$Ei(){if(this.hasOwnProperty(V("elementProperties")))return;const t=Xt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(V("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(V("properties"))){const i=this.properties,e=[...Yt(i),...Kt(i)];for(const r of e)this.createProperty(r,i[r])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[e,r]of i)this.elementProperties.set(e,r)}this._$Eh=new Map;for(const[i,e]of this.elementProperties){const r=this._$Eu(i,e);r!==void 0&&this._$Eh.set(r,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const r of e)i.unshift(yt(r))}else t!==void 0&&i.push(yt(t));return i}static _$Eu(t,i){const e=i.attribute;return e===!1?void 0:typeof e=="string"?e:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const e of i.keys())this.hasOwnProperty(e)&&(t.set(e,this[e]),delete this[e]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Wt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,i,e){this._$AK(t,e)}_$ET(t,i){const e=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,e);if(r!==void 0&&e.reflect===!0){const a=(e.converter?.toAttribute!==void 0?e.converter:ut).toAttribute(i,e.type);this._$Em=t,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(t,i){const e=this.constructor,r=e._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const a=e.getPropertyOptions(r),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:ut;this._$Em=r;const s=o.fromAttribute(i,a.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(t,i,e,r=!1,a){if(t!==void 0){const o=this.constructor;if(r===!1&&(a=this[t]),e??(e=o.getPropertyOptions(t)),!((e.hasChanged??mt)(a,i)||e.useDefault&&e.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,e))))return;this.C(t,i,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:e,reflect:r,wrapped:a},o){e&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??i??this[t]),a!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||e||(i=void 0),this._$AL.set(t,i)),r===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[r,a]of e){const{wrapped:o}=a,s=this[r];o!==!0||this._$AL.has(r)||s===void 0||this.C(r,void 0,a,s)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(i)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach(i=>i.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(i=>this._$ET(i,this[i]))),this._$EM()}updated(t){}firstUpdated(t){}};Z.elementStyles=[],Z.shadowRootOptions={mode:"open"},Z[V("elementProperties")]=new Map,Z[V("finalized")]=new Map,Vt?.({ReactiveElement:Z}),(H.reactiveElementVersions??(H.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tt=globalThis,$t=n=>n,ht=tt.trustedTypes,Ut=ht?ht.createPolicy("lit-html",{createHTML:n=>n}):void 0,Dt="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,Ot="?"+L,te=`<${Ot}>`,z=document,rt=()=>z.createComment(""),ot=n=>n===null||typeof n!="object"&&typeof n!="function",wt=Array.isArray,ee=n=>wt(n)||typeof n?.[Symbol.iterator]=="function",ft=`[ 	
\f\r]`,X=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ct=/-->/g,Nt=/>/g,j=RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Et=/'/g,Tt=/"/g,Rt=/^(?:script|style|textarea|title)$/i,ie=n=>(t,...i)=>({_$litType$:n,strings:t,values:i}),D=ie(1),F=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),qt=new WeakMap,G=z.createTreeWalker(z,129);function St(n,t){if(!wt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ut!==void 0?Ut.createHTML(t):t}const re=(n,t)=>{const i=n.length-1,e=[];let r,a=t===2?"<svg>":t===3?"<math>":"",o=X;for(let s=0;s<i;s++){const c=n[s];let b,m,d=-1,g=0;for(;g<c.length&&(o.lastIndex=g,m=o.exec(c),m!==null);)g=o.lastIndex,o===X?m[1]==="!--"?o=Ct:m[1]!==void 0?o=Nt:m[2]!==void 0?(Rt.test(m[2])&&(r=RegExp("</"+m[2],"g")),o=j):m[3]!==void 0&&(o=j):o===j?m[0]===">"?(o=r??X,d=-1):m[1]===void 0?d=-2:(d=o.lastIndex-m[2].length,b=m[1],o=m[3]===void 0?j:m[3]==='"'?Tt:Et):o===Tt||o===Et?o=j:o===Ct||o===Nt?o=X:(o=j,r=void 0);const x=o===j&&n[s+1].startsWith("/>")?" ":"";a+=o===X?c+te:d>=0?(e.push(b),c.slice(0,d)+Dt+c.slice(d)+L+x):c+L+(d===-2?s:x)}return[St(n,a+(n[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),e]};class st{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let a=0,o=0;const s=t.length-1,c=this.parts,[b,m]=re(t,i);if(this.el=st.createElement(b,e),G.currentNode=this.el.content,i===2||i===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=G.nextNode())!==null&&c.length<s;){if(r.nodeType===1){if(r.hasAttributes())for(const d of r.getAttributeNames())if(d.endsWith(Dt)){const g=m[o++],x=r.getAttribute(d).split(L),N=/([.?@])?(.*)/.exec(g);c.push({type:1,index:a,name:N[2],strings:x,ctor:N[1]==="."?se:N[1]==="?"?ne:N[1]==="@"?ae:pt}),r.removeAttribute(d)}else d.startsWith(L)&&(c.push({type:6,index:a}),r.removeAttribute(d));if(Rt.test(r.tagName)){const d=r.textContent.split(L),g=d.length-1;if(g>0){r.textContent=ht?ht.emptyScript:"";for(let x=0;x<g;x++)r.append(d[x],rt()),G.nextNode(),c.push({type:2,index:++a});r.append(d[g],rt())}}}else if(r.nodeType===8)if(r.data===Ot)c.push({type:2,index:a});else{let d=-1;for(;(d=r.data.indexOf(L,d+1))!==-1;)c.push({type:7,index:a}),d+=L.length-1}a++}}static createElement(t,i){const e=z.createElement("template");return e.innerHTML=t,e}}function Q(n,t,i=n,e){if(t===F)return t;let r=e!==void 0?i._$Co?.[e]:i._$Cl;const a=ot(t)?void 0:t._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),a===void 0?r=void 0:(r=new a(n),r._$AT(n,i,e)),e!==void 0?(i._$Co??(i._$Co=[]))[e]=r:i._$Cl=r),r!==void 0&&(t=Q(n,r._$AS(n,t.values),r,e)),t}class oe{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:e}=this._$AD,r=(t?.creationScope??z).importNode(i,!0);G.currentNode=r;let a=G.nextNode(),o=0,s=0,c=e[0];for(;c!==void 0;){if(o===c.index){let b;c.type===2?b=new at(a,a.nextSibling,this,t):c.type===1?b=new c.ctor(a,c.name,c.strings,this,t):c.type===6&&(b=new ce(a,this,t)),this._$AV.push(b),c=e[++s]}o!==c?.index&&(a=G.nextNode(),o++)}return G.currentNode=z,r}p(t){let i=0;for(const e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(t,e,i),i+=e.strings.length-2):e._$AI(t[i])),i++}}class at{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,e,r){this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=e,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=Q(this,t,i),ot(t)?t===C||t==null||t===""?(this._$AH!==C&&this._$AR(),this._$AH=C):t!==this._$AH&&t!==F&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ee(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==C&&ot(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:e}=t,r=typeof e=="number"?this._$AC(t):(e.el===void 0&&(e.el=st.createElement(St(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===r)this._$AH.p(i);else{const a=new oe(r,this),o=a.u(this.options);a.p(i),this.T(o),this._$AH=a}}_$AC(t){let i=qt.get(t.strings);return i===void 0&&qt.set(t.strings,i=new st(t)),i}k(t){wt(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let e,r=0;for(const a of t)r===i.length?i.push(e=new at(this.O(rt()),this.O(rt()),this,this.options)):e=i[r],e._$AI(a),r++;r<i.length&&(this._$AR(e&&e._$AB.nextSibling,r),i.length=r)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const e=$t(t).nextSibling;$t(t).remove(),t=e}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class pt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,e,r,a){this.type=1,this._$AH=C,this._$AN=void 0,this.element=t,this.name=i,this._$AM=r,this.options=a,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=C}_$AI(t,i=this,e,r){const a=this.strings;let o=!1;if(a===void 0)t=Q(this,t,i,0),o=!ot(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const s=t;let c,b;for(t=a[0],c=0;c<a.length-1;c++)b=Q(this,s[e+c],i,c),b===F&&(b=this._$AH[c]),o||(o=!ot(b)||b!==this._$AH[c]),b===C?t=C:t!==C&&(t+=(b??"")+a[c+1]),this._$AH[c]=b}o&&!r&&this.j(t)}j(t){t===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class se extends pt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===C?void 0:t}}class ne extends pt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==C)}}class ae extends pt{constructor(t,i,e,r,a){super(t,i,e,r,a),this.type=5}_$AI(t,i=this){if((t=Q(this,t,i,0)??C)===F)return;const e=this._$AH,r=t===C&&e!==C||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,a=t!==C&&(e===C||r);r&&this.element.removeEventListener(this.name,this,e),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ce{constructor(t,i,e){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const le=tt.litHtmlPolyfillSupport;le?.(st,at),(tt.litHtmlVersions??(tt.litHtmlVersions=[])).push("3.3.2");const ue=(n,t,i)=>{const e=i?.renderBefore??t;let r=e._$litPart$;if(r===void 0){const a=i?.renderBefore??null;e._$litPart$=r=new at(t.insertBefore(rt(),a),a,void 0,i??{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const et=globalThis;class it extends Z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var i;const t=super.createRenderRoot();return(i=this.renderOptions).renderBefore??(i.renderBefore=t.firstChild),t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ue(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}it._$litElement$=!0,it.finalized=!0,et.litElementHydrateSupport?.({LitElement:it});const he=et.litElementPolyfillSupport;he?.({LitElement:it});(et.litElementVersions??(et.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pe=n=>(t,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const de={attribute:!0,type:String,converter:ut,reflect:!1,hasChanged:mt},fe=(n=de,t,i)=>{const{kind:e,metadata:r}=i;let a=globalThis.litPropertyMetadata.get(r);if(a===void 0&&globalThis.litPropertyMetadata.set(r,a=new Map),e==="setter"&&((n=Object.create(n)).wrapped=!0),a.set(i.name,n),e==="accessor"){const{name:o}=i;return{set(s){const c=t.get.call(this);t.set.call(this,s),this.requestUpdate(o,c,n,!0,s)},init(s){return s!==void 0&&this.C(o,void 0,n,s),s}}}if(e==="setter"){const{name:o}=i;return function(s){const c=this[o];t.call(this,s),this.requestUpdate(o,c,n,!0,s)}}throw Error("Unsupported decorator location: "+e)};function ge(n){return(t,i)=>typeof i=="object"?fe(n,t,i):((e,r,a)=>{const o=r.hasOwnProperty(a);return r.constructor.createProperty(a,e),o?Object.getOwnPropertyDescriptor(r,a):void 0})(n,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ct(n){return ge({...n,state:!0,attribute:!1})}const Y=function(n,t){let r=n;const a=J[t];let o=null,s=0,c=null;const b=[],m={},d=function(u,f){s=r*4+17,o=(function(l){const p=new Array(l);for(let h=0;h<l;h+=1){p[h]=new Array(l);for(let w=0;w<l;w+=1)p[h][w]=null}return p})(s),g(0,0),g(s-7,0),g(0,s-7),U(),N(),M(u,f),r>=7&&T(u),c==null&&(c=It(r,a,b)),B(c,f)},g=function(u,f){for(let l=-1;l<=7;l+=1)if(!(u+l<=-1||s<=u+l))for(let p=-1;p<=7;p+=1)f+p<=-1||s<=f+p||(0<=l&&l<=6&&(p==0||p==6)||0<=p&&p<=6&&(l==0||l==6)||2<=l&&l<=4&&2<=p&&p<=4?o[u+l][f+p]=!0:o[u+l][f+p]=!1)},x=function(){let u=0,f=0;for(let l=0;l<8;l+=1){d(!0,l);const p=R.getLostPoint(m);(l==0||u>p)&&(u=p,f=l)}return f},N=function(){for(let u=8;u<s-8;u+=1)o[u][6]==null&&(o[u][6]=u%2==0);for(let u=8;u<s-8;u+=1)o[6][u]==null&&(o[6][u]=u%2==0)},U=function(){const u=R.getPatternPosition(r);for(let f=0;f<u.length;f+=1)for(let l=0;l<u.length;l+=1){const p=u[f],h=u[l];if(o[p][h]==null)for(let w=-2;w<=2;w+=1)for(let v=-2;v<=2;v+=1)w==-2||w==2||v==-2||v==2||w==0&&v==0?o[p+w][h+v]=!0:o[p+w][h+v]=!1}},T=function(u){const f=R.getBCHTypeNumber(r);for(let l=0;l<18;l+=1){const p=!u&&(f>>l&1)==1;o[Math.floor(l/3)][l%3+s-8-3]=p}for(let l=0;l<18;l+=1){const p=!u&&(f>>l&1)==1;o[l%3+s-8-3][Math.floor(l/3)]=p}},M=function(u,f){const l=a<<3|f,p=R.getBCHTypeInfo(l);for(let h=0;h<15;h+=1){const w=!u&&(p>>h&1)==1;h<6?o[h][8]=w:h<8?o[h+1][8]=w:o[s-15+h][8]=w}for(let h=0;h<15;h+=1){const w=!u&&(p>>h&1)==1;h<8?o[8][s-h-1]=w:h<9?o[8][15-h-1+1]=w:o[8][15-h-1]=w}o[s-8][8]=!u},B=function(u,f){let l=-1,p=s-1,h=7,w=0;const v=R.getMaskFunction(f);for(let y=s-1;y>0;y-=2)for(y==6&&(y-=1);;){for(let k=0;k<2;k+=1)if(o[p][y-k]==null){let $=!1;w<u.length&&($=(u[w]>>>h&1)==1),v(p,y-k)&&($=!$),o[p][y-k]=$,h-=1,h==-1&&(w+=1,h=7)}if(p+=l,p<0||s<=p){p-=l,l=-l;break}}},Ht=function(u,f){let l=0,p=0,h=0;const w=new Array(f.length),v=new Array(f.length);for(let _=0;_<f.length;_+=1){const A=f[_].dataCount,q=f[_].totalCount-A;p=Math.max(p,A),h=Math.max(h,q),w[_]=new Array(A);for(let P=0;P<w[_].length;P+=1)w[_][P]=255&u.getBuffer()[P+l];l+=A;const dt=R.getErrorCorrectPolynomial(q),vt=nt(w[_],dt.getLength()-1).mod(dt);v[_]=new Array(dt.getLength()-1);for(let P=0;P<v[_].length;P+=1){const _t=P+vt.getLength()-v[_].length;v[_][P]=_t>=0?vt.getAt(_t):0}}let y=0;for(let _=0;_<f.length;_+=1)y+=f[_].totalCount;const k=new Array(y);let $=0;for(let _=0;_<p;_+=1)for(let A=0;A<f.length;A+=1)_<w[A].length&&(k[$]=w[A][_],$+=1);for(let _=0;_<h;_+=1)for(let A=0;A<f.length;A+=1)_<v[A].length&&(k[$]=v[A][_],$+=1);return k},It=function(u,f,l){const p=Bt.getRSBlocks(u,f),h=Mt();for(let v=0;v<l.length;v+=1){const y=l[v];h.put(y.getMode(),4),h.put(y.getLength(),R.getLengthInBits(y.getMode(),u)),y.write(h)}let w=0;for(let v=0;v<p.length;v+=1)w+=p[v].dataCount;if(h.getLengthInBits()>w*8)throw"code length overflow. ("+h.getLengthInBits()+">"+w*8+")";for(h.getLengthInBits()+4<=w*8&&h.put(0,4);h.getLengthInBits()%8!=0;)h.putBit(!1);for(;!(h.getLengthInBits()>=w*8||(h.put(236,8),h.getLengthInBits()>=w*8));)h.put(17,8);return Ht(h,p)};m.addData=function(u,f){f=f||"Byte";let l=null;switch(f){case"Numeric":l=be(u);break;case"Alphanumeric":l=me(u);break;case"Byte":l=we(u);break;case"Kanji":l=ve(u);break;default:throw"mode:"+f}b.push(l),c=null},m.isDark=function(u,f){if(u<0||s<=u||f<0||s<=f)throw u+","+f;return o[u][f]},m.getModuleCount=function(){return s},m.make=function(){if(r<1){let u=1;for(;u<40;u++){const f=Bt.getRSBlocks(u,a),l=Mt();for(let h=0;h<b.length;h++){const w=b[h];l.put(w.getMode(),4),l.put(w.getLength(),R.getLengthInBits(w.getMode(),u)),w.write(l)}let p=0;for(let h=0;h<f.length;h++)p+=f[h].dataCount;if(l.getLengthInBits()<=p*8)break}r=u}d(!1,x())},m.createTableTag=function(u,f){u=u||2,f=typeof f>"u"?u*4:f;let l="";l+='<table style="',l+=" border-width: 0px; border-style: none;",l+=" border-collapse: collapse;",l+=" padding: 0px; margin: "+f+"px;",l+='">',l+="<tbody>";for(let p=0;p<m.getModuleCount();p+=1){l+="<tr>";for(let h=0;h<m.getModuleCount();h+=1)l+='<td style="',l+=" border-width: 0px; border-style: none;",l+=" border-collapse: collapse;",l+=" padding: 0px; margin: 0px;",l+=" width: "+u+"px;",l+=" height: "+u+"px;",l+=" background-color: ",l+=m.isDark(p,h)?"#000000":"#ffffff",l+=";",l+='"/>';l+="</tr>"}return l+="</tbody>",l+="</table>",l},m.createSvgTag=function(u,f,l,p){let h={};typeof arguments[0]=="object"&&(h=arguments[0],u=h.cellSize,f=h.margin,l=h.alt,p=h.title),u=u||2,f=typeof f>"u"?u*4:f,l=typeof l=="string"?{text:l}:l||{},l.text=l.text||null,l.id=l.text?l.id||"qrcode-description":null,p=typeof p=="string"?{text:p}:p||{},p.text=p.text||null,p.id=p.text?p.id||"qrcode-title":null;const w=m.getModuleCount()*u+f*2;let v,y,k,$,_="",A;for(A="l"+u+",0 0,"+u+" -"+u+",0 0,-"+u+"z ",_+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',_+=h.scalable?"":' width="'+w+'px" height="'+w+'px"',_+=' viewBox="0 0 '+w+" "+w+'" ',_+=' preserveAspectRatio="xMinYMin meet"',_+=p.text||l.text?' role="img" aria-labelledby="'+W([p.id,l.id].join(" ").trim())+'"':"",_+=">",_+=p.text?'<title id="'+W(p.id)+'">'+W(p.text)+"</title>":"",_+=l.text?'<description id="'+W(l.id)+'">'+W(l.text)+"</description>":"",_+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',_+='<path d="',k=0;k<m.getModuleCount();k+=1)for($=k*u+f,v=0;v<m.getModuleCount();v+=1)m.isDark(k,v)&&(y=v*u+f,_+="M"+y+","+$+A);return _+='" stroke="transparent" fill="black"/>',_+="</svg>",_},m.createDataURL=function(u,f){u=u||2,f=typeof f>"u"?u*4:f;const l=m.getModuleCount()*u+f*2,p=f,h=l-f;return ke(l,l,function(w,v){if(p<=w&&w<h&&p<=v&&v<h){const y=Math.floor((w-p)/u),k=Math.floor((v-p)/u);return m.isDark(k,y)?0:1}else return 1})},m.createImgTag=function(u,f,l){u=u||2,f=typeof f>"u"?u*4:f;const p=m.getModuleCount()*u+f*2;let h="";return h+="<img",h+=' src="',h+=m.createDataURL(u,f),h+='"',h+=' width="',h+=p,h+='"',h+=' height="',h+=p,h+='"',l&&(h+=' alt="',h+=W(l),h+='"'),h+="/>",h};const W=function(u){let f="";for(let l=0;l<u.length;l+=1){const p=u.charAt(l);switch(p){case"<":f+="&lt;";break;case">":f+="&gt;";break;case"&":f+="&amp;";break;case'"':f+="&quot;";break;default:f+=p;break}}return f},jt=function(u){u=typeof u>"u"?2:u;const l=m.getModuleCount()*1+u*2,p=u,h=l-u;let w,v,y,k,$;const _={"██":"█","█ ":"▀"," █":"▄","  ":" "},A={"██":"▀","█ ":"▀"," █":" ","  ":" "};let q="";for(w=0;w<l;w+=2){for(y=Math.floor((w-p)/1),k=Math.floor((w+1-p)/1),v=0;v<l;v+=1)$="█",p<=v&&v<h&&p<=w&&w<h&&m.isDark(y,Math.floor((v-p)/1))&&($=" "),p<=v&&v<h&&p<=w+1&&w+1<h&&m.isDark(k,Math.floor((v-p)/1))?$+=" ":$+="█",q+=u<1&&w+1>=h?A[$]:_[$];q+=`
`}return l%2&&u>0?q.substring(0,q.length-l-1)+Array(l+1).join("▀"):q.substring(0,q.length-1)};return m.createASCII=function(u,f){if(u=u||1,u<2)return jt(f);u-=1,f=typeof f>"u"?u*2:f;const l=m.getModuleCount()*u+f*2,p=f,h=l-f;let w,v,y,k;const $=Array(u+1).join("██"),_=Array(u+1).join("  ");let A="",q="";for(w=0;w<l;w+=1){for(y=Math.floor((w-p)/u),q="",v=0;v<l;v+=1)k=1,p<=v&&v<h&&p<=w&&w<h&&m.isDark(y,Math.floor((v-p)/u))&&(k=0),q+=k?$:_;for(y=0;y<u;y+=1)A+=q+`
`}return A.substring(0,A.length-1)},m.renderTo2dContext=function(u,f){f=f||2;const l=m.getModuleCount();for(let p=0;p<l;p++)for(let h=0;h<l;h++)u.fillStyle=m.isDark(p,h)?"black":"white",u.fillRect(h*f,p*f,f,f)},m};Y.stringToBytes=function(n){const t=[];for(let i=0;i<n.length;i+=1){const e=n.charCodeAt(i);t.push(e&255)}return t};Y.createStringToBytes=function(n,t){const i=(function(){const r=xe(n),a=function(){const c=r.read();if(c==-1)throw"eof";return c};let o=0;const s={};for(;;){const c=r.read();if(c==-1)break;const b=a(),m=a(),d=a(),g=String.fromCharCode(c<<8|b),x=m<<8|d;s[g]=x,o+=1}if(o!=t)throw o+" != "+t;return s})(),e=63;return function(r){const a=[];for(let o=0;o<r.length;o+=1){const s=r.charCodeAt(o);if(s<128)a.push(s);else{const c=i[r.charAt(o)];typeof c=="number"?(c&255)==c?a.push(c):(a.push(c>>>8),a.push(c&255)):a.push(e)}}return a}};const E={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},J={L:1,M:0,Q:3,H:2},O={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},R=(function(){const n=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],t=1335,i=7973,e=21522,r={},a=function(o){let s=0;for(;o!=0;)s+=1,o>>>=1;return s};return r.getBCHTypeInfo=function(o){let s=o<<10;for(;a(s)-a(t)>=0;)s^=t<<a(s)-a(t);return(o<<10|s)^e},r.getBCHTypeNumber=function(o){let s=o<<12;for(;a(s)-a(i)>=0;)s^=i<<a(s)-a(i);return o<<12|s},r.getPatternPosition=function(o){return n[o-1]},r.getMaskFunction=function(o){switch(o){case O.PATTERN000:return function(s,c){return(s+c)%2==0};case O.PATTERN001:return function(s,c){return s%2==0};case O.PATTERN010:return function(s,c){return c%3==0};case O.PATTERN011:return function(s,c){return(s+c)%3==0};case O.PATTERN100:return function(s,c){return(Math.floor(s/2)+Math.floor(c/3))%2==0};case O.PATTERN101:return function(s,c){return s*c%2+s*c%3==0};case O.PATTERN110:return function(s,c){return(s*c%2+s*c%3)%2==0};case O.PATTERN111:return function(s,c){return(s*c%3+(s+c)%2)%2==0};default:throw"bad maskPattern:"+o}},r.getErrorCorrectPolynomial=function(o){let s=nt([1],0);for(let c=0;c<o;c+=1)s=s.multiply(nt([1,S.gexp(c)],0));return s},r.getLengthInBits=function(o,s){if(1<=s&&s<10)switch(o){case E.MODE_NUMBER:return 10;case E.MODE_ALPHA_NUM:return 9;case E.MODE_8BIT_BYTE:return 8;case E.MODE_KANJI:return 8;default:throw"mode:"+o}else if(s<27)switch(o){case E.MODE_NUMBER:return 12;case E.MODE_ALPHA_NUM:return 11;case E.MODE_8BIT_BYTE:return 16;case E.MODE_KANJI:return 10;default:throw"mode:"+o}else if(s<41)switch(o){case E.MODE_NUMBER:return 14;case E.MODE_ALPHA_NUM:return 13;case E.MODE_8BIT_BYTE:return 16;case E.MODE_KANJI:return 12;default:throw"mode:"+o}else throw"type:"+s},r.getLostPoint=function(o){const s=o.getModuleCount();let c=0;for(let d=0;d<s;d+=1)for(let g=0;g<s;g+=1){let x=0;const N=o.isDark(d,g);for(let U=-1;U<=1;U+=1)if(!(d+U<0||s<=d+U))for(let T=-1;T<=1;T+=1)g+T<0||s<=g+T||U==0&&T==0||N==o.isDark(d+U,g+T)&&(x+=1);x>5&&(c+=3+x-5)}for(let d=0;d<s-1;d+=1)for(let g=0;g<s-1;g+=1){let x=0;o.isDark(d,g)&&(x+=1),o.isDark(d+1,g)&&(x+=1),o.isDark(d,g+1)&&(x+=1),o.isDark(d+1,g+1)&&(x+=1),(x==0||x==4)&&(c+=3)}for(let d=0;d<s;d+=1)for(let g=0;g<s-6;g+=1)o.isDark(d,g)&&!o.isDark(d,g+1)&&o.isDark(d,g+2)&&o.isDark(d,g+3)&&o.isDark(d,g+4)&&!o.isDark(d,g+5)&&o.isDark(d,g+6)&&(c+=40);for(let d=0;d<s;d+=1)for(let g=0;g<s-6;g+=1)o.isDark(g,d)&&!o.isDark(g+1,d)&&o.isDark(g+2,d)&&o.isDark(g+3,d)&&o.isDark(g+4,d)&&!o.isDark(g+5,d)&&o.isDark(g+6,d)&&(c+=40);let b=0;for(let d=0;d<s;d+=1)for(let g=0;g<s;g+=1)o.isDark(g,d)&&(b+=1);const m=Math.abs(100*b/s/s-50)/5;return c+=m*10,c},r})(),S=(function(){const n=new Array(256),t=new Array(256);for(let e=0;e<8;e+=1)n[e]=1<<e;for(let e=8;e<256;e+=1)n[e]=n[e-4]^n[e-5]^n[e-6]^n[e-8];for(let e=0;e<255;e+=1)t[n[e]]=e;const i={};return i.glog=function(e){if(e<1)throw"glog("+e+")";return t[e]},i.gexp=function(e){for(;e<0;)e+=255;for(;e>=256;)e-=255;return n[e]},i})(),nt=function(n,t){if(typeof n.length>"u")throw n.length+"/"+t;const i=(function(){let r=0;for(;r<n.length&&n[r]==0;)r+=1;const a=new Array(n.length-r+t);for(let o=0;o<n.length-r;o+=1)a[o]=n[o+r];return a})(),e={};return e.getAt=function(r){return i[r]},e.getLength=function(){return i.length},e.multiply=function(r){const a=new Array(e.getLength()+r.getLength()-1);for(let o=0;o<e.getLength();o+=1)for(let s=0;s<r.getLength();s+=1)a[o+s]^=S.gexp(S.glog(e.getAt(o))+S.glog(r.getAt(s)));return nt(a,0)},e.mod=function(r){if(e.getLength()-r.getLength()<0)return e;const a=S.glog(e.getAt(0))-S.glog(r.getAt(0)),o=new Array(e.getLength());for(let s=0;s<e.getLength();s+=1)o[s]=e.getAt(s);for(let s=0;s<r.getLength();s+=1)o[s]^=S.gexp(S.glog(r.getAt(s))+a);return nt(o,0).mod(r)},e},Bt=(function(){const n=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],t=function(r,a){const o={};return o.totalCount=r,o.dataCount=a,o},i={},e=function(r,a){switch(a){case J.L:return n[(r-1)*4+0];case J.M:return n[(r-1)*4+1];case J.Q:return n[(r-1)*4+2];case J.H:return n[(r-1)*4+3];default:return}};return i.getRSBlocks=function(r,a){const o=e(r,a);if(typeof o>"u")throw"bad rs block @ typeNumber:"+r+"/errorCorrectionLevel:"+a;const s=o.length/3,c=[];for(let b=0;b<s;b+=1){const m=o[b*3+0],d=o[b*3+1],g=o[b*3+2];for(let x=0;x<m;x+=1)c.push(t(d,g))}return c},i})(),Mt=function(){const n=[];let t=0;const i={};return i.getBuffer=function(){return n},i.getAt=function(e){const r=Math.floor(e/8);return(n[r]>>>7-e%8&1)==1},i.put=function(e,r){for(let a=0;a<r;a+=1)i.putBit((e>>>r-a-1&1)==1)},i.getLengthInBits=function(){return t},i.putBit=function(e){const r=Math.floor(t/8);n.length<=r&&n.push(0),e&&(n[r]|=128>>>t%8),t+=1},i},be=function(n){const t=E.MODE_NUMBER,i=n,e={};e.getMode=function(){return t},e.getLength=function(o){return i.length},e.write=function(o){const s=i;let c=0;for(;c+2<s.length;)o.put(r(s.substring(c,c+3)),10),c+=3;c<s.length&&(s.length-c==1?o.put(r(s.substring(c,c+1)),4):s.length-c==2&&o.put(r(s.substring(c,c+2)),7))};const r=function(o){let s=0;for(let c=0;c<o.length;c+=1)s=s*10+a(o.charAt(c));return s},a=function(o){if("0"<=o&&o<="9")return o.charCodeAt(0)-48;throw"illegal char :"+o};return e},me=function(n){const t=E.MODE_ALPHA_NUM,i=n,e={};e.getMode=function(){return t},e.getLength=function(a){return i.length},e.write=function(a){const o=i;let s=0;for(;s+1<o.length;)a.put(r(o.charAt(s))*45+r(o.charAt(s+1)),11),s+=2;s<o.length&&a.put(r(o.charAt(s)),6)};const r=function(a){if("0"<=a&&a<="9")return a.charCodeAt(0)-48;if("A"<=a&&a<="Z")return a.charCodeAt(0)-65+10;switch(a){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+a}};return e},we=function(n){const t=E.MODE_8BIT_BYTE,i=Y.stringToBytes(n),e={};return e.getMode=function(){return t},e.getLength=function(r){return i.length},e.write=function(r){for(let a=0;a<i.length;a+=1)r.put(i[a],8)},e},ve=function(n){const t=E.MODE_KANJI,i=Y.stringToBytes;(function(a,o){const s=i(a);if(s.length!=2||(s[0]<<8|s[1])!=o)throw"sjis not supported."})("友",38726);const e=i(n),r={};return r.getMode=function(){return t},r.getLength=function(a){return~~(e.length/2)},r.write=function(a){const o=e;let s=0;for(;s+1<o.length;){let c=(255&o[s])<<8|255&o[s+1];if(33088<=c&&c<=40956)c-=33088;else if(57408<=c&&c<=60351)c-=49472;else throw"illegal char at "+(s+1)+"/"+c;c=(c>>>8&255)*192+(c&255),a.put(c,13),s+=2}if(s<o.length)throw"illegal char at "+(s+1)},r},Lt=function(){const n=[],t={};return t.writeByte=function(i){n.push(i&255)},t.writeShort=function(i){t.writeByte(i),t.writeByte(i>>>8)},t.writeBytes=function(i,e,r){e=e||0,r=r||i.length;for(let a=0;a<r;a+=1)t.writeByte(i[a+e])},t.writeString=function(i){for(let e=0;e<i.length;e+=1)t.writeByte(i.charCodeAt(e))},t.toByteArray=function(){return n},t.toString=function(){let i="";i+="[";for(let e=0;e<n.length;e+=1)e>0&&(i+=","),i+=n[e];return i+="]",i},t},_e=function(){let n=0,t=0,i=0,e="";const r={},a=function(s){e+=String.fromCharCode(o(s&63))},o=function(s){if(s<0)throw"n:"+s;if(s<26)return 65+s;if(s<52)return 97+(s-26);if(s<62)return 48+(s-52);if(s==62)return 43;if(s==63)return 47;throw"n:"+s};return r.writeByte=function(s){for(n=n<<8|s&255,t+=8,i+=1;t>=6;)a(n>>>t-6),t-=6},r.flush=function(){if(t>0&&(a(n<<6-t),n=0,t=0),i%3!=0){const s=3-i%3;for(let c=0;c<s;c+=1)e+="="}},r.toString=function(){return e},r},xe=function(n){const t=n;let i=0,e=0,r=0;const a={};a.read=function(){for(;r<8;){if(i>=t.length){if(r==0)return-1;throw"unexpected end of file./"+r}const c=t.charAt(i);if(i+=1,c=="=")return r=0,-1;if(c.match(/^\s$/))continue;e=e<<6|o(c.charCodeAt(0)),r+=6}const s=e>>>r-8&255;return r-=8,s};const o=function(s){if(65<=s&&s<=90)return s-65;if(97<=s&&s<=122)return s-97+26;if(48<=s&&s<=57)return s-48+52;if(s==43)return 62;if(s==47)return 63;throw"c:"+s};return a},ye=function(n,t){const i=n,e=t,r=new Array(n*t),a={};a.setPixel=function(b,m,d){r[m*i+b]=d},a.write=function(b){b.writeString("GIF87a"),b.writeShort(i),b.writeShort(e),b.writeByte(128),b.writeByte(0),b.writeByte(0),b.writeByte(0),b.writeByte(0),b.writeByte(0),b.writeByte(255),b.writeByte(255),b.writeByte(255),b.writeString(","),b.writeShort(0),b.writeShort(0),b.writeShort(i),b.writeShort(e),b.writeByte(0);const m=2,d=s(m);b.writeByte(m);let g=0;for(;d.length-g>255;)b.writeByte(255),b.writeBytes(d,g,255),g+=255;b.writeByte(d.length-g),b.writeBytes(d,g,d.length-g),b.writeByte(0),b.writeString(";")};const o=function(b){const m=b;let d=0,g=0;const x={};return x.write=function(N,U){if(N>>>U)throw"length over";for(;d+U>=8;)m.writeByte(255&(N<<d|g)),U-=8-d,N>>>=8-d,g=0,d=0;g=N<<d|g,d=d+U},x.flush=function(){d>0&&m.writeByte(g)},x},s=function(b){const m=1<<b,d=(1<<b)+1;let g=b+1;const x=c();for(let B=0;B<m;B+=1)x.add(String.fromCharCode(B));x.add(String.fromCharCode(m)),x.add(String.fromCharCode(d));const N=Lt(),U=o(N);U.write(m,g);let T=0,M=String.fromCharCode(r[T]);for(T+=1;T<r.length;){const B=String.fromCharCode(r[T]);T+=1,x.contains(M+B)?M=M+B:(U.write(x.indexOf(M),g),x.size()<4095&&(x.size()==1<<g&&(g+=1),x.add(M+B)),M=B)}return U.write(x.indexOf(M),g),U.write(d,g),U.flush(),N.toByteArray()},c=function(){const b={};let m=0;const d={};return d.add=function(g){if(d.contains(g))throw"dup key:"+g;b[g]=m,m+=1},d.size=function(){return m},d.indexOf=function(g){return b[g]},d.contains=function(g){return typeof b[g]<"u"},d};return a},ke=function(n,t,i){const e=ye(n,t);for(let s=0;s<t;s+=1)for(let c=0;c<n;c+=1)e.setPixel(c,s,i(c,s));const r=Lt();e.write(r);const a=_e(),o=r.toByteArray();for(let s=0;s<o.length;s+=1)a.writeByte(o[s]);return a.flush(),"data:image/gif;base64,"+a};Y.stringToBytes;var Ae=Object.defineProperty,$e=Object.getOwnPropertyDescriptor,K=(n,t,i,e)=>{for(var r=e>1?void 0:e?$e(t,i):t,a=n.length-1,o;a>=0;a--)(o=n[a])&&(r=(e?o(t,i,r):o(r))||r);return e&&r&&Ae(t,i,r),r};let I=class extends it{constructor(){super(...arguments),this.covers=[{title:"Eastman",url:"https://szsupport.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_rvdPRg6u0eB&check_type=1",receiveUri:"NU_rvdPRg6u0eB",status:"available"},{title:"HKT香港电讯马年限定",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_fug8F1m2WNA&check_type=2#wechat_redirect",receiveUri:"NU_fug8F1m2WNA",status:"available"},{title:"MCM×烟花玩偶马",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_vH6FBRTlDPB&GongZhongHao=jabikj&check_type=2#wechat_redirect",receiveUri:"NU_vH6FBRTlDPB",status:"available"},{title:"Miffy 米菲",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_d6X5zdxGiKD&check_type=2#wechat_redirect",receiveUri:"NU_d6X5zdxGiKD",status:"available"},{title:"NBA全明星",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_mq08BwQQC7E&check_type=2#wechat_redirect",receiveUri:"NU_mq08BwQQC7E",status:"available"},{title:"OPPO×小小财神",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_nWvNx2Dg3WS&check_type=2#wechat_redirect",receiveUri:"NU_nWvNx2Dg3WS",status:"available"},{title:"Qeelin麒麟",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_k3yFjmOCE8N&GongZhongHao=jabikj&check_type=2#wechat_redirect",receiveUri:"NU_k3yFjmOCE8N",status:"available"},{title:"TOPTOY×Mochi",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_iveP9DbpE9H&GongZhongHao=jabikj&check_type=2#wechat_redirect",receiveUri:"NU_iveP9DbpE9H",status:"available"},{title:"TOPTOY×美乐蒂",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_wuIzRJFvCyZ&GongZhongHao=jabikj&check_type=2#wechat_redirect",receiveUri:"NU_wuIzRJFvCyZ",status:"available"},{title:"TOPTOY半人鱼",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_jHG461ucpnS&check_type=2#wechat_redirect",receiveUri:"NU_jHG461ucpnS",status:"available"},{title:"Zerox马年大吉",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_gFZZlwFhupC&check_type=2#wechat_redirect",receiveUri:"NU_gFZZlwFhupC",status:"available"},{title:"三丽鸥",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_zM4mpkIoN0M&check_type=2#wechat_redirect",receiveUri:"NU_zM4mpkIoN0M",status:"available"},{title:"三丽鸥帕恰狗",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_pG4WJFYL5KX&check_type=2#wechat_redirect",receiveUri:"NU_pG4WJFYL5KX",status:"available"},{title:"三枪x旋转木马 动态",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_tIxL2ftTXyB&GongZhongHao=jabikj&check_type=2#wechat_redirect",receiveUri:"NU_tIxL2ftTXyB",status:"available"},{title:"哔哩哔哩×拜年纪兽耳萌娘",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_uC4A0GTJ3KJ&GongZhongHao=jabikj&check_type=2#wechat_redirect",receiveUri:"NU_uC4A0GTJ3KJ",status:"available"},{title:"好想来 动态可爱",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_kj1W5PvWQSM&check_type=2#wechat_redirect",receiveUri:"NU_kj1W5PvWQSM",status:"available"},{title:"姆明家族",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_uoSZQQ2RLlE&check_type=2#wechat_redirect",receiveUri:"NU_uoSZQQ2RLlE",status:"available"},{title:"宝马中国",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_r9eQ9LXJePW&GongZhongHao=jabikj&check_type=2#wechat_redirect",receiveUri:"NU_r9eQ9LXJePW",status:"available"},{title:"小粉马",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_ygMZlgd0YYT&check_type=2#wechat_redirect",receiveUri:"NU_ygMZlgd0YYT",status:"available"},{title:"小米汽车×新SU7",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_rThj99OeRIT&check_type=2#wechat_redirect",receiveUri:"NU_rThj99OeRIT",status:"available"},{title:"梦幻飞马 动态好看",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?combinereceiveuri=53ZBH14AK0W0IptU&check_type=1#wechat_redirect",receiveUri:"53ZBH14AK0W0IptU",status:"available"},{title:"植物大战僵尸 动态",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_bBTc3fwLk5K&GongZhongHao=jabikj&check_type=2#wechat_redirect",receiveUri:"NU_bBTc3fwLk5K",status:"available"},{title:"泰柯茶园 动态",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?combinereceiveuri=CI2AUIJWbpj7OBR6&check_type=2#wechat_redirect",receiveUri:"CI2AUIJWbpj7OBR6",status:"available"},{title:"海底捞×小马宝莉",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_gFls3rq5Q4L&check_type=2#wechat_redirect",receiveUri:"NU_gFls3rq5Q4L",status:"available"},{title:"爷爷不泡茶 动态",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_aiAdYW5wC8R&check_type=2#wechat_redirect",receiveUri:"NU_aiAdYW5wC8R",status:"available"},{title:"生生不息×流星粉马 动态",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_jlyeac25XUD&GongZhongHao=jabikj&check_type=2#wechat_redirect",receiveUri:"NU_jlyeac25XUD",status:"available"},{title:"立白×迪丽热巴",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_ltamksSG1YO&check_type=2#wechat_redirect",receiveUri:"NU_ltamksSG1YO",status:"available"},{title:"给你红包 动态",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_hGYpkhsXLbW&check_type=2#wechat_redirect",receiveUri:"NU_hGYpkhsXLbW",status:"available"},{title:"腾讯安全",url:"https://szsupport.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_jODPFJw8CcA&check_type=1",receiveUri:"NU_jODPFJw8CcA",status:"available"},{title:"腾讯电竞×十周年企鹅骑马",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_m4w93lDBwVN&check_type=2#wechat_redirect",receiveUri:"NU_m4w93lDBwVN",status:"available"},{title:"茉莉奶白×奔腾的小金马 动态",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_yYZUZHm93QK&check_type=1&sessionid=1422619639",receiveUri:"NU_yYZUZHm93QK",status:"available"},{title:"荣耀HONOR×肖战",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_xodOj9docIM&check_type=1",receiveUri:"NU_xodOj9docIM",status:"available"},{title:"荣耀HONOR×金马 动态",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_raT8aUpXJHG&check_type=1&sessionid=1367090601",receiveUri:"NU_raT8aUpXJHG",status:"available"},{title:"蒙牛×胖牛牛",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_oXfpesdUcIC&GongZhongHao=jabikj&check_type=2#wechat_redirect",receiveUri:"NU_oXfpesdUcIC",status:"available"},{title:"蒙牛x拿去花",url:"https://szsupport.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_nVrZMt3CJ8B&check_type=1",receiveUri:"NU_nVrZMt3CJ8B",status:"available"},{title:"超级洞洞乐 动态",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_hPpV32vdd4E&check_type=2#wechat_redirect",receiveUri:"NU_hPpV32vdd4E",status:"available"},{title:"转转×新年装满财运",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_h6JBc4ONneY&check_type=2#wechat_redirect",receiveUri:"NU_h6JBc4ONneY",status:"available"},{title:"马上发达 动态",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_o9WPVFWYd6N&check_type=2#wechat_redirect",receiveUri:"NU_o9WPVFWYd6N",status:"available"},{title:"马上有钱 可爱",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_dsTLimpbeRS&GongZhongHao=jabikj&check_type=2#wechat_redirect",receiveUri:"NU_dsTLimpbeRS",status:"available"},{title:"鸿星尔克",url:"https://szsupport.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_nOsPn2UxYjI&check_type=1",receiveUri:"NU_nOsPn2UxYjI",status:"available"},{title:"花知晓×可爱小兔",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_dXoUJh9HuSQ&check_type=1",receiveUri:"NU_dXoUJh9HuSQ",status:"available"},{title:"花知晓×邦尼花园",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_gcTKnkyFhRN&check_type=1",receiveUri:"NU_gcTKnkyFhRN",status:"available"},{title:"英雄联盟",url:"https://szsupport.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_eQhx6ux150E&check_type=1",receiveUri:"NU_eQhx6ux150E",status:"available"},{title:"英雄联盟手游",url:"https://szsupport.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_sOLOA2hbTHH&check_type=1",receiveUri:"NU_sOLOA2hbTHH",status:"available"},{title:"英雄联盟赛事",url:"https://szsupport.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_cYkv7SdseRA&check_type=1",receiveUri:"NU_cYkv7SdseRA",status:"available"},{title:"零跑汽车",url:"https://szsupport.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_gAKt6KP1BcP&check_type=2",receiveUri:"NU_gAKt6KP1BcP",status:"available"},{title:"风行x财运长行 全异形",url:"https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_hgemgZPYiCZ&check_type=2#wechat_redirect",receiveUri:"NU_hgemgZPYiCZ",status:"available"},{title:"Horse 成双 动态",url:"https://mp.weixin.qq.com/s/OIBv9GT6XBx1fd_LbtEQWg",status:"available"},{title:"PinkBear 皮可熊 动态好看",url:"https://mp.weixin.qq.com/s/OFhHLFk-A9lZqRRV67-JVw",status:"available"},{title:"一汽红旗 动态",url:"https://mp.weixin.qq.com/s/E-X-rg1H824LksKfAdx7WA",status:"available"},{title:"三一集团",url:"https://mp.weixin.qq.com/s/3tIjInvNeT6s5v1rwwfKRQ",status:"available"},{title:"保时捷汽车Porsche×彩色骏马",url:"https://mp.weixin.qq.com/s?__biz=Mzg4MDAzNDk3NQ==&mid=2247576310&idx=1&sn=f8d1bab755861e5a3d25a443e3422eb1&scene=21#wechat_redirect",status:"available"},{title:"可比克",url:"https://mp.weixin.qq.com/s/ahMecUBWtyfq0VjhVG1z2A",status:"available"},{title:"大众汽车×马力全开",url:"https://mp.weixin.qq.com/s?__biz=MzA3MDA0NTEzMw==&mid=2652768932&idx=1&sn=3f652f0636ad23acaf7364e29f5584c9&scene=21#wechat_redirect",status:"available"},{title:"天助",url:"https://mp.weixin.qq.com/s/B2gZzki1JHxmhnyP4oJQQg",status:"available"},{title:"小米安全",url:"https://mp.weixin.qq.com/s/nMHbyg0jui02T4R1EBdpdw",status:"available"},{title:"幸运娃娃机 动态",url:"https://mp.weixin.qq.com/s/zHk2tLRNzTM48vhs0qjW6w",status:"available"},{title:"招商 3 款",url:"https://mp.weixin.qq.com/s/Ght5vCVVy0TE1un5axAXqg",status:"available"},{title:"森歌x马上有钱 动态",url:"https://mp.weixin.qq.com/s/wyGuVJ3PLG4xn8iDUkanwQ",status:"available"},{title:"科研人 活泼风",url:"https://mp.weixin.qq.com/s/v47Dt2ySi6Zf2MOTn3R76g",status:"available"},{title:"脆脆鲨",url:"https://mp.weixin.qq.com/s/GivGqBOgVf4OdBL-fhaSCA",status:"available"},{title:"腾讯学堂xHorse发生",url:"https://mp.weixin.qq.com/s/OOPt1tCaSsFzdHBhOJm51g",status:"available"},{title:"超自然行动 3个",url:"https://mp.weixin.qq.com/s/qtn81vQkNF0wdCs7SGP_ow",status:"available"},{title:"金铲铲之战 2个",url:"https://mp.weixin.qq.com/s/ry9U2lRdv0cRIVsmE2Twug",status:"available"},{title:"醒狮熊猫游戏机 动态",url:"https://mp.weixin.qq.com/s/yzX6nvQCKJPB_RoA-VyjyA",status:"available"},{title:"驻粤办",url:"https://mp.weixin.qq.com/s/LNxXDkYTLzWbxkpRGe8nmw",status:"available"},{title:"豆本豆×喜羊羊与灰太狼",url:"https://mp.weixin.qq.com/s?__biz=MzIyNDU1MjkyNw==&mid=2247493037&idx=1&sn=c7fea410d87500e4ed9702b2bae691ed&scene=21#wechat_redirect",status:"available"},{title:"黑暗破坏神",url:"https://mp.weixin.qq.com/s/TF39ORRwU6goi1x2GfG84Q",status:"available"}],this.selectedCover=null,this.showDialog=!1,this.showToast=!1,this.isWeChat=!1}connectedCallback(){super.connectedCallback(),this.isWeChat=navigator.userAgent.toLowerCase().includes("micromessenger")}handleCoverClick(n){if(n.status!=="claimed"){if(this.isWeChat){window.location.href=n.url;return}this.selectedCover=n,this.showDialog=!0}}async copyCode(){if(this.selectedCover?.receiveUri){try{await navigator.clipboard.writeText(this.selectedCover.receiveUri)}catch{const n=document.createElement("textarea");n.value=this.selectedCover.receiveUri,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select(),document.execCommand("copy"),document.body.removeChild(n)}this.showDialog=!1,this.showToast=!0,setTimeout(()=>{this.showToast=!1},3e3)}}generateQR(n){const t=Y(0,"M");t.addData(n),t.make();const i=4,e=2,r=t.getModuleCount(),a=r*i+e*2*i;let o=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${a} ${a}">`;o+=`<rect width="${a}" height="${a}" fill="#fff"/>`;for(let s=0;s<r;s++)for(let c=0;c<r;c++)t.isDark(s,c)&&(o+=`<rect x="${(c+e)*i}" y="${(s+e)*i}" width="${i}" height="${i}"/>`);return o+="</svg>",`data:image/svg+xml;base64,${btoa(o)}`}goToArticle(){this.selectedCover&&(window.open(this.selectedCover.url,"_blank"),this.showDialog=!1)}goToRedeem(){window.open("https://support.weixin.qq.com/cgi-bin/mmsupport-bin/newreadtemplate?t=page/hongbao/exchange.html#wechat_redirect","_blank")}closeDialog(){this.showDialog=!1}render(){return D`
      <div class="page-wrapper">
        <div class="page-container">
          <!-- Semantic Header -->
          <header class="page-header" role="banner">
            <h1 class="page-title">微信红包封面领取</h1>
            <nav role="navigation" aria-label="快捷操作">
              <button
                class="redeem-btn"
                @click=${this.goToRedeem}
                aria-label="前往微信官方红包封面兑换页面"
              >
                官方兑换页
              </button>
            </nav>
          </header>

          <!-- Main Content -->
          <main role="main">
            <h2 class="sr-only">可领取的红包封面列表</h2>
            <div class="covers-grid" role="list" aria-label="红包封面列表">
              ${this.covers.map(n=>D`
                <article
                  class="cover-item ${n.status==="claimed"?"claimed":""}"
                  role="listitem"
                  @click=${()=>this.handleCoverClick(n)}
                  tabindex="0"
                  aria-label="红包封面：${n.title}${n.status==="claimed"?"（已领完）":""}"
                  @keydown=${t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.handleCoverClick(n))}}
                >
                  <div class="cover-thumbnail ${n.status==="claimed"?"claimed":""}"
                    aria-hidden="true">
                    🧧
                  </div>
                  <div class="cover-title ${n.status==="claimed"?"claimed":""}">
                    ${n.title}
                  </div>
                  ${n.status==="claimed"?D`<div class="status-badge" aria-label="已领完">已领完</div>`:""}
                  ${!n.receiveUri&&n.status!=="claimed"?D`<span class="article-badge" aria-label="需前往文章领取">需前往文章领取</span>`:""}
                </article>
              `)}
            </div>
          </main>

          <!-- Footer -->
          <footer class="page-footer" role="contentinfo">
            <p class="footer-text">
              共 ${this.covers.length} 个红包封面 · 在微信中打开可直接领取
            </p>
            <div class="footer-links">
              <a href="https://mcpplca.net"
                 target="_blank" rel="noopener noreferrer">
                官方兑换页
              </a>
            </div>
          </footer>
        </div>

        <!-- Dialog -->
        ${this.showDialog&&this.selectedCover?D`
          <div class="dialog-mask" @click=${this.closeDialog} aria-hidden="true"></div>
          <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
            <div class="dialog-header">
              <strong class="dialog-title-text" id="dialog-title">${this.selectedCover.title}</strong>
            </div>
            ${this.selectedCover.receiveUri?D`
              <!-- Code dialog -->
              <div class="dialog-body">
                <div class="dialog-qr">
                  <img src=${this.generateQR(this.selectedCover.url)} alt="扫码领取">
                </div>
                <p class="dialog-qr-tip">手机扫码直接领取</p>
                <div class="dialog-code" aria-label="序列号">${this.selectedCover.receiveUri}</div>
                <p class="dialog-tip">点击"复制序列号"后，前往官方兑换页面粘贴兑换</p>
              </div>
              <div class="dialog-footer">
                <button class="dialog-btn dialog-btn-cancel" @click=${this.closeDialog}>取消</button>
                <button class="dialog-btn dialog-btn-primary-action" @click=${this.copyCode}>复制序列号</button>
              </div>
            `:D`
              <!-- Article dialog -->
              <div class="dialog-body">
                <div class="dialog-qr">
                  <img src=${this.generateQR(this.selectedCover.url)} alt="扫码领取">
                </div>
                <p class="dialog-qr-tip">手机扫码直接领取</p>
                <p class="dialog-tip">该封面需要前往公众号文章领取，点击下方按钮跳转</p>
              </div>
              <div class="dialog-footer">
                <button class="dialog-btn dialog-btn-cancel" @click=${this.closeDialog}>取消</button>
                <button class="dialog-btn dialog-btn-primary-action" @click=${this.goToArticle}>前往领取</button>
              </div>
            `}
          </div>
        `:""}

        <!-- Toast / Success Sheet -->
        ${this.showToast?D`
          <div class="toast-mask" @click=${()=>{this.showToast=!1}}></div>
          <div class="half-screen-dialog" role="alert" aria-live="assertive">
            <div class="toast-icon" aria-hidden="true">✓</div>
            <div class="toast-title">序列号已复制</div>
            <div class="toast-desc">请前往官方兑换页面粘贴序列号进行兑换</div>
            <button class="toast-btn" @click=${this.goToRedeem}>前往兑换</button>
          </div>
        `:""}
      </div>
    `}};I.styles=zt`
    /* WeUI tokens inherited from body via Shadow DOM — no re-declaration needed */
    :host { display: block; }
    * { box-sizing: border-box; margin: 0; padding: 0; }

    /* ── Page ── */
    .page-wrapper { min-height: 100vh; background: var(--weui-BG-0); }
    .page-container { background: var(--weui-BG-3); }

    /* ── Header ── */
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: var(--weui-BG-2);
      position: sticky; top: 0; z-index: 500;
    }
    .page-header::after {
      content: ""; position: absolute; left: 0; bottom: 0; right: 0;
      height: 1px; border-bottom: 1px solid var(--weui-FG-3);
      transform-origin: 0 100%; transform: scaleY(.5);
    }
    h1.page-title {
      font-size: 17px; font-weight: 500;
      color: var(--weui-FG-0);
    }
    .redeem-btn {
      font-size: 14px; padding: 6px 12px;
      background: var(--weui-BRAND); color: #fff;
      border: none; border-radius: 6px;
      font-weight: 500; white-space: nowrap;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      position: relative;
    }
    .redeem-btn:active::before {
      content: ""; position: absolute; inset: 0;
      background: rgba(0,0,0,.1); border-radius: 6px;
    }

    /* ── Grid — outer rounded, inner squared ── */
    .covers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
      gap: .2em;
      border-radius: 12px;
      overflow: hidden;
      max-width: 1080px;
      margin: 1em auto;
      width: 90%;
    }
    @media (min-width: 480px) {
      .covers-grid { grid-template-columns: repeat(auto-fill, minmax(12em, 1fr)); }
    }
    @media (min-width: 768px) {
      .covers-grid { grid-template-columns: repeat(auto-fill, minmax(14em, 1fr)); }
    }

    /* ── Cover Item — squared, no border-radius ── */
    .cover-item {
      background: var(--weui-BG-2);
      padding: 16px 8px;
      display: flex; flex-direction: column;
      align-items: center; gap: 8px;
      min-height: 110px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      position: relative;
    }
    .cover-item:hover:not(.claimed) {
      background: linear-gradient(135deg, rgba(250,81,81,.06), rgba(250,81,81,.16)), var(--weui-BG-2);
    }
    .cover-item:active:not(.claimed) { background: var(--weui-BG-COLOR-ACTIVE); }
    .cover-item.claimed { opacity: .5; cursor: default; }

    /* ── Thumbnail — bare emoji ── */
    .cover-thumbnail {
      width: 48px; height: 48px; font-size: 36px;
      display: flex; align-items: center; justify-content: center;
      line-height: 1;
    }
    .cover-thumbnail.claimed { opacity: .5; filter: grayscale(.6); }

    /* ── Title ── */
    .cover-title {
      font-size: 12px; color: var(--weui-FG-0);
      text-align: center; line-height: 1.4;
      overflow: hidden;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-word; width: 100%;
    }
    .cover-title.claimed { color: var(--weui-FG-2); }

    /* ── Status Badge ── */
    .status-badge {
      font-size: 10px; color: var(--weui-FG-1);
      background: var(--weui-BG-3); padding: 1px 6px;
      border-radius: 8px; margin-top: auto;
    }

    /* ── Article Badge — bottom-right corner ── */
    .article-badge {
      position: absolute; right: 4px; bottom: 4px;
      font-size: 9px; line-height: 1;
      color: var(--weui-LINK); background: var(--weui-BG-3);
      padding: 2px 5px; border-radius: 4px;
      pointer-events: none;
    }

    /* ── Mask ── */
    .dialog-mask, .toast-mask {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.6); z-index: 5000;
    }

    /* ── Dialog ── */
    .dialog {
      position: fixed; z-index: 5001;
      top: 50%; left: 50%;
      transform: translate(-50%,-50%);
      background: var(--weui-BG-2);
      border-radius: 12px; overflow: hidden;
      width: 320px; max-width: calc(100% - 32px);
      text-align: center;
    }

    /* ── QR Code — desktop only ── */
    .dialog-qr {
      display: none;
      margin: 12px auto 4px;
      padding: 8px;
      background: #fff;
      border-radius: 8px;
      width: 160px; height: 160px;
    }
    .dialog-qr img {
      width: 100%; height: 100%;
      image-rendering: pixelated;
    }
    .dialog-qr-tip {
      display: none;
      font-size: 12px; color: var(--weui-FG-2);
      margin-bottom: 8px;
    }
    @media (min-width: 600px) {
      .dialog-qr, .dialog-qr-tip { display: block; }
      .dialog { width: 380px; }
    }
    .dialog-header { padding: 32px 24px 16px; }
    .dialog-title-text {
      font-size: 17px; font-weight: 700;
      color: var(--weui-FG-0);
    }
    .dialog-body {
      padding: 0 24px; margin-bottom: 32px;
      font-size: 17px; color: var(--weui-FG-1);
      word-wrap: break-word;
    }
    .dialog-code {
      background: var(--weui-BG-3); padding: 14px;
      border-radius: 8px;
      font-family: 'SF Mono', Menlo, Monaco, 'Courier New', monospace;
      font-size: 14px; color: var(--weui-FG-0);
      margin-bottom: 12px; word-break: break-all;
      user-select: all;
    }
    .dialog-tip { font-size: 14px; color: var(--weui-FG-1); }

    .dialog-footer {
      display: flex; position: relative;
    }
    .dialog-footer::before {
      content: ""; position: absolute; left: 0; top: 0; right: 0;
      height: 1px; border-top: 1px solid var(--weui-DIALOG-LINE-COLOR);
      transform-origin: 0 0; transform: scaleY(.5);
    }
    .dialog-btn {
      flex: 1; padding: 16px 0;
      font-size: 17px; font-weight: 700;
      color: var(--weui-LINK);
      border: none; background: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      position: relative;
    }
    .dialog-btn:active { background: var(--weui-BG-COLOR-ACTIVE); }
    .dialog-btn + .dialog-btn::before {
      content: ""; position: absolute; left: 0; top: 0; bottom: 0;
      width: 1px; border-left: 1px solid var(--weui-DIALOG-LINE-COLOR);
      transform-origin: 0 0; transform: scaleX(.5);
    }
    .dialog-btn-cancel { color: var(--weui-FG-1); }
    .dialog-btn-primary-action { color: var(--weui-LINK); }

    /* ── Half-Screen Dialog ── */
    .half-screen-dialog {
      position: fixed; left: 0; right: 0; bottom: 0;
      z-index: 5001; background: var(--weui-BG-2);
      border-radius: 12px 12px 0 0;
      padding: 32px 24px;
      padding-bottom: calc(32px + env(safe-area-inset-bottom, 0px));
      animation: slideUp .3s ease-out;
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .toast-icon {
      width: 48px; height: 48px; border-radius: 50%;
      background: var(--weui-BRAND); color: #fff;
      font-size: 28px; margin: 0 auto 16px;
      display: flex; align-items: center; justify-content: center;
    }
    .toast-title {
      font-size: 17px; font-weight: 700;
      color: var(--weui-FG-0); text-align: center;
      margin-bottom: 8px;
    }
    .toast-desc {
      font-size: 14px; color: var(--weui-FG-1);
      text-align: center; margin-bottom: 24px;
    }
    .toast-btn {
      display: block; width: 184px; margin: 0 auto;
      padding: 12px 24px;
      background: var(--weui-BRAND); color: #fff;
      border: none; border-radius: 8px;
      font-size: 17px; font-weight: 500;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      position: relative;
    }
    .toast-btn:active::before {
      content: ""; position: absolute; inset: 0;
      background: rgba(0,0,0,.1); border-radius: 8px;
    }

    /* ── Footer ── */
    .page-footer {
      padding: 16px 16px 32px;
      padding-bottom: calc(32px + env(safe-area-inset-bottom, 0px));
      text-align: center;
    }
    .footer-text { font-size: 12px; color: var(--weui-FG-2); }
    .footer-links { margin-top: 8px; }
    .footer-links a {
      margin: 0 8px; font-size: 14px;
      color: var(--weui-LINK); text-decoration: none;
    }
    .footer-links a:active { opacity: .5; }

    /* ── A11y ── */
    .sr-only {
      position: absolute; width: 1px; height: 1px;
      padding: 0; margin: -1px; overflow: hidden;
      clip: rect(0,0,0,0); white-space: nowrap; border: 0;
    }
  `;K([ct()],I.prototype,"covers",2);K([ct()],I.prototype,"selectedCover",2);K([ct()],I.prototype,"showDialog",2);K([ct()],I.prototype,"showToast",2);K([ct()],I.prototype,"isWeChat",2);I=K([pe("covers-app")],I);
