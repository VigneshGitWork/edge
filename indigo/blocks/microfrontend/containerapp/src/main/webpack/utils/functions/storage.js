export const getLocalStorage = (key) => {
	return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : "";
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
