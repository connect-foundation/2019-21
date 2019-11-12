"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .addColumn(
                "Replies", // name of Source model
                "GuestId", // name of the key we're adding
                {
                    type: Sequelize.INTEGER,
                    references: {
                        model: "Guests", // name of Target model
                        key: "id", // key in Target model that we're referencing
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                }
            )
            .then(() => {
                // Payment hasOne Order
                return queryInterface.addColumn(
                    "Replies", // name of Target model
                    "QuestionId", // name of the key we're adding
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: "Questions", // name of Source model
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
                "Replies", // name of Source model
                "GuestId" // key we want to remove
            )
            .then(() => {
                return queryInterface.removeColumn(
                    "Replies", // name of the Target model
                    "QuestionId" // key we want to remove
                );
            });
    },
};
