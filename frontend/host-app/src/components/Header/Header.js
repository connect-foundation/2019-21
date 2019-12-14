import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import HeaderAccountAvatar from "./HeaderAccountAvatar.js";
import HeaderConfigAvatar from "./HeaderConfigAvatar.js";
import EventSettingModal from "../EventSettingModal/EventSettingModal.js";
import useModal from "../../customhook/useModal.js";

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
	const [settingModalOpen, handleOpen, handleClose] = useModal();
	const classes = useStyles();

	return (
		<AppBar position="static">
			<Toolbar variant="dense" className={classes.header}>
				<Typography variant="h6">바글바글</Typography>
				<div className={classes.rightSide}>
					<HeaderConfigAvatar onClick={handleOpen} />
					{settingModalOpen && (
						<EventSettingModal
							open={settingModalOpen}
							handleClose={handleClose}
						/>
					)}
					<HeaderAccountAvatar />
				</div>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
