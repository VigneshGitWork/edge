export const getIconClass = (str) =>
  str && str.length
    ? str.indexOf("/") > 0
      ? str.substring(str.lastIndexOf("/") + 1)
      : str
    : str;

export const addHTMLExtension = (str) =>
  str && str.length ? (str.indexOf(".html") >= 0 ? str : `${str}.html`) : str;
