"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Questions",
            [
                {
                    content: "안녕하세요",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    EventId: 1,
                    GuestId: 1,
                },
                {
                    content: "송년회",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    EventId: 1,
                    GuestId: 1,
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Questions", null, {});
    },
};
