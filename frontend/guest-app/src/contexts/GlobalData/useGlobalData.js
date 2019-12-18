import {useContext} from "react";
import GlobalDataContext from "./GlobalDataContext.js";

function useGlobalData() {
	return useContext(GlobalDataContext);
}

export default useGlobalData;
