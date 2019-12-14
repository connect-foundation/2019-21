import {gql} from "apollo-boost";

export const GET_GUEST_APP_GLOBAL_DATA = gql`
	query {
		guestInEvent {
			event {
				id
				eventCode
				startAt
				endAt
				eventName
				HostId
			}
			guest {
				id
				name
				email
				company
			}
		}
	}
`;

export const POLL_QUERY = gql`
	query PollGuest($EventId: ID!, $guestId: ID!) {
		pollGuest(EventId: $EventId, guestId: $guestId) {
			id
			pollName
			pollType
			selectionType
			allowDuplication
			state
			totalVoters
			pollDate
			rated
			ratingValue
			nItems {
				id
				number
				content
				voters
				voted
				firstPlace
			}
		}
	}
`;
