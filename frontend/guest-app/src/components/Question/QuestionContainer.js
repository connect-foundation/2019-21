import React, {useRef, useState} from "react";
import styled from "styled-components";
import QuestionCard from "./QuestionCard.js";
import DummyData from "./QuestionDummyData.js";
import QuestionContainerHeader from "./QuestionContainerHeader.js";
import useTabGroup from "../TabGroup/useTabGroup.js";
import QuestionInputArea from "./QuestionInputArea.js";

const Container = styled.div``;

function useQuestions(initialState = DummyData()) {
	const [state, setState] = useState(initialState);
	const addQuestion = newQuestion => {
		setState([newQuestion, ...state]);
	};

	return {questions: state, addQuestion};
}

function QuestionContainer() {
	const {questions, addQuestion} = useQuestions();
	const {tabIdx, selectTabIdx} = useTabGroup();
	const userNameRef = useRef(null);
	const questionRef = useRef(null);

	const onAskQuestion = () => {
		const userName = userNameRef.current.value;
		const question = questionRef.current.value;

		addQuestion({
			userName,
			date: new Date(),
			question,
			isShowEditButton: true,
			isLike: false,
			likeCount: 0,
		});
	};

	return (
		<Container>
			<QuestionContainerHeader
				questionNumber={questions.length}
				tabIdx={tabIdx}
				onSelectTab={selectTabIdx}
			/>
			<QuestionInputArea
				onAskQuestion={onAskQuestion}
				onOpen={() => {}}
				questionRef={questionRef}
				userNameRef={userNameRef}
			/>
			{questions.map((question, idx) => (
				<QuestionCard {...question} key={idx} />
			))}
		</Container>
	);
}

export default QuestionContainer;
