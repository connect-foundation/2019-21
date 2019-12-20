import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import "./App.css";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar.js";
import {HostProvider} from "../libs/hostContext";
import {getEventsByHost} from "../libs/gql";
import {socketClient} from "../libs/socket.io-Client-wrapper";
import AppSkeleton from "../components/Skeleton/AppSkeleton";
import config from "../config";
import {compareCurrentDateToTarget} from "../libs/utils";

const initialValue = "";

const initialLoadEvents = (events, initialValue, dispatch, data) => {
	if (events === initialValue) {
		dispatch(data);
	}
};

function App() {
	const {data, loading, error} = useQuery(getEventsByHost());
	const [events, setEvents] = useState(initialValue);
	let activeEventsNum = 0;
	let eventsNum = 0;
	let activeEvents = [];

	if (loading) {
		return <AppSkeleton />;
	} else if (error) {
		window.location.href = config.inValidHostRedirectURL;
		return <div />;
	}
	initialLoadEvents(events, initialValue, setEvents, data.init.events);

	const hostInfo = data.init.host;

	eventsNum = events.length;
	if (eventsNum) {
		activeEvents = events.filter(event => {
			const eventDeadLine = new Date(parseInt(event.endAt));
			if (compareCurrentDateToTarget(eventDeadLine) > 0) {
				return event;
			}
		});
		activeEventsNum = activeEvents.length;
		if (activeEventsNum) {
			const eventId = activeEvents[0].id;

			socketClient.emit("leaveRoom");
			socketClient.emit("joinRoom", {room: eventId});
			socketClient.emit("event/initOption", eventId);
		}
	}

	return (
		<HostProvider
			value={{
				hostInfo,
				events: activeEvents,
				setEvents,
				allEvents: events,
			}}
		>
			<div className="App">
				<Header />
				<NavBar eventNum={activeEventsNum} />
			</div>
		</HostProvider>
	);
}

export default App;
