import {updateIsStared} from "../../../DB/queries/question";

const toggleStarSocketHandler = async (data, emit) => {
	try {
		const from = data.from[0];
		const to = data.to[0];

		await updateIsStared(from, to);
		emit(to);
	} catch (e) {
		console.log(e);
		emit({status: "error", e});
	}
};

const eventName = "question/toggleStar";

export default {
	eventName,
	handler: toggleStarSocketHandler,
};
