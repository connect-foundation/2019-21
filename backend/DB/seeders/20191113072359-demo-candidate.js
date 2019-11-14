
import {makeCandadateDummy} from "../utils";

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
		"Candidates",
		makeCandadateDummy(),
		{},
	),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Candidate", null, {}),
};
