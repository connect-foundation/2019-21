import React from "react";
import {ApolloProvider} from "@apollo/react-hooks";
import Cookies from "js-cookie";
import createApolloClient from "../libs/createApolloClient.js";
import config from "../config";

const HOST_COOKIE_KEY = "vaagle-host";
const HostJWT = Cookies.get(HOST_COOKIE_KEY);
const client = createApolloClient(config.apolloURI, HostJWT);

function WithApolloProvider(Component) {
	return props => (
		<ApolloProvider client={client}>
			<Component>{props.children}</Component>;
		</ApolloProvider>
	);
}

export default WithApolloProvider;
