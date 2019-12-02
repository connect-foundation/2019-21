module.exports = (sequelize, DataTypes) => {
	const Guest = sequelize.define(
		"Guest",
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
			guestSid: {
				type: DataTypes.STRING(100),
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			isAnonymous: {
				type: DataTypes.BOOLEAN,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		},
		{}
	);

	Guest.associate = function(models) {
		Guest.belongsTo(models.Event);
		Guest.hasMany(models.Question);
		Guest.belongsToMany(models.Candidate, { through: "Votes" });
		Guest.hasMany(models.Like);
		Guest.hasMany(models.Emoji);
	};
	return Guest;
};
