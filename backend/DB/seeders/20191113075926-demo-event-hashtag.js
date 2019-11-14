

import {makeEventHashTagDummy} from "../utils";

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
		"EventHashtags",
		makeEventHashTagDummy(),
		{},
	),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete("EventHashtags", null, {}),
};
