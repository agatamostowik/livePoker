import {
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import { SignIn } from "../Sign/SignIn";
import { Rooms } from "../Rooms";
import { Room } from "../Room";
import { SignUp } from "../Sign/SignUp";
import { useCheckUser } from "../../hooks";

export const Routes = () => {
  const { checkUser } = useCheckUser();

  return (
    <RouterProvider
      router={createHashRouter(
        createRoutesFromElements(
          <Route path="/" element={<Outlet />}>
            <Route index element={<Navigate replace to="rooms" />} />
            <Route
              path="signin"
              loader={async () => {
                const profile = await checkUser();

                if (profile) {
                  redirect("/rooms");
                }

                return null;
              }}
              element={<SignIn />}
            />
            <Route
              path="signup"
              loader={async () => {
                const profile = await checkUser();

                if (profile) {
                  redirect("/rooms");
                }

                return null;
              }}
              element={<SignUp />}
            />
            <Route
              path="rooms"
              loader={async () => {
                const profile = await checkUser();

                if (!profile) {
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
