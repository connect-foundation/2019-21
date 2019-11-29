import React from "react";
import PropTypes from "prop-types";
import {CardContent} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";

function DisabledQuestionInputArea(props) {
	const {onClick} = props;

	return (
		<>
			<Divider/>
			<CardContent onClick={onClick}>
				<EditIcon style={{marginRight: "8px"}}/>
        질문하기
			</CardContent>
		</>
	);
}

DisabledQuestionInputArea.propTypes = {
	onClick: PropTypes.func,
};

export default DisabledQuestionInputArea;
