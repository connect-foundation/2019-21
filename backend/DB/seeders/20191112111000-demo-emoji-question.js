"use strict";

import { makeEmojiQuestionDummy } from "../utils";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "EmojiQuestions",
            makeEmojiQuestionDummy(),
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("EmojiQuestions", null, {});
    },
};
