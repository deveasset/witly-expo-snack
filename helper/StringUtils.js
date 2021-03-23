export const ConvertApiName = (moduleName) => {
	if (moduleName === undefined) {
		return '';
	}
	return moduleName.trim().toLocaleLowerCase().replace(/\s+/g, '-');
};

export const ConvertToVariableName = (OldString) => {
	if (OldString === undefined) {
		return '';
	}
	return OldString.trim().replace(/\s+/g, '');
};

export const CompareString = (first, second) => {
	//normalize string
	let firstStr = first.trim().replace(/\s+/g, '-');
	let secondStr = second.trim().replace(/\s+/g, '-');
	return firstStr.localeCompare(secondStr);
};

export function validURL(str) {
	var pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	); // fragment locator
	return !!pattern.test(str);
}

export function ExtractFileNameFromURI(uri) {
	if (validURL(uri)) {
		return uri.substring(uri.lastIndexOf('/') + 1);
	}
	return '';
}

export function isObjectEmpty(obj) {
	return Object.getOwnPropertyNames(obj).length <= 0;
}

export function IsEmptyOrNullOrUndefined(value) {
	return value === '' || value === null || value === undefined;
}
