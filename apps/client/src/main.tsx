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
import { GlobalStyle } from "./GlobalStyle";
import { Signin } from "./components/SignIn";
import "sanitize.css";

const Routers = () => {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate replace to={`rooms`} />} />
            <Route path="signin" element={<Signin />} />
            <Route path="rooms">
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
      <Routers />
      <GlobalStyle />
    </>
  </Provider>
  // <StrictMode>
  // </StrictMode>
);
