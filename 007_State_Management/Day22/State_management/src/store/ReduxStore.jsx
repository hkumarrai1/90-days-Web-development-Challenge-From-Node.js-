import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./CounterFunction";
const reduxStore = configureStore({
  reducer: { counter: counterReducer },
});
export default reduxStore;
