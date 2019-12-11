import {addVote, deleteVoteBy} from "../../../DB/queries/vote";

// const data = {
//     GuestId: guest.id,
//     CandidateId: vote.candidateId,
//     allowDuplication: poll.allowDuplication,
//     poll: poll,
// };

const voteOnSocketHandler = async (data, emit) => {
	try {
		const {
			GuestId,
			CandidateId,
			allowDuplication,
			poll,
			candidateToDelete,
		} = data;

		await addVote({GuestId, CandidateId});

		if (!allowDuplication && candidateToDelete) {
			await deleteVoteBy({GuestId, CandidateId: candidateToDelete});
		}

		emit({
			GuestId,
			poll,
		});
	} catch (e) {
		console.error(e);
		emit({status: "error(vote/on)", e});
	}
};

const eventName = "vote/on";

export default {
	eventName,
	handler: voteOnSocketHandler,
};
