/*! For license information please see 5612.js.LICENSE.txt */
"use strict";(self.webpackChunkskyplus_container_app=self.webpackChunkskyplus_container_app||[]).push([[5612,674],{674:function(t,e,n){var r,o;n.r(e),n.d(e,{AGENT_LOGOUT_OLD:function(){return E},ANONYMOUS:function(){return k},ANONYMOUS_USER_BODY:function(){return L},BASE_API_URL:function(){return f},BASE_API_URL_OLD:function(){return d},BOOKING_BASE_URL:function(){return g},CONTENT_TYPE_HEADER:function(){return h},CREATE_SESSION_API_ENDPOINT:function(){return i},CURRENCY_API:function(){return y},GENERIC_TOAST_MESSAGE_EVENT:function(){return w},GET_SESSION_API_ENDPOINT:function(){return c},KEEP_ALIVE_AUTH_TOKEN:function(){return a},KEEP_ALIVE_AUTH_TOKEN_OLD:function(){return s},LOGIN_SUCCESS:function(){return A},LOGOUT_SESSION_API_ENDPOINT:function(){return u},MAIN_LOADER_EVENT:function(){return N},MEMBER_LOGOUT_OLD:function(){return p},MS_BW_USER_KEY:function(){return m},SUB_BASE_API_URL_OLD:function(){return _},SUB_DOMAIN:function(){return v},TOGGLE_LOGIN_POPUP:function(){return S},WIDGET_API:function(){return T},dotRezAgentroleCk:function(){return P},dotRezLoginCk:function(){return I},dotRezUserCurrencyCk:function(){return U}});var i="/v1/token/create",u="/v1/token/delete",a="/v1/token/refresh",c="/v1/token/get",s="/Application/Blank",l=window._env_login,f=null==l?void 0:l.BASE_API_URL,h=null==l?void 0:l.CONTENT_TYPE_HEADER,d=null==l?void 0:l.BASE_API_URL_OLD,_=null==l?void 0:l.SUB_BASE_API_URL_OLD,p=(null==l||l.MEMBER_LOGIN_OLD,null==l||l.AGENT_LOGIN_OLD,null==l||l.CAPF_LOGIN_OLD,null==l?void 0:l.MEMBER_LOGOUT_OLD),E=null==l?void 0:l.AGENT_LOGOUT_OLD,v=null==l?void 0:l.SUB_DOMAIN,O=null==l?void 0:l.SUBSCRIPTION,g=null===(r=window.msd)||void 0===r?void 0:r.msBookingApiUrl,y="/v1/setting/getcurrency",T="/v1/setting/indigowidgets",m=null===(o=window.msd)||void 0===o?void 0:o.msBookingUserKey,L={strToken:"",subscriptionKey:O},A="loginSuccessEvent",S="toggleLoginPopupEvent",w="genericToastMessageEvent",N="mainLoaderEvent",I="aemLoginStatus",P="aemOrgRole",U="aemOrgCurrency",k="Anonymous"},5612:function(t,e,n){n.r(e),n.d(e,{addExpirationDataToToken:function(){return w},anonymousUserToken:function(){return A},deleteBrowserCookie:function(){return I},getUserToken:function(){return m},getUserTokenOld:function(){return L},isTokenExpired:function(){return N},oldLogoutHandler:function(){return P},refreshAccessToken:function(){return S}});var r=n(674),o=n(1257),i=n(9313),u=n(475);function a(){a=function(){return e};var t,e={},n=Object.prototype,r=n.hasOwnProperty,o=Object.defineProperty||function(t,e,n){t[e]=n.value},i="function"==typeof Symbol?Symbol:{},u=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,n){return t[e]=n}}function f(t,e,n,r){var i=e&&e.prototype instanceof O?e:O,u=Object.create(i.prototype),a=new k(r||[]);return o(u,"_invoke",{value:N(t,n,a)}),u}function h(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=f;var d="suspendedStart",_="suspendedYield",p="executing",E="completed",v={};function O(){}function g(){}function y(){}var T={};l(T,u,(function(){return this}));var m=Object.getPrototypeOf,L=m&&m(m(R([])));L&&L!==n&&r.call(L,u)&&(T=L);var A=y.prototype=O.prototype=Object.create(T);function S(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function n(o,i,u,a){var c=h(t[o],t,i);if("throw"!==c.type){var s=c.arg,l=s.value;return l&&"object"==typeof l&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,u,a)}),(function(t){n("throw",t,u,a)})):e.resolve(l).then((function(t){s.value=t,u(s)}),(function(t){return n("throw",t,u,a)}))}a(c.arg)}var i;o(this,"_invoke",{value:function(t,r){function o(){return new e((function(e,o){n(t,r,e,o)}))}return i=i?i.then(o,o):o()}})}function N(e,n,r){var o=d;return function(i,u){if(o===p)throw new Error("Generator is already running");if(o===E){if("throw"===i)throw u;return{value:t,done:!0}}for(r.method=i,r.arg=u;;){var a=r.delegate;if(a){var c=I(a,r);if(c){if(c===v)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===d)throw o=E,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=p;var s=h(e,n,r);if("normal"===s.type){if(o=r.done?E:_,s.arg===v)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(o=E,r.method="throw",r.arg=s.arg)}}}function I(e,n){var r=n.method,o=e.iterator[r];if(o===t)return n.delegate=null,"throw"===r&&e.iterator.return&&(n.method="return",n.arg=t,I(e,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),v;var i=h(o,e.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,v;var u=i.arg;return u?u.done?(n[e.resultName]=u.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,v):u:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,v)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function U(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function R(e){if(e||""===e){var n=e[u];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function n(){for(;++o<e.length;)if(r.call(e,o))return n.value=e[o],n.done=!1,n;return n.value=t,n.done=!0,n};return i.next=i}}throw new TypeError(typeof e+" is not iterable")}return g.prototype=y,o(A,"constructor",{value:y,configurable:!0}),o(y,"constructor",{value:g,configurable:!0}),g.displayName=l(y,s,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,l(t,s,"GeneratorFunction")),t.prototype=Object.create(A),t},e.awrap=function(t){return{__await:t}},S(w.prototype),l(w.prototype,c,(function(){return this})),e.AsyncIterator=w,e.async=function(t,n,r,o,i){void 0===i&&(i=Promise);var u=new w(f(t,n,r,o),i);return e.isGeneratorFunction(n)?u:u.next().then((function(t){return t.done?t.value:u.next()}))},S(A),l(A,s,"Generator"),l(A,u,(function(){return this})),l(A,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},e.values=R,k.prototype={constructor:k,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(U),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function o(r,o){return a.type="throw",a.arg=e,n.next=r,o&&(n.method="next",n.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var u=this.tryEntries[i],a=u.completion;if("root"===u.tryLoc)return o("end");if(u.tryLoc<=this.prev){var c=r.call(u,"catchLoc"),s=r.call(u,"finallyLoc");if(c&&s){if(this.prev<u.catchLoc)return o(u.catchLoc,!0);if(this.prev<u.finallyLoc)return o(u.finallyLoc)}else if(c){if(this.prev<u.catchLoc)return o(u.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<u.finallyLoc)return o(u.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var u=i?i.completion:{};return u.type=t,u.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(u)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),U(n),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;U(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:R(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),v}},e}function c(t,e,n,r,o,i,u){try{var a=t[i](u),c=a.value}catch(t){return void n(t)}a.done?e(c):Promise.resolve(c).then(r,o)}function s(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function u(t){c(i,r,o,u,a,"next",t)}function a(t){c(i,r,o,u,a,"throw",t)}u(void 0)}))}}var l=r.BASE_API_URL,f=r.CONTENT_TYPE_HEADER,h=r.ANONYMOUS_USER_BODY,d=r.KEEP_ALIVE_AUTH_TOKEN,_=r.CREATE_SESSION_API_ENDPOINT,p=r.dotRezAgentroleCk,E=r.dotRezUserCurrencyCk,v=r.BASE_API_URL_OLD,O=r.SUB_BASE_API_URL_OLD,g=r.SUB_DOMAIN,y=r.MEMBER_LOGOUT_OLD,T=r.AGENT_LOGOUT_OLD,m=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0,o=null;if(e&&"anonymous"!==e){if(!n||!r)throw new Error("username or password is missing for "+e+" user.");o=function(t){var e=t.username,n=void 0===e?"":e,r=t.password,o=void 0===r?"":r,i=t.userType;return Object.assign({nskTokenRequest:{applicationName:"SkyplusWeb",credentials:{domain:"WW2",location:"WWW",channelType:"Web",password:o,username:n,alternateIdentifier:""}},usertype:i},h)}({userType:e,username:n,password:r})}else o=t.ANONYMOUS_USER_BODY;return fetch(""+t.BASE_API_URL+t.CREATE_SESSION_API_ENDPOINT,{method:"POST",body:JSON.stringify(o),headers:f})},L=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0,n=function(t,e,n){switch(t){case"Agent":return{"agentLogin.Username":e,"agentLogin.Password":n,isEncrypred:!0};case"Member":return{};default:return null}}(e,arguments.length>2?arguments[2]:void 0,arguments.length>3?arguments[3]:void 0);if(!n)throw new Error("Please proivde a valid usertype");var r=""+t.BASE_API_URL_OLD+t.LOGIN_API_ENDPOINT_OLD.replace("--1--",e);return fetch(r,{method:"POST",body:JSON.stringify(n),headers:t.CONTENT_TYPE_HEADER})},A=function(){var t=Object.assign({},f);return m({ANONYMOUS_USER_BODY:h,BASE_API_URL:l,CREATE_SESSION_API_ENDPOINT:_,anonymousApiHeaders:t},"")},S=function(){var t=s(a().mark((function t(e){var n,r,i,u,c,s;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("authToken: ",e),e&&e.token){t.next=3;break}return t.abrupt("return",null);case 3:return n=""+l+d,t.next=6,o.Z.put(n,null,{headers:{Authorization:e.token,"Content-Type":"application/json"}});case 6:return r=t.sent,i=r.errors,u=r.data,c=r.status,s=r.statusText,t.abrupt("return",Object.assign({},u,{status:c,statusText:s,errors:i,token:e.token}));case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),w=function(t){if(!t||!t.token||!t.idleTimeoutInMinutes)throw new Error("ADD_EXPIRATION_INFO_TO_THE_TOKEN: Invalid token object, required information is missing",t);var e=t.token,n=t.idleTimeoutInMinutes,r=(new Date).getTime(),o=60*+n*1e3;return{token:e,createdAtMilliSeconds:r,expiresInMilliSeconds:o,validTillMilliSeconds:r+o}},N=function(t){if(!(t&&t.createdAtMilliSeconds&&t.expiresInMilliSeconds&&t.validTillMilliSeconds))throw new Error("CHECK_TOKEN_EXPIRATION: Invalid token object, required information is missing",t);return t.validTillMilliSeconds<=(new Date).getTime()},I=function(t,e,n){document.cookie=encodeURIComponent(t)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:"")+(e?"; path="+e:"")},P=function(){var t=s(a().mark((function t(e){var n,r,o,c;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n="",n="Member"===e||"member"===e?""+v+O+y:""+v+O+T,console.log("logout_url",n),r={"Content-type":"application/x-www-form-urlencoded; text/html; charset=UTF-8"},t.prev=4,t.next=7,fetch(n,{method:"GET",mode:"cors",redirect:"follow",credentials:"include",headers:r,body:null});case 7:return o=t.sent,t.next=10,o.json();case 10:null!=(c=t.sent)&&c.statusText&&(i.default.get(u.COOKIE_KEYS.PERSONA_TYPE)&&I(u.COOKIE_KEYS.PERSONA_TYPE,"/",""),i.default.get(u.COOKIE_KEYS.ROLE)&&I(u.COOKIE_KEYS.ROLE,"/",g),i.default.get(p)&&I(p,"/",g),i.default.get(E)&&I(E,"/",g)),t.next=17;break;case 14:return t.prev=14,t.t0=t.catch(4),t.abrupt("return",Promise.reject(t.t0));case 17:case"end":return t.stop()}}),t,null,[[4,14]])})));return function(e){return t.apply(this,arguments)}}()}}]);