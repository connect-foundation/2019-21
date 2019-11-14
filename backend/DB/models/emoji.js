
module.exports = (sequelize, DataTypes) => {
	const Emoji = sequelize.define(
		"Emoji",
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
			url: {
				type: DataTypes.STRING(1000),
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

	Emoji.associate = function(models) {
		Emoji.belongsToMany(models.Question, {through: "EmojiQuestions"});
	};
	return Emoji;
};
