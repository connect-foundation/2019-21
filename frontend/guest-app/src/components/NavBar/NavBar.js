import React from "react";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar/AppBar.js";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NavBarMenuButton from "./NavBarMenuButton.js";

function NavBar({eventName = "eventName"}) {
	return (
		<AppBar position="static">
			<Toolbar>
				<NavBarMenuButton />
				<Box m="0.5rem" />
				<Typography variant="h6">{eventName}</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default NavBar;
