import models from "../models";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

export async function addVote({}) {}

export async function deleteVoteById({}) {}

export async function getVotesByCandidate() {}

export async function getVotesByGuestId() {}

export async function getFromGuest() {}

export async function getCandidatesByGuestId(candidateList, guestId) {
	const result = await models.Vote.findAll({
		where: {
			[Op.and]: [
				{ GuestId: guestId },
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
