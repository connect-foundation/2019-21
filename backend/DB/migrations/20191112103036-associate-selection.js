"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Selections", {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            VoterId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            CandidateId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        // remove table
        return queryInterface.dropTable("Seletions");
    },
};
