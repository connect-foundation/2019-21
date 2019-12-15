import PropTypes from "prop-types";
import React from "react";
import useStringState from "../../hooks/useStringState.js";
import UserAvatar from "../UserAvatar/UserAvatar.js";
import QuestionUserNameInput from "./QuestionUserNameInput.js";

function UserInfoInput(props) {
	const {userNameRef, initialUserName = ""} = props;
	const {state, setState} = useStringState(initialUserName);

	const onUserNameChange = e => {
		setState(e.target.value);
	};

	return (
		<>
			<UserAvatar userName={state} userNameRef={userNameRef} />
			<QuestionUserNameInput
				userName={state}
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
