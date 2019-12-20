import {addVote, addAndDelete} from "../../../DB/queries/vote";
import updateVoters from "./updateVoters";
import logger from "../../logger.js";

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

		await updateVoters(poll);

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
