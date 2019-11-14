
import {makeGuestDummy} from "../utils";

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert("Guests", makeGuestDummy(), {}),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Guests", null, {}),
};
