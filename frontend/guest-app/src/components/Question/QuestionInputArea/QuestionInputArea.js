import React from "react";
import PropTypes from "prop-types";
import {Card, CardContent} from "@material-ui/core";
import useQuestionInputArea from "./useQuestionInputArea.js";
import EnabledQuestionInputArea from "./EnabledQuestionInputArea.js";
import DisabledQuestionInputArea from "./DisabledQuestionInputArea.js";

const disabled = {
	width: "calc(100% - 2rem)",
	position: "fixed",
	bottom: "0",
	left: "0rem",
	zIndex: 100,
	margin: "1rem",
	backgroundColor: "#3f51b5",
};

const enabled = {
	width: "calc(100% - 2rem)",
	position: "fixed",
	bottom: "0",
	left: "0rem",
	zIndex: 100,
	margin: "1rem",
};

const cardContentStyle = {paddingBottom: "1rem"};

function QuestionInputArea(props) {
	const {onAskQuestion, questionRef, userNameRef} = props;
	const questionInputArea = useQuestionInputArea();

	return questionInputArea.state ? (
		<Card style={enabled}>
			<CardContent style={cardContentStyle}>
				<EnabledQuestionInputArea
					onAskQuestion={() => {
						onAskQuestion();
						questionInputArea.toggle();
					}}
					onCancel={questionInputArea.toggle}
					questionRef={questionRef}
					userNameRef={userNameRef}
				/>
			</CardContent>
		</Card>
	) : (
		<Card style={disabled}>
			<CardContent style={cardContentStyle}>
				<DisabledQuestionInputArea onClick={questionInputArea.toggle} />
			</CardContent>
		</Card>
	);
}

QuestionInputArea.propTypes = {
	onAskQuestion: PropTypes.func,
	questionRef: PropTypes.any,
	userNameRef: PropTypes.any,
};

export default QuestionInputArea;
