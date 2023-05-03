import _ from "lodash";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { Game, setGame } from "../redux/slices/game";
import { Room, setRoom } from "../redux/slices/room";
import { Round, setRound } from "../redux/slices/round";
import { setError, setIsRoomsLoading, setRooms } from "../redux/slices/rooms";
import {
  Account,
  setAccount,
  setIsAuthenticated,
  setUser,
} from "../redux/slices/auth";
import { supabase } from "../db";

export const getUrl = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return "http://localhost:3001";
  } else {
    return "https://livepokerbe-production.up.railway.app";
  }
};

export const useGetInitalDataOnMount = () => {
  const { roomId } = useParams();
  const dispatch = useAppDispatch();

  const getData = async () => {
    try {
      const url = getUrl();
      const response = await fetch(`${url}/api/rooms/${roomId}`);
      const room: Room = await response.json();
      dispatch(setRoom(room));

      if (room?.id) {
        const response = await fetch(
          `${url}/api/games/find?roomId=${room?.id}`
        );
        const game: Game = await response.json();
        dispatch(setGame(game));

        if (game?.id) {
          const response = await fetch(
            `${url}/api/rounds/find?gameId=${game?.id}`
          );
          const round: Round = await response.json();
          dispatch(setRound(round));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (roomId) {
      getData();
    }
  }, []);
};

export const useGetRooms = () => {
  const dispatch = useAppDispatch();

  const getRooms = async () => {
    dispatch(setIsRoomsLoading(true));
    try {
      const url = getUrl();
      const response = await fetch(`${url}/api/rooms`);
      const room: Room[] = await response.json();

      dispatch(setRooms(room));
    } catch (error) {
      dispatch(setError(error as Error));
    }
    dispatch(setIsRoomsLoading(false));
  };

  useEffect(() => {
    getRooms();
  }, []);
};

export const useCheckUser = () => {
  const url = getUrl();
  const dispatch = useAppDispatch();

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      const response = await fetch(`${url}/api/auth/me?userId=${data.user.id}`);
      const account: Account = await response.json();

      dispatch(setUser(data.user));
      dispatch(setAccount(account));
      dispatch(setIsAuthenticated(true));

      return { user: data.user, account: account };
    } else {
      return null;
    }
  };

  return { checkUser };
};
