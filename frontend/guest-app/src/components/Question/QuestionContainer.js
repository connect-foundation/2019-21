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
import ContainerReducer from "./ContainerReducer.js";
import {ContainerProvider} from "./ContainerContext.js";
import QuestionEditMenuDrawer from "./QuestionCard/QuestionEditMenuDrawer.js";
import AddQuestionInputDrawer from "./QuestionInputArea/AddQuestionInputDrawer.js";
import EditQuestionInputDrawer from "./QuestionInputArea/EditQuestionInputDrawer.js";

const RECENT_TAB_IDX = 1;
const POPULAR_TAB_IDX = 2;

function getNewQuestion({EventId, GuestId, guestName, content}) {
	return {
		guestName,
		EventId,
		GuestId,
		content,
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
};

const containerInitialState = {
	QuestionInputDrawer: {
		isOpen: false,
	},
	QuestionEditMenuDrawer: {
		isOpen: false,
		target: null,
	},
};

function QuestionContainer() {
	const {event, guest} = useContext(GuestGlobalContext);
	const {data, loading, error} = useQuery(QUERY_INIT_QUESTIONS, {
		variables: {EventId: event.id, GuestId: guest.id},
	});

	const [containerState, containerDispatch] = useReducer(
		ContainerReducer,
		containerInitialState,
	);
	const [questions, dispatch] = useReducer(QuestionsReducer, []);
	const {tabIdx, selectTabIdx} = useTabs(RECENT_TAB_IDX);
	const userNameRef = useRef(null);
	const questionRef = useRef(null);

	useDataLoadEffect(dispatch, data);
	useSocketHandler(dispatch, guest);

	const onConfirm = () => {
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

	const AddQuestionInputDrawerProps = {
		isOpen: containerState.QuestionInputDrawer.isOpen,
		onClose: () => containerDispatch({type: "closeQuestionInputDrawer"}),
		userNameRef,
		onConfirm,
		questionRef,
	};


	return (
		<QuestionsProvider value={{questions, dispatch}}>
			<ContainerProvider
				value={{container: containerState, dispatch: containerDispatch}}
			>
				<QuestionContainerTabBar
					tabIdx={tabIdx}
					onSelectTab={onContainerSelectTab}
				/>
				<QuestionCardList/>
				<PaddingArea/>
				<AddQuestionInputButton
					onClick={() =>
						containerDispatch({type: "openQuestionInputDrawer"})
					}
				/>
				<AddQuestionInputDrawer {...AddQuestionInputDrawerProps} />
				<EditQuestionInputDrawer/>
				<QuestionEditMenuDrawer
					isOpen={containerState.QuestionEditMenuDrawer.isOpen}
					onClose={() =>
						containerDispatch({type: "closeQuestionEditMenuDrawer"})
					}
					// onEdit={()=>{}}
					// onDelete={}
				/>
			</ContainerProvider>
		</QuestionsProvider>
	);
}

export default QuestionContainer;
