import models from "../models";

export async function createEvent({
	eventCode,
	HostId,
	moderationOption = false,
	replyOption = false,
	startAt = new Date(),
	endAt = new Date(),
}) {
	return models.Event.findOrCreate({
		where: {eventCode},
		defaults: {
			moderationOption,
			replyOption,
			startAt,
			endAt,
			HostId,
		},
	});
}

export async function updateEventById(
	id,
	{eventCode, moderationOption, replyOption, startAt, endAt},
) {
	return models.Event.update(
		{eventCode, moderationOption, replyOption, startAt, endAt},
		{where: {id}},
	);
}

export async function getEventsByHostId(hostId) {
	const events = await models.Event.findAll({
		where: {HostId: hostId},
	});

	return events;
}

export async function getEventIdByEventCode(eventCode) {
	const event = await models.Event.findOne({
		where: {
			eventCode,
		},
		attributes: ["id"],
	});

	return event;
}

export async function getQuestionLikeCount(EventId = 2, limit, offset) {
	return models.Question.findAll({
		attributes: ["id", [models.sequelize.fn("count", "*"), "likeCount"]],
		where: {EventId, QuestionId: null},
		include: [
			{
				model: models.Like,
				attributes: [],
			},
		],
		group: "id",
		offset,
		limit,
	});
}
