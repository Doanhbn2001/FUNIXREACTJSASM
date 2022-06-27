import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  CardText,
} from "reactstrap";

class showMoney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "id",
    };
    this.handleChangetype = this.handleChangetype.bind(this);
  }

  handleChangetype(event) {
    this.setState({ type: event.target.value });
  }

  render() {
    // alert(this.state.type);
    function Staff(staff) {
      return (
        <Card>
          <CardTitle>{staff.name}</CardTitle>
          <CardText>Mã nhân viên: {staff.id}</CardText>
          <CardText>Hệ số lương: {staff.salaryScale}</CardText>
          <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
          <Breadcrumb>
            <BreadcrumbItem>
              Lương:{" "}
              {(
                staff.salaryScale * 3000000 +
                staff.overTime * 200000
              ).toFixed()}
            </BreadcrumbItem>
          </Breadcrumb>
        </Card>
      );
    }

    const show = this.props.staffs.map((staff) => {
      return (
        <div className="col-12 col-md-6 col-xl-4 moneys">{Staff(staff)}</div>
      );
    });

    const Money = () => {
      const moneys = this.props.staffs.slice();
      moneys.map((staff) => {
        staff.money = (
          staff.salaryScale * 3000000 +
          staff.overTime * 200000
        ).toFixed();
      });
      let tg;
      for (let i = 0; i < moneys.length - 1; i++) {
        for (let j = i + 1; j < moneys.length; j++) {
          if (moneys[i].money < moneys[j].money) {
            tg = moneys[i];
            moneys[i] = moneys[j];
            moneys[j] = tg;
          }
        }
      }
      const Staffmoney = moneys.map((staff) => (
        <div className="col-12 col-md-6 col-xl-4 moneys">{Staff(staff)}</div>
      ));
      return Staffmoney;
    };

    return (
      <div>
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staffs">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="form-type">
          <form>
            <label>Chọn kiểu sắp xếp: </label>
            <select value={this.state.type} onChange={this.handleChangetype}>
              <option value="id">Mã nhân viên</option>
              <option value="money">Mức lương</option>
            </select>
          </form>
        </div>
        <div className="row">
          {this.state.type === "money" ? Money() : show}
        </div>
      </div>
    );
  }
}

export default showMoney;
// function ShowMoney(props) {
//   const [state, setstate] = useState({ type: "id" });

//   function Staff(staff) {
//     return (
//       <Card>
//         <CardTitle>{staff.name}</CardTitle>
//         <CardText>Mã nhân viên: {staff.id}</CardText>
//         <CardText>Hệ số lương: {staff.salaryScale}</CardText>
//         <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
//         <Breadcrumb>
//           <BreadcrumbItem>
//             Lương:{" "}
//             {(staff.salaryScale * 3000000 + staff.overTime * 200000).toFixed()}
//           </BreadcrumbItem>
//         </Breadcrumb>
//       </Card>
//     );
//   }

//   function handleChangetype(event) {
//     setstate({ type: event.target.value });
//   }

//   const show = props.staffs.map((staff) => {
//     return (
//       <div className="col-12 col-md-6 col-xl-4 moneys">{Staff(staff)}</div>
//     );
//   });

//   const showMoney = () => {
//     const moneys = props.staffs;
//     moneys.map((staff) => {
//       staff.money = (
//         staff.salaryScale * 3000000 +
//         staff.overTime * 200000
//       ).toFixed();
//     });
//     let tg;
//     for (let i = 0; i < moneys.length - 1; i++) {
//       for (let j = i + 1; j < moneys.length; j++) {
//         if (moneys[i].money < moneys[j].money) {
//           tg = moneys[i];
//           moneys[i] = moneys[j];
//           moneys[j] = tg;
//         }
//       }
//     }
//     const Staffmoney = moneys.map((staff) => (
//       <div className="col-12 col-md-6 col-xl-4 moneys">{Staff(staff)}</div>
//     ));
//     return Staffmoney;
//   };

//   return (
//     <div>
//       <div className="row">
//         <Breadcrumb>
//           <BreadcrumbItem>
//             <Link to="/staffs">Nhân viên</Link>
//           </BreadcrumbItem>
//           <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
//         </Breadcrumb>
//       </div>
//       <div className="form-type">
//         <form>
//           <label>Chọn kiểu sắp xếp: </label>
//           <select value={state.type} onChange={handleChangetype}>
//             <option value="idd">Mã nhân viên</option>
//             <option value="money">Mức lương</option>
//           </select>
//         </form>
//       </div>
//       <div className="row">{state.type === "money" ? showMoney() : show}</div>
//     </div>
//   );
// }
