import _ from "lodash";
import { useAppSelector } from "../../redux/store";
import { SignOut } from "../Sign/SignOut";
import * as Styles from "./styles";

export const Topbar = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Styles.Container>
      {user && <Styles.Username>{user.email}</Styles.Username>}
      <SignOut />
    </Styles.Container>
  );
};
