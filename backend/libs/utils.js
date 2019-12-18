import moment from "moment";

const compareCurrentDateToTarget = baseDate => {
	const endAt = moment(baseDate);
	const current = moment();
	return endAt.diff(current, "minute");
};

const getSequelizeData = function(data) {
	return JSON.parse(JSON.stringify(data));
};

const getTokenExpired = hour =>
	new Date(new Date().getTime() + 1000 * 60 * 60 * Number(hour));

export {getSequelizeData, getTokenExpired, compareCurrentDateToTarget};
