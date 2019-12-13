import moment from "moment";

function validDate(startDate, endDate) {
	const currentDate = moment();
	const diffValue = moment
		.duration(moment(startDate).diff(currentDate))
		.asMinutes();
	const isAfterEndDate = moment
		.duration(moment(endDate).diff(moment(startDate)))
		.asMinutes();
	if (diffValue < -1 || isAfterEndDate < 0) {
		return false;
	}
	return true;
}

function validEventName(eventName) {
	const regex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-z0-9_\-\*\!\@\&\%\$\#\ ]{1,100}$/gi;
	const result = regex.test(eventName);
	return result;
}

export {validEventName, validDate};
