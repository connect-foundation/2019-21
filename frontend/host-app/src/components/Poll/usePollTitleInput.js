import {useState} from "react";

function usePollTitleInput() {
	const initialPollTitle = {
		value: "",
		error: false,
		helperText: "",
	};

	// Poll 이름
	const [pollTitle, setPollTitle] = useState(initialPollTitle);
	const onPollTitleChange = event => {
		setPollTitle({
			...pollTitle,
			value: event.target.value,
			error: false,
			helperText: "",
		});
	};

	const validatePollTitle = () => {
		let result = true;

		if (pollTitle.value.length === 0) {
			result = false;
		}

		let newPollTitle = null;

		if (pollTitle.value.length === 0) {
			newPollTitle = {
				...pollTitle,
				error: true,
				helperText: "투표 제목을 입력하세요",
			};
		} else {
			newPollTitle = {
				...pollTitle,
				error: false,
				helperText: "",
			};
		}
		setPollTitle(newPollTitle);

		return result;
	};

	return {pollTitle, setPollTitle, onPollTitleChange, validatePollTitle};
}

export default usePollTitleInput;
