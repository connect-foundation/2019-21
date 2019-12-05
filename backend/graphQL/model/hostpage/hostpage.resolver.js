import faker from "faker";
import {
	getEventsByHostId,
	findEventByEventCode,
	createEvent,
} from "../../../DB/queries/event.js";

export default {
	Query: {
		init: async (_, { param }, authority) => {
			if (authority.sub === "host") {
				const host = authority.info;
				const events = await getEventsByHostId(host.id);

				return { events, host };
			}

			throw new Error("AuthenticationError");
		},
	},
	Mutation: {
		createEvent: async (_, { info }, authority) => {
			if (authority.sub === "host") {
				let eventCode = faker.random.alphaNumeric(4);
				let event = await findEventByEventCode(eventCode);

				while (event) {
					eventCode = faker.random.alphaNumeric(4);
					event = await findEventByEventCode(eventCode);
				}
				event = await createEvent({
					eventCode,
					HostId: authority.info.id,
					startAt: info.startAt,
					endAt: info.endAt,
				});
				event = event[0].dataValues;
				return { ...event };
			}
			throw new Error("AuthenticationError");
		},
	},
};
