import {makeCandidateDummy} from "../utils";

module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.bulkInsert("Candidates", makeCandidateDummy(), {}),
	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete("Candidates", null, {}),
};
