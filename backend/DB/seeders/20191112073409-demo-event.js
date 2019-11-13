"use strict";
import { makeEventDummy } from "../utils";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Events", makeEventDummy(), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Events", null, {});
    },
};
