import React, {useState, useReducer} from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import PollCard from "./PollCard";
import NewPollModal from "./NewPollModal";
import useModal from "../../customhook/useModal";
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
	const {pollId} = action;

	if (pollId) {
		thePoll = polls.filter(poll => poll.id === pollId)[0];
	}

	switch (action.type) {
		// 내가(host) 이미 생성한 poll(state===standby)을 open 함 (state===running)
		case "OPEN": {
			return [action.poll, ...polls];
		}
		// host가 open한 poll(state===running)을 close 함 (state===closed)
		case "CLOSE": {
			return polls.filter(poll => poll.id !== pollId);
		}
		// guest가 poll(N지선다)에 vote를 함
		case "SOMEONE_VOTE": {
			thePoll.totalVoters = action.poll.totalVoters;
			thePoll.nItems.forEach((item, index) => {
				item.voters = action.poll.nItems[index].voters;
				item.firstPlace = action.poll.nItems[index].firstPlace;
			});

			return polls.map(poll => (poll.id === pollId ? thePoll : poll));
		}
		// guest가 poll(별점매기기)에 rate를 함
		case "SOMEONE_RATE": {
			thePoll.totalVoters = action.poll.totalVoters;
			thePoll.nItems[action.index].voters++;

			return polls.map(poll => (poll.id === pollId ? thePoll : poll));
		}
		// guest가 poll(별점매기기)에 rate를 취소함
		case "SOMEONE_CANCEL_RATE": {
			thePoll.totalVoters = action.poll.totalVoters;
			thePoll.nItems[action.index].voters--;

			return polls.map(poll => (poll.id === pollId ? thePoll : poll));
		}

		default:
			throw new Error("Unhandled action.");
	}
}

function PollContainer({data}) {
	const [createPollModalOpen, handleOpen, handleClose] = useModal();

	let rPolls = null;
	let sPolls = null;
	let cPolls = null;

	if (data) {
		const initialPolls = data;

		rPolls = initialPolls.filter(poll => poll.state === "running");
		sPolls = initialPolls.filter(poll => poll.state === "standby");
		cPolls = initialPolls.filter(poll => poll.state === "closed");
	}

	const [runningPolls, dispatch] = useReducer(reducer, rPolls);
	const [standbyPolls, setStandbyPolls] = useState(sPolls);
	const [closedPolls, setClosedPolls] = useState(cPolls);

	// socket.io server 통신 부분
	// onCreatePoll에 의해 신규로 생성된 Poll은 DB에 socket.io server에 요청하여 DB에 write 함
	useSocket("poll/create", res => {
		if (res.status === "error") {
			return;
		}

		const {poll} = res;

		poll.totalVoters = 0;
		setStandbyPolls([poll].concat(standbyPolls));
	});

	// socket.io server 통신 부분
	// onOpenPoll에 의해 Poll의 state를 running으로 DB에 write하고
	// guest들에게 socket.io emit 으로 알려줌
	useSocket("poll/open", res => {
		if (res.status === "error") {
			return;
		}

		const thePoll = {
			...standbyPolls.find(poll => poll.id === res.pollId),
		};

		// DB에는 바뀌어 있지만, 여기서는 바뀌지 않은 상태이므로 강제로 바꿈
		thePoll.state = "running";
		// 설정되지 않은 값들을 초기화
		thePoll.nItems.forEach(item => {
			item.voted = false;
			item.voters = 0;
			item.firstPlace = true;
		});

		setStandbyPolls(standbyPolls.filter(poll => poll.id !== res.pollId));

		dispatch({
			type: "OPEN",
			poll: thePoll,
		});

		// Host 에서 Guests 모두에게 새로운 Poll 이 open 되었음을 알려줌
		// "poll/open"을 전달받고 나서 "poll/notify_open"를 emit 함
		const req = {poll: thePoll};

		socketClient.emit("poll/notify_open", req);
	});

	// socket.io server 통신 부분
	// onClosePoll에 의해 Poll의 state를 closed으로 DB에 write하고
	// guest들에게 socket.io emit 으로 알려줌
	useSocket("poll/close", res => {
		if (res.status === "error") {
			return;
		}

		const {pollId} = res;
		const thePoll = {...runningPolls.find(poll => poll.id === pollId)};

		// DB에는 바뀌어 있지만, 여기서는 바뀌지 않은 상태이므로 강제로 바꿈
		thePoll.state = "closed";
		// console.log("useSocket: Poll closed.", thePoll);
		setClosedPolls([thePoll].concat(closedPolls));

		dispatch({
			type: "CLOSE",
			pollId,
		});

		// Host 에서 Guests 모두에게 새로운 Poll 이 close 되었음을 알려줌
		// "poll/open"을 전달받고 나서 "poll/notify_close"를 emit 함
		const req = {pollId};

		socketClient.emit("poll/notify_close", req);
	});

	// socket.io server 통신 부분
	// guest들이 socket.io emit 으로 투표했음을 알려주면
	// useReducer 함수를 호출하여 host의 투표 정보를 update 함
	useSocket("vote/on", res => {
		if (res.status === "error") {
			return;
		}

		dispatch({
			type: "SOMEONE_VOTE",
			pollId: res.poll.id,
			poll: res.poll,
		});
	});

	// socket.io server 통신 부분
	// guest들이 socket.io emit 으로 투표했음을 알려주면
	// useReducer 함수를 호출하여 host의 투표 정보를 update 함
	useSocket("vote/off", res => {
		if (res.status === "error") {
			return;
		}
		dispatch({
			type: "SOMEONE_VOTE",
			pollId: res.poll.id,
			poll: res.poll,
		});
	});

	// socket.io server 통신 부분
	// guest들이 socket.io emit 으로 별점매기기했음을 알려주면
	// useReducer 함수를 호출하여 host의 투표 정보를 update 함
	useSocket("rate/on", res => {
		if (res.status === "error") {
			return;
		}

		dispatch({
			type: "SOMEONE_RATE",
			pollId: res.poll.id,
			poll: res.poll,
			index: res.index,
		});
	});

	// socket.io server 통신 부분
	// guest들이 socket.io emit 으로 별점매기기 취소했음을 알려주면
	// useReducer 함수를 호출하여 host의 투표 정보를 update 함
	useSocket("rate/off", res => {
		if (res.status === "error") {
			return;
		}

		dispatch({
			type: "SOMEONE_CANCEL_RATE",
			pollId: res.poll.id,
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
			{runningPolls &&
				runningPolls.map(poll => <PollCard {...poll} key={poll.id} />)}
			{standbyPolls &&
				standbyPolls.map(poll => <PollCard {...poll} key={poll.id} />)}
			{closedPolls &&
				closedPolls.map(poll => <PollCard {...poll} key={poll.id} />)}
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
