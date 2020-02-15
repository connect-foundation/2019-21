import {openPoll} from "../../../DB/queries/poll";
import logger from "../../logger.js";

const openPollSocketHandler = async (data, emit) => {
	try {
		let status = "ok";
		const {pollId} = data;

		const result = await openPoll(pollId);

		if (result[0] !== 1) {
			logger.error(
				`Something wrong with poll/open: affected number of rows = ${result[0]}`,
			);
			status = "error";
		}
		emit({status, pollId});
	} catch (e) {
		logger.error(e);
		emit({status: "error", e});
	}
};

const eventName = "poll/open";

// noinspection JSUnusedGlobalSymbols
export default {
	eventName,
	handler: openPollSocketHandler,
};
