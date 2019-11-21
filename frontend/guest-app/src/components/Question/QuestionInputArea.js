import React from "react";
import styled from "styled-components";
import {Box, Button, Card, CardContent} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {EditIcon} from "../FontAwesomeIcons.js";
import UserAvata from "./UserAvata.js";
import TextInput from "../Modals/EditPriofileModal/TextInput.js";

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

function UserNameInput({userName, isAnonymous, setState}) {
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
			<UserAvata userName={userName} isAnonymous={isAnonymous} />
			<TextInput
				icon={undefined}
				value={userName}
				onChange={onUserNameChange}
				style={{marginTop: "8px"}}
			/>
		</div>
	);
}

function QuestionTextInput(props) {
	const {onChange, value, maxTextLength = 160} = props;

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
		/>
	);
}

function QuestionInputGroup({
	onCancel,
	onAskQuestion,
	userAvataState,
	textInputState,
}) {
	return (
		<Grid container direction={"column"} id={"QuestionInputGroup"}>
			<QuestionTextInput {...textInputState} />
			<Box p={1} />
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<UserNameInput {...userAvataState} />
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
	);
}

function QuestionInputArea({userAvataState, textInputState}) {
	const inputToggle = useToggler(true);
	const onAskQuestion = () => {
		inputToggle.toggle();
	};

	return (
		<QuestionInputStyle>
			<Card style={{width: "100%"}}>
				{inputToggle.state ? (
					<CardContent onClick={inputToggle.toggle}>
						<EditIcon>&nbsp;질문하기</EditIcon>
					</CardContent>
				) : (
					<CardContent>
						<QuestionInputGroup
							onAskQuestion={onAskQuestion}
							onCancel={inputToggle.toggle}
							userAvataState={userAvataState}
							textInputState={textInputState}
						/>
					</CardContent>
				)}
			</Card>
		</QuestionInputStyle>
	);
}

export default QuestionInputArea;
