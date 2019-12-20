import React from "react";
import styled from "styled-components";
import {Typography} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz.js";
import useUIController from "../../contexts/UIController/useUIController.js";

const QuestionEditButtonStyle = styled.div`
	float: right;
	text-align: right;
	margin-right: 1rem;
`;

function QuestionEditButton(props) {
	const question = props;
	const {questionEditMenuReducer} = useUIController();

	return (
		<span>
			<QuestionEditButtonStyle
				onClick={() => questionEditMenuReducer.setOn(question)}
			>
				<Typography color={"textSecondary"}>
					<MoreHorizIcon />
				</Typography>
			</QuestionEditButtonStyle>
		</span>
	);
}

QuestionEditButton.propTypes = {};

QuestionEditButton.defaultProps = {};

export default QuestionEditButton;
