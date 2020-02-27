

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable("EventHashtags", {
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		HashtagId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
		EventId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
	}),

	down: (queryInterface, Sequelize) =>
	// remove table
		queryInterface.dropTable("EventHashtags")
	,
};
