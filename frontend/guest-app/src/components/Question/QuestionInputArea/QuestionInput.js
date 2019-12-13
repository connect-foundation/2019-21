import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import QuestionContentInput from "./QuestionContentInput.js";

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

function QuestionInput(props) {
	const {
		onConfirm,
		userNameRef,
		questionRef,
		initialUserName,
		initialQuestion,
		confirmButtonText,
	} = props;

	return (
		<Grid container direction={"column"}>
			<QuestionContentInput
				questionRef={questionRef}
				initValue={initialQuestion}
			/>
			<Divider style={{marginTop: "0.5rem", marginBottom: "0.5rem"}} />
			<FlexedSpaceBetweenDiv>
				<FlexedCenterDiv>
					<UserInfoInput
						userNameRef={userNameRef}
						initialUserName={initialUserName}
					/>
				</FlexedCenterDiv>
				<FlexedCenterDiv>
					<Button
						variant="contained"
						color={"primary"}
						onClick={onConfirm}
					>
						{confirmButtonText}
					</Button>
				</FlexedCenterDiv>
			</FlexedSpaceBetweenDiv>
		</Grid>
	);
}

QuestionInput.propTypes = {
	onConfirm: PropTypes.func,
	userNameRef: PropTypes.any,
	questionRef: PropTypes.any,
	initialUserName: PropTypes.string,
	initialQuestion: PropTypes.string,
	confirmButtonText: PropTypes.string,
};

QuestionInput.defaultProps = {
	initialUserName: "",
	initialQuestion: "",
	confirmButtonText: "",
};

export default QuestionInput;
