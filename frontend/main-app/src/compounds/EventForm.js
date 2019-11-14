import React, {useState} from "react";
import styled from "styled-components";
import {TextField, Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

const EventFormStyle = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: auto;
	justify-content: center;
	align-items: center;
`;

const ErrorStyle = styled.div`
	color: red;
	height: 2rem;
`;

const StyledTextField = withStyles({
	root: {
		width: "300px",
	},
})(TextField);

const StyledButton = withStyles({
	root: {
		width: "300px",
		fontSize: "1.4rem",
	},
})(Button);

function EventForm() {
	const [code, setCode] = useState("");
	const [errorMessage, setMessage] = useState(" ");

	const onChange = e => {
		setCode(e.target.value);
		setMessage(" ");
	};

	const onEnterEvent = () => {
		setCode("");
		setMessage("이벤트 번호가 전달되었습니다.");
	};

	return (
		<EventFormStyle>
			<h1>바글바글</h1>
			<div>
				익명으로 질문할 수 있습니다. 강의 중 궁금한 것들을 편하게
				질문하세요.
			</div>
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
				<ErrorStyle>{errorMessage}</ErrorStyle>
			</form>
		</EventFormStyle>
	);
}

export default EventForm;
