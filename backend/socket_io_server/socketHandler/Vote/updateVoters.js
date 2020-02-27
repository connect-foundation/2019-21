import {getVotersByCandidateList} from "../../../DB/queries/vote.js";

const getCandidateList = items => items.map(n => n.id);

const updateVoters = async poll => {
	// DB에서 갱신된 투표인수를 읽어옴
	for (const candidate of poll.nItems) {
		candidate.voters = await getVotersByCandidateList([candidate.id]);
	}
	const candidateList = getCandidateList(poll.nItems);

	poll.totalVoters = await getVotersByCandidateList(candidateList);
};

export default updateVoters;
