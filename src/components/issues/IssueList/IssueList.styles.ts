import styled from "styled-components";

export const ListContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.m,
  border: `1px solid ${theme.colors.geyser}`,
  borderRadius: theme.borderRadius,
}));
