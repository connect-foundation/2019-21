import React from "react";
import {Card} from "@material-ui/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import useQuestionInputArea from "./useQuestionInputArea.js";
import EnabledQuestionInputArea from "./EnabledQuestionInputArea.js";
import DisabledQuestionInputArea from "./DisabledQuestionInputArea.js";

const QuestionInputAreaStyle = styled.div`
	position: fixed;
	bottom: 0;

	width: 100%;
	z-index: 100;
`;

function QuestionInputArea(props) {
	const {onAskQuestion, onOpen, questionRef, userNameRef} = props;
	const inputToggle = useQuestionInputArea(true);

	const onQuestionAreaClick = () => {
		inputToggle.toggle();
		onOpen();
	};

	return (
		<QuestionInputAreaStyle>
			<Card style={{width: "100%"}}>
				{inputToggle.state ? (
					<DisabledQuestionInputArea onClick={onQuestionAreaClick} />
				) : (
					<EnabledQuestionInputArea
						onAskQuestion={() => {
							onAskQuestion();
							inputToggle.toggle();
						}}
						onCancel={inputToggle.toggle}
						questionRef={questionRef}
						userNameRef={userNameRef}
					/>
				)}
			</Card>
		</QuestionInputAreaStyle>
	);
}

QuestionInputArea.propTypes = {
	onAskQuestion: PropTypes.func,
	onOpen: PropTypes.func,
	questionRef: PropTypes.any,
	userNameRef: PropTypes.any,
};

export default QuestionInputArea;
