import {createPoll} from "../../../DB/queries/poll";
import logger from "../../logger.js";

const createPollSocketHandler = async (data, emit) => {
	try {
		const {
			EventId,
			pollName,
			pollType,
			selectionType,
			allowDuplication,
			candidates,
		} = data;

		const poll = await createPoll(
			EventId,
			pollName,
			pollType,
			selectionType,
			allowDuplication,
			candidates,
		);

		emit({status: "ok", poll});
	} catch (e) {
		logger.error(e);
		emit({status: "error", e});
	}
};

const eventName = "poll/create";

// noinspection JSUnusedGlobalSymbols
export default {
	eventName,
	handler: createPollSocketHandler,
};
