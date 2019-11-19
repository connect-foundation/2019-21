import React from "react";
import AppBar from "@material-ui/core/AppBar/AppBar.js";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

function NavBar({onToggleNavClick}) {
	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton
					edge="start"
					color="inherit"
					onClick={onToggleNavClick}
				>
					<i className="fas fa-bars" />
				</IconButton>
				<Typography variant="h6">event code here</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default NavBar;
