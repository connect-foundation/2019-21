import React from "react";
import styled from "styled-components";
import {Typography} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz.js";
import useDrawer from "../../../materialUIHooks/useDrawer.js";
import QuestionCardDrawer from "./QuestionCardDrawer.js";

const QuestionEditButtonStyle = styled.div`
	float: right;
	text-align: right;
	margin-right: 1rem;
`;

function QuestionEditButton(props) {
	const {isOpen, toggleDrawer} = useDrawer();

	return (
		<span>
			<QuestionEditButtonStyle onClick={toggleDrawer}>
				<Typography color={"textSecondary"}>
					<MoreHorizIcon />
				</Typography>
			</QuestionEditButtonStyle>
			<QuestionCardDrawer {...{isOpen, toggleDrawer}} />
		</span>
	);
}

QuestionEditButton.propTypes = {};

QuestionEditButton.defaultProps = {};

export default QuestionEditButton;
