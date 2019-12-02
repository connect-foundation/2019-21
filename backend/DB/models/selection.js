module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"Selections",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			VoterId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			CandidateId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
		},
		{},
	);
};
