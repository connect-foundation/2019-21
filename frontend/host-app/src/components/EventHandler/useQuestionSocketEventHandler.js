import {useSocket} from "../../libs/socket.io-Client-wrapper.js";
import {makeNewData} from "../../libs/utils.js";

const useQuestionSocketEventHandler = dispatch => {
	useSocket("question/create", req =>
		dispatch({type: "addNewQuestion", data: makeNewData(req)}),
	);

	useSocket("question/toggleStar", req =>
		dispatch({type: "toggleStar", data: req}),
	);

	useSocket("question/move", req =>
		dispatch({type: "moveQuestion", data: req}),
	);

	useSocket("question/remove", req =>
		dispatch({type: "removeQuestion", data: req}),
	);

	useSocket("question/update", req =>
		dispatch({type: "updateQuestion", data: req}),
	);

	useSocket("questionLike/create", req =>
		dispatch({
			type: "createLike",
			data: {QuestionId: req.QuestionId},
		}),
	);

	useSocket("questionLike/remove", req =>
		dispatch({
			type: "removeLike",
			data: {QuestionId: req.QuestionId},
		}),
	);
};

export default useQuestionSocketEventHandler;
