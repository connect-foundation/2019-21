module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface
			.addColumn(
				"Guests", // name of Source model
				"company", // name of the key we're adding
				{
					type: Sequelize.STRING(100),
					defaultValue: null,
				},
			)
			.then(() =>
				queryInterface.addColumn(
					"Guests", // name of Target model
					"email", // name of the key we're adding
					{
						type: Sequelize.STRING(100),
						defaultValue: null,
					},
				),
			),
	down: queryInterface =>
		queryInterface
			.removeColumn(
				"Guests", // name of Source model
				"company", // key we want to remove
			)
			.then(() =>
				queryInterface.removeColumn(
					"Guests", // name of the Target model
					"email", // key we want to remove
				),
			),
};
