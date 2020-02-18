import {getCandidatesByGuestId} from "../../../DB/queries/vote.js";
import {
	getCandidateList,
	getCandidatesByPolls,
	setPollItems,
	simplifyList,
} from "./resolveHelper.js";
import {getPollsByEventId} from "../../../DB/queries/poll.js";


// todo 이함수 동장이 무엇인지 알아내기
// noinspection JSClosureCompilerSyntax,JSCommentMatchesSignature
/**
 *
 * @param {candidate에 해당하는 객체} items
 * @param {특정 guest가 특정 poll에 참가하여 투표를 한 candidate 목록} votedList
 *
 * 특정 guest가 poll에 속한 여러 candidate들 중에서 투표한 candidate가 있는지 확인하고 투표여부를 저장함
 */
const setVotedOnCandidate = (poll, votedList) => {
	poll.nItems.forEach((item, index) => {
		if (votedList.includes(item.id)) {
			item.voted = true;
			if (poll.pollType === "rating") {
				poll.rated = true;
				poll.ratingValue = index + 1;
				// console.log("Rated", poll.id, poll.ratingValue, poll.rated);
			}
		}
	});
};

/**
 *
 * @param {object[]} polls
 * @param {int} guestId
 *
 * 특정 guest가 poll에 속한 여러 candidate들 중에서 투표한 candidate가 있는지 확인하고 투표여부를 저장함
 */
async function setVotedOnPolls(polls, guestId) {
	for (const poll of polls) {
		poll.ratingValue = 0;
		poll.rated = false;
		const candidateList = getCandidateList(poll.nItems);
		// todo fix lint here
		// eslint-disable-next-line no-await-in-loop
		let votedList = await getCandidatesByGuestId(candidateList, guestId);

		votedList = simplifyList(votedList);
		votedList = votedList.map(n => n.CandidateId);
		setVotedOnCandidate(poll, votedList);
	}

	return polls;
}

/**
 *
 * @param {int} EventId
 * @param {int} guestId
 *
 * Yoga Resolver
 */
async function pollGuestResolver(EventId, guestId) {
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
	polls = await setVotedOnPolls(polls, guestId);

	return polls;
}

// noinspection JSUnusedGlobalSymbols
export default {
	Query: {
		pollGuest: (_, {EventId, guestId}) =>
			pollGuestResolver(EventId, guestId),
	},
};
