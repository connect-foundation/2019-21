
import {makeReplyDummy} from "../utils";

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert("Questions", makeReplyDummy(), {}),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Questions", null, {}),
};
