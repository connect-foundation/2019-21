import React from "react";
import PropTypes from "prop-types";
import {CardContent} from "@material-ui/core";
import {EditIcon} from "../../FontAwesomeIcons.js";

function DisabledQuestionInputArea(props) {
	const {onClick} = props;

	return (
		<CardContent onClick={onClick}>
			<EditIcon>&nbsp;질문하기</EditIcon>
		</CardContent>
	);
}

DisabledQuestionInputArea.propTypes = {
	onClick: PropTypes.func,
};

export default DisabledQuestionInputArea;
