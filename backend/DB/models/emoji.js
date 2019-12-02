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
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			EmojiName: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			QuestionId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			GuestId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
		},
		{},
	);

	return Emoji;
};
