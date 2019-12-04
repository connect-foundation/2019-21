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

function getQuestionsByEventCodeAndGuestId(eventCode,guestId){
	return gql`
    {
        questions(eventCode: "u959", GuestId: 148) {
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
        getEventOption(eventId: 2){
        moderationOption
        replyOption
    }
        
    }
`;
}

function setModerationOptionById(eventId,moderationOption){
	return gql`
	mutation{
  		moderation(eventId: 2, moderationOption: ${moderationOption})
	}
`;
}

export { getEventsByHost, getQuestionsByEventCodeAndGuestId, setModerationOptionById };
