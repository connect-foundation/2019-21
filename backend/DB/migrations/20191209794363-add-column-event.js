module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.addColumn(
			"Events", // name of Source model
			"isLive", // name of the key we're adding
			{
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
		),
	down: queryInterface =>
		queryInterface.removeColumn(
			"Events",
			"isLive", // name of Source model
		),
};
