import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Game, Round, setGame, setRoom, setRound } from "../redux/slices/app";
import { useEffect } from "react";
import { Room } from "../redux/RTK";

export const useGetRoomOnMount = () => {
  const { roomId } = useParams();
  const dispatch = useAppDispatch();

  const getRoom = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/rooms/${roomId}`);
      const room: Room = await response.json();

      dispatch(setRoom(room));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (roomId) {
      getRoom();
    }
  }, []);
};

export const useGetGameByRoomIdOnMount = () => {
  const dispatch = useAppDispatch();
  const room = useAppSelector((state) => state.app.room);
  const game = useAppSelector((state) => state.app.game);

  const getGame = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/games/find?roomId=${room.id}`
      );
      const game: Game = await response.json();

      dispatch(setGame(game));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!game) {
      getGame();
    }
  }, [room, game]);
};

export const useGetRoundByGameIdOnMount = () => {
  const dispatch = useAppDispatch();
  const room = useAppSelector((state) => state.app.room);
  const game = useAppSelector((state) => state.app.game);
  const round = useAppSelector((state) => state.app.round);

  const getRound = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/rounds/find?gameId=${game?.id}`
      );
      const round: Round = await response.json();

      dispatch(setRound(round));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!round && room && game) {
      getRound();
    }
  }, [round, game]);
};
