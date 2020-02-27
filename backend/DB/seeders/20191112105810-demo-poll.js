import makePollDummy from "../dummy/pollDummies";

module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.bulkInsert("Polls", makePollDummy(), {}),

	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete("Polls", null, {}),
};
