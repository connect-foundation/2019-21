import {makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import randomMC from "random-material-color";

function NamedAvata({guestName}) {
	const useStyles = makeStyles({
		avatar: {
			margin: 10,
		},
		randomAvatar: {
			backgroundColor: randomMC.getColor({text: guestName}),
		},
	});
	const classes = useStyles();
	const inner = guestName.slice(0, 1);

	return <Avatar className={classes.randomAvatar}>{inner}</Avatar>;
}

function AnonymousAvata() {
	return (
		<Avatar>
			<i className="fa-user" />
		</Avatar>
	);
}

function UserAvata({isAnonymous, guestName}) {
	return isAnonymous ? <AnonymousAvata /> : <NamedAvata {...{guestName}} />;
}

export default UserAvata;
