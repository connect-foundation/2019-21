import models from "../models";

const Question = models.Question;

export async function createQuestion(
	EventId,
	content,
	GuestId,
	state = "active",
	QuestionId,
) {
	return Question.create({
		content,
		EventId,
		GuestId,
		state,
		QuestionId,
	});
}

export async function getQuestionsByEventId(EventId) {
	return Question.findAll({
		where: {EventId},
	});
}

export async function getQuestionByGuestId(GuestId) {
	return Question.findAll({
		where: {GuestId},
	});
}

export async function deleteQuestionById(id) {
	return Question.destroy({where: {id}});
}

export async function updateQuestionById({id, content}) {
	return Question.update({content}, {where: {id}});
}
