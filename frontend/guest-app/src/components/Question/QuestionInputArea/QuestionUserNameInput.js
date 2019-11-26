import React from "react";
import PropTypes from "prop-types";
import CommonTextInput from "../../CommonTextInput/CommonTextInput.js";

function QuestionUserNameInput(props) {
	const {userNameRef, userName = "", onChange} = props;

	return (
		<CommonTextInput
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
