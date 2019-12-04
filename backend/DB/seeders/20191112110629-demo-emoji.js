import makeEmojiDummy from "../dummy/emojiDummies";

module.exports = {
	up: async (queryInterface, Sequelize) =>
		makeEmojiDummy().then(data =>
			queryInterface.bulkInsert("Emojis", data, {}),
		),

	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete("Emojis", null, {}),
};
