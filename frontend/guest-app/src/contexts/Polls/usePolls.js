import {useContext} from "react";
import PollsContext from "./PollsContext.js";

function usePolls() {
	return useContext(PollsContext);
}

export default usePolls;
