import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const initialOptions = {
  "client-id":
    "AUb1uuej_cxbw4oTo03L3JsheKzwSKra6pk70x7_9BYbZSwM_klMTIA8kW9KxKGiLEZWKh9oMRTzQPL0",
  currency: "USD",
};
class ContentPayment extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      name: "",
      phone: "",
      address: "",
      notiName: "",
      notiPhone: "",
      notiAddress: "",
      notiDetailAddress: "",
      ispay: false,
      showpaymentfail: false,
      modalIsOpen: false,
      shippingInfo: {},
      isOpen1: false,
      isOpen2: false,
    };
  }

  //phuong thuc thanh toan
  toggleList1 = () => {
    this.setState((prevState) => ({
      isOpen1: !prevState.isOpen1,
    }));
  };
  toggleList2 = () => {
    this.setState((prevState) => ({
      isOpen2: !prevState.isOpen2,
    }));
  };
  // thong tin giao hang
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const shippingInfo = {
      name: formData.get("name"),
      address: formData.get("address"),
      phone: formData.get("phone"),
    };
    this.setState({ shippingInfo });
    this.closeModal();
  };

  componentWillMount() {
    let total = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      total +=
        Number(this.props.cart[i].price) * Number(this.props.cart[i].count);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.cart !== this.props.cart) {
      let total = 0;
      for (let i = 0; i < nextProps.cart.length; i++) {
        total +=
          Number(nextProps.cart[i].price) * Number(nextProps.cart[i].count);
      }
      this.setState({ total: total });
    }
    if (nextProps.ispay !== this.props.ispay && nextProps.ispay === true) {
      this.setState({ ispay: true });
    }
    if (nextProps.ispay !== this.props.ispay && nextProps.ispay === false) {
      this.setState({ showpaymentfail: true });
    }
  }
  reset = () => {
    this.setState({
      show: false,
      name: "",
      phone: "",
      address: "",
      notiName: "",
      notiPhone: "",
      notiAddress: "",
      notiDetailAddress: "",
      ispay: false,
      showpaymentfail: false,
    });
  };

  handlePayment = () => {
    if (!this.props.islogin) {
      this.setState({ show: true });
      return;
    } else {
      this.setState({ show: false });
    }
    let check = true;
    if (this.state.name.length < 3) {
      this.setState({
        notiName: "Name invalid",
      });
      check = false;
    } else {
      this.setState({
        notiName: "",
      });
    }
    if (!this.isvaidPhone(this.state.phone)) {
      this.setState({
        notiPhone: "Phone invalid",
      });
      check = false;
    } else {
      this.setState({ notiPhone: "" });
    }

    if (this.state.address === "") {
      this.setState({ notiDetailAddress: "Address invalid" });
      check = false;
    } else {
      this.setState({ notiDetailAddress: "" });
    }
    if (check === false) return;
    this.props.payment(
      this.state.address,
      this.state.phone,
      this.state.name,
      this.state.total,
    );
  };

  isvaidPhone = (phone) => {
    if (phone.length < 10 || phone.length > 11) return false;
    for (let i = 0; i < phone.length; i++) {
      if (phone.charAt(i) < "0" || phone.charAt(i) > "9") return false;
    }
    return true;
  };

  render() {
    return (
      <div>
        <section id="cart_items" className="ss_product pd-top">
          <div className="container">
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Sản Phẩm</td>
                    <td className="description" />
                    <td className="price">Giá</td>
                    <td className="quantity">Số Lượng</td>
                    <td className="total">Tổng</td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                  {this.props.cart.map((element, index) => {
                    return (
                      <tr>
                        <td className="cart_product">
                          <a href="">
                            <img src={element.img} alt="" />
                          </a>
                        </td>
                        <td className="cart_description">
                          <h4>
                            <a href="">{element.name}</a>
                          </h4>
                        </td>
                        <td className="cart_price">
                          {new Intl.NumberFormat("de-DE", {
                            currency: "EUR",
                          }).format(element.price)}
                          <sup>đ</sup>
                        </td>
                        <td className="cart_quantity">
                          <div className="cart_quantity_button">
                            <input
                              className="cart_quantity_input"
                              type="text"
                              name="quantity"
                              value={element.count}
                              autocomplete="off"
                              size="2"
                            />
                          </div>
                        </td>
                        <td className="cart_total">
                          <p className="cart_total_price">
                            {new Intl.NumberFormat("de-DE", {
                              currency: "EUR",
                            }).format(element.price * element.count)}
                            <sup>đ</sup>
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="col-md-12 total-sup">
                <div className="col-md-7">
                  <h2 className="total-sup shipping-unit">
                    <i class="fa fa-truck"></i> Shipping unit:{" "}
                    <span className="shipping-unit-span">
                      Vận chuyển quốc tế
                    </span>
                  </h2>
                </div>
                <div class="col-md-4 total_area">
                  <div className="col-md-12">
                    <h2 className="total-sup">
                      Phí vận chuyển:
                      <span className="total-sup">
                        0<sup className="total-sup">đ</sup>
                      </span>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <h2 className="total-sup">
                      Tổng:
                      <span className="total-sup">
                        {new Intl.NumberFormat("de-DE", {
                          currency: "EUR",
                        }).format(this.state.total)}
                        <sup className="total-sup">đ</sup>
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-md-12 info_ship-ss">
                <button onClick={this.openModal} className="info_ship-btn">
                  <i class="fa fa-regular fa-plus"></i>
                  {"    "}Thông Tin Giao hàng
                </button>
                <Modal
                  show={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}
                >
                  <form onSubmit={this.handleSubmit} className="info_ship-form">
                    <h2 className="info_ship-h2">Thông Tin Giao Hàng</h2>
                    <div className="col-md-12">
                      <label className="info_ship-label">Tên người nhận:</label>
                      <input
                        className="info_ship-input"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                        required
                      />
                      <span>{this.state.notiName}</span>
                    </div>
                    <div className="col-md-12">
                      <label className="info_ship-label">Số điện thoại:</label>
                      <input
                        className="info_ship-input"
                        type="tel"
                        name="phone"
                        value={this.state.phone}
                        onChange={(e) =>
                          this.setState({ phone: e.target.value })
                        }
                        required
                      />
                      <span>{this.state.notiPhone}</span>
                    </div>
                    <div className="col-md-12">
                      <label className="info_ship-label">
                        Địa chỉ giao hàng:
                      </label>
                      <input
                        className="info_ship-input"
                        type="text"
                        name="address"
                        value={this.state.address}
                        onChange={(e) =>
                          this.setState({ address: e.target.value })
                        }
                        required
                      />
                      <span>{this.state.notiDetailAddress}</span>
                    </div>
                    <button className="info_ship-btn-md" type="submit">
                      Lưu
                    </button>
                    <button
                      className="info_ship-btn-md"
                      type="button"
                      onClick={this.closeModal}
                    >
                      Hủy Bỏ
                    </button>
                  </form>
                </Modal>
                {Object.keys(this.state.shippingInfo).length > 0 && (
                  <div>
                    <p className="info_ship-p">
                      <span className="info_ship-span">
                        {this.state.shippingInfo.name}{" "}
                        {this.state.shippingInfo.phone}
                        {":"}
                      </span>
                      {this.state.shippingInfo.address}
                    </p>
                  </div>
                )}
              </div>
              <div className="col-md-12 info_ship-ss">
                <h4>Chọn phương thức thanh toán</h4>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div>
                      <button
                        className="info_ship-btn"
                        onClick={this.toggleList1}
                      >
                        Thanh toán khi nhận hàng
                      </button>
                      {this.state.isOpen1 && (
                        <ul>
                          <li>
                            <div class="row ">
                              <div className="col-md-12 payment-method">
                                <h2 className="total-sup">
                                  Phí vận chuyển:
                                  <span className="total-sup">
                                    0<sup className="total-sup">đ</sup>
                                  </span>
                                </h2>
                              </div>
                              <div className="col-md-12 payment-method">
                                <h2 className="total-sup">
                                  Tổng:
                                  <span className="total-sup">
                                    {new Intl.NumberFormat("de-DE", {
                                      currency: "EUR",
                                    }).format(this.state.total)}
                                    <sup className="total-sup">đ</sup>
                                  </span>
                                </h2>
                              </div>
                            </div>
                          </li>
                          <li>
                            <button
                              className="row btn btn-default update"
                              onClick={() => {
                                this.handlePayment();
                              }}
                            >
                              Thanh toán
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <button
                        className="info_ship-btn"
                        onClick={this.toggleList2}
                      >
                        Thanh toán bằng Paypal
                      </button>
                      {this.state.isOpen2 && (
                        <ul>
                          <li>
                            <div class="row ">
                              <div className="col-md-12 payment-method">
                                <h2 className="total-sup">
                                  Phí vận chuyển:
                                  <span className="total-sup">
                                    0<sup className="total-sup">đ</sup>
                                  </span>
                                </h2>
                              </div>
                              <div className="col-md-12 payment-method">
                                <h2 className="total-sup">
                                  Tổng:
                                  <span className="total-sup">
                                    {new Intl.NumberFormat("de-DE", {
                                      currency: "EUR",
                                    }).format(this.state.total)}
                                    <sup className="total-sup">đ</sup>
                                  </span>
                                </h2>
                              </div>
                            </div>
                            <Modal
                              show={this.state.ispay}
                              onHide={() => this.setState({ ispay: false })}
                              container={this}
                              aria-labelledby="contained-modal-title"
                            >
                              <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title">
                                  Notification
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                Đặt Hàng Thành Công, Vui Lòng Vào Đơn Hàng Để
                                Xem Chi Tiết
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  onClick={() => {
                                    this.reset();
                                    window.location.reload();
                                  }}
                                >
                                  <a>OK</a>
                                </Button>
                              </Modal.Footer>
                            </Modal>

                            <Modal
                              show={this.state.showpaymentfail}
                              onHide={() =>
                                this.setState({ showpaymentfail: false })
                              }
                              container={this}
                              aria-labelledby="contained-modal-title"
                            >
                              <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title">
                                  Notification
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>Đặt Hang Thất Bại</Modal.Body>
                              <Modal.Footer>
                                <Button
                                  onClick={() =>
                                    this.setState({ showpaymentfail: false })
                                  }
                                >
                                  <a>Cancel</a>
                                </Button>
                              </Modal.Footer>
                            </Modal>
                            <button>
                              <PayPalScriptProvider options={initialOptions}>
                                <PayPalButtons
                                  createOrder={(data, actions) => {
                                    return actions.order.create({
                                      purchase_units: [
                                        {
                                          amount: {
                                            value: Math.ceil(
                                              this.state.total / 23000.0
                                            ).toString(),
                                          },
                                        },
                                      ],
                                    });
                                  }}
                                  onApprove={(data, actions) => {
                                    return actions.order
                                      .capture()
                                      .then((details) => {
                                        const name =
                                          details.payer.name.given_name;
                                        this.handlePayment();
                                        // alert(Transaction completed by ${name});
                                      });
                                  }}
                                />
                                <Link to="/purchase_history"></Link>
                              </PayPalScriptProvider>
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="do_action ">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="chose_area">
                  <div className="cart-option">
                    <div className="col-md-6"></div>
                    <div className="col-md-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default ContentPayment;
