import {Model} from "sequelize";

export default class Emoji extends Model {
	static init(sequelize, DataTypes) {
		return super.init(
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
				name: {
					type: DataTypes.STRING(100),
				},
				QuestionId: {
					type: DataTypes.INTEGER,
				},
				GuestId: {
					type: DataTypes.INTEGER,
				},
			},
			{sequelize, tableName: "Emojis"},
		);
	}

	static associate(models) {
		models.Emoji.belongsTo(models.Event);
	}
}
