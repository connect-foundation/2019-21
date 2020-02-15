module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable("Hosts", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			oauthId: {
				type: Sequelize.STRING(100),
			},
			name: {
				type: Sequelize.STRING(100),
			},
			email: {
				type: Sequelize.STRING(100),
			},
			emailFeedBack: {
				type: Sequelize.BOOLEAN,
			},
			image: {
				type: Sequelize.TEXT,
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
	down: queryInterface => queryInterface.dropTable("Hosts"),
};
