import React, {useReducer, useContext} from "react";
import styled from "styled-components";
import PollCard from "./PollCard";
import {useSocket} from "../../libs/socket.io-Client-wrapper";
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
		// console.log("Guest received poll/notify_open", thePoll);
		dispatch({
			type: "NOTIFY_OPEN",
			poll: thePoll,
			GuestId,
		});
	});

	useSocket("vote/on", res => {
		// console.log("useSocket vote/on", res);
		if (res.GuestId === GuestId) {
			// console.log("My vote!");
			return;
		}
		dispatch({
			type: "SOMEONE_VOTE",
			id: res.poll.id,
			poll: res.poll,
			GuestId,
		});
	});

	useSocket("vote/off", res => {
		if (res.GuestId === GuestId) {
			// console.log("My vote!");
			return;
		}
		dispatch({
			type: "SOMEONE_VOTE",
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
