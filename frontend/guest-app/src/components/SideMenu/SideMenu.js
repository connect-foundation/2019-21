import React, {useContext} from "react";
import Drawer from "@material-ui/core/Drawer";
import SideMenuHeader from "./SideMenuHeader.js";
import SideMenuBody from "./SideMenuBody.js";
import {GuestGlobalContext} from "../../libs/guestGlobalContext.js";
import SideMenuFooter from "./SideMenuFooter.js";

// todo proptype
export function SideMenu({isOpen = false, toggleNavMenu}) {
	const {event} = useContext(GuestGlobalContext);

	return (
		<Drawer open={isOpen} onClose={toggleNavMenu}>
			<SideMenuHeader
				eventName={event.eventName}
				eventCode={event.eventCode}
				startAt={event.startAt}
				endAt={event.endAt}
			/>
			<SideMenuBody {...{toggleNavMenu}} />
			<SideMenuFooter />
		</Drawer>
	);
}

// todo 파일 분리
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
