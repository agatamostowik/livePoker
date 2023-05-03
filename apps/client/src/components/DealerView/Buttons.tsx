import _ from "lodash";
import { useAppSelector } from "../../redux/store";
import * as Styled from "./styles";
import { Chip } from "../Chip";

export const Buttons = () => {
  const round = useAppSelector((state) => state.round.data);

  const AABetSum = _.sum(round?.aa_bet);
  const anteBetSum = _.sum(round?.ante_bet);

  return (
    <Styled.Buttons>
      <Styled.Button>
        AA
        {AABetSum > 0 && (
          <Styled.Chip>
            <Chip value={25} />
            <Styled.ChipValue>{AABetSum}</Styled.ChipValue>
          </Styled.Chip>
        )}
      </Styled.Button>
      <Styled.Button>
        ANTE
        {anteBetSum > 0 && (
          <Styled.Chip>
            <Chip value={5} />
            <Styled.ChipValue>{anteBetSum}</Styled.ChipValue>
          </Styled.Chip>
        )}
      </Styled.Button>
      <Styled.Button>
        Play
        {round?.play_bet && (
          <Styled.Chip>
            <Chip value={500} />
            <Styled.ChipValue>{round.play_bet}</Styled.ChipValue>
          </Styled.Chip>
        )}
      </Styled.Button>
    </Styled.Buttons>
  );
};
