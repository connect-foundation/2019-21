import {describe, it} from "mocha";
import {GQLClient} from "./graphqlTestClient.js";

describe("graphql yoga like model", () => {
	it("able query didILike", async () => {
		const query = `
		query get_didILikes(
			$GuestId: ID!
		){
			didILikes(GuestId: $GuestId) {
				QuestionId  
			}
		}
		`;

		const variables = {
			GuestId: 2,
		};
		const res = await GQLClient.request(query, variables);

		console.log(res);

		// assert.deepEqual(res, testCase.question);
	});
});
