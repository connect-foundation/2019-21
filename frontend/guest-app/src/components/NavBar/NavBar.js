import React from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar/AppBar.js";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import NavBarMenuButton from "./NavBarMenuButton.js";

function NavBar(props) {
	const {title} = props;

	return (
		<AppBar>
			<Toolbar>
				<NavBarMenuButton />
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
				>
					<Typography variant="h6">{title}</Typography>
				</Grid>
			</Toolbar>
		</AppBar>
	);
}

NavBar.defaultProps = {title: ""};

NavBar.propTypes = {
	title: PropTypes.string,
};

export default NavBar;
