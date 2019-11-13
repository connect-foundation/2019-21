"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "Candidates", // name of Source model
            "PollId", // name of the key we're adding
            {
                type: Sequelize.INTEGER,
                references: {
                    model: "Polls", // name of Target model
                    key: "id", // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            "Candidates", // name of Source model
            "PollId" // key we want to remove
        );
    },
};
