

import {makeLikeDummy} from "../utils";

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert("Likes", makeLikeDummy(), {}),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Likes", null, {}),
};
