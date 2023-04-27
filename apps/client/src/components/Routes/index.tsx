import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { Layout } from "../Layout";
import { Signin } from "../SignIn";
import { Rooms } from "../Rooms";
import { Room } from "../Room";

export const Routes = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate replace to="rooms" />} />
            <Route
              path="signin"
              loader={async () => {
                if (isAuthenticated) {
                  redirect("/rooms");
                }

                return null;
              }}
              element={<Signin />}
            />
            <Route
              path="rooms"
              loader={async () => {
                if (!isAuthenticated) {
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
