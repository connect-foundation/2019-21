import makeHostDummy from "../dummy/hostDummies";

module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert("Hosts", makeHostDummy(), {}),

	down: queryInterface =>
		queryInterface.bulkDelete("Hosts", null, {}),
};
