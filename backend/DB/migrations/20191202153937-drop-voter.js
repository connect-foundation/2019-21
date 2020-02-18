module.exports = {
	up: queryInterface => queryInterface.dropTable("Voters"),
	down: (queryInterface, Sequelize) =>
		queryInterface.createTable("Voters", {
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
		}),
};
