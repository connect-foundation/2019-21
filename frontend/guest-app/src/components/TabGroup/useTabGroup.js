import {useState} from "react";

function useTabGroup() {
	const QUESTION_TAB_IDX = 0;
	// const VOTE_TAB_IDX = 1;
	const [tabIdx, setTabIdx] = useState(QUESTION_TAB_IDX);
	const selectTabIdx = (event, newValue) => {
		setTabIdx(newValue);
	};

	return {
		tabIdx,
		selectTabIdx,
	};
}

export default useTabGroup;
