import React, { Component } from "react";
import { Link } from "react-router-dom";
const ForgotPassword = ({ setEmail, submit, notification }) => (
  <div className="login-ss">
    <div class="form-box">
      <div class="form-value">
        <div>
          <h2 className="login-h2">QUÊN MẬT KHẨU</h2>
          <span className="notification">{notification}</span>
          <div class="inputbox">
            <input
              className="login-input"
              type="email"
              required
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="login-label" for="">
              Email
            </label>
          </div>
          <button className="login-btn" onClick={() => submit()}>
            Chấp Nhận
          </button>
          <div class="register">
            <p>
              <Link to="/login_register">Trở Về</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default ForgotPassword;
