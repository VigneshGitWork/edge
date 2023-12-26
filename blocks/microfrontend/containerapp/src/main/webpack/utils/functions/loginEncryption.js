import * as CryptoJS from "crypto-js";
const cryptoKey =  window?.msd?.encryptionKey || "b14ca5898a4e4133bbce2ea2315a1916";;

/**
 * encryptAESForLogin - Encrypt a derived hd private key with a given pin and return it in Base64 form
 * @param {*} text - text to be encrypted
 * @param {*} key - secret key
 * @returns - Encrypted text
 */

export const encryptAESForLogin = (text, key = cryptoKey) => {
	key = CryptoJS.enc.Utf8.parse(key);
	const iv = CryptoJS.enc.Utf8.parse(key);
	let cipher = CryptoJS.AES.encrypt(text, key, {
		iv,
		mode: CryptoJS.mode.CTR,
		padding: CryptoJS.pad.Pkcs7,
	});
	return cipher.toString();
};

export const decryptAESForLogin = (text, key = cryptoKey) => {
	key = CryptoJS.enc.Utf8.parse(key);
	const iv = CryptoJS.enc.Utf8.parse(key);
	let cipher = CryptoJS.AES.decrypt(text, key, {
		iv,
		mode: CryptoJS.mode.CTR,
		padding: CryptoJS.pad.Pkcs7,
	});
	return cipher.toString(CryptoJS.enc.Utf8);
};
