import { gql } from "@apollo/client";

export const GET_ISSUES = gql`
  query GetIssues($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: ISSUE, first: $first, after: $after) {
      issueCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      nodes {
        ... on Issue {
          title
          number
          comments {
            totalCount
          }
          state
          createdAt
          author {
            login
            avatarUrl
          }
        }
      }
    }
  }
`;
export const GET_ISSUE_AND_COMMENTS = gql`
  query GetIssueAndComments(
    $issueNumber: Int!
    $first: Int
    $last: Int
    $afterCursor: String
    $beforeCursor: String
  ) {
    repository(owner: "facebook", name: "react") {
      issue(number: $issueNumber) {
        id
        number
        title
        bodyHTML
        state
        createdAt
        author {
          login
          avatarUrl
        }
        comments(
          first: $first
          last: $last
          after: $afterCursor
          before: $beforeCursor
        ) {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          nodes {
            id
            bodyHTML
            createdAt
            author {
              login
              avatarUrl
            }
          }
        }
      }
    }
  }
`;
