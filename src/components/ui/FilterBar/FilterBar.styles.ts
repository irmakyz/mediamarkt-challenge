import styled from "styled-components";
import { StyledButton } from "../Button/Button.styles";

export const FilterContainer = styled.div(({ theme }) => ({
  display: "flex",
  gap: theme.spacing.m,
  marginBottom: theme.margin.m,
  backgroundColor: "transparent",
  [theme.media.mobile]: {
    flexDirection: "column",
  },
}));

export const SearchInput = styled.input(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.s,
  border: "none",
  outline: "none",
  fontSize: theme.fontSize.xs,
  backgroundColor: "transparent",
  width: "100%",
}));

export const SearchContainer = styled.div(({ theme }) => ({
  border: `1px solid ${theme.colors.geyser}`,
  gap: theme.spacing.s,
  borderRadius: theme.borderRadius,
  display: "flex",
  flex: 1,
}));

export const SearchButton = styled(StyledButton)(({ theme }) => ({
  borderLeft: `1px solid ${theme.colors.geyser}`,
  borderRadius: 0,
  borderTopRightRadius: theme.borderRadius,
  borderBottomRightRadius: theme.borderRadius,
  width: 40,
}));
