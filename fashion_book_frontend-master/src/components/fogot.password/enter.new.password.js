import React, { Component } from "react";
import { Link } from "react-router-dom";
class EnterNewPassword extends Component {
  constructor() {
    super();
    this.state = {
        newpassword: '',
        confirm: '',
        noti:''
    }
  }
  handleSubmit() {
    if(this.state.newpassword.length < 6) {
        this.setState({noti:'Password must contain at least 6 characters'})
        return
    } else {
        this.setState({noti: ''})
    }
    if(this.state.confirm !== this.state.newpassword) {
        this.setState({
            noti: 'Confirm invalid'
        })
        return
    } else {
        this.setState({noti: ''})
    }
    this.props.submitEnterNewPassword();
  }
  render() {
    return (
      <div className='login-ss'>
        <div class="form-box">
                <div class="form-value">
                    <div>
                        <h2 className='login-h2'>ENTER NEW PASSWORD</h2>
                        <p style={{ color: "tomato" }}>{this.state.noti}</p>
                        <div class="inputbox">
                            <input 
                            className='login-input' 
                            type="password" 
                            required placeholder=""
                            onChange={e => {this.props.setNewPassword(e.target.value) 
                            this.setState({newpassword: e.target.value})}}/>
                            <label className='login-label' for="">New Password</label>
                        </div>
                        <div class="inputbox">
                            <input 
                            className='login-input' 
                            type="password" 
                            required placeholder=""
                            onChange={e => {this.props.setConfirm(e.target.value)
                            this.setState({confirm: e.target.value})}}/>
                            <label className='login-label' for="">Confirm Password</label>
                        </div>
                        <button className='login-btn' onClick={() => this.handleSubmit()}><Link to="/login_register">Submit</Link></button>
                        <div class="register">
                            <p><Link to="/login_register">Back</Link></p>
                        </div>
                    </div>
                   
                </div>
              </div>





        {/* <div className="logo-404">
        <div className='null-cart'>
			    <Link to="/"><img src="/assets/images/home/logo1.gif" alt="" /></Link>
            
          </div>
        </div>
        <div className="content-404 forgotpass">
          <h1>
            <b>ENTER NEW PASSWORD</b>
          </h1>
          <p style={{ color: "tomato" }}>
            {this.state.noti}
          </p>
          <input
            type="password"
            placeholder="New Password"
            onChange={e => {this.props.setNewPassword(e.target.value) 
                this.setState({newpassword: e.target.value})}}
          />
          <br />
          <input
            type="password"
            placeholder="Confirm"
            onChange={e => {this.props.setConfirm(e.target.value)
            this.setState({confirm: e.target.value})}}
          />
          <br />
          <button
            className="btn btn-default"
            onClick={() => 
                this.handleSubmit()}
          >
            <Link to="/login_register">submit</Link>
          </button>
          <h2>
            <Link to="/">Bring me back</Link>
          </h2>
        </div> */}
      </div>
    );
  }
}
export default EnterNewPassword;
