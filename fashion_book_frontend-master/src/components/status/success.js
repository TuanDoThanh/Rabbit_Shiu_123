import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const Success = () => (
    <div className='login-ss'>
		<div class="form-box">
                <div class="form-value">
                    <div>
                        <h2 className='login-h2'>CONGRATULATIONS!</h2>
                        <div class="register">
                            <p>You have successfully changed your password <Link to="/login_register">Back</Link></p>
                        </div>
                    </div>
                   
                </div>
			</div>
	</div>
)
export default Success