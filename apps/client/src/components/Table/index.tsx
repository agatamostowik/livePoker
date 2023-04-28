import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { Room } from "../../redux/slices/room";
import { useGetRooms } from "../../hooks";
import * as Styles from "./styles";
import { CreateRoomModal } from "../CreateRoomModal";
import { Button } from "../Button";

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

  if (_.isEmpty(rooms)) {
    return <div>Wait until dealer creates the room</div>;
  }

  return (
    <>
      <Styles.Container>
        {/* <Styles.Head>
        <Styles.Cell>Game name</Styles.Cell>
        <Styles.Cell>Actions</Styles.Cell>
      </Styles.Head> */}
        <Styles.Table>
          <Styles.Title>ROOMS</Styles.Title>
          <Row occupied room={{ id: "1", name: "room 1" }} />
          <Row occupied room={{ id: "2", name: "room 2" }} />
          <Row occupied room={{ id: "2", name: "room 3" }} />
          {/* <Row key={index} room={room} /> */}
          {rooms.map((room, index) => {
            return <Row key={index} room={room} />;
          })}
          <CreateRoomModal />
        </Styles.Table>
      </Styles.Container>
    </>
  );
};
