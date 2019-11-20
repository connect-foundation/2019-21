import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {MenuIcon} from "../FontAwesomeIcons.js";
import {SideMenu, useSideNavMenu} from "../SideMenu/SideMenu.js";

function NavBarMenuButton() {
	const navBarState = useSideNavMenu();

	return (
		<div>
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
		</div>
	);
}

export default NavBarMenuButton;
