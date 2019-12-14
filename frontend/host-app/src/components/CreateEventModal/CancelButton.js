import {Button} from "@material-ui/core";
import React from "react";

function CancelButton({onClick}) {
	return (
		<Button
			size="large"
			variant="contained"
			color="secondary"
			onClick={onClick}
		>
			취소
		</Button>
	);
}

export default CancelButton;
