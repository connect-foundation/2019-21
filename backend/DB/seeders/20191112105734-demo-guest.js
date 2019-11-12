"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Guests",
            [
                {
                    name: "a",
                    guestSid: "asdfadsf",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    EventId: 1,
                },
                {
                    name: "b",
                    guestSid: "asdfadsf",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    EventId: 2,
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Guests", null, {});
    },
};
