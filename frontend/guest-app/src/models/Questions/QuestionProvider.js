import React, {useEffect, useReducer} from "react";
import {useQuery} from "@apollo/react-hooks";
import {QUERY_INIT_QUESTIONS} from "../../apollo/gqlSchemes.js";
import QuestionsRepliesReducer from "./QuestionsRepliesReducer.js";
import {useSocket} from "../../socket.io";
import buildQuestions from "../../apollo/asembleGetQuestionQuerys.js";
import QuestionsContext from "./QuestionsContext.js";
import useGlobalData from "../GlobalData/useGlobalData.js";

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

	useSocket("question/toggleStar", req => {
		req.guestGlobal = guestGlobal;
		dispatch({type: "toggleStarQuestion", data: req});
	});
};

function QuestionsProvider(props) {
	const {children} = props;
	const {event, guest} = useGlobalData();
	const {data, loading, error} = useQuery(QUERY_INIT_QUESTIONS, {
		variables: {EventId: event.id, GuestId: guest.id},
	});
	const [state, dispatch] = useReducer(QuestionsRepliesReducer, []);

	useDataLoadEffect(dispatch, data);
	useSocketHandler(dispatch, guest);

	const questions = state.filter(
		question => question.QuestionId === null && question.state === "active",
	);
	const replies = state.filter(question => question.QuestionId !== null);

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

export default QuestionsProvider;
