import * as actionType from "./actionType";

export const Salarys = (
  state = { isLoading: true, errMess: null, salarys: [] },
  action
) => {
  switch (action.type) {
    case actionType.ADD_SALARYS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        salarys: action.payload,
      };
    case actionType.SALARYS_LOADING:
      return { ...state, isLoading: true, errMess: null, salarys: [] };
    case actionType.SALARYS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};
