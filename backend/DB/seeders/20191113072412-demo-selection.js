"use strict";
import { makeSelectionDummy } from "../utils";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Selections",
            makeSelectionDummy(),
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Selections", null, {});
    },
};
