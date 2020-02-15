import {describe, it} from "mocha";
import GQLClient from "./graphqlTestClient.js";

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

		await GQLClient.request(query, variables);
		// todo add assertion
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

		await GQLClient.request(query, variables);
		// todo add assertion
	});
});
