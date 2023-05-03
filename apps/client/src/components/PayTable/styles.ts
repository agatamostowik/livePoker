import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border: 1px solid #f2f3f338;
`;

export const Thead = styled.thead`
  border: 1px solid #f2f3f338;
  background-color: #f2f3f338;
`;

export const Title = styled.div`
  padding: 10px 0;
  text-align: center;
`;

export const Th = styled.th`
  flex: 1;
  padding: 3px 10px;

  &:first-child {
    text-align: left;
  }
  &:last-child {
    text-align: right;
  }
`;

export const Td = styled.td`
  flex: 1;
  border: 1px solid #f2f3f338;
  padding: 3px 10px;

  &:first-child {
    text-align: left;
  }
  &:last-child {
    text-align: right;
  }
`;

export const Button = styled.button`
  background-color: rgba(23, 22, 20, 0.3);
  border-radius: 10px;
  border: 1px solid #ffffff;
  color: #ffffff;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
`;
