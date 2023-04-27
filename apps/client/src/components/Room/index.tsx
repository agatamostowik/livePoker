import _ from "lodash";
import { useAppSelector } from "../../redux/store";
import { GameApi } from "../../redux/RTK";
import { DealerView } from "../DealerView";
import { PlayerView } from "../PlayerView";
import { useGetInitalDataOnMount } from "../../hooks";
import * as Styled from "./styles";

export const Room = () => {
  const user = useAppSelector((state) => state.app.user);
  const { data } = GameApi.endpoints.getUserAccount.useQuery(user?.id!, {
    skip: _.isNull(user),
  });

  useGetInitalDataOnMount();

  return (
    <Styled.Container>
      {data?.role === "dealer" && <DealerView />}
      {data?.role === "player" && <PlayerView />}
    </Styled.Container>
  );
};
