import {
  Card,
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import React, { Component } from "react";
import { Loading } from "./loading";
import { connect } from "react-redux";
import { fetchDeptsId } from "../redux/actionCreators";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    departmentsById: state.departmentsById,
  };
};

const mapDitspatchToProps = (dispatch) => ({
  fetchDeptsId: (id) => {
    dispatch(fetchDeptsId(id));
  },
});

class DepartmentsById extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("ff1");
    this.props.fetchDeptsId(this.props.deptId);
  }
  render() {
    console.log("fff1");
    function Staff(staff) {
      return (
        <div className="col-6 col-md-4 col-xl-2 cardnv">
          <Card>
            <CardImg width="100%" src={staff.image} />
            <CardTitle className="name">{staff.name}</CardTitle>
          </Card>
        </div>
      );
    }
    const menu = this.props.departmentsById.deptsId.map((staff) => {
      return Staff(staff);
    });
    const fullMenu = () => {
      if (this.props.departmentsById.isLoading) {
        return (
          <div className="row menu">
            <Loading />
          </div>
        );
      } else if (this.props.departmentsById.errMess) {
        return (
          <div className="row menu">
            <h4>{this.props.staffs.staffsError}</h4>
          </div>
        );
      } else {
        return <div className="row menu">{menu}</div>;
      }
    };
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/departments">Phòng ban</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{this.props.deptId}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        {fullMenu()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDitspatchToProps)(DepartmentsById);
