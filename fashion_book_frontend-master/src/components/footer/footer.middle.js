import React, { Component } from "react";

const FooterMiddle = () => (
  <div className="footer-widget">
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <div className="single-widget">
            <h2>GIỚI THIỆU</h2>
            <form action="#" className="form-footer container">
              <div className="row">
                <input
                  type="text"
                  placeholder="Địa chỉ email của bạn"
                  className="col-sm-4"
                />
                <button type="submit" className="">
                  Nộp
                </button>
              </div>
            </form>
            <p>Đăng ký Gmail để nhận những tin tức mới nhất về chúng tôi...</p>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="single-widget">
            <h2>Thông tin về chúng tôi</h2>
            <ul className="nav nav-pills nav-stacked ">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <a href="#">Thành Phố Đà Nẵng</a>
              </li>
              <li>
                <i className="far fa-envelope"></i>
                <a href="#">fpteducation@fpt.edu.vn</a>
              </li>
              <li>
                <i className="fas fa-phone-volume"></i>
                <a href="#">+84 867 02 12 02</a>
              </li>
              <li>
                <i class="fab fa-facebook-f"></i>
                <a href="#">BTEC DN</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default FooterMiddle;
