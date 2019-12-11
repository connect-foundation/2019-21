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
import {validStartDate} from "../../libs/eventValidation";

const marginTopLength = 20;

const CustomContainer = styled(Container)({
	display: "flex",
	margin: 0,
	padding: 0,
});

const CustomDateTimePicker = styled(DateTimePicker)({
	marginTop: marginTopLength,
	width: 220,
});

const CustomTimePicker = styled(TimePicker)({
	marginTop: marginTopLength,
});

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
					minutesStep={5}
				/>
			</MuiPickersUtilsProvider>
		</CustomContainer>
	);
}

export default InputStartDate;
