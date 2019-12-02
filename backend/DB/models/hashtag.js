module.exports = (sequelize, DataTypes) => {
	const Hashtag = sequelize.define(
		"Hashtag",
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

	Hashtag.associate = function(models) {
		Hashtag.hasOne(models.Event);
	};
	return Hashtag;
};
