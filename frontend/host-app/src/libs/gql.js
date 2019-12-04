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

function createEvent() {
	return gql`
		mutation Query($info: EventInfo!) {
			createEvent(info: $info) {
				id
				eventCode
				moderationOption
				replyOption
				endAt
				HostId
			}
		}
	`;
}

function getQuestionsByEventCodeAndGuestId() {
	return gql`
		query Query($eventCode: String!) {
			questions(eventCode: $eventCode) {
				content
				id
				likeCount
				isLike
				GuestId
				state
				createdAt
				guestName
				Emojis {
					EmojiName
				}
			}
		}
	`;
}

export { getEventsByHost, getQuestionsByEventCodeAndGuestId, createEvent };
