import styled, { css } from "styled-components";

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(23, 22, 20, 0.3);
  padding: 50px;
  border-radius: 10px;
  border: 1px solid #ffffff;
  align-items: center;
`;

export const Title = styled.div<{ success?: boolean }>`
  font-size: 32px;
  color: #be2d30;
  font-weight: bold;

  ${(props) => {
    if (props.success) {
      return css`
        color: #2dbe5b;
      `;
    }
  }}
`;

export const WinnerHand = styled.div`
  color: #ffffff;
  font-size: 20px;
`;
