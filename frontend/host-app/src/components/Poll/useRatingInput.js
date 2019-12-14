import {useState} from "react";

const MAX_STARS = 10;
const RECOMMENDED_MAX_STARS = 5;

function useRatingInput() {
	const [ratingValue, setRatingValue] = useState(RECOMMENDED_MAX_STARS);

	return {ratingValue, setRatingValue};
}

export default useRatingInput;
