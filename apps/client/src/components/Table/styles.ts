import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  color: #ffffff;
  flex: 1;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Head = styled.div`
  display: flex;
  border-bottom: 1px solid red;
`;

export const Body = styled.div``;

export const Table = styled.div`
  background-color: rgba(23, 22, 20, 0.95);
  border-radius: 8px;
  border: 1px solid #f2f3f338;
  display: flex;
  flex-direction: column;
  gap: 26px;
  max-width: 500px;
  padding: 47px;
  width: 100%;
`;

export const Row = styled.div<{ occupied: boolean }>`
  display: flex;
  border-radius: 10px;
  background-color: #292724;

  &:last-child {
    border-bottom: none;
  }

  ${(props) => {
    if (props.occupied) {
      return css`
        opacity: 0.3;
        cursor: not-allowed;
      `;
    }
  }}
`;

export const Cell = styled.div`
  display: flex;
  flex: 1 1 0%;

  padding: 7px;
  align-items: center;

  &:last-child {
    justify-content: flex-end;
  }
`;

export const Button = styled.div`
  max-width: 200px;
`;

export const Title = styled.h2`
  margin: 0;
`;
