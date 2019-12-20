import React from "react";
import PropTypes from "prop-types";
import AnonymousAvatar from "./AnonymousAvatar.js";
import NamedAvatar from "./NamedAvatar.js";

function UserAvatar(props) {
	const {userNameRef = {current: null}, userName = ""} = props;
	const name = userNameRef.current ? userNameRef.current.value : userName;

	return name.length === 0 ? (
		<AnonymousAvatar />
	) : (
		<NamedAvatar userName={name} />
	);
}

UserAvatar.propTypes = {
	userName: PropTypes.string,
	userNameRef: PropTypes.any,
};

UserAvatar.defaultProps = {
	userName: "",
	userNameRef: {current: null},
};

export default UserAvatar;
