import models from "../models";

const sequelize = models.sequelize;
const Poll = models.Poll;
const Candidate = models.Candidate;

export async function openPoll(pollId) {
	const now = new Date();
	const result = await models.Poll.update(
		{
			state: "running",
			pollDate: now,
		},
		{
			where: {id: pollId},
		}
	);

	// result should be == [1], 1개의 row가 성공했다는 의미
	return result;
}

export async function closePoll(pollId) {
	const result = await models.Poll.update(
		{
			state: "closed",
		},
		{
			where: {id: pollId},
		}
	);

	// result should be == [1], 1개의 row가 성공했다는 의미
	return result;
}

export async function getPollsByEventId(eventId) {
	const result = await models.Poll.findAll({
		where: {EventId: eventId},
		order: [["id", "DESC"]],
	});

	return result;
}

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

export async function createPoll(
	EventId,
	pollName,
	pollType,
	selectionType,
	allowDuplication,
	candidates
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
			{transaction}
		);

		// step 2
		const rows = makeCandidateRows(poll.id, pollType, candidates);

		nItems = await Candidate.bulkCreate(rows, {transaction});

		// commit
		await transaction.commit();
	} catch (err) {
		// Rollback transaction only if the transaction object is defined
		if (transaction) await transaction.rollback();
		console.log("Transaction rollback", err);
	}

	if (poll && nItems) {
		poll = poll.get({plain: true});
		poll.nItems = nItems.map(item => item.get({plain: true}));
	}

	return poll;
}
