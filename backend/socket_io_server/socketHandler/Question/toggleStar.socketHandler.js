import {updateQuestionIsStared} from "../../../DB/queries/question";
import logger from "../../logger.js";

const toggleStarSocketHandler = async (data, emit) => {
	try {
		const from = data.from[0];
		const to = data.to[0];

		await updateQuestionIsStared({from: from.id, to: to.id});
		emit(to);
	} catch (e) {
		logger.error(e);
		emit({status: "error", e});
	}
};

const eventName = "question/toggleStar";

// noinspection JSUnusedGlobalSymbols
export default {
	eventName,
	handler: toggleStarSocketHandler,
};
