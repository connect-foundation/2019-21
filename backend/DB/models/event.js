module.exports = (sequelize, DataTypes) => {
	const Event = sequelize.define(
		"Event",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			code: {
				type: DataTypes.STRING(10),
			},
			moderationOption: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			replyOption: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			startAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			endAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		},
		{},
	);

	Event.associate = function(models) {
		Event.hasMany(models.Guest);
		Event.hasMany(models.Question);
		Event.belongsTo(models.Host);
		Event.hasMany(models.Poll);
		Event.belongsToMany(models.Hashtag, {through: "EventHashtags"});
	};
	return Event;
};
