import { useEffect, useState } from "react";
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
import { store, useAppDispatch } from "./redux/store";
import { Rooms } from "./components/Rooms";
import { Room } from "./components/Room";
import { GlobalStyle } from "./GlobalStyle";
import { Signin } from "./components/SignIn";
import { setUser } from "./redux/slices/app";
import { supabase } from "./db";
import "sanitize.css";

const Routes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  const getUser = async () => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        //  TODO: handle error
      }

      if (data.user) {
        dispatch(setUser(data.user));
      }
    } catch (error) {
      // TODO: handle error
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate replace to="rooms" />} />
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
      <Routes />
      <GlobalStyle />
    </>
  </Provider>
);

// <StrictMode>
// </StrictMode>
