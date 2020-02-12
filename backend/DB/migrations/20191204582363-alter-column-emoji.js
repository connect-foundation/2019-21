module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface
			.removeColumn(
				"Emojis", // name of Source model
				"EmojiName", // key we want to remove
			)
			.then(() =>
				queryInterface.addColumn(
					"Emojis", // name of Source model
					"name", // name of the key we're adding
					{
						type: Sequelize.STRING(100),
					},
				),
			),

	down: (queryInterface, Sequelize) =>
		queryInterface
			.addColumn(
				"Emojis", // name of Source model
				"EmojiName", // name of the key we're adding
				{
					type: Sequelize.STRING(100),
				},
			)
			.then(() =>
				queryInterface.removeColumn(
					"Emojis", // name of Source model
					"name", // key we want to remove
				),
			),
};
