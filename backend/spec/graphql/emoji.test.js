import { describe, it } from "mocha";
import { GQLClient } from "./graphqlTestClient.js";

describe("graphql yoga emoji model", () => {
	it("able query emoji", async () => {
		const query = `
		query get_emojis(
			$EventId: ID!
		){
			emojis(EventId: $EventId) {
				name
				count
				QuestionId  
			}
		}
		`;

		const variables = {
			EventId: 2,
		};
		const res = await GQLClient.request(query, variables);

		console.log(res);

		// assert.deepEqual(res, testCase.question);
	});

	it("able query emoji", async () => {
		const query = `
		query get_EmojiPick(
			$EventId: ID!
			$GuestId: ID!
		){
			emojiPicks(EventId: $EventId, GuestId: $GuestId) {
				name
				QuestionId  
			}
		}
		`;

		const variables = {
			EventId: 2,
			GuestId: 7,
		};
		const res = await GQLClient.request(query, variables);

		console.log(res);

		// assert.deepEqual(res, testCase.question);
	});
});
