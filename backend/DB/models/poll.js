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
			allowDuplication: {
				type: DataTypes.BOOLEAN,
			},
			state: {
				type: DataTypes.STRING(10),
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
		{}
	);

	Poll.associate = function(models) {
		Poll.belongsTo(models.Event);
		Poll.hasMany(models.Candidate);
	};
	return Poll;
};
