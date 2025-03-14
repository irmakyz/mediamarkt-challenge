import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x:hidden;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    font-family: inherit;
  }
  #__next {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 100vh;
  }
  main {
    display:flex;
    flex-direction:column;
    flex: 1;
  }
`;

export default GlobalStyles;
