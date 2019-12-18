import React from "react";
import {Tab, Box, Tabs} from "@material-ui/core";
import {styled} from "@material-ui/core/styles";
import TabContent from "./TabContent";
import GeneralSetting from "./GeneralSetting/GeneralSetting";

const MyContainer = styled(Box)({
	display: "flex",
	flexShrink: 1,
	padding: 0,
});

const CustomTab = styled(Tab)({});

function allyProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function TabNavigation({handleClose}) {
	const [value, setValue] = React.useState(1);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<MyContainer>
			<Tabs
				orientation="vertical"
				value={value}
				onChange={handleChange}
				aria-label="simple tabs example"
			>
				/
				<CustomTab label="이벤트설정" disabled={true} />
				<CustomTab label="기본설정" {...allyProps(1)} />
			</Tabs>

			<TabContent value={value} index={1}>
				<GeneralSetting handleClose={handleClose} />
			</TabContent>
		</MyContainer>
	);
}
