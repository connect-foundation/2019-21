import React from "react";
import {Typography} from "@material-ui/core";

// todo proptype
export default function QuestionUserName({userName}) {
	return (
		<Typography
			color={"textPrimary"}
			variant={"subtitle1"}
			style={{fontWeight: "bold"}}
		>
			{userName}
		</Typography>
	);
}
