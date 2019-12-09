import React from "react";
import Box from "@material-ui/core/Box";
import gray from "@material-ui/core/colors/grey.js";

const style = {
	backgroundColor: gray[300],
};

export default function PaddingArea() {
	return <Box p={24} style={style} />;
}
