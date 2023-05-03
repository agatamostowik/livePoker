import _ from "lodash";
import { ChangeEvent, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { webSocketClient } from "../../webSocket";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { Input } from "../Input/Input";
import * as Styled from "./styles";

export const CreateRoomModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const account = useAppSelector((state) => state.auth.account);

  const handleCreateRoom = async () => {
    webSocketClient.emit("MESSAGE", {
      type: "CREATE_ROOM",
      payload: {
        name: name,
        dealerId: account?.id,
      },
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

  const isPlayer = account?.role === "player";

  return (
    <>
      <Button onClick={handleOpenModal} disabled={isPlayer}>
        Create room
      </Button>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <Styled.Container>
            <Styled.Input>
              <Styled.Label>Room name:</Styled.Label>
              <Input type="text" value={name} onChange={handleNameChange} />
            </Styled.Input>
            <Styled.ButtonsContainer>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button onClick={handleCreateRoom}>Create Room</Button>
            </Styled.ButtonsContainer>
          </Styled.Container>
        </Modal>
      )}
    </>
  );
};
