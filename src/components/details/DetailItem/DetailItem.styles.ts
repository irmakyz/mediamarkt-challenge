import styled from "styled-components";

export const DetailItemContainer = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing.s,
  boxSizing: "border-box",
  overflow: "hidden",
  [theme.media.mobile]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const AvatarContainer = styled.div(({ theme }) => ({
  marginRight: theme.margin.m,
  img: {
    borderRadius: "50%",
  },
  [theme.media.mobile]: {
    marginRight: 0,
  },
}));

export const DetailContainer = styled.div(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  fontSize: theme.fontSize.xxs,
  border: `1px solid ${theme.colors.geyser}`,
  borderRadius: theme.borderRadius,
  maxWidth: "80%",
  minWidth: 87,
}));

export const DetailHeader = styled.div(({ theme }) => ({
  marginBottom: theme.margin.s,
  fontSize: theme.fontSize.xs,
  display: "flex",
  gap: theme.spacing.s,
  borderRadius: 6,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderBottom: `1px solid ${theme.colors.geyser}`,
  backgroundColor: theme.backgroundColor,
  padding: theme.padding.m,

  [theme.media.mobile]: {
    flexDirection: "column",
    fontSize: theme.fontSize.xxs,
  },
}));

export const DetailBody = styled.div(({ theme }) => ({
  fontSize: theme.fontSize.xxs,
  lineHeight: 1.5,
  wordWrap: "break-word",
  padding: theme.padding.xl,
  overflowWrap: "break-word",
  [theme.media.mobile]: {
    fontSize: theme.fontSize.xxxs,
    padding: theme.padding.m,
  },
  "& *": {
    maxWidth: "100%",
    textWrap: "wrap",
  },
}));
