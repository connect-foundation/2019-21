import {Typography} from "@material-ui/core";
import React from "react";
import {timeFormatter} from "../../libs/utils";

function QuestionDate({createdAt}) {
	return (
		<Typography color={"textSecondary"} variant={"body2"}>
			{timeFormatter(createdAt)}
		</Typography>
	);
}

export default QuestionDate;
