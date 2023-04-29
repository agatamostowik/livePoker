import _ from "lodash";
import { useAppSelector } from "../../redux/store";
import { DealerView } from "../DealerView";
import { PlayerView } from "../PlayerView";
import { useGetInitalDataOnMount } from "../../hooks";
import * as Styled from "./styles";

export const Room = () => {
  const account = useAppSelector((state) => state.auth.account);

  useGetInitalDataOnMount();

  return (
    <Styled.Container>
      {account?.role === "dealer" && <DealerView />}
      {account?.role === "player" && <PlayerView />}
    </Styled.Container>
  );
};
