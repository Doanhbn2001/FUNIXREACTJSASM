import { createStore, combineReducers, applyMiddleware } from "redux";
import { Staffs } from "./staffs";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Departments } from "./departments";
import { DepartmentById } from "./departmentById";
import { Salarys } from "./money";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      departmentsById: DepartmentById,
      salarys: Salarys,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
