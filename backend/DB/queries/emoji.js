import sequelize from "sequelize";
import models from "../models";

// noinspection JSUnresolvedVariable
const Emoji = models.Emoji;

export async function createEmoji({GuestId, QuestionId, name, EventId}) {
	const res = await Emoji.create({
		GuestId,
		QuestionId,
		name,
		EventId,
	});

	return res.get({plain: true});
}

export async function deleteEmojiById(id) {
	return Emoji.destroy({
		where: {id},
	});
}

export async function deleteEmojiBy({name, GuestId, QuestionId}) {
	return Emoji.destroy({where: {name, GuestId, QuestionId}});
}

export async function getDidIPicked({name, QuestionId, GuestId}) {
	const res = await Emoji.findAll({where: {name, QuestionId, GuestId}});

	return res.map(x => x.get({plain: true}));
}

export async function getEmojiCountBy({name, QuestionId}) {
	return Emoji.count({where: {name, QuestionId}});
}

export async function getEmojiCountByEventIdGroupByQuestionId({EventId}) {
	return Emoji.findAll({
		attributes: ["QuestionId", "name", [sequelize.fn("count", "id"), "count"], [sequelize.literal("MIN(createdAt)"), "createdAt"]],
		where: {EventId},
		group: ["QuestionId", "name"],
		raw: true,
	});
}

export async function getEmojiPick({GuestId, EventId}) {
	const res = await Emoji.findAll({
		where: {GuestId, EventId},
		attributes: ["name", "QuestionId"],
	});

	return res.map(x => x.get({plain: true}));
}
