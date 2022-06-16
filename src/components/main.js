import React, { Component } from "react";
import Menu from "./menu";
import Header from "./header";
import Footer from "./footer";
import ShowStaff from "./staff";
import ShowDepartments from "./department";
import ShowMoney from "./money";
import { DEPARTMENTS, STAFFS, ROLE } from "../share/staffs";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <ShowStaff
          staff={
            this.state.staffs.filter(
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
            component={() => <Menu staffs={this.state.staffs} />}
          />
          <Route path="/staffs/:staffId" component={StaffWithId} />
          <Route
            path="/departments"
            component={() => (
              <ShowDepartments departments={this.state.departments} />
            )}
          />
          <Route
            path="/moneys"
            component={() => <ShowMoney staffs={this.state.staffs} />}
          />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default Main;
