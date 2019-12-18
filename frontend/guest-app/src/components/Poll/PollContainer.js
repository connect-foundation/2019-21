import React, {useReducer, useState} from "react";
import styled from "styled-components";
import PollCard from "./PollCard";
import {useSocket} from "../../socket.io";
import reducer from "../../reducers/PollsReducer.js";
import useGlobalData from "../../contexts/GlobalData/useGlobalData.js";
import usePolls from "../../contexts/Polls/usePolls.js";

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

function PollContainer() {
	const {guest} = useGlobalData();
	const GuestId = guest.id;

	const {pollGuest} = usePolls();
	const data = pollGuest;

	let rPolls = null;
	let cPolls = null;

	if (data) {
		const initialPolls = data;

		rPolls = initialPolls.filter(poll => poll.state === "running");
		cPolls = initialPolls.filter(poll => poll.state === "closed");
	}

	const [runningPolls, dispatch] = useReducer(reducer, rPolls);
	const [closedPolls, setClosedPolls] = useState(cPolls);

	// guest가 N지선다형 투표를 했을때 호출되는 handler
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

	// guest가 별점매기기 투표를 했을때 호출되는 handler
	const onChange = (value, state, id) => {
		if (state !== "running") return;

		dispatch({
			type: "RATE",
			value,
			pollId: id,
			GuestId,
		});
	};

	// guest가 별점매기기 투표를 취소했을때 호출되는 handler
	const onCancelRating = (id, state) => {
		if (state !== "running") return;

		dispatch({
			type: "CANCEL_RATING",
			pollId: id,
			GuestId,
		});
	};

	// host가 투표를 open했음을 guest들에게 socket.io 서버로 emit 하면
	// guest들은 아래 함수를 통해 listen하고 있다가
	// useReduer를 호출하여 투표에 상태를 update 함
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

	// host가 투표를 close했음을 guest들에게 socket.io 서버로 emit 하면
	// guest들은 아래 함수를 통해 listen하고 있다가
	// useReduer를 호출하여 투표에 상태를 update 함
	useSocket("poll/notify_close", res => {
		if (res.status === "error") {
			return;
		}

		const {pollId} = res;
		const thePoll = {...runningPolls.find(poll => poll.id === pollId)};

		thePoll.state = "closed";
		setClosedPolls([thePoll].concat(closedPolls));

		dispatch({
			type: "NOTIFY_CLOSE",
			pollId,
		});
	});

	// 다른 guest들이 투표했음을 socket.io 서버로 emit 하면
	// guest는 아래 함수를 통해 listen하고 있다가
	// useReduer를 호출하여 투표에 상태를 update 함
	useSocket("vote/on", res => {
		if (res.status === "error") {
			// eslint-disable-next-line no-console
			console.error("vote/on ERROR");
			return;
		}
		// 하나의 브라우저에서 여러개의 tab으로 guest들을 생성한 경우,
		// 해당 guest를 제외한 나머지 guest에 상태가 적용되지 않아서 comment 처리했음
		dispatch({
			type: "SOMEONE_VOTE",
			pollId: res.poll.id,
			poll: res.poll,
			GuestId,
		});
	});

	// 다른 guest들이 투표했음을 socket.io 서버로 emit 하면
	// guest는 아래 함수를 통해 listen하고 있다가
	// useReduer를 호출하여 투표에 상태를 update 함
	useSocket("vote/off", res => {
		if (res.status === "error") {
			// eslint-disable-next-line no-console
			console.error("vote/off ERROR");
			return;
		}
		// 하나의 브라우저에서 여러개의 tab으로 guest들을 생성한 경우,
		// 해당 guest를 제외한 나머지 guest에 상태가 적용되지 않아서 comment 처리했음
		dispatch({
			type: "SOMEONE_VOTE",
			pollId: res.poll.id,
			poll: res.poll,
			GuestId,
		});
	});

	// 다른 guest들이 별점매기기 했음을 socket.io 서버로 emit 하면
	// guest는 아래 함수를 통해 listen하고 있다가
	// useReduer를 호출하여 투표에 상태를 update 함
	useSocket("rate/on", res => {
		if (res.status === "error") {
			return;
		}
		// 하나의 브라우저에서 여러개의 tab으로 guest들을 생성한 경우,
		// 해당 guest를 제외한 나머지 guest에 상태가 적용되지 않아서 comment 처리했음
		dispatch({
			type: "SOMEONE_RATE",
			pollId: res.poll.id,
			poll: res.poll,
			GuestId,
		});
	});

	// 다른 guest들이 별점매기기를 취소했음을 socket.io 서버로 emit 하면
	// guest는 아래 함수를 통해 listen하고 있다가
	// useReduer를 호출하여 투표에 상태를 update 함
	useSocket("rate/off", res => {
		if (res.status === "error") {
			return;
		}
		// 하나의 브라우저에서 여러개의 tab으로 guest들을 생성한 경우,
		// 해당 guest를 제외한 나머지 guest에 상태가 적용되지 않아서 comment 처리했음
		dispatch({
			type: "SOMEONE_RATE",
			pollId: res.poll.id,
			poll: res.poll,
			GuestId,
		});
	});

	return (
		<ColumnWrapper>
			{runningPolls &&
				runningPolls.map(poll => (
					<PollCard
						{...poll}
						key={poll.id}
						onVote={onVote}
						onChange={onChange}
						onCancelRating={onCancelRating}
					/>
				))}
			{closedPolls &&
				closedPolls.map(poll => (
					<PollCard {...poll} key={poll.id} onVote={onVote} />
				))}
		</ColumnWrapper>
	);
}

export default PollContainer;
