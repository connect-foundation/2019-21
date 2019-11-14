
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable("Events", {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		code: {
			type: Sequelize.STRING(10),
		},
		moderationOption: {
			type: Sequelize.BOOLEAN,
		},
		replyOption: {
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
		endAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
	}),
	down: (queryInterface, Sequelize) => queryInterface.dropTable("Events"),
};
