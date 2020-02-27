import {Model} from "sequelize";

export default class Guest extends Model {
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
				guestSid: {
					type: DataTypes.STRING(100),
				},
				createdAt: {
					allowNull: false,
					type: DataTypes.DATE,
				},
				isAnonymous: {
					type: DataTypes.BOOLEAN,
				},
				updatedAt: {
					allowNull: false,
					type: DataTypes.DATE,
				},
				email: {
					type: DataTypes.STRING(100),
					defaultValue: null,
				},
				company: {
					type: DataTypes.STRING(100),
					defaultValue: null,
				},
			},
			{sequelize, tableName: "Guests"},
		);
	}

	static associate(models) {
		models.Guest.belongsTo(models.Event);
		models.Guest.hasMany(models.Question);
		models.Guest.belongsToMany(models.Candidate, {through: "Votes"});
		models.Guest.hasMany(models.Like);
		models.Guest.hasMany(models.Emoji);
	}
}

