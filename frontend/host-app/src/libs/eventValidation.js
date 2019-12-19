import moment from "moment";

function validDate(startDate, endDate) {
	const currentDate = moment();
	const diffValue = moment
		.duration(moment(startDate).diff(currentDate))
		.asMinutes();
	const isAfterEndDate = moment
		.duration(moment(endDate).diff(moment(startDate)))
		.asMinutes();

	return !(diffValue < -1 || isAfterEndDate < 0);
}

function validEventName(eventName) {
	const regex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-z0-9_\-\*\!\@\&\%\$\#\ ]{1,100}$/gi;

	return regex.test(eventName);
}

export {validEventName, validDate};
