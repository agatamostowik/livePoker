import { ChangeEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { setUser } from "../../redux/slices/app";
import { supabase } from "../../db";

const signInWithEmail = async (email: string, password: string) => {
  const response = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return response;
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  return error;
};

export const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const { data, error } = await signInWithEmail(email, password);

      if (error) {
        //  TODO: handle error
      }

      if (data.user) {
        dispatch(setUser(data.user));

        navigate("/rooms");
      }
    } catch (error) {
      // TODO: handle error
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
