import React, { Component } from "react";
import Menu from "./menu";
import Header from "./header";
import Footer from "./footer";
import ShowStaff from "./staff";
import ShowDepartments from "./department";
import ShowMoney from "./money";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchStaffs,
  fetchDepts,
  fetchSalarys,
  postStaff,
  updateStaffs,
} from "../redux/actionCreators";
import DepartmentsById from "./departmentById";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    salarys: state.salarys,
  };
};

const mapDitspatchToProps = (ditspatch) => ({
  fetchStaffs: () => {
    ditspatch(fetchStaffs());
  },
  fetchDepts: () => {
    ditspatch(fetchDepts());
  },
  fetchSalarys: () => {
    ditspatch(fetchSalarys());
  },
  postStaff: (staff) => {
    ditspatch(postStaff(staff));
  },
  updateStaffs: (staff) => {
    ditspatch(updateStaffs(staff));
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepts();
    this.props.fetchSalarys();
  }

  render() {
    const StaffWithId = ({ match }) => {
      const staffwithId = this.props.staffs.staffs.filter(
        (staff) => staff.id === parseInt(match.params.staffId, 10)
      )[0];
      return (
        <ShowStaff staff={staffwithId} updateStaffs={this.props.updateStaffs} />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/staffs"
            component={() => (
              <Menu
                staffs={this.props.staffs.staffs}
                staffsLoading={this.props.staffs.isLoading}
                staffsError={this.props.staffs.errMess}
                postStaff={this.props.postStaff}
              />
            )}
          />
          <Route path="/staffs/:staffId" component={StaffWithId} />
          <Route
            exact
            path="/departments"
            component={() => (
              <ShowDepartments
                departments={this.props.departments.depts}
                deptsLoading={this.props.departments.idLoading}
                deptsFailed={this.props.departments.errMess}
              />
            )}
          />
          <Route
            path="/departments/:deptId"
            component={({ match }) => (
              <DepartmentsById deptId={match.params.deptId} />
            )}
          />
          <Route
            path="/moneys"
            component={() => <ShowMoney staffs={this.props.salarys.salarys} />}
          />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDitspatchToProps)(Main));
