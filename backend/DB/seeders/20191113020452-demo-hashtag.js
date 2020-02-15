import makeHashTagDummy from "../dummy/hashTagDummies";

module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert("Hashtags", makeHashTagDummy(), {}),

	down: queryInterface =>
		queryInterface.bulkDelete("Hashtags", null, {}),
};
