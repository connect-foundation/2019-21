import Sequelize from "sequelize";
import models from "../models";

const sequelize = models.sequelize;
const Op = Sequelize.Op;
const Question = models.Question;

export async function createQuestion(
	EventId,
	content,
	GuestId,
	QuestionId,
	state = "active",
) {
	return Question.create({
		content,
		EventId,
		GuestId,
		QuestionId,
		state,
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

export async function updateQuestionById({id, content, state, isStared}) {
	return Question.update(
		{
			content,
			state,
			isStared,
		},
		{where: {id}},
	);
}

export async function updateIsStared(from, to) {
	const transaction = await sequelize.transaction();

	try {
		if (from) {
			await Question.update({isStared: from.isStared},
				{where: {id: from.id}},
				{transaction},
			);
		}
		await Question.update({isStared: to.isStared},
			{where: {id: to.id}},
			{transaction},
		);
		await transaction.commit();
	} catch (err) {
		if (transaction) await transaction.rollback();
		console.log("Transaction rollback", err);
	}
}

export async function updateEveryState(from, {state}) {
	return Question.update(
		{
			state,
		},
		{where: {state: from}},
	);
}

export async function getQuestionById(id) {
	return Question.findOne({where: {id}});
}
