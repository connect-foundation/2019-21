import makeQuestionDummy from "../dummy/questionDummies";

module.exports = {
	up: (queryInterface, Sequelize) =>
		makeQuestionDummy().then(data =>
			queryInterface.bulkInsert("Questions", data, {}),
		),

	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete("Questions", null, {}),
};
