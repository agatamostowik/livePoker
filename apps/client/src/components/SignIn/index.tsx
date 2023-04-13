import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { toggleIsAuthenticated } from "../../redux/slices/app";
import { AuthApi } from "../../redux/RTK";

export const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("example@example.com");
  const [password, setPassword] = useState("qwerty");
  const [signIn, { isLoading }] = AuthApi.endpoints.signIn.useMutation();
  const isAuthenticated = useAppSelector((state) => state.app.isAuthenticated);
  const dispatch = useAppDispatch();

  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      // Try logging in
      const user = await signIn({ email, password });

      // If user exists in the database save the isAuthenticated flag in redux store
      dispatch(toggleIsAuthenticated(true));

      // Navigate to /rooms route
      if (user) {
        navigate("/rooms");
      }
    } catch (e) {
      // TODO: ERROR HANDLING
      console.log(e);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/rooms" replace={true} />;
  }

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleEmail}
        autoFocus={true}
        disabled={isLoading}
      />
      <input
        type="password"
        value={password}
        onChange={handlePassword}
        autoComplete="current-password"
        disabled={isLoading}
      />
      <button type="submit" onClick={handleSubmit} disabled={isLoading}>
        Sign in
      </button>
    </div>
  );
};
