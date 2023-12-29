export const getIconClass = (str) =>
  str && str.length
    ? str.indexOf("/") > 0
      ? str.substring(str.lastIndexOf("/") + 1)
      : str
    : str;

export const addHTMLExtension = (str) =>
  str && str.length ? (str.indexOf(".html") >= 0 ? str : `${str}.html`) : str;

const convertZuluToSplitted = (date, isUtcRequired) => {
  let dateOut = new Date(date);
  try {
    let obj = {
      dd: isUtcRequired ? dateOut.getUTCDate() : dateOut.getDate(),
      mm: isUtcRequired ? dateOut.getUTCMonth() : dateOut.getMonth(),
      yyyy: isUtcRequired ? dateOut.getUTCFullYear() : dateOut.getFullYear(),
      timehh: isUtcRequired ? dateOut.getUTCHours() : dateOut.getHours(),
      timemm: isUtcRequired ? dateOut.getUTCMinutes() : dateOut.getMinutes(),
      timesec: isUtcRequired ? dateOut.getUTCSeconds() : dateOut.getSeconds(),
      day: isUtcRequired ? dateOut.getUTCDay() : dateOut.getDay(),
    };
    obj.dd = obj.dd >= 10 ? obj.dd : `0${obj.dd}`;
    obj.mm = obj.mm >= 10 ? obj.mm : `0${obj.mm}`;
    obj.timehh = obj.timehh >= 10 ? obj.timehh : `0${obj.timehh}`;
    obj.timemm = obj.timemm >= 10 ? obj.timemm : `0${obj.timemm}`;
    obj.timesec = obj.timesec >= 10 ? obj.timesec : `0${obj.timesec}`;
    return { ...obj };
  } catch (error) {
    console.log(error);
    return {};
  }
};
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const UTIL_CONSTANTS = {
  DAY_MONTH: "D MMMM",
  DAY_SLASH_MONTH: "DD/MMMM"
}
const formatDate = (date, format, isUTCTimeRequired) => {
  try {
    const { dd, mm, yyyy, timehh, timemm, day, timesec } = convertZuluToSplitted(
      date,
      isUTCTimeRequired
    );
    const monthStr = monthNames[Number(mm)]
      ? monthNames[Number(mm)].slice(0, 3)
      : "";
    const monthNumber = String(Number(mm) + 1).padStart(2, "0");
    const dayStr = days[Number(day)] ? days[Number(day)].slice(0, 3) : "";
    switch (format) {
      case UTIL_CONSTANTS.DAY_MONTH:
        return `${dd} ${monthNames[Number(mm)]}`
      case UTIL_CONSTANTS.DAY_SLASH_MONTH:
        return `${dd}/${monthNames[Number(mm)]}`
      default:
        return date;
    }
  } catch (error) {
    console.log("-date:::", error);
    return "";
  }
};


export {
  formatDate,
  UTIL_CONSTANTS
}