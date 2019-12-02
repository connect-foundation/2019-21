
module.exports = (sequelize, DataTypes) => {
	const Candidate = sequelize.define(
		"Candidate",
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
		{},
	);

	Candidate.associate = function(models) {
		Candidate.belongsTo(models.Poll);
		Candidate.belongsToMany(models.Voter, {through: "Selections"});
	};
	return Candidate;
};
