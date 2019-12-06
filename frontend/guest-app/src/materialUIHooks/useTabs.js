import {useState} from "react";

function useTabs(initialState = 0) {
	const [tabIdx, setTabIdx] = useState(initialState);
	const selectTabIdx = (event, newValue) => {
		setTabIdx(newValue);
	};

	return {
		tabIdx,
		selectTabIdx,
	};
}

export default useTabs;
