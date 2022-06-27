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

export function addStaff(staffnew) {
  return {
    type: "ADD_STAFF",
    staff: staffnew,
  };
}

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_STAFF":
      console.log(typeof action.staff);
      console.log(action.staff.name);

      const newStaff = {
        id: state.staffs[state.staffs.length - 1].id + 1,
        name: action.staff.name,
        doB: action.staff.dob,
        salaryScale: action.staff.salaryScale,
        startDate: action.staff.firstdob,
        department: {
          name: action.staff.dep,
        },
        annualLeave: action.staff.annualLeave,
        overTime: action.staff.overTime,
        image: "/assets/images/alberto.png",
      };
      const staffs = state.staffs;
      console.log(staffs);
      staffs.push(newStaff);
      localStorage.setItem(KEYSTAFFS, JSON.stringify(staffs));
      return {
        staffs: JSON.parse(localStorage.getItem(KEYSTAFFS)),
        departments: ArrDepartments,
      };
    default:
      return state;
  }
};
