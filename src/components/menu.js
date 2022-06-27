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
  Col,
  Label,
  Form,
  FormGroup,
  Input,
  FormFeedback,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { BsFillPersonPlusFill } from "react-icons/bs";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectStaff: null,
      checkStaff: false,
      staffFind: [],
      isModalOpen: false,
      staffArr: JSON.parse(localStorage.getItem("STAFFS")),
      id: 0,
      name: "",
      doB: "",
      salaryScale: 1,
      startDate: "",
      department: "",
      annualLeave: 0,
      overTime: 0,
      touched: {
        name: false,
        salaryScale: false,
        annualLeave: false,
        overTime: false,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.modalSubmit = this.modalSubmit.bind(this);
    this.modalChange = this.modalChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit(event, props) {
    const staffz = this.state.staffArr.filter((staff) =>
      staff.name.includes(this.state.selectStaff)
    );
    console.log(staffz);
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

  modalSubmit(event) {
    const newStaff = {
      id: this.state.staffArr[this.state.staffArr.length - 1].id + 1,
      name: this.state.name,
      doB: this.state.doB,
      salaryScale: this.state.salaryScale,
      startDate: this.state.startDate,
      department: {
        name: this.state.department,
      },
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: "/assets/images/alberto.png",
    };
    const staffs = this.state.staffArr;
    staffs.push(newStaff);
    localStorage.setItem("STAFFS", JSON.stringify(staffs));
    this.setState({ staffArr: staffs });
    this.toggleModal();
    event.preventDefault();
  }

  modalChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate(name, salaryScale, annuaLeave, overTime) {
    const errors = {
      name: "",
      salaryScale: "",
      annuaLeave: "",
      overTime: "",
    };
    if (this.state.touched.name && name.length < 3) {
      errors.name = "Tên phải có nhiều hơn 2 ký tự!!";
    } else if (this.state.touched.name && name.length > 30) {
      errors.name = "Tên không quá 30 ký tự!!";
    }
    if (this.state.touched.salaryScale && isNaN(salaryScale)) {
      errors.salaryScale = "Hệ số lương là một số!!";
    } else if (
      this.state.touched.salaryScale &&
      !isNaN(salaryScale) &&
      salaryScale < 0
    ) {
      errors.salaryScale = "Hệ số lương không nhỏ hơn 0!!";
    } else if (
      this.state.touched.salaryScale &&
      !isNaN(salaryScale) &&
      salaryScale > 10
    ) {
      errors.salaryScale = "Hệ sô lương không lớn hơn 10!!";
    }
    if (this.state.touched.annuaLeave && isNaN(annuaLeave)) {
      errors.annuaLeave = "Số ngày nghỉ còn lại là một số!!";
    } else if (
      this.state.touched.annuaLeave &&
      !isNaN(annuaLeave) &&
      annuaLeave < 0
    ) {
      errors.annuaLeave = "Số ngày nghỉ còn lại không nhỏ hơn 0!!";
    } else if (
      this.state.touched.annuaLeave &&
      !isNaN(annuaLeave) &&
      annuaLeave > 10
    ) {
      errors.annuaLeave = "Số ngày nghỉ còn lại không lớn hơn 10";
    }
    if (this.state.touched.overTime && isNaN(overTime)) {
      errors.overTime = "Số ngày đã làm thêm là một số!!";
    } else if (
      this.state.touched.overTime &&
      !isNaN(overTime) &&
      overTime < 0
    ) {
      errors.overTime = "Số ngày đã làm thêm không nhỏ hơn 0!!";
    } else if (
      this.state.touched.overTime &&
      !isNaN(overTime) &&
      overTime > 10
    ) {
      errors.overTime = "Số ngày đã làm thêm không lớn hơn 10!!";
    }
    return errors;
  }

  render() {
    const errors = this.validate(
      this.state.name,
      this.state.salaryScale,
      this.state.annualLeave,
      this.state.overTime
    );

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

    const menu = this.state.staffArr.map((staff) => {
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
              <Form onSubmit={this.modalSubmit}>
                <FormGroup row>
                  <Label htmlFor="name">Tên:</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.name}
                    valid={errors.name === ""}
                    invalid={errors.name !== ""}
                    onBlur={this.handleBlur("name")}
                    onChange={this.modalChange}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="doB">Ngày sinh:</Label>
                  <Input
                    type="date"
                    id="doB"
                    name="doB"
                    value={this.state.doB}
                    onChange={this.modalChange}
                  />
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="startDate">Ngày vào công ty:</Label>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={this.state.startDate}
                    onChange={this.modalChange}
                  />
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="department">Phòng ban:</Label>
                  <Input
                    type="select"
                    id="department"
                    name="department"
                    value={this.state.department}
                    onChange={this.modalChange}
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Input>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="salaryScale">Hệ số lương:</Label>
                  <Input
                    type="text"
                    id="salaryScale"
                    name="salaryScale"
                    valid={errors.salaryScale === ""}
                    invalid={errors.salaryScale !== ""}
                    onBlur={this.handleBlur("salaryScale")}
                    value={this.state.salaryScale}
                    onChange={this.modalChange}
                  />
                  <FormFeedback>{errors.salaryScale}</FormFeedback>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="annualLeave">Số ngày nghỉ còn lại:</Label>
                  <Input
                    type="text"
                    id="annualLeave"
                    name="annualLeave"
                    value={this.state.annualLeave}
                    valid={errors.annuaLeave === ""}
                    invalid={errors.annuaLeave !== ""}
                    onBlur={this.handleBlur("annuaLeave")}
                    onChange={this.modalChange}
                  />
                  <FormFeedback>{errors.annuaLeave}</FormFeedback>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="overTime">Số ngày đã làm thêm:</Label>
                  <Input
                    type="text"
                    id="overTime"
                    name="overTime"
                    value={this.state.overTime}
                    valid={errors.overTime === ""}
                    invalid={errors.overTime !== ""}
                    onBlur={this.handleBlur("overTime")}
                    onChange={this.modalChange}
                  />
                  <FormFeedback>{errors.overTime}</FormFeedback>
                </FormGroup>
                <FormGroup row>
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary">
                      Thêm
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Menu;
