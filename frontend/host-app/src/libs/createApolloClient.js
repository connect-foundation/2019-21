import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";

export default function createApolloClient(uri, token) {
	const httpLink = createHttpLink({ uri });
	if (token) {
		const authLink = setContext((_, { headers }) => {
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
