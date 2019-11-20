import React, { Component } from "react";
import { Route } from 'react-router-dom';
import './App.css';

import InitView from "./views/init-view";
import ActionView from "./views/action-view";

class App extends Component {

  render(){
    return (
      <React.Fragment>
        <Route exact path="/" render={() => 
          <InitView />
        }
        />
        <Route exact path="/actions" render={() =>
          <ActionView />
        }/>
        <Route exact path="/actions/deposit" render={() =>
          <div>DEPOSIT</div>
        }/>
        <Route exact path="/actions/send" render={() =>
          <div>
            SEND
          </div>
        }/>
        <Route exact path="/actions/send0" render={() =>
          <div>
            SEND TO 0
          </div>
        }/>
        <Route exact path="/actions/withdraw" render={() =>
          <div>
            WITHDRAW
          </div>
        }/>
      </React.Fragment>
    );
  }
}



export default App;