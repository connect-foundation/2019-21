import {useSocket} from "../../libs/socket.io-Client-wrapper";

const useModerationEventHandler = stateHandler => {
	useSocket("moderation/toggle", req => {
		stateHandler(req.state);
	});
};

export default useModerationEventHandler;
