import makeLikeDummy from "../dummy/likeDummies";

module.exports = {
	up: queryInterface =>
		makeLikeDummy().then(data =>
			queryInterface.bulkInsert("Likes", data, {}),
		),
	down: queryInterface =>
		queryInterface.bulkDelete("Likes", null, {}),
};
