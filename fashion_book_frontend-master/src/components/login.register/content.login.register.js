import { Link } from "react-router-dom";
import React, { useState } from "react";

function ContentLoginRegister({
  setEmailogin,
  setPasswordlogin,
  setEmail,
  setPassword,
  setConfirm,
  notificationRegister,
  notificationLogin,
  registerSubmit,
  loginSubmit,
}) {
  const [Login, setLogin] = useState(true);
  const [Register, setRegister] = useState(false);
  function handleLogin() {
    setLogin(true);
    setRegister(false);
  }
  function handleRegister() {
    setRegister(true);
    setLogin(false);
  }
  let xhtmlLogin = "";
  let xhtmlRegister = "";
  if (Login) {
    xhtmlLogin = (
      <div className="login-ss">
        <div class="form-box">
          <div class="form-value">
            <div>
              <h2 className="login-h2">Đăng Nhập</h2>
              <div className="noti">{notificationLogin}</div>
              <div class="inputbox">
                <input
                  className="login-input"
                  type="email"
                  required
                  placeholder=""
                  onChange={(e) => {
                    setEmailogin(e.target.value);
                  }}
                />
                <label className="login-label" for="">
                  Email
                </label>
              </div>
              <div class="inputbox">
                <input
                  className="login-input"
                  type="password"
                  required
                  placeholder=""
                  onChange={(e) => {
                    setPasswordlogin(e.target.value);
                  }}
                />
                <label className="login-label" for="">
                  Mật Khẩu
                </label>
              </div>
              <div class="forget">
                <label className="login-label" for="">
                  <input className="login-input" type="checkbox" />
                  Nhớ tôi{" "}
                  <Link className="forgotpass" to="/forgotpass/">
                    Quên mật khẩu?
                  </Link>
                </label>
              </div>
              <button className="login-btn" onClick={() => loginSubmit()}>
                Đăng nhập
              </button>
              <div class="register">
                <p>
                  Không có tài khoản <a onClick={handleRegister}>Đăng ký</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (Register) {
    xhtmlRegister = (
      <div className="login-ss">
        <div class="form-box">
          <div class="form-value">
            <div>
              <h2 className="login-h2">Đăng ký</h2>
              <div className="noti">{notificationRegister}</div>
              <div class="inputbox">
                <input
                  className="login-input"
                  type="email"
                  required
                  placeholder=""
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label className="login-label" for="">
                  Email
                </label>
              </div>
              <div class="inputbox">
                <input
                  className="login-input"
                  type="password"
                  required
                  placeholder=""
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="login-label" for="">
                  Mật khẩu
                </label>
              </div>
              <div class="inputbox">
                <input
                  className="login-input"
                  type="password"
                  required
                  placeholder=""
                  onChange={(e) => {
                    setConfirm(e.target.value);
                  }}
                />
                <label className="login-label" for="">
                  Xác nhận
                </label>
              </div>
              <button className="login-btn" onClick={() => registerSubmit()}>
                Đăng ký
              </button>
              <div class="register">
                <p>
                  Bạn đã có tài khoản chưa?{" "}
                  <a a onClick={handleLogin}>
                    Đăng nhập
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <section className="ss_product">
      <div className="login-register">
        <div>
          {xhtmlRegister}
          {xhtmlLogin}
        </div>
      </div>
    </section>
  );
}
export default ContentLoginRegister;
