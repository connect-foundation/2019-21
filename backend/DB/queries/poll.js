import models from "../models";

const Poll = models.Poll;
const Candidate = models.Candidate;

export async function getPollsByEventId(eventId) {
	const result = await models.Poll.findAll({
		where: { EventId: eventId },
	});

	return result;
}

export async function createPoll(
	EventId,
	pollName,
	pollType,
	selectionType,
	allowDuplication,
	state,
	candidates
) {
	const poll = await Poll.create({
		EventId,
		pollName,
		pollType,
		selectionType,
		allowDuplication,
		state,
	});

	switch (pollType) {
		case "nItems":
			let i = 0;
			for (let value of candidates) {
				await Candidate.create({
					PollId: poll.id,
					number: i,
					content: value,
				});
				i++;
			}
			break;
		case "rating":
			for (let i = 0; i < candidates; i++) {
				await Candidate.create({
					PollId: poll.id,
					number: i,
					content: (i + 1).toString(),
				});
			}
			break;
		default:
			throw new Error("Unhandled pollType");
	}

	return poll;
}
