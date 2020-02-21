import Sequelize from "sequelize";
import models from "../models";
import logger from "../logger.js";

const sequelize = models.sequelize;
const Op = Sequelize.Op;
// noinspection JSUnresolvedVariable
const Question = models.Question;

/**
 *
 * @param EventId <number|null>
 * @param content <String>
 * @param GuestId <number|null>
 * @param QuestionId <number|null>
 * @param state <String|null>
 * @returns {Promise<object>}
 */
export async function createQuestion({
	EventId,
	content,
	GuestId,
	QuestionId,
	state = "active",
}) {
	const res = await Question.create({
		content,
		EventId,
		GuestId,
		QuestionId,
		state,
	});

	return res.get({plain: true});
}

/**
 *
 * @param EventId {number|null}
 * @returns {Promise<object[]>}
 */
export async function getQuestionsByEventId(EventId) {
	const res = await Question.findAll({
		where: {EventId},
	});

	return res.map(x => x.get({plain: true}));
}

/**
 *
 * @param EventId {number|null}
 * @returns {Promise<object[]>}
 */
export async function getQuestionReplyByEventId(EventId) {
	const res = await Question.findAll({
		where: {EventId, QuestionId: {[Op.ne]: null}},
	});

	return res.map(x => x.get({plain: true}));
}

/**
 *
 * @param GuestId <number|null>
 * @returns {Promise<object[]>}
 */
export async function getQuestionByGuestId(GuestId) {
	const res = await Question.findAll({
		where: {GuestId},
	});

	return res.map(x => x.get({plain: true}));
}

/**
 *
 * @param id {number}
 * @returns {Promise<number>}
 */
export async function deleteQuestionById(id) {
	return Question.destroy({where: {id}});
}

/**
 *
 * @param id <number>
 * @param content <string|undefined>
 * @param state <string>
 * @param isStared <Boolean>
 * @returns {Promise<number>}
 */
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

/**
 *
 * @param from <number>
 * @param to <number>
 * @returns {Promise<void>}
 */
export async function updateQuestionIsStared({from, to}) {
	// todo simplify transaction
	const transaction = await sequelize.transaction();

	try {
		if (from) {
			await Question.update(
				{isStared: false},
				{where: {id: from}},
				{transaction},
			);
		}

		await Question.update(
			{isStared: true},
			{where: {id: to}},
			{transaction},
		);

		await transaction.commit();
	} catch (err) {
		if (transaction) {
			await transaction.rollback();
		}

		logger.error("Transaction rollback", err);
	}
}

/**
 *
 * @param id {number}
 * @returns {Promise<object|null>}
 */
export async function getQuestionById(id) {
	let res = await Question.findOne({where: {id}});

	if (res) {
		res = res.get({plain: true});
	}

	return res;
}

// todo what ???
export async function updateEveryState(from, {state}) {
	return Question.update(
		{
			state,
		},
		{where: {state: from}},
	);
}
