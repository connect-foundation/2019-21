import {socketClient} from "../../libs/socket.io-Client-wrapper";

const moderationEventEmit = (eventId, state) =>
	socketClient.emit("moderation/toggle", {eventId, state: !state});

export default moderationEventEmit;
