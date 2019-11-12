"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "EmojiQuestions",
            [
                {
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    EmojiId: 1,
                    QuestionId: 1,
                    GuestId: 2,
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("EmojiQuestions", null, {});
    },
};
