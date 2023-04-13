import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body, #root{
    height: 100%;
    width: 100%;
  }

  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color:inherit;
    text-decoration: none;
  }

  h1 {
    margin: 0;
  }
`;
