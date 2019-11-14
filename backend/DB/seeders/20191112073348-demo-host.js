
import {makeHostDummy} from "../utils";

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert("Hosts", makeHostDummy(), {}),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Hosts", null, {}),
};
