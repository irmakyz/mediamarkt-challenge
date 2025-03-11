import styled from "styled-components";

export const IssueContainer = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateAreas: `
    "status header comments"
    "status detail comments"
  `,
  gridTemplateColumns: "auto 1fr auto",
  columnGap: theme.spacing.m,
  rowGap: theme.spacing.xs,
  alignItems: "center",
  justifyContent: "space-between",
  border: `1px solid ${theme.colors.geyser}`,
  padding: theme.padding.s,
  marginBottom: theme.margin.s,
  fontSize: theme.fontSize.xs,
  position: "relative",

  "&:hover": {
    backgroundColor: theme.backgroundColor,
    "& > *": {
      backgroundColor: "inherit",
    },
  },
  [theme.media.mobile]: {
    gridTemplateAreas: `
      "status header"
      "status detail"
      "status comments"
    `,
    gridTemplateColumns: "auto 1fr",
  },
}));

export const IssueStatus = styled.div(() => ({
  gridArea: "status",
}));

export const IssueTitle = styled.span(({ theme }) => ({
  fontWeight: theme.fontWeight.bold,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
    color: theme.colors.scienceBlue,
  },
}));

export const IssueDetail = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.m,
  color: theme.colors.shuttleGrey,
  gridArea: "detail",
  fontSize: theme.fontSize.xxs,
}));

export const Comments = styled.div(({ theme }) => ({
  gridArea: "comments",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.xs,
  color: theme.colors.shuttleGrey,
}));

export const IssueHeader = styled.div(() => ({
  gridArea: "header",
}));
