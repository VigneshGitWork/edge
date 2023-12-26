export default {
  addListener: function (el, customEvent, cb) {
    return el.addEventListener(customEvent, cb);
  },
  removeListener: function (el, customEvent, cb) {
    return el.removeEventListener(customEvent, cb);
  },
  dispatch: function (el, customEvent, data) {
    el.dispatchEvent(customEvent(data));
  },
  create: function (customEventType, data) {
    return new CustomEvent(customEventType, data);
  },
};
