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

function getQuestionsByEventCodeAndGuestId(eventCode,guestId){
	return gql`
    {
        questions(eventCode: "u0xn", guestId: 148) {
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

export { getEventsByHost, getQuestionsByEventCodeAndGuestId };
