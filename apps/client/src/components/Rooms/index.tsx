import _ from "lodash";
import { Topbar } from "../Topbar";
import { Table } from "../Table";
import * as Styled from "./styles";

export const Rooms = () => {
  return (
    <Styled.Background>
      <Topbar />

      <Table />
    </Styled.Background>
  );
};
