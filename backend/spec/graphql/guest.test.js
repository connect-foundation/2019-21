import assert from "assert";
import {describe, it} from "mocha";
import GQLClient from "./graphqlTestClient.js";
import testCase from "./question.testcase.js";

describe("graphql yoga guest model", () => {
	it("able query guest", async () => {
		const query = `
		query getGuests(
			$EventId: ID!
		){
			guests(EventId: $EventId) {
				id
				name
				isAnonymous
				company
				email
			}
		}
		`;

		const variables = {
			EventId: 2,
		};
		const res = await GQLClient.request(query, variables);

		assert.deepStrictEqual(res, testCase.question);
	});
});
