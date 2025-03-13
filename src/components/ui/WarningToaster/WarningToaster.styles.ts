import styled from "styled-components";

export const WarningContainer = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.lightBlue,
  border: `1px solid ${theme.colors.borderBlue}`,
  padding: theme.padding.m,
  display: "flex",
  justifyContent: "start",
  gap: theme.spacing.s,
  fontSize: theme.fontSize.xxs,
  svg: {
    color: theme.colors.accentBlue,
  },
  margin: theme.margin.s,
  borderRadius: theme.borderRadius,
}));
