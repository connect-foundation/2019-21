import models from "../models";

// noinspection JSUnresolvedVariable
const Like = models.Like;

export async function createLike(GuestId, QuestionId) {
	return Like.create({
		GuestId,
		QuestionId,
	});
}

export async function deleteLikeById(id) {
	return Like.destroy({
		where: {id},
	});
}

export async function deleteLikeBy({GuestId, QuestionId}) {
	return Like.destroy({where: {GuestId, QuestionId}});
}

export async function getLikesByGuestId(GuestId) {
	return Like.findAll({
		where: {GuestId},
	});
}

export async function getLikesByQuestionId(QuestionId) {
	return Like.findAll({
		where: {QuestionId},
	});
}

export async function getLikeCountByQuestion(QuestionId) {
	return Like.count({
		where: {QuestionId},
	});
}

export async function getDidILikes({QuestionId, GuestId}) {
	return Like.findOne({where: {QuestionId, GuestId}});
}
