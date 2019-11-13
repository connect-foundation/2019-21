import models from "../models";

class Event {
    constructor() {}

    async getIdByCode(code) {
        try {
            const event = await models.Event.findAll({
                where: {
                    code: code,
                },
                attributes: ["id"],
            });
            return event;
        } catch (exeption) {
            return exeption;
        }
    }
}
const event = new Event();
event.getByCode("1cfs");
