import {makeStyles, Icon} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";

const useStyles = makeStyles({
	headerAvatar: {
		backgroundColor: "#FFF",
		color: "#212529",
		margin: "0.5rem",
		"&:hover": {
			color: "#FFF",
			backgroundColor: "#69747F",
		},
	},
});

function HeaderConfigAvatar({onClick}) {
	const classes = useStyles();

	return (
		<Avatar onClick={onClick} className={classes.headerAvatar}>
			<Icon>settings</Icon>
		</Avatar>
	);
}

export default HeaderConfigAvatar;
