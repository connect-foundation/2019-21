import React from "react";
import {styled} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import uuidv1 from "uuid/v1";

const ENTER_KEY_CODE = 13;
const CustomTextField = styled(TextField)({
	marginTop: 20,
	width: 400,
});

function InputHashTag(props) {
	const {hashTags, dispatch} = props;
	const prevHashTagList = hashTags;
	const addHashTag = event => {
		if (event.keyCode === ENTER_KEY_CODE) {
			const hashTag = {
				key: uuidv1(),
				label: event.target.value,
			};
			const hashTagList = [...prevHashTagList, hashTag];

			dispatch(hashTagList);
			event.target.value = "";
		}
	};

	return (
		<CustomTextField
			id="inputHashTag"
			label="Press Enter"
			color="primary"
			onKeyDown={addHashTag}
		/>
	);
}

export default InputHashTag;
