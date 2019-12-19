import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const style = {
	marginTop: "8px",
	marginLeft: "8px",
	marginRight: "8px",
	width: "100%",
};

function QuestionUserNameInput(props) {
	const {userNameRef, userName = "", onChange} = props;

	return (
		<TextField
			value={userName}
			margin="normal"
			onChange={onChange}
			inputRef={userNameRef}
			style={style}
		/>
	);
}

QuestionUserNameInput.propTypes = {
	userName: PropTypes.string,
	userNameRef: PropTypes.any,
	onChange: PropTypes.func,
};

export default QuestionUserNameInput;
