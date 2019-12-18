import React, {useContext} from "react";
import {useQuery} from "@apollo/react-hooks";
import {GET_GUEST_APP_GLOBAL_DATA} from "./apollo/gqlSchemes.js";
import TopProgressBar from "./components/atoms/TopProcessBar.js";
import config from "./config";
import {createSocketIOClient, SocketClientProvider} from "./socket.io";

const GuestGlobalContext = React.createContext({});

export function useGuestGlobal() {
	return useContext(GuestGlobalContext);
}

export function GuestGlobalProvider(props) {
	const {data, loading, error} = useQuery(GET_GUEST_APP_GLOBAL_DATA);

	if (loading) {
		return <TopProgressBar />;
	}

	if (error) {
		window.location.href = config.inValidGuestRedirectURL;
		return <div />;
	}

	const {event, guest} = data.guestInEvent;
	const client = createSocketIOClient({
		host: config.socketIOHost,
		port: config.socketIOPort,
		namespace: "event",
		room: event.id,
	});

	client.on("connect", () => {
		client.emit("joinRoom", {room: event.id});
	});

	const globalData = {event, guest};

	return (
		<GuestGlobalContext.Provider value={globalData}>
			<SocketClientProvider client={client}>
				{props.children}
			</SocketClientProvider>
		</GuestGlobalContext.Provider>
	);
}
