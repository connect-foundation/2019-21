import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import "./App.css";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Content from "../components/Content";
import NewPollModal from "../components/Poll/NewPollModal";
import {HostProvider} from "../libs/hostContext";
import {getEventsByHost} from "../libs/gql";
import EmptyContent from "../components/EmptyContent";
import {socketClient} from "../libs/socket.io-Client-wrapper";
import AppSkeleton from "../components/Skeleton/AppSkeleton.js";
import WithApolloProvider from "../HOC/WithApolloProvider.js";
import WithLoadingAndErrorComponent from "../HOC/WithLoadingAndErrorComponent.js";

function ErrorPage() {
	return <p>error-page...</p>;
}

function WithEventProvider(Component) {
	return props => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const query = useQuery(getEventsByHost());

		return <Component {...props} {...query} />;
	};
}

let App = props => {
	const {data} = props;
	const [events, setEvents] = useState("");
	const modal = false;
	let eventNum = 0;

	if (events === "") {
		setEvents(data.init.events, () => (eventNum = data.init.events.length));
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
				<Nav />
				{modal && <NewPollModal />}
				{eventNum ? <Content event={event} /> : <EmptyContent />}
			</div>
		</HostProvider>
	);
};

App = WithLoadingAndErrorComponent(App, AppSkeleton, ErrorPage);
App = WithEventProvider(App);
App = WithApolloProvider(App);

export default App;
