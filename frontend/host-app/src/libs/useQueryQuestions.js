import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { JSONNestJoinFromChild, JSONNestJoinFromParent } from "./utils.js";
import _ from "lodash";

function buildQuestions(object) {
    const copyData = _.cloneDeep(object);
    let { questions, emojis, guests } = copyData;

    questions = JSONNestJoinFromChild(
        questions,
        guests,
        "GuestId",
        "id",
        (a, b) => {
            a.guestName = b.name;
            a.isAnonymous = b.isAnonymous;

            return a;
        },
    );

    questions = questions.map(x => {
        x.didILike = false;
        return x;
    });

    emojis = emojis.map(x => {
        x.key = `${x.QuestionId}_${x.name}`;
        x.didIPick = false;
        return x;
    });

    questions = JSONNestJoinFromParent(
        questions,
        emojis,
        "id",
        "QuestionId",
        (a, b) => {
            a.emojis = b;
            return a;
        },
    );

    return questions;
}

const QUERY_INIT_QUESTIONS = gql`
    query getQuestions($EventId: ID!) {
        questions(EventId: $EventId) {
            id
            EventId
            GuestId
            createdAt
            content
            state
            isStared
            likeCount
        }

        emojis(EventId: $EventId) {
            name
            count
            QuestionId
        }

        guests(EventId: $EventId) {
            id
            name
            isAnonymous
        }

        getEventOption(EventId: $EventId) {
            moderationOption
            replyOption
        }
    }
`;

const dummyOptions = {
    variables: { EventId: 2, GuestId: 122 },
};

export default function useQueryQuestions(options = dummyOptions) {
	const { data, loading, error } = useQuery(QUERY_INIT_QUESTIONS, options);
	
    let newData = undefined;
    let newOption = undefined;
    if (data) {
        newOption = data.getEventOption;
        newData = buildQuestions(data);
    }

    return { data: { newData, newOption }, loading, error };
}
