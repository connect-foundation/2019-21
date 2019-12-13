import {Typography} from "@material-ui/core";
import React from "react";

export default function QuestionCardDate({date}) {
	return (
		<Typography color={"textSecondary"} variant={"body1"}>
			{new Date(parseInt(date, 10)).toLocaleString()}
		</Typography>
	);
}
