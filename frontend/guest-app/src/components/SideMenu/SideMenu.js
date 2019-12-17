import React from "react";
import Drawer from "@material-ui/core/Drawer";
import SideMenuHeader from "./SideMenuHeader.js";
import SideMenuBody from "./SideMenuBody.js";
import SideMenuFooter from "./SideMenuFooter.js";
import {useGuestGlobal} from "../../GuestGlobalProvider.js";

export function SideMenu({isOpen = false, toggleNavMenu}) {
	const {event} = useGuestGlobal();

	return (
		<Drawer open={isOpen} onClose={toggleNavMenu}>
			<SideMenuHeader
				eventName={event.eventName}
				eventCode={event.eventCode}
				startAt={event.startAt}
				endAt={event.endAt}
			/>
			<SideMenuBody {...{toggleNavMenu}} />

			<SideMenuFooter/>
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
