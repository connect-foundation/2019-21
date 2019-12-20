import React, {useContext} from "react";
import {makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {HostContext} from "../../libs/hostContext.js";

const useStyles = makeStyles({
	headerAvatar: {
		backgroundColor: "#FFF",
		color: "#212529",
		margin: "0.5rem",
		"&:hover": {
			color: "#FFF",
			backgroundColor: "#69747f",
		},
	},
	avatarImage: {
		width: "2.5rem",
		height: "2.5rem",
		borderRadius: "15px",
	},
});

function HeaderAccountAvatar() {
	const {hostInfo} = useContext(HostContext);
	const classes = useStyles();

	return (
		<Avatar className={classes.headerAvatar}>
			<img
				className={classes.avatarImage}
				src={hostInfo.image}
				alt={"avatar"}
			/>
		</Avatar>
	);
}

export default HeaderAccountAvatar;
