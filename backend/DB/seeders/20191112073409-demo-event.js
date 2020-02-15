import makeEventDummy from "../dummy/eventDummies";

module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert("Events", makeEventDummy(), {}),

	down: queryInterface =>
		queryInterface.bulkDelete("Events", null, {}),
};
