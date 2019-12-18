import Button from "@material-ui/core/Button";
import React from "react";

function ConfirmButton(props) {
	return (
		<Button color="secondary" {...props}>
			확인
		</Button>
	);
}

export default ConfirmButton;
