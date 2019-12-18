import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {GET_GUEST_APP_GLOBAL_DATA} from "../../apollo/gqlSchemes.js";
import TopProgressBar from "../../components/atoms/TopProcessBar.js";
import config from "../../config";
import {createSocketIOClient, SocketClientProvider} from "../../socket.io";
import GlobalDataContext from "./GlobalDataContext.js";

function GlobalDataProvider(props) {
	const {data, loading, error} = useQuery(GET_GUEST_APP_GLOBAL_DATA);

	if (loading) {
		return <TopProgressBar />;
	}

	if (error) {
		window.location.href = config.inValidGuestRedirectURL;
		return <div />;
	}

	const {event, guest} = data.guestInEvent;
	const globalData = {event, guest};

	const client = createSocketIOClient({
		host: config.socketIOHost,
		port: config.socketIOPort,
		namespace: "event",
		room: event.id,
	});

	client.on("connect", () => {
		client.emit("joinRoom", {room: event.id});
	});

	return (
		<GlobalDataContext.Provider value={globalData}>
			<SocketClientProvider client={client}>
				{props.children}
			</SocketClientProvider>
		</GlobalDataContext.Provider>
	);
}

export default GlobalDataProvider;
