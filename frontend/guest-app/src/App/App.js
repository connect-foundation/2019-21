import React from "react";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "@apollo/react-hooks";
import "./App.css";
import NavBar from "../components/NavBar/NavBar.js";
import TabGroup from "../components/TabGroup/TabGroup.js";

const apolloClient = new ApolloClient({
	uri: "http://localhost:8000/graphql",
});

const AppStyle = styled.div`
	height: 100vh;
	width: 100vw;
`;

export default function App() {
	return (
		<ApolloProvider client={apolloClient}>
			<AppStyle>
				<NavBar />
				<TabGroup />
			</AppStyle>
		</ApolloProvider>
	);
}
