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
                },
                {
                    name: "b",
                    guestSid: "asdfadsf",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Guests", null, {});
    },
};
