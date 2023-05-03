import _ from "lodash";
import { useAppSelector } from "../../redux/store";
import { Cards } from "../Cards";
import { Video } from "../Video";
import { useMediaStream, useWebRTC } from "./hooks";
import { Buttons } from "./Buttons";
import { Sidebar } from "../Sidebar";
import * as Styled from "./styles";
import { Result } from "../Result";

const Game = () => {
  const winner = useAppSelector((state) => state.round.winner);
  useWebRTC();

  return (
    <Styled.Game>
      <Styled.Board>
        <Styled.Layer>
          {!_.isNull(winner) && <Result />}
          <Cards />
          <Buttons />
        </Styled.Layer>
      </Styled.Board>
    </Styled.Game>
  );
};

export const DealerView = () => {
  useMediaStream();
  const mediaStream = useAppSelector((state) => state.app.mediaStream);

  return (
    <Styled.Container>
      <Sidebar />
      {mediaStream && (
        <Styled.Wrapper>
          <Video />
          <Game />
        </Styled.Wrapper>
      )}
    </Styled.Container>
  );
};
