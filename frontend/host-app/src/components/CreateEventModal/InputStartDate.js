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
import {validDate} from "../../libs/eventValidation";

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

function InputStartDate(props) {
	const {startDate, dispatch, errorState} = props;
	const [lastTime, setLastTime] = useState(new Date().setHours(1, 0));

	const calcEndDate = (lastTime, startTime = startDate) => {
		const hour = moment(lastTime).format("HH");
		const minuate = moment(lastTime).format("mm");
		let addedTime = moment(startTime)
			.add(hour, "h")
			.toDate();

		addedTime = moment(addedTime)
			.add(minuate, "m")
			.toDate();
		dispatch({
			type: "SET_PROPERTY",
			property: "endDate",
			value: moment(addedTime),
		});
		setLastTime(lastTime);
		dispatch({
			type: "SET_ERROR_STATE",
			property: "date",
			value: !validDate(startTime, addedTime),
		});
	};

	const setDate = event => {
		dispatch({
			type: "SET_PROPERTY",
			property: "startDate",
			value: event,
		});
		calcEndDate(lastTime, event);
	};

	return (
		<CustomContainer>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<CustomDateTimePicker
					label="시작날짜"
					error={errorState.date}
					value={startDate}
					format={"yyyy년 MM월 dd일 HH시 mm분"}
					onChange={setDate}
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
