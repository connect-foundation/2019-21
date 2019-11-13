"use strict";
import { makeQuestionDummy } from "../utils";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Questions", makeQuestionDummy(), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Questions", null, {});
    },
};
