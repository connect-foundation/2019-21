import React from "react";
import Cookies from "js-cookie";
import {ApolloProvider} from "@apollo/react-hooks";
import {ApolloClient} from "apollo-client";
import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {setContext} from "apollo-link-context";
import config from "../config";

function createApolloClient(uri, token) {
	const httpLink = createHttpLink({uri});
	if (token) {
		const authLink = setContext((_, {headers}) => {
			return {
				headers: {
					...headers,
					authorization: `Bearer ${token}`,
				},
			};
		});

		return new ApolloClient({
			link: authLink.concat(httpLink),
			cache: new InMemoryCache(),
		});
	} else {
		return new ApolloClient({
			link: httpLink,
			cache: new InMemoryCache(),
		});
	}
}

const cookieName = "vaagle-guest";
const token = Cookies.get(cookieName);
const apolloClient = createApolloClient(config.apolloURI, token);

function ApolloClientProvider(props) {
	return <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>;

}

export default ApolloClientProvider;