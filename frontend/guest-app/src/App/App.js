import React from "react";
import styled from "styled-components";
import {useQuery} from "@apollo/react-hooks";
import "./App.css";
import NavBar from "../components/NavBar/NavBar.js";
import TabGroup from "../components/TabGroup/TabGroup.js";
import {GuestGlobalProvider} from "../libs/guestGlobalContext.js";
import TopProgressBar from "../components/TopProcessBar.js";
import config from "../config";
import {GET_GUEST_APP_GLOBAL_DATA} from "../apollo/gqlSchemes.js";
import {UIController} from "../components/UIController/UIController.js";

const AppStyle = styled.div`
	height: 100vh;
	width: 100vw;
`;

export default function App() {
	const {data, loading, error} = useQuery(GET_GUEST_APP_GLOBAL_DATA);

	if (loading) {
		return <TopProgressBar />;
	}

	if (error) {
		window.location.href = config.inValidGuestRedirectURL;
		return <div />;
	}

	const {event, guest} = data.guestInEvent;

	return (
		<UIController>
			<GuestGlobalProvider value={{event, guest}}>
				<AppStyle>
					<NavBar title={event.eventName} />
					<TabGroup />
				</AppStyle>
			</GuestGlobalProvider>
		</UIController>
	);
}
