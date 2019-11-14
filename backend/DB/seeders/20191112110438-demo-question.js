
import {makeQuestionDummy} from "../utils";

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert("Questions", makeQuestionDummy(), {}),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Questions", null, {}),
};
