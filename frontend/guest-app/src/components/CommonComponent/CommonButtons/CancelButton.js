import Button from "@material-ui/core/Button";
import React from "react";

// todo proptype 추가
function CancelButton(props) {
	return (
		<Button color={"default"} {...props}>
			취소
		</Button>
	);
}

export default CancelButton;
