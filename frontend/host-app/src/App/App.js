import React, {useState} from "react";
import ApolloClient from "apollo-boost";
import {ApolloProvider, useQuery} from "@apollo/react-hooks";
import "./App.css";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Content from "../components/Content";
import NewPollModal from "../components/Poll/NewPollModal";
import { HostProvider } from "../libs/hostContext";
import { getEventsByHost } from "../libs/gql";

function App() {
	const modal = false;
	const { data, loading, error } = useQuery(getEventsByHost());
	console.log("render-test");
	if (loading) {
		return <p>loading...</p>;
	} else if (error) {
		return <p>error-page...</p>;
	} else {
		const hostInfo = data.init.host;
		const event = data.init.events.length;
		return (
			<HostProvider value={hostInfo}>
				<div className="App">
					<Header />
					<Nav />
					{modal && <NewPollModal />}
					<Content event={event} />
				</div>
			</HostProvider>
		);
	}
}

export default App;
