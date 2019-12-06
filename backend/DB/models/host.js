module.exports = (sequelize, DataTypes) => {
	const Host = sequelize.define(
		"Host",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			oauthId: {
				type: DataTypes.STRING(100),
			},
			name: {
				type: DataTypes.STRING(100),
			},
			email: {
				type: DataTypes.STRING(100),
			},
			emailFeedBack: {
				type: DataTypes.BOOLEAN,
			},
			image: {
				type: DataTypes.TEXT,
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

	Host.associate = function(models) {
		Host.hasMany(models.Event);
	};
	return Host;
};
