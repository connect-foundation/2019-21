import React from "react";
import PropTypes from "prop-types";
import {Box, Card, CardContent, Divider} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import useUserAvatar from "../../UserAvatar/useUserAvatar.js";
import QuestionInput from "./QuestionInput.js";
import UserAvatar from "../../UserAvatar/UserAvatar.js";
import QuestionUserNameInput from "./QuestionUserNameInput.js";
import AskButton from "./AskButton.js";
import CancelButton from "../../CommonButtons/CancelButton.js";

function EnabledQuestionInputArea(props) {
	const {onCancel, onAskQuestion, userNameRef, questionRef} = props;
	const {userName, isAnonymous, setState} = useUserAvatar();

	const onUserNameChange = e => {
		const newValue = e.target.value;

		if (newValue.length > 0) {
			setState({userName: newValue, isAnonymous: false});
		} else {
			setState({userName: newValue, isAnonymous: true});
		}
	};

	return (
		<Card>
			<Divider />
			<CardContent>
				<Grid container direction={"column"}>
					<QuestionInput questionRef={questionRef} />
					<Box p={1} />
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<div style={{display: "flex", alignItems: "center"}}>
							<UserAvatar
								isAnonymous={isAnonymous}
								userName={userName}
							/>
							<QuestionUserNameInput
								userName={userName}
								userNameRef={userNameRef}
								onChange={onUserNameChange}
							/>
						</div>
						<div style={{display: "flex", alignItems: "center"}}>
							<CancelButton
								variant="contained"
								onClick={onCancel}
							/>
							<Box p={1} />
							<AskButton onClick={onAskQuestion} />
						</div>
					</div>
				</Grid>
			</CardContent>
		</Card>
	);
}

EnabledQuestionInputArea.propTypes = {
	onCancel: PropTypes.func,
	onAskQuestion: PropTypes.func,
	userNameRef: PropTypes.any,
	questionRef: PropTypes.any,
};

export default EnabledQuestionInputArea;
