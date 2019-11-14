import React, {useState} from "react";
import styled from "styled-components";
import {TextField, Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

const EventFormStyle = styled.div`
	display: flex;
	flex: 1;
	overflow: auto;
	justify-content: center;
	align-items: center;
`;

const StyledTextField = withStyles({
	root: {
		width: "300px",
		fontSize: "1.5rem",
	},
})(TextField);

const StyledButton = withStyles({
	root: {
		width: "300px",
		fontSize: "1.3rem",
	},
})(Button);

function EventForm() {
	const [code, setCode] = useState("");

	const onChange = e => {
		setCode(e.target.value);
	};

	const onEnterEvent = () => {
		setCode("");
	};

	return (
		<EventFormStyle>
			<form autoComplete="off">
				<div>
					<StyledTextField
						required
						autoFocus
						id="outlined-basic"
						name="eventCode"
						margin="normal"
						variant="outlined"
						placeholder="이벤트 코드를 입력하세요"
						onChange={onChange}
						value={code}
					/>
				</div>
				<StyledButton
					variant="contained"
					color="primary"
					size="large"
					type="button"
					onClick={onEnterEvent}
				>
					참가하기
				</StyledButton>
				<div>{code}</div>
			</form>
		</EventFormStyle>
	);
}

export default EventForm;
