import faker from "faker";
import moment from "moment";
import pollDummyData from "./pollDummyData.js";

faker.seed(1234);

const EVENT_NUM = 5;
const GUEST_NUM = 200;
const POLL_NUM = 100;
// const POLL_TYPE_NUM = 2; // 0: N지선다(text), 1: N지선다(date), 2: 별점매기기

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

function makePollDummy(number = POLL_NUM) {
	const bulkPoll = [];

	for (let i = 1; i <= number; ++i) {
		const name = faker.lorem.sentence();
		// 0: N지선다(text), 1: N지선다(date), 2: 별점매기기
		const pollType = i % 3;
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

function makeVoteDummy(number = 100) {
	const bulkVoter = [];

	for (let i = 0; i < number; ++i) {
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const GuestId = faker.random.number({min: 1, max: GUEST_NUM});
		const CandidateId = faker.random.number({min: 1, max: 10});

		bulkVoter.push({createdAt, updatedAt, GuestId, CandidateId});
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

function makeCandadateDummy(number = POLL_NUM) {
	// const dummy = require("./dummy");
	const bulkCandidate = [];
	const numberOfCandidates = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // index: 0 ~ 9

	for (let index = 1; index <= POLL_NUM; index++) {
		// 0: N지선다(text), 1: N지선다(date), 2: 별점매기기
		if (index % 3 === 0) {
			const LIMIT =
				numberOfCandidates[faker.random.number({min: 0, max: 9})];

			for (
				let candadateNumber = 1;
				candadateNumber <= LIMIT;
				candadateNumber++
			) {
				const number = candadateNumber;
				const content = faker.lorem.sentence();
				const createdAt = faker.date.past(1);
				const updatedAt = createdAt;
				const PollId = index;

				bulkCandidate.push({
					number,
					content,
					createdAt,
					updatedAt,
					PollId,
				});
			}
		} else if (index % 3 === 1) {
			const LIMIT =
				numberOfCandidates[faker.random.number({min: 0, max: 9})];

			for (
				let candadateNumber = 1;
				candadateNumber <= LIMIT;
				candadateNumber++
			) {
				const number = candadateNumber;
				const content = faker.date.between("1900-01-01", "2999-12-31");
				const createdAt = faker.date.past(1);
				const updatedAt = createdAt;
				const PollId = index;

				bulkCandidate.push({
					number,
					content,
					createdAt,
					updatedAt,
					PollId,
				});
			}
		} else {
			const LIMIT = faker.random.number({min: 2, max: 10});

			for (
				let candadateNumber = 1;
				candadateNumber <= LIMIT;
				candadateNumber++
			) {
				const number = candadateNumber;
				const content = candadateNumber.toString();
				const createdAt = faker.date.past(1);
				const updatedAt = createdAt;
				const PollId = index;

				bulkCandidate.push({
					number,
					content,
					createdAt,
					updatedAt,
					PollId,
				});
			}
		}
	}
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
	makeVoteDummy,
	makeReplyDummy,
	makeEmojiQuestionDummy,
	makeLikeDummy,
	makeSelectionDummy,
	makeCandidateDummy,
};
