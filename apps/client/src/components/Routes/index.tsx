import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { Layout } from "../Layout";
import { Signin } from "../SignIn";
import { Rooms } from "../Rooms";
import { Room } from "../Room";
import {
  Account,
  setAccount,
  setIsAuthenticated,
  setUser,
} from "../../redux/slices/auth";
import { supabase } from "../../db";

export const Routes = () => {
  const dispatch = useAppDispatch();

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate replace to="rooms" />} />
            <Route
              path="signin"
              loader={async () => {
                const { data } = await supabase.auth.getUser();

                if (data.user) {
                  const response = await fetch(
                    `http://localhost:3001/api/auth/me?userId=${data.user.id}`
                  );
                  const account: Account = await response.json();

                  dispatch(setUser(data.user));
                  dispatch(setAccount(account));
                  dispatch(setIsAuthenticated(true));
                  redirect("/rooms");
                }

                return null;
              }}
              element={<Signin />}
            />
            <Route
              path="rooms"
              loader={async () => {
                const { data } = await supabase.auth.getUser();

                if (data.user) {
                  const response = await fetch(
                    `http://localhost:3001/api/auth/me?userId=${data.user.id}`
                  );
                  const account: Account = await response.json();

                  dispatch(setUser(data.user));
                  dispatch(setAccount(account));
                  dispatch(setIsAuthenticated(true));
                } else {
                  throw redirect("/signin");
                }

                return null;
              }}
            >
              <Route index element={<Rooms />} />
              <Route path=":roomId" element={<Room />} />
            </Route>
          </Route>
        )
      )}
    />
  );
};
