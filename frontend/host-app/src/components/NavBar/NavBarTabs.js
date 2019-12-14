import {withStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";

const NavBarTabs = withStyles({
	root: {
		borderBottom: "1px solid #e8e8e8",
	},
	indicator: {
		backgroundColor: "rgba(45,48,52,0.96)",
	},
})(Tabs);

export default NavBarTabs;
