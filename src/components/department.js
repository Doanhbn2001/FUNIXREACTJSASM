import React, { Component } from "react";
import {
  Card,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./loading";

const DepartmentList = ({ departments, isLoading, errMess }) => {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else {
    return (
      <div className="row departments">
        {departments.map((department) => (
          <div className="col-12 col-md-4 col-xl-3 department">
            <Link to={`departments/${department.id}`}>
              <Card>
                <CardTitle>{department.name}</CardTitle>
                <CardText>
                  Số lượng nhân viên: {department.numberOfStaff}
                </CardText>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    );
  }
};

function ShowDepartments(props) {
  return (
    <div>
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/staffs">Nhân viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Phòng ban</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <DepartmentList
        departments={props.departments}
        isLoading={props.deptsLoading}
        errMess={props.deptsFailed}
      />
    </div>
  );
}

export default ShowDepartments;
