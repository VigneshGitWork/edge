/*! For license information please see 6043.js.LICENSE.txt */
(self.webpackChunkskyplus_container_app=self.webpackChunkskyplus_container_app||[]).push([[6043,3074,8731,852],{5285:function(t,r,e){"use strict";e.r(r);var n=e(1257),o=e(9313),i=e(5612),a=e(475);function c(){c=function(){return r};var t,r={},e=Object.prototype,n=e.hasOwnProperty,o=Object.defineProperty||function(t,r,e){t[r]=e.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",f=i.toStringTag||"@@toStringTag";function s(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{s({},"")}catch(t){s=function(t,r,e){return t[r]=e}}function l(t,r,e,n){var i=r&&r.prototype instanceof m?r:m,a=Object.create(i.prototype),c=new N(n||[]);return o(a,"_invoke",{value:O(t,e,c)}),a}function h(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}r.wrap=l;var p="suspendedStart",v="suspendedYield",y="executing",d="completed",g={};function m(){}function w(){}function b(){}var x={};s(x,a,(function(){return this}));var E=Object.getPrototypeOf,L=E&&E(E(F([])));L&&L!==e&&n.call(L,a)&&(x=L);var k=b.prototype=m.prototype=Object.create(x);function _(t){["next","throw","return"].forEach((function(r){s(t,r,(function(t){return this._invoke(r,t)}))}))}function S(t,r){function e(o,i,a,c){var u=h(t[o],t,i);if("throw"!==u.type){var f=u.arg,s=f.value;return s&&"object"==typeof s&&n.call(s,"__await")?r.resolve(s.__await).then((function(t){e("next",t,a,c)}),(function(t){e("throw",t,a,c)})):r.resolve(s).then((function(t){f.value=t,a(f)}),(function(t){return e("throw",t,a,c)}))}c(u.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new r((function(r,o){e(t,n,r,o)}))}return i=i?i.then(o,o):o()}})}function O(r,e,n){var o=p;return function(i,a){if(o===y)throw new Error("Generator is already running");if(o===d){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=T(c,n);if(u){if(u===g)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===p)throw o=d,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=y;var f=h(r,e,n);if("normal"===f.type){if(o=n.done?d:v,f.arg===g)continue;return{value:f.arg,done:n.done}}"throw"===f.type&&(o=d,n.method="throw",n.arg=f.arg)}}}function T(r,e){var n=e.method,o=r.iterator[n];if(o===t)return e.delegate=null,"throw"===n&&r.iterator.return&&(e.method="return",e.arg=t,T(r,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var i=h(o,r.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,g;var a=i.arg;return a?a.done?(e[r.resultName]=a.value,e.next=r.nextLoc,"return"!==e.method&&(e.method="next",e.arg=t),e.delegate=null,g):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,g)}function j(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function A(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function F(r){if(r||""===r){var e=r[a];if(e)return e.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var o=-1,i=function e(){for(;++o<r.length;)if(n.call(r,o))return e.value=r[o],e.done=!1,e;return e.value=t,e.done=!0,e};return i.next=i}}throw new TypeError(typeof r+" is not iterable")}return w.prototype=b,o(k,"constructor",{value:b,configurable:!0}),o(b,"constructor",{value:w,configurable:!0}),w.displayName=s(b,f,"GeneratorFunction"),r.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===w||"GeneratorFunction"===(r.displayName||r.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,s(t,f,"GeneratorFunction")),t.prototype=Object.create(k),t},r.awrap=function(t){return{__await:t}},_(S.prototype),s(S.prototype,u,(function(){return this})),r.AsyncIterator=S,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise);var a=new S(l(t,e,n,o),i);return r.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},_(k),s(k,f,"Generator"),s(k,a,(function(){return this})),s(k,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=F,N.prototype={constructor:N,reset:function(r){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(A),!r)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var e=this;function o(n,o){return c.type="throw",c.arg=r,e.next=n,o&&(e.method="next",e.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),f=n.call(a,"finallyLoc");if(u&&f){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!f)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),g},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),A(e),g}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;A(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(r,e,n){return this.delegate={iterator:F(r),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=t),g}},r}function u(t,r,e,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}function f(t){return function(){var r=this,e=arguments;return new Promise((function(n,o){var i=t.apply(r,e);function a(t){u(i,n,o,a,c,"next",t)}function c(t){u(i,n,o,a,c,"throw",t)}a(void 0)}))}}var s=n.Z.create();s.interceptors.request.use(function(){var t=f(c().mark((function t(r){return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",r);case 1:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}()),s.interceptors.response.use((function(t){return t}),function(){var t=f(c().mark((function t(r){var e,n,u;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=r.config,401!==r.response.status||e.__retry){t.next=17;break}return e.__retry=!0,t.next=5,(0,i.refreshAccessToken)();case 5:if(n=t.sent,u=null,!n||!n.token){t.next=11;break}u=(0,i.addExpirationDataToToken)(n),t.next=12;break;case 11:case 16:throw new Error("Interceptor: Call to refresh the access token failed.");case 12:if(!u.token||!u.validTillMilliSeconds){t.next=16;break}o.default.set(a.COOKIE_KEYS.AUTH,u),t.next=17;break;case 17:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())},9313:function(t,r,e){"use strict";e.r(r);var n=e(5410);function o(t,r){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!e){if(Array.isArray(t)||(e=function(t,r){if(!t)return;if("string"==typeof t)return i(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return i(t,r)}(t))||r&&t&&"number"==typeof t.length){e&&(t=e);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,u=!1;return{s:function(){e=e.call(t)},n:function(){var t=e.next();return c=t.done,t},e:function(t){u=!0,a=t},f:function(){try{c||null==e.return||e.return()}finally{if(u)throw a}}}}function i(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}var a={get:function(){var t,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")+"=",a=o(document.cookie.split(";"));try{for(a.s();!(t=a.n()).done;){for(var c=t.value;" "==c.charAt(0);)c=c.substring(1,c.length);if(0===c.indexOf(i)){var u=c.substring(i.length,c.length);return e&&(u=(0,n.decryptAESForLogin)(u)),r?JSON.parse(u):u}}}catch(t){a.e(t)}finally{a.f()}},remove:function(t){var r=a.get(t);return document.cookie=t+"=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;",r},set:function(t,r,e,o){var i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],a="",c="";if(o){var u=new Date;u.setTime(u.getTime()+o),a="; expires="+u.toUTCString()}console.log("expires: ",a),e&&(c="; domain="+e);var f=JSON.stringify(r);i&&(f=(0,n.encryptAESForLogin)(f)),document.cookie=t+"="+f+a+c+";path=/"}};r.default=a},5410:function(t,r,e){"use strict";e.r(r),e.d(r,{decryptAESForLogin:function(){return v},encryptAESForLogin:function(){return p}});var n,o,i=e(5743),a=e.n(i),c=e(4242),u=e.n(c),f=e(5957),s=e.n(f),l=e(452),h=(null===(n=window)||void 0===n||null===(o=n.msd)||void 0===o?void 0:o.encryptionKey)||"b14ca5898a4e4133bbce2ea2315a1916",p=function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:h;r=(0,i.parse)(r);var e=(0,i.parse)(r);return(0,l.encrypt)(t,r,{iv:e,mode:u(),padding:s()}).toString()},v=function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:h;r=(0,i.parse)(r);var e=(0,i.parse)(r);return(0,l.decrypt)(t,r,{iv:e,mode:u(),padding:s()}).toString(a())}},2480:function(){}}]);