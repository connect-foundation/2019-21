import { createHost, findHostByAuthId } from "../DB/queries/host";
import assert from "assert";

describe("host query api", () => {
	it("be able to findHostByAuthId", async () => {
		const authId = "1234";
		const host = await findHostByAuthId(authId);
		assert.equal(host, false);
	});
});
