import * as actionType from "./actionType";

export const Departments = (
  state = { isLoading: true, errMess: null, depts: [] },
  action
) => {
  switch (action.type) {
    case actionType.ADD_DEPARTMENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        depts: action.payload,
      };
    case actionType.DEPARTMENTS_LOADING:
      return { ...state, isLoading: true, errMess: null, depts: [] };
    case actionType.DEPARTMENTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};
