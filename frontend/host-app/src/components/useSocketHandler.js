import {useSocket} from "../libs/socket.io-Client-wrapper";
import {makeNewData} from "../libs/utils";


const useSocketHandler = dispatch => {
	useSocket("question/create", req => dispatch({type: "addNewQuestion", data: makeNewData(req)}));
	useSocket("question/toggleStar", req => dispatch({type: "toggleStar", data: req}));
	useSocket("question/move", req => dispatch({type: "moveQuestion", data: req}));
	useSocket("questionLike/create", req => dispatch({
		type: "createLike",
		data: {GuestId: req.GuestId, QuestionId: req.QuestionId},
	}));
	useSocket("questionLike/remove", req => dispatch({
		type: "createLike",
		data: {GuestId: req.GuestId, QuestionId: req.QuestionId},
	}));
};

export default useSocketHandler;
