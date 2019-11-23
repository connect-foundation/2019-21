import React from "react";
import {makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import randomMC from "random-material-color";
import {UserIcon} from "../FontAwesomeIcons.js";

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
			<UserIcon />
		</Avatar>
	);
}

function UserAvatar({isAnonymous = false, userName = "Anonymous"}) {
	return isAnonymous ? <AnonymousAvatar /> : <NamedAvatar {...{userName}} />;
}

export default UserAvatar;
