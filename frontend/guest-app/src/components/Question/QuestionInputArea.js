import React from "react";
import styled from "styled-components";
import {Box, Button, Card, CardContent} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {EditIcon} from "../FontAwesomeIcons.js";
import UserAvatar from "../UserAvatar/UserAvatar.js";
import TextInput from "../Modals/EditPriofileModal/TextInput.js";
import useTextInput from "../Modals/EditPriofileModal/useTextInput.js";
import useUserAvatar from "../UserAvatar/useUserAvatar.js";

const QuestionInputStyle = styled.div`
	position: fixed;
	bottom: 0;

	width: 100%;
	z-index: 100;
`;

function useToggler(initialState = true) {
	const [state, setState] = React.useState(initialState);
	const toggle = () => {
		setState(!state);
	};
	const open = () => {
		setState(true);
	};
	const close = () => {
		setState(true);
	};

	return {state, toggle, open, close};
}

function UserNameInput(props) {
	const {userName, isAnonymous, setState} = useUserAvatar();
	const {userNameRef} = props;

	const onUserNameChange = e => {
		const newValue = e.target.value;

		if (newValue.length > 0) {
			setState({userName: newValue, isAnonymous: false});
		} else {
			setState({userName: newValue, isAnonymous: true});
		}
	};

	return (
		<div style={{display: "flex", alignItems: "center"}}>
			<UserAvatar userName={userName} isAnonymous={isAnonymous} />
			<TextInput
				value={userName}
				onChange={onUserNameChange}
				style={{marginTop: "8px"}}
				inputRef={userNameRef}
			/>
		</div>
	);
}

function QuestionTextInput(props) {
	const {questionRef} = props;

	const {onChange, value, maxTextLength = 160} = useTextInput();

	return (
		<TextField
			id={"QuestionTextInput"}
			label={"질문 내용"}
			multiline
			rowsMax="10"
			value={value}
			onChange={onChange}
			fullWidth
			margin="normal"
			helperText={`${value.length}/${maxTextLength}자`}
			InputLabelProps={{
				shrink: true,
			}}
			inputRef={questionRef}
		/>
	);
}

function QuestionInputGroup({
	onCancel,
	onAskQuestion,
	userNameRef,
	questionRef,
}) {
	return (
		<CardContent>
			<Grid container direction={"column"} id={"QuestionInputGroup"}>
				<QuestionTextInput questionRef={questionRef} />
				<Box p={1} />
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<UserNameInput userNameRef={userNameRef} />
					<Grid container justify={"flex-end"}>
						<Button
							variant="contained"
							color={"default"}
							onClick={onCancel}
						>
							취소
						</Button>
						<Box p={1} />
						<Button
							variant="contained"
							color={"primary"}
							onClick={onAskQuestion}
						>
							질문하기
						</Button>
					</Grid>
				</div>
			</Grid>
		</CardContent>
	);
}

function SmallQuestionInput({onClick}) {
	return (
		<CardContent onClick={onClick}>
			<EditIcon>&nbsp;질문하기</EditIcon>
		</CardContent>
	);
}

function QuestionInputArea(props) {
	const {onAskQuestion, onOpen, questionRef, userNameRef} = props;
	const inputToggle = useToggler(true);

	const onQuestionAreaClick = () => {
		inputToggle.toggle();
		onOpen();
	};

	return (
		<QuestionInputStyle>
			<Card style={{width: "100%"}}>
				{inputToggle.state ? (
					<SmallQuestionInput onClick={onQuestionAreaClick} />
				) : (
					<QuestionInputGroup
						onAskQuestion={() => {
							onAskQuestion();
							inputToggle.toggle();
						}}
						onCancel={inputToggle.toggle}
						questionRef={questionRef}
						userNameRef={userNameRef}
					/>
				)}
			</Card>
		</QuestionInputStyle>
	);
}

export default QuestionInputArea;
