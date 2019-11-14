import models from "../models";

class Event {
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
        const questions = await models.Event.findAll({
            include: [{ model: models.Question }],
        });
    }
}
