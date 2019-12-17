import React, {useRef} from "react";
import styled from "styled-components";
import QuestionContainerTabBar from "./QuestionContainerTabBar.js";
import useTabs from "../../materialUIHooks/useTabs.js";
import AddQuestionInputButton from "../QuestionInputArea/AddQuestionInputButton.js";
import QuestionCardList from "../QuestionCard/QuestionCardList.js";
import {socketClient} from "../../libs/socketIoClientProvider.js";
import PaddingArea from "../CommonComponent/PaddingArea.js";
import QuestionEditMenuDrawer from "../QuestionCard/QuestionEditMenuDrawer.js";
import NewQuestionInputDrawer from "./NewQuestionInputDrawer.js";
import EditQuestionInputDrawer from "./EditQuestionInputDrawer.js";
import {useUIControllerContext} from "../UIController/UIController.js";
import {useQuestions} from "./QuestionsContext.js";
import MyQuestionsDrawer from "./MyQuestionDrawer.js";

const RECENT_TAB_IDX = 1;
const POPULAR_TAB_IDX = 2;

const QuestionContainerStyle = styled.div`
	overflow-y:scroll;
`;

function QuestionContainer() {
	const {dispatch, questions, replies} = useQuestions();

	const {
		newQuestionInputDrawer,
		editQuestionInputDrawer,
		questionEditMenuReducer,
		myQuestionDrawerReducer,
	} = useUIControllerContext();
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
			<QuestionEditMenuDrawer
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