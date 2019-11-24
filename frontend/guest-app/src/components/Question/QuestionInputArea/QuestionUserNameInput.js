import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../Modals/EditPriofileModal/TextInput.js";

function QuestionUserNameInput(props) {
	const {userNameRef, userName = "", onChange} = props;

	return (
		<TextInput
			value={userName}
			onChange={onChange}
			inputRef={userNameRef}
			style={{marginTop: "8px"}}
		/>
	);
}

QuestionUserNameInput.propTypes = {
	userName: PropTypes.string,
	userNameRef: PropTypes.any,
	onChange: PropTypes.func,
};

export default QuestionUserNameInput;
