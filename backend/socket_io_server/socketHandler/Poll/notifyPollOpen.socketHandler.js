const notifyPollOpenSocketHandler = async (data, emit) => {
	try {
		const {poll} = data;

		emit(poll);
	} catch (e) {
		console.error(e);
		emit({status: "error", e});
	}
};

const eventName = "poll/notify_open";

export default {
	eventName,
	handler: notifyPollOpenSocketHandler,
};
