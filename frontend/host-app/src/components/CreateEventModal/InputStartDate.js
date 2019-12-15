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
	margin: "1rem 0 0 0",
	padding: 0,
});

const CustomDateTimePicker = styled(DateTimePicker)({
	marginTop: marginTopLength,
	width: 250,
});

const CustomTimePicker = styled(TimePicker)({
	marginTop: marginTopLength,
	marginLeft: 30,
	width: 120,
});

// todo: propType, defalut prop 추가
function InputStartDate(props) {
	const {errorState} = props;
	const {setStartDate, setEndDate} = props.dispatch;
	const [lastTime, handleLastTimeChange] = useState(
		new Date().setHours(0, 0),
	);

	const calcEndDate = inputTime => {
		const hour = moment(inputTime).format("HH");
		const minuate = moment(inputTime).format("mm");

		let addedDate = moment(props.startDate)
			.add(hour, "h")
			.toDate();

		addedDate = moment(addedDate)
			.add(minuate, "m")
			.toDate();
		setEndDate(moment(addedDate));
		handleLastTimeChange(inputTime);
	};

	return (
		<CustomContainer>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<CustomDateTimePicker
					label="시작날짜"
					value={props.startDate}
					error={errorState}
					format={"yyyy년 MM월 dd일 HH시 mm분"}
					onChange={setStartDate}
				/>
				<CustomTimePicker
					clearable
					ampm={false}
					label="유효시간"
					value={lastTime}
					onChange={calcEndDate}
					format={"HH시간 mm분"}
					minutesStep={5}
				/>
			</MuiPickersUtilsProvider>
		</CustomContainer>
	);
}

export default InputStartDate;
