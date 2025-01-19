import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import reduxStore from "./store/ReduxStore.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={reduxStore}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
