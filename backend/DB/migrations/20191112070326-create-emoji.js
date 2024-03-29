module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable("Emojis", {
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
			EmojiName: {
				type: Sequelize.STRING,
				primaryKey: true,
			},
		}),

	down: (queryInterface, Sequelize) =>
		// remove table
		queryInterface.dropTable("Emojis"),
};
