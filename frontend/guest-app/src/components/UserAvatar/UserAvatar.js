import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import randomMC from "random-material-color";
import PersonIcon from "@material-ui/icons/Person";

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
	const {isAnonymous = false, userName = "Anonymous"} = props;

	return isAnonymous ? <AnonymousAvatar /> : <NamedAvatar {...{userName}} />;
}

UserAvatar.propTypes = {
	userName: PropTypes.string,
	isAnonymous: PropTypes.bool,
};

export default UserAvatar;
