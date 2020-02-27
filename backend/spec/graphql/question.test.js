import assert from "assert";
import {describe, it} from "mocha";
import GQLClient from "./graphqlTestClient.js";
import testCase from "./question.testcase.js";

describe("graphql yoga question model", () => {
	it("able query questions", async () => {
		const queryQuestions = `
		query getQuestions(
			$EventId: ID!
		){
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
		}
		`;

		const variables = {
			EventId: 2,
		};
		const res = await GQLClient.request(queryQuestions, variables);

		assert.deepEqual(res, testCase.question);
	});
});
