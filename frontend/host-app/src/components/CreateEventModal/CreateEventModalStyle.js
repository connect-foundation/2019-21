import {Modal} from "@material-ui/core";
import React from "react";

// todo: propType, defalut prop 추가
function CreateEventModalStyle(props) {
	const {open, onClose} = props;

	return (
		<Modal
			aria-labelledby="createEvent-modal-title"
			aria-describedby="createEvent-modal-description"
			open={open}
			onClose={onClose}
			children={props.children}
		/>
	);
}

export default CreateEventModalStyle;
