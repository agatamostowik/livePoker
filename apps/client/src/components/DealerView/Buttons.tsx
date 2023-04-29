import _ from "lodash";
import { useAppSelector } from "../../redux/store";
import * as Styled from "./styles";

export const Buttons = () => {
  const round = useAppSelector((state) => state.round.data);

  const AABetSum = _.sum(round?.aa_bet);
  const anteBetSum = _.sum(round?.ante_bet);

  return (
    <Styled.Buttons>
      <Styled.Button>
        AA
        {AABetSum > 0 && (
          <Styled.PlacedBetChip>{AABetSum}</Styled.PlacedBetChip>
        )}
      </Styled.Button>
      <Styled.Button>
        ANTE
        {anteBetSum > 0 && (
          <Styled.PlacedBetChip>{anteBetSum}</Styled.PlacedBetChip>
        )}
      </Styled.Button>
      <Styled.Button>
        Play
        {round?.play_bet && (
          <Styled.PlacedBetChip>{round.play_bet}</Styled.PlacedBetChip>
        )}
      </Styled.Button>
    </Styled.Buttons>
  );
};
