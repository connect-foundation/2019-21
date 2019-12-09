import {gql} from "apollo-boost";

export const GET_GUEST_APP_GLOBAL_DATA = gql`
    query {
        guestInEvent {
            event {
                id
                eventCode
                startAt
                endAt
                eventName
                HostId
            }
            guest {
                id
                name
                email
                company
            }
        }
    }
`;
