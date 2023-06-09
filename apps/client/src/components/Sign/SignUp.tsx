import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
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
import _ from "lodash";
import { getUrl } from "../../hooks";

const isEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// This page is shut down for the presentation
export const SignUp = () => {
  const url = getUrl();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    navigate("/signin");
  }, []);

  const signUpWithEmail = async (email: string, password: string) => {
    return await supabase.auth.signUp({
      email,
      password,
    });
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
      const { data, error } = await signUpWithEmail(email, password);

      if (error) {
        setIsError(true);
      }

      if (data.user) {
        const response = await fetch(
          `${url}/api/auth/me?userId=${data.user.id}`
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

  const isDisabled = _.isEmpty(email) || _.isEmpty(password) || !isEmail(email);

  return (
    <Styled.Background>
      <Styled.Container>
        <Styled.Title>Registration</Styled.Title>
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
        <Styled.Button
          type="submit"
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          Sign up
        </Styled.Button>
      </Styled.Container>
    </Styled.Background>
  );
};
