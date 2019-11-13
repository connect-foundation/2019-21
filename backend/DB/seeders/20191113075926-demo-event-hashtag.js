"use strict";

import { makeEventHashTagDummy } from "../utils";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "EventHashtags",
            makeEventHashTagDummy(),
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("EventHashtags", null, {});
    },
};
