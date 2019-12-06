import {Typography} from "@material-ui/core";
import React from "react";

function QuestionDate({createdAt}) {
	return (
		<Typography color={"textSecondary"} variant={"body2"}>
			{new Date(parseInt(createdAt, 10)).toLocaleTimeString()}
		</Typography>
	);
}

export default QuestionDate;
