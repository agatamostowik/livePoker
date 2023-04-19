import _ from "lodash";
import { useAppSelector } from "../../redux/store";
import { GameApi } from "../../redux/RTK";
import { DealerView } from "../DealerView";
import { PlayerView } from "../PlayerView";
import * as Styled from "./styles";

export const Room = () => {
  const user = useAppSelector((state) => state.app.user);
  const { data, isLoading } = GameApi.endpoints.getUserAccount.useQuery(
    user?.id!,
    {
      skip: _.isNull(user),
    }
  );

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <Styled.Container>
      {data?.role === "dealer" ? <DealerView /> : <PlayerView />}
    </Styled.Container>
  );
};
