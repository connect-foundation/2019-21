import React from "react";
import Box from "@material-ui/core/Box";
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
				<Box m="0.5rem" />
				<Typography variant="h6">{title}</Typography>
			</Toolbar>
		</AppBar>
	);
}

NavBar.defaultProps = {title: "이벤트 이름"};

NavBar.propTypes = {
	title: PropTypes.string,
};

export default NavBar;
