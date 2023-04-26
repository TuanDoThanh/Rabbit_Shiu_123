import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Payment from "../components/payment/payment";
import * as productActions from "../actions/product.action";
import * as homeActions from "../actions/home.action";
import * as userActions from "../actions/user.action";
import * as paymentActions from "../actions/payment.action";
import * as cartActions from "../actions/cart.action";
class PaymentContainer extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    this.props.actions.auth();
    this.props.cartActions.getCart();
  }
  render() {
    return (
      <Payment
        islogin={this.props.islogin}
        logout={() => this.props.actions.logout()}
        searchTextSubmit={() => this.props.homeActions.searchTextSubmit()}
        setSearchText={(value) => this.props.homeActions.setSearchText(value)}
        history={this.props.history}
        cart={this.props.cart}
        payment={(address, phone, name, total) =>
          this.props.paymentActions.payment(address, phone, name, total)
        }
        ispay={this.props.ispay}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  islogin: state.userReducers.login.islogin,
  cart: state.cartReducers.cart.data,
  ispay: state.cartReducers.cart.ispay,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch),
    productActions: bindActionCreators(productActions, dispatch),
    cartActions: bindActionCreators(cartActions, dispatch),
    paymentActions: bindActionCreators(paymentActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentContainer);
