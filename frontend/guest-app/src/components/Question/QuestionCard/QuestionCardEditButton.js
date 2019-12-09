import React, {useContext} from "react";
import styled from "styled-components";
import {Typography} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz.js";
import {ContainerContext} from "../ContainerContext.js";

const QuestionEditButtonStyle = styled.div`
	float: right;
	text-align: right;
	margin-right: 1rem;
`;

function QuestionEditButton(props) {
	const question = props;
	const {dispatch} = useContext(ContainerContext);

	return (
		<span>
			<QuestionEditButtonStyle
				onClick={() => {
					dispatch({type: "openQuestionEditMenuDrawer", data: question});
				}}
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
