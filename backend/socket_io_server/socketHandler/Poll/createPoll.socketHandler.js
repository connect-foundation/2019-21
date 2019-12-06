import { createPoll } from "../../../DB/queries/poll";

/**
 * data format은 아래 내용 중 가능한 것들은 모두 있어야 함
 * {
 *      EventId:
 *      PollId:
 *      CandidateId:
 *      GuestId:
 * }
 *
 */

const createPollSocketHandler = async (data, emit) => {
	try {
		console.log(data);
		const {
			EventId,
			pollName,
			pollType,
			selectionType,
			allowDuplication,
			candidates,
		} = data;

		const state = "running";

		const poll = await createPoll(
			EventId,
			pollName,
			pollType,
			selectionType,
			allowDuplication,
			state,
			candidates
		);

		console.log("delayed");

		emit(data);
	} catch (e) {
		console.error(e);
		emit({ status: "error", e });
	}
};

const eventName = "poll/create";

export default {
	eventName,
	handler: createPollSocketHandler,
};
