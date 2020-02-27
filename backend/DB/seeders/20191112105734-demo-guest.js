import makeGuestDummy from "../dummy/guestDummies";

module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert("Guests", makeGuestDummy(), {}),

	down: queryInterface =>
		queryInterface.bulkDelete("Guests", null, {}),
};
