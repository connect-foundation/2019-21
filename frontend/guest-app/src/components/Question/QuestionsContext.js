import React, {createContext, useContext, useEffect, useReducer} from "react";
import {useQuery} from "@apollo/react-hooks";
import {GuestGlobalContext} from "../../libs/guestGlobalContext.js";
import {
	buildQuestions,
	QUERY_INIT_QUESTIONS,
} from "../../libs/useQueryQuestions.js";
import {useSocket} from "../../libs/socketIoClientProvider.js";
import QuestionsRepliesReducer from "./QuestionsRepliesReducer.js";

const QuestionsContext = createContext([]);

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

	useSocket("question/move", req => {
		req.guestGlobal = guestGlobal;
		dispatch({type: "moveQuestion", data: req});
	});
};

export function QuestionsProvider(props) {
	const {children} = props;
	const {event, guest} = useContext(GuestGlobalContext);
	const {data, loading, error} = useQuery(QUERY_INIT_QUESTIONS, {
		variables: {EventId: event.id, GuestId: guest.id},
	});
	const [state, dispatch] = useReducer(QuestionsRepliesReducer, []);

	useDataLoadEffect(dispatch, data);
	useSocketHandler(dispatch, guest);

	const questions = state.filter(question => {
		return (question.QuestionId === null && question.state === "active");
	});
	const replies = state.filter(question => {
		return question.QuestionId !== null;
	});

	const value = {
		loading,
		error,
		questions,
		replies,
		dispatch,
	};

	return (
		<QuestionsContext.Provider value={value}>
			{children}
		</QuestionsContext.Provider>
	);
}

export function useQuestions() {
	return useContext(QuestionsContext);
}
