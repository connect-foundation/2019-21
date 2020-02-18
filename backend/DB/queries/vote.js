import Sequelize from "sequelize";
import models from "../models";
import logger from "../logger.js";

const sequelize = models.sequelize;
// noinspection JSUnresolvedVariable
const Vote = models.Vote;
const Op = Sequelize.Op;

export async function addVote({GuestId, CandidateId}) {
	return Vote.create({GuestId, CandidateId});
}

export async function deleteVoteBy({GuestId, CandidateId}) {
	return Vote.destroy({where: {GuestId, CandidateId}});
}

export async function addAndDelete(guestId, candidateToAdd, candidateToDelete) {
	const GuestId = guestId;
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
			{transaction},
		);

		// step 2
		CandidateId = candidateToDelete;
		rows = await Vote.destroy({
			where: {
				GuestId,
				CandidateId,
			},
			transaction,
		});

		// commit
		await transaction.commit();
	} catch (err) {
		// Rollback transaction only if the transaction object is defined
		if (transaction) {
			await transaction.rollback();
		}

		logger.error("Transaction rollback", err);
	}

	return rows;
}

export async function getCandidatesByGuestId(candidateList, guestId) {
	return Vote.findAll({
		where: {
			[Op.and]: [
				{GuestId: guestId}, {
					CandidateId: {
						[Op.or]: candidateList,
					},
				},
			],
		},
		attributes: ["CandidateId"],
	});
}

export async function getVotersByCandidateList(candidateList) {
	return Vote.count({
		where: {
			CandidateId: {
				[Op.or]: candidateList,
			},
		},
		distinct: true,
		col: "GuestId",
	});
}
