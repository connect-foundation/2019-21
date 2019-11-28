import models from "../models";

module.exports = class EventQuery {
	constructor() {}

	static async getIdByCode(code) {
		const event = await models.Event.findAll({
			where: {
				code,
			},
			attributes: ["id"],
		});

		return event;
	}

	static async getQuestionsInEvent(code, guestId) {
		const event = await models.Event.findOne({where: {code}});
		const questions = await models.Question.findAll({
			where: {EventId: event.id},
			include: [
				{
					model: models.Like,
				},
				{
					model: models.Emoji,
				},
			],
		});

		const res = JSON.parse(JSON.stringify(questions));

		res.map(x => {
			x.likeCount = x.Likes.length;
			return x;
		}).map(x => {
			x.isLike = x.Likes.filter(b => b.GuestId === guestId) > 0;
			return x;
		}).map(x => {
			x.Likes = undefined;
			return x;
		}).map(x => {
			x.Emojis.map(emoji => {
				emoji.didIPicked = emoji.EmojiQuestions.GuestId === guestId;

				emoji.EmojiQuestions = undefined;

				return emoji;
			});
		});

		return res;
	}
};
