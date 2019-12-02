import faker from "faker";
import moment from "moment";
import pollDummyData from "./pollDummyData.js";

faker.seed(1234);

const EVENT_NUM = 5;
const GUEST_NUM = 200;

function makeQuestionDummy(number = 100) {
	const bulkQuestion = [];

	for (let i = 0; i < number; ++i) {
		const content = faker.lorem.sentence();
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const state = "active";
		const EventId = faker.random.number({min: 1, max: EVENT_NUM});
		const GuestId = faker.random.number({min: 1, max: GUEST_NUM});
		const QuestionId = null;
		const isStared = false;

		bulkQuestion.push({
			content,
			createdAt,
			state,
			updatedAt,
			EventId,
			GuestId,
			QuestionId,
			isStared,
		});
	}
	return bulkQuestion;
}

function makeEmojiDummy(number = 50) {
	const bulkEmoji = [];

	for (let i = 0; i < number; ++i) {
		const QuestionId = faker.random.number({min: 1, max: 100});
		const GuestId = faker.random.number({min: 1, max: GUEST_NUM});
		const EmojiName = "point_up";
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;

		bulkEmoji.push({
			QuestionId,
			GuestId,
			EmojiName,
			createdAt,
			updatedAt,
		});
	}
	return bulkEmoji;
}

function makeHostDummy(number = 100) {
	const bulkHost = [];

	for (let i = 0; i < number; ++i) {
		const oauthId = faker.internet.userName();
		const email = faker.internet.email();
		const name = faker.name.firstName();
		const image = faker.image.imageUrl();
		const emailFeedBack = faker.random.boolean();
		const createdAt = faker.date.past(10);
		const updatedAt = createdAt;

		bulkHost.push({
			oauthId,
			email,
			name,
			emailFeedBack,
			image,
			createdAt,
			updatedAt,
		});
	}
	return bulkHost;
}

function makeGuestDummy(number = GUEST_NUM) {
	const bulkGuest = [];

	for (let i = 0; i < number; ++i) {
		const name = faker.name.firstName();
		const guestSid = faker.random.uuid();
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const EventId = faker.random.number({min: 1, max: EVENT_NUM});
		const isAnonymous = false;

		bulkGuest.push({
			name,
			createdAt,
			updatedAt,
			EventId,
			guestSid,
			isAnonymous,
		});
	}
	return bulkGuest;
}

function makeReplyDummy(number = 200) {
	const bulkQuestion = [];

	for (let i = 0; i < number; ++i) {
		const content = faker.lorem.sentence();
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const state = "active";
		const EventId = faker.random.number({min: 1, max: EVENT_NUM});
		const GuestId = faker.random.number({min: 1, max: GUEST_NUM});
		const QuestionId = faker.random.number({min: 1, max: 100});

		bulkQuestion.push({
			content,
			createdAt,
			state,
			updatedAt,
			EventId,
			GuestId,
			QuestionId,
		});
	}
	return bulkQuestion;
}

function makePollDummy(number = 200) {
	const bulkPoll = [];

	for (let i = 0; i < number; ++i) {
		const name = faker.lorem.sentence();
		const pollType = faker.random.number(1);
		const duplicateOption = faker.random.boolean();
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const EventId = faker.random.number({min: 1, max: EVENT_NUM});

		bulkPoll.push({
			name,
			pollType,
			duplicateOption,
			createdAt,
			updatedAt,
			EventId,
		});
	}

	return bulkPoll;
}

function makeHashTagDummy(number = 100) {
	const bulkHashTag = [];

	for (let i = 0; i < number; ++i) {
		const name = faker.hacker.ingverb();
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const EventId = faker.random.number({min: 1, max: EVENT_NUM});

		bulkHashTag.push({name, createdAt, updatedAt, EventId});
	}
	return bulkHashTag;
}

function makeVoterDummy(number = 100) {
	const bulkVoter = [];

	for (let i = 0; i < number; ++i) {
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const GuestId = faker.random.number({min: 1, max: GUEST_NUM});

		bulkVoter.push({createdAt, updatedAt, GuestId});
	}

	return bulkVoter;
}

function makeEventDummy(number = EVENT_NUM) {
	const bulkEvent = [];
	const filter = {};

	for (let i = 0; i < number; ++i) {
		let alphaNum = faker.random.alphaNumeric(4);

		while (filter[alphaNum]) {
			alphaNum = faker.random.alphaNumeric(4);
		}
		const eventCode = alphaNum;

		filter[eventCode] = 1;
		const moderationOption = faker.random.boolean();
		const replyOption = faker.random.boolean();
		const createdAt = faker.date.past(10);
		const updatedAt = createdAt;
		const startAt = createdAt;
		const endAt = moment(createdAt)
			.add(faker.random.number({min: 1, max: 24}), "h")
			.toDate();
		const HostId = faker.random.number({min: 1, max: 100});

		bulkEvent.push({
			eventCode,
			moderationOption,
			replyOption,
			createdAt,
			updatedAt,
			endAt,
			HostId,
			startAt,
		});
	}
	return bulkEvent;
}

function makeLikeDummy(number = 100) {
	const bulkLike = [];

	for (let i = 0; i < number; ++i) {
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const feeling = faker.random.number({min: 0, max: 1});
		const GuestId = faker.random.number({min: 1, max: GUEST_NUM});
		const QuestionId = faker.random.number({min: 1, max: 100});

		bulkLike.push({createdAt, updatedAt, feeling, GuestId, QuestionId});
	}
	return bulkLike;
}

function makeCandidateDummy() {
	const bulkCandidate = [];

	pollDummyData.forEach(elem => {
		if (elem.pollType === 0) {
			for (
				let candadateNumber = 1;
				candadateNumber <= 5;
				candadateNumber++
			) {
				const number = candadateNumber;
				const content = faker.lorem.sentence();
				const createdAt = faker.date.past(1);
				const updatedAt = createdAt;
				const PollId = elem.id;

				bulkCandidate.push({
					number,
					content,
					createdAt,
					updatedAt,
					PollId,
				});
			}
		} else {
			for (
				let candadateNumber = 1;
				candadateNumber <= 2;
				candadateNumber++
			) {
				const number = candadateNumber;
				const content = candadateNumber === 1 ? "O" : "X";
				const createdAt = faker.date.past(1);
				const updatedAt = createdAt;
				const PollId = elem.id;

				bulkCandidate.push({
					number,
					content,
					createdAt,
					updatedAt,
					PollId,
				});
			}
		}
	});
	return bulkCandidate;
}

function makeSelectionDummy(number = 100) {
	const bulkSelection = [];

	for (let i = 0; i < number; ++i) {
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const VoterId = i + 1;
		const CandidateId = faker.random.number({min: 1, max: 694});

		bulkSelection.push({createdAt, updatedAt, VoterId, CandidateId});
	}
	return bulkSelection;
}

function makeEmojiQuestionDummy(number = 100) {
	const bulkEmojiQuestion = [];

	for (let i = 0; i < number; ++i) {
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const GuestId = faker.random.number({min: 1, max: GUEST_NUM});
		const QuestionId = faker.random.number({min: 1, max: 100});
		const EmojiId = faker.random.number({min: 1, max: 50});

		bulkEmojiQuestion.push({
			createdAt,
			updatedAt,
			GuestId,
			QuestionId,
			EmojiId,
		});
	}

	return bulkEmojiQuestion;
}

module.exports = {
	makeHostDummy,
	makeEventDummy,
	makeGuestDummy,
	makePollDummy,
	makeHashTagDummy,
	makeQuestionDummy,
	makeEmojiDummy,
	makeVoterDummy,
	makeReplyDummy,
	makeEmojiQuestionDummy,
	makeLikeDummy,
	makeSelectionDummy,
	makeCandidateDummy,
};
