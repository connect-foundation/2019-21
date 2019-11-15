
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable("Polls", {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		name: {
			type: Sequelize.STRING(100),
		},
		pollType: {
			type: Sequelize.INTEGER,
		},
		duplicateOption: {
			type: Sequelize.BOOLEAN,
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
