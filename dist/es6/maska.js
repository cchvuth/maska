/*!
 * maska v1.1.5
 * (c) 2019-2020 Alexander Shabunevich
 * Released under the MIT License.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Maska={})}(this,(function(e){"use strict";function t(e,t,s,r=!0){return n(t).length>1?function(e){const t=n(e).sort((e,t)=>e.length-t.length);return function(e,n,s,r=!0){let o=0;for(;o<t.length;){const n=t[o];o++;const i=t[o];if(!(i&&a(e,i,s,!0).length>n.length))return a(e,n,s,r)}return""}}(t)(e,t,s,r):a(e,t,s,r)}function n(e){try{return JSON.parse(e)}catch{return[e]}}function a(e,t,n,a=!0){let r=0,o=0,i="",u="";for(;r<t.length&&o<e.length;){let u=t[r];const l=e[o],c=n[u];if(c&&c.pattern)c.pattern.test(l)&&(i+=s(l,c),r++),o++;else if(c&&c.repeat){const e=n[t[r-1]];e&&!e.pattern.test(l)?r++:r--}else c&&c.escape&&(r++,u=t[r]),a&&(i+=u),l===u&&o++,r++}for(;a&&r<t.length;){const e=t[r];if(n[e]){u="";break}u+=e,r++}return i+u}function s(e,t){return t.uppercase?e.toLocaleUpperCase():t.lowercase?e.toLocaleLowerCase():e}var r={"#":{pattern:/[0-9]/},X:{pattern:/[0-9a-zA-Z]/},S:{pattern:/[a-zA-Z]/},A:{pattern:/[a-zA-Z]/,uppercase:!0},a:{pattern:/[a-zA-Z]/,lowercase:!0},"!":{escape:!0},"*":{repeat:!0}};function o(e){return e instanceof HTMLInputElement?e:e.querySelector("input")||e}function i(e){return"[object String]"===Object.prototype.toString.call(e)}class u{constructor(e,t={}){if(!e)throw new Error("Maska: no element for mask");if(t.tokens)for(const e in t.tokens)t.tokens[e]={...t.tokens[e]},t.tokens[e].pattern&&i(t.tokens[e].pattern)&&(t.tokens[e].pattern=new RegExp(t.tokens[e].pattern));this._opts={mask:t.mask,tokens:{...r,...t.tokens}},this._el=i(e)?document.querySelectorAll(e):e.length?e:[e],this.init()}init(){for(let e=0;e<this._el.length;e++){const t=o(this._el[e]);!this._opts.mask||t.dataset.mask&&t.dataset.mask===this._opts.mask||(t.dataset.mask=this._opts.mask),this.updateValue(t),t.dataset.maskInited||(t.dataset.maskInited=!0,t.addEventListener("input",e=>this.updateValue(e.target)),t.addEventListener("beforeinput",e=>this.beforeInput(e)))}}destroy(){for(let e=0;e<this._el.length;e++){const t=o(this._el[e]);t.removeEventListener("input",e=>this.updateValue(e.target)),t.removeEventListener("beforeinput",e=>this.beforeInput(e)),delete t.dataset.mask,delete t.dataset.maskInited}}updateValue(e){const n=e.type.match(/^number$/i)&&e.validity.badInput;if(!e.value&&!n||!e.dataset.mask)return;const a=e.selectionEnd,s=e.value,r=s[a-1];e.value=t(e.value,e.dataset.mask,this._opts.tokens),function(e,t,n){for(;t<e.value.length&&e.value.charAt(t-1)!==n;)t++;(e.type&&e.type.match(/^(text|search|password|tel|url)$/i)||!e.type)&&e===document.activeElement&&(e.setSelectionRange(t,t),setTimeout((function(){e.setSelectionRange(t,t)}),0))}(e,a,r),e.value!==s&&e.dispatchEvent(function(e){const t=document.createEvent("Event");return t.initEvent(e,!0,!0),t}("input"))}beforeInput(e){e.target.type.match(/^number$/i)&&e.data&&isNaN(e.target.value+e.data)&&e.preventDefault()}}function l(e,t){if(t.value)return t.value&&function(e){return!(i(e.value)&&e.value===e.oldValue||Array.isArray(e.value)&&JSON.stringify(e.value)===JSON.stringify(e.oldValue)||e.value&&e.value.mask&&e.oldValue&&e.oldValue.mask&&e.value.mask===e.oldValue.mask)}(t)?new u(e,function(e){const t={};return e.mask?(t.mask=Array.isArray(e.mask)?JSON.stringify(e.mask):e.mask,t.tokens=e.tokens?{...e.tokens}:{}):t.mask=Array.isArray(e)?JSON.stringify(e):e,t}(t.value)):void 0}function c(e){e.directive("maska",l)}"undefined"!=typeof window&&window.Vue&&window.Vue.use(c),e.create=function(e,t){return new u(e,t)},e.default=c,e.mask=t,e.maska=l,e.tokens=r,Object.defineProperty(e,"__esModule",{value:!0})}));
