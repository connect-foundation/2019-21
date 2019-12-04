import React from "react";
import {useQuery} from "@apollo/react-hooks";
import "./App.css";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Content from "../components/Content";
import NewPollModal from "../components/Poll/NewPollModal";
import { HostProvider } from "../libs/hostContext";
import { getEventsByHost } from "../libs/gql";
import EmptyContent from "../components/EmptyContent";
import {socketClient} from "../libs/socket.io-Client-wrapper";

function App() {
	const modal = false;
	const {data, loading, error} = useQuery(getEventsByHost());

	if (loading) {
		return <p>loading...</p>;
	} else if (error) {
		return <p>error-page...</p>;
	} else {
		const hostInfo = data.init.host;
		const event = 1;

		socketClient.emit("event/initOption", 2); //dummy Event Id:2
		return (
			<HostProvider value={hostInfo}>
				<div className="App">
					<Header />
					<Nav />
					{modal && <NewPollModal />}
					{event ? <Content event={event} /> : <EmptyContent/>}
				</div>
			</HostProvider>
		);
	}
}

export default App;
