import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {SideMenu, useSideNavMenu} from "../SideMenu/SideMenu.js";


// todo 구조 개선 및 컴포넌트 쪼개기?
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
