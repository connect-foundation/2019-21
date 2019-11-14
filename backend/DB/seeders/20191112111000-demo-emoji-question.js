

import {makeEmojiQuestionDummy} from "../utils";

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
		"EmojiQuestions",
		makeEmojiQuestionDummy(),
		{},
	),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete("EmojiQuestions", null, {}),
};
