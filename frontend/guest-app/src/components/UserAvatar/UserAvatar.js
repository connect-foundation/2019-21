import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import randomMC from "random-material-color";
import PersonIcon from "@material-ui/icons/Person";

// todo prop type 추가
// todo 파일 분리하기
function NamedAvatar({userName}) {
	const useStyles = makeStyles({
		avatar: {
			margin: 10,
		},
		randomAvatar: {
			backgroundColor: randomMC.getColor({text: userName}),
		},
	});
	const classes = useStyles();
	const inner = userName.slice(0, 1);

	return <Avatar className={classes.randomAvatar}>{inner}</Avatar>;
}

function AnonymousAvatar() {
	return (
		<Avatar>
			<PersonIcon />
		</Avatar>
	);
}

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
