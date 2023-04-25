import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { useAppSelector } from "../../redux/store";
import { CreateRoomModal } from "../CreateRoomModal";
import { GameApi } from "../../redux/RTK";

export const Rooms = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.app.user);
  const { data, isSuccess } = GameApi.endpoints.getRooms.useQuery();

  if (!isSuccess) {
    return <div>LOADING ROOMS</div>;
  }

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleJoinRoom = async (roomId: string) => {
    navigate(`/rooms/${roomId}`);
  };

  return (
    <div>
      {user && (
        <div>
          <div>{user.email}</div>
        </div>
      )}
      <div></div>
      {_.isEmpty(data) ? (
        <div>Poczekaj na stworzenie pokoju przez Dealera</div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Game name</th>
                <th>Dealer</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((room, index) => {
                return (
                  <tr key={index}>
                    <td>{room.name}</td>
                    <td>{room.dealer_id}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleJoinRoom(room.id);
                        }}
                      >
                        Join
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <button disabled={!_.isNull(user)} onClick={handleSignIn}>
        Login
      </button>
      <CreateRoomModal />
    </div>
  );
};
