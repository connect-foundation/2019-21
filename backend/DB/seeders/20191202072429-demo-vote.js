import {makeVoteDummy} from "../utils";

module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.bulkInsert("Votes", makeVoteDummy(), {}),

	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete("Votes", null, {}),
};
