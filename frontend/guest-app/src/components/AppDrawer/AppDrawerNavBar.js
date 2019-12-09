import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack.js";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function AppDrawerNavBar(props) {
	const {onClick, title} = props;

	return (
		<AppBar>
			<Toolbar>
				<IconButton edge="start" color="inherit" onClick={onClick}>
					<ArrowBackIcon/>
				</IconButton>
				<Box m="0.5rem" />
				<Typography variant="h6">{title}</Typography>
			</Toolbar>
		</AppBar>
	);
}

AppDrawerNavBar.propTypes = {
	onClick: PropTypes.func,
	title: PropTypes.string,
};

AppDrawerNavBar.defaultProps = {
	onClick: undefined,
	title: "",
};

export default AppDrawerNavBar;
