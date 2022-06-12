import logo from "./logo.svg";
import "./App.css";
import { Navbar, NavbarBrand } from "reactstrap";
import { render } from "@testing-library/react";
import { Component } from "react";
import Menu from "./components/menu";
import { DEPARTMENTS, STAFFS, ROLE } from "./share/staffs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
    };
  }
  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <div>
          <Menu staffs={this.state.staffs} />
        </div>
      </div>
    );
  }
}
export default App;
