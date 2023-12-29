import encUtf8, { parse } from "crypto-js/enc-utf8";
import modectr from "crypto-js/mode-ctr";
import padPkcs7 from "crypto-js/pad-pkcs7";
import { encrypt, decrypt } from "crypto-js/aes";
const cryptoKey = window?.msd?.encryptionKey || "b14ca5898a4e4133bbce2ea2315a1916";;

/**
 * encryptAESForLogin - Encrypt a derived hd private key with a given pin and return it in Base64 form
 * @param {*} text - text to be encrypted
 * @param {*} key - secret key
 * @returns - Encrypted text
 */

export const encryptAESForLogin = (text, key = cryptoKey) => {
	key = parse(key);
	const iv = parse(key);
	let cipher = encrypt(text, key, {
		iv,
		mode: modectr,
		padding: padPkcs7,
	});
	return cipher.toString();
};

export const decryptAESForLogin = (text, key = cryptoKey) => {
	key = parse(key);
	const iv = parse(key);
	let cipher = decrypt(text, key, {
		iv,
		mode: modectr,
		padding: padPkcs7,
	});
	return cipher.toString(encUtf8);
};
