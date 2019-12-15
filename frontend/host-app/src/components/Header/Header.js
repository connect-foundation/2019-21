import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/core/styles";
import HeaderAccountAvatar from "./HeaderAccountAvatar.js";
import HeaderConfigAvatar from "./HeaderConfigAvatar.js";
import EventSettingModal from "../EventSettingModal/EventSettingModal.js";
import useModal from "../../hooks/useModal.js";
import HeaderTitle from "./HeaderTitle.js";

const useStyles = makeStyles(() => ({
	header: {
		backgroundColor: "#212529",
	},
	rightSide: {
		display: "flex",
		marginLeft: "auto",
	},
}));

// todo 좁더 명확한 으로 통일해야함
function Header() {
	const [settingModalOpen, handleOpen, handleClose] = useModal();
	const classes = useStyles();

	return (
		<AppBar position="static">
			<Toolbar variant="dense" className={classes.header}>
				<HeaderTitle />
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
