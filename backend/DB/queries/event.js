import models from "../models";

module.exports = class EventQuery {
	constructor() {}

	async getIdByCode(code) {
		const event = await models.Event.findAll({
			where: {
				code,
			},
			attributes: ["id"],
		});

		return event;
	}

	async getQuestionsInEvent(code) {
		const question = await models.Event.findAll({
			include: [
				{
					model: models.Question,
					include: [
						{
							model: models.Emoji,
						}, {
							model: models.Question,
						}, {
							model: models.Like,
						}, {
                            model: models.Guest,
                        }
					],
				},
			],
			where: {
				code,
			},
		});

		return question;
	}
};
