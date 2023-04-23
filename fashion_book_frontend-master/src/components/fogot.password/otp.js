import React, { Component } from "react";
import { Link } from "react-router-dom";
class OTP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: "",
    };
  }

  handleInputChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    this.setState({ [inputName]: inputValue }, () => {
      const { otp1, otp2, otp3, otp4, otp5 } = this.state;
      const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${this.state.otp6 || ""}`;
      this.props.setOTP(otp);
    });
  };

  handlePaste = (event) => {
    const pasteValue = event.clipboardData.getData("Text");
    const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state;
    const remainingChars = 6 - (otp1 + otp2 + otp3 + otp4 + otp5 + otp6).length;
    const newChars = pasteValue.slice(0, remainingChars).split("");
    this.setState(
      {
        otp1: otp1 || newChars[0] || "",
        otp2: otp2 || newChars[1] || "",
        otp3: otp3 || newChars[2] || "",
        otp4: otp4 || newChars[3] || "",
        otp5: otp5 || newChars[4] || "",
        otp6: otp6 || newChars[5] || "",
      },
      () => {
        const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state;
        const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;
        this.props.setOTP(otp);
      }
    );
  };

  handleSubmit = () => {
    const otp = `${this.state.otp1}${this.state.otp2}${this.state.otp3}${this.state.otp4}${this.state.otp5}${this.state.otp6}`;
    if (otp.length === 6) {
      this.props.submitOTP(otp);
    } else {
      alert("Vui lòng nhập đúng 6 số OTP");
    }
  };

  render() {
    const { notificationOTP } = this.props;
    return (
      <div className="login-ss">
        <div class="form-box">
          <div class="form-value">
            <div>
              <h2 className="login-h2">Nhập OTP</h2>
              <span>{notificationOTP}</span>
              <div className="otp-form">
                <input
                  type="text"
                  name="otp1"
                  value={this.state.otp1}
                  onChange={this.handleInputChange}
                  maxLength="1"
                  onPaste={this.handlePaste}
                />
                <input
                  type="text"
                  name="otp2"
                  value={this.state.otp2}
                  onChange={this.handleInputChange}
                  maxLength="1"
                  onPaste={this.handlePaste}
                />
                <input
                  type="text"
                  name="otp3"
                  value={this.state.otp3}
                  onChange={this.handleInputChange}
                  maxLength="1"
                  onPaste={this.handlePaste}
                />
                <input
                  type="text"
                  name="otp4"
                  value={this.state.otp4}
                  onChange={this.handleInputChange}
                  maxLength="1"
                  onPaste={this.handlePaste}
                />
                <input
                  type="text"
                  name="otp5"
                  value={this.state.otp5}
                  onChange={this.handleInputChange}
                  maxLength="1"
                  onPaste={this.handlePaste}
                />
                <input
                  type="text"
                  name="otp6"
                  value={this.state.otp6}
                  onChange={this.handleInputChange}
                  maxLength="1"
                  onPaste={this.handlePaste}
                />
              </div>
              <button
                className="login-btn verify-btn"
                onClick={this.handleSubmit}
              >
                Xác minh OTP
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
  }
}
export default OTP;
