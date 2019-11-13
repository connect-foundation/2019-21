"use strict";
module.exports = (sequelize, DataTypes) => {
    const Reply = sequelize.define(
        "Reply",
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
    Reply.associate = function(models) {
        Reply.belongsTo(models.Question);
        Reply.belongsTo(models.Guest);
        Reply.belongsToMany(models.Guest, { through: "EmojiReplies" });
    };
    return Reply;
};
