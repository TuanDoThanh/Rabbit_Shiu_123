import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const OTP = ({ setOTP, submitOTP, notificationOTP }) => (
    <div className='login-ss'>
            <div class="form-box">
                <div class="form-value">
                    <div>
                        <h2 className='login-h2'>Enter OTP</h2>
                        <span>{notificationOTP}</span>
                        <div className="otp-form">
                        <input
                type="number"
                placeholder="Otp code"
                onChange={(e) => setOTP(e.target.value)}
            />
                            <input type="text" class="otp-input" maxlength="1"/>
                            <input type="text" class="otp-input" maxlength="1"/>
                            <input type="text" class="otp-input" maxlength="1"/>
                            <input type="text" class="otp-input" maxlength="1"/>
                            <input type="text" class="otp-input" maxlength="1"/>
                            <input type="text" class="otp-input" maxlength="1"/>
                        </div>
                        <button className='login-btn verify-btn' onClick={() => submitOTP()}>Verify OTP</button>
                        <div class="register">
                            <p><Link to="/login_register">Back</Link></p>
                        </div>
                    </div>
                </div>
            </div>
	
          
    
        {/* <div className="content-404 forgotpass">
            <h1><b>ENTER OTP
			</b></h1>
            <span>{notificationOTP}</span>
            <input
                type="number"
                placeholder="Otp code"
                onChange={(e) => setOTP(e.target.value)}
            />
            <br />
            <button
                className="btn btn-default"
                onClick={() => submitOTP()}
            >
                submit
			</button>
            <h2><Link to="/">Bring me back Home</Link></h2>
        </div> */}
    </div>
)
export default OTP