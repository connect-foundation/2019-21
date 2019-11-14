
module.exports = (sequelize, DataTypes) => {
	const Poll = sequelize.define(
		"Poll",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			name: {
				type: DataTypes.STRING(100),
			},
			pollType: {
				type: DataTypes.INTEGER,
			},
			duplicateOption: {
				type: DataTypes.BOOLEAN,
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

	Poll.associate = function(models) {
		Poll.belongsTo(models.Event);
		Poll.hasMany(models.Candidate);
	};
	return Poll;
};
