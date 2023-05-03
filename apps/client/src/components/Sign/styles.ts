import styled from "styled-components";

const url = new URL(`/src/assets//23885640_1522022_05.jpg`, import.meta.url)
  .href;

export const Background = styled.div`
  height: 100vh;
  background-color: black;
  background-image: url(${url});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: rgba(23, 22, 20, 0.95);
  width: 500px;
  padding: 100px;
  border: 1px solid #f2f3f338;
  border-radius: 8px;
`;

export const Label = styled.label`
  color: #d0d1d6;
  margin-bottom: 4px;
  font-size: 14px;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  background-color: #4b24a1;
  border-radius: 5px;
  border-style: none;
  color: rgb(214, 216, 216);
  cursor: pointer;
  font-size: 15px;
  padding: 11px;
  transition: all 0.4s ease;

  &:hover {
    background-color: #523590;
  }

  &:disabled {
    background-color: #f2f3f338;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  font-size: 13px;
  color: #ca142d;
`;

export const Title = styled.div`
  color: #ffffff;
  text-align: center;
  font-size: 28px;
  font-weight: 100;
`;
