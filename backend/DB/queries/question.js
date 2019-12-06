import Sequelize from "sequelize";
import models from "../models";

const Op = Sequelize.Op;
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
	return models.Question.findAll({
		where: {EventId},
	});
}

export async function getQuestionReplyByEventId(EventId) {
	return Question.findAll({
		where: {EventId, QuestionId: {[Op.ne]: null}},
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


export async function getQuestionById(id) {
	return Question.findOne({where: {id}});
}
