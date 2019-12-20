import Typography from "@material-ui/core/Typography";
import React from "react";
import moment from "moment";

const dateFormat = "YYYY년 MM월 DD일 HH시 mm분";

function getDateRangeString(startAt, endAt) {
	const start = new Date(parseInt(startAt, 10));
	const end = new Date(parseInt(endAt, 10));
	const startDate = moment(start).format(dateFormat);
	const endDate = moment(end).format(dateFormat);

	return `${startDate} ~ ${endDate}`;
}

function EventDateRage(props) {
	const {
		startAt = new Date().getTime()
			.toString(),
		endAt = new Date().getTime()
			.toString(),
	} = props;

	return (
		<Typography color={"textSecondary"}>
			{getDateRangeString(startAt, endAt)}
		</Typography>
	);
}

export default EventDateRage;
