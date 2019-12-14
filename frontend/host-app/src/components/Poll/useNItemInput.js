import {useState} from "react";

function useNItemInput() {
	const initialText = {
		value: "",
		error: false,
		helperText: "",
	};
	const initialTexts = [initialText, initialText];
	const [texts, setTexts] = useState(initialTexts);

	const onTextChange = (event, id) => {
		setTexts(
			texts.map((text, index) =>
				index === id
					? {
							...text,
							value: event.target.value,
							error: false,
							helperText: "",
					  }
					: text,
			),
		);
	};

	const onAddText = () => {
		setTexts([...texts, initialText]);
	};

	const onDeleteText = id => {
		setTexts(texts.filter((_, index) => index !== id));
	};

	return {texts, setTexts, onTextChange, onAddText, onDeleteText};
}

export default useNItemInput;
