module.exports = {
	up: queryInterface =>
		queryInterface
			.removeColumn(
				"Likes", // name of Source model
				"feeling", // key we want to remove
			),

	down: (queryInterface, Sequelize) =>
		queryInterface
			.addColumn(
				"Likes", // name of Source model
				"feeling", // name of the key we're adding
				{
					allowNull: false,
					type: Sequelize.INTEGER, // 0 좋아요, 1 싫어요
				},
			),

};
