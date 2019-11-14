
import {makeEmojiDummy} from "../utils";

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert("Emojis", makeEmojiDummy(), {}),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Emojis", null, {}),
};
