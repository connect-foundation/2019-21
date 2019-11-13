"use strict";

import { makeEmojiReplyDummy } from "../utils";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "EmojiReplies",
            makeEmojiReplyDummy(),
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("EmojiReplies", null, {});
    },
};
