import React, {useReducer} from "react";
import styled from "styled-components";
import PollCard from "./PollCard";
import PollDummyData from "./PollDummyData";

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

const initialPollData = PollDummyData();
const activePollData = initialPollData.filter(poll => poll.active)[0];
const closedPollData = initialPollData.filter(poll => poll.active === false);

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
const updateItems = (items, id, allowDuplication) => {
	const newItems = [...items];

	if (newItems[id].voted) {
		newItems[id].voted = false;
		newItems[id].voters--;
	} else {
		if (!allowDuplication) {
			uncheckOtherItems(newItems);
		}
		newItems[id].voted = true;
		newItems[id].voters++;
	}
	return newItems;
};

// 별점 투표는 목록이 1개 이므로 항상 index가 0 임
const updateRatingItem = (items, value, voted) => {
	const newItems = [...items];

	newItems[0].value = value;
	newItems[0].voted = voted;
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

function reducer(state, action) {
	const notVoted = state.nItems.every(item => item.voted === false);

	switch (action.type) {
		case "VOTE":
			return {
				...state,
				nItems: updateItems(state.nItems, action.id, state.allowDuplication),
				totalVoters: updateTotalVoters(notVoted, state.totalVoters, state.nItems),
			};
		case "RATE":
			return {
				...state,
				nItems: updateRatingItem(state.nItems, action.value, true),
				totalVoters: updateTotalVoters(notVoted, state.totalVoters, state.nItems),
			};
		case "CANCEL_RATING":
			// 이전 상태도 투표하지 않은 상태라면 서버에 요청을 보내지 않도록 처리하는 루틴
			if (notVoted && (state.nItems[0].value === 0)) {
				return state;
			}
			return {
				...state,
				nItems: updateRatingItem(state.nItems, 0, false),
				totalVoters: updateTotalVoters(notVoted, state.totalVoters, state.nItems),
			};
		default:
			throw new Error("Unhandled action.");
	}
}

function PollContainer() {
	const [pollData, dispatch] = useReducer(reducer, activePollData);

	const onVote = (id, active) => {
		if (!active) return;

		dispatch({
			type: "VOTE",
			id,
		});
	};

	const onChange = (value, active) => {
		if (!active) return;

		dispatch({
			type: "RATE",
			value,
		});
	};

	const onCancelRating = () => {
		dispatch({
			type: "CANCEL_RATING",
		});
	};

	return (
		<ColumnWrapper>
			<PollCard
				{...pollData}
				onVote={onVote}
				onChange={onChange}
				onCancelRating={onCancelRating}
			/>
			{closedPollData.map((poll, index) => (
				<PollCard
					{...poll}
					key={index}
					onVote={onVote} />
			))}
		</ColumnWrapper>
	);
}

export default PollContainer;
