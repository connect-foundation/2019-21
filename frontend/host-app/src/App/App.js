import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import "./App.css";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar.js";
import EventMonitor from "../components/EventMonitor/EventMonitor";
import NewPollModal from "../components/Poll/NewPollModal";
import {HostProvider} from "../libs/hostContext";
import {getEventsByHost} from "../libs/gql";
import EmptyContent from "../components/EventMonitor/EmptyContent";
import {socketClient} from "../libs/socket.io-Client-wrapper";
import AppSkeleton from "../components/Skeleton/AppSkeleton";

function App() {
	const modal = false;
	const {data, loading, error} = useQuery(getEventsByHost());
	const [events, setEvents] = useState("");
	let eventNum = 0;

	if (loading) {
		return (
			<AppSkeleton/>
		);
	} else if (error) {
		return <p>error-page...</p>;
	} else {
		if (events === "") {
			setEvents(
				data.init.events,
				() => (eventNum = data.init.events.length),
			);
		}
		const hostInfo = data.init.host;

		eventNum = events.length;
		if (eventNum) {
			const eventId = events[0].id;

			socketClient.emit("joinRoom", {room: eventId});
			socketClient.emit("event/initOption", eventId);
		}

		return (
			<HostProvider value={{hostInfo, events, setEvents}}>
				<div className="App">
					<Header />
					<NavBar />
					{modal && <NewPollModal />}
					{eventNum ? <EventMonitor event={event} /> : <EmptyContent />}
				</div>
			</HostProvider>
		);
	}
}

export default App;
