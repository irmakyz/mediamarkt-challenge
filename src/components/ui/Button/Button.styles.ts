import styled from "styled-components";

export const StyledButton = styled.button(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing.s,
  border: `1px solid ${theme.colors.geyser}`,
  borderRadius: theme.borderRadius,
  cursor: "pointer",
  fontSize: theme.fontSize.s,
  background: theme.colors.aquaHaze,
  transition: "background 0.2s ease-in-out",
  "&:hover": {
    background: theme.colors.grey,
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
}));

export const StyledSelect = styled.select(({ theme }) => ({
  padding: theme.spacing.s,
  borderRadius: theme.borderRadius,
  border: `1px solid ${theme.colors.geyser}`,
  backgroundColor: theme.colors.aquaHaze,
  cursor: "pointer",
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  "&:hover": {
    background: theme.colors.grey,
  },
}));
