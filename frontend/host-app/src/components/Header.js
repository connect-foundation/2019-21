import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	header: {
		backgroundColor: "#212529",
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
			</Toolbar>
		</AppBar>
	);
}

export default Header;
