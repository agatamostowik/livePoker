import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { SignOut } from "../SignOut";
import * as Styles from "./styles";

export const Topbar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <Styles.Container>
      {user && (
        <div>
          <div>{user.email}</div>
        </div>
      )}
      <button disabled={!_.isNull(user)} onClick={handleSignIn}>
        Login
      </button>
      <SignOut />
    </Styles.Container>
  );
};
