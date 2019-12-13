import {gql} from "apollo-boost";
import {JSONNestJoin, JSONNestJoin2} from "./utils.js";
import _ from "lodash";

export function buildQuestions(object) {
	const copyData = _.cloneDeep(object);
	let {questions, emojis, emojiPicks, guests, didILikes} = copyData;

	questions = JSONNestJoin2(questions, guests, "GuestId", "id", (a, b) => {
		a.guestName = b.name;
		a.isAnonymous = b.isAnonymous;

		return a;
	});

	questions = questions.map(x => {
		x.didILike = false;
		return x;
	});

	questions = JSONNestJoin(
		questions,
		didILikes,
		"id",
		"QuestionId",
		(x, y) => {
			x.didILike = true;
			return x;
		},
	);

	emojis = emojis.map(x => {
		x.key = `${x.QuestionId}_${x.name}`;
		x.didIPick = false;
		return x;
	});
	emojiPicks = emojiPicks.map(x => {
		x.key = `${x.QuestionId}_${x.name}`;
		return x;
	});
	emojis = JSONNestJoin(emojis, emojiPicks, "key", "key", (a, b) => {
		a.didIPick = true;
		return a;
	});

	questions.map(x => {
		x.emojis = [];
		return x;
	});
	questions = JSONNestJoin(questions, emojis, "id", "QuestionId", (a, b) => {
		a.emojis.push(b);
		return a;
	});

	return questions;
}

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
