import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { Room } from "../../redux/slices/room";
import { useGetRooms } from "../../hooks";
import * as Styles from "./styles";

const Row = (props: { room: Room }) => {
  const { room } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/rooms/${room.id}`);
  };

  return (
    <Styles.Row>
      <Styles.Cell>{room.name}</Styles.Cell>
      <Styles.Cell>
        <button onClick={handleClick}>Join room</button>
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
    return <div>Poczekaj na stworzenie pokoju przez Dealera</div>;
  }

  return (
    <Styles.Container>
      <Styles.Head>
        <Styles.Cell>Game name</Styles.Cell>
        <Styles.Cell>Actions</Styles.Cell>
      </Styles.Head>
      <Styles.Body>
        {rooms.map((room, index) => {
          return <Row key={index} room={room} />;
        })}
      </Styles.Body>
    </Styles.Container>
  );
};
