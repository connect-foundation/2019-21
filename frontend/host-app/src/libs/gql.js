import {gql} from "apollo-boost";

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
                    HashTags {
                        id
                        name
                        EventId
                    }
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
                startAt
                HostId
            }
        }
	`;
}

function createHashTags() {
	return gql`
        mutation Mutation($hashTags: [HashTagInput]!) {
            createHashTags(hashTags: $hashTags) {
                id
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

function updateEvent() {
	return gql`
        mutation Mutation($event: EventUpdate!) {
            updateEvent(event: $event) {
                id
                eventCode
                eventName
                moderationOption
                replyOption
                endAt
                startAt
                HostId
            }
        }
	`;
}

function getQuestionsByEventCodeAndGuestId() {
	return gql`
        {
            questions(eventCode: "97st", GuestId: 148) {
                content
                id
                didILiked
                isStared
                GuestId
                state
                createdAt
                guestName
                isStared
            }
		}
	`;
}

export {
	getEventsByHost,
	getQuestionsByEventCodeAndGuestId,
	createEvent,
	setModerationOptionById,
	createHashTags,
	updateEvent,
};
