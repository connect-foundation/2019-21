import React, {useState} from "react";
import styled from "styled-components";
import QuestionCard from "./QuestionCard.js";
import DummyData from "./QuestionDummyData.js";
import QuestionContainerHeader from "./QuestionContainerHeader.js";
import useTabGroup from "../TabGroup/useTabGroup.js";
import QuestionInputArea from "./QuestionInputArea.js";
import useTextInput from "../Modals/EditPriofileModal/useTextInput.js";
import useUserAvata from "./useUserAvata.js";

const Container = styled.div``;

function useQuestions(initialState = DummyData()) {
	const [state, setState] = useState(initialState);
	const addQuestion = newQuestion => {
		setState([newQuestion, ...state]);
	};

	return {questions: state, addQuestion};
}

function QuestionContainer(props) {
	const {questions, addQuestion} = useQuestions();
	const {tabIdx, selectTabIdx} = useTabGroup();
	const userAvataState = useUserAvata();
	const textInputState = useTextInput();

	const onAskQuestion = () => {
		addQuestion({
			userName: userAvataState.userName,
			date: new Date(),
			question: textInputState.value,
			isAnonymous: userAvataState.isAnonymous,
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
				userAvataState={userAvataState}
				textInputState={textInputState}
				onAskQuestion={onAskQuestion}
				onOpen={() => {}}
			/>
			{questions.map((question, idx) => (
				<QuestionCard {...question} key={idx} />
			))}
		</Container>
	);
}

export default QuestionContainer;
