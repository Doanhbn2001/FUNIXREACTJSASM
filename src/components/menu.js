import React, { Component } from "react";
import dateFormat from "dateformat";
import { Card, CardText, CardTitle, CardImg } from "reactstrap";
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectStaff: null,
      form: `col-12 col-md-5 borderz`,
      color: "color1",
    };
  }

  selectStaff(staff) {
    this.setState({ selectStaff: staff });
  }

  renderStaff(staff) {
    if (staff != null) {
      return (
        <Card className="col-12 col-md-5 m-1 borderz">
          <CardTitle heading>Họ và tên: {staff.name}</CardTitle>
          <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yy")}</CardText>
          <CardText>
            Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yy")}
          </CardText>
          <CardText>Phòng ban: {staff.department.name}</CardText>
          <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
          <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
        </Card>
      );
    } else {
      return <div></div>;
    }
  }

  numsCols(nums) {
    const cols = (11 - (11 % nums)) / nums;
    this.setState({ form: `col-12 col-md-${cols} borderz` });
  }

  render() {
    const menu = this.props.staffs.map((staff) => {
      return (
        <div
          className={this.state.form}
          onClick={() => this.selectStaff(staff)}
        >
          <p>{staff.name}</p>
        </div>
      );
    });
    return (
      <div>
        <form>
          <label className="text">Nhập số cột muốn hiển thị: </label>
          <select
            class="form-control"
            id="nums"
            onClick={() => {
              this.numsCols(document.getElementById("nums").value);
            }}
          >
            <option>2</option>
            <option>1</option>
            <option>3</option>
            <option>5</option>
            <option>9</option>
          </select>
        </form>
        <div className="row menu">{menu}</div>
        <p className="text"> ➡ Bấm vào tên nhân viên để xem thông tin!!</p>
        <div>{this.renderStaff(this.state.selectStaff)}</div>
      </div>
    );
  }
}

export default Menu;
