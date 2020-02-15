import {getVotersByCandidateList} from "../../../DB/queries/vote.js";
import {getCandidatesByPollId} from "../../../DB/queries/candidate.js";

export const simplifyList = list => list.map(n => n.get({plain: true}));

/**
 *
 * @param {object[]} items
 *
 * CandidateId (int) 만 읽어서 array로 반환해주는 함수
 */
export const getCandidateList = items => items.map(n => n.id);
/**
 *
 * @param {int} pollId
 * @param {int[]} candidates
 *
 * 하나의 poll 은 여러개의 candidates (예. 기호1번, 기호2번 등)을 가지고 있음
 * 각 candidate 별 득표수를 계산하고,
 * 가장 많은 득표수를 받은 candidate의 firstPlace 값을 true로 설정하고,
 * candidates들을 묶어서 nItems 라는 하나의 array에 넣어서 poll 객체에 넣어주는 함수
 */
export async function getItems(pollId, candidates) {
	const nItems = [];
	let firstPlaceIndex = [];
	let index = 0;
	let firstPlaceValue = 0;

	for (const n of candidates) {
		if (n.PollId === pollId) {
			const voters = await getVotersByCandidateList([n.id]);

			nItems.push({
				...n,
				voters,
				voted: false,
				firstPlace: false,
			});
			// Poll에 속한 candidates들 중에 가장 많은 득표수를 받은 candidate을 찾아내는 부분
			if (voters === firstPlaceValue) {
				firstPlaceIndex.push(index);
			} else if (voters > firstPlaceValue) {
				firstPlaceIndex = [];
				firstPlaceIndex.push(index);
				firstPlaceValue = voters;
			}
			index++;
		}
	}
	// Poll에 속한 candidates들 중에 가장 많은 득표수를 받은 candidate을 지정하는 부분
	firstPlaceIndex.forEach(i => {
		nItems[i].firstPlace = true;
	});

	return nItems;
}

/**
 *
 * @param {object[]} polls
 *
 * 하나의 poll에 속한 candidates들을 DB에서 읽어오는 함수
 */
export async function getCandidatesByPolls(polls) {
	const pollIdList = polls.map(poll => poll.id);
	const candidates = await getCandidatesByPollId(pollIdList);

	return simplifyList(candidates);
}

/**
 *
 * @param {object[]} polls
 * @param {object[]} candidates
 *
 * 여러개의 poll들과 그 poll들에 속하는 모든 candidates를 가져와서
 * 각 poll에 속한 candidates 들만 nItems 객체로 만들어서 저장함
 *
 * 그리고 해당 poll에 속한 모든 candidates들에 투표한 투표자수를 unique하게 더한 총투표수를 구함
 */
export async function setPollItems(polls, candidates) {
	for (const poll of polls) {
		poll.nItems = await getItems(poll.id, candidates);
		const candidateList = getCandidateList(poll.nItems);

		poll.totalVoters = await getVotersByCandidateList(candidateList);
	}

	return polls;
}
