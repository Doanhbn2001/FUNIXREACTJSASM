import React, { Component } from "react";
import Menu from "./menu";
import Header from "./header";
import Footer from "./footer";
import ShowStaff from "./staff";
import ShowDepartments from "./department";
import ShowMoney from "./money";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <ShowStaff
          staff={
            this.props.staffs.filter(
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
            component={() => <Menu staffs={this.props.staffs} />}
          />
          <Route path="/staffs/:staffId" component={StaffWithId} />
          <Route
            path="/departments"
            component={() => (
              <ShowDepartments departments={this.props.departments} />
            )}
          />
          <Route
            path="/moneys"
            component={() => <ShowMoney staffs={this.props.staffs} />}
          />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps)(Main));
