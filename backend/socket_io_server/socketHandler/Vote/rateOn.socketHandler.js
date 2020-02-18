import {addVote} from "../../../DB/queries/vote";
import updateVoters from "./updateVoters";
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

		await updateVoters(poll);

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

// noinspection JSUnusedGlobalSymbols
export default {
	eventName,
	handler: rateOnSocketHandler,
};
