import React, {useState} from "react";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "@apollo/react-hooks";
import "./App.css";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Content from "../components/Content";
import NewPollModal from "../components/Poll/NewPollModal";
import configLoader from "../config/configLoader.js";


const config = configLoader();
const apolloClient = new ApolloClient({
	uri: config.apolloURI,
});

function App() {
	const modal = false;
	const [event] = useState(true);

	return (
		<ApolloProvider client={apolloClient}>
			<div className="App">
				<Header />
				<Nav />
				{modal && <NewPollModal />}
				<Content event={event} />
			</div>
		</ApolloProvider>
	);
}

export default App;
