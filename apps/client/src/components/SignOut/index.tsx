import _ from "lodash";
import { supabase } from "../../db";
import { useAppSelector } from "../../redux/store";

export const SignOut = () => {
  const user = useAppSelector((state) => state.app.user);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    return error;
  };

  const isDisabled = !_.isNull(user);

  return (
    <button disabled={isDisabled} onClick={signOut}>
      Sign out
    </button>
  );
};
