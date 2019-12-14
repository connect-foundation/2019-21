/* eslint-disable array-element-newline */
import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import "./App.css";
import Header from "../components/Header/Header.js";
import NavBar from "../components/NavBar/NavBar.js";
import EventMonitor from "../components/EventMonitor/EventMonitor.js";
import NewPollModal from "../components/Poll/NewPollModal";
import {HostProvider} from "../libs/hostContext";
import {getEventsByHost} from "../libs/gql";
import {socketClient} from "../libs/socket.io-Client-wrapper";
import WithApolloProvider from "../HOC/WithApolloProvider.js";
import WithLoadingAndErrorComponent from "../HOC/WithLoadingAndErrorComponent.js";
import AppSkeleton from "../components/Skeleton/AppSkeleton.js";
import HOCChaining from "../HOC/HOCChaining.js";
import AppErrorComponent from "../components/ErrorPage/ErrorComponent.js";

const EVENT_LIST_TAB_IDX = 0;
// const LIVE_EVENT_TAB_IDX = 1;
// const DEFAULT_TAB_IDX = EVENT_LIST_TAB_IDX;

let App = props => {
	const {data} = props;
	const [events, setEvents] = useState(data.init.events);
	const hostInfo = data.init.host;
	const eventId = events[0].id;

	const [tabIdx, setTabIdx] = React.useState(EVENT_LIST_TAB_IDX);
	const modal = false;

	socketClient.emit("joinRoom", {room: eventId});
	socketClient.emit("event/initOption", eventId);

	return (
		<div className="App">
			<HostProvider value={{hostInfo, events, setEvents}}>
				<Header />
				<NavBar
					tabIdx={tabIdx}
					onChange={(e, newTabIdx) => setTabIdx(newTabIdx)}
				/>
				<NewPollModal open={modal} />
				<EventMonitor event={event} />
			</HostProvider>
		</div>
	);
};

function WithEventProvider(Component) {
	return props => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const query = useQuery(getEventsByHost);

		return <Component {...props} {...query} />;
	};
}

const BoundWithLoadingAndErrorComponent = (
	loadingComponent,
	ErrorComponent,
) => target =>
	WithLoadingAndErrorComponent(target, loadingComponent, ErrorComponent);

App = HOCChaining([
	WithApolloProvider,
	WithEventProvider,
	BoundWithLoadingAndErrorComponent(AppSkeleton, AppErrorComponent),
	App,
]);

export default App;
