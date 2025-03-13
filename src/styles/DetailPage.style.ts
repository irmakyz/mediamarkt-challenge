import styled from "styled-components";

export const DetailContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.m,
  overflowWrap: "anywhere",
}));

export const IssueTitle = styled.h1(({ theme }) => ({
  fontSize: theme.fontSize.l,
  display: "flex",
  marginBottom: theme.margin.s,
  [theme.media.tablet]: {
    fontSize: theme.fontSize.m,
  },
  [theme.media.mobile]: {
    fontSize: theme.fontSize.m,
  },
}));

export const CommentsContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.m,
}));
