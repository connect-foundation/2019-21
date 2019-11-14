

import {makeHashTagDummy} from "../utils";

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert("Hashtags", makeHashTagDummy(), {}),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Hashtags", null, {}),
};
