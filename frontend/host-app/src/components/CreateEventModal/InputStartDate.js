import React, {useState} from "react";
import {
	DateTimePicker,
	MuiPickersUtilsProvider,
	TimePicker,
} from "@material-ui/pickers";
import {styled} from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

const marginTopLength = 20;

const CustomDateTimePicker = styled(DateTimePicker)({
	marginTop: marginTopLength,
	width: 220,
});

const CustomTimePicker = styled(TimePicker)({
	marginTop: marginTopLength,
});

function InputStartDate(props) {
	const {setStartDate, setEndDate} = props.dispatch;
	const [lastTime, handleLastTimeChange] = useState(0);

	const calcEndDate = inputTime => {
		const hour = moment(inputTime).format("HH");
		const minuate = moment(inputTime).format("mm");

		let addedDate = moment(props.startDate)
			.add(hour, "h")
			.toDate();

		addedDate = moment(addedDate)
			.add(minuate, "m")
			.toDate();
		setEndDate(addedDate);
		handleLastTimeChange(inputTime);
	};

	return (
		<>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<CustomDateTimePicker
					variant="inline"
					label="시작날짜"
					value={props.startDate}
					onChange={setStartDate}
				/>
				<CustomTimePicker
					clearable
					ampm={false}
					label="유효시간"
					value={lastTime}
					onChange={calcEndDate}
					minutesStep={5}
				/>
			</MuiPickersUtilsProvider>
		</>
	);
}

export default InputStartDate;
