import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import HeaderAccountAvatar from "./HeaderAccountAvatar";
import HeaderConfigAvatar from "./HeaderConfigAvatar";

const useStyles = makeStyles(() => ({
	header: {
		backgroundColor: "#212529",
	},
	rightSide: {
		display: "flex",
		marginLeft: "auto",
	},
}));

function Header() {
	const classes = useStyles();

	return (
		<AppBar position="static">
			<Toolbar variant="dense" className={classes.header}>
				<Typography variant="h6">
					Vaggle
				</Typography>
				<div className={classes.rightSide}>
					<HeaderConfigAvatar/>
					<HeaderAccountAvatar userName={"홍"}/>
				</div>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
