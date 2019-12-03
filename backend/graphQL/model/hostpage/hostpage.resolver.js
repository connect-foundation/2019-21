import {findHostById} from "../../../DB/queries/host";
import {getEventsByHostId} from "../../../DB/queries/event.js";

export default {
	Query: {
		init: async (_, {}, authority) => {
			if (authority.sub === "host") {
				const host = authority.info;
				const events = await getEventsByHostId(host.id);

				return {events, host};
			}

			throw new Error("AuthenticationError");
		},
	},
};
