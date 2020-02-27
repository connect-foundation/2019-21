module.exports = (sequelize, DataTypes) => {
	const Like = sequelize.define(
		"Like",
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

	Like.associate = function(models) {
		Like.belongsTo(models.Question);
		Like.belongsTo(models.Guest);
	};
	return Like;
};
