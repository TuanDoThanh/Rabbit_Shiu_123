import React, { Component } from "react";
import { Link } from "react-router-dom";
import FooterBottom from "../footer/footer.bottom";
import FooterMiddle from "../footer/footer.middle";
import FooterTop from "../footer/footer.top";
import HeaderMiddle from "../header/header.middle";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notiUpdateInfor: "",
      oldPassword: "",
      newPassword: "",
      confirm: "",
      notiUpdatePassword: '',
      profile: false
    };
    this.handleClickprofile = this.handleClickprofile.bind(this);
    this.handleClickpassword = this.handleClickpassword.bind(this);

  }
  componentWillMount() {
    if (this.props.isupdate) {
      this.setState({ notiUpdateInfor: "CẬP NHẬT THÀNH CÔNG" });
    } else if (this.props.isupdate === false) {
      this.setState({ notiUpdateInfor: "CẬP NHẬT THẤT BẠI" });
    } else {
      this.setState({ notiUpdateInfor: "" });
    }
  }
  handleClickprofile(){
    this.setState({
      profile: false
    })
  }
  handleClickpassword(){
    this.setState({
      profile: true
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isupdate === true) {
       this.setState({ notiUpdateInfor: "CẬP NHẬT THÀNH CÔNG" });
    } else if (nextProps.isupdate === false) {
       this.setState({ notiUpdateInfor: "CẬP NHẬT THẤT BẠI" });
    } else {
       this.setState({ notiUpdateInfor: "" });
    }
    if(nextProps.notiupdatePassword !== this.props.notiupdatePassword && nextProps.notiupdatePassword === true) {
      this.setState({
        notiUpdatePassword: "Cập nhật mật khẩu thành công"
      })
      this.setState({
        oldPassword: '',
        newPassword: '',
        confirm: ''
      })
      this.props.resetUpdatePassword()
    } 
    if(nextProps.notiupdatePassword !== this.props.notiupdatePassword && nextProps.notiupdatePassword === false) {
      this.setState({
        notiUpdatePassword: "Cập nhật mật khẩu thất bại"
      })
      this.props.resetUpdatePassword()
    } 
  }
  handleUpdatePassword() {
    if(this.state.newPassword.length < 6) {
      this.setState({notiUpdatePassword: 'Mật khẩu mới không hợp lệ'})
      return
    } else {
      this.setState({notiUpdatePassword: ''})
    }
    if(this.state.confirm.length < 6) {
      this.setState({notiUpdatePassword: 'Xác nhận mật khẩu không hợp lệ'})
      return
    } else {
      this.setState({notiUpdatePassword: ''})
    }
    this.props.updatePassword(this.state.oldPassword, this.state.newPassword)
  }
 
  render() {
    let xhtml = <div className='login-form'>
     <div className = 'login-content col-sm-6'>
    <div className="shopper-info">
      <p>THÔNG TIN TÀI KHOẢN</p>
      <p className="error">{this.state.notiUpdateInfor}</p>
      <input
        type="text"
        disabled
        placeholder="Email"
        value={this.props.email}
      />
      <input
        type="text"
        placeholder="Họ"
        value={this.props.firstName}
        onChange={e => this.props.setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tên"
        value={this.props.lastName}
        onChange={e => this.props.setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Địa Chỉ"
        value={this.props.address}
        onChange={e => this.props.setAddress(e.target.value)}
      />
      <input
        type="tell"
        placeholder="Số điện thoại"
        value={this.props.phone_number}
        onChange={e => this.props.setPhoneNumber(e.target.value)}
      />
      <button
        onClick={() => this.props.updateInfor()}
        className="btn btn-default"
      >
        Cập Nhật
      </button>
    </div>
  </div>
  </div>
if(this.state.profile){
  xhtml =   <div className='login-form'>
  <div className = 'login-content col-sm-6'>
  <div className="shopper-info">
  
    <p>CẬP NHẬT MẬT KHẨU</p>
    <p className="error">{this.state.notiUpdatePassword}</p>
    <input
    value={this.state.oldPassword}
      onChange={e =>
        this.setState({ oldPassword: e.target.value })
      }
      type="password"
      placeholder="Mật khẩu cũ"
    />
    <input
    value={this.state.newPassword}
      onChange={e =>
        this.setState({ newPassword: e.target.value })
      }
      type="password"
      placeholder="Mật khẩu mới"
    />
    <input

    value={this.state.confirm}
      onChange={e => this.setState({ confirm: e.target.value })}
      type="password"
      placeholder="Xác nhận"
    />
    <button onClick={() => this.handleUpdatePassword()}
    className="btn btn-default">Cập Nhật</button>
  </div>
  </div>
</div>
}
    return (
      <div>
        <header id="header">
         
          <HeaderMiddle
            islogin={this.props.islogin}
            logout={() => this.props.logout()}
            history={this.props.history}
          />
        </header>
        <section id="cart_items " className='ss_product pd-top'> 
          <div className="container">
          <div className='menu-profile'>
                <ul>
                  <li><button onClick={()=>this.handleClickprofile()} className='menu-custom btn'>Thông Tin Tài Khoản</button></li>
                  <li> <button onClick={()=>this.handleClickpassword()}  className='menu-custom btn'>Thay Đổi Mật Khẩu</button></li>
                </ul>
                <hr></hr>
              </div>
            <div className="shopper-informations">
              <div>
                {xhtml}
                
              </div>
            </div>
          </div>
        </section>
        <footer id="footer">
          <FooterTop />
          <FooterMiddle />
          <FooterBottom />
        </footer>
      </div>
    );
  }
}
export default Profile;
