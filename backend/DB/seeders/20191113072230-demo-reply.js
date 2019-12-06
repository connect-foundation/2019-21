import makeReplyDummy from "../dummy/replyDummies";

module.exports = {
	up: (queryInterface, Sequelize) =>
		makeReplyDummy().then(data =>
			queryInterface.bulkInsert("Questions", data, {}),
		),

	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete("Questions", null, {}),
};
