import makeHostDummy from "../dummy/hostDummies";

module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.bulkInsert("Hosts", makeHostDummy(), {}),

	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete("Hosts", null, {}),
};
