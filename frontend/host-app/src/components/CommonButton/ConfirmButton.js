import {Button} from "@material-ui/core";
import React from "react";

function ConfirmButton({onClick}) {
	return (
		<Button
			size="large"
			variant="contained"
			color="primary"
			onClick={onClick}
		>
			확인
		</Button>
	);
}

export default ConfirmButton;
