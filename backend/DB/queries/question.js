import models from "../models";

export async function createQuestion(EventId, content, GuestId) {
	const result = await models.Question.create({
		content,
		EventId,
		GuestId,
		state: "active",
		QuestionId: null,
	});

	return result;
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
