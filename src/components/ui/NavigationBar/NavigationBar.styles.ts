import styled from "styled-components";

export const NavBarContainer = styled.nav(({ theme }) => ({
  paddingTop: theme.padding.m,
  backgroundColor: theme.colors.aquaHaze,
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  gap: theme.spacing.l,
  borderBottom: `0.5px solid ${theme.colors.lightGrey}`,
}));

export const NavHeader = styled.div(({ theme }) => ({
  fontSize: theme.fontSize.m,
  color: theme.colors.scienceBlue,
  display: "flex",
  justifyContent: "start",
  paddingInline: "1.5rem",
  alignItems: "center",
  gap: theme.spacing.xs,

  [theme.media.tablet]: {
    fontSize: theme.fontSize.s,
  },
  [theme.media.mobile]: {
    fontSize: theme.fontSize.s,
    flexDirection: "column",
    alignItems: "start",
  },
}));

export const NavActionContainer = styled.nav(({ theme }) => ({
  paddingInline: theme.padding.l,
  display: "flex",
  justifyContent: "start",
}));
