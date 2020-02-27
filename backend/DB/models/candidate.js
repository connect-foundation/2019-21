import {Model} from "sequelize";

export default class Candidate extends Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: DataTypes.INTEGER,
				},
				number: {
					type: DataTypes.INTEGER,
				},
				content: {
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
			{sequelize, tableName: "Candidates"},
		);
	}

	static associate(models) {
		models.Candidate.belongsTo(models.Poll);
		models.Candidate.belongsToMany(models.Guest, {through: "Votes"});
	}
}
