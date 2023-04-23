import React, { Component } from "react";
import { Link } from "react-router-dom";
const VerifyRegisterAccount = () => (
  <div className="container text-center">
    <div className="logo-404">
      <div className="null-cart">
        <img src="/assets/images/home/logoRp1.jpg" alt="" />
      </div>
    </div>
    <div className="content-404">
      <h1>
        <b>Chúc mừng!!!</b>Bạn đã xác minh đăng ký thành công
      </h1>
      <h2>
        <Link to="/">Trở Về Trang Chủ</Link>
      </h2>
    </div>
  </div>
);
export default VerifyRegisterAccount;
