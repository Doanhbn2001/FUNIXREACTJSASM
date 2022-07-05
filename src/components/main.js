import React, { Component } from "react";
import Menu from "./menu";
import Header from "./header";
import Footer from "./footer";
import ShowStaff from "./staff";
import ShowDepartments from "./department";
import ShowMoney from "./money";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchStaffs, fetchDepts } from "../redux/actionCreators";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
  };
};

const mapDitspatchToProps = (ditspatch) => ({
  fetchStaffs: () => {
    ditspatch(fetchStaffs());
  },
  fetchDepts: () => {
    ditspatch(fetchDepts());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepts();
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <ShowStaff
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
        />
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
              />
            )}
          />
          <Route path="/staffs/:staffId" component={StaffWithId} />
          <Route
            path="/departments"
            component={() => (
              <ShowDepartments departments={this.props.departments.depts} />
            )}
          />
          <Route
            path="/moneys"
            component={() => <ShowMoney staffs={this.props.staffs.staffs} />}
          />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDitspatchToProps)(Main));
