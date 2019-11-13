"use strict";
module.exports = (sequelize, DataTypes) => {
    const Guest = sequelize.define(
        "Guest",
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
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {}
    );
    Guest.associate = function(models) {
        Guest.belongsTo(models.Event);
        Guest.hasMany(models.Reply);
        /**/ Guest.hasMany(models.Question);
        Guest.hasMany(models.Voter);
        /**/ Guest.belongsToMany(models.Emoji, { through: "EmojiQuestions" });
        /**/ Guest.belongsToMany(models.Emoji, { through: "EmojiReplies" });
        /**/ Guest.belongsToMany(models.Question, { through: "Likes" });
    };
    return Guest;
};
