import { useNavigate } from "react-router-dom";
import { GameApi } from "../../redux/RTK";
import { useState } from "react";
import { Modal } from "../Modal";
import { useAppSelector } from "../../redux/store";

const CreateRoomButton = () => {
  const navigate = useNavigate();
  const [createRoom] = GameApi.endpoints.createRoom.useMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name] = useState("Agata's Room");
  const [dealer] = useState("Agata Mostowik");

  const handleCreateRoom = async () => {
    try {
      const room = await createRoom({
        name: name,
        dealer: dealer,
      }).unwrap();

      if (room) {
        navigate(`/rooms/${room.id}`);
      }
    } catch (error) {
      // TODO: handle error when room is created
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNameChange = () => {};

  return (
    <>
      <button onClick={handleOpenModal}>Create room</button>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div>
            <div>
              <label>Game name:</label>
              <input type="text" value={name} onChange={handleNameChange} />
            </div>

            <button onClick={handleCloseModal}>Cancel</button>
            <button onClick={handleCreateRoom}>Create Room</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export const Rooms = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.app.user);

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div>
      {user && <div>{user.email}</div>}
      <table>
        <thead>
          <tr>
            <th>Game name</th>
            <th>Dealer</th>
            <th>Bids</th>
            <th>Players</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Poker Game!</td>
            <td>Agata Mostowik</td>
            <td>10$/20$</td>
            <td>2 / 6</td>
            <td>
              <button>Join</button>
            </td>
          </tr>
        </tbody>
      </table>

      <button onClick={handleSignIn}>Login</button>
      <CreateRoomButton />
    </div>
  );
};
