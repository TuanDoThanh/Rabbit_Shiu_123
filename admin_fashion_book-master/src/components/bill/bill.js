import React, { Component } from "react";
import { Link } from "react-router-dom";
class Bill extends Component {
  constructor() {
    super();
    this.state = {
      pagination: [],
      status: '99'
    };
  }
  componentWillMount() {
    let tmp = [];
    for (let i = 1; i <= this.props.totalpage; i++) {
      tmp.push(i);
    }
    this.setState({ pagination: tmp });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalpage !== this.props.totalpage) {
      let tmp = [];
      for (let i = 1; i <= nextProps.totalpage; i++) {
        tmp.push(i);
      }
      this.setState({ pagination: tmp });
    }
  }
  renderPagination() {
    if (this.state.pagination.length === 0) {
      return null;
    } else {
      return (
        <ul className="pagination pagination-custom col-md-6 offset-md-3">
          <li onClick={() => this.props.backPage()}>
            <a>&laquo;</a>
          </li>
          {this.state.pagination.map((element, index) => {
            if (this.props.page === element) {
              return (
                <li
                  className="active"
                  onClick={() => this.props.setPage(element)}
                >
                  <a>{element}</a>
                </li>
              );
            } else {
              return (
                <li onClick={() => this.props.setPage(element)}>
                  <a>{element}</a>
                </li>
              );
            }
          })}
          <li onClick={() => this.props.nextPage()}>
            <a>&raquo;</a>
          </li>
        </ul>
      );
    }
  }
  showdetail(){
    
  }
  render() {
    console.log(this.props.bill);
    return (
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="page-header">
              <i className="fa fa-table" /> Bảng
            </h3>
            <ol className="breadcrumb">
              <li>
                <i className="fa fa-home" />
                <Link to="/">Trang Chủ</Link>
              </li>
              <li>
                <i className="fa fa-table" />Bảng
              </li>
              <li>
                <i className="fa fa-th-list" />Quản lý hóa đơn
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">
              Bảng nâng cao
                <span style={{ marginLeft: "50px", marginRight: "30px" }}>
                Chọn ngày
                </span>
                <select onChange={e => this.props.getBill(e.target.value)}>
                  <option
                    value=""
                    disabled
                    selected
                    style={{ display: "none" }}
                  >
                    Trạng thái
                  </option>
                  <option value="99">Đang Chờ Xử Lý</option>
                  <option value="0">Đang Giao Hàng</option>
                  <option value="1">Đã Giao Hàng</option>

                </select>
              </header>
              <table className="table table-striped table-advance table-hover">
                <tbody>
                  <tr>
                    <th>Tên</th>
                    <th>Địa Chỉ</th>
                    <th>Số Điện Thoại</th>
                    <th>Ngày</th>
                    <th>Sản Phẩm</th>
                  </tr>
                  {this.props.bill.map((element, index) => {
                    return (
                      <tr>
                        <td>{element.name}</td>
                        <td>
                          {element.address}
                        </td>
                        <td>{element.phone}</td>
                   
                        <td>
                          
                          <div>
                            
                              {element.products.map((item, index) => {
                                return (
                                    <div className='product'>
                                      <div className='img'><img src={item.img}></img> </div>
                                      <div className='product-content'>
                                        <div>{item.name }</div>
                                        <div>{"Số Lượng: " + item.count}</div>
                                        <div className='product-price'><p>Giá: {new Intl.NumberFormat('de-DE', {currency: 'EUR' }).format(item.price)}<sup>đ</sup> </p> </div>
                                      </div>
                                      
                                    </div>
                                )
                              })}
                            </div>
                          
                        </td>
                       
                        <td className='product-price'><p><span>{new Intl.NumberFormat('de-DE', {currency: 'EUR' }).format(element.total)}<sup>đ</sup></span> </p></td>
                        <td><select onChange={e => this.props.updateIssend(e.target.value,element._id)}>
                                  
                          <option
                            value=""
                            disabled
                            selected
                            style={{ display: "none" }}
                          >
                           
                          </option>
                          <option value='99' >Đang Chờ Xử Lý</option>
                          <option value='0'>Đang Giao Hàng</option>
                          <option value='1'>Đã Giao Hàng</option>
                        </select></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {this.renderPagination()}
            </section>
          </div>
        </div>
      </section>
    );
  }
}
export default Bill;
