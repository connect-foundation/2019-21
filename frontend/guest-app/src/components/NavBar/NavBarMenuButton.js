import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {SideMenu, useSideNavMenu} from "../SideMenu/SideMenu.js";

function NavBarMenuButton() {
	const navBarState = useSideNavMenu();

	return (
		<>
			<IconButton
				edge="start"
				color="inherit"
				onClick={navBarState.toggleNavMenu}
			>
				<MenuIcon />
			</IconButton>
			<SideMenu
				isOpen={navBarState.isOpen}
				toggleNavMenu={navBarState.toggleNavMenu}
			/>
		</>
	);
}

export default NavBarMenuButton;
