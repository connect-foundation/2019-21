import {getGuestByEventId} from "../../../DB/queries/guest.js";

const guestResolver = async EventId => getGuestByEventId(EventId);

// noinspection JSUnusedGlobalSymbols
export default {
	Query: {
		guests: (_, {EventId}) => guestResolver(EventId),
	},
};
