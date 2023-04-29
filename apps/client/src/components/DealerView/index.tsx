import _ from "lodash";
import { useAppSelector } from "../../redux/store";
import { Cards } from "../Cards";
import { Video } from "../Video";
import { useMediaStream, useWebRTC } from "./hooks";
import { Sidebar } from "./Sidebar";
import * as Styled from "./styles";

const Buttons = () => {
  const round = useAppSelector((state) => state.round.data);

  const AABetSum = _.sum(round?.aa_bet);
  const anteBetSum = _.sum(round?.ante_bet);

  return (
    <Styled.Buttons>
      <Styled.AAButton>
        AA
        {AABetSum > 0 && (
          <Styled.PlacedBetChip>{AABetSum}</Styled.PlacedBetChip>
        )}
      </Styled.AAButton>
      <Styled.AnteButton>
        ANTE
        {anteBetSum > 0 && (
          <Styled.PlacedBetChip>{anteBetSum}</Styled.PlacedBetChip>
        )}
      </Styled.AnteButton>
      <Styled.PlayButton>
        Play
        {round?.play_bet && (
          <Styled.PlacedBetChip>{round.play_bet}</Styled.PlacedBetChip>
        )}
      </Styled.PlayButton>
    </Styled.Buttons>
  );
};

const Game = () => {
  useWebRTC();

  return (
    <Styled.Game>
      <Styled.Board>
        <Cards />
        <Buttons />
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
