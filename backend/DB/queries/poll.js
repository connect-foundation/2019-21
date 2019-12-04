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
	name,
	type,
	allowDuplication,
	state,
	candidates
) {
	const pollType = type;

	const poll = await Poll.create({
		EventId,
		name,
		pollType,
		allowDuplication,
		state,
	});

	switch (pollType) {
		case 0: // N지선다 (text)
		case 1: // N지선다 (date)
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
		case 2: // 별점매기기
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
