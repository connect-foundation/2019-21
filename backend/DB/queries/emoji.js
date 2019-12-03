import models from "../models";

const Emoji = models.Emoji;

export async function createEmoji({GuestId, QuestionId, name}) {
	return Emoji.create({
		GuestId,
		QuestionId,
		name,
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
