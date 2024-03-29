import {makeStyles} from "@material-ui/core";
import randomMC from "random-material-color";
import Avatar from "@material-ui/core/Avatar";
import React from "react";

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

export default NamedAvatar;
