import React, {useRef} from "react";
import {styled} from "@material-ui/core/styles";
import {TextField, Box} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const InputWithIcon = styled(Box)({
	width: 400,
	position: "relative",
	padding: 0,
	margin: 0,
});

const InsideIcon = styled(SaveIcon)({
	cursor: "pointer",
	position: "absolute",
	right: 5,
	bottom: 10,
});

const CustomTextField = styled(TextField)({
	marginTop: 20,
	width: 400,
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
				id="eventName"
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
