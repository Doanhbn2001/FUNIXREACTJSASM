import { createStore, combineReducers, applyMiddleware } from "redux";
import { Staffs } from "./staffs";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Departments } from "./departments";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
