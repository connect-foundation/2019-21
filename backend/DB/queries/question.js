import models from "../models";

export async function createQuestion(eventId, text, guestId) {
	const result = await models.Question.create({
		content: text,
		EventId: eventId,
		GuestId: guestId,
		state: "active",
		isStared: 0,
		QuestionId: null,
	});

	const status = !!result;

	return status;
}

export async function getQuestionsByEventId(eventId) {
	return models.Question.findAll({
		where: {EventId: eventId},
		include: [
			{
				model: models.Like,
			}, {
				model: models.Emoji,
			}, {
				model: models.Guest,
			},
		],
	});
}
