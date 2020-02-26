import {Model} from "sequelize";

export default class Host extends Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: DataTypes.INTEGER,
				},
				oauthId: {
					type: DataTypes.STRING(100),
				},
				name: {
					type: DataTypes.STRING(100),
				},
				email: {
					type: DataTypes.STRING(100),
				},
				emailFeedBack: {
					type: DataTypes.BOOLEAN,
				},
				image: {
					type: DataTypes.TEXT,
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
			{sequelize, tableName: "Hosts"},
		);
	}

	static associate(models) {
		models.Host.hasMany(models.Event);
	}
}

