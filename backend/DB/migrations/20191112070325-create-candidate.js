
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable("Candidates", {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		number: {
			type: Sequelize.INTEGER,
		},
		content: {
			type: Sequelize.STRING(100),
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
	down: queryInterface => queryInterface.dropTable("Candidates"),
};
