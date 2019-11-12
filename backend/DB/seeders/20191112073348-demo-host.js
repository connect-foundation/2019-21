"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Hosts",
            [
                {
                    oauthId: "admin",
                    name: "kim",
                    email: "emsud@naver.com",
                    emailFeedBack: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    oauthId: "admin2",
                    name: "hong",
                    email: "ta@naver.com",
                    emailFeedBack: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Hosts", null, {});
    },
};
