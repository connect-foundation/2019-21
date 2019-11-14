

import {makeVoterDummy} from "../utils";

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert("Voters", makeVoterDummy(), {}),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Voters", null, {}),
};
