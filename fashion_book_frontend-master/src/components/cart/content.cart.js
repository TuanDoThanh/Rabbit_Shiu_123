import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { API_URL } from "../../constants/urls";
class ContentCart extends Component {
  constructor() {
    super();
    this.state = {
      showtotal: false,
      show: false,
      ispay: false,
      showpaymentfail: false,
      islogin: false,
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
  }
  handleParchase = () => {
    if (!this.props.islogin) {
      this.setState({ show: true });
      return;
    } else if (this.props.cart.length < 1) {
      this.setState({ showtotal: true });
      return;
    } else {
      this.setState({ show: false });
      window.location.href = "/payment";
      return;
    }
  };
  reset = () => {
    this.setState({
      show: false,
      ispay: false,
      showpaymentfail: false,
    });
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
                    <td className="total">Tổng tiền</td>
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
                            <span
                              className="cart_quantity_down"
                              onClick={() => {
                                if (element.count === 1) {
                                  return;
                                }
                                element.count -= 1;
                                this.props.updateProductInCart(element);
                              }}
                            >
                              {" "}
                              -{" "}
                            </span>
                            <input
                              className="cart_quantity_input"
                              type="text"
                              name="quantity"
                              value={element.count}
                              autocomplete="off"
                              size="2"
                            />
                            <span
                              className="cart_quantity_up"
                              onClick={() => {
                                element.count += 1;
                                this.props.updateProductInCart(element);
                              }}
                            >
                              {" "}
                              +{" "}
                            </span>
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
                        <td className="cart_delete">
                          <a
                            className="cart_quantity_delete"
                            onClick={() =>
                              this.props.deteleProductInCart(element._id)
                            }
                          >
                            <i class="fa fa-trash"></i>
                          </a>
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
                  <div className="col-md-6">
                    <h2>
                      Tổng:
                      <span>
                        {new Intl.NumberFormat("de-DE", {
                          currency: "EUR",
                        }).format(this.state.total)}
                        <sup>đ</sup>
                      </span>
                    </h2>
                    <Modal
                      show={this.state.show}
                      onHide={() => this.setState({ show: false })}
                      container={this}
                      aria-labelledby="contained-modal-title"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                          Thông báo
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>Vui Lòng Đăng Nhập Để Thanh Toán</Modal.Body>
                      <Modal.Footer>
                        <Button onClick={() => this.setState({ show: false })}>
                          <a>Hủy</a>
                        </Button>
                        <Button onClick={this.handleHide}>
                          <Link to="/login_register">Đăng Nhập</Link>
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Modal
                      show={this.state.showtotal}
                      onHide={() => this.setState({ showtotal: false })}
                      container={this}
                      aria-labelledby="contained-modal-title"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                          Thông báo
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>Không có sản phẩm trong giỏ hàng!</Modal.Body>
                      <Modal.Footer>
                        <Button
                          onClick={() => this.setState({ showtotal: false })}
                        >
                          <a>Hủy</a>
                        </Button>
                        <Button onClick={this.handleHide}>
                          <Link to="/">Tiếp tục mua hàng</Link>
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                  <div className="col-md-6">
                    <button
                      className="btn-Parchase"
                      onClick={() => this.handleParchase()}
                    >
                      Mua Hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="cart-option"></div>
          </div>
        </section>
      </div>
    );
  }
}
export default ContentCart;
