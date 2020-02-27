
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable("Guests", {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		name: {
			type: Sequelize.STRING(100),
		},
		isAnonymous: {
			type: Sequelize.BOOLEAN,
		},
		guestSid: {
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
	down: queryInterface => queryInterface.dropTable("Guests"),
};
