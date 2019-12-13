import {openPoll} from "../../../DB/queries/poll";

const openPollSocketHandler = async (data, emit) => {
	try {
		const {pollId} = data;

		const result = await openPoll(pollId);

		if (result[0] != 1) {
			console.log(
				`Something wrong with poll/open: affected number of rows = ${result[0]}`,
			);
			return;
		}
		emit(pollId);
	} catch (e) {
		console.error(e);
		emit({status: "error", e});
	}
};

const eventName = "poll/open";

export default {
	eventName,
	handler: openPollSocketHandler,
};
