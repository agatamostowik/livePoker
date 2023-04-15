import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { supabase } from "../Layout";
import { authorize } from "../../redux/slices/app";

const signInWithEmail = async (email: string, password: string) => {
  const response = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return response;
};

export const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("agata@example.com");
  const [password, setPassword] = useState("qwerty");

  const dispatch = useAppDispatch();

  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const response = await signInWithEmail(email, password);

    if (response.data.session && response.data.user) {
      dispatch(
        authorize({
          session: response.data.session,
          user: response.data.user,
        })
      );

      navigate("/rooms");
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleEmail}
        autoFocus={true}
      />
      <input
        type="password"
        value={password}
        onChange={handlePassword}
        autoComplete="current-password"
      />
      <button type="submit" onClick={handleSubmit}>
        Sign in
      </button>
    </div>
  );
};

async function signOut() {
  const { error } = await supabase.auth.signOut();
}
