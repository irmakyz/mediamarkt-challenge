import styled from "styled-components";

export const DropdownContainer = styled.div(() => ({
  position: "relative",
  display: "inline-block",
}));

export const DropdownButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ theme }) => ({
  background: theme.colors.white,
  border: `1px solid ${theme.colors.geyser}`,
  padding: theme.padding.s,
  borderRadius: theme.borderRadius,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.s,
  transition: "background 0.2s ease-in-out",

  "&:hover": {
    backgroundColor: theme.colors.grey,
  },
}));

export const DropdownMenu = styled.div(({ theme }) => ({
  position: "absolute",
  top: "100%",
  right: 0,
  background: theme.colors.white,
  border: `1px solid ${theme.colors.geyser}`,
  borderRadius: "6px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  width: "120px",
  padding: "4px 0",
  zIndex: 10,
  [theme.media.mobile]: {
    left: 0,
  },
}));

export const DropdownItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  padding: "8px 12px",
  cursor: "pointer",
  fontSize: "14px",

  "&:hover": {
    background: theme.colors.grey,
  },
  ...(isActive && {
    color: theme.colors.white,
    background: theme.colors.scienceBlue,
    "&:hover": {
      background: theme.colors.scienceBlue,
    },
  }),
}));
