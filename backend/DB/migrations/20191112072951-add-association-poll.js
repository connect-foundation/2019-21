

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.addColumn(
		"Polls", // name of Source model
		"EventId", // name of the key we're adding
		{
			type: Sequelize.INTEGER,
			references: {
				model: "Events", // name of Target model
				key: "id", // key in Target model that we're referencing
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		},
	),

	down: queryInterface => queryInterface.removeColumn(
		"Polls", // name of Source model
		"EventId", // key we want to remove
	),
};
