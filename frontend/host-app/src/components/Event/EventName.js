import Typography from "@material-ui/core/Typography";
import React from "react";

function EventName(props) {
	const {title = "title"} = props;

	return (
		<Typography variant={"h6"} style={{fontWeight: "bold"}}>
			{title}
		</Typography>
	);
}


export default EventName;
