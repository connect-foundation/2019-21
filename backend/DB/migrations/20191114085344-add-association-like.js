module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface
			.addColumn(
				"Likes", // name of Source model
				"QuestionId", // name of the key we're adding
				{
					type: Sequelize.INTEGER,
					references: {
						model: "Questions", // name of Target model
						key: "id", // key in Target model that we're referencing
					},
					onUpdate: "CASCADE",
					onDelete: "CASCADE",
				},
			)
			.then(() =>
				queryInterface.addColumn(
					"Likes", // name of Target model
					"GuestId", // name of the key we're adding
					{
						type: Sequelize.INTEGER,
						references: {
							model: "Guests", // name of Source model
							key: "id",
						},
						onUpdate: "CASCADE",
						onDelete: "CASCADE",
					},
				),
			),
	down: queryInterface =>
		queryInterface
			.removeColumn(
				"Likes",
				"QuestionId", // name of Source model
			)
			.then(() =>
				queryInterface.removeColumn(
					"Likes", // name of the Target model
					"GuestId", // key we want to remove
				),
			),
};
