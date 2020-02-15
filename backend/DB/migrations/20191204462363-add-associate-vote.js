module.exports = {
	up: (queryInterface, Sequelize) => queryInterface
		.addColumn(
			"Votes", // name of Source model
			"GuestId", // name of the key we're adding
			{
				type: Sequelize.INTEGER,
				references: {
					model: "Guests", // name of Target model
					key: "id", // key in Target model that we're referencing
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
		)
		.then(() =>
			queryInterface.addColumn(
				"Votes", // name of Target model
				"CandidateId", // name of the key we're adding
				{
					type: Sequelize.INTEGER,
					references: {
						model: "Candidates", // name of Source model
						key: "id",
					},
					onUpdate: "CASCADE",
					onDelete: "CASCADE",
				},
			),
		),
	down: queryInterface => queryInterface
		.removeColumn(
			"Votes", // name of Source model
			"GuestId", // key we want to remove
		)
		.then(() => queryInterface.removeColumn(
			"Votes", // name of the Target model
			"CandidateId", // key we want to remove
		)),
};
