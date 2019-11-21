import {Typography} from "@material-ui/core";
import React from "react";

function QuestionUserName({userName}) {
	return (
		<Typography
			color={"textPrimary"}
			variant={"subtitle2"}
			style={{fontWeight: "bold"}}
		>
			{userName}
		</Typography>
	);
}

export default QuestionUserName;
