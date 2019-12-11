import React, {createContext, useContext, useEffect, useReducer} from "react";
import {useQuery} from "@apollo/react-hooks";
import {GuestGlobalContext} from "../../libs/guestGlobalContext.js";
import {
	buildQuestions,
	QUERY_INIT_QUESTIONS,
} from "../../libs/useQueryQuestions.js";
import {useSocket} from "../../libs/socket.io-Client-wrapper.js";
import QuestionsRepliesReducer from "./QuestionsRepliesReducer.js";

const QuestionsContext = createContext([]);

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

const useSocketHandler = (questionDispatch, repliesDispatch, guestGlobal) => {
	useSocket("question/create", req => {
		req.guestGlobal = guestGlobal;
		questionDispatch({type: "addNewQuestion", data: req});
	});

	useSocket("questionLike/create", req => {
		req.guestGlobal = guestGlobal;
		questionDispatch({type: "LikeQuestion", data: req});
		repliesDispatch({type: "LikeQuestion", data: req});
	});

	useSocket("questionLike/remove", req => {
		req.guestGlobal = guestGlobal;
		questionDispatch({type: "undoLikeQuestion", data: req});
		repliesDispatch({type: "undoLikeQuestion", data: req});
	});

	useSocket("questionEmoji/create", req => {
		req.guestGlobal = guestGlobal;
		questionDispatch({type: "addQuestionEmoji", data: req});
		repliesDispatch({type: "addQuestionEmoji", data: req});
	});

	useSocket("questionEmoji/remove", req => {
		req.guestGlobal = guestGlobal;
		questionDispatch({type: "removeQuestionEmoji", data: req});
		repliesDispatch({type: "removeQuestionEmoji", data: req});
	});

	useSocket("question/remove", req => {
		req.guestGlobal = guestGlobal;
		questionDispatch({type: "removeQuestion", data: req});
	});

	useSocket("question/update", req => {
		req.guestGlobal = guestGlobal;
		questionDispatch({type: "updateQuestion", data: req});
	});

	useSocket("reply/create", req => {
		req.guestGlobal = guestGlobal;
		repliesDispatch({type: "addNewQuestion", data: req});
	});
};

export function QuestionsProvider(props) {
	const {children} = props;
	const {event, guest} = useContext(GuestGlobalContext);
	const {data, loading, error} = useQuery(QUERY_INIT_QUESTIONS, {
		variables: {EventId: event.id, GuestId: guest.id},
	});

	const [questions, questionsDispatch] = useReducer(
		QuestionsRepliesReducer,
		[],
	);
	const [replies, repliesDispatch] = useReducer(QuestionsRepliesReducer, []);

	useDataLoadEffect(questionsDispatch, repliesDispatch, data);
	useSocketHandler(questionsDispatch, repliesDispatch, guest);

	const value = {
		loading,
		error,
		questions,
		questionsDispatch,
		replies,
		repliesDispatch,
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
