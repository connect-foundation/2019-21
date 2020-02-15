import makeEmojiDummy from "../dummy/emojiDummies";

module.exports = {
	up: async queryInterface =>
		makeEmojiDummy().then(data =>
			queryInterface.bulkInsert("Emojis", data, {}),
		),

	down: queryInterface =>
		queryInterface.bulkDelete("Emojis", null, {}),
};
