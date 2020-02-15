import makePollDummy from "../dummy/pollDummies";

module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert("Polls", makePollDummy(), {}),

	down: queryInterface =>
		queryInterface.bulkDelete("Polls", null, {}),
};
