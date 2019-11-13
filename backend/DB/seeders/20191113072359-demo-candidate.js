"use strict";
import { makeCandadateDummy } from "../utils";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Candidates",
            makeCandadateDummy(),
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Candidate", null, {});
    },
};
