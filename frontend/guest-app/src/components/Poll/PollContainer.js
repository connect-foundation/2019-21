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
			id,
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
			id,
			GuestId,
		});
	};

	const onCancelRating = (id, state) => {
		if (state !== "running") return;

		dispatch({
			type: "CANCEL_RATING",
			id,
			GuestId,
		});
	};

	useSocket("poll/notify_open", thePoll => {
		if (thePoll.status) {
			return;
		}

		dispatch({
			type: "NOTIFY_OPEN",
			poll: thePoll,
			GuestId,
		});
	});

	useSocket("poll/notify_close", id => {
		if (id.status) {
			return;
		}

		const thePoll = pollData.filter(poll => poll.id === id)[0];

		thePoll.state = "closed";
		setClosedPollData([thePoll].concat(closedPollData));

		dispatch({
			type: "NOTIFY_CLOSE",
			id,
		});
	});

	useSocket("vote/on", res => {
		if (res.status) {
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
			id: res.poll.id,
			poll: res.poll,
			GuestId,
		});
	});

	useSocket("vote/off", res => {
		if (res.status) {
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
			id: res.poll.id,
			poll: res.poll,
			GuestId,
		});
	});

	useSocket("rate/on", res => {
		if (res.status) {
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
			id: res.poll.id,
			poll: res.poll,
			GuestId,
		});
	});

	useSocket("rate/off", res => {
		if (res.status) {
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
			id: res.poll.id,
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
