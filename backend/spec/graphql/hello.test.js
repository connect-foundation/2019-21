import assert from "assert";
import {describe, it} from "mocha";
import GQLClient from "./graphqlTestClient.js";

describe("graphql yoga server hello", () => {
	it("able query hello", async () => {
		const query = `
		query {
			hello {
				name
				value
			}
		}`;
		const variables = undefined;
		const res = await GQLClient.request(query, variables);
		const expect = {hello: {name: "hello", value: 12313}};

		assert.deepStrictEqual(expect, res);
	});
});
