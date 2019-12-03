import makeLikeDummy from "../dummy/likeDummies";

module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.bulkInsert("Likes", makeLikeDummy(), {}),

	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete("Likes", null, {}),
};
