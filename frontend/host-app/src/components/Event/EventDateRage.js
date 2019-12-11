import Typography from "@material-ui/core/Typography";
import React from "react";

function getDateRangeString(startAt, endAt) {
	const start = new Date(parseInt(startAt, 10));
	const end = new Date(parseInt(endAt, 10));

	return `${end.getFullYear()}.${start.getDay()} ~ ${end.getFullYear()}.${end.getDay()}`;
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
