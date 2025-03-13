import styled from "styled-components";
import { StyledButtonProps } from "./types";

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "variant",
})<StyledButtonProps>(({ theme, variant }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing.s,
  border: `1px solid ${theme.colors.geyser}`,

  ...(variant === "filled" && {
    border: "none",
  }),

  borderRadius: theme.borderRadius,
  cursor: "pointer",
  fontSize: theme.fontSize.xxs,
  background: theme.colors.aquaHaze,
  transition: "background 0.2s ease-in-out",

  "&:hover": {
    background: theme.colors.grey,
  },

  ...(variant === "icon" && {
    border: "none",
    background: "transparent",
    padding: 0,
    "&:hover": {
      background: "transparent",
    },
  }),

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
}));