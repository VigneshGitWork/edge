import { encryptAESForLogin, decryptAESForLogin } from "./loginEncryption";

const Cookies = {
	get: function (name = "", parsed = false, decrypted = false) {
		const _name = `${name}=`;
		const cookies = document.cookie.split(";");
		for (let cookie of cookies) {
			let _cookie = cookie;
			while (_cookie.charAt(0) == " ") {
				_cookie = _cookie.substring(1, _cookie.length);
			}
			if (_cookie.indexOf(_name) === 0) {
				let result = _cookie.substring(_name.length, _cookie.length);
				if (decrypted) {
					result = decryptAESForLogin(result);
				}
				if (parsed) {
					return JSON.parse(result);
				}
				return result;
			}
		}
	},
	remove: function (name) {
		const cookie = Cookies.get(name);
		document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
		return cookie;
	},
	set: function (name, value, domain, expirationInMs, encrypted = false) {
		let expires = "";
		let _domain = "";
		if (expirationInMs) {
			const date = new Date();
			date.setTime(date.getTime() + expirationInMs);
			expires = `; expires=${date.toUTCString()}`;
		}
		console.log("expires: ", expires);
		if (domain) {
			_domain = `; domain=${domain}`;
		}
		let cookieValue = JSON.stringify(value);
		if (encrypted) {
			cookieValue = encryptAESForLogin(cookieValue);
		}
		document.cookie = `${name}=${cookieValue}${expires}${_domain};path=/`;
	},
};

export default Cookies;
