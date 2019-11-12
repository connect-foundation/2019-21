"use strict";
module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define(
        "Question",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            content: {
                type: DataTypes.STRING(500),
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
    Question.associate = function(models) {
        Question.belongsTo(models.Guest);
        Question.hasMany(models.Reply);
        Question.belongsToMany(models.Emoji, { through: "EmojiQuestion" });
        Question.belongsToMany(models.Guest, { through: "Like" });
    };
    return Question;
};
