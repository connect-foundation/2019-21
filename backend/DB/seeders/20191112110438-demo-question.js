import makeQuestionDummy from "../dummy/questionDummies";

module.exports = {
	up: queryInterface =>
		makeQuestionDummy().then(data =>
			queryInterface.bulkInsert("Questions", data, {}),
		),

	down: queryInterface =>
		queryInterface.bulkDelete("Questions", null, {}),
};
