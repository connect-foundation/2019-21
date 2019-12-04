import assert from "assert";
import {describe, it} from "mocha";
import {GQLClient} from "./graphqlTestClient.js";

describe("graphql yoga question model", () => {
	it("able query questions", async () => {
		const queryQuestions = `
		query getQuestions(
			$eventCode: ID!
			$GuestId: ID! 
		){
			questions(eventCode: $eventCode, GuestId: $GuestId) {
				id
				EventId
				guestName
				GuestId
				createdAt
				content
				isAnonymous
				state
				isStared
				likeCount  
			}
		}
		`;

		const variables = {
			GuestId: 22,
			eventCode: "u959",
		};
		const res = await GQLClient.request(queryQuestions, variables);

		const expect = {
			questions: [
				{
					id: "19",
					EventId: "2",
					guestName: "Alysha",
					GuestId: "164",
					createdAt: "1558509195000",
					content: "Hic accusantium deleniti error quas dolor.",
					isAnonymous: false,
					state: "active",
					isStared: false,
					likeCount: 0,
				},
			],
		};

		assert.deepEqual(res, expect);
	});
});
