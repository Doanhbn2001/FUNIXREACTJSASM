import * as actionType from "./actionType";
import { baseStaffsUrl, baseDeptsUrl } from "../share/baseUrl";

export const fetchStaffs = () => (ditspatch) => {
  console.log("ff");
  ditspatch(staffsLoading(true));

  return fetch(baseStaffsUrl)
    .then(
      (reponse) => {
        if (reponse.ok) {
          return reponse;
        } else {
          var error = new Error(
            "Error" + reponse.status + ": " + reponse.statusText
          );
          error.reponse = reponse;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((reponse) => reponse.json())
    .then((staffs) => ditspatch(addStaffs(staffs)))
    .catch((error) => {
      ditspatch(staffsFailed(error.message));
    });
};

export const staffsLoading = () => ({
  type: actionType.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
  type: actionType.STAFFS_FAILED,
  payload: errmess,
});

export const addStaffs = (staffs) => ({
  type: actionType.ADD_STAFFS,
  payload: staffs,
});

/////////////////////////////////////
//departments
export const fetchDepts = () => (ditspatch) => {
  console.log("ff");
  ditspatch(deptsLoading(true));

  return fetch(baseDeptsUrl)
    .then(
      (reponse) => {
        if (reponse.ok) {
          return reponse;
        } else {
          var error = new Error(
            "Error" + reponse.status + ": " + reponse.statusText
          );
          error.reponse = reponse;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((reponse) => reponse.json())
    .then((staffs) => ditspatch(addDepts(staffs)))
    .catch((error) => {
      ditspatch(deptsFailed(error.message));
    });
};

export const deptsLoading = () => ({
  type: actionType.DEPARTMENTS_LOADING,
});

export const deptsFailed = (errmess) => ({
  type: actionType.DEPARTMENTS_FAILED,
  payload: errmess,
});

export const addDepts = (depts) => ({
  type: actionType.ADD_DEPARTMENTS,
  payload: depts,
});
