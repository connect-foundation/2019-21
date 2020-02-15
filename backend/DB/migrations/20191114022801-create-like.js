module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable("Likes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			feeling: {
				allowNull: false,
				type: Sequelize.INTEGER, // 0 좋아요, 1 싫어요
			},
		}),

	down: queryInterface =>
	// remove table
		queryInterface.dropTable("Likes"),
};
