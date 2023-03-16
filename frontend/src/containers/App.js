import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomeContainer from './home.container'
import LoginRegisterContainer from './login.register.container'
import VerifyRegisterAccountContainer from './verify.register.account.container'
import ForgotPasswordContainer from './forgot.password.container'
const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={HomeContainer} />
      <Route exact path='/login_register' component={LoginRegisterContainer} />
      <Route exact path='/confirm/:token' component={VerifyRegisterAccountContainer} />
      <Route exact path='/forgotpass/' component={ForgotPasswordContainer} />
    </Switch>
  </Router>
)

export default App;
