import Typography from "@material-ui/core/Typography";
import React from "react";

function EventCode(props) {
	const {code = "code"} = props;

	return (
		<Typography variant={"h6"} color={"textSecondary"}>
			#{code}
		</Typography>
	);
}

export default EventCode;
