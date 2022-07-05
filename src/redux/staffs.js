import * as actionType from "./actionType";

export const Staffs = (
  state = { isLoading: true, errMess: null, staffs: [] },
  action
) => {
  switch (action.type) {
    case actionType.ADD_STAFFS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: action.payload,
      };
    case actionType.STAFFS_LOADING:
      return { ...state, isLoading: true, errMess: null, staffs: [] };
    case actionType.STAFFS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};
