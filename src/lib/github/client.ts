import { GraphQLClient } from "graphql-request";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export function createGitHubClient(token: string): GraphQLClient {
  return new GraphQLClient(GITHUB_GRAPHQL_API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
