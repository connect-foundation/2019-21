import React, {useState} from "react";
import {Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import UserAvatar from "../../UserAvatar/UserAvatar.js";
import CommonModal from "../../CommonModal.js";
import TextInput from "./TextInput.js";
import {CompanyIcon, EmailIcon, UserIcon} from "../../FontAwesomeIcons.js";
import useTextInput from "./useTextInput.js";

function useUserAvatar() {
	const initialState = {isAnonymous: false, userName: "dummy"};
	const [state, setState] = useState(initialState);

	return {
		state,
		isAnonymous: state.isAnonymous,
		userName: state.userName,
		setState: newState => setState(newState),
		reset: () => setState(initialState),
	};
}

function UserNameInput() {
	const {userName, isAnonymous, setState} = useUserAvatar();

	const onUserNameChange = e => {
		const newValue = e.target.value;

		if (newValue.length > 0) {
			setState({userName: newValue, isAnonymous: false});
		} else {
			setState({userName: newValue, isAnonymous: true});
		}
	};

	return (
		<Grid container direction={"column"} alignItems={"center"}>
			<UserAvatar userName={userName} isAnonymous={isAnonymous} />

			<TextInput
				icon={<UserIcon />}
				label={"Your name"}
				value={userName}
				onChange={onUserNameChange}
			/>
		</Grid>
	);
}

function CompanyInput({company = ""}) {
	const textInputState = useTextInput(company);

	return (
		<TextInput
			icon={<CompanyIcon />}
			label={"Your company"}
			value={textInputState.value}
			onChange={textInputState.onChange}
		/>
	);
}

function EmailInput({email = ""}) {
	const textInputState = useTextInput(email);

	return (
		<TextInput
			icon={<EmailIcon />}
			label={"Your email"}
			value={textInputState.value}
			onChange={textInputState.onChange}
		/>
	);
}

function SaveButton({onSave}) {
	return (
		<Button color="secondary" onClick={onSave}>
			save
		</Button>
	);
}

function EditProfileModal({isOpened = false, onCancelClick, onSave}) {
	return (
		<CommonModal isOpened={isOpened} onCancelClick={onCancelClick}>
			<Typography variant={"h6"} color={"textSecondary"}>
				Edit my profile
			</Typography>

			<Grid container direction={"column"} alignItems={"center"}>
				<UserNameInput />
				<CompanyInput />
				<EmailInput />
				<SaveButton onSave={onSave} />
			</Grid>
		</CommonModal>
	);
}

export default EditProfileModal;
