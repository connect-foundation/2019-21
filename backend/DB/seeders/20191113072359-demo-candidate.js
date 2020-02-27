import makeCandidateDummy from "../dummy/candidateDummies";

module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert("Candidates", makeCandidateDummy(), {}),
	down: queryInterface =>
		queryInterface.bulkDelete("Candidates", null, {}),
};
