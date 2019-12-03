import { gql } from "apollo-boost";

function getEventsByHost() {
	return gql`
		query {
			init {
				events {
					id
					eventCode
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
