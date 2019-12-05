import React, {useEffect, useReducer, useRef,useContext} from "react";
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
	QUERY_INIT_QUESTIONS,
	buildQuestions,
} from "../../libs/useQueryQuestions.js";
import {GuestContext} from "../../libs/guestContext";

const RECENT_TAB_IDX = 1;
const POPULAR_TAB_IDX = 2;

function useMyQuery(
	options = {
		variables: {EventId: 2, GuestId: 122},
	},
) {
	return useQuery(QUERY_INIT_QUESTIONS, options);
}

function QuestionContainer() {
	const {event,guest}=useContext(GuestContext);
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
		const newQuestion = {
			guestName: userNameRef.current.value,
			EventId: event.id,
			GuestId: guest.id,
			createdAt: new Date(),
			content: questionRef.current.value,
			isShowEditButton: true,
			isAnonymous: false,
			didILike: false,
			likeCount: 0,
			status: "active",
			isStared: false,
		};

		socketClient.emit("question/create", newQuestion);
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

	const style = {
		backgroundColor: gray[300],
	};

	return (
		<>
			<QuestionContainerTabBar
				questionNumber={questions.length}
				tabIdx={tabIdx}
				onSelectTab={onContainerSelectTab}
			/>
			<QuestionInputArea
				onAskQuestion={onAskQuestion}
				onOpen={() => {}}
				questionRef={questionRef}
				userNameRef={userNameRef}
			/>
			<QuestionCardList questions={questions} />
			<Box p={12} style={style}></Box>
		</>
	);
}

export default QuestionContainer;