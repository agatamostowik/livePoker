import _ from "lodash";
import { useAppSelector } from "../../redux/store";
import { StartBettingButton } from "./StartBettingButton";
import { StopBettingButton } from "./StopBettingButton";
import { PlayFlopCardsButton } from "./PlayFlopCardsButton";
import { PlayTurnRiverCardButton } from "./PlayTurnRiverCardButton";
import { EvaluateHandsButton } from "./EvaluateHandsButton";
import { NewRoundButton } from "./NewRoundButton";
import * as Styled from "./styles";

export const Sidebar = () => {
  const videoIsPlaying = useAppSelector((state) => state.app.videoIsPlaying);
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);
  const isPlayerConnected = useAppSelector(
    (state) => state.app.isPlayerConnected
  );

  const numberCardsPlayed = round
    ? round?.dealer_cards?.length +
      round?.player_cards?.length +
      round?.common_cards.length
    : 0;

  return (
    <Styled.Container>
      <Styled.Aside>
        <Styled.Phase>
          Video:{" "}
          {videoIsPlaying ? (
            <Styled.On>ON</Styled.On>
          ) : (
            <Styled.Off>OFF</Styled.Off>
          )}
        </Styled.Phase>
        {game && (
          <Styled.Phase success>Player has started the game.</Styled.Phase>
        )}
        {!game && (
          <Styled.Phase>
            Waiting for the player to start the game...
          </Styled.Phase>
        )}

        {game && round && (
          <Styled.Phase success>Dealer has started the round.</Styled.Phase>
        )}
        {game && !round && (
          <Styled.Phase>
            Waiting for the dealer to start the round...
          </Styled.Phase>
        )}

        {game && round && !round?.bets_over && (
          <Styled.Phase>
            Waiting for the player to finish betting...
          </Styled.Phase>
        )}
        {game && round && round?.bets_over && (
          <Styled.Phase success>
            Dealer has finished accepting bets.
          </Styled.Phase>
        )}

        {game && round && round?.bets_over && numberCardsPlayed < 7 && (
          <Styled.Phase>
            Waiting for the dealer to play flop cards...
          </Styled.Phase>
        )}
        {game && round && round?.bets_over && numberCardsPlayed >= 7 && (
          <Styled.Phase success>
            Dealer has played cards on the flop.
          </Styled.Phase>
        )}

        {game &&
          round &&
          round?.bets_over &&
          numberCardsPlayed >= 7 &&
          !round.play_bet && (
            <Styled.Phase>
              Waiting for the player to play or fold...
            </Styled.Phase>
          )}
        {game && round && round?.bets_over && round.play_bet && (
          <Styled.Phase success>Player has placed a Play bet.</Styled.Phase>
        )}

        {game &&
          round &&
          round?.bets_over &&
          numberCardsPlayed === 7 &&
          round?.play_bet && (
            <Styled.Phase>
              Waiting for the dealer to play Turn and River cards...
            </Styled.Phase>
          )}
        {game &&
          round &&
          round?.bets_over &&
          numberCardsPlayed === 9 &&
          round?.play_bet && (
            <Styled.Phase success>
              Dealer has played Turn and River cards.
            </Styled.Phase>
          )}

        {game &&
          round &&
          round?.bets_over &&
          numberCardsPlayed === 9 &&
          round?.play_bet &&
          !round.round_over && (
            <Styled.Phase>
              Waiting for the dealer to evaluate hands...
            </Styled.Phase>
          )}

        <StartBettingButton />
        <StopBettingButton />
        <PlayFlopCardsButton />
        <PlayTurnRiverCardButton />
        <EvaluateHandsButton />
        <NewRoundButton />
      </Styled.Aside>
    </Styled.Container>
  );
};
