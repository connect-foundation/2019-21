
import {makePollDummy} from "../utils";

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert("Polls", makePollDummy(), {}),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Polls", null, {}),
};
