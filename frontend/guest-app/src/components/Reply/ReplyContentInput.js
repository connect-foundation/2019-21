import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

function ReplyContentInput(props) {
	const maxTextLength = 160;
	const {questionRef, content, setContent} = props;
	const onChange = e => {
		setContent(e.target.value);
	};

	return (
		<TextField
			multiline
			fullWidth
			label={"질문 내용"}
			rowsMax="10"
			value={content}
			onChange={onChange}
			margin="normal"
			helperText={`${content.length}/${maxTextLength}자`}
			InputLabelProps={{
				shrink: true,
			}}
			inputRef={questionRef}
		/>
	);
}

ReplyContentInput.propTypes = {
	questionRef: PropTypes.any,
	content: PropTypes.string,
	setContent: PropTypes.func,
};

export default ReplyContentInput;
