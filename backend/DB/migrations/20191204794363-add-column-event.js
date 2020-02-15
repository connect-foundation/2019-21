module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.addColumn(
			"Events", // name of Source model
			"eventName", // name of the key we're adding
			{
				type: Sequelize.STRING(100),
				allowNull: true,
			},
		),
	down: queryInterface =>
		queryInterface.removeColumn(
			"Events",
			"eventName", // name of Source model
		),
};
