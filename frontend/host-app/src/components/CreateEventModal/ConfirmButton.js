import {Button} from "@material-ui/core";
import React from "react";

function ConfirmButton({onclick}) {
	return (
		<Button
			size="large"
			variant="contained"
			color="primary"
			onClick={onclick}
		>
			확인
		</Button>
	);
}

export default ConfirmButton;
