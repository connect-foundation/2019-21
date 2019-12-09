import {useState} from "react";

const REPLIES_CLOSED = false;
const REPLIES_OPENED = true;

function useReplies(initialState = REPLIES_CLOSED) {
	const [repliesIsOpened, setRepliesOpened] = useState(initialState);
	const openReplies = () => {
		setRepliesOpened(REPLIES_OPENED);
		console.log("BBu");
	};
	const closeReplies = () => {
		setRepliesOpened(REPLIES_CLOSED);
	};

	return {
		repliesIsOpened,
		openReplies,
		closeReplies,
	};
}

export default useReplies;
