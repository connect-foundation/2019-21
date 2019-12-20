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

export const QUERY_INIT_QUESTIONS = gql`
	query getQuestions($EventId: ID!, $GuestId: ID!) {
		questions(EventId: $EventId) {
			id
			EventId
			GuestId
			createdAt
			content
			state
			isStared
			likeCount
			QuestionId
		}
		emojis(EventId: $EventId) {
			name
			count
			QuestionId
			createdAt
		}
		emojiPicks(EventId: $EventId, GuestId: $GuestId) {
			name
			QuestionId
		}
		guests(EventId: $EventId) {
			id
			name
			isAnonymous
		}
		didILikes(GuestId: $GuestId) {
			QuestionId
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
