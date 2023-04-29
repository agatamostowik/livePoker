import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { CreateRoomModal } from "../CreateRoomModal";
import { Button } from "../Button";
import * as Styles from "./styles";
import { useAppSelector } from "../../redux/store";
import { useGetRooms } from "../../hooks";

const Row = (props: {
  occupied?: boolean;
  room: { id: string; name: string };
}) => {
  const { room, occupied = false } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/rooms/${room.id}`);
  };

  return (
    <Styles.Row occupied={occupied}>
      <Styles.Cell>{room.name}</Styles.Cell>
      <Styles.Cell>
        <Styles.Button>
          <Button disabled={occupied} onClick={handleClick}>
            Join room
          </Button>
        </Styles.Button>
      </Styles.Cell>
    </Styles.Row>
  );
};

export const Table = () => {
  const rooms = useAppSelector((state) => state.rooms.data);
  const isLoading = useAppSelector((state) => state.rooms.isLoading);

  useGetRooms();

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <>
      <Styles.Container>
        <Styles.Table>
          <Styles.Title>ROOMS</Styles.Title>
          <Row occupied room={{ id: "1", name: "room 1" }} />
          <Row occupied room={{ id: "2", name: "room 2" }} />
          {rooms.map((room, index) => {
            return <Row key={index} room={room} />;
          })}
          <CreateRoomModal />
        </Styles.Table>
      </Styles.Container>
    </>
  );
};
