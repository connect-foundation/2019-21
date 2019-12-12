import {makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React, {useContext} from "react";
import {HostContext} from "../libs/hostContext";

function HeaderAccountAvata() {
	const {hostInfo} = useContext(HostContext);
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
	const classes = useStyles();

	return (
		<Avatar className={classes.headerAvatar}>
			<img className={classes.avatarImage} src={hostInfo.image} alt={"avatar"}/>
		</Avatar>
	);
}

export default HeaderAccountAvata;
