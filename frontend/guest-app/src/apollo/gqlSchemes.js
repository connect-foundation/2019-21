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
