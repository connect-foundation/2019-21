import logger from "../../logger.js";

const notifyPollOpenSocketHandler = async (data, emit) => {
	try {
		const {poll} = data;

		emit({status: "ok", poll});
	} catch (e) {
		logger.error(e);
		emit({status: "error", e});
	}
};

const eventName = "poll/notify_open";

export default {
	eventName,
	handler: notifyPollOpenSocketHandler,
};
