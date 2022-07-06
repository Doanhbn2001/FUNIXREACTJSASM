import * as actionType from "./actionType";
import { baseStaffsUrl, baseDeptsUrl, baseSalaryUrl } from "../share/baseUrl";

export const fetchStaffs = () => (ditspatch) => {
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

export const postStaff = (staff) => (ditspatch) => {
  console.log(staff);
  const newStaff = { ...staff };
  newStaff.image = "/assets/images/alberto.png";
  return fetch(baseStaffsUrl, {
    method: "POST",
    body: JSON.stringify(newStaff),
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  })
    .then((reponse) => reponse.json())
    .then((reponse) => {
      alert("Successfully!!");
      ditspatch(addStaff(reponse));
    });
};

export const addStaff = (staff) => ({
  type: actionType.ADD_STAFF,
  payload: staff,
});

/////////////////////////////////////
//departments
export const fetchDepts = () => (ditspatch) => {
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

///////////////////////
//
export const fetchDeptsId = (id) => (ditspatch) => {
  ditspatch(deptsByIdLoading(true));

  return fetch(baseDeptsUrl + id)
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
    .then((staffs) => ditspatch(addDeptsById(staffs)))
    .catch((error) => {
      ditspatch(deptsByIdFailed(error.message));
    });
};

export const deptsByIdLoading = () => ({
  type: actionType.DEPARTMENTSBYID_LOADING,
});

export const deptsByIdFailed = (errmess) => ({
  type: actionType.DEPARTMENTSBYID_FAILED,
  payload: errmess,
});

export const addDeptsById = (depts) => ({
  type: actionType.ADD_DEPARTMENTSBYID,
  payload: depts,
});

/////////////////////////////////////////
///
export const fetchSalarys = () => (ditspatch) => {
  ditspatch(salarysLoading(true));

  return fetch(baseSalaryUrl)
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
    .then((staffs) => ditspatch(addSalarys(staffs)))
    .catch((error) => {
      ditspatch(salarysFailed(error.message));
    });
};

export const salarysLoading = () => ({
  type: actionType.SALARYS_LOADING,
});

export const salarysFailed = (errmess) => ({
  type: actionType.SALARYS_FAILED,
  payload: errmess,
});

export const addSalarys = (depts) => ({
  type: actionType.ADD_SALARYS,
  payload: depts,
});
