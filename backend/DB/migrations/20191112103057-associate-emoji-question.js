"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("EmojiQuestions", {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            EmojiId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            QuestionId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            GuestId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        // remove table
        return queryInterface.dropTable("EmojiQuestions");
    },
};
