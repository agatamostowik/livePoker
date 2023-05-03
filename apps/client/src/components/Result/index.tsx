import { useAppSelector } from "../../redux/store";
import * as Styled from "./styles";

export const Result = () => {
  const account = useAppSelector((state) => state.auth.account);
  const winner = useAppSelector((state) => state.round.winner);
  const winnerHand = useAppSelector((state) => state.round.winnerHand);

  const isDealer = account?.role === "dealer";
  const isWinner = winner === account?.role;

  return (
    <Styled.Container>
      {isWinner ? (
        isDealer ? (
          <Styled.Title success>Casino Wins</Styled.Title>
        ) : (
          <Styled.Title success>You Win!</Styled.Title>
        )
      ) : isDealer ? (
        <Styled.Title>Player wins</Styled.Title>
      ) : (
        <Styled.Title>Good luck next time!</Styled.Title>
      )}
      <Styled.WinnerHand>Winner hand: {winnerHand}</Styled.WinnerHand>
    </Styled.Container>
  );
};
