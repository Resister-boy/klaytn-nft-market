import { createStore } from "redux";
import setAddress from "./reducers";

const store = createStore(setAddress);

export default store;