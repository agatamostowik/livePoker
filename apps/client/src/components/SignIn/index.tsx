import { ChangeEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { supabase } from "../../db";
import {
  Account,
  setAccount,
  setIsAuthenticated,
  setUser,
} from "../../redux/slices/auth";
import { Input } from "../Input/Input";
import * as Styled from "./styles";

export const Signin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const signInWithEmail = async (email: string, password: string) => {
    const response = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    return response;
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const { data } = await signInWithEmail(email, password);

      if (data.user) {
        const response = await fetch(
          `http://localhost:3001/api/auth/me?userId=${data.user.id}`
        );
        const account: Account = await response.json();

        setIsError(false);
        dispatch(setUser(data.user));
        dispatch(setAccount(account));
        dispatch(setIsAuthenticated(true));
        navigate("/rooms");
      }
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <Styled.Background>
      <Styled.Container>
        <Styled.InputContainer>
          <Styled.Label>Email</Styled.Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={handleEmail}
            autoFocus={true}
          />
        </Styled.InputContainer>
        <Styled.InputContainer>
          <Styled.Label> Password </Styled.Label>

          <Input
            id="password"
            type="password"
            value={password}
            onChange={handlePassword}
            autoComplete="current-password"
          />
        </Styled.InputContainer>
        {isError && (
          <Styled.ErrorMessage>Something went wrong</Styled.ErrorMessage>
        )}

        <Styled.Button type="submit" onClick={handleSubmit}>
          Sign in
        </Styled.Button>
      </Styled.Container>
    </Styled.Background>
  );
};
