import {makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import randomMC from "random-material-color";

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
			<i className="fas fa-user" />
		</Avatar>
	);
}

function UserAvatar({isAnonymous, userName}) {
	return isAnonymous ? <AnonymousAvatar /> : <NamedAvatar {...{userName}} />;
}

export default UserAvatar;
