const notifyPollCloseSocketHandler = async (data, emit) => {
	try {
		const {id} = data;

		emit(id);
	} catch (e) {
		console.error(e);
		emit({status: "error", e});
	}
};

const eventName = "poll/notify_close";

export default {
	eventName,
	handler: notifyPollCloseSocketHandler,
};
