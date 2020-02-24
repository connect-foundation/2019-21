import {Model} from "sequelize";

export default class Question extends Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: DataTypes.INTEGER,
				},
				content: {
					type: DataTypes.STRING(500),
					defaultValue: "",
				},
				state: {
					type: DataTypes.STRING(20),
					allowNull: false,
				},
				createdAt: {
					allowNull: false,
					type: DataTypes.DATE,
				},
				isStared: {
					type: DataTypes.BOOLEAN,
					defaultValue: false,
				},
				updatedAt: {
					allowNull: false,
					type: DataTypes.DATE,
				},
				likeCount: {
					allowNull: false,
					type: DataTypes.INTEGER,
					defaultValue: 0,
				},
			},
			{sequelize, tableName: "Questions"},
		);
	}

	static associate(models) {
		models.Question.belongsTo(models.Event);
		models.Question.belongsTo(models.Guest);
		models.Question.hasMany(models.Question);
		models.Question.hasMany(models.Like);
		models.Question.hasMany(models.Emoji);
		models.Question.belongsTo(models.Question);
	}
}
