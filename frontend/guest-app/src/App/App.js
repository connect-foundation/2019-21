import React from "react";
import styled from "styled-components";
import ApolloClient, {gql} from "apollo-boost";
import {ApolloProvider, useQuery} from "@apollo/react-hooks";
import "./App.css";
import NavBar from "../components/NavBar/NavBar.js";
import TabGroup from "../components/TabGroup/TabGroup.js";

const AppStyle = styled.div`
	height: 100vh;
	width: 100vw;
`;

const client = new ApolloClient({
	uri: "http://localhost:8000/graphql",
});

const EXCHANGE_RATES = gql`
    {
        hello {
            name
        }
        world {
            name
        }
    }
`;

function Test() {
	const {loading, error, data} = useQuery(EXCHANGE_RATES);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	console.log(data);

	return <p>{JSON.stringify(data)}</p>;
}

export default function App() {
	return (
		<ApolloProvider client={client}>
			<Test/>
		</ApolloProvider>
	);
}
