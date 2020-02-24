import {Model} from "sequelize";

export default class Event extends Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: DataTypes.INTEGER,
				},
				eventCode: {
					type: DataTypes.STRING(10),
				},
				eventName: {
					type: DataTypes.STRING(100),
				},
				moderationOption: {
					type: DataTypes.BOOLEAN,
					defaultValue: false,
				},
				isLive: {
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
			{sequelize},
		);
	}

	static associate(models) {
		models.Event.hasMany(models.Guest);
		models.Event.hasMany(models.Question);
		models.Event.belongsTo(models.Host);
		models.Event.hasMany(models.Poll);
		models.Event.hasMany(models.Hashtag);
		models.Event.hasMany(models.Emoji);
	}
}
