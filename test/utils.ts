import { getSdk } from "./sdk";
import { GraphQLClient } from "graphql-request";

const HOST = 'http://localhost:4000';

export function getGqlSDK(token = '') {

    return getSdk(new GraphQLClient(HOST, {
        headers: {
            Authorization: token,
        }
    }));
}