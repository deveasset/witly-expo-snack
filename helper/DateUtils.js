import { IsEmptyOrNullOrUndefined } from './StringUtils';

export function FormatDateString(dateTimeString, dateFormat) {
	if (!dateTimeString || dateTimeString === null || dateTimeString === undefined) {
		return '';
	}

	if (!dateFormat) {
		dateFormat = 'dd/MM/yyyy';
	}
	let dateTimeObj = new Date(dateTimeString);

	let day;
	let month;
	let year;
	if (dateTimeObj.getUTCDate() < 10) {
		day = '0' + dateTimeObj.getUTCDate();
	} else {
		day = dateTimeObj.getUTCDate();
	}

	if (dateTimeObj.getUTCMonth() < 10) {
		month = '0' + (dateTimeObj.getUTCMonth() + 1);
	} else {
		month = dateTimeObj.getUTCMonth() + 1;
	}

	year = dateTimeObj.getUTCFullYear();
	//console.log('FormatDateString - ', dateTimeObj, day, month, year);
	return dateFormat.replace('yyyy', year).replace('MM', month).replace('dd', day);
}

export function FormatTimeString(dateTimeString, timeFormat) {
	if (!dateTimeString || dateTimeString === null || dateTimeString === undefined) {
		return '';
	}

	if (!timeFormat) {
		timeFormat = 'hh:mm';
	}
	let dateTimeObj = new Date(dateTimeString);
	let hour;
	let minute;
	let second;

	if (dateTimeObj.getUTCHours() < 10) {
		hour = '0' + dateTimeObj.getUTCHours();
	} else {
		hour = dateTimeObj.getUTCHours();
	}

	if (dateTimeObj.getUTCMinutes() < 10) {
		minute = '0' + dateTimeObj.getUTCMinutes();
	} else {
		minute = dateTimeObj.getUTCMinutes();
	}

	if (dateTimeObj.getUTCSeconds() < 10) {
		second = '0' + dateTimeObj.getUTCSeconds();
	} else {
		second = dateTimeObj.getUTCSeconds();
	}
	//console.log('FormatTimeString - ', dateTimeObj, hour, minute, second);
	return timeFormat.replace('hh', hour).replace('mm', minute).replace('ss', second);
}

export function ConvertStringToDateTime(dtStr) {
	//console.log('ConvertStringToDateTime : ', new Date(dtStr));
	return IsEmptyOrNullOrUndefined(dtStr) ? new Date() : new Date(dtStr);
}

export function ConvertDateTimeToMilliTimeStamp(date) {
	return date ? date.GetTime() : 0;
}
