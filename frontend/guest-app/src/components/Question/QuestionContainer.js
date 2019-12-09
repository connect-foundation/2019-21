import React, {useContext, useEffect, useReducer, useRef} from "react";
import {useQuery} from "@apollo/react-hooks";
import QuestionContainerTabBar from "./QuestionContainerTabBar.js";
import useTabs from "../../materialUIHooks/useTabs.js";
import AddQuestionInputButton from "./QuestionInputArea/AddQuestionInputButton.js";
import QuestionCardList from "./QuestionCard/QuestionCardList.js";
import {socketClient, useSocket} from "../../libs/socket.io-Client-wrapper.js";
import QuestionsReducer from "./QuestionsReducer.js";
import {
	buildQuestions,
	QUERY_INIT_QUESTIONS,
} from "../../libs/useQueryQuestions.js";
import {GuestGlobalContext} from "../../libs/guestGlobalContext.js";
import {QuestionsProvider} from "./QuestionsContext.js";
import PaddingArea from "./QuestionInputArea/PaddingArea.js";
import {ContainerProvider} from "./ContainerContext.js";
import QuestionInputDrawer from "./QuestionInputArea/QuestionInputDrawer.js";
import useToggleReducer from "./useToggleReducer.js";
import QuestionEditMenuDrawer from "./QuestionCard/QuestionEditMenuDrawer.js";

const RECENT_TAB_IDX = 1;
const POPULAR_TAB_IDX = 2;

function getNewQuestion({EventId, GuestId, guestName, content}) {
	return {
		guestName,
		EventId,
		GuestId,
		content,
		isAnonymous: guestName.length === 0,
	};
}

const useDataLoadEffect = (dispatch, data) => {
	useEffect(() => {
		if (data) {
			const buildData = buildQuestions(data);

			dispatch({type: "load", data: buildData});
		}
	}, [data, dispatch]);
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

	const newQuestionInputDrawerReducer = useToggleReducer();
	const EditQuestionInputDrawerReducer = useToggleReducer();
	const questionEditMenuReducer = useToggleReducer();
	const [questions, dispatch] = useReducer(QuestionsReducer, []);
	const {tabIdx, selectTabIdx} = useTabs(RECENT_TAB_IDX);
	const userNameRef = useRef(null);
	const questionRef = useRef(null);

	useDataLoadEffect(dispatch, data);
	useSocketHandler(dispatch, guest);

	const onConfirmNewQuestion = () => {
		socketClient.emit(
			"question/create",
			getNewQuestion({
				guestName: userNameRef.current.value,
				EventId: event.id,
				GuestId: guest.id,
				content: questionRef.current.value,
			}),
		);
	};

	const onContainerSelectTab = (event, newValue) => {
		if (newValue === RECENT_TAB_IDX) {
			dispatch({type: "sortByRecent"});
		}

		if (newValue === POPULAR_TAB_IDX) {
			dispatch({type: "sortByLikeCount"});
		}

		selectTabIdx(event, newValue);
	};

	const newQuestionInputDrawerProps = {
		title: "질문 하기",
		isOpen: newQuestionInputDrawerReducer.state,
		onClose: () => newQuestionInputDrawerReducer.setOff(),
		onConfirm: onConfirmNewQuestion,
		userNameRef,
		questionRef,
	};

	const onConfirmEditQuestion = () => {
		socketClient.emit("question/update", {
			id: EditQuestionInputDrawerReducer.data.id,
			guestName: userNameRef.current.value,
			EventId: event.id,
			GuestId: guest.id,
			content: questionRef.current.value,
			isAnonymous: userNameRef.current.value.length === 0,
		});
	};

	const editQuestionInputDrawerProps = {
		title: "질문 수정 하기",
		isOpen: EditQuestionInputDrawerReducer.state,
		onClose: () =>
			EditQuestionInputDrawerReducer.setOff(
				EditQuestionInputDrawerReducer.data,
			),
		onConfirm: onConfirmEditQuestion,
		userNameRef,
		questionRef,
		initialUserName: EditQuestionInputDrawerReducer.data.guestName,
		initialQuestion: EditQuestionInputDrawerReducer.data.content,
	};

	return (
		<QuestionsProvider value={{questions, dispatch}}>
			<ContainerProvider
				value={{
					questionInputDrawerReducer: newQuestionInputDrawerReducer,
					questionEditMenuReducer,
				}}
			>
				<QuestionContainerTabBar
					tabIdx={tabIdx}
					onSelectTab={onContainerSelectTab}
				/>
				<QuestionCardList />
				<PaddingArea />
				<AddQuestionInputButton
					onClick={() => newQuestionInputDrawerReducer.setOn()}
				/>
				<QuestionInputDrawer {...newQuestionInputDrawerProps} />
				<QuestionInputDrawer {...editQuestionInputDrawerProps} />
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
						EditQuestionInputDrawerReducer.setOn(
							questionEditMenuReducer.data,
						);
					}}
				/>
			</ContainerProvider>
		</QuestionsProvider>
	);
}

export default QuestionContainer;
