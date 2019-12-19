import React, {useRef} from "react";
import styled from "styled-components";
import QuestionContainerTabBar from "./QuestionContainerTabBar.js";
import useTabs from "../../hooks/useTabs.js";
import AddQuestionInputButton from "./AddQuestionInputButton.js";
import QuestionCardList from "../QuestionCard/QuestionCardList.js";
import {socketClient} from "../../socket.io";
import PaddingArea from "../atoms/PaddingArea.js";
import QuestionCardEditMenuDrawer from "../QuestionCardEditMenuDrawer/QuestionCardEditMenuDrawer.js";
import NewQuestionInputDrawer from "./NewQuestionInputDrawer.js";
import EditQuestionInputDrawer from "./EditQuestionInputDrawer.js";
import MyQuestionsDrawer from "./MyQuestionDrawer.js";
import useUIController from "../../contexts/UIController/useUIController.js";
import useQuestions from "../../contexts/Questions/useQuestions.js";

const RECENT_TAB_IDX = 1;
const POPULAR_TAB_IDX = 2;

const QuestionContainerStyle = styled.div`
	overflow-y:scroll;
	heigth: 100%
`;

function QuestionContainer() {
	const {dispatch, questions, replies} = useQuestions();

	const {
		newQuestionInputDrawer,
		editQuestionInputDrawer,
		questionEditMenuReducer,
		myQuestionDrawerReducer,
	} = useUIController();
	const {tabIdx, selectTabIdx} = useTabs(RECENT_TAB_IDX);
	const userNameRef = useRef(null);
	const questionRef = useRef(null);

	const onContainerSelectTab = (event, newValue) => {
		if (newValue === RECENT_TAB_IDX) {
			dispatch({type: "sortByRecent"});
		}

		if (newValue === POPULAR_TAB_IDX) {
			dispatch({type: "sortByLikeCount"});
		}

		selectTabIdx(event, newValue);
	};

	return (
		<QuestionContainerStyle>
			<QuestionContainerTabBar
				tabIdx={tabIdx}
				onSelectTab={onContainerSelectTab}
			/>
			<QuestionCardList questions={questions.filter(e => e.isStared)} replies={replies} />
			<QuestionCardList questions={questions.filter(e => !e.isStared)} replies={replies} />
			<PaddingArea />
			<AddQuestionInputButton
				onClick={() => newQuestionInputDrawer.setOn()}
			/>
			<NewQuestionInputDrawer
				userNameRef={userNameRef}
				questionRef={questionRef}
				toggleReducer={newQuestionInputDrawer}
			/>
			<EditQuestionInputDrawer
				userNameRef={userNameRef}
				questionRef={questionRef}
				toggleReducer={editQuestionInputDrawer}
			/>
			<QuestionCardEditMenuDrawer
				isOpen={questionEditMenuReducer.state}
				onClose={() => questionEditMenuReducer.setOff()}
				onDelete={() => {
					socketClient.emit(
						"question/remove",
						questionEditMenuReducer.data,
					);
					questionEditMenuReducer.setOff();
				}}
				onEdit={() => {
					editQuestionInputDrawer.setOn(questionEditMenuReducer.data);
				}}
			/>
			<MyQuestionsDrawer
				isOpen={myQuestionDrawerReducer.state}
				onClose={() => {
					myQuestionDrawerReducer.setOff();
				}}
			/>
		</QuestionContainerStyle>
	);
}

export default QuestionContainer;
