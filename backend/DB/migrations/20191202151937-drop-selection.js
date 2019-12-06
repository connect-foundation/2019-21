module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.dropTable("Selections"),

	down: (queryInterface, Sequelize) =>
		queryInterface.createTable("Selections", {
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
			VoterId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
			CandidateId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
		}),
};
