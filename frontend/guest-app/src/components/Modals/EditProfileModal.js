import React from "react";
import {Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import BusinessIcon from "@material-ui/icons/Business";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
import UserAvatar from "../UserAvatar/UserAvatar.js";
import CommonModal from "../CommonModal/CommonModal.js";
import CommonTextInput from "../CommonTextInput/CommonTextInput.js";
import useCommonTextInput from "../CommonTextInput/useCommonTextInput.js";
import useUserAvatar from "../UserAvatar/useUserAvatar.js";

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

			<CommonTextInput
				icon={<PersonIcon />}
				label={"이름"}
				value={userName}
				onChange={onUserNameChange}
			/>
		</Grid>
	);
}

function CompanyInput({company = ""}) {
	const textInputState = useCommonTextInput(company);

	return (
		<CommonTextInput
			icon={<BusinessIcon />}
			label={"회사"}
			value={textInputState.value}
			onChange={textInputState.onChange}
		/>
	);
}

function EmailInput({email = ""}) {
	const textInputState = useCommonTextInput(email);

	return (
		<CommonTextInput
			icon={<EmailIcon />}
			label={"이메일"}
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
				내 프로필 변경
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
