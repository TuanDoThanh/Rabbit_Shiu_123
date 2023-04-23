import React, { Component } from "react";
import storeConfig from "../../config/storage.config";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const LinkButton = withRouter(({ history, ...props }) => {
  const { handle, to, children } = props;
  return (
    <button
      className="btn cart btn-buy-now-detail"
      onClick={() => {
        handle();
        history.push(to);
        window.location.href = "/cart";
      }}
    >
      {children}
    </button>
  );
});
class ContentProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      notificationComment: "",
      comment: "",
      quantity: 1,
      noti: false,
      show: false,
      pagination: [],
      visible: true,
    };
  }
  componentDidMount() {
    this.Timer = setTimeout(() => {
      this.setState({ visible: false });
    }, 3000);
  }

  componentWillMount() {
    let tmp = [];
    for (let i = 1; i <= this.props.totalpage; i++) {
      tmp.push(i);
    }
    this.setState({ pagination: tmp });
    if (storeConfig.getUser() !== null) {
      this.setState({
        name: storeConfig.getUser().firstName,
        email: storeConfig.getUser().email,
      });
    } else {
      this.setState({
        name: "",
        email: "",
      });
    }

    clearTimeout(this.timer);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalpage !== this.props.totalpage) {
      let tmp = [];
      for (let i = 1; i <= nextProps.totalpage; i++) {
        tmp.push(i);
      }
      this.setState({ pagination: tmp });
    }
    if (nextProps.islogin === false) {
      this.setState({
        name: "",
        email: "",
      });
    }
  }
  renderPagination() {
    if (this.state.pagination.length === 0) {
      return null;
    } else {
      return (
        <ul className="pagination pagination-custom">
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

  handlename = (name) => {
    if (this.state.name === "") {
      this.setState({ name: name });
    }
  };
  submitComment = () => {
    if (this.state.name === "") {
      this.setState({ notificationComment: "Name must not be blank " });
      return;
    } else {
      this.setState({ notificationComment: "" });
    }
    if (this.state.comment === "") {
      this.setState({ notificationComment: "Comment must not be blank " });
      return;
    } else {
      this.setState({ notificationComment: "" });
    }
    this.props.submitComment(
      this.state.name,
      this.state.email,
      this.state.comment,
      this.props.id_book
    );
    this.setState({ comment: "" });
  };
  submitOrder = () => {
    if (this.state.quantity < 0) {
      this.setState({ noti: false });
      return;
    } else {
      this.setState({ noti: true });
    }
    let product = this.props.mproductDetail;
    product.count = this.state.quantity;
    this.props.addToCart(product);
  };

  render() {
    const { visible } = this.state;

    let xhtml = "";
    console.log(this.state.noti);
    if (this.state.noti) {
      xhtml = visible ? (
        <div className="aler-box">
          <div className="aler-title">
            <i class="fas fa-check aler-icon"></i>
            <h3 className="title">Thêm vào giỏ hàng thành công!</h3>
          </div>
          <div className="alert-footer"></div>
        </div>
      ) : null;
    }
    return (
      <section className="ss_product ss-bestselling mg-top">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="product-details">
                <div className="row col-sm-12">
                  <div className="col-sm-9">
                    <div className="row col-sm-12">
                      <div className="col-sm-5">
                        <div className="view-product">
                          <img src={this.props.mproductDetail.img} alt="" />
                        </div>
                      </div>
                      <div className="col-sm-7">
                        <div className="product-information">
                          <div className="item-information">
                            <img
                              src="/assets/images/product-details/new.jpg"
                              className="newarrival"
                              alt=""
                            />
                            <h2>{this.props.mproductDetail.name}</h2>

                            <img
                              src="images/product-details/rating.png"
                              alt=""
                            />

                            <span className="product-content-detail">
                              <div>
                                <div class="bestselling__product-rate-wrap">
                                  <i class="fas fa-star bestselling__product-rate"></i>
                                  <i class="fas fa-star bestselling__product-rate"></i>
                                  <i class="fas fa-star bestselling__product-rate"></i>
                                  <i class="fas fa-star bestselling__product-rate"></i>
                                  <i class="fas fa-star bestselling__product-rate"></i>
                                </div>
                                <span></span>
                                {/* {this.props.mproductDetail.price} */}
                                <span>
                                  {new Intl.NumberFormat("de-DE", {
                                    currency: "EUR",
                                  }).format(this.props.mproductDetail.price)}
                                  <sup>đ</sup>
                                </span>
                              </div>
                              <div className="count-product">
                                <p className="count">Số Lượng:</p>
                                <input
                                  type="number"
                                  min="0"
                                  onChange={(e) =>
                                    this.setState({ quantity: e.target.value })
                                  }
                                  value={this.state.quantity}
                                />
                              </div>
                              <button
                                onClick={() => this.submitOrder()}
                                type="button"
                                className="btn btn-default cart"
                              >
                                <i className="fa fa-shopping-cart" />
                                Thêm
                              </button>
                              <LinkButton
                                handle={() => {
                                  this.submitOrder();
                                }}
                                to="/cart"
                              >
                                <i className="fa fa-regular fa-heart" />
                                Mua Ngay
                              </LinkButton>
                            </span>
                            <p>{this.state.noti}</p>
                          </div>
                        </div>
                        <Modal
                          show={this.state.show}
                          onHide={() => this.setState({ show: false })}
                          container={this}
                          aria-labelledby="contained-modal-title"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                              showfication
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>Added to cart</Modal.Body>
                          <Modal.Footer>
                            <Button
                              onClick={() => this.setState({ show: false })}
                            >
                              <a>Cancel</a>
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                      {xhtml}
                    </div>
                    <div className="row col-sm-12 pd-top-40">
                      <div className="infoms row  tb-mg-l">
                        <div className="Deccribe">Mô tả</div>
                      </div>

                      <div class="row table-responsive  tb-mg-l">
                        <table class="table table-bordered">
                          <tbody>
                            <tr>
                              <th>Thể Loại</th>
                              <td>{this.props.nameCategory}</td>
                            </tr>
                            <tr>
                              <th>Ngày Phát Hành</th>
                              <td>
                                {" "}
                                {new Date(
                                  this.props.mproductDetail.release_date
                                ).toDateString("yyyy-MM-dd")}
                              </td>
                            </tr>
                            <tr>
                              <th>Nhà xuất bản</th>
                              <td>{this.props.namePublicsher}</td>
                            </tr>
                            <tr>
                              <th>Tác Giả</th>
                              <td>{this.props.nameAuthor}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="row col-sm-12 pd-top-40">
                      <div className="infoms row  tb-mg-l">
                        <div className="Deccribe">Đánh Giá Sản Phẩm</div>
                      </div>
                      <div className="tab-content">
                        <div className="content-conment">
                          {this.props.comment.map((element, index) => {
                            return (
                              <div className="row commets-ss">
                                <div className="avt col-sm-1">
                                  <img src="/assets/images/home/avt.png"></img>
                                </div>
                                <div className="product-cmt col-sm-11">
                                  <div className="name-cmt">{element.name}</div>
                                  <div class="bestselling__product-rate-wrap">
                                    <i class="fas fa-star bestselling__product-rate"></i>
                                    <i class="fas fa-star bestselling__product-rate"></i>
                                    <i class="fas fa-star bestselling__product-rate"></i>
                                    <i class="fas fa-star bestselling__product-rate"></i>
                                    <i class="fas fa-star bestselling__product-rate"></i>
                                  </div>
                                  <div className="cmt-cmt">
                                    {element.comment}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          <div className="Pagination-flex">
                            {this.renderPagination()}
                          </div>
                        </div>
                      </div>

                      <div className="tab-content">
                        <div className="tab-pane fade active in" id="reviews">
                          <div className="col-sm-12">
                            {/* <hr />
                        <p style={{ color: "#5BBCEC" }}>
                          {this.state.notificationComment}
                        </p>
                        <p>
                          <h4><b>Bình Luận</b></h4>
                        </p>

                        <form action="#">
                        
                          <textarea
                            value={this.state.comment}
                            onChange={e =>
                              this.setState({ comment: e.target.value })
                            }
                          />
                          <button
                            type="button"
                            className="btn btn-default pull-right"
                            onClick={() => this.submitComment()}
                          >
                            Bình Luận
                          </button>
                        </form> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="recommended_div col-sm-3 col-md-0 col-sm-0">
                    <div class="product__aside-top">
                      <div class="product__aside-top-item">
                        <img src="/assets/images/home/shipper.png" />
                        <div class="product__aside-top-item-text">
                          <p>Chuyển phát nhanh</p>
                          <span>Chỉ trong 24 giờ</span>
                        </div>
                      </div>
                      <div class="product__aside-top-item">
                        <img src="/assets/images/home/brand.png" />
                        <div class="product__aside-top-item-text">
                          <p>Sản phẩm chính hãng</p>
                          <span>Sản phẩm nhập khẩu 100%</span>
                        </div>
                      </div>
                      <div class="product__aside-top-item">
                        <img src="/assets/images/home/less.png" />
                        <div class="product__aside-top-item-text">
                          <p>Mua tiết kiệm</p>
                          <span>Rẻ hơn từ 10% đến 30%</span>
                        </div>
                      </div>
                    </div>
                    <div class="product__aside-bottom">
                      <div className="infoms row  tb-mg-l">
                        <div className="recommended">Sản Phẩm Liên Quan</div>
                      </div>
                    </div>
                    <div className="recommended_items">
                      {this.props.bookrelated.map((element, index) => {
                        return (
                          <div className="recommended_div col-sm-12">
                            <div className="product-image-wrapper">
                              <div className="single-products">
                                <a
                                  className="row"
                                  href={"/product/" + element._id}
                                >
                                  <img
                                    className="recommended_img col-sm-6"
                                    src={element.img}
                                    alt=""
                                  />
                                  <div className="recommended_div col-sm-6">
                                    <h2 className="recommended_h2">
                                      {" "}
                                      {new Intl.NumberFormat("de-DE", {
                                        currency: "EUR",
                                      }).format(element.price)}
                                      <sup>đ</sup>
                                    </h2>
                                    <p className="recommended_p">
                                      {element.name}
                                    </p>{" "}
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default ContentProductDetail;
