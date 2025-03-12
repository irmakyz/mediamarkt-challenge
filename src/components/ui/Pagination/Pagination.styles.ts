import styled from "styled-components";
import { StyledButtonProps } from "@/components/ui/Button/types";
import { StyledButton } from "@/components/ui/Button/Button.styles";

export const PaginationContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  padding: "16px",
});

export const PageNumber = styled(StyledButton).withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<StyledButtonProps>(
  ({ isActive, theme }) => ({
    background: "transparent",
    ...(isActive && {
      background: theme.colors.scienceBlue,
      color: theme.colors.white,
      fontWeight: theme.fontWeight.bold,
      "&:hover": {
        background: theme.colors.scienceBlue,
      },
    }),
  })
);

export const Ellipsis = styled.span(({ theme }) => ({
  color: theme.colors.textSecondary,
  fontSize: "14px",
  padding: "6px 10px",
  userSelect: "none",
}));
