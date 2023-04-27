import { ChangeEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { supabase } from "../../db";
import { setUser } from "../../redux/slices/auth";

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
        setIsError(false);
        dispatch(setUser(data.user));
        navigate("/rooms");
      }
    } catch (error) {
      setIsError(true);
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
      {isError && <div>Something went wrong</div>}
      <button type="submit" onClick={handleSubmit}>
        Sign in
      </button>
    </div>
  );
};
