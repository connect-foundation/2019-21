import { gql } from "apollo-boost";

function getEventsByHost() {
	return gql`
		query {
			init {
				events {
					id
					eventCode
					eventName
					startAt
					endAt
					moderationOption
					replyOption
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
				eventName
				moderationOption
				replyOption
				endAt
				HostId
			}
		}
	`;
}

function setModerationOptionById(eventId, moderationOption) {
	return gql`
	mutation{
  		moderation(eventId: 2, moderationOption: ${moderationOption})
	}
`;
}

function getQuestionsByEventCodeAndGuestId() {
	return gql`
		{
			questions(EventId: 13) {
				id
				EventId
				GuestId
				createdAt
				content
				state
				isStared
				likeCount
			}

			getEventOption(eventId: 13) {
				moderationOption
				replyOption
			}
		}
	`;
}

export {
	getEventsByHost,
	getQuestionsByEventCodeAndGuestId,
	createEvent,
	setModerationOptionById,
};
