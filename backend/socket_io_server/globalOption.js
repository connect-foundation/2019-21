const globalOption = (function() {
	/*  optionValue Example
	{
		eventId:{
			moderationOption: true
			replyOption: true
		}
	}
	 */
	const optionValue = {};

	return () => ({
		setOption: (eventId, _option) => {
			optionValue[eventId] = _option;
		},
		getOption: eventId => optionValue[eventId],
	});
})()();

export default globalOption;
