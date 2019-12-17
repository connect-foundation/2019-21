import {useContext} from "react";
import UIControlContext from "./UIControllerContext.js";

function useUIController() {
	return useContext(UIControlContext);
}

export default useUIController;
