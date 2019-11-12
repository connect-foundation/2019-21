"use strict";
module.exports = (sequelize, DataTypes) => {
    const Voter = sequelize.define(
        "Voter",
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
        {}
    );
    Voter.associate = function(models) {
        Voter.belongsTo(models.Guest);
        Voter.belongsToMany(models.Candidate, { through: "Selection" });
    };
    return Voter;
};
