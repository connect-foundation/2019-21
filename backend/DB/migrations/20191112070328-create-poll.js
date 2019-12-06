module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable("Polls", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			pollName: {
				type: Sequelize.STRING(100),
			},
			pollType: {
				type: Sequelize.STRING(10),
			},
			selectionType: {
				type: Sequelize.STRING(10),
			},
			allowDuplication: {
				type: Sequelize.BOOLEAN,
			},
			state: {
				type: Sequelize.STRING(10),
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
	down: (queryInterface, Sequelize) => queryInterface.dropTable("Polls"),
};
