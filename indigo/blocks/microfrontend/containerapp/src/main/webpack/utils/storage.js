export const getLocalStorage = (key) => {
	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (error) {
		console.log("catch getLocalStorage:::error", error);
		return {};
	}
};

export const setLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
	return true;
};

export const removeLocalStorage = (key) => {
	localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
	localStorage.clear();
	return true;
};

/**
 * Set Session storage with the expiry time
 * @param {String} key - key of local storage
 * @param {*} value - Value of local storage.
 * @param {Number} ttl - Title to expire the local storage
 */
export const setSessionStorageWithExp = (key, value, ttl) => {
	const now = new Date();

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire

	const item = {
		value,
		expiry: now.getTime() + 60000 * ttl,
	};
	sessionStorage.setItem(key, JSON.stringify(item));
};

/**
 * Get Session storage with the expiry time
 * @param {String} key - key of local storage
 * @returns
 */
export const getSessionStorageWithExp = (key) => {
	const itemStr = sessionStorage.getItem(key);
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null;
	}
	const item = JSON.parse(itemStr);
	const now = new Date();
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		sessionStorage.removeItem(key);
		return null;
	}
	return item.value;
};
