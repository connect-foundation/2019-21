import {createPoll} from "../../../DB/queries/poll";

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

		const state = "standby";

		const result = await createPoll(
			EventId,
			pollName,
			pollType,
			selectionType,
			allowDuplication,
			state,
			candidates,
		);

		emit(result);
	} catch (e) {
		console.error(e);
		emit({status: "error", e});
	}
};

const eventName = "poll/create";

export default {
	eventName,
	handler: createPollSocketHandler,
};
