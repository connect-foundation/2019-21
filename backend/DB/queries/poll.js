import models from "../models";
import logger from "../logger.js";

const sequelize = models.sequelize;
// noinspection JSUnresolvedVariable
const Poll = models.Poll;
// noinspection JSUnresolvedVariable
const Candidate = models.Candidate;

export async function openPoll(id) {
	// result should be == [1], 1개의 row가 성공했다는 의미
	return Poll.update(
		{
			state: "running",
			pollDate: new Date(),
		},
		{
			where: {id},
		},
	);
}

export async function closePoll(id) {
	// result should be == [1], 1개의 row가 성공했다는 의미
	return Poll.update(
		{
			state: "closed",
		},
		{
			where: {id},
		},
	);
}

export async function getPollsByEventId(EventId) {
	return Poll.findAll({
		where: {EventId},
		order: [["id", "DESC"]],
	});
}

// todo: refactoring
const makeCandidateRows = (id, pollType, candidates) => {
	let i = 0;
	const nItems = [];

	for (const value of candidates) {
		nItems.push({
			PollId: id,
			number: i,
			content: pollType === "nItems" ? value : (i + 1).toString(),
		});
		i++;
	}

	return nItems;
};


// todo: refactoring
// look for inject transaction object
// https://sequelize.org/master/manual/transactions.html#automatically-pass-transactions-to-all-queries
export async function createPoll(
	EventId,
	pollName,
	pollType,
	selectionType,
	allowDuplication,
	candidates,
) {
	let transaction;
	let poll;
	let nItems;

	const state = "standby";
	const pollDate = new Date();

	try {
		// get transaction
		transaction = await sequelize.transaction();

		// step 1
		poll = await Poll.create(
			{
				EventId,
				pollName,
				pollType,
				selectionType,
				allowDuplication,
				state,
				pollDate,
			},
			{transaction},
		);

		// step 2
		const rows = makeCandidateRows(poll.id, pollType, candidates);

		nItems = await Candidate.bulkCreate(rows, {transaction});

		// commit
		await transaction.commit();
	} catch (err) {
		// Rollback transaction only if the transaction object is defined
		if (transaction) await transaction.rollback();
		logger.error("Transaction rollback", err);
	}

	if (poll && nItems) {
		poll = poll.get({plain: true});
		poll.nItems = nItems.map(item => item.get({plain: true}));
	}

	return poll;
}
