"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Polls",
            [
                {
                    name: "선거",
                    pollType: 0,
                    duplicateOption: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    EventId: 1,
                },
                {
                    name: "송년회",
                    pollType: 0,
                    duplicateOption: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    EventId: 1,
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Polls", null, {});
    },
};
