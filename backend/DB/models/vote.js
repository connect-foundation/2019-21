import {Model} from "sequelize";

export default class Vote extends Model {
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
			{sequelize, tableName: "Votes"},
		);
	}

	static associate(models) {
		models.Vote.belongsTo(models.Guest);
		models.Vote.belongsTo(models.Candidate);
	}
}
