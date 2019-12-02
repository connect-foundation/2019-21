import { gql } from "apollo-boost";

function getEventsByHost(hostId) {
	return gql`
		query {
			init {
				events {
					id
					code
				}
				host {
					oauthId
					id
					name
					image
					email
				}
			}
		}
	`;
}

export { getEventsByHost };
