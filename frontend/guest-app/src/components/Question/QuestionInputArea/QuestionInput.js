import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import useCommonTextInput from "../../CommonComponent/CommonTextInput/useCommonTextInput.js";

function QuestionInput(props) {
	const {questionRef, initValue} = props;
	const {onChange, value, maxTextLength = 160} = useCommonTextInput(
		initValue,
	);

	return (
		<TextField
			multiline
			fullWidth
			autoFocus
			label={"질문 내용"}
			rowsMax="10"
			value={value}
			onChange={onChange}
			margin="normal"
			helperText={`${value.length}/${maxTextLength}자`}
			InputLabelProps={{
				shrink: true,
			}}
			inputRef={questionRef}
		/>
	);
}

QuestionInput.propTypes = {
	questionRef: PropTypes.any,
	initValue: PropTypes.any,
};

QuestionInput.defualtProps = {
	questionRef: undefined,
	initValue: "",
};

export default QuestionInput;
