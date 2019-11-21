import {useState} from "react";

function useTextInput(initialState = "") {
	const [value, setValue] = useState(initialState);

	const onChange = e => {
		setValue(e.target.value);
	};

	return {value, onChange};
}

export default useTextInput;
