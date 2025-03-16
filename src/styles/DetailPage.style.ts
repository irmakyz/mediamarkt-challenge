import { StyledButton } from "@/components/ui/Button/Button.styles";
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

export const LoadMoreButton = styled(StyledButton)({
  alignSelf: "center",
});

export const IssueState = styled.span<{ $state: string }>(
  ({ theme, $state }) => ({
    padding: "6px 12px",
    borderRadius: 100,
    backgroundColor: "green",
    fontWeight: theme.fontWeight.bold,
    width: "fit-content",
    marginBottom: theme.margin.s,
    maxWidth: "100%",
    color: theme.colors.white,
    ...($state === "CLOSED" && {
      backgroundColor: "red",
    }),
  })
);
