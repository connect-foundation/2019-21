import PropTypes from "prop-types";
import React from "react";
import {Box} from "@material-ui/core";
import useUserAvatar from "../../UserAvatar/useUserAvatar.js";
import UserAvatar from "../../UserAvatar/UserAvatar.js";
import QuestionUserNameInput from "./QuestionUserNameInput.js";

function UserInfoInput(props) {
	const {userNameRef} = props;
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
		<>
			<UserAvatar isAnonymous={isAnonymous} userName={userName} />
			<Box p={1} />
			<QuestionUserNameInput
				userName={userName}
				userNameRef={userNameRef}
				onChange={onUserNameChange}
			/>
		</>
	);
}

UserInfoInput.propTypes = {
	userNameRef: PropTypes.any,
};

export default UserInfoInput;
