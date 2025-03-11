import styled from "styled-components";

export const TabContainer = styled.div(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  fontSize: theme.fontSize.xs,
  fontWeight: theme.fontWeight.bold,
  position: "relative",
  padding: theme.padding.xs,
  marginBottom: theme.margin.s,
  gap: theme.spacing.xs,
  ":after": {
    content: "''",
    position: "absolute",
    bottom: "calc(50% - 1.5rem)",
    left: 0,
    width: "100%",
    height: "2px",
    background: theme.colors.salmon,
  },
  "&:hover": {
    background: theme.colors.regentGrey,
    borderRadius: theme.borderRadius,
  },
}));
