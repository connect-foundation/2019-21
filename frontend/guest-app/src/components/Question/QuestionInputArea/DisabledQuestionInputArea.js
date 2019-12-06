import React from "react";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";

function DisabledQuestionInputArea(props) {
	const {onClick} = props;

	return (
		<div onClick={onClick}>
			<EditIcon style={{marginRight: "8px"}} />
			질문하기
		</div>
	);
}

DisabledQuestionInputArea.propTypes = {
	onClick: PropTypes.func,
};

export default DisabledQuestionInputArea;
