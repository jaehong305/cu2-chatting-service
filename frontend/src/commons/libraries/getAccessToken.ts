import { gql } from '@apollo/client';
import { GraphQLClient } from 'graphql-request';
import { backendURL } from '../config/config';

const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken
  }
`;

export async function getAccessToken() {
  try {
    const graphqlClient = new GraphQLClient(`${backendURL}/graphql`, {
      credentials: 'include',
    });
    const result = await graphqlClient.request(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken;
    return newAccessToken;
  } catch (error) {
    // console.log(error.message);
  }
}
