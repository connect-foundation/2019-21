import Sequelize from "sequelize";
import models from "../models";

const Op = Sequelize.Op;

export async function getCandidatesByPollId(pollIdList) {
	return models.Candidate.findAll({
		where: {
			PollId: {
				[Op.or]: pollIdList,
			},
		},
	});
}
