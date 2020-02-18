import {describe, it} from "mocha";
import assert from "assert";
import {findHostByAuthId} from "../../../DB/queries/host.js";

describe("host query api", () => {
	it("be able to findHostByAuthId", async () => {
		const authId = "1234";
		const host = await findHostByAuthId(authId);

		assert.deepStrictEqual(host, false);
	});
});
