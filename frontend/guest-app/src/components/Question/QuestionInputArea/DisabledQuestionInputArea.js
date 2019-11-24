import React from "react";
import PropTypes from "prop-types";
import {CardContent} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {EditIcon} from "../../FontAwesomeIcons.js";

function DisabledQuestionInputArea(props) {
	const {onClick} = props;

	return (
		<>
			<Divider />
			<CardContent onClick={onClick}>
				<EditIcon>&nbsp;질문하기</EditIcon>
			</CardContent>
		</>
	);
}

DisabledQuestionInputArea.propTypes = {
	onClick: PropTypes.func,
};

export default DisabledQuestionInputArea;
