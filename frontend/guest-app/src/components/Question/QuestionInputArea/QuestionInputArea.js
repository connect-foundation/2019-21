import React from "react";
import {Card, CardContent} from "@material-ui/core";
import PropTypes from "prop-types";
import useQuestionInputArea from "./useQuestionInputArea.js";
import EnabledQuestionInputArea from "./EnabledQuestionInputArea.js";
import DisabledQuestionInputArea from "./DisabledQuestionInputArea.js";

const style = {
	width: "calc(100% - 2rem)",
	position: "fixed",
	bottom: "0",
	left: "0rem",
	zIndex: 100,
	margin: "1rem",
};

function QuestionInputArea(props) {
	const {onAskQuestion, onOpen, questionRef, userNameRef} = props;
	const questionInputArea = useQuestionInputArea();

	const onQuestionAreaClick = () => {
		questionInputArea.toggle();
		onOpen();
	};

	return (
		<Card style={style}>
			<CardContent style={{paddingBottom: "1rem"}}>
				{questionInputArea.state ? (
					<EnabledQuestionInputArea
						onAskQuestion={() => {
							onAskQuestion();
							questionInputArea.toggle();
						}}
						onCancel={questionInputArea.toggle}
						questionRef={questionRef}
						userNameRef={userNameRef}
					/>
				) : (
					<DisabledQuestionInputArea onClick={onQuestionAreaClick} />
				)}
			</CardContent>
		</Card>
	);
}

QuestionInputArea.propTypes = {
	onAskQuestion: PropTypes.func,
	onOpen: PropTypes.func,
	questionRef: PropTypes.any,
	userNameRef: PropTypes.any,
};

export default QuestionInputArea;
