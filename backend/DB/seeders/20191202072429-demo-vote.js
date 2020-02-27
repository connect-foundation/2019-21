import makeVoteDummy from "../dummy/voteDummies";

module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.bulkInsert("Votes", makeVoteDummy(), {}),

	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete("Votes", null, {}),
};
