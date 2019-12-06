module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.addColumn(
			"Hosts", // name of Source model
			"refreshToken", // name of the key we're adding
			{
				type: Sequelize.STRING(100),
				allowNull: true,
			},
		),
	down: (queryInterface, Sequelize) =>
		queryInterface.removeColumn(
			"Hosts",
			"refreshToken", // name of Source model
		),
};
