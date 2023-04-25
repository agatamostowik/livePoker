import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from "./components/Layout";
import { store, useAppDispatch, useAppSelector } from "./redux/store";
import { Rooms } from "./components/Rooms";
import { Room } from "./components/Room";
import { GlobalStyle } from "./GlobalStyle";
import { Signin } from "./components/SignIn";
import { setUser } from "./redux/slices/app";
import { supabase } from "./db";
import "sanitize.css";

const Routes = () => {
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
                  dispatch(setUser(data.user));
                  redirect("/rooms");
                }

                return null;
              }}
              element={<Signin />}
            />
            <Route
              path="rooms"
              loader={async () => {
                // https://reactrouter.com/en/main/start/overview#redirects
                const { data } = await supabase.auth.getUser();

                if (data.user) {
                  dispatch(setUser(data.user));
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

const rootElement = document.getElementById("root")!;
createRoot(rootElement).render(
  <Provider store={store}>
    <>
      <Routes />
      <GlobalStyle />
    </>
  </Provider>
);

{
  /* <StrictMode>
</StrictMode> */
}
