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
		const inputValue = event.target.value;
		if (event.keyCode === ENTER_KEY_CODE) {
			const hashTag = {
				key: uuidv1(),
				label: inputValue,
			};

			if (inputValue.length <= 0 && inputValue.length > 100) return;
			const hashTagList = [...prevHashTagList, hashTag];

			dispatch({
				type: "SET_PROPERTY",
				property: "hashTags",
				value: hashTagList,
			});
			event.target.value = "";
		}
	};

	return (
		<CustomTextField
			id="hashTag"
			label="해시태그를 입력 후 Enter키를 눌러주세요" // "Press Enter"
			color="primary"
			onKeyDown={addHashTag}
		/>
	);
}

export default InputHashTag;
