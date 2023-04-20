import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { GameApi } from "../../redux/RTK";
import { useAppSelector } from "../../redux/store";
import { webSocketClient } from "../../webSocket";
import { Modal } from "../Modal";

export const CreateRoomModal = () => {
  const navigate = useNavigate();
  const [createRoom] = GameApi.endpoints.createRoom.useMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const user = useAppSelector((state) => state.app.user);
  const userAccount = GameApi.endpoints.getUserAccount.useQuery(user?.id!, {
    skip: _.isNull(user),
  });

  const handleCreateRoom = async () => {
    webSocketClient.emit("createRoom", {
      name: name,
      dealer_id: user?.id,
    });

    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        disabled={userAccount.data?.role === "player"}
      >
        Create room
      </button>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div>
            <div>
              <label>Room name:</label>
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
