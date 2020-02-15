import makeReplyDummy from "../dummy/replyDummies";

module.exports = {
	up: queryInterface =>
		makeReplyDummy().then(data =>
			queryInterface.bulkInsert("Questions", data, {}),
		),

	down: queryInterface =>
		queryInterface.bulkDelete("Questions", null, {}),
};
