import styled from "styled-components";

export const ListContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  border: `1px solid ${theme.colors.geyser}`,
  borderRadius: theme.borderRadius,
  "& > *:not(:last-child)": {
    borderBottom: `1px solid ${theme.colors.geyser}`,
  },
}));

export const NoIssueContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.padding.l,
  fontSize: theme.fontSize.m,
  gap: theme.spacing.s,
  "& *": {
    textAlign: "center",
  },
  [theme.media.mobile]: {
    fontSize: theme.fontSize.xs,
  },
  p: {
    color: theme.colors.shuttleGrey,
    fontSize: theme.fontSize.xs,
    [theme.media.mobile]: {
      fontSize: theme.fontSize.xxs,
    },
  },
}));
