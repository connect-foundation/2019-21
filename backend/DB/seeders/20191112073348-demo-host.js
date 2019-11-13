"use strict";
import { makeHostDummy } from "../utils";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Hosts", makeHostDummy(), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Hosts", null, {});
    },
};
