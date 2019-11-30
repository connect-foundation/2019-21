import models from "../models";

module.exports = class EventQuery {
	constructor() {}

	static async getEventsByHost(hostId) {
		const events = await models.Event.findAll({
			where: { id: hostId },
		});

		return events;
	}

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
		const event = await models.Event.findOne({ where: { code } });
		const questions = await models.Question.findAll({
			where: { EventId: event.id },
			include: [
				{
					model: models.Like,
				},
				{
					model: models.Emoji,
				},
				{
					model: models.Guest,
				},
			],
		});

		const res = JSON.parse(JSON.stringify(questions));

		res.map(x => {
			x.likeCount = x.Likes.length;
			return x;
		})
			.map(x => {
				x.isLike = x.Likes.filter(b => b.GuestId === guestId) > 0;
				return x;
			})
			.map(x => {
				x.Likes = undefined;
				return x;
			})
			.map(x => {
				x.Emojis.map(emoji => {
					emoji.didIPicked = emoji.GuestId === guestId;

					return emoji;
				});

				return x;
			})
			.map(x => {
				x.guestName = x.Guest.name;
				return x;
			});

		return res;
	}
};
