(self.webpackChunkskyplus_container_app=self.webpackChunkskyplus_container_app||[]).push([[5833,6252,3555,3649],{6252:function(e,t,n){"use strict";n.r(t);var o=n(8416),r=n.n(o),a=n(5697),i=n.n(a),c=n(3649);function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,a,i,c=[],l=!0,p=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;l=!1}else for(;!(l=(o=a.call(n)).done)&&(c.push(o.value),c.length!==t);l=!0);}catch(e){p=!0,r=e}finally{try{if(!l&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(p)throw r}}return c}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var s=function(e){var t=e.label,n=e.className,a=e.children,i=e.open,p=e.variation,s=void 0===p?"top":p,u=e.disableFullHeight,d=void 0!==u&&u,m=e.onClose,f=e.hideHead,y=void 0!==f&&f,b="Dialog-wrapper "+(void 0!==n?n:""),h=l((0,o.useState)((function(){return i||!1})),2),_=h[0],v=h[1];return(0,o.useEffect)((function(){v(i),i?document.body.classList.add("scroll-is-disable-for-dialog"):document.body.classList.remove("scroll-is-disable-for-dialog")}),[i]),(0,o.useEffect)((function(){return function(){document.body.classList.remove("scroll-is-disable-for-dialog")}}),[]),_?r().createElement(c.OverlayWrapperSd,{className:"popup-modal-with-content-container-app__container popup-dialog-box "+(b||"")+" "+(s?"popup-modal-with-content-container-app__direction-"+s:"")},r().createElement("div",{className:"popup-modal-with-content-container-app__box"},r().createElement("div",{className:"popup-modal-with-content-container-app__bg-overlay"},r().createElement("div",{className:"popup-modal-with-content-container-app__content "+(d?"height-adaptable":"")},r().createElement("div",{className:"popup-modal-with-content-container-app__content-container"},!y&&r().createElement("div",{className:"popup-modal-with-content-container-app__header"},r().createElement("button",{className:"popup-modal-with-content-container-app__close-overlay-button",onClick:function(){v(!1),m(!1),document.body.classList.remove("scroll-is-disable-for-dialog")}},r().createElement("i",{className:"popup-modal-with-content-container-app__close-overlay-button__icon skp-iconmoon-icon popup-modal-with-content-container-app__close-overlay-button__icon--close"})),r().createElement("h3",{className:"popup-modal-with-content-container-app__header__title visibility-hidden"})),t&&r().createElement("div",{className:"popup-modal-with-content-container-app__label"},t),r().createElement("div",{className:"popup-modal-with-content-container-app__body"},a)))))):r().createElement(o.Fragment,null)};s.propTypes={label:i().string,className:i().string,variation:i().string,open:i().bool,hideHead:i().bool,onClose:i().func},t.default=s},5833:function(e,t,n){"use strict";n.r(t),n.d(t,{DialogBoxHurryupWrapper:function(){return o.default}});var o=n(6252)},3555:function(e,t,n){"use strict";n.r(t);var o=n(8416),r=n.n(o),a=n(1051),i=n(5697),c=function(e){var t=e.className,n=e.children;return(0,a.createPortal)(r().createElement("div",{className:"indigo-overlay-wrapper-container-app "+t},n),document.body)};c.propTypes={className:n.n(i)().string},t.default=c},3649:function(e,t,n){"use strict";n.r(t),n.d(t,{OverlayWrapperSd:function(){return o.default}});var o=n(3555)},2703:function(e,t,n){"use strict";var o=n(414);function r(){}function a(){}a.resetWarningCache=r,e.exports=function(){function e(e,t,n,r,a,i){if(i!==o){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:r};return n.PropTypes=n,n}},5697:function(e,t,n){e.exports=n(2703)()},414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);