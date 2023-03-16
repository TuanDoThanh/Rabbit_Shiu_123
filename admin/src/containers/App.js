import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UserContainer from "./user.container";
import LoginContainer from "./login.container";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>

          <Route exact path="/usermanager" component={UserContainer} />
          <Route exact path="/login" component={LoginContainer} />
          
        </Switch>
      </Router>
    );
  }
}
export default App;
