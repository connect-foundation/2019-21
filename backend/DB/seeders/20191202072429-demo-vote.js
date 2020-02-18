import makeVoteDummy from "../dummy/voteDummies";

module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert("Votes", makeVoteDummy(), {}),

	down: queryInterface =>
		queryInterface.bulkDelete("Votes", null, {}),
};
