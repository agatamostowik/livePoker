import _ from "lodash";
import { supabase } from "../../db";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { resetAuthState } from "../../redux/slices/auth";
import * as Styles from "./styles";

export const SignOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    dispatch(resetAuthState());
    navigate("/");
    return error;
  };

  return (
    <Styles.Button disabled={!isAuthenticated} onClick={signOut}>
      Sign out
    </Styles.Button>
  );
};
