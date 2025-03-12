import styled from "styled-components";

export const ListContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  border: `1px solid ${theme.colors.geyser}`,
  borderRadius: theme.borderRadius,
  "& > *:not(:last-child)": {
    borderBottom: `1px solid ${theme.colors.geyser}`,
  },
}));
