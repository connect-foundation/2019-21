import {gql} from "apollo-boost";


const getEventsByHost = gql`
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

const createEventMutationScheme = gql`
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

const createHashTagsMutationScheme = gql`
    mutation Mutation($hashTags: [HashTagInput]!) {
        createHashTags(hashTags: $hashTags) {
            id
        }
    }
`;

const updateEventMutationScheme = gql`
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

export {
	getEventsByHost,
	createEventMutationScheme,
	createHashTagsMutationScheme,
	updateEventMutationScheme,
};
