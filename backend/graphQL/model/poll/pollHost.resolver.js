import {getPollsByEventId} from "../../../DB/queries/poll.js";
import {getCandidatesByPolls, setPollItems, simplifyList} from "./resolveHelper.js";

/**
 *
 * @param {int} EventId
 *
 * Yoga Resolver
 */
async function pollHostResolver(EventId) {
	/**
	 * getEventIdByEventCode(eventCode)
	 * getPollsByEventId(event.id)
	 * 해당 guestId가 어떻게 투표를 했는지에 대한 정보를 가져옴(active 여부와 상관없이)
	 *
	 */

	let polls = await getPollsByEventId(EventId);

	polls = simplifyList(polls);

	const candidates = await getCandidatesByPolls(polls);

	polls = await setPollItems(polls, candidates);
	return polls;
}

// noinspection JSUnusedGlobalSymbols
export default {
	Query: {
		pollHost: (_, {EventId}) => pollHostResolver(EventId),
	},
};
