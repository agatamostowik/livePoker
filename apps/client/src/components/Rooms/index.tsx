import _ from "lodash";
import * as Styled from "./styles";
import { Topbar } from "../Topbar";
import { Table } from "../Table";

export const Rooms = () => {
  return (
    <Styled.Background>
      <Topbar />
      <Table />
    </Styled.Background>
  );
};
