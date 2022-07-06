import * as actionType from "./actionType";

export const DepartmentById = (
  state = { isLoading: true, errMess: null, deptsId: [] },
  action
) => {
  switch (action.type) {
    case actionType.ADD_DEPARTMENTSBYID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        deptsId: action.payload,
      };
    case actionType.DEPARTMENTSBYID_LOADING:
      return { ...state, isLoading: true, errMess: null, deptsId: [] };
    case actionType.DEPARTMENTSBYID_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};
