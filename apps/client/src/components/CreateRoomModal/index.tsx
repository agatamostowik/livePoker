import { ChangeEvent, useState } from "react";
import _ from "lodash";
import { GameApi } from "../../redux/RTK";
import { useAppSelector } from "../../redux/store";
import { webSocketClient } from "../../webSocket";
import { Modal } from "../Modal";
import { skipToken } from "@reduxjs/toolkit/dist/query";

export const CreateRoomModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const user = useAppSelector((state) => state.app.user);
  const userAccount = GameApi.endpoints.getUserAccount.useQuery(
    user ? user.id : skipToken
  );

  const handleCreateRoom = async () => {
    webSocketClient.emit("createRoom", {
      name: name,
      dealerId: user?.id,
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

  const isPlayer = userAccount.data?.role === "player";

  return (
    <>
      <button onClick={handleOpenModal} disabled={isPlayer}>
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
