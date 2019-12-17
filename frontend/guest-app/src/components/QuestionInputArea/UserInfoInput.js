import PropTypes from "prop-types";
import React from "react";
import useStringState from "../UserAvatar/useStringState.js";
import UserAvatar from "../UserAvatar/UserAvatar.js";
import QuestionUserNameInput from "./QuestionUserNameInput.js";

function UserInfoInput(props) {
	const {userNameRef, initialUserName = ""} = props;
	const {state} = useStringState(initialUserName);

	return (
		<>
			<UserAvatar userName={state} userNameRef={userNameRef}/>
			<QuestionUserNameInput
				userName={state}
				userNameRef={userNameRef}
			/>
		</>
	);
}

UserInfoInput.propTypes = {
	userNameRef: PropTypes.any,
};

export default UserInfoInput;
