import React, {useContext, useEffect, useReducer, useRef} from "react";
import Box from "@material-ui/core/Box";
import gray from "@material-ui/core/colors/grey.js";
import {useQuery} from "@apollo/react-hooks";
import QuestionContainerTabBar from "./QuestionContainerTabBar.js";
import useTabs from "../../materialUIHooks/useTabs.js";
import QuestionInputArea from "./QuestionInputArea/QuestionInputArea.js";
import QuestionCardList from "./QuestionCard/QuestionCardList.js";
import {socketClient, useSocket} from "../../libs/socket.io-Client-wrapper.js";
import QuestionsReducer from "./QuestionsReducer.js";
import {
	buildQuestions,
	QUERY_INIT_QUESTIONS,
} from "../../libs/useQueryQuestions.js";
import {GuestGlobalContext} from "../../libs/guestGlobalContext.js";
import {QuestionsProvider} from "./QuestionsContext.js";

const RECENT_TAB_IDX = 1;
const POPULAR_TAB_IDX = 2;

function useMyQuery(options) {
	return useQuery(QUERY_INIT_QUESTIONS, options);
}

const style = {
	backgroundColor: gray[300],
};

function BottomPaddingBox() {
	return <Box p={24} style={style} />;
}

function getNewQuestion({
	EventId,
	GuestId,
	guestName,
	content,
	createdAt = new Date().getTime(),
	isShowEditButton = true,
	isAnonymous = false,
	didILike = false,
	likeCount = 0,
	status = "active",
	isStared = false,
}) {
	return {
		guestName,
		EventId,
		GuestId,
		createdAt,
		content,
		isShowEditButton,
		isAnonymous,
		didILike,
		likeCount,
		status,
		isStared,
	};
}

function QuestionContainer() {
	const {event, guest} = useContext(GuestGlobalContext);
	const {data, loading, error} = useMyQuery({
		variables: {EventId: event.id, GuestId: guest.id},
	});

	const [questions, dispatch] = useReducer(QuestionsReducer, []);
	const {tabIdx, selectTabIdx} = useTabs(RECENT_TAB_IDX);
	const userNameRef = useRef(null);
	const questionRef = useRef(null);

	useEffect(() => {
		if (data) {
			dispatch({type: "load", data: buildQuestions(data)});
		}
	}, [data]);

	useSocket("question/create", req => {
		dispatch({type: "addNewQuestion", data: req});
	});

	const onAskQuestion = () => {
		socketClient.emit(
			"question/create",
			getNewQuestion({
				guestName: userNameRef.current.value,
				EventId: event.id,
				GuestId: guest.id,
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

	return (
		<QuestionsProvider value={questions}>
			<QuestionContainerTabBar
				tabIdx={tabIdx}
				onSelectTab={onContainerSelectTab}
			/>
			<QuestionInputArea
				onAskQuestion={onAskQuestion}
				questionRef={questionRef}
				userNameRef={userNameRef}
			/>
			<QuestionCardList />
			<BottomPaddingBox />
		</QuestionsProvider>
	);
}

export default QuestionContainer;
