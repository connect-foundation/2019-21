import makeHashTagDummy from "../dummy/hashTagDummies";

module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.bulkInsert("Hashtags", makeHashTagDummy(), {}),

	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete("Hashtags", null, {}),
};
