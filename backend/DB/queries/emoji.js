import sequelize from "sequelize";
import models from "../models";

// noinspection JSUnresolvedVariable
const Emoji = models.Emoji;

export async function createEmoji({GuestId, QuestionId, name, EventId}) {
	return Emoji.create({
		GuestId,
		QuestionId,
		name,
		EventId,
	});
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
	return Emoji.findAll({where: {name, QuestionId, GuestId}});
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
	return Emoji.findAll({
		where: {GuestId, EventId},
		attributes: ["name", "QuestionId"],
	});
}
