import makeEventDummy from "../dummy/eventDummies";

module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.bulkInsert("Events", makeEventDummy(), {}),

	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete("Events", null, {}),
};
