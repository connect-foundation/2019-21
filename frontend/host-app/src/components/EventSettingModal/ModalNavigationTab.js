import React from "react";
import {Tab, Box, Tabs} from "@material-ui/core";
import {styled} from "@material-ui/core/styles";
import GeneralSetting from "./SettingTabContents/GeneralSetting";

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

export default function ModalNavigationTab() {
	const [value, setValue] = React.useState(0);

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
				<CustomTab label="Item One" {...allyProps(0)} />
				<CustomTab label="Item Two" {...allyProps(1)} />
				<CustomTab label="Item Three" {...allyProps(2)} />
			</Tabs>
			<GeneralSetting value={value} index={0}>
				Item One
			</GeneralSetting>
		</MyContainer>
	);
}
