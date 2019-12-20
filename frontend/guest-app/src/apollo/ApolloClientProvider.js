import React from "react";
import Cookies from "js-cookie";
import {ApolloProvider} from "@apollo/react-hooks";
import createApolloClient from "./createApolloClient.js";
import config from "../config";

const cookieName = "vaagle-guest";
const token = Cookies.get(cookieName);
const client = createApolloClient(config.apolloURI, token);

function ApolloClientProvider(props) {
	return (
		<ApolloProvider client={client}>
			{props.children}
		</ApolloProvider>
	);
}

export default ApolloClientProvider;
