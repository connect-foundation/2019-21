import React, {useReducer, useState} from "react";
import styled from "styled-components";
import PollCard from "./PollCard";
import {useSocket} from "../../libs/socketIoClientProvider.js";
import reducer from "./PollReducer";

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

function PollContainer({data, GuestId}) {
	let activePollData = null;
	let clPollData = null;

	if (data) {
		const initialPollData = data;

		activePollData = initialPollData.filter(
			poll => poll.state === "running",
		);
		clPollData = initialPollData.filter(poll => poll.state === "closed");
	}

	const [pollData, dispatch] = useReducer(reducer, activePollData);
	const [closedPollData, setClosedPollData] = useState(clPollData);

	const onVote = (id, candidateId, number, state) => {
		if (state !== "running") return;

		dispatch({
			type: "VOTE",
			pollId: id,
			candidateId,
			number,
			GuestId,
		});
	};

	const onChange = (value, state, id) => {
		if (state !== "running") return;

		dispatch({
			type: "RATE",
			value,
			pollId: id,
			GuestId,
		});
	};

	const onCancelRating = (id, state) => {
		if (state !== "running") return;

		dispatch({
			type: "CANCEL_RATING",
			pollId: id,
			GuestId,
		});
	};

	useSocket("poll/notify_open", res => {
		if (res.status === "error") {
			return;
		}

		dispatch({
			type: "NOTIFY_OPEN",
			poll: res.poll,
			GuestId,
		});
	});

	useSocket("poll/notify_close", res => {
		if (res.status === "error") {
			return;
		}

		const {pollId} = res;
		const thePoll = {...pollData.find(poll => poll.id === pollId)};

		thePoll.state = "closed";
		setClosedPollData([thePoll].concat(closedPollData));

		dispatch({
			type: "NOTIFY_CLOSE",
			pollId,
		});
	});

	useSocket("vote/on", res => {
		if (res.status === "error") {
			return;
		}
		// 하나의 브라우저에서 여러개의 tab으로 guest들을 생성한 경우,
		// 해당 guest를 제외한 나머지 guest에 상태가 적용되지 않아서 comment 처리했음
		// console.log("useSocket vote/on", res);
		// if (res.GuestId === GuestId) {
		// 	console.log("My vote!");
		// 	// return;
		// }
		dispatch({
			type: "SOMEONE_VOTE",
			pollId: res.poll.id,
			poll: res.poll,
			GuestId,
		});
	});

	useSocket("vote/off", res => {
		if (res.status === "error") {
			return;
		}
		// 하나의 브라우저에서 여러개의 tab으로 guest들을 생성한 경우,
		// 해당 guest를 제외한 나머지 guest에 상태가 적용되지 않아서 comment 처리했음
		// if (res.GuestId === GuestId) {
		// 	console.log("My vote!");
		// 	// return;
		// }
		dispatch({
			type: "SOMEONE_VOTE",
			pollId: res.poll.id,
			poll: res.poll,
			GuestId,
		});
	});

	useSocket("rate/on", res => {
		if (res.status === "error") {
			return;
		}
		// 하나의 브라우저에서 여러개의 tab으로 guest들을 생성한 경우,
		// 해당 guest를 제외한 나머지 guest에 상태가 적용되지 않아서 comment 처리했음
		// console.log("useSocket vote/on", res);
		// if (res.GuestId === GuestId) {
		// 	console.log("My rate!");
		// 	// return;
		// }
		dispatch({
			type: "SOMEONE_RATE",
			pollId: res.poll.id,
			poll: res.poll,
			GuestId,
		});
	});

	useSocket("rate/off", res => {
		if (res.status === "error") {
			return;
		}
		// 하나의 브라우저에서 여러개의 tab으로 guest들을 생성한 경우,
		// 해당 guest를 제외한 나머지 guest에 상태가 적용되지 않아서 comment 처리했음
		// if (res.GuestId === GuestId) {
		// 	console.log("My rate!");
		// 	// return;
		// }
		dispatch({
			type: "SOMEONE_RATE",
			pollId: res.poll.id,
			poll: res.poll,
			GuestId,
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
