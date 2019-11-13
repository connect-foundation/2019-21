"use strict";

import { makeVoterDummy } from "../utils";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Voters", makeVoterDummy(), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Voters", null, {});
    },
};
