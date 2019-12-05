import models from "../models";

export async function getAllEvents() {
	return models.Event.findAll();
}

export async function createEvent({
	eventName,
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
			eventName,
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

export async function getEventById(EventId){
	const event = await models.Event.findOne({
		where:{
			id:EventId
		}
	})
	return event;
}

export async function getEventOptionByEventId(id) {
	const event = await models.Event.findOne({
		where: {
			id,
		},
		attributes: ["moderationOption", "replyOption"],
	});

	return event;
}

export async function getQuestionLikeCount(EventId = 2, limit, offset) {
	return models.Question.findAll({
		attributes: ["id", [models.sequelize.fn("count", "*"), "likeCount"]],
		where: { EventId, QuestionId: null },
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

export async function getQuestionsByEventCodeAndGuestId(
	eventCode,
	guestId,
	limit = 70,
	offset
) {
	// const event = await models.Event.findOne({where: {eventCode}});
	// const EventId = event.dataValues.id
	const EventId = 2;

	return models.Question.findAll({
		where: { EventId, QuestionId: null },
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
		offset,
		limit,
	});
}

export async function raw_getQuestionsByEventCodeAndGuestId(
	eventCode,
	guestId,
	limit = 100,
	offset = 0
) {
	// const event = await models.Event.findOne({where: {eventCode}});
	// const EventId = event.dataValues.id
	const EventId = 2;

	const query = `
	select *, Emojis.name, Emojis.GuestId 
	from Questions 
		inner join Emojis on Questions.id = Emojis.QuestionId
	where EventId = :EventId and Questions.QuestionId is null
-- 	order by Emojis.QuestionId DESC
	
-- 	limit :limit offset :offset
	
-- 	group by Emojis.QuestionId
`;
	// console.log(event.dataValues.id)
	const [questions] = await models.sequelize.query(query, {
		replacements: {
			EventId,
			limit,
			offset,
			type: Sequelize.QueryTypes.SELECT,
			raw: true,
		},
	});

	return questions;
}
