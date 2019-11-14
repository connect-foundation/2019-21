"use strict";
module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define(
        "Like",
        {
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            QuestionId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            GuestId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
        },
        {}
    );
    Like.associate = function(models) {
        // associations can be defined here
    };
    return Like;
};
