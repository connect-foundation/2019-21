import moment from "moment";

export const compareCurrentDateToTarget = baseDate => {
	const endAt = moment(baseDate);
	const current = moment();

	return endAt.diff(current, "minute");
};

export const getTokenExpired = hour =>
	new Date(new Date().getTime() + 1000 * 60 * 60 * Number(hour));

