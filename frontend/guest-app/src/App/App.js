import React from "react";
import styled from "styled-components";
import {useQuery} from "@apollo/react-hooks";
import "./App.css";
import {GET_GUEST_APP_GLOBAL_DATA} from "../apollo/gqlSchemes.js";
import TopProgressBar from "../components/TopProcessBar.js";
import config from "../config";
import {UIController} from "../components/UIController/UIController.js";
import {GuestGlobalProvider} from "../libs/guestGlobalContext.js";
import NavBar from "../components/NavBar/NavBar.js";
import TabGroup from "../components/TabGroup/TabGroup.js";
import {
	createSocketIOClient,
	SocketIoClientProvider,
} from "../libs/socketIoClientProvider.js";

const AppStyle = styled.div`
	height: 100vh;
	width: 100vw;
	// overflow:hidden;
`;

export default function App() {
	const {data, loading, error, refetch} = useQuery(GET_GUEST_APP_GLOBAL_DATA);

	if (loading) {
		return <TopProgressBar/>;
	}

	if (error) {
		window.location.href = config.inValidGuestRedirectURL;
		return <div/>;
	}

	const {event, guest} = data.guestInEvent;
	const client = createSocketIOClient({
		host: config.socketIOHost,
		port: config.socketIOPort,
		nameSpace: event.id,
	});

	return (
		<AppStyle>
			<SocketIoClientProvider client={client}>
				<UIController>
					<GuestGlobalProvider
						value={{
							event,
							guest,
							refetch,
						}}
					>
						<NavBar title={event.eventName}/>
						<TabGroup/>
					</GuestGlobalProvider>
				</UIController>
			</SocketIoClientProvider>
		</AppStyle>
	);
}
