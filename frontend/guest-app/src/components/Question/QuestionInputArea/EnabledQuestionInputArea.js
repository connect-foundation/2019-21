import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {Box, CardContent, Divider} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
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

function EnabledQuestionInputArea(props) {
	const {onCancel, onAskQuestion, userNameRef, questionRef} = props;

	return (
		<>
			<Divider />
			<CardContent>
				<Grid container direction={"column"}>
					<QuestionInput questionRef={questionRef} />
					<Box p={1} />
					<FlexedSpaceBetweenDiv>
						<FlexedCenterDiv>
							<UserInfoInput userNameRef={userNameRef} />
						</FlexedCenterDiv>
						<FlexedCenterDiv>
							<CancelButton
								variant="contained"
								onClick={onCancel}
							/>
							<Box p={1} />
							<AskButton onClick={onAskQuestion} />
						</FlexedCenterDiv>
					</FlexedSpaceBetweenDiv>
				</Grid>
			</CardContent>
		</>
	);
}

EnabledQuestionInputArea.propTypes = {
	onCancel: PropTypes.func,
	onAskQuestion: PropTypes.func,
	userNameRef: PropTypes.any,
	questionRef: PropTypes.any,
};

export default EnabledQuestionInputArea;
