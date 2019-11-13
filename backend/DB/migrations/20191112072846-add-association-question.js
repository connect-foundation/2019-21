"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .addColumn(
                "Questions", // name of Source model
                "EventId", // name of the key we're adding
                {
                    type: Sequelize.INTEGER,
                    references: {
                        model: "Events", // name of Target model
                        key: "id", // key in Target model that we're referencing
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                }
            )
            .then(() => {
                return queryInterface.addColumn(
                    "Questions", // name of Target model
                    "GuestId", // name of the key we're adding
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: "Guests", // name of Source model
                            key: "id",
                        },
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    }
                );
            });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface
            .removeColumn(
                "Questions", // name of Source model
                "EventId" // key we want to remove
            )
            .then(() => {
                return queryInterface.removeColumn(
                    "Questions", // name of the Target model
                    "GuestId" // key we want to remove
                );
            });
    },
};
