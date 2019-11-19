import React from "react";
import AppBar from "@material-ui/core/AppBar/AppBar.js";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {LeftSideNavMenu, useLeftMenuBarState} from "./LeftNavMenuBar.js";

export function NavBar() {
	const navBarState = useLeftMenuBarState();

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton
					edge="start"
					color="inherit"
					onClick={navBarState.toggleNavMenu}
				>
					<i className="fas fa-bars" />
				</IconButton>
				<LeftSideNavMenu {...navBarState} />

				<Typography variant="h6">event code here</Typography>
			</Toolbar>
		</AppBar>
	);
}
