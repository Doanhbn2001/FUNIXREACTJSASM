import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import dateFormat from "dateformat";
import {
  BreadcrumbItem,
  Breadcrumb,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

class ShowStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isChange: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.modalSubmit = this.modalSubmit.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  modalSubmit(values) {
    const staffs = { ...values };
    staffs.id = this.props.staff.id;
    this.props.updateStaffs(staffs);
    this.toggleModal();
    this.setState({ isChange: true });
    alert("Lưu thành công");
  }
  render() {
    const changePage = () => {
      if (this.state.isChange) {
        return <Redirect to="../" />;
      } else {
        return null;
      }
    };
    return (
      <div className="container">
        {changePage()}
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staffs">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{this.props.staff.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 col-xl-3">
            <img src={this.props.staff.image} width="100%" />
          </div>
          <div className="col-12 col-md-8 col-xl-9">
            <h3>Họ và tên: {this.props.staff.name}</h3>
            <p>Ngày sinh: {dateFormat(this.props.staff.doB, "dd/mm/yyyy")}</p>
            <p>
              Ngày vào công ty:{" "}
              {dateFormat(this.props.staff.startDate, "dd/mm/yyyy")}
            </p>
            {/* <p>Phòng ban: {props.staffDept.name}</p> */}
            <p>Số ngày nghỉ còn lại: {this.props.staff.annualLeave}</p>
            <p>Số ngày đã làm thêm: {this.props.staff.overTime}</p>
            <p>Hệ số lương: {this.props.staff.salaryScale}</p>
            <Button outline onClick={this.toggleModal} color="warning">
              Sửa
            </Button>
          </div>
        </div>
        <div className="row">
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Sửa thông tin</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.modalSubmit(values)}>
                <Row className="form-group">
                  <label htmlFor="name">Tên</label>
                  <Control.text
                    model=".name"
                    name="name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(30),
                    }}
                    placeholder={this.props.staff.name}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 30 characters or less",
                      isNumber: " Must be a number",
                    }}
                  />
                </Row>
                <Row className="form-group">
                  <label htmlFor="doB">Ngày sinh</label>
                  <Control
                    type="date"
                    model=".doB"
                    name="doB"
                    className="form-control"
                  />
                </Row>
                <Row className="form-group">
                  <label htmlFor="startDate">Ngày vào công ty</label>
                  <Control
                    type="date"
                    model=".startDate"
                    name="startDate"
                    className="form-control"
                  />
                </Row>
                <Row className="form-group">
                  <label htmlFor="salaryScale">Hệ số lương</label>
                  <Control.text
                    model=".salaryScale"
                    name="salaryScale"
                    placeholder="1"
                    className="form-control"
                    validators={{
                      required,
                      isNumber: isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".salaryScale"
                    show="touched"
                    messages={{
                      required: "Required",
                      isNumber: " Must be a number",
                    }}
                  />
                </Row>
                <Row className="form-group">
                  <label htmlFor="annualLeave">Số ngày nghỉ còn lại</label>
                  <Control.text
                    model=".annualLeave"
                    name="annualLeave"
                    placeholder="0"
                    className="form-control"
                    validators={{
                      required,
                      isNumber: isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".annualLeave"
                    show="touched"
                    messages={{
                      required: "Required",
                      isNumber: " Must be a number",
                    }}
                  />
                </Row>
                <Row className="form-group">
                  <label htmlFor="overTime">Số ngày đã làm thêm</label>
                  <Control.text
                    model=".overTime"
                    name="overTime"
                    placeholder="0"
                    className="form-control"
                    validators={{
                      required,
                      isNumber: isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".overTime"
                    show="touched"
                    messages={{
                      required: "Required",
                      isNumber: " Must be a number",
                    }}
                  />
                </Row>
                <Row className="form-group">
                  <Col>
                    <Button type="submit" color="warning">
                      Lưu
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

// function ShowStaff(props) {
//
// }

export default ShowStaff;
