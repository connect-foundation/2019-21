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
			feeling: {
				allowNull: false,
				type: DataTypes.INTEGER, // 0 좋아요, 1 싫어요
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
