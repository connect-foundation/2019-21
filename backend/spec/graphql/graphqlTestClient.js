import {GraphQLClient} from "graphql-request";

const endpoint = "http://localhost:8000/graphql";

export default new GraphQLClient(endpoint, {headers: {}});

