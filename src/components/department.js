import React, { Component } from "react";
import {
  Card,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function ShowDepartments(props) {
  const show = props.departments.map((department) => {
    return (
      <div className="col-12 col-md-4 col-xl-3 department">
        <Card>
          <CardTitle>{department.name}</CardTitle>
          <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
        </Card>
      </div>
    );
  });
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
      <div className="row departments">{show}</div>
    </div>
  );
}

export default ShowDepartments;
