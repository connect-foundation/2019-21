import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import QuestionInput from "./QuestionInput.js";
import AskButton from "./AskButton.js";
import CancelButton from "../../CommonComponent/CommonButtons/CancelButton.js";
import UserInfoInput from "./UserInfoInput.js";

const FlexedCenterDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const FlexedSpaceBetweenDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

function QuestionInputArea(props) {
	const {onCancel, onAskQuestion, userNameRef, questionRef} = props;

	return (
		<Grid container direction={"column"}>
			<QuestionInput questionRef={questionRef} />
			<Divider style={{marginTop: "0.5rem", marginBottom: "0.5rem"}} />
			<FlexedSpaceBetweenDiv>
				<FlexedCenterDiv>
					<UserInfoInput userNameRef={userNameRef} />
				</FlexedCenterDiv>
				<FlexedCenterDiv>
					<CancelButton variant="contained" onClick={onCancel} />
					<Box p={1} />
					<AskButton onClick={onAskQuestion} />
				</FlexedCenterDiv>
			</FlexedSpaceBetweenDiv>
		</Grid>
	);
}

QuestionInputArea.propTypes = {
	onCancel: PropTypes.func,
	onAskQuestion: PropTypes.func,
	userNameRef: PropTypes.any,
	questionRef: PropTypes.any,
};

export default QuestionInputArea;
