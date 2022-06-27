import { DEPARTMENTS, STAFFS, ROLE } from "../share/staffs";

const KEYSTAFFS = "STAFFS";
const KEYDEPARTMENTS = "DEPARTMENTS";
if (!JSON.parse(localStorage.getItem(KEYSTAFFS))) {
  localStorage.setItem(KEYSTAFFS, JSON.stringify(STAFFS));
}
if (!JSON.parse(localStorage.getItem(KEYDEPARTMENTS))) {
  localStorage.setItem(KEYDEPARTMENTS, JSON.stringify(DEPARTMENTS));
}

// localStorage.setItem(KEYSTAFFS, JSON.stringify(STAFFS));
// localStorage.setItem(KEYDEPARTMENTS, JSON.stringify(DEPARTMENTS));

let ArrStaffs = JSON.parse(localStorage.getItem(KEYSTAFFS));
let ArrDepartments = JSON.parse(localStorage.getItem(KEYDEPARTMENTS));

export const initialState = {
  staffs: ArrStaffs,
  departments: ArrDepartments,
};

export const Reducer = (state = initialState, action) => {
  return state;
};
