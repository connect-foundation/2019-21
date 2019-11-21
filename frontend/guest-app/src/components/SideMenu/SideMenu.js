import React from "react";
import Drawer from "@material-ui/core/Drawer";
import SideMenuHeader from "./SideMenuHeader.js";
import SideMenuBody from "./SideMenuBody.js";

export function SideMenu({isOpen = false, toggleNavMenu}) {
	return (
		<Drawer open={isOpen} onClose={toggleNavMenu}>
			<SideMenuHeader />
			<SideMenuBody {...{toggleNavMenu}} />
		</Drawer>
	);
}

export function useSideNavMenu() {
	const [isOpen, setState] = React.useState(false);
	const toggleNavMenu = () => {
		setState(!isOpen);
	};

	return {
		isOpen,
		toggleNavMenu,
	};
}
