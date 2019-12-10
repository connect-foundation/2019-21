import React, {useContext, useEffect, useReducer, useRef} from "react";
import {useQuery} from "@apollo/react-hooks";
import QuestionContainerTabBar from "./QuestionContainerTabBar.js";
import useTabs from "../../materialUIHooks/useTabs.js";
import AddQuestionInputButton from "./QuestionInputArea/AddQuestionInputButton.js";
import QuestionCardList from "./QuestionCard/QuestionCardList.js";
import {socketClient, useSocket} from "../../libs/socket.io-Client-wrapper.js";
import QuestionsRepliesReducer from "./QuestionsRepliesReducer.js";
import {
	buildQuestions,
	QUERY_INIT_QUESTIONS,
} from "../../libs/useQueryQuestions.js";
import {GuestGlobalContext} from "../../libs/guestGlobalContext.js";
import {QuestionsRepliesProvider} from "./QuestionsRepliesContext.js";
import PaddingArea from "./QuestionInputArea/PaddingArea.js";
import QuestionEditMenuDrawer from "./QuestionCard/QuestionEditMenuDrawer.js";
import NewQuestionInputDrawer from "./NewQuestionInputDrawer.js";
import EditQuestionInputDrawer from "./EditQuestionInputDrawer.js";
import {useUIControllerContext} from "../UIController/UIController.js";

const RECENT_TAB_IDX = 1;
const POPULAR_TAB_IDX = 2;

const useDataLoadEffect = (questionsDispatch, repliesDispatch, data) => {
	useEffect(() => {
		if (data) {
			const questions = [];
			const replies = [];
			const buildData = buildQuestions(data);

			buildData.forEach(question => {
				if (question.QuestionId) {
					replies.push(question);
				} else {
					questions.push(question);
				}
			});
			questionsDispatch({type: "load", data: questions});
			repliesDispatch({type: "load", data: replies});
		}
	}, [data, questionsDispatch, repliesDispatch]);
};

const useSocketHandler = (dispatch, guestGlobal) => {
	useSocket("question/create", req => {
		req.guestGlobal = guestGlobal;
		dispatch({type: "addNewQuestion", data: req});
	});

	useSocket("questionLike/create", req => {
		req.guestGlobal = guestGlobal;
		dispatch({type: "LikeQuestion", data: req});
	});

	useSocket("questionLike/remove", req => {
		req.guestGlobal = guestGlobal;
		dispatch({type: "undoLikeQuestion", data: req});
	});

	useSocket("questionEmoji/create", req => {
		req.guestGlobal = guestGlobal;
		dispatch({type: "addQuestionEmoji", data: req});
	});

	useSocket("questionEmoji/remove", req => {
		req.guestGlobal = guestGlobal;
		dispatch({type: "removeQuestionEmoji", data: req});
	});

	useSocket("question/remove", req => {
		req.guestGlobal = guestGlobal;
		dispatch({type: "removeQuestion", data: req});
	});

	useSocket("question/update", req => {
		req.guestGlobal = guestGlobal;
		dispatch({type: "updateQuestion", data: req});
	});
};

function QuestionContainer() {
	const {event, guest} = useContext(GuestGlobalContext);
	const {data, loading, error} = useQuery(QUERY_INIT_QUESTIONS, {
		variables: {EventId: event.id, GuestId: guest.id},
	});
	const [questions, questionsDispatch] = useReducer(
		QuestionsRepliesReducer,
		[],
	);
	const [replies, repliesDispatch] = useReducer(QuestionsRepliesReducer, []);

	const {
		newQuestionInputDrawer,
		editQuestionInputDrawer,
		questionEditMenuReducer,
	} = useUIControllerContext();

	const {tabIdx, selectTabIdx} = useTabs(RECENT_TAB_IDX);
	const userNameRef = useRef(null);
	const questionRef = useRef(null);

	useDataLoadEffect(questionsDispatch, repliesDispatch, data);
	useSocketHandler(questionsDispatch, guest);

	const onContainerSelectTab = (event, newValue) => {
		if (newValue === RECENT_TAB_IDX) {
			questionsDispatch({type: "sortByRecent"});
		}

		if (newValue === POPULAR_TAB_IDX) {
			questionsDispatch({type: "sortByLikeCount"});
		}

		selectTabIdx(event, newValue);
	};

	return (
		<QuestionsRepliesProvider
			value={{
				questions,
				dispatch: questionsDispatch,
				replies,
				repliesDispatch,
			}}
		>
			<QuestionContainerTabBar
				tabIdx={tabIdx}
				onSelectTab={onContainerSelectTab}
			/>
			<QuestionCardList />
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
		</QuestionsRepliesProvider>
	);
}

export default QuestionContainer;
