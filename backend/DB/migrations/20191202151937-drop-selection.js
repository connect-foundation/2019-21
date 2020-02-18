module.exports = {
	up: queryInterface => queryInterface.dropTable("Selections"),

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
			},
			CandidateId: {
				type: Sequelize.INTEGER,
			},
		}),
};
