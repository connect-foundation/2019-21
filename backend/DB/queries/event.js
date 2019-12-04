import models from "../models";

export async function findEventByEventCode(eventCode) {
	return models.Event.findOne({ where: { eventCode } });
}

export async function createEvent({
	eventCode,
	HostId,
	moderationOption = false,
	replyOption = false,
	startAt = new Date(),
	endAt = new Date(),
}) {
	return models.Event.findOrCreate({
		where: { eventCode },
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
	{ eventCode, moderationOption, replyOption, startAt, endAt }
) {
	return models.Event.update(
		{ eventCode, moderationOption, replyOption, startAt, endAt },
		{ where: { id } }
	);
}

export async function getEventsByHostId(hostId) {
	const events = await models.Event.findAll({
		where: { HostId: hostId },
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

export async function getQuestionsByEventCodeAndGuestId(eventCode, guestId) {
	const event = await models.Event.findOne({ where: { eventCode } });
	const questions = await models.Question.findAll({
		where: { EventId: event.id },
		include: [
			{
				model: models.Like,
			},
			{
				model: models.Emoji,
			},
			{
				model: models.Guest,
			},
		],
	});

	const res = JSON.parse(JSON.stringify(questions));

	res.map(x => {
		x.likeCount = x.Likes.length;
		return x;
	})
		.map(x => {
			x.isLike = x.Likes.filter(b => b.GuestId === guestId) > 0;
			return x;
		})
		.map(x => {
			x.Likes = undefined;
			return x;
		})
		.map(x => {
			x.Emojis.map(emoji => {
				emoji.didIPicked = emoji.GuestId === guestId;

				return emoji;
			});

			return x;
		})
		.map(x => {
			x.guestName = x.Guest.name;
			return x;
		});

	return res;
}
