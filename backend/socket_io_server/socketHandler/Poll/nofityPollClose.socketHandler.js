import logger from "../../logger.js";

const notifyPollCloseSocketHandler = async (data, emit) => {
	try {
		const {pollId} = data;

		emit({status: "ok", pollId});
	} catch (e) {
		logger.error(e);
		emit({status: "error", e});
	}
};

const eventName = "poll/notify_close";

// noinspection JSUnusedGlobalSymbols
export default {
	eventName,
	handler: notifyPollCloseSocketHandler,
};
