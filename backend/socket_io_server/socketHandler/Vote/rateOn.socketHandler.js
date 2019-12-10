import {addVote, deleteVoteBy} from "../../../DB/queries/vote";

// const data = {
//     GuestId: guest.id,
//     CandidateId: rate.candidateId,
//     poll: poll,
// };

const rateOnSocketHandler = async (data, emit) => {
	try {
		const {GuestId, CandidateId, poll} = data;

		await addVote({GuestId, CandidateId});

		emit({
			GuestId: GuestId,
			poll: poll,
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
