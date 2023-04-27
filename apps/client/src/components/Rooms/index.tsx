import _ from "lodash";
import { CreateRoomModal } from "../CreateRoomModal";
import { Topbar } from "../Topbar";
import { Table } from "../Table";

export const Rooms = () => {
  return (
    <>
      <Topbar />
      <Table />
      <CreateRoomModal />
    </>
  );
};
