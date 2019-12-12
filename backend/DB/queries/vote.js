import models from "../models";
import Sequelize from "sequelize";

const Op = Sequelize.Op;

export async function addVote({GuestId, CandidateId}) {
	const vote = models.Vote.create({GuestId, CandidateId});

	return vote;
}

export async function deleteVoteBy({GuestId, CandidateId}) {
	return models.Vote.destroy({where: {GuestId, CandidateId}});
}

export async function addAndDelete(gId, candidateToAdd, candidateToDelete) {
	const sequelize = models.sequelize;
	const Vote = models.Vote;
	const GuestId = gId;
	let CandidateId = candidateToAdd;
	let transaction;
	let rows;

	try {
		// get transaction
		transaction = await sequelize.transaction();
		// step 1
		await Vote.create(
			{
				GuestId,
				CandidateId,
			},
			{transaction}
		);

		// step 2
		CandidateId = candidateToDelete;
		rows = await Vote.destroy({
			where: {
				GuestId,
				CandidateId,
			},
		});

		// commit
		await transaction.commit();
	} catch (err) {
		// Rollback transaction only if the transaction object is defined
		if (transaction) await transaction.rollback();
		console.log("Transaction rollback", err);
	}

	return rows;
}

export async function deleteVoteById({}) {}

export async function getVotesByCandidate() {}

export async function getVotesByGuestId() {}

export async function getFromGuest() {}

export async function getCandidatesByGuestId(candidateList, guestId) {
	const result = await models.Vote.findAll({
		where: {
			[Op.and]: [
				{GuestId: guestId},
				{
					CandidateId: {
						[Op.or]: candidateList,
					},
				},
			],
		},
		attributes: ["CandidateId"],
	});

	return result;
}

export async function getVotersByCandidateList(candidateList) {
	const count = await models.Vote.count({
		where: {
			CandidateId: {
				[Op.or]: candidateList,
			},
		},
		distinct: true,
		col: "GuestId",
	});

	return count;
}
