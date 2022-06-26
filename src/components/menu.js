import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { BsFillPersonPlusFill } from "react-icons/bs";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectStaff: null,
      checkStaff: false,
      staffFind: [],
      isModalOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.modalSubmit = this.modalSubmit.bind(this);
  }

  handleSubmit(event, props) {
    const staffz = this.props.staffs.filter((staff) =>
      staff.name.includes(this.state.selectStaff)
    );
    if (staffz.length) {
      this.setState({ checkStaff: true });
      this.setState({ staffFind: staffz });
    } else {
      alert("Không tìm thấy nhân viên! Hãy tìm kiếm lại");
    }
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ selectStaff: event.target.value });
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  modalSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert(JSON.stringify(values));
  }

  render() {
    function Staff(staff) {
      return (
        <div className="col-6 col-md-4 col-xl-2 cardnv">
          <Link to={`staffs/${staff.id}`}>
            <Card>
              <CardImg width="100%" src={staff.image} />
              <CardTitle className="name">{staff.name}</CardTitle>
            </Card>
          </Link>
        </div>
      );
    }

    const menu = this.props.staffs.map((staff) => {
      return Staff(staff);
    });

    const menuFind = this.state.staffFind.map((staff) => {
      return Staff(staff);
    });

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3>Nhân viên</h3>
              <hr />
            </div>
            <div className="form col-12">
              <form onSubmit={this.handleSubmit}>
                <label>
                  Tìm kiếm:
                  <input
                    type="text"
                    value={this.state.selectStaff}
                    onChange={this.handleChange}
                  />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
            <Button outline onClick={this.toggleModal}>
              <BsFillPersonPlusFill />
            </Button>
          </div>
        </div>
        <div className="row menu">
          {this.state.checkStaff ? menuFind : menu}
        </div>
        <div className="row">
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
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
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                      isNumber: " Must be a number",
                    }}
                  />
                </Row>
                <Row className="form-group">
                  <label htmlFor="dob">Ngày sinh</label>
                  <Control
                    type="date"
                    model=".dob"
                    name="dob"
                    className="form-control"
                  />
                </Row>
                <Row className="form-group">
                  <label htmlFor="firstdob">Ngày vào công ty</label>
                  <Control
                    type="date"
                    model=".firstdob"
                    name="firstdob"
                    className="form-control"
                  />
                </Row>
                <Row>
                  <label htmlFor="dep">Phòng ban</label>
                  <Control.select
                    model=".dep"
                    name="dep"
                    className="form-control"
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Control.select>
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
                    <Button type="submit" color="primary">
                      Thêm
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

export default Menu;
