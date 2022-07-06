import React from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

function ShowStaff(props) {
  console.log(props.staff);
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/staffs">Nhân viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">
        <div className="col-12 col-md-4 col-xl-3">
          <img src={props.staff.image} width="100%" />
        </div>
        <div className="col-12 col-md-8 col-xl-9">
          <h3>Họ và tên: {props.staff.name}</h3>
          <p>Ngày sinh: {dateFormat(props.staff.dob, "dd/mm/yyyy")}</p>
          <p>
            Ngày vào công ty: {dateFormat(props.staff.startDate, "dd/mm/yyyy")}
          </p>
          {/* <p>Phòng ban: {props.staffDept.name}</p> */}
          <p>Số ngày nghỉ còn lại: {props.staff.annualLeave}</p>
          <p>Số ngày đã làm thêm: {props.staff.overTime}</p>
        </div>
      </div>
    </div>
  );
}

export default ShowStaff;
