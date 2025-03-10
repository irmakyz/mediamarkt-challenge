import styled from "styled-components";

export const BannerContainer = styled.header(({ theme }) => ({
  backgroundColor: theme.colors.azure,
  color: "white",
  padding: theme.padding.m,
  display: "flex",
  justifyContent: "start",
}));
