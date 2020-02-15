
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable("Questions", {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		content: {
			type: Sequelize.STRING(500),
		},
		state: {
			type: Sequelize.STRING(20),
			allowNull: false,
		},
		isStared: {
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
	down: queryInterface => queryInterface.dropTable("Questions"),
};
