"use strict";
import { makeReplyDummy } from "../utils";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Replies", makeReplyDummy(), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Replies", null, {});
    },
};
