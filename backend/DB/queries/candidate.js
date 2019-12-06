import models from "../models";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

export async function getCandidatesByPollId(pollIdList) {
	const result = await models.Candidate.findAll({
		where: {
			PollId: {
				[Op.or]: pollIdList,
			},
		},
	});

	return result;
}
