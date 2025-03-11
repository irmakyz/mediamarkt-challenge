import styled from "styled-components";

export const FilterContainer = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.m,
  padding: theme.padding.s,
  backgroundColor: 'transparent',
  borderRadius: theme.borderRadius,
  border: `1px solid ${theme.colors.geyser}`,
}));

export const SearchInput = styled.input(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.s,
  border: "none",
  outline: "none",
  fontSize: theme.fontSize.s,
  backgroundColor: "transparent",
}));
