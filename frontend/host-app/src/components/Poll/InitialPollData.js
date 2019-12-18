const RECOMMENDED_MAX_STARS = 5;
const now = new Date();
const initialText = {
	value: "",
	error: false,
	helperText: "",
};

const initialPollData = {
	pollName: {
		value: "",
		error: false,
		helperText: "",
	},
	pollType: "nItems",
	selectionType: "text",
	texts: [initialText, initialText],
	dates: [now, now],
	ratingValue: RECOMMENDED_MAX_STARS,
	allowDuplication: false,
};

export default initialPollData;
