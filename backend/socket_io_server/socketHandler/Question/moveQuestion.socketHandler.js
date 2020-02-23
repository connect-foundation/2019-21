import {
	updateEveryState,
	updateQuestionById,
} from "../../../DB/queries/question";
import logger from "../../logger.js";

const moveQuestionSocketHandler = async (data, emit) => {
	try {
		const id = data.id;
		const state = data.to;

		if (id === "all") {
			await updateEveryState("active", {state});
		} else {
			await updateQuestionById({id, state});
		}

		emit(data);
	} catch (e) {
		logger.error(e);

		emit({status: "error", e});
	}
};

const eventName = "question/move";

// noinspection JSUnusedGlobalSymbols
export default {
	eventName,
	handler: moveQuestionSocketHandler,
};
