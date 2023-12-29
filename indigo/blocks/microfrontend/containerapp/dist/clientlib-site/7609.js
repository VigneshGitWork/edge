/*! For license information please see 7609.js.LICENSE.txt */
"use strict";(self.webpackChunkskyplus_container_app=self.webpackChunkskyplus_container_app||[]).push([[7609,8415],{8415:function(t,e,r){r.r(e),r.d(e,{isValidURL:function(){return s},pushAnalytic:function(){return p}});var n=r(8354),o=r(9444);function a(){a=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},c=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",l=i.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,r){return t[e]=r}}function p(t,e,r,n){var a=e&&e.prototype instanceof m?e:m,i=Object.create(a.prototype),c=new C(n||[]);return o(i,"_invoke",{value:j(t,r,c)}),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=p;var h="suspendedStart",d="suspendedYield",v="executing",y="completed",g={};function m(){}function w(){}function b(){}var k={};s(k,c,(function(){return this}));var L=Object.getPrototypeOf,x=L&&L(L(S([])));x&&x!==r&&n.call(x,c)&&(k=x);var E=b.prototype=m.prototype=Object.create(k);function _(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){function r(o,a,i,c){var u=f(t[o],t,a);if("throw"!==u.type){var l=u.arg,s=l.value;return s&&"object"==typeof s&&n.call(s,"__await")?e.resolve(s.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(s).then((function(t){l.value=t,i(l)}),(function(t){return r("throw",t,i,c)}))}c(u.arg)}var a;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return a=a?a.then(o,o):o()}})}function j(e,r,n){var o=h;return function(a,i){if(o===v)throw new Error("Generator is already running");if(o===y){if("throw"===a)throw i;return{value:t,done:!0}}for(n.method=a,n.arg=i;;){var c=n.delegate;if(c){var u=I(c,n);if(u){if(u===g)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===h)throw o=y,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=v;var l=f(e,r,n);if("normal"===l.type){if(o=n.done?y:d,l.arg===g)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=y,n.method="throw",n.arg=l.arg)}}}function I(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,I(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var a=f(o,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,g;var i=a.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,g):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function T(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function C(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function S(e){if(e||""===e){var r=e[c];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError(typeof e+" is not iterable")}return w.prototype=b,o(E,"constructor",{value:b,configurable:!0}),o(b,"constructor",{value:w,configurable:!0}),w.displayName=s(b,l,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,s(t,l,"GeneratorFunction")),t.prototype=Object.create(E),t},e.awrap=function(t){return{__await:t}},_(O.prototype),s(O.prototype,u,(function(){return this})),e.AsyncIterator=O,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new O(p(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},_(E),s(E,l,"Generator"),s(E,c,(function(){return this})),s(E,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=S,C.prototype={constructor:C,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(P),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(u&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),P(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;P(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:S(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),g}},e}function i(t){if(null==t)throw new TypeError("Cannot destructure "+t)}function c(){return c=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},c.apply(this,arguments)}function u(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}var l=function(t){return t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")},s=function(t){return!!new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i").test(t)},p=function(){var t,e=(t=a().mark((function t(e){var r,u,s,p,f,h,d,v,y,g,m,w,b,k,L,x,E,_,O;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=c({},(i(e),e)),u=r.state,s=r.event,p=r.ele,f=r.error,h=void 0===f?{}:f,d=r.isLoaded,v=void 0!==d&&d,y=r.data,g=void 0===y?{}:y,m={},w=null==p?void 0:p.href,b="Social",k="",w&&(L=new URL(w),x=L.hostname,E=new RegExp(["www.",".com",".in"].map(l).join("|"),"g"),"play.google"===(k=x.replace(E,(function(t){return"''"})))&&(k="playstore",b="Download"),"itunes.apple"===k&&(k="appstore",b="Download")),_=null==p?void 0:p.attr("href"),O=(null==p?void 0:p.next().attr("alt"))||"",t.t0=s,t.next="bannerClick"===t.t0?12:"footerSocialClick"===t.t0?14:"bookingMFDataLoad"===t.t0?16:"pageload"===t.t0?18:"error"===t.t0?20:"skyplus-card-click"===t.t0?22:"deeplink-page-click"===t.t0?24:"deeplink-page-popup"===t.t0?26:28;break;case 12:return m={event:"click",interactionType:"Link/ButtonClick",page:{eventInfo:{name:O,position:"",component:"Banner",outboundLinkName:O,outboundLinkURL:_},pageInfo:{banner:{name:O,url:_}}}},t.abrupt("break",28);case 14:return m={event:"click",interactionType:"Link/ButtonClick",page:{eventInfo:{name:k,position:b,component:"Footer",outboundLinkName:k,outboundLinkURL:w}}},t.abrupt("break",28);case 16:return m={event:"error",interactionType:"component load",page:{error:{id:(null==h?void 0:h.code)||"",text:(null==h?void 0:h.message)||""},pageInfo:{siteSection:"Homepage",bookingWidgetDataLoaded:v?"1":""}}},t.abrupt("break",28);case 18:return m={event:s,interactionType:"pageload",page:{error:{id:(null==h?void 0:h.code)||"",text:(null==h?void 0:h.message)||""}}},t.abrupt("break",28);case 20:return m={event:s,interactionType:"error",page:{error:Object.assign({},h,{id:(null==h?void 0:h.code)||"",code:(null==h?void 0:h.code)||"",type:o.TYPE[null==h?void 0:h.type]||"",source:o.SOURCE[null==h?void 0:h.source]||"",apiURL:(null==h?void 0:h.url)||"",statusCode:(null==h?void 0:h.statusCode)||"",statusMessage:(null==h?void 0:h.statusMessage)||"",displayMessage:(null==h?void 0:h.message)||""}),pageInfo:{siteSection:"Homepage"}}},t.abrupt("break",28);case 22:case 24:return m={event:"click",interactionType:"Link/ButtonClick",page:{pageInfo:g.pageInfo,eventInfo:g.eventInfo}},t.abrupt("break",28);case 26:return m={event:"click",interactionType:"Pop Up shown",page:{pageInfo:g.pageInfo,eventInfo:g.eventInfo,product:g.product}},t.abrupt("break",28);case 28:(0,n.adobeAnalytic)({state:u,commonInfo:{},eventProps:m});case 29:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){u(a,n,o,i,c,"next",t)}function c(t){u(a,n,o,i,c,"throw",t)}i(void 0)}))});return function(t){return e.apply(this,arguments)}}()}}]);