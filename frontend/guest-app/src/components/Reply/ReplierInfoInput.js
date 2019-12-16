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
	const {userNameRef, userName} = props;

	return (
		<>
			<UserAvatar userName={userName} userNameRef={userNameRef} />
			<TextFieldStyle
				value={userName}
				margin="normal"
				inputRef={userNameRef}
			/>
		</>
	);
}

UserInfoInput.propTypes = {
	userNameRef: PropTypes.any,
	userName: PropTypes.string,
};

export default UserInfoInput;
