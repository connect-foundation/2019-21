import {Button} from "@material-ui/core";
import React from "react";

// todo: propType, defalut prop 추가
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
