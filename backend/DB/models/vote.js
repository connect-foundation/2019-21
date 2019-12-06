module.exports = (sequelize, DataTypes) => {
	const Vote = sequelize.define(
		"Vote",
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
		},
		{},
	);

	Vote.associate = function(models) {
		Vote.belongsTo(models.Guest);
		Vote.belongsTo(models.Candidate);
	};
	return Vote;
};
