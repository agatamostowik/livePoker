import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  border: 1px solid red;
  margin-top: 50px;
`;

export const Head = styled.div`
  display: flex;
  border-bottom: 1px solid red;
`;

export const Body = styled.div``;

export const Row = styled.div`
  display: flex;
  border-bottom: 1px solid red;

  &:last-child {
    border-bottom: none;
  }
`;

export const Cell = styled.div`
  display: flex;
  flex: 1;
  border-right: 1px solid red;

  &:last-child {
    border-right: none;
  }
`;
