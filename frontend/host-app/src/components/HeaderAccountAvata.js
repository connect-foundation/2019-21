import {makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React, {useContext} from "react";
import {HostContext} from "../libs/hostContext";

function HeaderAccountAvata({userName}) {
	const host = useContext(HostContext);

	console.log(host);
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
	const inner = userName.slice(0, 1);

	return (
		<Avatar className={classes.headerAvatar}>
			<img className={classes.avatarImage} src={host.image}></img>
		</Avatar>
	);
}

export default HeaderAccountAvata;
