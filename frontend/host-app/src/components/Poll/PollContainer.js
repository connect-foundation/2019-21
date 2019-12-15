import React, {useState, useReducer} from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import PollCard from "./PollCard";
import NewPollModal from "./NewPollModal";
import useModal from "../../hooks/useModal.js";
import {useSocket, socketClient} from "../../libs/socket.io-Client-wrapper";

const ColumnWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	box-sizing: border-box;
	// border: 1px solid #dee2e6; /* Gray3 */
	padding: 1rem;
	width: 100%;
`;

function reducer(polls, action) {
	let thePoll;

	if (action.id) {
		thePoll = polls.filter(poll => poll.id === action.id)[0];
	}

	switch (action.type) {
		case "OPEN":
			return [action.poll, ...polls];
		case "CLOSE":
			return polls.filter(poll => poll.id !== action.id);
		case "SOMEONE_VOTE":
			thePoll.totalVoters = action.poll.totalVoters;
			thePoll.nItems.forEach((item, index) => {
				item.voters = action.poll.nItems[index].voters;
				item.firstPlace = action.poll.nItems[index].firstPlace;
			});
			// console.log("SOMEONE_VOTE", thePoll);
			return polls.map(poll => (poll.id === action.id ? thePoll : poll));
		case "SOMEONE_RATE":
			thePoll.totalVoters = action.poll.totalVoters;
			thePoll.nItems[action.index].voters++;
			return polls.map(poll => (poll.id === action.id ? thePoll : poll));
		case "SOMEONE_CANCEL_RATE":
			thePoll.totalVoters = action.poll.totalVoters;
			thePoll.nItems[action.index].voters--;
			return polls.map(poll => (poll.id === action.id ? thePoll : poll));

		default:
			throw new Error("Unhandled action.");
	}
}

function PollContainer({data}) {
	const [createPollModalOpen, handleOpen, handleClose] = useModal();

	let activePollData = null;
	let sbPollData = null;
	let clPollData = null;

	if (data) {
		const initialPollData = data;

		activePollData = initialPollData.filter(
			poll => poll.state === "running",
		);
		sbPollData = initialPollData.filter(poll => poll.state === "standby");
		clPollData = initialPollData.filter(poll => poll.state === "closed");
	}

	const [pollData, dispatch] = useReducer(reducer, activePollData);
	const [standbyPollData, setStandbyPollData] = useState(sbPollData);
	const [closedPollData, setClosedPollData] = useState(clPollData);

	// socket.io server 통신 부분
	// onCreatePoll에 의해 신규로 생성된 Poll은 DB에 socket.io server에 요청하여 DB에 write 함
	useSocket("poll/create", res => {
		if (res.error) {
			return;
		}
		// console.log("useSocket: Poll created.", res);
		res.pollDate = res.createdAt;
		res.totalVoters = 0;
		setStandbyPollData([res].concat(standbyPollData));
	});

	useSocket("poll/open", pollId => {
		if (pollId.error) {
			return;
		}
		const thePoll = standbyPollData.filter(poll => poll.id === pollId)[0];

		// DB에는 바뀌어 있지만, 여기서는 바뀌지 않은 상태이므로 강제로 바꿈
		thePoll.state = "running";
		// 설정되지 않은 값들을 초기화
		thePoll.nItems.forEach(item => {
			item.voted = false;
			item.voters = 0;
			item.firstPlace = true;
		});
		// console.log("useSocket: Poll opened.", thePoll);
		setStandbyPollData(standbyPollData.filter(poll => poll.id !== pollId));

		dispatch({
			type: "OPEN",
			poll: thePoll,
		});

		// Host 에서 Guests 모두에게 새로운 Poll 이 open 되었음을 알려줌
		// "poll/open"을 전달받고 나서 "poll/notify_open"를 emit 함
		const req = {poll: thePoll};

		socketClient.emit("poll/notify_open", req);
	});

	useSocket("poll/close", pollId => {
		if (pollId.error) {
			return;
		}
		const thePoll = pollData.filter(poll => poll.id === pollId)[0];

		// DB에는 바뀌어 있지만, 여기서는 바뀌지 않은 상태이므로 강제로 바꿈
		thePoll.state = "closed";
		// console.log("useSocket: Poll closed.", thePoll);
		setClosedPollData([thePoll].concat(closedPollData));

		dispatch({
			type: "CLOSE",
			id: pollId,
		});

		// Host 에서 Guests 모두에게 새로운 Poll 이 close 되었음을 알려줌
		// "poll/open"을 전달받고 나서 "poll/notify_close"를 emit 함
		const req = {id: pollId};

		socketClient.emit("poll/notify_close", req);
	});

	useSocket("vote/on", res => {
		if (res.error) {
			return;
		}
		// console.log("useSocket vote/on", res);
		dispatch({
			type: "SOMEONE_VOTE",
			id: res.poll.id,
			poll: res.poll,
		});
	});

	useSocket("vote/off", res => {
		if (res.error) {
			return;
		}
		dispatch({
			type: "SOMEONE_VOTE",
			id: res.poll.id,
			poll: res.poll,
		});
	});

	useSocket("rate/on", res => {
		if (res.error) {
			return;
		}
		// console.log("useSocket rate/on", res);
		// const index = parseInt(res.poll.ratingValue) - 1;
		dispatch({
			type: "SOMEONE_RATE",
			id: res.poll.id,
			poll: res.poll,
			index: res.index,
		});
	});

	useSocket("rate/off", res => {
		if (res.error) {
			return;
		}
		// console.log("useSocket rate/off", res);
		dispatch({
			type: "SOMEONE_CANCEL_RATE",
			id: res.poll.id,
			poll: res.poll,
			index: res.index,
		});
	});

	return (
		<ColumnWrapper>
			<Button
				color="primary"
				variant="contained"
				size="large"
				fullWidth
				onClick={handleOpen}
			>
				투표만들기
			</Button>
			{pollData &&
				pollData.map(poll => <PollCard {...poll} key={poll.id} />)}
			{standbyPollData &&
				standbyPollData.map(poll => (
					<PollCard {...poll} key={poll.id} />
				))}
			{closedPollData &&
				closedPollData.map(poll => (
					<PollCard {...poll} key={poll.id} />
				))}
			{createPollModalOpen && (
				<NewPollModal
					open={createPollModalOpen}
					handleClose={handleClose}
				/>
			)}
		</ColumnWrapper>
	);
}

export default PollContainer;
