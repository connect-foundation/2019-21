import {
	getGuestByEventId,
	findGuestBySid,
} from "../../../DB/queries/guest.js";
import { getEventById } from "../../../DB/queries/event.js";

const guestResolver = async EventId => getGuestByEventId(EventId);

const guestInEventResolver = async authority => {
	if (authority.sub === "guest") {
		const guest = await findGuestBySid(authority.info);
		let event = await getEventById(guest.EventId);
		event = event.dataValues;
		return { event, guest };
	}

	throw new Error("AuthenticationError");
};

// noinspection JSUnusedGlobalSymbols
export default {
	Query: {
		guests: (_, { EventId }) => guestResolver(EventId),
		guestInEvent: (_, {}, authority) => guestInEventResolver(authority),
	},
};
