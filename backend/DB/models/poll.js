import {Model} from "sequelize";

export default class Poll extends Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: DataTypes.INTEGER,
				},
				pollName: {
					type: DataTypes.STRING(100),
				},
				pollType: {
					type: DataTypes.STRING(10),
				},
				selectionType: {
					type: DataTypes.STRING(10),
				},
				allowDuplication: {
					type: DataTypes.BOOLEAN,
				},
				state: {
					type: DataTypes.STRING(10),
				},
				pollDate: {
					type: DataTypes.DATE,
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
			{sequelize, tableName: "Polls"},
		);
	}

	static associate(models) {
		models.Poll.belongsTo(models.Event);
		models.Poll.hasMany(models.Candidate);
	}
}
