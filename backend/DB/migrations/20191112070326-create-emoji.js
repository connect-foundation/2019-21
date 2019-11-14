
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable("Emojis", {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		name: {
			type: Sequelize.STRING(100),
		},
		url: {
			type: Sequelize.STRING(1000),
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
	down: (queryInterface, Sequelize) => queryInterface.dropTable("Emojis"),
};
