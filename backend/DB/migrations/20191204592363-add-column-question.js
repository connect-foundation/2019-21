module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface
			.addColumn(
				"Questions", // name of Source model
				"likeCount", // name of the key we're adding
				{
					allowNull: false,
					type: Sequelize.INTEGER,
					defaultValue: 0,
				},
			),
	down: queryInterface =>
		queryInterface
			.removeColumn(
				"Questions", // name of Source model
				"likeCount", // key we want to remove
			),

};
