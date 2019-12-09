import React from "react";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
	barColors: {
		"0": "#f50",
		"1.0": "#fff",
	},
	shadowBlur: 5,
});

export default function TopProgressBar() {
	return <TopBarProgress />;
}
