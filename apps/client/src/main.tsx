import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GlobalStyle } from "./GlobalStyle";
import { Routes } from "./components/Routes";
import "sanitize.css";

const rootElement = document.getElementById("root")!;
createRoot(rootElement).render(
  <Provider store={store}>
    <>
      <Routes />
      <GlobalStyle />
    </>
  </Provider>
);
