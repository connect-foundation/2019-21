import React from "react";
import PropTypes from "prop-types";
import QuestionInputDrawer from "./QuestionInputDrawer.js";

function AddQuestionInputDrawer(props) {
	return <QuestionInputDrawer {...props} />;
}

AddQuestionInputDrawer.propTypes = {
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

AddQuestionInputDrawer.defaultProps = {
	isOpen: false,
	anchor: "right",
	confirmButtonText: "질문",
	initialQuestion: "",
	initialUserName: "",
};

export default AddQuestionInputDrawer;
