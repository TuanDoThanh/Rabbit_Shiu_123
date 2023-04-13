import { Link } from 'react-router-dom'
import React, { useState } from 'react'

// setFirstname, setLastname, setAddress, setPhone,

function ContentLoginRegister({ setEmailogin, setPasswordlogin, setEmail,setPassword, setConfirm,notificationRegister, notificationLogin, registerSubmit, loginSubmit }){
        const [Login,setLogin] = useState(true);
        const [Register,setRegister] = useState(false);
        function handleLogin(){
            setLogin(true);
            setRegister(false);
           
        }
        function handleRegister(){
            setRegister(true)
            setLogin(false);
            
        }
        let xhtmlLogin ='';
        let xhtmlRegister='';
        if(Login){
            xhtmlLogin = 
            <div className='login-ss'>
            <div class="form-box">
                <div class="form-value">
                    <div>
                        <h2 className='login-h2'>Login</h2>
                        <div className="noti">{notificationLogin}</div>
                        <div class="inputbox">
                            <input 
                            className='login-input' 
                            type="email" 
                            required placeholder=""
                            onChange={(e) => {setEmailogin(e.target.value)}}/>
                            <label className='login-label' for="">Email</label>
                        </div>
                        <div class="inputbox">
                            <input 
                            className='login-input' 
                            type="password" 
                            required placeholder=""
                            onChange={(e) => {setPasswordlogin(e.target.value)}}/>
                            <label className='login-label' for="">Password</label>
                        </div>
                        <div class="forget">
                            <label className='login-label' for=""><input className='login-input' type="checkbox"/>Remember Me  <Link className='forgotpass' to='/forgotpass/'>Forget password?</Link></label>
                          
                        </div>
                        <button className='login-btn' onClick={() => loginSubmit()}>Log in</button>
                        <div class="register">
                            <p>Don't have a account <a onClick={handleRegister}>Signup</a></p>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
        
        }

        if(Register){
            xhtmlRegister =  
            <div className='login-ss'>
            <div class="form-box">
                <div class="form-value">
                    <div>
                        <h2 className='login-h2'>Signup</h2>
                        <div className="noti">{notificationRegister}</div>
                        <div class="inputbox">
                            <input 
                            className='login-input' 
                            type="email" 
                            required placeholder=""
                            onChange={(e) => {setEmail(e.target.value)}}/>
                            <label className='login-label' for="">Email</label>
                        </div>
                        {/* <div class="inputbox">
                            <input 
                            className='login-input' 
                            type="text" 
                            required placeholder=""
                            onChange={(e) => {setFirstname(e.target.value) }}/>
                            <label className='login-label' for="">First Name</label>
                        </div>
                        <div class="inputbox">
                            <input 
                            className='login-input' 
                            type="text" 
                            required placeholder=""
                            onChange={(e) => { setLastname(e.target.value) }}/>
                            <label className='login-label' for="">Last Name</label>
                        </div>
                        <div class="inputbox">
                            <input 
                            className='login-input' 
                            type="text" 
                            required placeholder=""
                            onChange={(e) => { setAddress(e.target.value) }}/>
                            <label className='login-label' for="">Address</label>
                        </div>
                        <div class="inputbox">
                            <input 
                            className='login-input' 
                            type="number" 
                            required placeholder=""
                            onChange={(e) => { setPhone(e.target.value) }}/>
                            <label className='login-label' for="">Phone</label>
                        </div> */}
                        <div class="inputbox">
                            <input 
                            className='login-input' 
                            type="password" 
                            required placeholder=""
                            onChange={(e) => setPassword(e.target.value)}/>
                            <label className='login-label' for="">Password</label>
                        </div>
                        <div class="inputbox">
                            <input 
                            className='login-input' 
                            type="password" 
                            required placeholder=""
                            onChange={(e) => {setConfirm(e.target.value) }}/>
                            <label className='login-label' for="">Confirm</label>
                        </div>
                        <button className='login-btn' onClick={() => registerSubmit()}>Signup</button>
                        <div class="register">
                            <p>Do you already have an account? <a a onClick={handleLogin} >Log in</a></p>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
           
        }
        return(
            <section className='ss_product'>
                <div className="login-register">
                        <div>
                            {xhtmlRegister}
                            {xhtmlLogin}
                        </div>
                    </div>
            </section>
        );
    }
export default ContentLoginRegister