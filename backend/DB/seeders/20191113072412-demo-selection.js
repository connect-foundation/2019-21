
import {makeSelectionDummy} from "../utils";

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
		"Selections",
		makeSelectionDummy(),
		{},
	),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Selections", null, {}),
};
