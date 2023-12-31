const getValue = (table) => (key) => {
	const keys = key.includes(".") ? key.split(".") : [key];
	let value = table;
	for (const k of keys) {
		if (value && k in value) {
			value = value[k];
		} else {
			return undefined;
		}
	}
	return value;
};

export default (table) => (key) => getValue(table)(key);
