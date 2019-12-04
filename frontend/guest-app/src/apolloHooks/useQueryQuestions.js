import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";

const QUERY_INIT_QUESTIONS = gql`
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
		}
		
        emojis(EventId: $EventId) {
            name
            count
            QuestionId
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

export default function useQueryQuestions() {
	return useQuery(QUERY_INIT_QUESTIONS, {
		variables: {EventId: 2, GuestId: 122},
	});
}
