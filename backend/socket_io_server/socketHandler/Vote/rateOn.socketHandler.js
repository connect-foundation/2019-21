import {addVote, deleteVoteBy} from "../../../DB/queries/vote";
import logger from "../../logger.js";

// const data = {
//     GuestId: guest.id,
//     CandidateId: rate.candidateId,
//     poll: poll,
// };

const rateOnSocketHandler = async (data, emit) => {
	try {
		const {GuestId, CandidateId, poll, index} = data;

		await addVote({GuestId, CandidateId});

		emit({
			status: "ok",
			GuestId,
			poll,
			index,
		});
	} catch (e) {
		logger.error(e);
		emit({status: "error", e});
	}
};

const eventName = "rate/on";

export default {
	eventName,
	handler: rateOnSocketHandler,
};
