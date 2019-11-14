
import {makeEventDummy} from "../utils";

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert("Events", makeEventDummy(), {}),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Events", null, {}),
};
