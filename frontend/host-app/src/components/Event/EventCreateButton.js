import {Button} from "@material-ui/core";
import React from "react";

function EventCreateButton(props) {
	const {onClick} = props;

	return (
		<Button
			size="medium"
			variant="contained"
			color="primary"
			onClick={onClick}
		>
			이벤트 만들기
		</Button>
	);
}

export default EventCreateButton;
