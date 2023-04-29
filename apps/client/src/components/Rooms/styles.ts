import styled from "styled-components";

const url = new URL(
  // `/src/assets/dark-aesthetic-filigree-1hukfbnbr2rf15p5.jpg`,

  `/src/assets//23885640_1522022_05.jpg`,
  import.meta.url
).href;

export const Background = styled.div`
  height: 100vh;
  background-color: black;
  background-image: url(${url});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
`;
