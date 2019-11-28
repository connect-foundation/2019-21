import models from "../models";

async function createQuestion(eventId, text, guestId) {
	const result = await models.Question.create({
		content: text,
		EventId: eventId,
		GuestId: guestId,
		state: "active",
		isStared: 0,
		QuestionId: null,
	});

	const status = !result ? false : true;
	return status;
}

export { createQuestion };
