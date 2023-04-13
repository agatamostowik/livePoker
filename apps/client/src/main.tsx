import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from "./components/Layout";
import { store } from "./redux/store";
import { Rooms } from "./components/Rooms";
import { Room } from "./components/Room";
import "sanitize.css";
import { GlobalStyle } from "./GlobalStyle";
import { Signin } from "./components/SignIn";

const Routers = () => {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate replace to={`/rooms`} />} />
            <Route path="signin" element={<Signin />} />
            <Route path="rooms">
              <Route index element={<Rooms />} />
              <Route path=":id" element={<Room />} />
            </Route>
          </Route>
        )
      )}
    />
  );
};

const rootElement = document.getElementById("root")!;
createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <>
        <Routers />
        <GlobalStyle />
      </>
    </Provider>
  </StrictMode>
);
