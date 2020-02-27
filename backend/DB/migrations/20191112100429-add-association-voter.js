

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.addColumn(
		"Voters", // name of Source model
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
	),

	down: queryInterface => queryInterface.removeColumn(
		"Voters", // name of Source model
		"GuestId", // key we want to remove
	),
};
