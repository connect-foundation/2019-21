import {before, describe, it} from "mocha";
import assert from "assert";
import {findHostByAuthId} from "../../../DB/queries/host.js";
import models from "../../../DB/models";

describe("host query api", () => {
	before(async () => {
		await models.sequelize.sync();
	});

	it("be able to findHostByAuthId", async () => {
		const authId = "1234";
		const host = await findHostByAuthId(authId);

		assert.deepStrictEqual(host, false);
	});
});
