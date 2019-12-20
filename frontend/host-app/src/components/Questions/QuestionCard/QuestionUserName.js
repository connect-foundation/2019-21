import {Typography} from "@material-ui/core";
import React from "react";

function QuestionUserName({guestName}) {
	return (
		<Typography
			color={"textPrimary"}
			variant={"subtitle2"}
			style={{fontWeight: "bold"}}
		>
			{guestName}
		</Typography>
	);
}

export default QuestionUserName;
