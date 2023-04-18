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
    };
  }
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
      this.state.total
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
                    <td className="image">Product</td>
                    <td className="description" />
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
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
            </div>
          </div>
        </section>
        <section id="do_action ">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div class="total_area">
                  <div className="col-md-12">
                    <h2>
                      Transport fee:
                      <span>
                        0<sup>đ</sup>
                      </span>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <h2>
                      Total:
                      <span>
                        {new Intl.NumberFormat("de-DE", {
                          currency: "EUR",
                        }).format(this.state.total)}
                        <sup>đ</sup>
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="chose_area">
                  <ul class="user_option">
                    <li>
                      <label>Name</label>
                      <input
                        type="text"
                        value={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                      />
                      <span>{this.state.notiName}</span>
                    </li>
                    <li>
                      <label>Phone</label>
                      <input
                        type="text"
                        value={this.state.phone}
                        onChange={(e) =>
                          this.setState({ phone: e.target.value })
                        }
                      />
                      <span>{this.state.notiPhone}</span>
                    </li>
                  </ul>

                  <ul className="user_option">
                    <li>
                      <label>Address</label>
                      <input
                        type="text"
                        value={this.state.address}
                        onChange={(e) =>
                          this.setState({ address: e.target.value })
                        }
                      />
                      <span>{this.state.notiDetailAddress}</span>
                    </li>
                  </ul>
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
                      Đặt Hàng Thành Công, Vui Lòng Vào Đơn Hàng Để Xem Chi Tiết
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
                    onHide={() => this.setState({ showpaymentfail: false })}
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
                  <div className="cart-option">
                    <div className="col-md-6">
                    <button
                      className="btn btn-default update"
                      onClick={() => this.handlePayment()}
                    >
                      Payment
                    </button>
                    </div>
                    <div className="col-md-6">
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
                            return actions.order.capture().then((details) => {
                              const name = details.payer.name.given_name;
                              this.handlePayment();
                              // alert(Transaction completed by ${name});
                            });
                          }}
                        />
                      </PayPalScriptProvider>
                    </button>
                    </div>
                    
                   
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
