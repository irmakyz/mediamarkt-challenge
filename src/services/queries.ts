import { gql } from "@apollo/client";

export const GET_ISSUES = gql`
  query GetIssues($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: ISSUE, first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ... on Issue {
          id
          title
          url
          state
          author {
            login
          }
          createdAt
        }
      }
    }
  }
`;

export const GET_ISSUE_DETAILS = gql`
  query GetIssueDetails(
    $owner: String!
    $name: String!
    $issueNumber: Int!
    $commentsFirst: Int!
    $commentsAfter: String
    $commentsLast: Int!
    $commentsBefore: String
  ) {
    repository(owner: $owner, name: $name) {
      issue(number: $issueNumber) {
        title
        body
        comments(first: $commentsFirst, after: $commentsAfter) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            body
            author {
              login
            }
            createdAt
          }
        }
        lastComments: comments(last: $commentsLast, before: $commentsBefore) {
          pageInfo {
            startCursor
            hasPreviousPage
          }
          nodes {
            body
            author {
              login
            }
            createdAt
          }
        }
      }
    }
  }
`;
