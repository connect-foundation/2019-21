

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.addColumn(
		"Events", // name of Source model
		"HostId", // name of the key we're adding
		{
			type: Sequelize.INTEGER,
			references: {
				model: "Hosts", // name of Target model
				key: "id", // key in Target model that we're referencing
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		},
	),

	down: queryInterface => queryInterface.removeColumn(
		"Events", // name of Source model
		"HostId", // key we want to remove
	),
};
