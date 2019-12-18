import {socketClient} from "../../socket.io";

// allowDuplication == false, 즉, 복수선택이 아닌 경우, 이전에 vote 한 candidate가 있으면 삭제해야 함
const getCandidateToDelete = (items, candidateId) => {
	const candidates = items.filter(
		item => item.voted && item.id !== candidateId,
	);

	if (candidates.length > 0) {
		return candidates[0].id;
	} else {
		return null;
	}
};

// 복수선택이 아닌 투표의 경우, 다른 선택된 항목을 uncheck 하는 함수
const uncheckOtherItems = items => {
	items.forEach(item => {
		if (item.voted) {
			item.voted = false;
			item.voters--;
		}
	});
};

// N지선다형 투표에서 CLICK 으로 인해 상태 변화가 발생한 경우 처리하는 함수
const updateItems = (items, number, allowDuplication) => {
	const newItems = [...items];

	if (newItems[number].voted) {
		newItems[number].voted = false;
		newItems[number].voters--;
	} else {
		if (!allowDuplication) {
			uncheckOtherItems(newItems);
		}

		newItems[number].voted = true;
		newItems[number].voters++;
	}
	return newItems;
};

// 별점 투표는 목록이 최대 별점갯수만큼 있음. 선택한 value - 1 이 index가 됨
const updateRatingItem = (items, value, voted) => {
	const newItems = [...items];

	if (voted) {
		newItems[value - 1].voters++;
		newItems[value - 1].voted = voted;
	} else {
		newItems[value - 1].voters++;
		newItems[value - 1].voted = voted;
	}

	return newItems;
};

// 투표의 참여 총인원수를 계산하는 함수 (복수선택 고려함)
const updateTotalVoters = (notVoted, totalVoters, items) => {
	let result = totalVoters;

	if (notVoted) {
		if (items.some(item => item.voted)) {
			result = totalVoters + 1;
		}
	} else if (items.every(item => item.voted === false)) {
		result = totalVoters - 1;
	}

	return result;
};

// 가장 많은 투표수를 받은 항목을 다시 계산하는 부분
const updateFirstPlace = poll => {
	const newPoll = {...poll};

	let firstPlaceIndex = [];
	let firstPlaceValue = 0;

	newPoll.nItems.forEach((item, index) => {
		if (item.voters === firstPlaceValue) {
			firstPlaceIndex.push(index);
		} else if (item.voters > firstPlaceValue) {
			firstPlaceIndex = [];
			firstPlaceIndex.push(index);
			firstPlaceValue = item.voters;
		}
	});

	// 우선 초기화
	newPoll.nItems.forEach(item => {
		item.firstPlace = false;
	});
	// 위에서 계산된 index 의 firstPlace 값만 변경함
	firstPlaceIndex.forEach(i => {
		newPoll.nItems[i].firstPlace = true;
	});

	return newPoll;
};

/**
 *
 * @param {dispatch의 action에 해당하는 object} vote
 * 		dispatch({
			type: "VOTE",
			pollId: id,
			candidateId,
			number,
			GuestId,
		});
 * @param {object} poll
		type Candidate {
			id: Int!
			number: Int!
			content: String!
			voters: Int!
			voted: Boolean
			firstPlace: Boolean
		}
		type Poll {
			id: Int!
			pollName: String!
			pollType: String!
			selectionType: String!
			allowDuplication: Boolean!
			state: String!
			pollDate: String
			totalVoters: Int!
			createdAt: String!
			nItems: [Candidate]!
			ratingValue: Int!
			rated: Boolean!
		}
 * @param {int} candidateToDelete
 *		복수선택이 안되는 투표의 경우,
 *		이미 다른 candidate에 투표를 한 상황에서 다시 다른 candidate을 투표하는 경우,
 *		예전에 투표한 candidate에 투표했다는 정보를 DB에서 삭제하기 위함
 */
const emitVoteData = (vote, poll, candidateToDelete) => {
	const action = poll.nItems[vote.number].voted ? "on" : "off";
	const data = {
		GuestId: vote.GuestId,
		CandidateId: vote.candidateId,
		allowDuplication: poll.allowDuplication,
		poll,
		candidateToDelete,
	};

	socketClient.emit(`vote/${action}`, data);
};

/**
 *
 * @param {dispatch의 action에 해당하는 object} rate
 * 		dispatch({
			type: "RATE",
			value,
			pollId: id,
			GuestId,
		});
 * @param {object} poll
 		type Candidate {
			id: Int!
			number: Int!
			content: String!
			voters: Int!
			voted: Boolean
			firstPlace: Boolean
		}
		type Poll {
			id: Int!
			pollName: String!
			pollType: String!
			selectionType: String!
			allowDuplication: Boolean!
			state: String!
			pollDate: String
			totalVoters: Int!
			createdAt: String!
			nItems: [Candidate]!
			ratingValue: Int!
			rated: Boolean!
		}
 * @param {int} candidateId
		투표한 candidate의 id
 * @param {int} index
		투표한 candidate가 array에서 위치한 index
 */
const emitRateData = (rate, poll, candidateId, index) => {
	const action = rate.type === "RATE" ? "on" : "off";
	const data = {
		GuestId: rate.GuestId,
		CandidateId: candidateId,
		poll,
		index,
	};

	socketClient.emit(`rate/${action}`, data);
};

export default function reducer(polls, action) {
	let thePoll;
	let index;
	let candidateId;

	const {pollId} = action;

	if (pollId) {
		thePoll = polls.filter(poll => poll.id === pollId)[0];
	}

	switch (action.type) {
		// host가 생성한 투표를 host가 open 함
		case "NOTIFY_OPEN": {
			return [action.poll, ...polls];
		}
		// host가 open한 투표를 close 함
		case "NOTIFY_CLOSE": {
			return polls.filter(poll => poll.id !== pollId);
		}
		// 나 또는 남이 vote(N지선다) 했음을 알려줌
		case "SOMEONE_VOTE": {
			thePoll.totalVoters = action.poll.totalVoters;
			thePoll.nItems.forEach((item, index) => {
				item.voters = action.poll.nItems[index].voters;
				item.firstPlace = action.poll.nItems[index].firstPlace;
			});

			return polls.map(poll => (poll.id === pollId ? thePoll : poll));
		}
		// 나 또는 남이 rate(별점매기기) 했음을 알려줌
		case "SOMEONE_RATE": {
			thePoll.totalVoters = action.poll.totalVoters;

			return polls.map(poll => (poll.id === pollId ? thePoll : poll));
		}
		// 내가 vote(N지선다) 했음
		case "VOTE": {
			const notVoted = thePoll.nItems.every(item => item.voted === false);
			let candidateToDelete = null;

			if (!thePoll.allowDuplication) {
				candidateToDelete = getCandidateToDelete(
					thePoll.nItems,
					action.candidateId,
				);
			}

			thePoll = {
				...thePoll,
				nItems: updateItems(
					thePoll.nItems,
					action.number,
					thePoll.allowDuplication,
				),
				totalVoters: updateTotalVoters(
					notVoted,
					thePoll.totalVoters,
					thePoll.nItems,
				),
			};
			thePoll = updateFirstPlace(thePoll);

			emitVoteData(action, thePoll, candidateToDelete);

			return polls.map(poll => (poll.id === pollId ? thePoll : poll));
		}
		// 내가 rate(별점매기기) 했음
		case "RATE": {
			if (thePoll.rated) {
				return polls;
			}

			thePoll = {
				...thePoll,
				nItems: updateRatingItem(thePoll.nItems, action.value, true),
				rated: true,
				ratingValue: action.value,
				totalVoters: thePoll.totalVoters + 1,
			};

			index = parseInt(action.value, 10) - 1;
			candidateId = thePoll.nItems[index].id;
			emitRateData(action, thePoll, candidateId, index);

			return polls.map(poll => (poll.id === pollId ? thePoll : poll));
		}
		// 내가 rate(별점매기기)를 취소했음
		case "CANCEL_RATING": {
			if (!thePoll.rated) {
				return polls;
			}

			index = parseInt(thePoll.ratingValue, 10) - 1;
			thePoll = {
				...thePoll,
				nItems: updateRatingItem(
					thePoll.nItems,
					thePoll.ratingValue,
					false,
				),
				rated: false,
				ratingValue: 0,
				totalVoters: thePoll.totalVoters - 1,
			};
			candidateId = thePoll.nItems[index].id;
			emitRateData(action, thePoll, candidateId, index);

			return polls.map(poll => (poll.id === pollId ? thePoll : poll));
		}

		default:
			throw new Error("Unhandled action.");
	}
}
