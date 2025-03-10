import styled from "styled-components";

export const NavBarContainer = styled.div(({ theme }) => ({
  paddingTop: theme.padding.m,
  backgroundColor: theme.colors.aquaHaze,
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  gap: theme.spacing.m,
  borderBottom: `0.5px solid ${theme.colors.lightGrey}`,
}));

export const NavHeader = styled.div(({ theme }) => ({
  fontSize: theme.fontSize.m,
  color: theme.colors.scienceBlue,
  display: "flex",
  justifyContent: "start",
  paddingInline: theme.padding.m,
  alignItems: "center",
  gap: theme.spacing.xs,

  [theme.media.tablet]: {
    fontSize: theme.fontSize.s,
  },
}));

export const NavActionContainer = styled.nav(({ theme }) => ({
  paddingInline: theme.padding.l,
  display: "flex",
  justifyContent: "start",
}));
