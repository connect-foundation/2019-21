import {addVote, deleteVoteBy} from "../../../DB/queries/vote";

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
			GuestId,
			poll,
			index,
		});
	} catch (e) {
		console.error(e);
		emit({status: "error(rate/on)", e});
	}
};

const eventName = "rate/on";

export default {
	eventName,
	handler: rateOnSocketHandler,
};
