import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { SignOut } from "../SignOut";
import * as Styles from "./styles";
import { Button } from "../Button";

export const Topbar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <Styles.Container>
      {user && <Styles.Username>{user.email}</Styles.Username>}
      <Styles.Button>
        <Button disabled={!_.isNull(user)} onClick={handleSignIn}>
          Login
        </Button>
      </Styles.Button>
      <SignOut />
    </Styles.Container>
  );
};
