import {Model} from "sequelize";

export default class Hashtag extends Model {
	static init(sequelize, DataTypes) {
		return super.init(
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
			{sequelize, tableName: "Hashtags"},
		);
	}

	static associate(models) {
		models.Hashtag.belongsTo(models.Event);
	}
}

