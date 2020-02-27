import {
	getGuestByEventId,
	getGuestByGuestSid,
} from "../../../DB/queries/guest.js";
import {getEventById} from "../../../DB/queries/event.js";

const guestResolver = async EventId => getGuestByEventId(EventId);

const guestInEventResolver = async authority => {
	if (authority.sub !== "guest") {
		throw Error("AuthenticationError in guestInEventResolver");
	}

	const guest = await getGuestByGuestSid(authority.info);
	const event = await getEventById(guest.EventId);

	return {event, guest};
};

// noinspection JSUnusedGlobalSymbols
export default {
	Query: {
		guests: (_, {EventId}) => guestResolver(EventId),
		// eslint-disable-next-line no-empty-pattern
		guestInEvent: (_, {}, authority) => guestInEventResolver(authority),
	},
};
