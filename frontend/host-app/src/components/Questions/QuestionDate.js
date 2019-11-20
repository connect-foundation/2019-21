import {Typography} from "@material-ui/core";
import React from "react";

function QuestionDate({date}) {
	return (
		<Typography color={"textSecondary"} variant={"body2"}>
			{`${date.getFullYear()}.${date.getMonth()}.${date.getDay()}`}
		</Typography>
	);
}

export default QuestionDate;
