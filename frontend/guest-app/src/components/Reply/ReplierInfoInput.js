import React from "react";
import PropTypes from "prop-types";
import {styled} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import UserAvatar from "../UserAvatar/UserAvatar.js";

const TextFieldStyle = styled(TextField)({
	marginTop: "8px",
	marginLeft: "8px",
	marginRight: "8px",
	width: "100%",
});

function UserInfoInput(props) {
	const {userNameRef, userName, setUserName} = props;

	const onUserNameChange = e => {
		setUserName(e.target.value);
	};

	return (
		<>
			<UserAvatar userName={userName} userNameRef={userNameRef} />
			<TextFieldStyle
				value={userName}
				margin="normal"
				onChange={onUserNameChange}
				inputRef={userNameRef}
			/>
		</>
	);
}

UserInfoInput.propTypes = {
	userNameRef: PropTypes.any,
	userName: PropTypes.string,
	setUserName: PropTypes.func,
};

export default UserInfoInput;
