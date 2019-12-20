import React, {useRef} from "react";
import {styled} from "@material-ui/core/styles";
import {TextField, Box} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const InputWithIcon = styled(Box)({
	width: "25rem",
	position: "relative",
	padding: 0,
	margin: 0,
});

const InsideIcon = styled(SaveIcon)({
	cursor: "pointer",
	position: "absolute",
	right: "0.3rem",
	bottom: "0.6rem",
});

const CustomTextField = styled(TextField)({
	marginTop: "1.3rem",
	width: "25rem",
});

function InputEventLink(props) {
	const linkRef = useRef(null);
	const copyToClipboard = () => {
		linkRef.current.select();
		document.execCommand("copy");
	};

	return (
		<InputWithIcon>
			<CustomTextField
				inputRef={linkRef}
				id="eventLink"
				label="이벤트 링크"
				color="primary"
				value={props.eventLink}
				readOnly={true}
				onChange={props.dispatch}
			/>
			<InsideIcon onClick={copyToClipboard} />
		</InputWithIcon>
	);
}

export default InputEventLink;
