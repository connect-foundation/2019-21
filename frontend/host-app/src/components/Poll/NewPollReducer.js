const initialText = {
	value: "",
	error: false,
	helperText: "",
};

function newPollReducer(poll, action) {
	switch (action.type) {
		case "POLL_NAME_CHANGE": {
			return {
				...poll,
				pollName: action.value,
			};
		}
		case "POLL_TYPE_CHANGE": {
			return {
				...poll,
				pollType: action.value,
			};
		}
		case "SELECTION_TYPE_CHANGE": {
			return {
				...poll,
				selectionType: action.value,
			};
		}
		case "TEXT_CHANGE": {
			const newTexts = poll.texts.map((text, index) =>
				(index === action.id ?
					{
						...text,
						value: action.value,
						error: false,
						helperText: "",
					} :
					text),
			);

			return {
				...poll,
				texts: newTexts,
			};
		}
		case "TEXT_ADD": {
			return {
				...poll,
				texts: [...poll.texts, initialText],
			};
		}
		case "TEXT_DELETE": {
			const newTexts = poll.texts.filter(
				(_, index) => index !== action.id,
			);

			return {
				...poll,
				texts: newTexts,
			};
		}
		case "TEXT_CHECK": {
			const newTexts = poll.texts.map(text =>
				(text.value.length === 0 ?
					{
						...text,
						error: true,
						helperText: "항목을 입력하세요",
					} :
					{
						...text,
						error: false,
						helperText: "",
					}),
			);

			return {
				...poll,
				texts: newTexts,
			};
		}
		case "DATE_CHANGE": {
			const newDates = poll.dates.map((date, index) =>
				(index === action.id ? action.value : date),
			);

			return {
				...poll,
				dates: newDates,
			};
		}
		case "DATE_ADD": {
			return {
				...poll,
				dates: [...poll.dates, new Date()],
			};
		}
		case "DATE_DELETE": {
			const newDates = poll.dates.filter(
				(_, index) => index !== action.id,
			);

			return {
				...poll,
				dates: newDates,
			};
		}
		case "RATING_VALUE_CHANGE": {
			return {
				...poll,
				ratingValue: action.value,
			};
		}
		case "DUPLICATION_CHANGE": {
			return {
				...poll,
				allowDuplication: action.value,
			};
		}
		default: {
			// eslint-disable-next-line no-console
			console.error("Unhandled action type on newPollReducer");
			return poll;
		}
	}
}

export default newPollReducer;
