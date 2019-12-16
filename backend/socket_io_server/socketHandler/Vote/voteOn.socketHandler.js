import {addVote, addAndDelete} from "../../../DB/queries/vote";
import logger from "../../logger.js";

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

		if (!allowDuplication && candidateToDelete) {
			await addAndDelete(GuestId, CandidateId, candidateToDelete);
		} else {
			await addVote({GuestId, CandidateId});
		}

		// await addVote({GuestId, CandidateId});
		// if (!allowDuplication && candidateToDelete) {
		// 	await deleteVoteBy({
		// 		GuestId,
		// 		CandidateId: candidateToDelete,
		// 	});
		// }

		emit({
			status: "ok",
			GuestId,
			poll,
		});
	} catch (e) {
		logger.error(e);
		emit({status: "error", e});
	}
};

const eventName = "vote/on";

export default {
	eventName,
	handler: voteOnSocketHandler,
};
