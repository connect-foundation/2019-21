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
            state: {
                type: DataTypes.STRING(20),
                allowNull: false,
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
        Question.belongsTo(models.Event);
        Question.belongsTo(models.Guest);
        Question.hasMany(models.Question);
        Question.belongsTo(models.Question);
        Question.belongsToMany(models.Emoji, { through: "EmojiQuestions" });
    };
    return Question;
};
