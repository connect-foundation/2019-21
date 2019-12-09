import React from "react";
import PropTypes from "prop-types";
import QuestionInputDrawer from "./QuestionInputDrawer.js";

function EditQuestionInputDrawer(props) {
	return <QuestionInputDrawer {...props} />;
}

EditQuestionInputDrawer.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	onConfirm: PropTypes.func,
	userNameRef: PropTypes.any,
	questionRef: PropTypes.any,
	anchor: PropTypes.string,
	initialUserName: PropTypes.string,
	initialQuestion: PropTypes.string,
	confirmButtonText: PropTypes.string,
};

EditQuestionInputDrawer.defaultProps = {
	isOpen: false,
	anchor: "right",
	confirmButtonText: "수정",
};

export default EditQuestionInputDrawer;
