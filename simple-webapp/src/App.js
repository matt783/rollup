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
      </React.Fragment>
    );
  }
}

export default (App);;