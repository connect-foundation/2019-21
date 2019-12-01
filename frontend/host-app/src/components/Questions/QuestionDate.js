import {Typography} from "@material-ui/core";
import React from "react";

function QuestionDate({createdAt}) {
	return (
		<Typography color={"textSecondary"} variant={"body2"}>
			{createdAt}
		</Typography>
	);
}

export default QuestionDate;
