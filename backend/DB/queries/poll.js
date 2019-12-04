import models from "../models";

export async function getPollsByEventId(eventId) {
	const result = await models.Poll.findAll({
		where: { EventId: eventId },
	});

	return result;
}
