import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardTitle } from "reactstrap";
import { Redirect } from "react-router-dom";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectStaff: null,
      checkStaff: false,
      selectId: null,
      type: "id",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangetype = this.handleChangetype.bind(this);
  }

  handleSubmit(event, props) {
    const staffz = this.props.staffs.filter(
      (staff) => staff.name === this.state.selectStaff
    )[0];
    if (staffz) {
      this.setState({ checkStaff: true });
      this.setState({ selectId: staffz.id });
    } else {
      alert("Không tìm thấy nhân viên! Hãy tìm kiếm lại");
    }
  }

  handleChange(event) {
    this.setState({ selectStaff: event.target.value });
  }

  handleChangetype(event) {
    this.setState({ type: event.target.value });
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

    const menutypedepartment = () => {
      const sale = [],
        HR = [],
        Marketting = [],
        IT = [],
        Finance = [];
      this.props.staffs.map((staff) => {
        const id = staff.department.id;
        if (id === "Dept01") {
          sale.push(staff);
        } else if (id === "Dept02") {
          HR.push(staff);
        } else if (id === "Dept03") {
          Marketting.push(staff);
        } else if (id === "Dept04") {
          IT.push(staff);
        } else {
          Finance.push(staff);
        }
      });

      return (
        <div className="container">
          <div className="row">
            <p className="Dept col-12">Phòng Sale:</p>

            {sale.map((staff) => Staff(staff))}
          </div>
          <div className="row">
            <p className="Dept col-12">Phòng HR: </p>
            {HR.map((staff) => Staff(staff))}
          </div>
          <div className="row">
            <p className="Dept col-12">Phòng Marketting: </p>
            {Marketting.map((staff) => Staff(staff))}
          </div>
          <div className="row">
            <p className="Dept col-12">Phòng IT: </p>
            {IT.map((staff) => Staff(staff))}
          </div>
          <div className="row">
            <p className="Dept col-12">Phòng Finance: </p>
            {Finance.map((staff) => Staff(staff))}
          </div>
        </div>
      );
    };

    const changePage = () => {
      if (this.state.checkStaff) {
        return <Redirect to={`/staffs/${this.state.selectId}`} />;
      } else {
        return <div></div>;
      }
    };
    return (
      <div>
        {changePage()}
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
            <div className="form-type col-12">
              <form>
                <label>Chọn kiểu sắp xếp: </label>
                <select
                  value={this.state.type}
                  onChange={this.handleChangetype}
                >
                  <option value="id">Mã nhân viên</option>
                  <option value="department">Phòng ban</option>
                </select>
              </form>
            </div>
          </div>
        </div>
        <div className="row menu">
          {this.state.type === "id" ? menu : menutypedepartment()}
        </div>
      </div>
    );
  }
}

export default Menu;
