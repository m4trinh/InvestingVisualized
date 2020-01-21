export const getLocalStorage = (key, falseValue) => {
	return localStorage.hasOwnProperty(key)
		? JSON.parse(localStorage[key])
		: falseValue;
};
export const updateLocalStorage = (key, value) => {
	localStorage[key] = JSON.stringify(value);
};

export const getCurrentYear = () => {
	return new Date().getFullYear();
};
