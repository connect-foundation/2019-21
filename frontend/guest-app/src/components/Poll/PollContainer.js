import React, {useReducer} from "react";
import styled from "styled-components";
import PollCard from "./PollCard";
import {useSocket} from "../../libs/socket.io-Client-wrapper";

const ColumnWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	box-sizing: border-box;
	border: 1px solid #dee2e6; /* Gray3 */
	padding: 1rem;
	width: 100%;
`;

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

function reducer(polls, action) {
	let thePoll;

	if (action.id) {
		thePoll = polls.filter(poll => poll.id === action.id)[0];
	}

	switch (action.type) {
		case "NOTIFY_OPEN":
			return [action.poll, ...polls];
		case "VOTE":
			const notVoted = thePoll.nItems.every(item => item.voted === false);
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
			return polls.map(poll => (poll.id === action.id ? thePoll : poll));

		case "RATE":
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
			return polls.map(poll => (poll.id === action.id ? thePoll : poll));

		case "CANCEL_RATING":
			if (!thePoll.rated) {
				return polls;
			}
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
			return polls.map(poll => (poll.id === action.id ? thePoll : poll));
		// if (notVoted && thePoll.nItems[0].value === 0) {
		// 	return thePoll;
		// }
		// return {
		// 	...thePoll,
		// 	nItems: updateRatingItem(thePoll.nItems, 0, false),
		// 	totalVoters: updateTotalVoters(
		// 		notVoted,
		// 		thePoll.totalVoters,
		// 		thePoll.nItems,
		// 	),
		// };
		default:
			throw new Error("Unhandled action.");
	}
}

function PollContainer({data}) {
	let activePollData = null;
	let closedPollData = null;

	if (data) {
		const initialPollData = data;

		activePollData = initialPollData.filter(
			poll => poll.state === "running",
		);
		closedPollData = initialPollData.filter(
			poll => poll.state === "closed",
		);
	}

	const [pollData, dispatch] = useReducer(reducer, activePollData);

	const onVote = (id, candidateId, number, state) => {
		if (state !== "running") return;

		console.log("onVote", id, candidateId, number, state);
		dispatch({
			type: "VOTE",
			id,
			candidateId,
			number,
		});
	};

	const onChange = (value, state, id) => {
		if (state !== "running") return;

		dispatch({
			type: "RATE",
			value,
			id,
		});
	};

	const onCancelRating = (id, state) => {
		if (state !== "running") return;

		dispatch({
			type: "CANCEL_RATING",
			id,
		});
	};

	useSocket("poll/notify_open", thePoll => {
		console.log("Guest received poll/notify_open", thePoll);
		dispatch({
			type: "NOTIFY_OPEN",
			poll: thePoll,
		});
	});

	return (
		<ColumnWrapper>
			{pollData &&
				pollData.map(poll => (
					<PollCard
						{...poll}
						key={poll.id}
						onVote={onVote}
						onChange={onChange}
						onCancelRating={onCancelRating}
					/>
				))}
			{closedPollData &&
				closedPollData.map(poll => (
					<PollCard {...poll} key={poll.id} onVote={onVote} />
				))}
		</ColumnWrapper>
	);
}

export default PollContainer;
