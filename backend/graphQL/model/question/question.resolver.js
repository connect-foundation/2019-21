import {getQuestionsByEventId} from "../../../DB/queries/question.js";

async function questionResolver(EventId) {
	return getQuestionsByEventId(EventId);
}

// noinspection JSUnusedGlobalSymbols
export default {
	Query: {
		questions: (_, {EventId}) => questionResolver(EventId),
	},
};
