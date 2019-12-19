import React, {useState} from "react";
import {
	DateTimePicker,
	MuiPickersUtilsProvider,
	TimePicker,
} from "@material-ui/pickers";
import {styled} from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import Container from "@material-ui/core/Container";
import moment from "moment";

const marginTopLength = 20;

const CustomContainer = styled(Container)({
	display: "flex",
	margin: 0,
	padding: 0,
});

const CustomDateTimePicker = styled(DateTimePicker)({
	marginTop: marginTopLength,
	width: "14rem",
});

const CustomTimePicker = styled(TimePicker)({
	marginTop: marginTopLength,
});

function InputStartDate(props) {
	const {startDate, endDate} = props;
	const {setStartDate, setEndDate} = props.dispatch;

	const minutes = moment(endDate).diff(moment(new Date()), "minutes") + 1;
	const hours = moment(endDate).diff(moment(new Date()), "hours");

	const [lastTime, handleLastTimeChange] = useState(
		new Date().setHours(hours, minutes),
	);

	const calcEndDate = inputTime => {
		const hour = moment(inputTime).format("HH");
		const minuate = moment(inputTime).format("mm");

		let addedDate = moment()
			.add(hour, "h")
			.toDate();

		addedDate = moment(addedDate)
			.add(minuate, "m")
			.toDate();
		setEndDate(addedDate);
		handleLastTimeChange(inputTime);
	};

	return (
		<CustomContainer>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<CustomDateTimePicker
					label="시작날짜"
					format={"yyyy년 MM월 dd일 HH시 mm분"}
					value={startDate}
					onChange={setStartDate}
					readOnly={true}
				/>
				<CustomTimePicker
					clearable
					ampm={false}
					label="남은시간"
					value={lastTime}
					onChange={calcEndDate}
					minutesStep={5}
				/>
			</MuiPickersUtilsProvider>
		</CustomContainer>
	);
}

export default InputStartDate;
