import React, { Component } from "react";
import HeaderMiddle from "../header/header.middle";
import FooterTop from "../footer/footer.top";
import FooterMiddle from "../footer/footer.middle";
import FooterBottom from "../footer/footer.bottom";
import ContentPayment from "./content.payment";
class Payment extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <header id="header">
          <HeaderMiddle
            islogin={this.props.islogin}
            logout={() => this.props.logout()}
            history={this.props.history}
            setSearchText={(value) => this.props.setSearchText(value)}
            searchTextSubmit={() => this.props.searchTextSubmit()}
          />
        </header>
        <ContentPayment
          islogin={this.props.islogin}
          cart={this.props.cart}
          payment={( address, phone, name,total) => 
            this.props.payment( address, phone, name,total)}
          ispay={this.props.ispay}
        />
        <footer id="footer">
          <FooterTop />
          <FooterMiddle />
          <FooterBottom />
        </footer>
      </div>
    );
  }
}
export default Payment;
