import _ from "lodash";
import { supabase } from "../db";

export const createRoom = async (params: {
  name: string;
  dealerId: string;
}) => {
  const { name, dealerId } = params;

  try {
    const { data, error } = await supabase
      .from("rooms")
      .insert([{ name: name, dealer_id: dealerId }])
      .select("*");

    if (error) {
      console.error(error);
    }

    if (!_.isNull(data) && !_.isEmpty(data)) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
