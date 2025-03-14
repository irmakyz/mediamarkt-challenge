import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  display: "flex",
  gap: theme.spacing.m,
  justifyContent: "center",
  alignItems: "center",
  marginBlock: "auto",
  fontSize: theme.fontSize.l,
  flexDirection: "row",
  color: theme.colors.shuttleGrey,

  [theme.media.mobile]: {
    fontSize: theme.fontSize.s,
    img: {
      width: 50,
      height: 'auto',
    },
  },
}));
