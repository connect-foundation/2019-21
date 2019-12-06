import makeLikeDummy from "../dummy/likeDummies";

module.exports = {
	up: (queryInterface, Sequelize) =>
		makeLikeDummy().then(data =>
			queryInterface.bulkInsert("Likes", data, {}),
		),
	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete("Likes", null, {}),
};
