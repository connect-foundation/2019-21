import makeCandidateDummy from "../dummy/candidateDummies";

module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.bulkInsert("Candidates", makeCandidateDummy(), {}),
	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete("Candidates", null, {}),
};
