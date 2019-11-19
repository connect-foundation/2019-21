import {makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";

function HeaderAccountAvatar({userName}) {
	const useStyles = makeStyles({
		headerAvatar: {
			backgroundColor: "#FFF",
			color: "#212529",
			margin: "0.5rem",
		},
	});
	const classes = useStyles();
	const inner = userName.slice(0, 1);

	return <Avatar className={classes.headerAvatar}>{inner}</Avatar>;
}

export default HeaderAccountAvatar;
