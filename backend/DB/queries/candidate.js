import Sequelize from "sequelize";
import models from "../models";

const Op = Sequelize.Op;

// eslint-disable-next-line import/prefer-default-export
export async function getCandidatesByPollId(pollIdList) {
	// noinspection JSUnresolvedVariable
	return models.Candidate.findAll({
		where: {
			PollId: {
				[Op.or]: pollIdList,
			},
		},
	});
}
