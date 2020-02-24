import {Model} from "sequelize";

export default class Like extends Model {
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
			},
			{sequelize, tableName: "Likes"},
		);
	}

	static associate(models) {
		models.Like.belongsTo(models.Question);
		models.Like.belongsTo(models.Guest);
	}
}
