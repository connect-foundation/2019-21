import {closePoll} from "../../../DB/queries/poll";

const closePollSocketHandler = async (data, emit) => {
	try {
		const {pollId} = data;

		const result = await closePoll(pollId);

		if (result[0] != 1) {
			console.log(
				`Something wrong with poll/close: affected number of rows = ${result[0]}`
			);
			return;
		}
		emit(pollId);
	} catch (e) {
		console.error(e);
		emit({status: "error", e});
	}
};

const eventName = "poll/close";

export default {
	eventName,
	handler: closePollSocketHandler,
};
